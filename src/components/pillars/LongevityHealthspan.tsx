import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

const careAreas = [
  {
    id: "healthy-aging-foundations",
    title: "Healthy Aging Foundations",
    copy: "A proposed starting point for reviewing everyday movement, strength, sleep and routine preventive-care priorities.",
    image: "/images/energy/movement-recovery.webp",
    alt: "A mature woman stretching gently at home after everyday movement.",
  },
  {
    id: "midlife-health-review",
    title: "Midlife Health Review",
    copy: "A proposed pathway for discussing changes across midlife and the questions worth bringing to primary or specialty care.",
    image: "/images/mrs-collection/mrs-golden.png",
    alt: "Three adult women of different backgrounds sharing time together.",
  },
  {
    id: "ongoing-healthspan-support",
    title: "Ongoing Healthspan Support",
    copy: "A proposed pathway for revisiting goals and coordinating next steps when the program and clinical scope are confirmed.",
    image: "/images/home/review-your-options.webp",
    alt: "A woman speaking with a female clinician during an illustrative telehealth consultation.",
  },
] as const;

const focus = [
  ["Strength and mobility", "Muscle-strengthening, aerobic and balance activities can support everyday function. The right plan should reflect your current health and mobility."],
  ["Bone health", "Bone health changes across adulthood and after menopause. A clinician can help discuss personal risk factors and whether screening belongs in your care plan."],
  ["Heart and metabolic health", "Blood pressure, blood lipids, blood glucose, activity, sleep and nicotine exposure are common parts of cardiovascular health conversations."],
  ["Sleep and everyday wellbeing", "Restful sleep, emotional wellbeing and social connection are meaningful parts of healthy aging and daily quality of life."],
] as const;

export function LongevityHealthspan() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-onyx-700 bg-onyx">
        <Image src="/images/longevity/longevity-hero.webp" alt="An active older woman walking along a garden path at golden hour." fill priority sizes="100vw" className="object-cover object-[67%_center]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,11,0.98)_0%,rgba(8,11,11,0.9)_40%,rgba(8,11,11,0.28)_70%,rgba(8,11,11,0.08)_100%)]" />
        <Container className="relative py-20 sm:py-28 lg:py-36">
          <Link href="/#pillars" className="brand-eyebrow text-[0.5625rem] text-champagne hover:text-champagne-200">&larr; All care pathways</Link>
          <div className="mt-10 max-w-2xl">
            <Eyebrow>Longevity &amp; Healthspan</Eyebrow>
            <h1 className="mt-7 font-display text-[2.7rem] leading-[1.04] text-ivory sm:text-6xl lg:text-7xl">More Strength. More Possibility. Through Every Stage.</h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ivory-200/90 sm:text-lg">Explore healthy aging through strength, everyday habits, preventive care, and conversations with qualified clinicians.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/care/longevity-healthspan" className="button-sheen brand-eyebrow bg-plum px-8 py-4 text-center text-[0.625rem] text-ivory hover:bg-plum-600">Explore Longevity Care</Link>
              <Link href="/care/longevity-healthspan#get-started" className="hairline brand-eyebrow border px-8 py-4 text-center text-[0.625rem] text-champagne hover:bg-onyx-800">Join the Waitlist</Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-ivory">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">A practical definition</p>
            <h2 className="mt-6 font-display text-[2.25rem] leading-tight text-onyx sm:text-5xl">Healthspan means the years of life spent in good health.</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-onyx-800/80">It is not a promise to prevent disease, improve cognition or extend life. It is a useful way to organize conversations about function, preventive care and the everyday factors that support wellbeing as we age.</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-plum/25">
              <Image src="/images/mrs-collection/mrs-golden.png" alt="Three adult women of different backgrounds spending time together." fill sizes="(min-width: 1024px) 42vw, 92vw" className="object-cover" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-onyx-900">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <Eyebrow>Healthy-aging conversations</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-display text-[2.25rem] leading-tight text-ivory sm:text-5xl">Four areas worth understanding.</h2>
          </Reveal>
          <div className="mt-12 grid gap-px bg-onyx-700/60 sm:grid-cols-2">
            {focus.map(([title, copy], index) => (
              <Reveal key={title} delay={index * 50}>
                <article className="h-full bg-onyx-900 p-8 sm:p-10">
                  <p className="brand-eyebrow text-champagne">0{index + 1}</p>
                  <h3 className="mt-5 font-display text-2xl text-ivory">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ivory-200/78">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-ivory-200/50">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">Proposed care areas</p>
            <h2 className="mt-6 font-display text-[2.25rem] leading-tight text-onyx sm:text-5xl">A thoughtful next step, still being defined.</h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-onyx-800/75">Program details and pricing coming soon. These pathways are proposed. Exact inclusions, clinical scope and state availability are pending confirmation. No enrollment or payment is available today.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {careAreas.map((area, index) => (
              <Reveal key={area.id} delay={index * 60}>
                <article className="hairline group flex h-full flex-col overflow-hidden rounded-3xl border bg-ivory">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image src={area.image} alt={area.alt} fill sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]" />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-onyx/35 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-2xl text-onyx">{area.title}</h3>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-onyx-800/75">{area.copy}</p>
                    <Link href={`/care/longevity-healthspan#${area.id}`} className="brand-eyebrow mt-7 text-[0.5625rem] text-plum">Explore proposed pathway <span aria-hidden="true">&rarr;</span></Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-plum-900">
        <Container className="flex flex-col items-start justify-between gap-7 py-14 sm:flex-row sm:items-center">
          <div>
            <p className="brand-eyebrow text-champagne">Longevity Care waitlist</p>
            <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">Be first to know when enrollment opens.</h2>
          </div>
          <Link href="/care/longevity-healthspan#get-started" className="button-sheen brand-eyebrow shrink-0 bg-champagne px-8 py-4 text-[0.625rem] text-onyx hover:bg-champagne-200">Join the Waitlist</Link>
        </Container>
      </section>
    </>
  );
}
