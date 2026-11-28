/**
 * Meta (Facebook) pixel settings. Leave META_PIXEL_ID empty to keep the pixel and
 * the cookie banner off. The ID is public (it appears in page source), so it can
 * live in code.
 *
 * Privacy rules for a telehealth brand:
 * - The pixel loads only after the visitor accepts cookies.
 * - It sends PageView only, with no advanced matching (no email, phone or name).
 * - It runs only on the general pages below. Meta logs the page address, so it
 *   never runs on medication, package, guide or intake pages.
 */
export const META_PIXEL_ID = "2589041114909656";

/** Google Tag Manager container, e.g. "GTM-XXXXXXX". Empty = GTM off. */
export const GTM_ID = "GTM-TR9MBVXD";

export const TRACKING_ENABLED = Boolean(META_PIXEL_ID || GTM_ID);

export const CONSENT_KEY = "es-cookie-consent";

const ALLOWED_PATHS = new Set([
  "/",
  "/about",
  "/contact",
  "/faq",
  "/services",
  "/resources",
  "/guides",
  "/medications",
  "/plans",
  "/privacy-policy",
  "/terms-of-service",
  "/hipaa-policy",
  "/disclaimer",
  "/telehealth-consent",
  "/subscription-cancellation",
]);

export function pixelAllowedOn(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  return ALLOWED_PATHS.has(path);
}

/**
 * Page path Google may see. Detail pages that name a medication, package or
 * health topic collapse to their section; query strings and fragments are dropped.
 */
export function safePagePath(pathname: string): string {
  const path = (pathname.split(/[?#]/)[0].replace(/\/+$/, "") || "/").toLowerCase();
  for (const section of ["/medications", "/plans", "/guides", "/us", "/packages", "/care", "/treatments", "/start"]) {
    if (path.startsWith(section + "/")) return section;
  }
  return path;
}

/** Runs in <head> before any Google script: everything denied until the visitor accepts. */
export const consentDefaultsScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',false);
try{if(localStorage.getItem('${CONSENT_KEY}')==='accepted'&&!navigator.globalPrivacyControl){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}`;
