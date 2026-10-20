import { NextResponse, type NextRequest } from "next/server";
import { campaignHost, findCampaign } from "@/lib/campaigns";
import { pillars } from "@/lib/pillars";
import { handedOffPrefixes, telehealth, telehealthUrl } from "@/lib/telehealth";

/* Routes retired from the public site. Each one answers 404, with or without
   a trailing slash, so nothing outside the launched care pathways is served. */
const retiredRoutes = ["/shop", "/cart", "/checkout", "/my-account", "/get-started"];

function isRetired(path: string) {
  return (
    retiredRoutes.some((route) => path === route || path.startsWith(`${route}/`)) ||
    path.startsWith("/wp-sitemap")
  );
}

function isHandedOff(path: string) {
  return handedOffPrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

const brandOrigin = "https://evevolutionhealth.com";

/* evevolutionwellness.us is a campaign funnel. It serves the landing pages at
   /<slug> and sends everything else to the brand site, so the brand pages are
   never duplicated on the .us host. */
function campaignResponse(request: NextRequest, path: string) {
  const slug = path.replace(/^\/us(?=\/)/, "").slice(1);
  if (findCampaign(slug)) {
    // /us/<slug> is the app's internal path; the public address is /<slug>.
    if (path.startsWith("/us/")) return NextResponse.redirect(new URL(`/${slug}`, request.url), 308);
    return NextResponse.rewrite(new URL(`/us/${slug}`, request.url));
  }

  const target = new URL(path === "/" ? "/early-access" : path, brandOrigin);
  target.search = request.nextUrl.search;
  if (path === "/") {
    target.searchParams.set("utm_source", "evevolutionwellness_us");
    target.searchParams.set("utm_medium", "redirect");
  }
  return NextResponse.redirect(target, path === "/" ? 307 : 308);
}

function isCampaignHost(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  return host === campaignHost || host === `www.${campaignHost}`;
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, "") || "/";

  if (isCampaignHost(request)) return campaignResponse(request, path);

  if (isHandedOff(path)) {
    // Legacy pillar URLs map to their care page first.
    const from = pillars.find((pillar) => path === `/pillars/${pillar.slug}`)?.carePath ?? path;
    // Temporary while every redirect lands on the telehealth homepage, so
    // browsers don't cache it; permanent once each page has its own target.
    return NextResponse.redirect(telehealthUrl(from), telehealth.deepLinks ? 308 : 307);
  }

  if (!isRetired(path)) return NextResponse.next();
  // Rewriting to a path with no route renders the site's not-found page with a 404 status.
  return NextResponse.rewrite(new URL("/__retired", request.url), { status: 404 });
}

export const config = {
  matcher: [
    "/((?:shop|cart|checkout|my-account|get-started)(?:/.*)?|wp-sitemap.*)",
    "/((?:care|treatments|peptide-care|eves-secret|packages|pillars)(?:/.*)?)",
    // Every page path, for the evevolutionwellness.us host check. API routes,
    // build output and static files are served as-is on every host.
    "/((?!api/|_next/|images/|.*\\.).*)",
  ],
};
