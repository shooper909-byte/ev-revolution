"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { Wordmark } from "@/components/Wordmark";
import { getStartedHref as getStartedHrefFor } from "@/lib/pillars";
import { handoffNote } from "@/lib/telehealth";

/* This site tells the brand story; care itself lives on the telehealth site,
   which the consultation button opens. Items marked `wide` only fit on very
   wide screens; below that they stay reachable from the footer and the logo
   (Home). */
const primaryNav = [
  { href: "/about", label: "About" },
  { href: "/about#philosophy", label: "Our Approach", wide: true },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever navigation lands on a new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const getStartedHref = getStartedHrefFor(pathname);

  const isActive = (href: string) => pathname === href;

  const linkClass = (href: string) =>
    `brand-eyebrow whitespace-nowrap text-[0.6875rem] tracking-[0.12em] xl:text-xs xl:tracking-[0.16em] transition-colors hover:text-champagne focus-visible:text-champagne ${
      isActive(href) ? "text-champagne" : "text-ivory-200"
    }`;

  return (
    <header className="sticky top-0 z-50 overflow-x-clip border-b border-onyx-700/80 bg-onyx/90 backdrop-blur-md">
      <Container className="flex h-20 max-w-[1600px] items-center justify-between gap-4">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-3 lg:flex xl:gap-4 min-[1600px]:gap-5">
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
              className={`${linkClass(item.href)} ${item.wide ? "hidden min-[1536px]:inline" : ""}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}

          <a
            href={getStartedHref}
            title={handoffNote}
            className="button-sheen brand-eyebrow whitespace-nowrap bg-plum px-4 py-3 text-[0.6875rem] xl:px-5 xl:text-xs tracking-[0.14em] text-ivory transition-colors hover:bg-plum-600"
          >
            Start Consultation
          </a>
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

          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border-b border-onyx-800 py-3 font-display text-lg ${
                isActive(item.href) ? "text-champagne" : "text-ivory"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <a
            href={getStartedHref}
            onClick={() => setOpen(false)}
            className="brand-eyebrow mt-4 bg-plum px-6 py-4 text-center text-[0.625rem] text-ivory"
          >
            Start Your Consultation
          </a>
          <p className="mt-3 text-center text-xs text-ivory-200/70">{handoffNote}</p>
        </Container>
      </div>
    </header>
  );
}
