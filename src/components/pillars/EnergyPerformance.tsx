import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { PlanCards, type Plan } from "@/components/care/PlanCards";
import type { Pillar } from "@/lib/pillars";

const previewPlans: Plan[] = [
  {
    id: "energy-essential-preview",
    title: "Energy Essential",
    pricePrefix: "Proposed",
    price: "$79",
    priceNote: "/month",
    description: "A proposed starting tier for exploring persistent fatigue and changes in everyday energy.",
    includes: ["Exact inclusions will be published before enrollment"],
    cta: "View Energy Essential",
    href: "/care/energy-performance#energy-essential",
    footnote: "Laboratory tests, medications, and supplements are billed separately.",
    image: "/images/energy/energy-essential.webp",
    imageAlt: "Walking shoes, a water glass and an unbranded journal in warm morning light.",
  },
  {
    id: "energy-performance-plus-preview",
    title: "Energy and Performance Plus",
    pricePrefix: "Proposed",
    price: "$129",
    priceNote: "/month",
    badge: "Featured Plan",
    featured: true,
    description: "A proposed middle tier focused on energy, everyday movement and recovery.",
    includes: ["Exact inclusions will be published before enrollment"],
    cta: "View Performance Plus",
    href: "/care/energy-performance#energy-performance-plus",
    footnote: "Laboratory tests, medications, and supplements are billed separately.",
    image: "/images/energy/energy-performance-plus.webp",
    imageAlt: "An adult woman tying her walking shoes beside a sunlit doorway.",
  },
  {
    id: "complete-energy-care-preview",
    title: "Complete Energy Care",
    pricePrefix: "Proposed",
    price: "$169",
    priceNote: "/month",
    description: "A proposed higher tier whose final scope will be confirmed before enrollment opens.",
    includes: ["Exact inclusions will be published before enrollment"],
    cta: "View Complete Energy Care",
    href: "/care/energy-performance#complete-energy-care",
    footnote: "Laboratory tests, medications, and supplements are billed separately.",
    image: "/images/energy/complete-energy-care.webp",
    imageAlt: "A mature woman reviewing an unbranded weekly planner at home.",
  },
];

const contributors = [
  ["Sleep and recovery", "Sleep duration, quality and patterns may influence daytime energy."],
  ["Nutrition and daily demands", "Fueling, routines and sustained stress can shape how fatigue is experienced."],
  ["Hormonal and health changes", "Hormonal transitions, medications and health conditions may also contribute."],
] as const;

