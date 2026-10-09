"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { BusinessContact, policyLinks } from "@/components/PolicyPage";
import { careLabel, getStartedHref as getStartedHrefFor, publicPillars } from "@/lib/pillars";
import { handoffNote, telehealth, telehealthUrl } from "@/lib/telehealth";

const company = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  const pathname = usePathname();
  const getStartedHref = getStartedHrefFor(pathname);
  return (
    <footer className="border-t border-onyx-700 bg-onyx-900">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Eve’s Sisters — home" className="block w-72 max-w-full">
              <Image src="/images/eves-sisters-logo.png" alt="Eve’s Sisters — The Evolution of a Woman's Body" width={1280} height={1280} sizes="288px" className="h-auto w-full" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory-200/80">
              A women&rsquo;s wellness brand for every stage of life — clear
              information, thoughtful experiences, and support for what comes next.
            </p>
          </div>

          <nav aria-label="Care">
            <h2 className="brand-eyebrow text-champagne">
              <a href={telehealthUrl("/care")} className="transition-colors hover:text-champagne-200">
                Care
              </a>
            </h2>
            <p className="mt-2 text-xs text-ivory-200/60">On {telehealth.domain}</p>
            <ul className="mt-5 space-y-3">
              {[
                ...publicPillars.map((pillar) => ({ from: pillar.carePath ?? "/care", label: careLabel(pillar) })),
                { from: "/eves-secret", label: "Eve’s Secret™" },
                { from: "/packages/mrs-collection", label: "The Mrs. Collection" },
              ].map((item) => (
                <li key={item.from}>
                  <a
                    href={telehealthUrl(item.from)}
                    className="text-sm text-ivory-200 transition-colors hover:text-champagne"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
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

            <a
              href={getStartedHref}
              className="button-sheen brand-eyebrow mt-8 inline-block bg-plum px-6 py-3 text-[0.5625rem] text-ivory transition-colors hover:bg-plum-600"
            >
              Start Your Consultation
            </a>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-ivory-200/60">{handoffNote}</p>

            <h2 className="brand-eyebrow mt-10 text-champagne">Newsletter</h2>
            <div className="mt-4">
              <NewsletterSignup compact source="footer" />
            </div>
          </div>
        </div>

        <div className="hairline mt-16 grid gap-10 border-t pt-8 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <h2 className="brand-eyebrow text-champagne">Contact</h2>
            <BusinessContact className="text-sm" />
          </div>
          <nav aria-label="Policies">
            <h2 className="brand-eyebrow text-champagne">Policies</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ivory-200 transition-colors hover:text-champagne">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hairline mt-10 border-t pt-8">
          <p className="text-xs leading-relaxed text-taupe-700">
            Prescription treatment is not guaranteed and requires evaluation by a licensed clinician. Compounded medications are not FDA-approved. Services vary by state.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-taupe-700">
            States we serve: all 50 U.S. states through our nationwide clinical partner network, subject to provider, program, pharmacy, and state-specific requirements.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-taupe-700">
            Eve&rsquo;s Sisters is a trade name of Eve&rsquo;s Sisters LLC.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-taupe-700">
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
