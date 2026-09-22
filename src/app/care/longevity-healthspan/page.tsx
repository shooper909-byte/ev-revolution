import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CareLeadForm } from "@/components/CareLeadForm";
import { Container, Eyebrow } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Steps } from "@/components/care/Steps";

const canonical = "https://www.evevolutionhealth.com/care/longevity-healthspan";
const title = "Longevity and Healthspan Care | Eve’s Sisters";
const description = "Review proposed longevity and healthspan care pathways and join the contact-only waitlist.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
};

const pathways = [
  {
    id: "healthy-aging-foundations",
    title: "Healthy Aging Foundations",
    copy: "A proposed starting point for reviewing movement, strength, sleep and preventive-care priorities with the appropriate clinician.",
    image: "/images/energy/movement-recovery.webp",
    alt: "A mature woman stretching gently at home after everyday movement.",
  },
  {
    id: "midlife-health-review",
    title: "Midlife Health Review",
    copy: "A proposed pathway for organizing questions about midlife changes and the routine screening discussions that may be relevant to you.",
    image: "/images/mrs-collection/mrs-golden.png",
    alt: "Three adult women of different backgrounds spending time together.",
  },
  {
    id: "ongoing-healthspan-support",
    title: "Ongoing Healthspan Support",
    copy: "A proposed pathway for revisiting goals and coordinating next steps after program scope and clinical availability are confirmed.",
    image: "/images/home/review-your-options.webp",
    alt: "A woman speaking with a female clinician during an illustrative telehealth consultation.",
  },
] as const;

const steps: [string, string][] = [
  ["Explore your care options.", "Review the educational focus and proposed options without paying or enrolling."],
  ["When enrollment opens, complete a secure clinical assessment.", "Clinical information will be collected only through the approved secure intake."],
  ["Discuss appropriate next steps with an independent licensed clinician.", "Availability, eligibility and appropriate next steps depend on the individual clinical evaluation."],
];

const faqs: [string, string][] = [
  ["What does healthspan mean?", "Healthspan means the years of life spent in good health. It is a planning framework, not a promise of longer life or a guaranteed health outcome."],
  ["What can telehealth support?", "The program scope is still being confirmed. Some conversations may be appropriate for telehealth, while examinations, imaging, screenings and other services may require in-person care."],
  ["Are labs or medications included?", "No laboratory tests, medications or supplements are confirmed as included. Pricing and exact inclusions will be published before enrollment opens."],
  ["Does everyone need testing or medication?", "No. Testing and medication decisions are individual and may not be appropriate or necessary. Nothing is prescribed or ordered by joining the waitlist."],
  ["Can this complement menopause or weight-management care?", "Those care areas can overlap, but coordination and the appropriate pathway depend on individual needs and clinician guidance. No combined program is currently promised."],
  ["When will enrollment open?", "A launch date has not been confirmed. The contact-only waitlist is the best way to receive an availability update."],
];

