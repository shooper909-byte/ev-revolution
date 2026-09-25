import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import type { Pillar } from "@/lib/pillars";

/* ------------------------------------------------------------------
   The Hormones & Menopause pillar landing page.

   The nav sends every pillar to /pillars/<slug>, and this is the only
   pillar that had no page of its own — it fell through to the generic
   template while its finished care page sat at /care/hormones-menopause,
   reachable only from the /care cards.

   Framing copy comes from the pillar record so this page and the nav stay
   in step. Plan names and descriptions are quoted from the care page, and
   pricing deliberately is not: prices live on the care page alone, so
   there is one place to change them.
   ------------------------------------------------------------------ */

const CARE = "/care/hormones-menopause";

const plans = [
  {
    id: "menopause-essential",
    title: "Menopause Essential",
    copy: "Personalized menopause care with access to eligible hormone therapies.",
  },
  {
    id: "menopause-plus",
    title: "Menopause Plus",
    badge: "Most popular",
    copy: "Enhanced hormone care for women who need more monitoring, medication flexibility and ongoing support.",
  },
  {
    id: "sexual-wellness",
    title: "Sexual Wellness",
    copy: "Discreet clinical support for eligible women experiencing changes in libido, comfort or sexual wellness.",
  },
  {
    id: "complete-menopause-sexual-wellness",
    title: "Complete Menopause + Sexual Wellness",
    badge: "Best value",
    copy: "Menopause care and sexual-wellness support under one plan, coordinated by the same care team.",
  },
] as const;

export function HormonesMenopause({ pillar }: { pillar: Pillar }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-onyx-700 bg-onyx">
        <Image
          src="/images/care/care-menopause-hormones.webp"
          alt={pillar.careImageAlt ?? "A woman in her fifties with silver-streaked hair, lit against a dark background and looking upward."}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,11,0.98)_0%,rgba(8,11,11,0.9)_40%,rgba(8,11,11,0.28)_70%,rgba(8,11,11,0.08)_100%)]" />
        <Container className="relative py-20 sm:py-28 lg:py-36">
          <Link href="/#pillars" className="brand-eyebrow text-[0.5625rem] text-champagne hover:text-champagne-200">&larr; All care pathways</Link>
          <div className="mt-10 max-w-2xl">
            <Eyebrow>{pillar.name}</Eyebrow>
            <h1 className="mt-7 font-display text-[2.7rem] leading-[1.04] text-ivory sm:text-6xl lg:text-7xl">Answers for the decade nobody prepared you for.</h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ivory-200/90 sm:text-lg">{pillar.intro}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href={CARE} className="button-sheen brand-eyebrow bg-plum px-8 py-4 text-center text-[0.625rem] text-ivory hover:bg-plum-600">Explore Menopause Care</Link>
              <Link href={`${CARE}#plans`} className="hairline brand-eyebrow border px-8 py-4 text-center text-[0.625rem] text-champagne hover:bg-onyx-800">Compare Plans</Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-ivory">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">What we cover</p>
            <h2 className="mt-6 font-display text-[2.25rem] leading-tight text-onyx sm:text-5xl">It starts earlier than most women are told.</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-onyx-800/80">Perimenopause is a transition, not a single moment, and it is often under-explained. Here is the ground this pillar covers, so you can bring clearer questions to a qualified clinician.</p>
            <ul className="mt-9 grid gap-px bg-onyx/10">
              {pillar.covered.map((item) => (
                <li key={item} className="flex items-start gap-4 bg-ivory py-4">
                  <span aria-hidden="true" className="mt-1 text-champagne-700">&#10003;</span>
                  <span className="text-base leading-relaxed text-onyx-800/85">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-plum/25">
              <Image src="/images/care/care-together.webp" alt="Women of different ages sitting together in conversation." fill sizes="(min-width: 1024px) 42vw, 92vw" className="object-cover" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-onyx-900">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <Eyebrow>Where we focus</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-display text-[2.25rem] leading-tight text-ivory sm:text-5xl">Three things worth understanding first.</h2>
          </Reveal>
          <div className="mt-12 grid gap-px bg-onyx-700/60 sm:grid-cols-3">
            {pillar.focus.map((item, index) => (
              <Reveal key={item.title} delay={index * 50}>
                <article className="h-full bg-onyx-900 p-8 sm:p-10">
                  <p className="brand-eyebrow text-champagne">0{index + 1}</p>
                  <h3 className="mt-5 font-display text-2xl text-ivory">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ivory-200/78">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-ivory-200/50">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">Care plans</p>
            <h2 className="mt-6 font-display text-[2.25rem] leading-tight text-onyx sm:text-5xl">Four ways to start the conversation.</h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-onyx-800/75">Eligibility, prescriptions and treatment decisions rest with an independent licensed clinician. Full inclusions and pricing are on the care page.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, index) => (
              <Reveal key={plan.id} delay={index * 60}>
                <article className="hairline flex h-full flex-col rounded-3xl border bg-ivory p-7">
                  {"badge" in plan && plan.badge ? (
                    <p className="brand-eyebrow text-[0.5rem] text-plum">{plan.badge}</p>
                  ) : null}
                  <h3 className="mt-2 font-display text-2xl leading-tight text-onyx">{plan.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-onyx-800/75">{plan.copy}</p>
                  <Link href={`${CARE}#${plan.id}`} className="brand-eyebrow mt-7 text-[0.5625rem] text-plum">See what is included <span aria-hidden="true">&rarr;</span></Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-champagne/30 bg-plum-900">
        <Container className="py-10 text-center">
          <Link href="/eves-secret" className="font-display text-2xl text-ivory transition-colors hover:text-champagne">
            If it’s desire and comfort, that’s Eve’s Secret <span aria-hidden="true">&rarr;</span>
          </Link>
        </Container>
      </section>

      <section className="bg-plum-900">
        <Container className="flex flex-col items-start justify-between gap-7 py-14 sm:flex-row sm:items-center">
          <div>
            <p className="brand-eyebrow text-champagne">The question we hear most</p>
            <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">&ldquo;{pillar.question}&rdquo;</h2>
          </div>
          <Link href={`${CARE}#get-started`} className="button-sheen brand-eyebrow shrink-0 bg-champagne px-8 py-4 text-[0.625rem] text-onyx hover:bg-champagne-200">Get Started</Link>
        </Container>
      </section>
    </>
  );
}
