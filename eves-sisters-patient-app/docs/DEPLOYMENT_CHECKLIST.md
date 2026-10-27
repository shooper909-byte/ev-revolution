# Deployment preparation checklist (Milestone 5)

Nothing here has been executed. No accounts have been created, nothing has
been purchased, and nothing has been published. Each step needs explicit
approval from Eve's Sisters.

## Accounts and ownership (owner: Eve's Sisters)

- [ ] Apple Developer Program membership in the **company's** name (D-U-N-S number required) — USD 99/year
- [ ] Google Play Console account in the company's name — USD 25 one-time; organization verification
- [ ] Expo account / EAS organization owned by the company (EAS Build has free and paid tiers)
- [ ] Decide bundle identifiers (placeholders: `com.evessisters.patient` in `app.json`)

## Pre-requisites from other milestones

- [ ] Karpa integration authorized and implemented, or hosted-portal handoff approved (Milestone 3)
- [ ] All **REVIEW** items in `SECURITY_COMPLIANCE_CHECKLIST.md` signed off (Milestone 4)
- [ ] Final legal documents published and linked: Privacy Policy, Terms, HIPAA Notice, Telehealth Consent, Subscription Cancellation
- [ ] Production backend (if any) deployed with BAA coverage, monitoring and backups
- [ ] Remove or gate the "Demo controls" section in Account → Settings
- [ ] Replace every `[Placeholder — confirm before launch]` and "pending legal review" string (`grep -rn "Placeholder\|pending legal" src`)
- [ ] Re-verify catalog copy against the live site and update `catalogSource.retrieved`

## Build configuration

- [ ] Add `eas.json` with `development`, `preview` and `production` profiles (template in README)
- [ ] App version and build numbers strategy (`version` in `app.json`; `autoIncrement` in EAS)
- [ ] Production environment variables set in EAS (only `EXPO_PUBLIC_*` non-secrets in the app)
- [ ] App icon and splash reviewed on device (current assets derive from the brand logo)
- [ ] Development build for any native modules beyond Expo Go (e.g. screen-capture protection, video SDK)

## Apple App Store

- [ ] App Store Connect record; age rating questionnaire (medical information)
- [ ] App Privacy "nutrition label" — must match actual data collection (health, contact info, identifiers)
- [ ] Privacy manifest reviewed (`ios.privacyManifests` in `app.json`)
- [ ] Guideline 5.1.1(v): in-app account deletion ✅ (backend workflow still needed)
- [ ] Guideline 1.4.1 (medical apps): disclose methodology; clinicians and credentials verifiable
- [ ] Guideline 3.1: membership purchases — confirm whether medical services qualify for external payment (physical/real-world services usually do; digital content does not). **REVIEW**
- [ ] Demo reviewer account with no PHI; review notes explaining telehealth flow
- [ ] Screenshots (6.9", 6.5", iPad if `supportsTablet`)
- [ ] Export compliance (`usesNonExemptEncryption: false` set; confirm)

## Google Play

- [ ] Data safety form — must match actual collection and sharing
- [ ] Health apps declaration and, if applicable, the Health Connect / medical device policies
- [ ] Account deletion: in-app ✅ plus a **web** deletion URL (required by Play)
- [ ] Target API level meets current Play requirement (Expo SDK 58 default)
- [ ] Closed testing track with at least the required number of testers before production (new personal accounts); internal track first

## Release operations

- [ ] Crash reporting decision (PHI-scrubbed, BAA-covered, or none)
- [ ] OTA update policy (EAS Update): what may ship without store review; rollback plan
- [ ] Incident response and breach-notification runbook
- [ ] Support inbox monitored (`care@evevolutionhealth.com`), response-time commitments
