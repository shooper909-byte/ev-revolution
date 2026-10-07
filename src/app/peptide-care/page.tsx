import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Clinician-Guided Peptide Care",
  description: "All-inclusive Eve’s Sisters longevity and energy plans, with additional peptide programs pending regulatory review.",
  alternates: { canonical: "/peptide-care" },
};

const plans = [
  { name: "Sermorelin", price: "$199 / month", href: "/care/longevity-healthspan#plans", detail: "Medication if prescribed, provider review, discreet shipping and secure messaging." },
  { name: "NAD+ Injection", price: "$199 / month", href: "/care/energy-performance#plans", detail: "Medication if prescribed, provider review, supplies, discreet shipping and secure messaging." },
  { name: "NAD+ Nasal Spray", price: "$149 / month", href: "/care/energy-performance#plans", detail: "Medication if prescribed, provider review, discreet shipping and secure messaging." },
  { name: "Glutathione Add-on", price: "$99 / month", href: "/care/longevity-healthspan#plans", detail: "Available only with an eligible primary plan. It shares the plan’s review and shipment." },
];

export default function PeptideCarePage() {
  return (
    <main className="bg-onyx text-ivory">
      <section className="border-b border-onyx-700">
        <Container className="py-20 sm:py-28">
          <Eyebrow>Peptide Care</Eyebrow>
          <h1 className="mt-7 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">All-inclusive care with clear boundaries.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ivory-200">These plans include medication if prescribed, provider review, shipping and secure care-team messaging. Labs are separate.</p>
          <p className="mt-5 max-w-3xl text-sm font-semibold text-champagne">Availability pending. Online requests are not open yet, and no payment is taken.</p>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-ivory text-onyx">
        <Container className="py-20 sm:py-24">
          <Reveal><Eyebrow className="text-plum">Current plan links</Eyebrow><h2 className="mt-6 font-display text-4xl sm:text-5xl">Review all-inclusive options.</h2></Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {plans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 60}>
                <article className="flex h-full flex-col rounded-3xl border border-plum/20 bg-white p-7">
                  <h3 className="font-display text-3xl">{plan.name}</h3><p className="mt-3 text-xl text-plum">{plan.price}</p>
                  <p className="mt-5 flex-1 text-sm leading-7 text-onyx-800/75">{plan.detail}</p>
                  <Link href={plan.href} className="brand-eyebrow mt-7 text-[0.625rem] text-plum hover:underline">View care page →</Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-onyx-900">
        <Container className="py-20 sm:py-24">
          <Reveal><Eyebrow>Coming soon</Eyebrow><h2 className="mt-6 font-display text-4xl sm:text-5xl">Advanced Peptide Therapies</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-ivory-200">Additional peptide programs pending regulatory review. Join the waitlist for updates.</p>
            <div className="mt-8 max-w-xl"><NewsletterSignup source="waitlist" hint="Email only. We’ll share availability updates, not a treatment offer." /></div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-plum-900"><Container className="py-12 sm:py-14"><p className="brand-eyebrow text-champagne">Important disclosure</p><p className="mt-4 max-w-5xl text-sm leading-relaxed text-ivory-200/90">Treatment is subject to consultation, clinical eligibility, provider judgment, and applicable state requirements. Compounded medications are not FDA-approved. Availability and pricing may change.</p></Container></section>
    </main>
  );
}
