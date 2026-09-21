"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CareMenu } from "@/components/CareMenu";
import { Container } from "@/components/Container";
import { Wordmark } from "@/components/Wordmark";
import { careLabel, pillars } from "@/lib/pillars";

/* Care leads the navigation and owns the six pillar routes beneath it, so the
   header stays legible instead of listing all six pathways across the bar.
   "Resources" points at the existing /journal route rather than adding a
   duplicate one. */
const primaryNav = [
  { href: "/about", label: "About" },
  { href: "/journal", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever navigation lands on a new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const careActive =
    pathname === "/care" || pathname.startsWith("/pillars/");

  const linkClass = (href: string) =>
    `brand-eyebrow text-[0.625rem] transition-colors hover:text-champagne ${
      pathname === href ? "text-champagne" : "text-ivory-200"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-onyx-700/80 bg-onyx/90 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Wordmark />

        <nav
          aria-label="Primary"
          className="hidden shrink-0 items-center gap-5 lg:flex xl:gap-7"
        >
          <CareMenu active={careActive} />

          <Link
            href="/"
            className={`${linkClass("/")} shrink-0`}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>

          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(item.href)}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="button-sheen brand-eyebrow bg-plum px-6 py-3 text-[0.5625rem] text-ivory transition-colors hover:bg-plum-600"
          >
            Get Started
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="hairline flex h-11 w-11 shrink-0 items-center justify-center rounded-full border lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-champagne"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </Container>

      {/* Mobile: Care is a link with its six pathways listed beneath it, so
          nothing is hidden behind a second tap. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-onyx-700 bg-onyx-900 lg:hidden"
      >
        <Container className="grid gap-1 py-6">
          <Link
            href="/"
            className="border-b border-onyx-800 py-3 font-display text-lg text-ivory"
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>

          <Link
            href="/care"
            className={`flex items-center justify-between border-b border-onyx-800 py-3 font-display text-lg ${
              careActive ? "text-champagne" : "text-ivory"
            }`}
            aria-current={pathname === "/care" ? "page" : undefined}
          >
            Care
            <span aria-hidden="true" className="text-sm text-champagne">
              &rarr;
            </span>
          </Link>

          <ul className="border-b border-onyx-800 py-1 pl-4">
            {pillars.map((pillar) => (
              <li key={pillar.slug}>
                <Link
                  href={`/pillars/${pillar.slug}`}
                  className={`block py-3.5 text-sm ${
                    pathname === `/pillars/${pillar.slug}`
                      ? "text-champagne"
                      : "text-ivory-200"
                  }`}
                  aria-current={
                    pathname === `/pillars/${pillar.slug}` ? "page" : undefined
                  }
                >
                  {careLabel(pillar)}
                </Link>
              </li>
            ))}
          </ul>

          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border-b border-onyx-800 py-3 font-display text-lg ${
                pathname === item.href ? "text-champagne" : "text-ivory"
              }`}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="brand-eyebrow mt-4 bg-plum px-6 py-4 text-center text-[0.625rem] text-ivory"
          >
            Get Started
          </Link>
        </Container>
      </div>
    </header>
  );
}
