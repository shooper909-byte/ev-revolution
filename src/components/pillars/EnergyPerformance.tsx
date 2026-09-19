import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { EnergyLine } from "@/components/EnergyLine";
import { MotionScope } from "@/components/MotionScope";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PillarIcon, type PillarIconName } from "@/components/PillarIcon";
import { Reveal } from "@/components/Reveal";
import { pillars, type Pillar } from "@/lib/pillars";
import { posts } from "@/lib/posts";

/* ------------------------------------------------------------------
   /pillars/energy-performance — the educational pillar page.

   This page teaches and points; it does not sell. The plans live at
   /care/energy-performance, and this page links to them prominently
   without turning into a sales page.

   The core message is unchanged: fatigue is a signal, not a personality
   trait. Everything here is framed as a possible contributor rather than a
   diagnosis, because a symptom with this many causes cannot be resolved by
   a web page.

   Motion: the hero's travelling line and drifting glow only run while the
   hero is on screen (MotionScope), the cards and timeline use the existing
   scroll-reveal system, and every one of them stops under reduced motion.
   Nothing animates layout, so there is no shift.
   ------------------------------------------------------------------ */

const contributors: [PillarIconName, string, string][] = [
  [
    "leaf",
    "Iron and Nutrient Status",
    "Low iron stores, vitamin B12, vitamin D and other nutritional factors can contribute to fatigue, weakness or reduced exercise tolerance.",
  ],
  [
    "renew",
    "Thyroid and Metabolic Health",
    "Thyroid function, glucose regulation and other metabolic factors may affect energy, concentration and physical performance.",
  ],
  [
    "lotus",
    "Sleep and Recovery",
    "Sleep duration, sleep quality, breathing disruptions, stress and inadequate recovery can affect how you feel throughout the day.",
  ],
  [
    "infinity",
    "Hormonal Changes",
    "Perimenopause, menopause and other hormonal transitions may influence sleep, mood, body composition and perceived energy.",
  ],
  [
    "honeycomb",
    "Medications and Health Conditions",
    "Certain medications and underlying medical conditions can contribute to persistent fatigue and should be considered during evaluation.",
  ],
  [
    "bolt",
    "Training and Daily Demands",
    "Exercise load, work demands, caregiving, hydration, fueling and recovery habits can all affect performance and resilience.",
  ],
];

const focus: [string, string][] = [
  [
    "Rule Things Out First",
    "A clinician can review common and testable contributors to persistent fatigue and determine whether laboratory testing or additional evaluation may be appropriate.",
  ],
  [
    "Support Your Physiology",
    "Build an achievable plan around sleep, nourishment, hydration, recovery and movement instead of forcing your body through exhaustion.",
  ],
  [
    "Strengthen Cognitive Stamina",
    "Explore how sleep, stress, nutrient status, mood and changing hormones may affect focus, motivation and mental endurance.",
  ],
];

const evaluation: [string, string][] = [
  [
    "Health and Symptom Review",
    "Medical history, medications, sleep, menstrual or menopause changes, nutrition, stress, exercise and the timing of symptoms.",
  ],
  [
    "Appropriate Laboratory Testing",
    "When clinically indicated, testing may include thyroid markers, iron status, vitamin levels, metabolic markers or other provider-selected tests.",
  ],
  [
    "Personalized Recommendations",
    "Your provider may recommend changes involving sleep, nourishment, recovery, supplements, medication management or additional medical evaluation.",
  ],
  [
    "Ongoing Monitoring",
    "Track symptoms, complete required follow-ups and communicate with the care team when something changes.",
  ],
];

const addressed = [
  "Persistent fatigue",
  "Reduced exercise tolerance",
  "Brain fog and concentration",
  "Sleep and recovery",
  "Nutrient-status concerns",
  "Thyroid and metabolic review",
  "Stress and overload",
  "Performance planning",
];

const urgent = [
  "Chest pain",
  "Severe or sudden shortness of breath",
  "Fainting",
  "New confusion",
  "New weakness on one side",
  "Severe heart palpitations",
  "Signs of significant bleeding",
  "Thoughts of self-harm",
];

