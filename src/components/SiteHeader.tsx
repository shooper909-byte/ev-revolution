"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Wordmark } from "@/components/Wordmark";
import { pillars } from "@/lib/pillars";
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header
      className="sticky top-0 z-50 border-b border-onyx-700 bg-onyx"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <Wordmark />
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          <Link href="/" className="brand-eyebrow py-3">
            Home
          </Link>
          <details className="relative">
            <summary className="brand-eyebrow cursor-pointer py-3">
              Care
            </summary>
            <div className="absolute right-0 top-full grid w-72 border border-champagne/30 bg-onyx p-4">
              {pillars.map((p) => (
                <Link
                  className="py-3 text-sm hover:text-champagne"
                  key={p.slug}
                  href={`/pillars/${p.slug}`}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </details>
          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            className={`brand-eyebrow border-b py-3 ${pathname === "/about" ? "border-champagne text-champagne" : "border-transparent"}`}
          >
            About
          </Link>
          <Link
            className="brand-eyebrow bg-champagne px-6 py-4 text-onyx"
            href="/contact"
          >
            Get Started
          </Link>
        </nav>
        <button
          ref={toggle}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
          className="h-12 w-12 shrink-0 border border-champagne/40 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? "×" : "☰"}
        </button>
      </Container>
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="max-h-[75dvh] overflow-auto border-t border-onyx-700 bg-onyx md:hidden"
      >
        <Container className="grid gap-1 py-5">
          <Link className="py-3" href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <p className="brand-eyebrow py-3 text-champagne">Care</p>
          {pillars.map((p) => (
            <Link
              className="py-3 pl-4"
              key={p.slug}
              href={`/pillars/${p.slug}`}
              onClick={() => setOpen(false)}
            >
              {p.name}
            </Link>
          ))}
          <Link
            className="py-3 text-champagne"
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            className="bg-champagne px-5 py-4 text-onyx"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </Container>
      </nav>
    </header>
  );
}
