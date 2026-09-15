# Eve's Sisters

The Evolution of a Woman's Body

**Women's Wellness, Weight Loss & Longevity at Every Stage of Life**

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

Eve's Sisters publishes general wellness education. Copy in this repository is
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
