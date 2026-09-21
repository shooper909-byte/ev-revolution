import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { PillarIcon, type PillarIconName } from "@/components/PillarIcon";
import { Reveal } from "@/components/Reveal";

const canonical = "https://www.evevolutionhealth.com/eves-secret";
const CTA_HREF = "/contact";

export const metadata: Metadata = {
  title: { absolute: "Eve’s Secret™ Women’s Wellness | Eve’s Sisters" },
  description:
    "Discover Eve’s Secret™, a private, personalized women’s wellness experience supporting weight, hormones, energy, sleep, skin and intimate wellness.",
  alternates: { canonical },
  openGraph: {
    title: "Eve’s Secret™ Women’s Wellness | Eve’s Sisters",
    description:
      "A private, personalized women’s wellness experience designed for every evolution of you.",
    url: canonical,
    type: "website",
  },
};

const benefits: [PillarIconName, string][] = [
  ["leaf", "Weight Support"],
  ["honeycomb", "Hormone Balance"],
  ["bolt", "Lasting Energy"],
  ["renew", "Restorative Sleep"],
  ["lotus", "Radiant Skin"],
  ["infinity", "Intimate Wellness"],
];

const ultimateBenefits = [
  "Comprehensive virtual consultation",
  "Personalized care roadmap",
  "Monthly clinician check-ins",
  "Priority scheduling",
  "Secure care-team messaging",
  "Quarterly progress review",
  "Lab coordination and results review",
  "15% savings on eligible wellness products",
];

const plans = [
  {
    name: "Eve Essentials",
    price: "$99/month",
    label: "A thoughtful foundation",
    benefits: ultimateBenefits.slice(0, 2),
  },
  {
    name: "Eve Elevated",
    price: "$199/month",
    label: "Most Popular",
    benefits: ultimateBenefits.slice(0, 5),
  },
  {
    name: "Eve’s Secret Ultimate",
    price: "$349/month",
    note: "or $999 for the first 90 days",
    label: "Most Complete",
    benefits: ultimateBenefits,
    featured: true,
  },
];

function GoldButton({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href={CTA_HREF}
      className="button-sheen brand-eyebrow inline-flex min-h-12 items-center justify-center rounded-full bg-champagne px-8 py-4 text-center text-[0.625rem] text-onyx transition-colors hover:bg-champagne-200 focus-visible:bg-champagne-200"
    >
      {children}<span aria-hidden="true" className="ml-3">&rarr;</span>
    </Link>
  );
}

export default function EvesSecretPage() {
  return (
    <>
      <section aria-labelledby="secret-title" className="overflow-hidden border-b border-champagne/25 bg-onyx">
        <h1 id="secret-title" className="sr-only">Eve’s Secret — Some things are better shared between sisters.</h1>
        <Link href={CTA_HREF} aria-label="Unlock Eve’s Secret and begin your consultation" className="block focus-visible:outline-offset-[-4px]">
          <Image
            src="/images/eves-secret-hero.png"
            alt="Eve’s Secret luxury wellness banner featuring four women and the message: Some things are better shared between sisters."
            width={1680}
            height={937}
            priority
            sizes="100vw"
            className="h-auto w-full"
          />
        </Link>
      </section>

      <section aria-labelledby="benefits-heading" className="bg-ivory text-onyx">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <h2 id="benefits-heading" className="text-center font-display text-3xl sm:text-4xl">Everything is connected. Your care should be too.</h2>
            <p className="brand-eyebrow mt-4 text-center text-plum">A whole-you approach for a brighter tomorrow</p>
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {benefits.map(([icon, label], index) => (
              <Reveal as="li" key={label} delay={index * 55} className="text-center">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-champagne-700 text-plum">
                  <PillarIcon name={icon} className="h-10 w-10" />
                </span>
                <h3 className="brand-eyebrow mt-5 text-[0.625rem] leading-relaxed text-onyx">{label}</h3>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="pricing-heading" className="bg-[radial-gradient(circle_at_75%_40%,color-mix(in_oklab,var(--color-plum)_26%,transparent),transparent_34%),var(--color-onyx-900)]">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <h2 id="pricing-heading" className="text-center font-display text-3xl text-ivory sm:text-4xl">Choose the Experience That’s Right for You</h2>
            <p className="brand-eyebrow mt-4 text-center text-champagne">Same trusted care. Different levels of support.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 80} className="h-full">
                <article className={`relative flex h-full flex-col rounded-2xl border p-7 sm:p-8 ${plan.featured ? "border-champagne bg-plum-900 text-ivory shadow-[0_0_35px_color-mix(in_oklab,var(--color-champagne)_15%,transparent)]" : "border-ivory-300 bg-ivory text-onyx"}`}>
                  <p className={`brand-eyebrow text-[0.5625rem] ${plan.featured ? "text-champagne" : "text-plum"}`}>{plan.label}</p>
                  <h3 className="mt-5 font-display text-3xl">{plan.name}</h3>
                  <p className="mt-3 font-display text-3xl">{plan.price}</p>
                  {plan.note && <p className="mt-1 text-sm text-ivory-200/80">{plan.note}</p>}
                  <ul className="mt-8 flex-1 space-y-4">
                    {plan.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-3 text-sm leading-relaxed">
                        <span aria-hidden="true" className="mt-0.5 text-champagne-700">✓</span>{benefit}
                      </li>
                    ))}
                  </ul>
                  <Link href={CTA_HREF} className={`brand-eyebrow button-sheen mt-9 rounded-full px-6 py-4 text-center text-[0.625rem] transition-colors ${plan.featured ? "bg-champagne text-onyx hover:bg-champagne-200" : "bg-plum text-ivory hover:bg-plum-600"}`}>
                    {plan.featured ? "Unlock Eve’s Secret" : "Get Started"}
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="final-heading" className="relative overflow-hidden border-t border-champagne/25 bg-[linear-gradient(115deg,var(--color-plum-900),var(--color-onyx)_65%)]">
        <Container className="relative py-20 text-center sm:py-24">
          <Reveal>
            <Eyebrow>Invest in the most important you</Eyebrow>
            <h2 id="final-heading" className="mt-6 font-display text-4xl text-ivory">Your next chapter can begin here.</h2>
            <div className="mt-9"><GoldButton>Unlock Eve’s Secret</GoldButton></div>
            <p className="mx-auto mt-12 max-w-4xl text-xs leading-relaxed text-ivory-200/70">
              Services are provided only where available. Prescription treatment, laboratory testing, and pharmacy charges may be billed separately. Treatment is subject to consultation, clinical eligibility, provider judgment, and applicable state requirements. Individual results vary.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
