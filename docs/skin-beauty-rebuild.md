# Skin & Beauty campaign page

Dedicated `SkinBeauty.tsx` and `SkinBeauty.module.css`, selected only for `/pillars/skin-beauty`. The shared template remains available for the other generic pillar routes. Weight Management retains its dedicated component.

The uploaded reference guides the full-width portrait hero, champagne and ivory typography, pink CTA, six-icon ivory strip, three-woman editorial, silk banners, illustrated four-step process, spa photograph and FAQ. Existing brand logo and contact destination are retained. Ingredient topics remain educational; no prescription, procedure, peptide-therapy, patient-portal or outcome claims were added.

Assets were generated with the built-in image-generation tool and saved in `public/images/skin/hero.png`, `editorial.png`, and `spa.png`. These are illustrative campaign images, not patient photographs.

## Final image prompts

### skin-hero

Luxury skincare campaign photograph, wide 16:9 composition. Adult woman age 40 with luminous deep brown skin and long wavy dark hair, eyes softly closed, hand gently touching cheek, elegant black high neckline top. Portrait on RIGHT 60 percent, LEFT 40 percent near-black empty space for website text. Face entirely visible with generous top margin for website header. Warm champagne highlights, dark bronze background, realistic healthy skin texture, sophisticated beauty editorial. No writing, logos, graphics, UI, medical before-after or products.

### skin-editorial

Luxury beauty editorial photograph, landscape 4:3. Close portraits of THREE different adult women together aged 30, 45 and 55, diverse deep brown, olive and fair skin tones, dark curls, dark waves and blonde hair respectively. Elegant black tops. Luminous natural skin with realistic texture, confident serene expressions. Frame all three complete heads and shoulders, equal prominence. Warm bronze studio background, champagne light, high-end skincare campaign. No text, logos, UI or transformation implications.

### skin-spa

Luxury skincare lifestyle editorial photograph landscape 3:2. Adult woman with deep brown skin, hair wrapped in white spa towel, wearing white spa robe, eyes closed and hand gently touching cheek. Warm candlelight bokeh and white orchids in bronze-toned spa background. Composition woman centered slightly left, head and shoulders clearly in frame. Luminous realistic skin, calm refined beauty campaign. No text, logos, products or UI.

## Validation

Production build and browser evidence are recorded alongside `qa/skin-reference-results.json`, `qa/skin-reference-1440.png` and `qa/skin-reference-390.png`. Preview uses `NEXT_BUILD_DIR=.next-polish` and port 9415. This work is local and has not been deployed to production.

Final verification: production build passed. Browser checks passed at 1440, 1024, 768, 390 and 375 pixels: all images loaded, no horizontal overflow, exactly one H1, working FAQs and mobile navigation, no page errors. Contact, Weight Management and Hormones routes returned HTTP 200. Desktop and corrected mobile screenshots were reviewed.
