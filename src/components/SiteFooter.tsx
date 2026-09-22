"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { careLabel, pillars } from "@/lib/pillars";

const company = [
  { href: "/", label: "Home" },
  { href: "/care", label: "Care" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Resources" },
  { href: "/contact", label: "Contact" },
  { href: "/disclaimer", label: "Medical Disclaimer" },
];

export function SiteFooter() {
  const pathname = usePathname();
  const getStartedHref =
    pathname === "/pillars/energy-performance" ||
    pathname === "/care/energy-performance"
      ? "/care/energy-performance#get-started"
      : pathname === "/pillars/longevity-healthspan" ||
          pathname === "/care/longevity-healthspan"
        ? "/care/longevity-healthspan#get-started"
      : "/care/weight-management#get-started";
  return (
    <footer className="border-t border-onyx-700 bg-onyx-900">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Eve’s Sisters — home" className="block w-72 max-w-full">
              <Image src="/images/eves-sisters-logo.png" alt="Eve’s Sisters — The Evolution of a Woman's Body" width={1280} height={1280} sizes="288px" className="h-auto w-full" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory-200/80">
              More than a clinic. A movement for women — evidence-led wellness
              and longevity for every stage.
            </p>
          </div>

          <nav aria-label="Care">
            <h2 className="brand-eyebrow text-champagne">
              <Link href="/care" className="transition-colors hover:text-champagne-200">
                Care
              </Link>
            </h2>
            <ul className="mt-5 space-y-3">
              {pillars.map((pillar) => (
                <li key={pillar.slug}>
                  <Link
                    href={`/pillars/${pillar.slug}`}
                    className="text-sm text-ivory-200 transition-colors hover:text-champagne"
                  >
                    {careLabel(pillar)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/treatments"
                  className="text-sm text-ivory-200 transition-colors hover:text-champagne"
                >
                  Treatments &amp; Medications
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="brand-eyebrow text-champagne">Company</h2>
            <ul className="mt-5 space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ivory-200 transition-colors hover:text-champagne"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={getStartedHref}
              className="button-sheen brand-eyebrow mt-8 inline-block bg-plum px-6 py-3 text-[0.5625rem] text-ivory transition-colors hover:bg-plum-600"
            >
              Get Started
            </Link>

            <h2 className="brand-eyebrow mt-10 text-champagne">Newsletter</h2>
            <div className="mt-4">
              <NewsletterSignup compact source="footer" />
            </div>
          </div>
        </div>

        <div className="hairline mt-16 border-t pt-8">
          <p className="text-xs leading-relaxed text-taupe-700">
            Eve&rsquo;s Sisters publishes general wellness education. Nothing on this
            site is medical advice, diagnosis or treatment, and it is not a
            substitute for care from a qualified clinician. Always speak with
            your own healthcare provider before changing anything about your
            health, and seek immediate care for urgent symptoms.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-taupe-700">
              &copy; {new Date().getFullYear()} Eve&rsquo;s Sisters. All rights
              reserved.
            </p>
            <p className="brand-eyebrow text-[0.5rem] text-taupe-700">
              Mind &middot; Body &middot; Beauty &middot; Longevity
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
