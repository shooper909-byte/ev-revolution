# Karpa Health integration — requirements and open questions

**Status:** Not integrated. No Karpa Health API documentation, SDK, sandbox,
credentials, or written authorization has been provided. The app runs on a
clearly labelled **mock adapter** (`src/integrations/karpa/mock/mockClient.ts`).
Nothing in this repository assumes Karpa offers an API.

Earlier work in this repository refers to a "Karpa Treatment Catalog
(effective 09/2026)" as the source of treatment listings and to Karpa
confirming availability. That tells us Karpa is a clinical/pharmacy
partner. It does **not** tell us that Karpa has a patient-facing API, what
it can do, or how anyone authenticates to it. Every question below needs a
written answer from Karpa before Milestone 3 starts.

## 1. How the app is structured for integration

```
src/integrations/karpa/
  types.ts         App-side domain types (what the app needs — not Karpa's schema)
  ports.ts         Interfaces each adapter must implement
  mock/            MOCK adapter: fictional, in-memory, simulated latency/errors
  hostedPortal.ts  Fallback: hand off to an approved hosted portal URL
  config.ts        Public, non-secret configuration (EXPO_PUBLIC_*)
  errors.ts        Error types + user-safe messages
  index.ts         Chooses the adapter; exports the single `karpa` client
```

Screens only call the ports (`karpa.appointments.list()`, etc.). A live
adapter can replace the mock without UI changes, provided it maps Karpa's
real payloads onto `types.ts`.

### Ports the app needs

| Port | Methods | Used by |
| --- | --- | --- |
| `AuthPort` | signIn, signUp, refresh, signOut, requestPasswordReset, getCurrentUser | Sign in / create account / reset / session refresh |
| `AppointmentsPort` | list, get, availability, schedule, cancel | Visits tab, scheduling wizard, details |
| `IntakePort` | submit, list | Start consultation |
| `CarePlansPort` | getCurrent, treatmentStatuses | Home dashboard |
| `MembershipsPort` | getCurrent, requestEnrollment, requestCancellation | Membership flow, account |
| `OrdersPort` | list | (Dashboard — demo only) |
| `MessagesPort` | list, send | Secure messages |
| `TelehealthPort` | getVisitSession | Video visit entry point |
| `HandoffPort` | urlFor(target) | Hosted-portal fallback |

## 2. Integration options (decide with Karpa)

1. **Direct API (preferred if offered).** The app talks to an
   **Eve's Sisters backend**, which talks to Karpa. The mobile app never
   holds Karpa credentials. Requires a BAA chain and a server.
2. **Hosted portal / deep-link fallback.** If Karpa has a patient portal but
   no API: native screens stay for branded, non-clinical content; clinical
   actions (intake, scheduling, video, messages, billing, records) open the
   approved portal page via `expo-web-browser` (SFSafariViewController /
   Chrome Custom Tabs). Implemented in `hostedPortal.ts`:
   - HTTPS only, host must be in `APPROVED_PORTAL_HOSTS` (empty today).
   - Nothing is appended to the URL — no tokens, email or health data.
   - Each URL is configured by `EXPO_PUBLIC_PORTAL_*` and is null until
     confirmed in writing.
3. **No integration.** The app stays a branded front door that hands off to
   the existing telehealth web flow. Lowest risk, least native value.

## 3. Technical requirements for a live adapter

- Written authorization from Karpa to integrate, and a signed **Business
  Associate Agreement** covering Eve's Sisters (and any backend host).
- Official API reference or SDK, versioned, with a sandbox environment and
  test patients that contain no real PHI.
- An identity model: who is the identity provider (Karpa, Eve's Sisters, a
  third party)? OAuth 2.0 / OIDC with Authorization Code + PKCE for the
  mobile client is the expected pattern; no client secrets in the app.
- Token lifetimes, refresh-token rotation, revocation endpoint, and
  server-side session invalidation on sign-out and account deletion.
- Webhooks or polling for status changes (intake reviewed, plan ready,
  prescription issued, order shipped, message received).
- Rate limits, error codes, idempotency keys for create operations.
- Data residency, encryption at rest, audit-log access, and breach
  notification terms.
- Mapping tables: Karpa programs ↔ app treatment slugs; Karpa appointment
  types ↔ `AppointmentType`; Karpa states of availability.

## 4. Unanswered questions for Karpa

**Access and contracts**
1. Does Karpa offer a patient-facing API, a partner API, an SDK, an embeddable
   widget, a hosted portal, or none of these?
2. Will Karpa sign a BAA with Eve's Sisters for an app integration? Does it
   cover a separate Eve's Sisters backend?
3. What are the costs (setup, per-patient, per-call, per-visit)?

**Identity**
4. Who owns patient identity and login? Can patients sign in once (SSO) to
   both the app and Karpa's systems?
5. Is multi-factor authentication required or supported? Which methods?
6. How is account recovery handled, and who verifies identity?

**Clinical workflows**
7. Can intake be submitted via API, or must it be completed in Karpa's own
   forms? Who approves the questions?
8. Can appointments be listed, booked, rescheduled and cancelled via API?
   How is clinician availability exposed?
9. Which video platform does Karpa use? Is there an SDK, or a join link? Are
   links single-use and time-limited?
10. Are care plans, treatment status and prescription status available to
    read? In what format?
11. Is secure messaging available via API, and what are response-time
    commitments?
12. Which states is each program available in, and how is that exposed?

**Commerce**
13. Who processes membership and treatment payments? Can billing be shown in
    the app, or must it stay in a hosted checkout?
14. How are subscription cancellations and refunds processed and confirmed?

**Data**
15. What patient data does Karpa need from the app, and what can it return?
16. What audit events does Karpa log, and can Eve's Sisters access them?
17. What is Karpa's process for patient data-deletion requests and record
    retention?

## 5. Definition of done for Milestone 3

- Written answers to the questions above, stored with the contract.
- A live adapter implemented **only** for capabilities Karpa documents and
  authorizes; every other port stays on mock or hosted-portal handoff.
- Contract tests against Karpa's sandbox.
- `isSimulated` is false only for ports backed by a live, authorized
  integration, and the UI removes "Demonstration only" notices only there.
