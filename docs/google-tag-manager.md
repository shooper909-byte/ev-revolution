# Google Tag Manager and Meta pixel: setup

Both are off until IDs are set in `src/lib/metaPixel.ts` (`GTM_ID`, `META_PIXEL_ID`).
The telehealth site (evevolutionwellness.com) uses the same rules and its own
config file. One GTM web container can serve both sites.

## What the site already does
- Consent Mode v2 defaults are `denied` before any Google script loads. They switch
  to `granted` only after the visitor clicks Accept, and never under Global
  Privacy Control.
- On every page it pushes `{event: "page_view_safe", page_path_safe, page_location_safe}`.
  Medication, package, guide and intake pages are collapsed to their section
  (`/medications`, `/plans`, `/guides`, ...). The specific page is never pushed.
- The Meta pixel (if set) loads only after Accept and only on general pages.

## Required settings inside GTM (health privacy)
GTM tags read the browser URL by default, which would expose the medication
name. In the container:
1. Create Data Layer Variables `page_path_safe` and `page_location_safe`.
2. Google tag / GA4: set the fields `page_location` = `{{page_location_safe}}`,
   `page_path` = `{{page_path_safe}}`, `page_referrer` = (blank), and
   `send_page_view` = false. Fire the page view on the Custom Event `page_view_safe`.
3. Google Ads remarketing: don't create remarketing audiences from medication or
   intake pages. Use only conversion tags.
4. Don't add Meta or other pixels inside GTM. The site handles the Meta pixel itself.
5. Turn off GTM's built-in "History Change" and enhanced-measurement page views,
   and don't enable GA4 "User-provided data" or "Google signals".
