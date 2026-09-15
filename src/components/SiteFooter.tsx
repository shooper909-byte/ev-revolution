import Link from "next/link";
import { Container } from "@/components/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { CurvatureMark } from "@/components/Wordmark";
import { pillars } from "@/lib/pillars";

const company = [
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
  { href: "/disclaimer", label: "Medical Disclaimer" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-onyx-700 bg-onyx-900">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <CurvatureMark className="h-11 w-auto" />
              <span className="font-display text-xl tracking-[0.14em]">
                <span className="gold-text">EVE'S</span>
                <span className="text-ivory"> SISTERS</span>
              </span>
            </div>
            <p className="brand-eyebrow mt-4 text-[0.5625rem] text-taupe">
              The Evolution of a Woman's Body
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory-200/80">
              More than care. A movement for women — evidence-led wellness and
              longevity for every stage.
            </p>
          </div>

          <nav aria-label="Pillars">
            <h2 className="brand-eyebrow text-champagne">Pillars</h2>
            <ul className="mt-5 space-y-3">
              {pillars.map((pillar) => (
                <li key={pillar.slug}>
                  <Link
                    href={`/pillars/${pillar.slug}`}
                    className="text-sm text-ivory-200 transition-colors hover:text-champagne"
                  >
                    {pillar.name}
                  </Link>
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

            <h2 className="brand-eyebrow mt-10 text-champagne">Newsletter</h2>
            <div className="mt-4">
              <NewsletterSignup compact />
            </div>
          </div>
        </div>

        <div className="hairline mt-16 border-t pt-8">
          <p className="text-xs leading-relaxed text-taupe">
            Eve's Sisters publishes general wellness education. Nothing on this
            site is medical advice, diagnosis or treatment, and it is not a
            substitute for care from a qualified clinician. Always speak with
            your own healthcare provider before changing anything about your
            health, and seek immediate care for urgent symptoms.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-taupe">
              &copy; {new Date().getFullYear()} Eve's Sisters. All rights
              reserved.
            </p>
            <p className="brand-eyebrow text-[0.5rem] text-taupe">
              Mind &middot; Body &middot; Beauty &middot; Longevity
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
