import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { CurvatureMark } from "@/components/Wordmark";

export const metadata: Metadata = {
  title: "About",
  description:
    "More than a clinic. A movement for women. Why EV-REVOLUTION exists, what we stand for, and how we hold ourselves to the evidence.",
};

const values = [
  {
    title: "Evidence before enthusiasm",
    body: "We publish what the research supports and name the gaps where it does not. When a field is contested, we say so rather than picking the version that sells.",
  },
  {
    title: "The whole stage, not the symptom",
    body: "Hormones, metabolism, sleep, skin and strength are one system. We refuse to treat a woman's body as six unrelated complaints.",
  },
  {
    title: "Inclusive by design",
    body: "Every shape, every heritage, every decade. The physiology of a 28-year-old and a 68-year-old differ — the respect they are owed does not.",
  },
  {
    title: "Education, not prescription",
    body: "We are a wellness and longevity platform, not your clinician. Our job is to send you into that room informed and taken seriously.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-onyx-700 bg-[linear-gradient(120deg,var(--color-onyx),var(--color-plum-900)_180%)]">
        <Container className="relative py-20 sm:py-28">
          <Eyebrow>About EV-REVOLUTION</Eyebrow>
          <h1 className="mt-8 max-w-3xl font-display text-[2.5rem] leading-[1.08] text-ivory sm:text-6xl">
            More than a clinic.
            <span className="block gold-text">A movement for women.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ivory-200/85 sm:text-lg">
            Women&rsquo;s health has been under-researched, under-funded and
            under-explained for generations. EV-REVOLUTION exists to close that
            gap with the seriousness it has always deserved — and the quality of
            experience women are given everywhere except their own healthcare.
          </p>
        </Container>
      </section>

      <section className="border-b border-onyx-700">
        <Container className="grid gap-16 py-20 sm:py-28 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <CurvatureMark className="h-24 w-auto" />
            <p className="brand-eyebrow mt-8 text-[0.5625rem] text-champagne">
              Evolve &middot; Balance &middot; Thrive
            </p>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-ivory-200/85">
            <p>
              Most women reach their forties having been told a version of the
              same thing for two decades: eat less, move more, and that what
              they are feeling is probably stress. Meanwhile the questions that
              actually matter — what is happening to my hormones, my bone, my
              metabolism, my sleep — go unasked because nobody offered the
              vocabulary.
            </p>
            <p>
              We built EV-REVOLUTION as the resource we could not find. Six
              pillars, covered properly: weight, hormones and menopause, skin
              and beauty, energy and performance, recovery, and longevity. Each
              one written to be understood without a medical degree and honest
              enough to survive one.
            </p>
            <p>
              We are deliberately not in the business of telling you what to
              take. We are in the business of making sure that when you sit down
              with a qualified clinician, you both know what you are talking
              about.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-onyx-900">
        <Container className="py-20 sm:py-28">
          <Eyebrow>What we stand for</Eyebrow>
          <div className="mt-14 grid gap-px bg-onyx-700/60 md:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="bg-onyx-900 p-9">
                <h2 className="font-display text-2xl leading-snug text-ivory">
                  {value.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ivory-200/75">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 text-center sm:py-28">
          <p className="mx-auto max-w-3xl font-display text-3xl leading-tight text-ivory sm:text-[2.75rem]">
            Stronger. Brighter. Balanced. Radiant.
            <span className="block text-mauve">At every age.</span>
          </p>
          <Link
            href="/contact"
            className="brand-eyebrow mt-12 inline-block bg-plum px-9 py-4 text-[0.625rem] text-ivory transition-colors hover:bg-plum-600"
          >
            Get in touch
          </Link>
        </Container>
      </section>
    </>
  );
}
