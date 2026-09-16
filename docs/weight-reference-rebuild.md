# Weight Management reference rebuild

Implemented in the local Next.js app; not deployed to WordPress or production.

The uploaded Wellness Journey reference controls the section order, full-bleed hero, pink buttons, ivory six-icon strip, three-woman program panel, plum banner, illustrated four-step process and lifestyle-photo FAQ. Existing contact links, footer and care routes remain in use.

## Copy boundaries

No licensed-provider, medication, peptide, patient-portal or transformation claims were added. The banner reads “Real Support. Lasting Habits.” Images illustrate the brand and do not depict patients or treatment outcomes.

## Photography

Created with the built-in image generation tool. The original swimwear reference request was rejected by the image tool, so the final photographs use fully clothed subjects. Assets are in `public/images/weight/hero.png`, `bodies.png`, and `lifestyle.png`.

Final prompts:

- Hero: Create a luxury wellness website hero photograph, wide landscape. Adult woman age 40 wearing a fully covering black long-sleeved athletic top and black full-length leggings, standing confidently at right at 65 percent across composition. Warm bronze light, dark marble interior, illuminated round mirror and white orchid at far right. Left 45 percent empty almost-black negative space for web text. Sophisticated realistic lifestyle editorial, fully clothed, nonsexual. Frame head through upper thighs. No text, logos or UI.
- Bodies: Create a landscape 4:3 luxury wellness editorial photograph of three different adult women age 35 to 55 standing together, varied curvy and athletic body types and diverse skin tones, all fully clothed in elegant black high-neck athletic tops with sleeves and full length black leggings. Friendly confident expressions. Warm brown studio backdrop, rich bronze lighting. Head to knee crop. All three equally prominent, a celebration of different bodies, not a before and after. No writing, logos, labels, or UI.
- Lifestyle: Create a landscape 3:2 luxury wellness lifestyle photograph of an adult woman age 40 wearing a white linen long-sleeve shirt and black trousers, sunglasses, relaxing beside a sunlit swimming pool with palm trees and ivory architecture. Fully clothed, relaxed standing pose looking toward sunshine, waist-up crop, woman toward right of frame. Warm photographic fashion-editorial light, realistic. No words, logos or UI.

## Local preview

Use `NEXT_BUILD_DIR=.next-polish` to avoid the existing OneDrive `.next` readlink error, then run `npm run build` and `npm run start -- --port 9415`. On PowerShell set `$env:NEXT_BUILD_DIR='.next-polish'` first. Preview route: `/pillars/weight-loss`.

Browser results and desktop/mobile screenshots are saved under `qa/weight-reference-*`. The verifier checks image loads, overflow, one main headline, accordion interaction, mobile navigation and the contact destination.

Validation completed: production build passed; browser checks passed at 1440, 1024, 768, 390 and 375 pixels. All images loaded, no horizontal overflow, one H1, working FAQs and mobile menus, and contact route HTTP 200. Desktop and mobile screenshots reviewed. No production deployment performed.
