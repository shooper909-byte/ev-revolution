# Restore Longevity and Recovery pages on Pressable

The September 28 launch-scope change made both care routes call `notFound()` and removed them from public navigation. This patch restores the saved editorial components and original images as wellness education. It does not enable treatment requests, medications, pricing or payment for these categories.

Production is served by the Pressable `eves-sisters-2.9.0` theme, using prerendered `static-pages/*.html` and `assets/next/static`, as documented in PR #45. A Vercel deployment or GitHub merge alone does not update the live domain.

1. Take on-demand file and database backups. Inspect the currently deployed theme and preserve its API handlers, secrets, unrelated routing and existing fixes.
2. Build this source with the existing package lock (`npm ci`, `npm run typecheck`, `npm run build`). Use the same HTML/asset conversion and transfer method used for PR #45; do not guess a new theme directory layout.
3. Transfer the updated prerendered homepage, Care hub, both restored care pages, sitemap and shared Next static assets. Ensure the theme’s route map resolves `/care/longevity-healthspan` and `/care/recovery-rejuvenation` to these new HTML files and does not classify these two paths as retired/404 routes.
4. Map legacy `/pillars/longevity-healthspan` and `/pillars/recovery-rejuvenation` URLs to permanent redirects to the matching care pages. Preserve unrelated retired routes and the existing care-lead allow-list.
5. Clear Pressable/theme caches. Check both restored pages return HTTP 200, both legacy URLs redirect to their matching page, original photos load, desktop/mobile menus and homepage/Care/footer links include both categories, and the sitemap contains both URLs. Verify the restored pages disclose that treatment programs and enrollment are pending confirmation. Their buttons should explore page content or lead to Contact; do not add a fake intake or checkout.
6. Check weight, hormone, skin, Eve’s Secret and Mrs. Collection pages still work. If checks fail, restore the theme backup rather than rolling back the unrelated launch fixes.
