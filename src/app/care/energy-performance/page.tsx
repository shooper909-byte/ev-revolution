import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CareLeadForm } from "@/components/CareLeadForm";
import { Container, Eyebrow } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { PlanCards, type Plan } from "@/components/care/PlanCards";
import { Steps } from "@/components/care/Steps";

const canonical = "https://www.evevolutionhealth.com/care/energy-performance";
const title = "Energy and Performance Care | Eve’s Sisters";
const description = "Explore proposed Energy Care plans and join the waitlist. Enrollment is not yet open.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
};

const plans: Plan[] = [
  {
    id: "energy-essential",
    title: "Energy Essential",
    pricePrefix: "Proposed",
    price: "$79",
    priceNote: "/month",
    description: "A proposed entry tier for women exploring persistent fatigue and changes in everyday energy.",
    includes: ["Proposed care tier", "Exact inclusions will be published before enrollment", "Availability is being finalized"],
    cta: "Join the Energy Care Waitlist",
    href: "#get-started",
    footnote: "Laboratory tests, medications, and supplements are billed separately.",
    image: "/images/energy/energy-essential.webp",
    imageAlt: "Walking shoes, a water glass and an unbranded journal in warm morning light.",
  },
  {
    id: "energy-performance-plus",
    title: "Energy Plus",
    pricePrefix: "Proposed",
    price: "$129",
    priceNote: "/month",
    badge: "Featured Plan",
    featured: true,
    description: "A proposed middle tier for women considering broader support around energy, movement and recovery.",
    includes: ["Proposed care tier", "Exact inclusions will be published before enrollment", "Availability is being finalized"],
    cta: "Join the Energy Care Waitlist",
    href: "#get-started",
    footnote: "Laboratory tests, medications, and supplements are billed separately.",
    image: "/images/energy/energy-performance-plus.webp",
    imageAlt: "An adult woman tying her walking shoes beside a sunlit doorway.",
  },
  {
    id: "complete-energy-care",
    title: "Complete Energy Care",
    pricePrefix: "Proposed",
    price: "$169",
    priceNote: "/month",
    description: "A proposed higher tier whose exact scope will be confirmed before enrollment opens.",
    includes: ["Proposed care tier", "Exact inclusions will be published before enrollment", "Availability is being finalized"],
    cta: "Join the Energy Care Waitlist",
    href: "#get-started",
    footnote: "Laboratory tests, medications, and supplements are billed separately.",
    image: "/images/energy/complete-energy-care.webp",
    imageAlt: "A mature woman reviewing an unbranded weekly planner at home.",
  },
];

const steps: [string, string][] = [
  ["Explore proposed options", "Review the three proposed tiers without paying or enrolling."],
  ["Join the waitlist", "Share only your name, email, state, optional phone number and contact consent."],
  ["Complete secure intake after launch", "If care becomes available, clinical information will be collected through the approved secure intake."],
];

const faqs: [string, string][] = [
  ["Is Energy Care enrollment open?", "No. Energy care enrollment is not yet open. The current form is a contact-only waitlist."],
  ["Are the prices active subscriptions?", "No. The monthly prices are proposed. Services, availability and exact inclusions are still being finalized."],
  ["What will each tier include?", "Exact inclusions will be published before enrollment. No clinical service begins when you join the waitlist."],
  ["Are tests, medications or supplements included?", "Laboratory tests, medications, and supplements are billed separately."],
  ["Who may provide clinical services?", "When available, clinical services are provided by independent licensed clinicians. Eligibility and state availability will be confirmed before care begins."],
];