export function EnergyPerformance({ pillar }: { pillar: Pillar }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-onyx-700 bg-onyx">
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <nav aria-label="Breadcrumb" className="brand-eyebrow text-[0.5625rem] text-taupe"><Link href="/care" className="hover:text-champagne">Care</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-ivory-200">{pillar.name}</span></nav>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <Eyebrow>Energy and Performance</Eyebrow>
            <h1 className="mt-7 font-display text-[2.75rem] leading-[1.04] text-ivory sm:text-6xl lg:text-7xl">Understand Your Fatigue. Explore Your Next Step.</h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ivory-200/90 sm:text-lg">Learn how a clinical evaluation may explore sleep, nutrition, hormonal changes, and other contributors to persistent fatigue.</p>
            <p className="mt-5 text-sm font-semibold text-champagne">Energy care enrollment is not yet open.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#plans" className="button-sheen cta-glow hover:cta-glow-hover brand-eyebrow rounded-full px-8 py-4 text-center text-[0.625rem] text-ivory">Explore Proposed Plans</a>
              <Link href="/care/energy-performance#get-started" className="hairline brand-eyebrow border px-8 py-4 text-center text-[0.625rem] text-champagne hover:bg-onyx-800">Join the Waitlist</Link>
            </div>
          </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-onyx-900">
              <Image src="/images/energy/energy-hero.webp" alt="An adult woman taking a calm morning walk through a city park." fill priority sizes="(max-width: 1023px) 92vw, 44vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-ivory">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">Start with understanding</p>
            <h2 className="mt-6 max-w-3xl font-display text-[2.2rem] leading-tight text-onyx sm:text-5xl">Fatigue is a symptom, not a diagnosis.</h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-onyx-800/80">Persistent fatigue can have more than one contributor. Education can help you prepare for a thoughtful clinical conversation without promising a diagnosis, test or treatment.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {contributors.map(([title, copy], index) => <Reveal key={title} delay={index * 70}><article className="h-full rounded-3xl border border-onyx/10 bg-white/70 p-7"><span className="font-display text-3xl text-plum">0{index + 1}</span><h3 className="mt-5 font-display text-2xl text-onyx">{title}</h3><p className="mt-4 text-sm leading-relaxed text-onyx-800/75">{copy}</p></article></Reveal>)}
          </div>
        </Container>
      </section>

      <section id="plans" aria-labelledby="preview-plans-heading" className="scroll-mt-24 border-b border-onyx-700 bg-ivory-200/50">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">Energy Care preview</p>
            <h2 id="preview-plans-heading" className="mt-6 font-display text-[2.2rem] leading-tight text-onyx sm:text-5xl">Three proposed ways to explore care.</h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-onyx-800/75">Proposed monthly pricing. Services and availability are being finalized.</p>
          </Reveal>
          <PlanCards plans={previewPlans} />
          <p className="mt-8 text-center text-sm leading-relaxed text-onyx-800/70">These prices are not active subscriptions. Exact inclusions will be published before enrollment.</p>
          <p className="mt-5 text-center">
            <Link href="/care/energy-performance#plans" className="brand-eyebrow text-[0.625rem] text-plum underline decoration-plum/35 underline-offset-[6px] transition-colors hover:text-plum-600">
              Compare Plans
            </Link>
          </p>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-onyx">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-champagne/35"><Image src="/images/home/review-your-options.webp" alt="A woman speaking with a female clinician during a telehealth consultation." fill sizes="(min-width: 1024px) 46vw, 92vw" className="object-cover" /></div>
            <p className="mt-3 text-xs text-taupe">Illustrative scene. Models are not presented as actual clinicians or patients.</p>
          </Reveal>
          <Reveal delay={80}>
            <Eyebrow>A future clinical pathway</Eyebrow>
            <h2 className="mt-6 font-display text-[2.2rem] leading-tight text-ivory sm:text-5xl">Clinical care begins only after launch and evaluation.</h2>
            <p className="mt-6 text-base leading-relaxed text-ivory-200/85">When available, services may be provided by independent licensed clinicians. Joining the waitlist does not begin clinical care, establish eligibility or guarantee treatment.</p>
            <Link href="/care/energy-performance#get-started" className="button-sheen cta-glow hover:cta-glow-hover brand-eyebrow mt-9 inline-block rounded-full px-8 py-4 text-[0.625rem] text-ivory">Join the Energy Care Waitlist</Link>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-ivory">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-[1fr_0.9fr] lg:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">Everyday movement and recovery</p>
            <h2 className="mt-6 font-display text-[2.2rem] leading-tight text-onyx sm:text-5xl">Energy is more than pushing harder.</h2>
            <p className="mt-6 text-base leading-relaxed text-onyx-800/80">Rest, movement, nutrition and the demands of daily life may all be relevant. The goal of a future evaluation is to understand context, not to promise performance enhancement.</p>
          </Reveal>
          <Reveal delay={80}><div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-plum/20"><Image src="/images/energy/movement-recovery.webp" alt="A mature woman gently stretching at home after everyday movement." fill sizes="(min-width: 1024px) 42vw, 92vw" className="object-cover" /></div></Reveal>
        </Container>
      </section>

      <section className="bg-plum-900">
        <Container className="py-12 sm:py-14">
          <p className="brand-eyebrow text-champagne">Urgent symptoms</p>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-ivory-200/90">Fatigue with chest pain, severe or sudden shortness of breath, fainting, new confusion, new one-sided weakness, severe palpitations, significant bleeding or thoughts of self-harm needs urgent in-person care. Call 911 or go to an emergency department for severe or life-threatening symptoms.</p>
        </Container>
      </section>
    </>
  );
}
