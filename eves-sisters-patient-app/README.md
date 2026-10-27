# Eve’s Sisters — patient app

*Fall in Love With Yourself Again.*

The Eve’s Sisters mobile app for iOS and Android: React Native, Expo SDK 58,
TypeScript (strict) and Expo Router.

> **Preview build.** All clinical data is fictional and every clinical
> action (consultation requests, booking, video visits, messages, membership
> enrollment) is **simulated**. There is no live Karpa Health integration.
> Please don’t enter real personal or health information.

## Preview on your phone

1. Install **Expo Go** from the App Store or Google Play.
2. On a computer with Node 20+:
   ```bash
   cd eves-sisters-patient-app
   npm install
   npx expo start
   ```
3. Scan the QR code — with the Camera app on iOS, or from inside Expo Go on
   Android. Phone and computer must be on the same network; if they aren’t,
   use `npx expo start --tunnel`.

Everything in this milestone runs in **Expo Go** (no custom native code).
A development build (`npx expo run:ios|android` or `eas build --profile
development`) will be needed once native modules such as a video SDK or
screen-capture protection are added.

Demo sign-in: any valid email and a password that meets the rules
(e.g. `Sunlit-Garden-42`). The password `wrong-password` shows the failure
path. Account → Settings → **Simulate network errors** shows error states.

Web preview (`npm run web`) is for design review only. On the web, sign-in
tokens are kept in memory, so a page reload signs you out.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Expo dev server |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (eslint-config-expo) |
| `npm test` | Jest unit + integration tests |
| `npm run check` | typecheck + lint + tests |
| `npm run doctor` | `expo-doctor` |

## Project structure

```
eves-sisters-patient-app/
├── app.json                  Expo config (name, icons, splash, bundle ids, privacy manifest)
├── assets/images/            Brand logo, icon, splash, campaign imagery (from ../public/images)
├── docs/                     Integration, security, testing, deployment, risk documents
├── __tests__/                unit/ and integration/ Jest suites
└── src/
    ├── app/                  Routes (Expo Router). Every file is a screen.
    │   ├── _layout.tsx       Fonts, providers, Stack with protected route groups
    │   ├── index.tsx         Branded splash → routes by session
    │   ├── welcome.tsx       Onboarding (3 slides) + Sign in / Create account / Explore
    │   ├── sign-in, create-account, forgot-password
    │   ├── explore.tsx       Public service catalog
    │   ├── (tabs)/           Home · Care · Visits · Journey · Account
    │   ├── collection/[slug] Mrs. Collection package detail
    │   ├── categories/[slug] Care area / pathway
    │   ├── treatments/[slug] Treatment information + Start consultation
    │   ├── memberships.tsx   Membership tiers
    │   ├── consultation/     Simulated consultation request (pre-screen + consent)
    │   ├── membership/       Simulated enrollment wizard
    │   ├── appointments/     Details, scheduling wizard, video-visit entry point
    │   ├── journey/          Goal, weight, energy & mood forms
    │   ├── account/          Profile, membership, notifications, privacy, support, settings, delete
    │   └── messages.tsx      Simulated secure messages
    ├── components/
    │   ├── ui/               Design system: AppText, Button, Card, TextField, Notice, states…
    │   ├── catalog/          Mrs./category/treatment/tier cards, catalog, Start consultation
    │   └── appointments/
    ├── theme/                Tokens (colour, type, spacing, radii, shadow) + contrast helper
    ├── data/
    │   ├── catalog/          VERIFIED copy from the live telehealth site (see source.ts)
    │   └── demo/             FICTIONAL demo data
    ├── integrations/karpa/   Ports, mock adapter, hosted-portal fallback, config
    ├── services/             Session policy, secure storage, RBAC, audit, analytics guard, notifications
    ├── state/                Session, preferences, wellness-journey state
    ├── hooks/useAsync.ts     Loading / success / error for every data screen
    └── lib/                  Validation and formatting
```

## Design system

Tokens live in `src/theme/tokens.ts`: deep burgundy (`#5C1A33`), dusty rose
(`#C48B9F`), blush (`#F6E3E6`), warm ivory (`#FAF5EF`) and champagne gold
(`#C9A96B`, used only for rules and icons — it fails text contrast on light
backgrounds). Headings use Playfair Display; body text uses Inter. All
text/background pairs are tested for WCAG AA contrast. Buttons and rows meet
a 48pt minimum touch target, text scales with the system font size (capped
at 1.6×), and the splash honours Reduce Motion.

## Content sources

- **Mrs. Collection, treatments, care areas, membership tiers, trust points,
  “How it works”** — transcribed verbatim from the live Eve’s Sisters
  telehealth site that evevolutionhealth.com hands care off to; retrieved
  2026-10-27 (`src/data/catalog/source.ts`).
- **Per-treatment prices are not published** on the live site, so the app
  shows the site’s own statement (“personalized… memberships start at
  $199/month”) instead of prices. Older prices from this repository’s
  history were deliberately not carried forward.
- **Demo data** (patient, clinicians, appointments, care plan, messages,
  resources) is fictional and labelled as such in the UI.

## Environment

Copy `.env.example` to `.env.local`. Only `EXPO_PUBLIC_*` variables exist,
and they are bundled into the app, so **never put secrets in them**.

## EAS (not yet configured)

When builds are approved, add an `eas.json` such as:

```json
{
  "cli": { "appVersionSource": "remote" },
  "build": {
    "development": { "developmentClient": true, "distribution": "internal" },
    "preview": { "distribution": "internal" },
    "production": { "autoIncrement": true }
  }
}
```

## Documents

- [Karpa integration requirements & open questions](docs/KARPA_INTEGRATION_REQUIREMENTS.md)
- [Security & compliance review checklist](docs/SECURITY_COMPLIANCE_CHECKLIST.md)
- [Testing instructions & results](docs/TESTING.md)
- [Deployment preparation checklist](docs/DEPLOYMENT_CHECKLIST.md)
- [Remaining work & cost-risk assessment](docs/REMAINING_WORK_AND_RISK.md)
