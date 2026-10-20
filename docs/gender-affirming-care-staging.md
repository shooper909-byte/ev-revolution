# Gender-Affirming Care staging handoff

Prepared 2026-10-19. Staging only; production publication requires the user's approval. No commit, push, merge, DNS change, WordPress upload, or production promotion was performed.

## Preview

- Deployment: https://ev-revolution-ex38076px-shooper909-byte.vercel.app/gender-affirming-care
- Deployment ID: `dpl_7unaTCgZuGeRitcjYbSKTFjzM2F4` (READY, preview target).
- Vercel project: `ev-revolution` / `prj_5cJ0GE9ZMmsYj8CaSuIw6fVe5dj0`.
- Branch: `codex/gender-affirming-care-staging`, based on current `origin/main` at `74b7554ab68f9451e41e611981a4b76913c22b70`.
- Vercel serves `X-Robots-Tag: noindex` on the preview. Existing deployment protection remains enabled. A temporary, deployment-specific review link was created through the authenticated CLI; no project-wide protection setting was changed.

## Implemented

Gender-Affirming Care is a direct item in the primary desktop navigation and the first-level mobile menu, between Services and Packages. The page also has footer and Services overview links and an XML sitemap entry.

The landing page contains the editorial violet/gold hero, four planned care pathways, expandable service details, three proposed membership cards ($129, $229, $349), future-stage labels in How It Works, and early-access registration. Availability, clinician eligibility, additional costs, and pending clinical partnership are described as planned. Membership cards lead only to early-access signup.

The existing logo, global brand components, legacy telehealth redirects, and retired medical commerce routes are preserved. The global email popup is suppressed on this page so it does not compete with the dedicated form.

## Changed files

| Files | Purpose |
| --- | --- |
| `src/app/gender-affirming-care/page.tsx`, `affirming.module.css` | Landing page, metadata, responsive styling |
| `src/lib/affirmingCare.ts` | Planned service and membership copy, consent text and version, allowed selections |
| `src/components/AffirmingEarlyAccessForm.tsx` | Required first name/email and unchecked consent; optional state/interest; accessible status and errors |
| `src/app/api/early-access/route.ts` | Server-side validation, rate limiting, honeypot, fixed consent metadata, Brevo integration |
| `src/lib/brevo.ts` | Early-access list routing, namespaced consent attributes, saved membership/consent readback |
| `src/components/SiteHeader.tsx` | Direct navigation and mobile Escape handling |
| `src/components/SiteFooter.tsx` | Planned-care links and page-specific early-access CTA |
| `src/components/EmailCapturePopup.tsx` | Suppress competing capture on the new page |
| `src/app/services/page.tsx`, `src/app/resources/page.tsx` | Working overview and resources navigation destinations |
| `src/app/sitemap.ts` | Add landing, services, resources |
| `public/images/affirming-care/editorial-group.webp` | Optimized editorial asset, 1774×887, 97,316 bytes |
| `.env.example`, `.gitignore` | Document optional list override; protect local environment files |
| `scripts/test-early-access.cjs` | Isolated signup contract checks using mock provider responses |

## Signup verification

The user authorized `info@evevolutionhealth.com` for the test. One consented staging signup was submitted with first name `Staging Test`; optional state and service interest were left blank. The response was HTTP 200 with `pendingConfirmation: false` and the requested success message.

Before returning success, the deployed route read the saved contact back from Brevo and verified every configured list ID plus all submitted attributes, including full consent text, version, timestamp, first name, and `EVS_SIGNUP_SOURCE=gender-affirming-care-early-access`. No API key or contact record is returned to the browser. No confirmation email delivery is claimed.

The adapter provisions only the six namespaced normal/text fields it needs when absent. Existing incompatible fields or a provider error fail closed. It does not retry early-access registration by dropping consent metadata. The existing newsletter behavior is otherwise unchanged. `BREVO_LIST_ID_EARLY_ACCESS` can override the existing default list in a future configuration change; the current preview uses the already-configured mailing list.

## Checks completed

- Dependency installation completed using Node 24.19.0.
- Local `tsc --noEmit`: passed.
- Vercel `npm run build`: passed compilation, type validation, and generation of all 24 routes. There is no standalone lint script configured.
- Signup contract tests: 14 passed, including missing consent, missing backend, incompatible attribute schema, provider rejection, missing saved membership/consent, honeypot, and unchanged newsletter behavior.
- Staging HTTP/content checks: 19 passed. These verify one H1, canonical URL, direct desktop/mobile navigation markup, proposed prices, unchecked consent, planned availability, sitemap, Services/Resources/policy routes, and both rejected unconsented and successful consented live signup.
- `/shop`, `/cart`, `/checkout`, `/my-account`, and `/get-started`: all remain HTTP 404 on staging.
- `git diff --check`: passed.
- Manual React source review: effects clean up their listeners; request handlers prevent duplicate submits; planned content is server-rendered; client behavior is limited to form/menu interactions; no client credentials.

Detailed HTTP evidence and the verification runner are stored outside the repo in `../outputs/gender-affirming-care-20261019/`.

## Still pending

Desktop/mobile screenshots, visual overflow checks, keyboard navigation interaction, service disclosure interaction, and a browser-driven form submission could not be completed. The in-app browser repeatedly timed out while attaching a new tab and while recovering the existing tab (`Emulation.setFocusEmulationEnabled`). A runtime reset did not restore browser control. The app queued the preview-open request. HTTP checks prove rendered navigation markup and server behavior, not actual on-screen visibility or mobile interaction.

Resume those visual and interaction checks when the browser becomes available, fix any issues, and capture desktop/mobile screenshots before recommending production approval. The user can review the temporary staging link in the meantime.

No clinical partner has yet been contracted for gender-affirming care. Any actual treatment launch remains dependent on partner agreement, appropriate clinical/state authorization, final benefits/pricing, and an approved payment structure. This staging work enables only email registration.

After staging approval, commit/push through the established project workflow, preserve WordPress as the production host, package the approved theme as needed, and verify the real production route/assets and signup. Do not treat this Vercel preview as a WordPress release or alter hosting/DNS without authorization.

## Image and source notes

The AI-generated editorial image depicts four fully clothed adults with varied personal styles against violet drapery, with restrained gold accents. It is illustrative and is not presented as patients or clinicians. Generation direction: polished, inclusive luxury editorial group portrait, adult subjects, contemporary jackets, violet/gold palette, suitable for a wide telehealth hero. Optimized to WebP without changing its content. Original generated file: `C:/Users/Shelby Frederick/.codex/generated_images/01a15683-a3bc-7970-8c8b-c802d56bba96/exec-7244fb58-15ac-4590-8910-91b01d8cdf18.png`.

Current primary references checked for cautious service framing (not a claim of legal or clinical approval):

- https://www.dea.gov/press-releases/2025/12/31/dea-extends-telemedicine-flexibilities-ensure-continued-access-care
- https://telehealth.hhs.gov/providers/telehealth-policy/prescribing-controlled-substances-via-telehealth
- https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/testosterone-information

User source of truth: the attached implementation brief and the explicit direct-navigation requirement. The visual mockup supplies art direction; unsupported availability and clinician claims in the image were not adopted.
