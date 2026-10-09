import { NextResponse, type NextRequest } from "next/server";
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

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, "") || "/";

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
  ],
};
