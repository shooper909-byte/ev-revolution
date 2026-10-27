import { createHostedPortalHandoff } from '@/integrations/karpa/hostedPortal';
import { httpsOrNull } from '@/integrations/karpa/config';
import { sanitizeAnalytics } from '@/services/analytics';
import { clearAuditEvents, getAuditEvents, recordAudit } from '@/services/audit';
import { APP_ALLOWED_ROLES, can } from '@/services/auth/permissions';
import { createSession, needsTokenRefresh, sessionExpiry, sessionPolicy, touchSession } from '@/services/auth/session';
import { buildNotificationContent, defaultNotificationPreferences } from '@/services/notifications';
import { demoUser } from '@/data/demo/seed';
import { treatments, treatmentCategories, mrsCollection } from '@/data/catalog';

const tokens = { accessToken: 'a', refreshToken: 'r', expiresAt: new Date(10 * 60_000).toISOString() };

describe('session policy', () => {
  const s = createSession(demoUser, tokens, 0);
  it('is valid when fresh', () => expect(sessionExpiry(s, 1000)).toBeNull());
  it('expires after the idle timeout', () => expect(sessionExpiry(s, sessionPolicy.idleTimeoutMs)).toBe('idle'));
  it('activity resets the idle timer', () => {
    const touched = touchSession(s, sessionPolicy.idleTimeoutMs - 1000);
    expect(sessionExpiry(touched, sessionPolicy.idleTimeoutMs + 1000)).toBeNull();
  });
  it('enforces the absolute timeout even with activity', () => {
    const active = touchSession(s, sessionPolicy.absoluteTimeoutMs - 1);
    expect(sessionExpiry(active, sessionPolicy.absoluteTimeoutMs)).toBe('absolute');
  });
  it('refreshes tokens shortly before they expire', () => {
    expect(needsTokenRefresh(s, 0)).toBe(false);
    expect(needsTokenRefresh(s, 9 * 60_000)).toBe(true);
  });
});

describe('role-based authorization', () => {
  it('lets patients manage their own care', () => {
    expect(can('patient', 'appointments:schedule')).toBe(true);
    expect(can('patient', 'account:delete-request')).toBe(true);
  });
  it('denies patients clinician and admin permissions', () => {
    expect(can('patient', 'care-plan:write')).toBe(false);
    expect(can('patient', 'audit:read')).toBe(false);
  });
  it('keeps support staff away from clinical records', () => {
    expect(can('support', 'care-plan:read')).toBe(false);
  });
  it('denies everything without a role', () => expect(can(undefined, 'appointments:read')).toBe(false));
  it('admits only patients to this app', () => expect(APP_ALLOWED_ROLES).toEqual(['patient']));
});

describe('analytics guard', () => {
  it('drops unknown properties such as treatment interest', () => {
    const e = sanitizeAnalytics('catalog_viewed', { treatment: 'semaglutide', category: 'weight-management', step: '2' });
    expect(e.props).toEqual({ step: '2' });
  });
  it('redacts emails, phone numbers and dates in allowed fields', () => {
    expect(sanitizeAnalytics('settings_changed', { outcome: 'amara@example.com' }).props.outcome).toBe('[redacted]');
    expect(sanitizeAnalytics('settings_changed', { outcome: '713-555-0100' }).props.outcome).toBe('[redacted]');
    expect(sanitizeAnalytics('settings_changed', { outcome: '1980-01-15' }).props.outcome).toBe('[redacted]');
  });
});

describe('audit log', () => {
  beforeEach(clearAuditEvents);
  it('keeps only allow-listed, non-sensitive metadata', () => {
    const e = recordAudit('intake.submitted', 'user-1', { mode: 'mock', interest: 'hormones-menopause', note: 'hot flashes' });
    expect(e.meta).toEqual({ mode: 'mock' });
    expect(JSON.stringify(getAuditEvents())).not.toMatch(/hormones|flashes/);
  });
  it('is bounded', () => {
    for (let i = 0; i < 250; i += 1) recordAudit('auth.sign-in', null);
    expect(getAuditEvents().length).toBe(200);
  });
});

describe('privacy-conscious notifications', () => {
  const clinicalTerms = [
    ...treatments.map((t) => t.name),
    ...treatmentCategories.map((c) => c.name),
    ...mrsCollection.map((p) => p.name),
    'Dr.',
    'lab',
    'prescription',
  ].map((s) => s.toLowerCase());

  it.each(['appointment-reminder', 'new-message', 'care-plan-updated', 'order-update', 'journey-reminder'] as const)(
    '%s never contains clinical details',
    (kind) => {
      const content = buildNotificationContent(kind, defaultNotificationPreferences) ?? buildNotificationContent(kind, { ...defaultNotificationPreferences, journeyReminders: true });
      const text = `${content?.title} ${content?.body}`.toLowerCase();
      clinicalTerms.forEach((term) => expect(text).not.toContain(term));
    },
  );
  it('respects opt-outs and hidden previews', () => {
    expect(buildNotificationContent('new-message', { ...defaultNotificationPreferences, messages: false })).toBeNull();
    expect(buildNotificationContent('new-message', { ...defaultNotificationPreferences, showPreviews: false })?.body).toBeNull();
  });
});

describe('hosted-portal handoff', () => {
  const portal = {
    intake: 'https://portal.example.org/intake',
    scheduling: 'http://portal.example.org/schedule',
    'video-visit': 'https://evil.example.com/visit',
    messages: null,
    billing: null,
    records: null,
  };
  const handoff = createHostedPortalHandoff(portal, ['portal.example.org']);
  it('returns approved HTTPS URLs unchanged', () => expect(handoff.urlFor('intake')).toBe('https://portal.example.org/intake'));
  it('rejects plain HTTP', () => expect(handoff.urlFor('scheduling')).toBeNull());
  it('rejects hosts that are not approved', () => expect(handoff.urlFor('video-visit')).toBeNull());
  it('returns null when nothing is configured', () => expect(handoff.urlFor('messages')).toBeNull());
  it('config only accepts https URLs', () => {
    expect(httpsOrNull('http://x.org')).toBeNull();
    expect(httpsOrNull('not a url')).toBeNull();
    expect(httpsOrNull('https://x.org/a')).toBe('https://x.org/a');
  });
});