export default function LongevityHealthspanCarePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-onyx-700 bg-onyx">
        <Image src="/images/longevity/longevity-hero.webp" alt="An active older woman walking along a garden path at golden hour." fill priority sizes="100vw" className="object-cover object-[67%_center]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,11,0.98)_0%,rgba(8,11,11,0.9)_40%,rgba(8,11,11,0.28)_70%,rgba(8,11,11,0.08)_100%)]" />
        <Container className="relative py-20 sm:py-28 lg:py-36">
          <nav aria-label="Breadcrumb" className="brand-eyebrow text-[0.5625rem] text-taupe"><Link href="/care" className="hover:text-champagne">Care</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-ivory-200">Longevity &amp; Healthspan</span></nav>
          <div className="mt-10 max-w-2xl">
            <Eyebrow>Longevity &amp; Healthspan</Eyebrow>
            <h1 className="mt-7 font-display text-[2.7rem] leading-[1.04] text-ivory sm:text-6xl lg:text-7xl">More Strength. More Possibility. Through Every Stage.</h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ivory-200/90 sm:text-lg">Explore healthy aging through strength, everyday habits, preventive care, and conversations with qualified clinicians.</p>
            <p className="mt-5 text-sm font-semibold text-champagne">Longevity care enrollment is not yet open.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#pathways" className="button-sheen brand-eyebrow bg-plum px-8 py-4 text-center text-[0.625rem] text-ivory hover:bg-plum-600">Explore Proposed Pathways</a>
              <a href="#get-started" className="hairline brand-eyebrow border px-8 py-4 text-center text-[0.625rem] text-champagne hover:bg-onyx-800">Join the Waitlist</a>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-ivory">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">What healthspan means</p>
            <h2 className="mt-6 font-display text-[2.25rem] leading-tight text-onyx sm:text-5xl">The years of life spent in good health.</h2>
            <p className="mt-6 text-base leading-relaxed text-onyx-800/80">Healthspan is a framework for discussing function, preventive care and wellbeing over time. It is not a guarantee of disease prevention, cognitive improvement or a longer life.</p>
            <p className="mt-5 text-sm leading-relaxed text-onyx-800/70">Routine primary care remains essential. Individual screening and treatment decisions belong with a qualified clinician who knows your health history.</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-plum/25"><Image src="/images/mrs-collection/mrs-golden.png" alt="Three adult women of different backgrounds sharing a relaxed moment together." fill sizes="(min-width: 1024px) 46vw, 92vw" className="object-cover" /></div>
          </Reveal>
        </Container>
      </section>

      <section id="pathways" aria-labelledby="pathways-heading" className="scroll-mt-24 border-b border-onyx-700 bg-ivory-200/50">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">Proposed care pathways</p>
            <h2 id="pathways-heading" className="mt-6 font-display text-[2.25rem] leading-tight text-onyx sm:text-5xl">Three proposed ways to begin.</h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-onyx-800/75">Program details and pricing coming soon. Confirmed inclusions: none yet. Exact exclusions, clinical scope and state availability are pending confirmation. These are not active subscriptions, and paid enrollment is disabled.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pathways.map((pathway, index) => (
              <Reveal key={pathway.id} delay={index * 60}>
                <article id={pathway.id} className="hairline group scroll-mt-28 overflow-hidden rounded-3xl border bg-ivory">
                  <div className="relative aspect-[3/2] overflow-hidden"><Image src={pathway.image} alt={pathway.alt} fill sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]" /><div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-onyx/30 to-transparent" /></div>
                  <div className="p-7"><p className="brand-eyebrow text-plum">Proposed pathway</p><h3 className="mt-4 font-display text-2xl text-onyx">{pathway.title}</h3><p className="mt-4 text-sm leading-relaxed text-onyx-800/75">{pathway.copy}</p><a href="#get-started" className="brand-eyebrow mt-7 inline-block text-[0.5625rem] text-plum">Join the waitlist <span aria-hidden="true">&rarr;</span></a></div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-onyx-900">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
          <Reveal><div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-champagne/35"><Image src="/images/home/review-your-options.webp" alt="A woman speaking with a female clinician during an illustrative telehealth consultation." fill sizes="(min-width: 1024px) 46vw, 92vw" className="object-cover" /></div><p className="mt-3 text-xs text-taupe">Illustrative scene. Models are not presented as actual clinicians or patients.</p></Reveal>
          <Reveal delay={80}><Eyebrow>How it may work</Eyebrow><h2 className="mt-6 font-display text-[2.25rem] leading-tight text-ivory sm:text-5xl">A careful path from interest to care.</h2><div className="mt-10 rounded-3xl bg-ivory p-7 sm:p-9"><Steps steps={steps} /></div></Reveal>
        </Container>
      </section>

      <section id="get-started" aria-labelledby="waitlist-heading" className="scroll-mt-24 border-b border-onyx-700 bg-[radial-gradient(circle_at_15%_20%,rgba(111,41,87,0.32),transparent_35%),var(--color-onyx)]">
        <Container className="grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
          <Reveal><Eyebrow>Longevity Care waitlist</Eyebrow><h2 id="waitlist-heading" className="mt-6 font-display text-[2.25rem] leading-tight text-ivory sm:text-5xl">Join the Longevity Care Waitlist.</h2><p className="mt-6 text-base leading-relaxed text-ivory-200/85">Enrollment is not yet open. Joining the waitlist does not start clinical care, create a subscription or accept payment.</p><p className="hairline mt-8 border-t pt-6 text-sm leading-relaxed text-ivory-200/70">Please do not submit symptoms, medications, or medical history here.</p></Reveal>
          <Reveal delay={80}><CareLeadForm program="longevity-healthspan" labelledBy="waitlist-heading" privacyNote="Contact details only. No medical information is requested or accepted here." /></Reveal>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-ivory">
        <Container className="grid gap-12 py-20 lg:grid-cols-[0.75fr_1.25fr] lg:py-24">
          <Reveal><p className="brand-eyebrow text-plum">Questions</p><h2 className="mt-6 font-display text-[2.25rem] leading-tight text-onyx sm:text-5xl">Longevity Care FAQ</h2></Reveal>
          <div className="divide-y divide-onyx/15 border-y border-onyx/15">{faqs.map(([question, answer]) => <details key={question} className="group"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg text-onyx [&::-webkit-details-marker]:hidden">{question}<span aria-hidden="true" className="text-plum transition-transform motion-safe:group-open:rotate-45">+</span></summary><p className="pb-6 text-sm leading-relaxed text-onyx-800/80">{answer}</p></details>)}</div>
        </Container>
      </section>

      <section className="bg-plum-900">
        <Container className="py-12 sm:py-14">
          <p className="brand-eyebrow text-champagne">Care boundaries</p>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-ivory-200/90">This proposed telehealth experience does not replace primary care, emergency care, an in-person physical examination, imaging, bone-density screening or specialty care. For new, severe or rapidly worsening symptoms, seek appropriate in-person or urgent medical care.</p>
        </Container>
      </section>
    </>
  );
}
