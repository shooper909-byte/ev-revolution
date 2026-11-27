import { GTM_ID, TRACKING_ENABLED, consentDefaultsScript } from "@/lib/metaPixel";

/**
 * Consent defaults (always denied first), then Google Tag Manager when GTM_ID is set.
 * The page path Google gets is pushed as `page_path_safe`; GTM tags must use it
 * instead of the browser URL (see docs/google-tag-manager.md).
 */
export function GoogleTagHead() {
  if (!TRACKING_ENABLED) return null;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: consentDefaultsScript }} />
      {GTM_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=(location.pathname.replace(/\\/+$/,"")||"/").toLowerCase();var s=["/medications","/plans","/guides","/us","/packages","/care","/treatments","/start"];for(var i=0;i<s.length;i++){if(p.indexOf(s[i]+"/")===0){p=s[i];break;}}
dataLayer.push({event:"page_view_safe",page_path_safe:p,page_location_safe:location.origin+p});})();
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      )}
    </>
  );
}

export function GoogleTagBody() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
    </noscript>
  );
}
