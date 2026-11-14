import type {
  Appointment,
  AuthUser,
  CarePlan,
  Membership,
  Order,
  SecureMessage,
  TreatmentStatus,
} from '@/integrations/karpa/types';

/**
 * FICTIONAL DEMONSTRATION DATA.
 *
 * Every person, clinician, appointment and message below is invented. None of
 * it is protected health information and none of it describes a real patient.
 * Clinicians are given fictional names and generic titles; no credentials are
 * claimed. Care-plan content is deliberately non-prescriptive: no medication
 * names, doses or individual recommendations appear in demo data.
 *
 * Dates are generated relative to `now` so the demo always has upcoming and
 * past items.
 */

export const DEMO_PASSWORD_HINT = 'Any valid email and a password that meets the rules will sign you in to the demo.';

export const demoUser: AuthUser = {
  id: 'demo-user-001',
  email: 'demo@example.com',
  firstName: 'Amara',
  lastName: 'Demo',
  role: 'patient',
};

export const demoClinicians = [
  { name: 'Dr. Elise Marlowe (fictional)', title: 'Licensed clinician — demo profile' },
  { name: 'Nadia Reyes (fictional)', title: 'Care coordinator — demo profile' },
  { name: 'Dr. Simone Park (fictional)', title: 'Licensed clinician — demo profile' },
] as const;

function at(now: Date, dayOffset: number, hour: number, minute = 0): string {
  const d = new Date(now);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export function seedAppointments(now: Date): Appointment[] {
  return [
    {
      id: 'appt-101',
      type: 'initial-consultation',
      title: 'Hormones & Menopause consultation',
      status: 'scheduled',
      modality: 'video',
      startsAt: at(now, 3, 10, 30),
      durationMinutes: 30,
      clinicianName: demoClinicians[0].name,
      clinicianTitle: demoClinicians[0].title,
      preparation: [
        'Find a private, well-lit space with a stable connection.',
        'Have a list of your current medications and supplements ready.',
        'Write down the questions you want to ask.',
      ],
    },
    {
      id: 'appt-102',
      type: 'care-team-check-in',
      title: 'Care team check-in',
      status: 'scheduled',
      modality: 'phone',
      startsAt: at(now, 17, 14, 0),
      durationMinutes: 15,
      clinicianName: demoClinicians[1].name,
      clinicianTitle: demoClinicians[1].title,
      preparation: ['Note anything you’d like to update in your wellness goals.'],
    },
    {
      id: 'appt-090',
      type: 'care-team-check-in',
      title: 'Welcome call',
      status: 'completed',
      modality: 'phone',
      startsAt: at(now, -12, 11, 0),
      durationMinutes: 15,
      clinicianName: demoClinicians[1].name,
      clinicianTitle: demoClinicians[1].title,
      preparation: [],
      summary: 'Reviewed how the app works, membership options and next steps for your consultation.',
    },
    {
      id: 'appt-085',
      type: 'lab-review',
      title: 'Lab-order planning visit',
      status: 'cancelled',
      modality: 'video',
      startsAt: at(now, -20, 9, 0),
      durationMinutes: 20,
      clinicianName: demoClinicians[2].name,
      clinicianTitle: demoClinicians[2].title,
      preparation: [],
      summary: 'Cancelled and rescheduled into your upcoming consultation.',
    },
  ];
}

export function seedCarePlan(now: Date): CarePlan {
  return {
    id: 'plan-001',
    title: 'Your welcome plan',
    updatedAt: at(now, -2, 9),
    focusAreas: ['Hormones & Menopause', 'Rest & Well-Being'],
    items: [
      {
        id: 'cp-1',
        title: 'Complete your health history',
        detail: 'Shared securely before your consultation so your clinician can prepare.',
        status: 'done',
      },
      {
        id: 'cp-2',
        title: 'Attend your consultation',
        detail: 'Your clinician will review your goals and decide whether any treatment is appropriate.',
        status: 'in-progress',
      },
      {
        id: 'cp-3',
        title: 'Labs, if your clinician orders them',
        detail: 'Some care requires lab testing first. You’ll be told before anything is ordered.',
        status: 'todo',
      },
      {
        id: 'cp-4',
        title: 'Build a restful evening routine',
        detail: 'A personal wellness goal you set during your welcome call.',
        status: 'in-progress',
      },
    ],
    careTeam: [
      { name: demoClinicians[0].name, role: 'Clinician (demo)' },
      { name: demoClinicians[1].name, role: 'Care coordinator (demo)' },
    ],
  };
}

export function seedTreatmentStatuses(now: Date): TreatmentStatus[] {
  return [
    {
      id: 'ts-1',
      programName: 'Hormones & Menopause evaluation',
      stage: 'clinician-review',
      stageLabel: 'Awaiting clinician review',
      updatedAt: at(now, -1, 16),
      nextStep: 'Attend your consultation. No treatment is decided until your clinician evaluates you.',
    },
  ];
}

export function seedMembership(now: Date): Membership {
  return {
    tierId: 'signature',
    packageSlug: 'mrs-jones',
    status: 'pending-evaluation',
    memberSince: null,
    renewsOn: at(now, 30, 0),
  };
}

export function seedOrders(now: Date): Order[] {
  return [{ id: 'ord-1', label: 'Welcome kit (non-clinical, demo)', status: 'shipped', updatedAt: at(now, -4, 12) }];
}

export function seedMessages(now: Date): SecureMessage[] {
  return [
    {
      id: 'msg-1',
      threadId: 'thread-1',
      from: 'care-team',
      senderName: demoClinicians[1].name,
      body: 'Welcome to Eve’s Sisters! Your consultation is booked. Reply here if you have questions before your visit. (Demo message)',
      sentAt: at(now, -2, 10),
      read: false,
    },
  ];
}
