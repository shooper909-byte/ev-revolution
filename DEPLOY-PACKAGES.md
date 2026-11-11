# Deploy: Guides + Packages hand-off (brand site)

Production evevolutionhealth.com is served by the Pressable theme from prerendered
HTML (`static-pages/*.html`) and `assets/next/static`, as described in
`RESTORE-PRESSABLE.md` and PR #45. **Merging this PR does not update the live site.**
Do not deploy without the owner's go-ahead.

## What this release adds
- `/guides` index and four guide pages:
  - `/guides/perimenopause-weight-gain`
  - `/guides/online-hrt-cost`
  - `/guides/tirzepatide-vs-semaglutide-for-women`
  - `/guides/testosterone-for-women`
- Header: "Packages" now points at `/packages`, plus a new "Guides" item.
- `/packages` (no sub-path) hands off to `https://evevolutionwellness.com/packages` with UTM tags.
- Sitemap: `/guides` + 4 guide URLs. Resources page links to Guides.

## Steps (follow RESTORE-PRESSABLE.md for the exact transfer method)
1. Take on-demand file and database backups in Pressable.
2. `npm ci && npm run typecheck && npm run build` from this commit.
3. Convert and transfer, using the same method as PR #45:
   - the prerendered HTML for `/guides` and the four `/guides/*` pages
   - the updated homepage, Services and Resources pages, so the header changes everywhere
   - `sitemap.xml`
   - the shared `assets/next/static`

   Do not invent a new theme layout.
4. Make sure the theme route map:
   - resolves `/guides` and `/guides/<slug>` to the new HTML files, and doesn't treat them as retired / 404 routes
   - redirects `/packages` (308) to `https://evevolutionwellness.com/packages?utm_source=evevolutionhealth&utm_medium=referral&utm_campaign=handoff&utm_content=packages`
   - keeps the existing `/packages/mrs-*` redirects
5. Clear the Pressable and theme caches.
6. Verify:
   - each guide returns HTTP 200
   - each guide's canonical is `https://evevolutionhealth.com/guides/<slug>`
   - each guide's button links to the matching `evevolutionwellness.com/packages/...` page with UTM tags
   - `/packages` redirects to the wellness hub
   - `sitemap.xml` lists the guides
   - the header shows Packages and Guides on desktop and mobile
7. Submit `https://evevolutionhealth.com/sitemap.xml` again in Search Console.
8. If anything fails, restore the backup.

## Applied — Nov 11, 2026
Deployed to Pressable site 1791593 (theme `eves-sisters-2.15.0`, patched in place) after on-demand file and database backups.
- Theme copy saved at `wp-content/theme-backups/eves-sisters-2.15.0-pre-guides-20261111` (outside `/themes`).
- Added `static-pages/guides.html` and the four `guides-<slug>.html` pages. Refreshed the HTML for home, services, resources, about, faq, contact, early-access and the six policy pages so the new header shows. Updated `sitemap.xml` and added the new `assets/next/static` files.
- `functions.php`:
  - added the five `guides` routes to `$pages` in `eves_sisters_static_mirror()`
  - added `'/packages' => '/packages'` to `eves_sisters_care_pages_20261109()`, also mirrored in `scripts/pressable/telehealth-handoff.php`
- Left untouched: `gender-affirming-care` and `journal`. They already returned 404 before this deploy.
- Edge and object caches purged.
- Verified live:
  - all 5 guide URLs return 200 with self canonicals
  - the header shows Packages and Guides
  - the support phone filter still applies
  - `/packages` returns 307 to `https://evevolutionwellness.com/packages`
  - sitemap has 18 URLs
  - no page errors or failed requests at 1280 and 390px

Rollback: copy the theme-backups folder back over `wp-content/themes/eves-sisters-2.15.0`, then purge the edge cache.
