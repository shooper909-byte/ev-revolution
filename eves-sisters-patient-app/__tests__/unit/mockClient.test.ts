import { createMockClient } from '@/integrations/karpa/mock/mockClient';
import { IntegrationError } from '@/integrations/karpa/errors';

const fixedNow = new Date(2026, 9, 27, 12, 0, 0);
const make = () => createMockClient({ latencyMs: 0, now: () => fixedNow });

describe('mock clinical client', () => {
  it('identifies itself as simulated', () => {
    const c = make();
    expect(c.mode).toBe('mock');
    expect(c.isSimulated).toBe(true);
  });

  it('seeds upcoming and past appointments relative to now', async () => {
    const list = await make().appointments.list();
    expect(list.some((a) => a.status === 'scheduled' && new Date(a.startsAt) > fixedNow)).toBe(true);
    expect(list.some((a) => new Date(a.startsAt) < fixedNow)).toBe(true);
  });

  it('schedules and cancels an appointment', async () => {
    const c = make();
    const [slot] = await c.appointments.availability('follow-up', fixedNow, 7);
    expect(slot).toBeDefined();
    const appt = await c.appointments.schedule({ type: 'follow-up', modality: 'video', startsAt: slot.startsAt });
    expect((await c.appointments.list()).map((a) => a.id)).toContain(appt.id);
    const cancelled = await c.appointments.cancel(appt.id);
    expect(cancelled.status).toBe('cancelled');
  });

  it('never offers Sunday availability', async () => {
    const slots = await make().appointments.availability('initial-consultation', fixedNow, 14);
    expect(slots.every((s) => new Date(s.startsAt).getDay() !== 0)).toBe(true);
  });

  it('marks intake submissions as simulated', async () => {
    const s = await make().intake.submit({ interestSlug: 'skin-beauty', preScreen: { pregnancy: 'no' }, stateOfResidence: 'TX', consentToTelehealth: true });
    expect(s.simulated).toBe(true);
  });

  it('records membership interest without payment', async () => {
    const m = await make().memberships.requestEnrollment({ tierId: 'elite', packageSlug: 'mrs-golden' });
    expect(m).toMatchObject({ tierId: 'elite', packageSlug: 'mrs-golden', status: 'pending-evaluation' });
  });

  it('has no video join URL until a vendor is approved', async () => {
    const c = make();
    const [first] = await c.appointments.list();
    const v = await c.telehealth.getVisitSession(first.id);
    expect(v.joinUrl).toBeNull();
    expect(v.simulated).toBe(true);
  });

  it('exposes no hosted-portal URLs by default', () => {
    expect(make().handoff.urlFor('intake')).toBeNull();
  });

  it('can simulate network failures for error states', async () => {
    const c = make();
    c.simulation.forceNetworkError = true;
    await expect(c.appointments.list()).rejects.toBeInstanceOf(IntegrationError);
  });

  it('rejects the demo bad password and issues opaque tokens otherwise', async () => {
    const c = make();
    await expect(c.auth.signIn('a@b.co', 'wrong-password')).rejects.toMatchObject({ code: 'invalid-credentials' });
    const ok = await c.auth.signIn('A@B.co', 'Sunlit-Garden-42');
    expect(ok.user.email).toBe('a@b.co');
    expect(ok.tokens.accessToken).toMatch(/^mock_at_/);
  });

  it('reset restores seed data', async () => {
    const c = make();
    const scheduled = (await c.appointments.list()).find((a) => a.status === 'scheduled')!;
    await c.appointments.cancel(scheduled.id);
    expect((await c.appointments.get(scheduled.id))?.status).toBe('cancelled');
    c.reset();
    expect((await c.appointments.get(scheduled.id))?.status).toBe('scheduled');
  });
});
