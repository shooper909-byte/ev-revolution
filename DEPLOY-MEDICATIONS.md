# Deploy: Medications & Packages library (brand site)

Production evevolutionhealth.com is served by the Pressable theme from prerendered
HTML (`static-pages/*.html`) and `assets/next/static`, as in `DEPLOY-PACKAGES.md`
("Applied — Nov 11, 2026"). **Merging this PR does not update the live site.**
It needs SFTP access to Pressable site 1791593. Deploy only with the owner's go-ahead.

## What this release adds
- `/medications` hub and 50 pages at `/medications/<slug>` (45 telehealth-catalog
  medications + 5 brand-name: `wegovy`, `wegovy-oral`, `zepbound`, `mounjaro`, `orforglipron`).
- `/plans` hub and 10 pages at `/plans/<slug>` (menu label "Packages").
- Header: new "Medications" item; "Packages" now points to `/plans` (was `/packages`).
- Footer: two new links. Sitemap: `/medications`, `/plans` and all 60 detail pages.
- `/packages`, `/treatments` and `/care/*` redirects to the telehealth site are **unchanged**.

## Steps (same method as the Nov 11 Guides deploy)
1. Take on-demand file and database backups in Pressable. Copy the live theme to
   `wp-content/theme-backups/<theme>-pre-medications-<date>` (outside `/themes`).
2. `npm ci && npm run typecheck && npm run build` from the merge commit.
3. Copy from `.next/server/app` into the theme's `static-pages/`, flattening `/` to `-`
   as before:
   - `medications.html` and every `medications/<slug>.html` → `medications-<slug>.html` (50)
   - `plans.html` and every `plans/<slug>.html` → `plans-<slug>.html` (10)
   - **every existing page's HTML again** (home, services, guides, about, faq, contact,
     resources, early-access, policies, gender-affirming-care, us/*), because the header
     and footer changed on all of them
   - `sitemap.xml.body` → `static-pages/sitemap.xml`
   - new files under `.next/static` → `assets/next/static`
   `scripts/package-approved-theme.py --base <live theme copy> --refresh` does this
   flattening.
4. `functions.php`:
   - add `medications`, `medications/<slug>` (50), `plans`, `plans/<slug>` (10) to
     `$pages` in `eves_sisters_static_mirror()` so they resolve to the new HTML files
     and are not treated as retired / 404 routes
   - leave `eves_sisters_care_pages_20261109()` and the `/packages`, `/treatments`,
     `/care/*` redirects as they are
5. Purge the edge, CDN and object caches.
6. Verify, at 1280px and 390px:
   - `/medications`, `/plans` and all 60 detail URLs return 200 with self canonicals
     (`https://evevolutionhealth.com/medications/<slug>`, `/plans/<slug>`)
   - the header shows Medications and Packages, and Packages opens `/plans`
   - a medication's "Start your assessment" opens `evevolutionwellness.com/start/<slug>`
     (brand-name ones: `/start/consultation?category=weight-management`) with UTM tags
   - a package's "Start this package" opens `evevolutionwellness.com/packages/<slug>`
   - `/packages` still returns 307 to the telehealth packages hub
   - `sitemap.xml` lists 77 URLs (17 live today + 60 new)
   - no page errors or failed requests
7. Submit `https://evevolutionhealth.com/sitemap.xml` again in Search Console.
8. If anything fails, copy the theme-backups folder back over the live theme and purge the edge cache.

## Keeping it accurate
- Copy and prices come from `src/lib/catalog-data.json`, exported from the telehealth
  site (`eve-sister-wellness-guide`: `src/data/care.ts`, `packages.ts`, `pricing.ts`).
  When those change, re-export and redeploy.
- Brand-name prices in `src/lib/catalog.ts` are the intake's plan list (Nov 13 2026);
  re-check them against checkout before any change.
