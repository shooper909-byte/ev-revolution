"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { Wordmark } from "@/components/Wordmark";
import { pillars } from "@/lib/pillars";

const secondaryNav = [
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever navigation lands on a new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-onyx-700/80 bg-onyx/90 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Wordmark />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
        >
          {pillars.map((pillar) => (
            <Link
              key={pillar.slug}
              href={`/pillars/${pillar.slug}`}
              className={`brand-eyebrow text-[0.625rem] transition-colors hover:text-champagne ${
                pathname === `/pillars/${pillar.slug}`
                  ? "text-champagne"
                  : "text-ivory-200"
              }`}
            >
              {pillar.navLabel}
            </Link>
          ))}
          <span className="h-4 w-px bg-onyx-700" aria-hidden="true" />
          {secondaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`brand-eyebrow text-[0.625rem] transition-colors hover:text-champagne ${
                pathname === item.href ? "text-champagne" : "text-ivory-200"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="hairline flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
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
          {pillars.map((pillar) => (
            <Link
              key={pillar.slug}
              href={`/pillars/${pillar.slug}`}
              className="border-b border-onyx-800 py-3 font-display text-lg text-ivory"
            >
              {pillar.name}
            </Link>
          ))}
          {secondaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="brand-eyebrow py-3 text-ivory-200"
            >
              {item.label}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
