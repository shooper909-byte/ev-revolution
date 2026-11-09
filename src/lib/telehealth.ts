/**
 * The telehealth platform this site hands patients to.
 *
 * evevolutionhealth.com explains and builds trust; consultations, membership,
 * treatment requests and checkout all happen on the telehealth site. Every
 * "start care" link on this site goes through `telehealthUrl` so the handoff
 * lands on the matching page and arrives tagged for attribution.
 */

/**
 * The custom care domain is live with HTTPS and supports direct page visits.
 * Keep every consultation and treatment handoff on the patient-facing domain.
 */
const connected = true;

export const telehealth = {
  connected,
  origin: connected ? "https://evevolutionwellness.com" : "https://eve-sisters.vercel.app",
  domain: "evevolutionwellness.com",
  /**
   * Direct visits to /start and the mapped care pages are supported, so
   * visitors can continue to the matching service instead of the homepage.
   */
  deepLinks: true,
} as const;

/** The line shown beside every handoff button, so leaving the site is expected. */
export const handoffNote = telehealth.connected
  ? `Continues on ${telehealth.domain}, our secure telehealth platform.`
  : "Continues on our secure telehealth platform.";

/** Pages on this site mapped to the matching page on the telehealth site. */
const pageMap: Record<string, string> = {
  "/care": "/care",
  "/treatments": "/care",
  "/care/weight-management": "/care/weight-management",
  "/care/hormones-menopause": "/care/hormones-menopause",
  "/care/skin-beauty": "/care/skin-beauty",
  "/care/energy-performance": "/care/energy-vitality",
  "/care/longevity-healthspan": "/care/longevity-renewal",
  "/care/recovery-rejuvenation": "/care/rest-wellbeing",
  "/eves-secret": "/care/eves-secrets",
  "/peptide-care": "/care/peptides",
  "/packages/mrs-collection": "/mrs-collection",
  "/packages/mrs-jones": "/mrs-collection/mrs-jones",
  "/packages/mrs-golden": "/mrs-collection/mrs-golden",
  "/packages/mrs-robinson": "/mrs-collection/mrs-robinson",
};

/**
 * A link to the telehealth site. `from` is the page on this site the visitor
 * is leaving: it picks the matching telehealth page (the consultation start
 * otherwise) and is recorded as `utm_content`.
 */
export function telehealthUrl(from = "/", target?: string): string {
  const source = from.split("#")[0] || "/";
  const path = telehealth.deepLinks ? (target ?? pageMap[source] ?? "/start") : "/";
  const url = new URL(path, telehealth.origin);
  url.searchParams.set("utm_source", "evevolutionhealth");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "handoff");
  url.searchParams.set("utm_content", source === "/" ? "home" : source.replace(/^\//, "").replace(/\//g, "-"));
  return url.toString();
}

/**
 * Care pages that used to live on this site. They now redirect to the
 * matching telehealth page so old links and search results still reach care.
 */
export const handedOffPrefixes = ["/care", "/treatments", "/peptide-care", "/eves-secret", "/packages", "/pillars"] as const;
