import { NextResponse, type NextRequest } from "next/server";

/* Routes retired from the public site. Each one answers 404, with or without
   a trailing slash, so nothing outside the launched care pathways is served. */
const retiredRoutes = ["/shop", "/cart", "/checkout", "/my-account", "/get-started"];

function isRetired(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  return (
    retiredRoutes.some((route) => path === route || path.startsWith(`${route}/`)) ||
    path.startsWith("/wp-sitemap")
  );
}

export function middleware(request: NextRequest) {
  if (!isRetired(request.nextUrl.pathname)) return NextResponse.next();
  // Rewriting to a path with no route renders the site's not-found page with a 404 status.
  return NextResponse.rewrite(new URL("/__retired", request.url), { status: 404 });
}

export const config = {
  matcher: ["/((?:shop|cart|checkout|my-account|get-started)(?:/.*)?|wp-sitemap.*)"],
};
