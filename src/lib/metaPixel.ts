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
export const META_PIXEL_ID = "";

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
