# Image assets

Drop campaign photography here. The site is complete without these files —
each is layered behind a gradient that stands on its own if the image is
missing.

| File | Used by | Notes |
| --- | --- | --- |
| `hero.jpg` | Homepage hero | Wide crop, subject on the right; the left third is overlaid with onyx for the headline. ~2400px wide. |
| `stages.jpg` | Optional replacement for the rendered stages lineup in `src/components/StagesLineup.tsx` | The "Different stages. The same power." silhouette row. |

Keep files under ~400KB where possible, and prefer `.webp` or `.avif` over
`.jpg` when your export tooling supports it (update the path in the component
to match).

## `care/` — Care hub (`/care`)

Cropped from the approved EVEVOLUTION campaign renders at the repository root
and exported to `.webp`. The card images are all 560×700 (4:5); the rest are
sized to their placement. Each card uses different photography, and the set
spans a range of ages, skin tones and body types.

| File | Used by | Notes |
| --- | --- | --- |
| `care-hero.webp` | Care hero | 700×1120. The only `priority` image on the page. |
| `care-weight-management.webp` | Weight Management card | 560×700. |
| `care-menopause-hormones.webp` | Menopause & Hormones card | 560×700. |
| `care-skin-beauty.webp` | Skin & Beauty card | 560×700. |
| `care-energy-performance.webp` | Energy & Performance card | 560×700. |
| `care-recovery.webp` | Recovery card | 560×700. Upscaled from a small source crop; soft by nature. |
| `care-longevity.webp` | Longevity card | 560×700. |
| `care-flexible.webp` | "Flexible. Accessible. Yours." | 1200×715. |
| `care-together.webp` | "Stronger Together." | 1440×900. |
| `care-cta-silk.webp` | Final CTA background | 1600×309, decorative (`alt=""`). |

Card images are keyed off `careImage` in `src/lib/pillars.ts` — to swap one,
replace the file and keep the name, or point `careImage` at the new one.
