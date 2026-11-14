/**
 * MOCK ADAPTER — SIMULATED DATA ONLY.
 *
 * This adapter does not contact Karpa Health or any other service. It keeps
 * fictional demo data in memory, adds artificial latency, and can be told to
 * fail so loading and error states can be exercised. Every clinical result it
 * returns is flagged `simulated: true` where the type allows.
 */
import {
  seedAppointments,
  seedCarePlan,
  seedMembership,
  seedMessages,
  seedOrders,
  seedTreatmentStatuses,
  demoClinicians,
  demoUser,
} from '@/data/demo/seed';

import { IntegrationError } from '../errors';
import type { ClinicalPlatformClient } from '../ports';
import type {
  Appointment,
  AppointmentType,
  AuthTokens,
  AvailabilitySlot,
  IntakeSubmission,
  Membership,
  SecureMessage,
} from '../types';

export type SimulationSettings = {
  /** Artificial latency per call, in milliseconds. */
  latencyMs: number;
  /** When true, every data call rejects with a network error. */
  forceNetworkError: boolean;
  /** Access-token lifetime issued by the mock, in minutes. */
  tokenLifetimeMinutes: number;
};

const appointmentTitles: Record<AppointmentType, string> = {
  'initial-consultation': 'Initial consultation',
  'follow-up': 'Follow-up visit',
  'lab-review': 'Lab review',
  'care-team-check-in': 'Care team check-in',
};

const appointmentDurations: Record<AppointmentType, number> = {
  'initial-consultation': 30,
  'follow-up': 20,
  'lab-review': 20,
  'care-team-check-in': 15,
};

