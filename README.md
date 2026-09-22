# EV-REVOLUTION

**Women's Wellness & Longevity**

A women's wellness and longevity platform focused on weight, hormones and
menopause, skin and beauty, energy and performance, recovery, and healthspan.
This repository contains the website, digital experience, integrations,
content and technical infrastructure powering a modern, inclusive, premium
wellness brand.

> _Different stages. The same power._

---

## Stack

- **Next.js 15** (App Router, React 19)
- **Tailwind CSS 4** — brand tokens defined CSS-first in `src/app/globals.css`
- **TypeScript**, strict mode
- No external UI library; the design system lives in this repo

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — see Environment below
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run typecheck`.

## Email capture

Three captures feed one list: the footer form, the journal form, and a
site-wide popup (`EmailCapturePopup`). All three post to `/api/subscribe`,
which writes the contact to Brevo server-side — the API key never reaches the
browser and nothing is stored in this app.

The popup opens on whichever comes first: exit intent, half the page scrolled,
or thirty seconds of dwell. It opens once. Dismissing it buys thirty days of
quiet; subscribing retires it permanently. It never opens on `/contact` or on
the two care assessment pages, whose own forms are the point of the page.

### Connecting Brevo

```bash
BREVO_API_KEY=xkeysib-... npm run brevo:setup
```

That creates the `Eve's Sisters` folder, the newsletter and popup lists, the
`EVS_SIGNUP_SOURCE` / `EVS_CONSENT_AT` contact attributes, and the sending
identity, then prints the environment lines to paste into `.env.local` and into
the hosting environment. Re-running it is safe — it reports what already exists
instead of duplicating it. Every variable is documented in `.env.example`.

The sending identity is two separate things, and campaigns need both:

- **The sender**, `customerservice@evevolutionhealth.com` by default and
  overridable with `BREVO_SENDER_EMAIL`. Creating it makes Brevo email that
  address a verification link, and the sender cannot be used until someone
  clicks it.
- **The domain**, authenticated with DNS. The script adds
  `evevolutionhealth.com` to Brevo and prints the `brevo-code`, DKIM and DMARC
  TXT records to add at the DNS host. Campaigns will send without them and land
  in spam folders with them missing.

Note that the Brevo account is shared with another brand, so the setup script
namespaces everything it creates under `Eve's Sisters` and `EVS_`.

Until `BREVO_API_KEY` is set, `/api/subscribe` falls back to
`EV_NEWSLETTER_WEBHOOK_URL`, and with neither configured it returns an explicit
"not connected" message rather than silently accepting addresses.

Two steps stay manual, because nobody can automate them from here: clicking the
verification link Brevo sends to the sender address, and adding the DNS records
the script prints. Brevo-hosted popups and forms are dashboard-only too — Brevo
has no API for creating them. The popup in this repo is the site's own, which is
why it can match the brand system and respect reduced motion.

---

## Brand

The identity is a committed dark luxury system — the site does not invert with
the viewer's OS theme. Colour values come straight from the brand palette board
and are defined once as Tailwind theme tokens:

| Role | Name | Hex | Token |
| --- | --- | --- | --- |
| Primary | Onyx | `#080B0B` | `onyx` |
| Primary light | Warm Ivory | `#F7EFE6` | `ivory` |
| Signature | Deep Plum | `#642A52` | `plum` |
| Luxury accent | Champagne Gold | `#DAB16A` | `champagne` |
| Soft accent | Dusty Mauve | `#B98AA1` | `mauve` |
| Clinical neutral | Warm Taupe | `#9A8E86` | `taupe` |

Balance target is roughly **60% onyx + ivory / 20% deep plum / 10% champagne /
10% mauve + taupe**. Champagne is a fine-line and detail accent — hairlines,
the monogram, eyebrow type — and is never used as a large field, both because
it is the luxury cue and because champagne-on-ivory does not meet contrast
requirements.

Typography is Playfair Display for display and Inter for UI and body, loaded
via `next/font`. The wide-tracked uppercase treatment from the brand board is
the `brand-eyebrow` utility; the brushed-gold monogram fill is `gold-text`.

Each pillar carries its own accent within that system:

| Pillar | Accent |
| --- | --- |
| Weight Loss | Deep Plum |
| Hormones & Menopause | Dusty Mauve |
| Skin & Beauty | Ivory / blush |
| Energy & Performance | Deep Plum, darkened |
| Recovery & Rejuvenation | Warm Taupe |
| Longevity & Healthspan | Champagne Gold |

## Structure

```
src/
  app/
    page.tsx                 Home
    about/                   About — "More than a clinic. A movement for women."
    journal/                 Editorial index
    contact/                 Contact form + direct addresses
    disclaimer/              Medical disclaimer
    pillars/[slug]/          The six pillar pages (statically generated)
    api/subscribe/           Newsletter endpoint
    api/contact/             Contact endpoint
    icon.svg                 Favicon (curvature mark)
    globals.css              Brand tokens and utilities
  components/                Header, footer, wordmark, forms, cards, icons
  lib/
    pillars.ts               Pillar content — single source for nav, cards, pages
    posts.ts                 Journal queue
    forward.ts               Form forwarding helper
public/images/               Campaign photography (see README there)
```

Content lives in `src/lib/`. Editing `pillars.ts` updates the navigation, the
homepage icon bar, the pillar cards, the footer and the generated pages at
once.

## Environment

Copy `.env.example` to `.env.local`. Nothing is required to run the site.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for `sitemap.xml` and `robots.txt` |
| `EV_NEWSLETTER_WEBHOOK_URL` | Where newsletter signups are forwarded |
| `EV_CONTACT_WEBHOOK_URL` | Where contact submissions are forwarded |

The app stores no submissions itself. Until a webhook is configured, both
endpoints return an explicit "not connected yet" message rather than a fake
success — a form that silently drops addresses is worse than no form.

## Deployment

Deploys as-is to Vercel (import the repo, set the environment variables). Every
page except the two API routes is statically generated.

## Editorial policy

EV-REVOLUTION publishes general wellness education. Copy in this repository is
deliberately written to avoid diagnostic, therapeutic or outcome claims, and
routes readers to a qualified clinician for anything individual. `/disclaimer`
carries the full statement and is linked from the footer of every page. Keep
new copy to that standard.

## Still to come

- Real article bodies behind the Journal index (MDX or a CMS)
- Campaign photography in `public/images/` — the layouts are built to layer it
  in without markup changes
- Final logo lockup: the current `CurvatureMark` is a faithful SVG rendering of
  the identity, to be swapped for the production artwork when it is available
