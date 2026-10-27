/**
 * Security audit log.
 *
 * Records *that* a security-relevant action happened — never *what* health
 * information was involved. Metadata is restricted to an allow-list of
 * non-sensitive keys. In the demo, events stay in an in-memory ring buffer;
 * a production build must forward them to a tamper-evident server-side store
 * (the authoritative audit trail lives on the backend, not the device).
 */
export type AuditEventType =
  | 'auth.sign-in'
  | 'auth.sign-in-failed'
  | 'auth.sign-up'
  | 'auth.sign-out'
  | 'auth.session-expired'
  | 'auth.password-reset-requested'
  | 'appointment.scheduled'
  | 'appointment.cancelled'
  | 'intake.submitted'
  | 'membership.enrollment-requested'
  | 'membership.cancellation-requested'
  | 'account.deletion-requested'
  | 'privacy.preferences-changed'
  | 'telehealth.join-attempted';

export type AuditEvent = {
  type: AuditEventType;
  at: string;
  /** Pseudonymous id only — never an email or name. */
  actorId: string | null;
  meta: Partial<Record<AllowedMetaKey, string | number | boolean>>;
};

const allowedMetaKeys = ['reason', 'mode', 'outcome', 'appointmentId', 'tierId', 'channel'] as const;
type AllowedMetaKey = (typeof allowedMetaKeys)[number];

const MAX_EVENTS = 200;
const events: AuditEvent[] = [];

export function recordAudit(
  type: AuditEventType,
  actorId: string | null,
  meta: Record<string, unknown> = {},
  now: () => Date = () => new Date(),
): AuditEvent {
  const safeMeta: AuditEvent['meta'] = {};
  for (const key of allowedMetaKeys) {
    const value = meta[key];
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      safeMeta[key] = typeof value === 'string' ? value.slice(0, 64) : value;
    }
  }
  const event: AuditEvent = { type, at: now().toISOString(), actorId, meta: safeMeta };
  events.push(event);
  if (events.length > MAX_EVENTS) events.shift();
  return event;
}

export function getAuditEvents(): readonly AuditEvent[] {
  return [...events];
}

export function clearAuditEvents() {
  events.length = 0;
}