function opaqueToken(prefix: string): string {
  // Mock-only identifier. A live adapter receives tokens from the identity provider.
  return `${prefix}_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export function createMockClient(
  options: Partial<SimulationSettings> & { now?: () => Date } = {},
): ClinicalPlatformClient & { simulation: SimulationSettings; reset: () => void } {
  const now = options.now ?? (() => new Date());
  const simulation: SimulationSettings = {
    latencyMs: options.latencyMs ?? 450,
    forceNetworkError: options.forceNetworkError ?? false,
    tokenLifetimeMinutes: options.tokenLifetimeMinutes ?? 15,
  };

  let store = createStore();

  function createStore() {
    const t = now();
    return {
      appointments: seedAppointments(t),
      carePlan: seedCarePlan(t),
      treatmentStatuses: seedTreatmentStatuses(t),
      membership: seedMembership(t),
      orders: seedOrders(t),
      messages: seedMessages(t),
      intakes: [] as IntakeSubmission[],
      users: new Map<string, { firstName: string; lastName: string }>(),
      nextId: 1,
    };
  }

  async function simulate<T>(fn: () => T, { canFail = true } = {}): Promise<T> {
    if (simulation.latencyMs > 0) await new Promise((r) => setTimeout(r, simulation.latencyMs));
    if (canFail && simulation.forceNetworkError) {
      throw new IntegrationError('Simulated network failure', 'network');
    }
    return fn();
  }

  function id(prefix: string) {
    store.nextId += 1;
    return `${prefix}-${store.nextId}`;
  }

  function issueTokens(): AuthTokens {
    return {
      accessToken: opaqueToken('mock_at'),
      refreshToken: opaqueToken('mock_rt'),
      expiresAt: new Date(now().getTime() + simulation.tokenLifetimeMinutes * 60_000).toISOString(),
    };
  }

  function userFor(email: string) {
    const known = store.users.get(email.toLowerCase());
    return {
      ...demoUser,
      email: email.toLowerCase(),
      firstName: known?.firstName ?? demoUser.firstName,
      lastName: known?.lastName ?? demoUser.lastName,
    };
  }

  const sortByStart = (a: Appointment, b: Appointment) => a.startsAt.localeCompare(b.startsAt);

  return {
    mode: 'mock',
    isSimulated: true,
    simulation,
    reset() {
      store = createStore();
    },

    auth: {
      signIn: (email, password) =>
        simulate(() => {
          // Demo rule: a password of "wrong-password" exercises the failure path.
          if (password === 'wrong-password') {
            throw new IntegrationError('Invalid credentials', 'invalid-credentials');
          }
          return { user: userFor(email), tokens: issueTokens() };
        }),
      signUp: (input) =>
        simulate(() => {
          store.users.set(input.email.toLowerCase(), { firstName: input.firstName, lastName: input.lastName });
          return { user: userFor(input.email), tokens: issueTokens() };
        }),
      refresh: () => simulate(() => issueTokens(), { canFail: false }),
      signOut: () => simulate(() => undefined, { canFail: false }),
      requestPasswordReset: () => simulate(() => undefined, { canFail: false }),
      getCurrentUser: () => simulate(() => ({ ...demoUser })),
    },

    appointments: {
      list: () => simulate(() => [...store.appointments].sort(sortByStart)),
      get: (appointmentId) => simulate(() => store.appointments.find((a) => a.id === appointmentId)),
      availability: (type, fromDate, days) =>
        simulate(() => {
          const slots: AvailabilitySlot[] = [];
          const hours = type === 'care-team-check-in' ? [9, 13, 16] : [9, 11, 14, 17];
          for (let d = 1; d <= days; d += 1) {
            const day = new Date(fromDate);
            day.setDate(day.getDate() + d);
            if (day.getDay() === 0) continue; // demo: no Sunday availability
            hours.forEach((h, i) => {
              // Deterministically drop some slots so the picker looks realistic.
              if ((d + i) % 3 === 0) return;
              const s = new Date(day);
              s.setHours(h, 0, 0, 0);
              slots.push({ startsAt: s.toISOString(), clinicianName: demoClinicians[(d + i) % 3].name });
            });
          }
          return slots;
        }),
      schedule: (request) =>
        simulate(() => {
          const clinician = request.type === 'care-team-check-in' ? demoClinicians[1] : demoClinicians[0];
          const appointment: Appointment = {
            id: id('appt'),
            type: request.type,
            title: appointmentTitles[request.type],
            status: 'scheduled',
            modality: request.modality,
            startsAt: request.startsAt,
            durationMinutes: appointmentDurations[request.type],
            clinicianName: clinician.name,
            clinicianTitle: clinician.title,
            preparation: ['This is a simulated booking. No clinician will join.'],
          };
          store.appointments.push(appointment);
          return appointment;
        }),
      cancel: (appointmentId) =>
        simulate(() => {
          const appt = store.appointments.find((a) => a.id === appointmentId);
          if (!appt) throw new IntegrationError('Appointment not found', 'not-found');
          appt.status = 'cancelled';
          return { ...appt };
        }),
    },

    intake: {
      submit: (request) =>
        simulate(() => {
          const submission: IntakeSubmission = {
            id: id('intake'),
            interestSlug: request.interestSlug,
            status: 'submitted',
            submittedAt: now().toISOString(),
            simulated: true,
          };
          store.intakes.push(submission);
          return submission;
        }),
      list: () => simulate(() => [...store.intakes]),
    },

    carePlans: {
      getCurrent: () => simulate(() => store.carePlan),
      treatmentStatuses: () => simulate(() => [...store.treatmentStatuses]),
    },

    memberships: {
      getCurrent: () => simulate(() => ({ ...store.membership })),
      requestEnrollment: ({ tierId, packageSlug }) =>
        simulate(() => {
          const next: Membership = {
            ...store.membership,
            tierId,
            packageSlug: packageSlug ?? store.membership.packageSlug,
            status: 'pending-evaluation',
          };
          store.membership = next;
          return { ...next };
        }),
      requestCancellation: () =>
        simulate(() => {
          store.membership = { ...store.membership, status: 'cancelled', renewsOn: null };
          return { ...store.membership };
        }),
    },

    orders: { list: () => simulate(() => [...store.orders]) },

    messages: {
      list: () => simulate(() => [...store.messages]),
      send: (body) =>
        simulate(() => {
          const message: SecureMessage = {
            id: id('msg'),
            threadId: 'thread-1',
            from: 'patient',
            senderName: 'You',
            body,
            sentAt: now().toISOString(),
            read: true,
          };
          store.messages.push(message);
          return message;
        }),
    },

    telehealth: {
      getVisitSession: (appointmentId) =>
        simulate(() => {
          const appt = store.appointments.find((a) => a.id === appointmentId);
          if (!appt) throw new IntegrationError('Appointment not found', 'not-found');
          const opensAt = new Date(new Date(appt.startsAt).getTime() - 10 * 60_000);
          return {
            appointmentId,
            status: now() >= opensAt ? 'waiting-room' : 'not-open',
            joinUrl: null,
            opensAt: opensAt.toISOString(),
            simulated: true,
          };
        }),
    },

    handoff: { urlFor: () => null },
  };
}
