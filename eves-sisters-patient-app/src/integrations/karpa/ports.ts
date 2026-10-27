import type {
  Appointment,
  AvailabilitySlot,
  AppointmentType,
  AuthTokens,
  AuthUser,
  CarePlan,
  HandoffTarget,
  IntakeRequest,
  IntakeSubmission,
  Membership,
  Order,
  ScheduleRequest,
  SecureMessage,
  SignInResult,
  TelehealthVisitSession,
  TreatmentStatus,
} from './types';

/**
 * Ports: the contract every adapter (mock, hosted-portal, or a future live
 * Karpa adapter) must satisfy. Screens depend on these interfaces only, so the
 * backing system can change without touching UI code.
 */

export interface AuthPort {
  signIn(email: string, password: string): Promise<SignInResult>;
  signUp(input: { email: string; password: string; firstName: string; lastName: string }): Promise<SignInResult>;
  refresh(refreshToken: string): Promise<AuthTokens>;
  signOut(accessToken: string): Promise<void>;
  /** Always resolves, whether or not the account exists, to avoid account enumeration. */
  requestPasswordReset(email: string): Promise<void>;
  getCurrentUser(accessToken: string): Promise<AuthUser>;
}

export interface AppointmentsPort {
  list(): Promise<Appointment[]>;
  get(id: string): Promise<Appointment | undefined>;
  availability(type: AppointmentType, fromDate: Date, days: number): Promise<AvailabilitySlot[]>;
  schedule(request: ScheduleRequest): Promise<Appointment>;
  cancel(id: string): Promise<Appointment>;
}

export interface IntakePort {
  submit(request: IntakeRequest): Promise<IntakeSubmission>;
  list(): Promise<IntakeSubmission[]>;
}

export interface CarePlansPort {
  getCurrent(): Promise<CarePlan | null>;
  treatmentStatuses(): Promise<TreatmentStatus[]>;
}

export interface MembershipsPort {
  getCurrent(): Promise<Membership>;
  /** Records interest only; no payment is ever collected in the app. */
  requestEnrollment(input: { tierId: NonNullable<Membership['tierId']>; packageSlug?: string | null }): Promise<Membership>;
  requestCancellation(): Promise<Membership>;
}

export interface OrdersPort {
  list(): Promise<Order[]>;
}

export interface MessagesPort {
  list(): Promise<SecureMessage[]>;
  send(body: string): Promise<SecureMessage>;
}

export interface TelehealthPort {
  getVisitSession(appointmentId: string): Promise<TelehealthVisitSession>;
}

export interface HandoffPort {
  /**
   * The approved hosted-portal URL for a target, or null when none is
   * configured and approved. Implementations must never append tokens or PHI
   * to the URL.
   */
  urlFor(target: HandoffTarget): string | null;
}

export type IntegrationMode = 'mock' | 'hosted-portal' | 'live';

export interface ClinicalPlatformClient {
  readonly mode: IntegrationMode;
  /** True when every clinical response is simulated. The UI must disclose this. */
  readonly isSimulated: boolean;
  auth: AuthPort;
  appointments: AppointmentsPort;
  intake: IntakePort;
  carePlans: CarePlansPort;
  memberships: MembershipsPort;
  orders: OrdersPort;
  messages: MessagesPort;
  telehealth: TelehealthPort;
  handoff: HandoffPort;
}