export function EnergyPerformance({ pillar }: { pillar: Pillar }) {
  const related = posts.filter((post) => post.pillar === pillar.name);
  const others = pillars.filter((item) => item.slug !== pillar.slug);

  return (
    <>
      {/* ---------------------------------------------------------------
          Hero
          --------------------------------------------------------------- */}
      <MotionScope>
        <section className="relative overflow-hidden border-b border-onyx-700 bg-[linear-gradient(120deg,var(--color-onyx)_0%,var(--color-onyx-900)_44%,var(--color-plum-900)_145%)]">
          {/* Two slow-drifting glows. Purely decorative, never in flow. */}
          <div
            aria-hidden="true"
            className="aurora pointer-events-none absolute -right-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-plum/25 blur-[130px]"
          />
          <div
            aria-hidden="true"
            className="aurora pointer-events-none absolute -left-40 top-1/2 hidden h-[30rem] w-[30rem] rounded-full bg-mauve/15 blur-[120px] lg:block"
            style={{ animationDelay: "-9s" }}
          />

          <Container className="relative py-20 sm:py-24">
            <Link
              href="/#pillars"
              className="brand-eyebrow text-[0.5625rem] text-taupe transition-colors hover:text-champagne"
            >
              &larr; All pillars
            </Link>

            <div className="mt-10 flex items-center gap-4">
              <PillarIcon
                name={pillar.icon}
                className={`h-7 w-7 ${pillar.accent.text}`}
              />
              <Eyebrow>Energy and Performance</Eyebrow>
            </div>

            <h1 className="brand-enter mt-8 max-w-3xl font-display text-[2.6rem] leading-[1.05] text-ivory sm:text-[3.4rem] lg:text-[4rem]">
              Capacity You Can
              <span className="mt-2 block italic text-mauve">Count On</span>
            </h1>

            {/* The travelling line. Fixed height, so it cannot shift copy. */}
            <div aria-hidden="true" className="mt-8 h-12 max-w-xl">
              <EnergyLine className="h-full w-full" />
            </div>

            <p
              className="brand-enter max-w-2xl text-base leading-relaxed text-ivory-200/85 sm:text-lg"
              style={{ "--enter-delay": "160ms" } as React.CSSProperties}
            >
              Persistent fatigue can be connected to sleep, nutrient status,
              thyroid function, metabolic health, medications, stress, changing
              hormones or training demands. Eve&rsquo;s Sisters helps women
              explore those possibilities through personalized clinical care
              and appropriate testing.
            </p>

            <div
              className="brand-enter mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              style={{ "--enter-delay": "250ms" } as React.CSSProperties}
            >
              <Link
                href="/care/energy-performance#plans"
                className="button-sheen brand-eyebrow group bg-plum px-8 py-4 text-center text-[0.625rem] text-ivory transition-colors hover:bg-plum-600"
              >
                Explore Energy Plans
                <span
                  aria-hidden="true"
                  className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
              <Link
                href="/care/energy-performance#get-started"
                className="hairline brand-eyebrow border px-8 py-4 text-center text-[0.625rem] text-champagne transition-colors hover:bg-onyx-800"
              >
                Start Your Assessment
              </Link>
            </div>
          </Container>
        </section>
      </MotionScope>

      {/* ---------------------------------------------------------------
          Fatigue has many possible contributors
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="contributors-heading"
        className="border-b border-onyx-700 bg-onyx"
      >
        <Container className="py-20 sm:py-24">
          <Reveal>
            <Eyebrow>A closer look</Eyebrow>
            <h2
              id="contributors-heading"
              className="mt-6 max-w-2xl font-display text-[2.1rem] leading-[1.1] text-ivory sm:text-[2.75rem]"
            >
              Fatigue Is a Symptom, Not a Diagnosis
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory-200/80">
              Feeling exhausted does not automatically identify the cause. A
              thoughtful evaluation considers the full pattern of your
              symptoms, health history, medications, sleep, nutrition and daily
              demands.
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contributors.map(([icon, title, body], index) => (
              <li key={title}>
                <Reveal delay={index * 70} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-onyx-700 bg-onyx-900 p-7 transition-colors hover:border-champagne/40">
                    <PillarIcon
                      name={icon}
                      className="h-6 w-6 shrink-0 text-champagne"
                    />
                    <h3 className="mt-5 font-display text-xl leading-snug text-ivory">
                      {title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-ivory-200/75">
                      {body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Three areas of support
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="focus-heading"
        className="border-b border-onyx-700 bg-ivory"
      >
        <Container className="py-20 sm:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">Our approach</p>
            <h2
              id="focus-heading"
              className="mt-6 font-display text-[2.1rem] leading-[1.1] text-onyx sm:text-[2.75rem]"
            >
              Where We Focus
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {focus.map(([title, body], index) => (
              <Reveal key={title} delay={index * 110}>
                {/* The rule draws itself left to right as the column lands. */}
                <span
                  aria-hidden="true"
                  className="gold-rule block h-px w-full bg-champagne"
                />
                <h3 className="mt-7 font-display text-2xl leading-snug text-onyx">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-onyx-800/75">
                  {body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          What an evaluation may include
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="evaluation-heading"
        className="border-b border-onyx-700 bg-onyx"
      >
        <Container className="py-20 sm:py-24">
          <Reveal>
            <Eyebrow>What to expect</Eyebrow>
            <h2
              id="evaluation-heading"
              className="mt-6 font-display text-[2.1rem] leading-[1.1] text-ivory sm:text-[2.75rem]"
            >
              A More Complete Look at Your Energy
            </h2>
          </Reveal>

          <ol className="mt-14 grid gap-px bg-onyx-700/60">
            {evaluation.map(([title, body], index) => (
              <li key={title}>
                <Reveal delay={index * 90}>
                  <div className="grid gap-5 bg-onyx px-1 py-8 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-8 sm:px-2">
                    <span className="brand-eyebrow font-display text-3xl not-italic text-champagne">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl leading-snug text-ivory sm:text-2xl">
                        {title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory-200/75">
                        {body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Potential areas of care
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="addressed-heading"
        className="border-b border-onyx-700 bg-ivory"
      >
        <Container className="py-20 sm:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">Areas of care</p>
            <h2
              id="addressed-heading"
              className="mt-6 max-w-2xl font-display text-[2.1rem] leading-[1.1] text-onyx sm:text-[2.75rem]"
            >
              What Energy and Performance Care May Address
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {addressed.map((item, index) => (
              <li key={item}>
                <Reveal delay={index * 50}>
                  <div className="h-full rounded-2xl border border-onyx/12 bg-white/70 px-6 py-5">
                    <span className="text-sm leading-relaxed text-onyx-800/85">
                      {item}
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal>
            <p className="mt-9 max-w-3xl border-t border-onyx/12 pt-7 text-sm leading-relaxed text-onyx-800/70">
              These are areas a clinician can help you explore. Eve&rsquo;s
              Sisters does not diagnose or cure every cause of fatigue, and
              some causes need evaluation beyond what remote care can offer.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          When to seek immediate care
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="urgent-heading"
        className="border-b border-onyx-700 bg-onyx"
      >
        <Container className="py-20 sm:py-24">
          <Reveal>
            <div className="rounded-3xl border border-champagne/30 bg-onyx-900/70 p-8 sm:p-11">
              <p className="brand-eyebrow text-[0.5rem] text-champagne">
                Safety first
              </p>
              <h2
                id="urgent-heading"
                className="mt-6 font-display text-[1.9rem] leading-tight text-ivory sm:text-[2.3rem]"
              >
                Some Symptoms Should Not Wait
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory-200/85">
                Fatigue accompanied by certain symptoms may require urgent
                in-person evaluation rather than routine telehealth care.
              </p>

              <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {urgent.map((symptom) => (
                  <li key={symptom} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne"
                    />
                    <span className="text-sm leading-relaxed text-ivory-200/85">
                      {symptom}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="hairline mt-9 border-t pt-7 text-sm leading-relaxed text-ivory">
                Call 911 or seek emergency care for severe or life-threatening
                symptoms.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Packages CTA
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="packages-heading"
        className="border-b border-onyx-700 bg-[linear-gradient(140deg,var(--color-plum-900)_0%,var(--color-onyx-900)_65%,var(--color-onyx)_100%)]"
      >
        <Container className="py-20 sm:py-24">
          <Reveal>
            <Eyebrow>Energy care options</Eyebrow>
            <h2
              id="packages-heading"
              className="mt-6 max-w-3xl font-display text-[2.1rem] leading-[1.1] text-ivory sm:text-[2.75rem]"
            >
              Ready to Understand What Is Draining Your Energy?
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory-200/85">
              Explore clinical support designed to help identify possible
              contributors, guide appropriate testing and build a more
              sustainable plan.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/care/energy-performance#plans"
                className="button-sheen brand-eyebrow group bg-champagne px-8 py-4 text-center text-[0.625rem] text-onyx transition-colors hover:bg-champagne-200"
              >
                Compare Energy Plans
                <span
                  aria-hidden="true"
                  className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
              <Link
                href="/care/energy-performance#get-started"
                className="hairline brand-eyebrow border px-8 py-4 text-center text-[0.625rem] text-champagne transition-colors hover:bg-onyx-800"
              >
                Start Your Assessment
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Journal
          --------------------------------------------------------------- */}
      {related.length > 0 && (
        <section
          aria-labelledby="journal-heading"
          className="border-b border-onyx-700 bg-onyx-900"
        >
          <Container className="py-20 sm:py-24">
            <h2 id="journal-heading" className="brand-eyebrow text-champagne">
              From the Journal
            </h2>

            <ul className="mt-10 grid gap-px bg-onyx-700/60 md:grid-cols-2">
              {related.map((post, index) => (
                <li key={post.slug}>
                  <Reveal delay={index * 80} className="h-full">
                    {/* The whole card is the link, and the image lifts
                        slightly on hover or keyboard focus — never on its
                        own, and not at all under reduced motion. */}
                    <Link
                      href="/journal"
                      className="media-lift group flex h-full flex-col bg-onyx transition-colors hover:bg-onyx-800"
                    >
                      <span className="relative block aspect-[16/9] overflow-hidden">
                        <Image
                          src="/images/care/care-energy-performance.webp"
                          alt=""
                          fill
                          loading="lazy"
                          sizes="(min-width: 768px) 46vw, 92vw"
                          className="object-cover"
                        />
                      </span>
                      <span className="flex flex-1 flex-col p-8">
                        <span className="font-display text-2xl leading-snug text-ivory">
                          {post.title}
                        </span>
                        <span className="mt-4 text-sm leading-relaxed text-ivory-200/75">
                          {post.excerpt}
                        </span>
                        <span className="mt-6 text-xs text-taupe-700">
                          {post.readingTime}
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* ---------------------------------------------------------------
          Other pillars + newsletter, as on every pillar page
          --------------------------------------------------------------- */}
      <section className="border-b border-onyx-700">
        <Container className="py-20 sm:py-24">
          <Eyebrow>Continue</Eyebrow>
          <ul className="mt-10 grid gap-px bg-onyx-700/60 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/pillars/${item.slug}`}
                  className="flex h-full flex-col gap-4 bg-onyx p-7 transition-colors hover:bg-onyx-800"
                >
                  <PillarIcon
                    name={item.icon}
                    className={`h-5 w-5 ${item.accent.text}`}
                  />
                  <span className="font-display text-lg leading-snug text-ivory">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-onyx-900">
        <Container className="py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <h2 className="font-display text-3xl leading-tight text-ivory sm:text-4xl">
              Stay with us through every stage.
            </h2>
            <NewsletterSignup />
          </div>
        </Container>
      </section>
    </>
  );
}
