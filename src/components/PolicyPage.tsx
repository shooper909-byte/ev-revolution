import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { business, businessName, policiesEffectiveDate } from "@/lib/business";

/** A paragraph, or a bulleted list when given an array. */
export type PolicyBlock = string | readonly string[];

export type PolicySection = {
  heading: string;
  body: readonly PolicyBlock[];
};

export const policyLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/telehealth-consent", label: "Telehealth Consent" },
  { href: "/subscription-cancellation", label: "Subscription Cancellation" },
  { href: "/hipaa-policy", label: "HIPAA Policy" },
  { href: "/disclaimer", label: "Medical Disclaimer" },
] as const;

export function BusinessContact({ className = "text-base" }: { className?: string }) {
  return (
    <ul className={`mt-4 space-y-2 leading-relaxed text-ivory-200/80 ${className}`}>
      <li>{businessName}</li>
      {business.address.map((line) => (
        <li key={line}>{line}</li>
      ))}
      <li>
        Email:{" "}
        <a href={`mailto:${business.email}`} className="text-ivory hover:text-champagne">
          {business.email}
        </a>
      </li>
      {business.phone && (
        <li>
          Phone:{" "}
          <a href={`tel:${business.phone.replace(/[^\d+]/g, "")}`} className="text-ivory hover:text-champagne">
            {business.phone}
          </a>
        </li>
      )}
    </ul>
  );
}

export function PolicyPage({
  eyebrow = "Policies",
  title,
  intro,
  sections,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  sections: readonly PolicySection[];
}) {
  return (
    <section>
      <Container className="py-20 sm:py-28">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-8 max-w-3xl font-display text-[2.5rem] leading-[1.08] text-ivory sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-sm text-taupe">Effective {policiesEffectiveDate}</p>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-ivory-200/85">{intro}</p>

        <div className="mt-16 max-w-3xl space-y-12">
          {sections.map((section) => (
            <div key={section.heading} className="hairline border-t pt-6">
              <h2 className="font-display text-2xl leading-snug text-ivory">{section.heading}</h2>
              {section.body.map((block, index) =>
                typeof block === "string" ? (
                  <p key={index} className="mt-4 text-base leading-relaxed text-ivory-200/80">
                    {block}
                  </p>
                ) : (
                  <ul key={index} className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ivory-200/80">
                    {block.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ),
              )}
            </div>
          ))}

          <div className="hairline border-t pt-6">
            <h2 className="font-display text-2xl leading-snug text-ivory">Contact us</h2>
            <BusinessContact />
          </div>

          <nav aria-label="Policies" className="hairline border-t pt-6">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ivory-200 transition-colors hover:text-champagne">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
