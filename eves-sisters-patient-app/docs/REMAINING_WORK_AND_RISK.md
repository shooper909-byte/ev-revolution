# Remaining work and cost-risk assessment

Estimates are rough engineering ranges for planning, not quotes. Third-party
prices change; confirm before committing.

## Remaining work by milestone

| Milestone | Work | Effort (eng-weeks) | Blocked on |
| --- | --- | --- | --- |
| 2 — Mock workflows | Persist demo state across launches (non-PHI only); reschedule flow; message threads; order tracking screen; richer journey (edit/delete entries, reminders UI); empty/error states for every screen variant; tablet layouts; VoiceOver/TalkBack pass | 2–4 | — |
| 3 — Karpa | Answer the questions in `KARPA_INTEGRATION_REQUIREMENTS.md`; choose API vs hosted portal; backend (BFF) for credentials and audit; identity provider; live adapter for authorized ports only; contract tests | 4–10 (API) / 1–3 (portal handoff) | Karpa documentation, authorization, BAA |
| 4 — Reviews | Legal review of all copy and consents; clinical review of catalog and pre-screens; privacy review of data flows; independent mobile pentest; accessibility audit; fixes | 2–5 (+ reviewer time) | Reviewers |
| 5 — Store builds | EAS profiles, store listings, privacy labels, reviewer accounts, TestFlight / Play closed testing, submission and review iterations | 1–3 | Developer accounts, approvals |

## Cost drivers (indicative)

| Item | Typical range | Notes |
| --- | --- | --- |
| Apple Developer Program | USD 99 / year | Company account |
| Google Play Console | USD 25 one-time | |
| EAS Build / Update | Free tier to ~USD 100+/month | Depends on build volume |
| Backend hosting with BAA | ~USD 100–1,000+/month | HIPAA-eligible cloud services; BAA required |
| Identity provider with BAA | Varies widely | Some offer BAAs only on enterprise tiers |
| Telehealth video SDK with BAA | Per-minute or per-seat pricing | Only if Karpa does not provide video |
| Independent security assessment | ~USD 8,000–30,000+ | Mobile + API pentest |
| Legal review (telehealth, privacy, subscriptions) | Varies by firm and scope | Multi-state telehealth adds scope |

## Key risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Karpa has no API, or won't authorize one | Medium | High — clinical features stay simulated | Hosted-portal fallback already designed; app still delivers catalog, journey, account |
| Catalog copy drifts from the live site | High | Medium — inconsistent claims | Single source in `src/data/catalog`; re-verify before each release; consider serving catalog from a CMS/backend |
| Regulatory exposure on compounded / off-label / peptide listings | Medium | High | Clinical + legal review of every listing before launch (flagged) |
| App Store rejection (medical claims, payments, privacy labels) | Medium | Medium — delays | Follow `DEPLOYMENT_CHECKLIST.md`; reviewer notes; no in-app payments for digital goods |
| PHI leakage via logs, analytics or notifications | Low (current design) | High | Guards and tests in place; keep vendors out until reviewed |
| Self-tracked journal data treated as PHI | Medium | Medium | Decide storage model in privacy review; current demo keeps it in memory |
| Expo SDK churn | Medium | Low–Medium | Pin versions; `expo-doctor` in CI; upgrade per SDK release notes |
| Dev-tooling advisory (`zod` via `@expo/cli`, npm audit "high") | — | Low — not in the app bundle | Track Expo patch releases; do not force-downgrade |

## Exact next development task

**Milestone 2, task 1:** persist non-PHI demo preferences and add the
reschedule/cancel flow inside the appointment wizard — and, in parallel,
send the question list in `KARPA_INTEGRATION_REQUIREMENTS.md` §4 to Karpa
Health so Milestone 3 can be scoped.
