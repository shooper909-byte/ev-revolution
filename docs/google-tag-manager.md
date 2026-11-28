# Google Tag Manager and Meta pixel: setup

Container: GTM-TR9MBVXD (shared with evevolutionwellness.com). Meta pixel: 2589041114909656.
Both are set in `src/lib/metaPixel.ts`; empty values turn them off.

## Rule: Google and Meta load only on general pages
Google's scripts attach the real browser address to every request (the `dl`
field), whatever page_location you set and even with consent denied. A page
address like `/medications/semaglutide` tells Google a visitor's health
interest. So on this site:

- GTM and the Meta pixel load only on the general pages in `ALLOWED_PATHS`
  (home, about, contact, FAQ, services, resources, the medications / plans /
  guides hubs and legal pages). Never on a medication, plan, guide-topic or
  intake page.
- Consent Mode v2 defaults are `denied`; they become `granted` only after the
  visitor clicks Accept, and never under Global Privacy Control.
- Each allowed page pushes `{event: "page_view_safe", page_path_safe, page_location_safe}`.

Ad conversions are measured on the telehealth site's `/continue` bridge page,
which visitors pass through on the way to the Remedora intake. Google sees only
`/continue` (plus `?gclid=` when present).

## Inside GTM
1. Fire page-view tags only on the Custom Event `page_view_safe`, using the Data
   Layer Variables `page_path_safe` and `page_location_safe`.
2. Never add a trigger on "All Pages", History Change, clicks, form submissions
   or scroll. Don't create remarketing audiences.
3. Don't add the Google Ads tag (AW-18498028713) in GTM: the telehealth site
   already loads it on its general pages and `/continue`, so it would count twice.
4. Keep Google signals, enhanced measurement and user-provided data off.
5. Don't add Meta or other pixels inside GTM.