export default function EnergyPerformanceCarePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-onyx-700 bg-onyx">
        <Image src="/images/energy/energy-hero.webp" alt="An adult woman taking a calm morning walk through a city park." fill priority sizes="100vw" className="object-cover object-center lg:object-right" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,11,0.98)_0%,rgba(8,11,11,0.88)_42%,rgba(8,11,11,0.25)_72%,rgba(8,11,11,0.08)_100%)]" />
        <Container className="relative py-20 sm:py-24 lg:py-32">
          <nav aria-label="Breadcrumb" className="brand-eyebrow text-[0.5625rem] text-taupe"><Link href="/care" className="hover:text-champagne">Care</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-ivory-200">Energy and Performance</span></nav>
          <div className="mt-10 max-w-2xl">
            <Eyebrow>Energy and Performance</Eyebrow>
            <h1 className="mt-7 font-display text-[2.75rem] leading-[1.04] text-ivory sm:text-6xl lg:text-7xl">Understand Your Fatigue. Explore Your Next Step.</h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ivory-200/90 sm:text-lg">Learn how a clinical evaluation may explore sleep, nutrition, hormonal changes, and other contributors to persistent fatigue.</p>
            <p className="mt-5 text-sm font-semibold text-champagne">Energy care enrollment is not yet open.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#plans" className="button-sheen brand-eyebrow bg-plum px-8 py-4 text-center text-[0.625rem] text-ivory hover:bg-plum-600">Explore Proposed Plans</a>
              <a href="#get-started" className="hairline brand-eyebrow border px-8 py-4 text-center text-[0.625rem] text-champagne hover:bg-onyx-800">Join the Waitlist</a>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-ivory">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">Fatigue deserves context</p>
            <h2 className="mt-6 font-display text-[2.2rem] leading-tight text-onyx sm:text-5xl">Fatigue is a symptom, not a diagnosis.</h2>
            <p className="mt-6 text-base leading-relaxed text-onyx-800/80">Sleep, nutrition, hormonal changes, stress, medications and underlying health conditions can all affect energy. A clinical evaluation may consider several contributors rather than assuming a single cause.</p>
            <p className="mt-5 text-sm leading-relaxed text-onyx-800/70">When available, clinical services are provided by independent licensed clinicians. Testing, treatment and prescriptions are never guaranteed.</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-plum/20">
              <Image src="/images/energy/movement-recovery.webp" alt="A mature woman gently stretching at home after everyday movement." fill sizes="(min-width: 1024px) 46vw, 92vw" className="object-cover" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="plans" aria-labelledby="plans-heading" className="scroll-mt-24 border-b border-onyx-700 bg-ivory-200/50">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">Proposed plans</p>
            <h2 id="plans-heading" className="mt-6 font-display text-[2.2rem] leading-tight text-onyx sm:text-5xl">Explore the proposed Energy Care tiers.</h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-onyx-800/75">Proposed monthly pricing. Services and availability are being finalized.</p>
          </Reveal>
          <PlanCards plans={plans} />
          <p className="mt-8 text-center text-sm leading-relaxed text-onyx-800/70">These are not active subscriptions. Enrollment and payment are disabled until the program and verified intake links are ready.</p>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-onyx">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
          <Reveal>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-champagne/35">
              <Image src="/images/home/review-your-options.webp" alt="A woman speaking with a female clinician during a telehealth consultation." fill sizes="(min-width: 1024px) 46vw, 92vw" className="object-cover" />
            </div>
            <p className="mt-3 text-xs text-taupe">Illustrative scene. Models are not presented as actual clinicians or patients.</p>
          </Reveal>
          <Reveal delay={80}>
            <Eyebrow>How it may work</Eyebrow>
            <h2 className="mt-6 font-display text-[2.2rem] leading-tight text-ivory sm:text-5xl">A careful path from interest to care.</h2>
            <div className="mt-10 rounded-3xl bg-ivory p-7 sm:p-9"><Steps steps={steps} /></div>
          </Reveal>
        </Container>
      </section>

      <section id="get-started" aria-labelledby="waitlist-heading" className="scroll-mt-24 border-b border-onyx-700 bg-[radial-gradient(circle_at_15%_20%,rgba(111,41,87,0.32),transparent_35%),var(--color-onyx)]">
        <Container className="grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
          <Reveal>
            <Eyebrow>Energy Care waitlist</Eyebrow>
            <h2 id="waitlist-heading" className="mt-6 font-display text-[2.2rem] leading-tight text-ivory sm:text-5xl">Join the Energy Care Waitlist.</h2>
            <p className="mt-6 text-base leading-relaxed text-ivory-200/85">Energy care enrollment is not yet open. Joining the waitlist does not start clinical care, create a subscription or accept payment.</p>
            <p className="hairline mt-8 border-t pt-6 text-sm leading-relaxed text-ivory-200/70">Please do not submit symptoms, medications, or medical history here.</p>
          </Reveal>
          <Reveal delay={80}><CareLeadForm program="energy-performance" labelledBy="waitlist-heading" privacyNote="Contact details only. No medical information is requested or accepted here." /></Reveal>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-ivory">
        <Container className="grid gap-12 py-20 lg:grid-cols-[0.75fr_1.25fr] lg:py-24">
          <Reveal><p className="brand-eyebrow text-plum">Questions</p><h2 className="mt-6 font-display text-[2.2rem] leading-tight text-onyx sm:text-5xl">Energy Care FAQ</h2></Reveal>
          <div className="divide-y divide-onyx/15 border-y border-onyx/15">{faqs.map(([question, answer]) => <details key={question} className="group"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg text-onyx [&::-webkit-details-marker]:hidden">{question}<span aria-hidden="true" className="text-plum transition-transform motion-safe:group-open:rotate-45">+</span></summary><p className="pb-6 text-sm leading-relaxed text-onyx-800/80">{answer}</p></details>)}</div>
        </Container>
      </section>

      <section className="bg-plum-900">
        <Container className="py-12 sm:py-14">
          <p className="brand-eyebrow text-champagne">When to seek urgent care</p>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-ivory-200/90">Fatigue with chest pain, severe or sudden shortness of breath, fainting, new confusion, new one-sided weakness, severe palpitations, significant bleeding or thoughts of self-harm needs urgent in-person care. Call 911 or go to an emergency department for severe or life-threatening symptoms.</p>
        </Container>
      </section>
    </>
  );
}
