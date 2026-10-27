# Security, privacy and compliance review checklist

> Implementing encryption, authentication or any item below does **not**
> make the app HIPAA compliant. Compliance depends on contracts (BAAs),
> administrative and physical safeguards, policies, risk analysis, workforce
> training and ongoing operations — most of which live outside this code.
> Items marked **REVIEW** require sign-off from a qualified legal, clinical,
> privacy or independent security reviewer before launch.

Legend: ✅ implemented in Milestone 1 · 🟡 partially / demo only · ⬜ not started

## Authentication and sessions

| | Control | Where | Notes |
| --- | --- | --- | --- |
| 🟡 | Authentication architecture via a port, ready for OIDC + PKCE | `integrations/karpa/ports.ts` | Mock only. No identity provider chosen. **REVIEW** |
| ✅ | Tokens stored in iOS Keychain / Android Keystore (`expo-secure-store`, `AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY`) | `services/auth/secureStorage.ts` | Web preview keeps tokens in memory only |
| ✅ | Idle timeout (15 min), absolute timeout (12 h), check on foreground | `services/auth/session.ts`, `state/SessionProvider.tsx` | Values are placeholders. **REVIEW** |
| ✅ | Token refresh before expiry; sign-out on refresh failure | `SessionProvider.tsx` | |
| ✅ | Sign-out clears tokens, in-memory journey data and mock store | `SessionProvider.tsx`, `JourneyProvider.tsx` | Server-side revocation needed with a real IdP |
| ✅ | Strong password rules (12+, mixed case, number, symbol) | `lib/validation.ts` | Final policy should follow NIST 800-63B and the IdP |
| ✅ | Password reset response identical whether or not account exists | `app/forgot-password.tsx` | |
| ⬜ | Multi-factor authentication | — | Depends on IdP. **REVIEW** |
| ⬜ | Biometric unlock (Face ID / fingerprint) | — | Planned; requires review of fallback and re-auth rules |
| ⬜ | Rate limiting / lockout on failed sign-in | — | Must be server-side |

## Authorization

| | Control | Notes |
| --- | --- | --- |
| ✅ | Role model (patient, support, clinician, admin) with permission checks | `services/auth/permissions.ts` |
| ✅ | Patient app admits only the `patient` role | `APP_ALLOWED_ROLES` |
| ✅ | Signed-out users cannot reach patient routes (`Stack.Protected`) | `app/_layout.tsx` (integration-tested) |
| ⬜ | Server-side enforcement of every permission | The device is never trusted. Required before real data |

## Data minimization and storage

| | Control | Notes |
| --- | --- | --- |
| ✅ | Account creation collects name, email, DOB (age check only, not sent) and password — no health data | `app/create-account.tsx` |
| ✅ | Demo stores no PHI; all data is fictional and in memory | `data/demo/*` |
| ✅ | Wellness journal and weight entries are in-memory and wiped on sign-out | `state/JourneyProvider.tsx` |
| ⬜ | Decide where self-tracked data lives in production (device-encrypted vs. backend) | Self-tracked data is health information. **REVIEW** |
| ✅ | Android `allowBackup: false` | `app.json` |
| ⬜ | Screen-capture protection / app-switcher snapshot blur on sensitive screens | Needs a native module + dev build |
| ⬜ | Jailbreak/root detection policy | Decide whether to warn or block. **REVIEW** |

## Transport

| | Control | Notes |
| --- | --- | --- |
| ✅ | Portal handoff accepts HTTPS only, allow-listed hosts, no data in URLs | `integrations/karpa/hostedPortal.ts` (tested) |
| ✅ | No cleartext traffic configured (platform defaults: ATS on iOS, cleartext off on Android 9+) | |
| ⬜ | Certificate pinning decision | Weigh against operational risk. **REVIEW** |

## Logging, analytics and crash reporting

| | Control | Notes |
| --- | --- | --- |
| ✅ | Audit log with allow-listed metadata only (no PHI, no free text) | `services/audit.ts` (tested) |
| ⬜ | Forward audit events to a tamper-evident server-side store | Device log is not the audit trail |
| ✅ | No analytics, ad or tracking SDKs installed | `package.json` |
| ✅ | Analytics guard: event and property allow-lists, PII redaction, health interest dropped | `services/analytics.ts` (tested) |
| ✅ | iOS privacy manifest declares no tracking | `app.json` |
| ⬜ | Crash reporting vendor with PHI scrubbing and a BAA, or none | **REVIEW** |
| ✅ | Free-text fields (visit reason, messages) never logged | `appointments/schedule.tsx`, `audit.ts` |

## Notifications

| | Control | Notes |
| --- | --- | --- |
| ✅ | Notification copy never includes treatment, condition, clinician or message content | `services/notifications.ts` (tested against every catalog term) |
| ✅ | Per-type opt-outs and "hide previews" | `app/account/notifications.tsx` |
| ⬜ | Push provider, token storage and backend | Not implemented |

## Account lifecycle

| | Control | Notes |
| --- | --- | --- |
| ✅ | In-app account-deletion request (App Store 5.1.1(v), Google Play policy) | `app/account/delete.tsx` |
| ⬜ | Backend deletion workflow + retention schedule for medical records | Retention language is a placeholder. **REVIEW (legal)** |
| ✅ | Account recovery entry point (password reset) | Real flow depends on IdP |

## Features that require review before launch

- **Legal:** Terms of Service, Privacy Policy, HIPAA Notice, Telehealth Consent wording (app shows "pending legal review"); account-deletion retention language; state-by-state telehealth rules; subscription auto-renewal disclosures (e.g. state ARL laws); marketing claims on catalog pages.
- **Clinical:** every treatment listing (compounded, off-label and peptide items in particular — e.g. sildenafil, tadalafil, finasteride and oral minoxidil are presented on the live site as off-label for women; earlier repository work withheld several peptides pending lawful-availability review); the consultation pre-screen questions; care-plan and treatment-status language; the urgent-symptom routing message; wellness-resource articles (placeholders).
- **Privacy:** where journal/weight data is stored; whether Mrs. Collection or treatment interest is treated as PHI in every system it touches; data-sharing with Karpa, Rx Ave and any physician group; notification defaults.
- **Independent security:** penetration test and mobile app security assessment (OWASP MASVS L2 recommended) before real patient data; threat model for the backend; secrets management.

## Brand imagery

Campaign images are copied from `public/images` in this repository (the brand's own approved renders, per `public/images/README.md`). Confirm licensing and model releases cover use in a mobile app and in app-store screenshots.
