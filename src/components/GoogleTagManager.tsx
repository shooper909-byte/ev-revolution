import { ALLOWED_PATHS, GTM_ID, TRACKING_ENABLED, consentDefaultsScript } from "@/lib/metaPixel";

/**
 * Consent defaults (always denied first), then Google Tag Manager, but only on
 * general pages. Google's scripts report the real page address on every ping,
 * so they must never load on a page that names a medication, plan, guide topic
 * or intake step (see docs/google-tag-manager.md).
 */
export function GoogleTagHead() {
  if (!TRACKING_ENABLED) return null;
  const allowed = JSON.stringify(Array.from(ALLOWED_PATHS));
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: consentDefaultsScript }} />
      {GTM_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,i){var p=(location.pathname.replace(/\\/+$/,"")||"/").toLowerCase();if(${allowed}.indexOf(p)<0)return;
w.dataLayer=w.dataLayer||[];w.dataLayer.push({event:"page_view_safe",page_path_safe:p,page_location_safe:location.origin+p});
w.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName('script')[0],j=d.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'${GTM_ID}');`,
          }}
        />
      )}
    </>
  );
}

/** No <noscript> GTM iframe: it would load on every page, including medication pages. */
export function GoogleTagBody() {
  return null;
}
