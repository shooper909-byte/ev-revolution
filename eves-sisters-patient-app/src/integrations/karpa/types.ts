/**
 * Domain types the app needs from a clinical platform.
 *
 * IMPORTANT: these describe what the *app* needs. They are NOT Karpa Health's
 * data model — no Karpa API documentation has been provided, and nothing here
 * should be read as a claim about Karpa's endpoints, fields or capabilities.
 * When official documentation arrives, a live adapter maps Karpa's real
 * payloads onto these types (see docs/KARPA_INTEGRATION_REQUIREMENTS.md).
 */

export type ISODateTime = string;

export type Role = 'patient' | 'support' | 'clinician' | 'admin';

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
};

export type AuthTokens = {
  /** Opaque access token. Never logged, never placed in analytics or URLs. */
  accessToken: string;
  /** Opaque refresh token, stored only in the device keystore. */
  refreshToken: string;
  /** Absolute expiry of the access token. */
  expiresAt: ISODateTime;
};

export type SignInResult = { user: AuthUser; tokens: AuthTokens };

export type AppointmentType = 'initial-consultation' | 'follow-up' | 'lab-review' | 'care-team-check-in';
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';
export type AppointmentModality = 'video' | 'async-review' | 'phone';

export type Appointment = {
  id: string;
  type: AppointmentType;
  title: string;
  status: AppointmentStatus;
  modality: AppointmentModality;
  startsAt: ISODateTime;
  durationMinutes: number;
  /** Display name of a fictional clinician in demo mode. */
  clinicianName: string;
  clinicianTitle: string;
  /** Non-clinical preparation notes. */
  preparation: string[];
  /** Short non-clinical summary for past visits. */
  summary?: string;
};

export type AvailabilitySlot = { startsAt: ISODateTime; clinicianName: string };

export type ScheduleRequest = {
  type: AppointmentType;
  modality: AppointmentModality;
  startsAt: ISODateTime;
  /** Optional free-text reason — treated as sensitive and never logged. */
  reason?: string;
};

export type IntakeStatus = 'not-started' | 'in-progress' | 'submitted' | 'under-review' | 'completed';

export type IntakeRequest = {
  /** Treatment category or Mrs. Collection slug the patient is interested in. */
  interestSlug: string;
  /** Answers to safety pre-screen questions; values are only "yes" / "no" / "unsure". */
  preScreen: Record<string, 'yes' | 'no' | 'unsure'>;
  stateOfResidence: string;
  consentToTelehealth: boolean;
};

export type IntakeSubmission = {
  id: string;
  interestSlug: string;
  status: IntakeStatus;
  submittedAt: ISODateTime;
  /** Always true from the mock adapter; the UI must say so. */
  simulated: boolean;
};

export type CarePlanItemStatus = 'todo' | 'in-progress' | 'done';

export type CarePlan = {
  id: string;
  title: string;
  updatedAt: ISODateTime;
  focusAreas: string[];
  items: { id: string; title: string; detail: string; status: CarePlanItemStatus }[];
  careTeam: { name: string; role: string }[];
};

export type TreatmentStatusStage = 'interest' | 'intake' | 'clinician-review' | 'plan-ready' | 'active' | 'paused';

export type TreatmentStatus = {
  id: string;
  programName: string;
  stage: TreatmentStatusStage;
  stageLabel: string;
  updatedAt: ISODateTime;
  nextStep: string;
};

export type MembershipStatus = 'none' | 'pending-evaluation' | 'active' | 'paused' | 'cancelled';

export type Membership = {
  tierId: 'essentials' | 'signature' | 'elite' | null;
  /** Optional Mrs. Collection package the member is exploring. */
  packageSlug: string | null;
  status: MembershipStatus;
  memberSince: ISODateTime | null;
  renewsOn: ISODateTime | null;
};

export type OrderStatus = 'awaiting-prescription' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type Order = {
  id: string;
  /** Deliberately generic in the demo — no medication names. */
  label: string;
  status: OrderStatus;
  updatedAt: ISODateTime;
};

export type SecureMessage = {
  id: string;
  threadId: string;
  from: 'patient' | 'care-team';
  senderName: string;
  body: string;
  sentAt: ISODateTime;
  read: boolean;
};

export type TelehealthVisitStatus = 'not-open' | 'waiting-room' | 'in-progress' | 'ended';

export type TelehealthVisitSession = {
  appointmentId: string;
  status: TelehealthVisitStatus;
  /** Where the video visit would be joined; null until a vendor is approved. */
  joinUrl: string | null;
  opensAt: ISODateTime;
  simulated: boolean;
};

/** Destinations the app could hand off to a hosted, vendor-operated portal. */
export type HandoffTarget = 'intake' | 'scheduling' | 'video-visit' | 'messages' | 'billing' | 'records';
