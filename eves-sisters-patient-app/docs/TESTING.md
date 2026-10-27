# Testing

## Commands

```bash
npm run typecheck   # TypeScript, strict
npm run lint        # ESLint (eslint-config-expo, incl. React Compiler rules)
npm test            # Jest (jest-expo preset)
npm run check       # all three, as CI would run them
npx expo-doctor     # Expo dependency/config health
```

## What is covered

**Unit (`__tests__/unit`)**

| Suite | Covers |
| --- | --- |
| `theme.test.ts` | WCAG AA (4.5:1) contrast for every text/background pairing; gold kept out of text roles |
| `validation.test.ts` | Email, password rules, adult date-of-birth, names, phone, weight, state, form helper, DOB auto-format |
| `security.test.ts` | Session idle/absolute timeouts and refresh; role permissions; analytics redaction; audit metadata allow-list and bound; notification copy contains no catalog/clinical terms; hosted-portal HTTPS + host allow-list |
| `catalog.test.ts` | Exactly three Mrs. Collection packages; all cross-references resolve; every treatment has safety considerations; **no dosing strengths** and **no per-treatment prices** in catalog copy; membership prices match the published tiers; search |
| `mockClient.test.ts` | Mock adapter is flagged simulated; scheduling/cancel; availability rules; intake and enrollment are simulated; no video join URL; forced network errors; credential failure path; reset |
| `journey.test.ts` | Goal completion → milestone once; ordering; neutral weight-trend wording; energy average; hiding weight keeps data |

**Integration (`__tests__/integration/app.test.tsx`)** — renders the real
`src/app` directory (root layout, providers, protected routes) with
`expo-router/testing-library`:

- sign-in validation; bad-credential error clears the password
- sign in → dashboard → sign out → welcome
- patient routes blocked when signed out
- treatment page shows safety disclosures, "never provides dosing", and asks visitors to sign in before a consultation
- Mrs. Collection page and pricing statement render
- unknown treatment shows the not-found state
- network failure shows the error state, then "Try again" recovers
- schedule a simulated appointment end to end (review disabled until a time is picked)
- journal check-in validates, then saves

## Results — Milestone 1 (2026-10-27)

| Check | Result |
| --- | --- |
| `tsc --noEmit` | ✅ 0 errors |
| `expo lint` | ✅ 0 errors, 0 warnings |
| `jest --ci` | ✅ 7 suites, **105 tests passed** |
| `expo-doctor` | ✅ 20/20 checks passed |
| `expo export` (android, ios, web) | ✅ Hermes bundles built (Android 3.3 MB, iOS 3.0 MB); web build OK |
| Web smoke test (Playwright, 390×844 and 375×700) | ✅ Splash, onboarding, explore, treatment, Mrs. Jones, sign-in validation, dashboard, visits, scheduling, consultation, membership, notifications, deletion, journal; **0 console errors** |

Not yet run: on-device testing on physical iOS/Android hardware (this
environment has no simulator), VoiceOver/TalkBack passes, and
performance profiling. These belong to Milestone 4.

## Manual test script (on a phone)

1. Launch → branded splash → welcome. Swipe through three slides.
2. **Explore services** → Mrs. Collection → Mrs. Golden; Treatments → search "estradiol".
3. On a treatment page, tap **Start consultation** → prompted to create an account.
4. **Create account** with an invalid DOB (under 18) → error; fix and submit → dashboard.
5. Visits → **Schedule a visit** → pick type, day, time → confirm → see it in Upcoming.
6. Open the appointment → **Go to video visit** → join button is disabled with explanation.
7. Journey → **Check in** without choices → validation; then save.
8. Account → Settings → enable **Simulate network errors** → Home pull-to-refresh / Visits → error state → disable → **Try again**.
9. Leave the app idle 15 minutes (or background and return after) → signed out with a privacy notice.
10. Sign in with password `wrong-password` → safe error message.
