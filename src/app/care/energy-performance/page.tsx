import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CareLeadForm } from "@/components/CareLeadForm";
import { Container, Eyebrow } from "@/components/Container";
import { PillarIcon, type PillarIconName } from "@/components/PillarIcon";
import { Reveal } from "@/components/Reveal";
import {
  ComparisonTable,
  type ComparisonRow,
} from "@/components/care/ComparisonTable";
import { PlanCards, type Plan } from "@/components/care/PlanCards";
import { Steps } from "@/components/care/Steps";

/* ------------------------------------------------------------------
   /care/energy-performance — the subscription and services page.

   The educational pillar page at /pillars/energy-performance is untouched
   as an educational page; its calls to action now open this one.

   Fatigue is a symptom with many possible causes, so nothing here promises
   a diagnosis, a stimulant or improved performance. A plan buys clinical
   evaluation and coordination; testing and treatment happen only when a
   licensed provider judges them appropriate.
   ------------------------------------------------------------------ */

const canonical = "https://www.evevolutionhealth.com/care/energy-performance";
const title = "Energy and Performance Care Plans | Eve’s Sisters";
const description =
  "Explore personalized energy and performance plans for women experiencing fatigue, brain fog, sleep concerns or reduced stamina.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
};

const trustRow = [
  ["renew", "Licensed clinical care"],
  ["honeycomb", "Appropriate testing"],
  ["lotus", "Personalized recommendations"],
] satisfies [PillarIconName, string][];

const plans: Plan[] = [
  {
    id: "energy-essential",
    title: "Energy Essential",
    price: "$79",
    priceNote: "/month",
    description:
      "A focused starting point for women who want help understanding persistent fatigue or reduced daily energy.",
    includes: [
      "Initial energy and fatigue evaluation",
      "Health and medication review",
      "Sleep and lifestyle assessment",
      "Personalized care recommendations",
      "Secure provider messaging",
      "Routine follow-up",
      "Prescription management when appropriate",
    ],
    cta: "Choose Energy Essential",
    footnote: "Laboratory testing and medication costs are separate.",
  },
  {
    id: "energy-performance-plus",
    title: "Energy and Performance Plus",
    price: "$129",
    priceNote: "/month",
    badge: "Most popular",
    featured: true,
    description:
      "Expanded support for women balancing fatigue, exercise, demanding schedules and changing health needs.",
    includes: [
      "Everything in Energy Essential",
      "Performance and recovery assessment",
      "Body-composition and activity review",
      "More frequent clinical check-ins",
      "Laboratory-order coordination",
      "Laboratory-results review",
      "Progress tracking",
      "Priority nonclinical support",
    ],
    cta: "Choose Performance Plus",
    footnote: "Laboratory and medication costs may be separate.",
  },
  {
    id: "complete-energy-care",
    title: "Complete Energy Care",
    price: "$169",
    priceNote: "/month",
    badge: "Complete care",
    description:
      "Coordinated support for women experiencing multiple energy, performance, sleep or metabolic concerns.",
    includes: [
      "Everything in Performance Plus",
      "Expanded symptom and lifestyle review",
      "Quarterly comprehensive provider review",
      "Coordinated energy and recovery plan",
      "Nutrition and supplement review",
      "Advanced progress tracking",
      "Discounts on eligible laboratory services",
      "Priority ongoing support",
    ],
    cta: "Choose Complete Care",
    footnote:
      "Laboratory and medication costs may be separate. Discounts apply to eligible laboratory services only.",
  },
];

/* Testing and treatment are provider decisions, so they read as conditions
   rather than as features a plan hands over. */
const comparison: ComparisonRow[] = [
  { label: "Monthly price", values: ["$79", "$129", "$169"] },
  { label: "Initial clinical evaluation", values: [true, true, true] },
  { label: "Provider messaging", values: [true, true, true] },
  { label: "Sleep and lifestyle review", values: [true, true, true] },
  {
    label: "Performance assessment",
    values: [false, true, true],
  },
  {
    label: "Laboratory coordination",
    values: [
      false,
      "When clinically appropriate",
      "When clinically appropriate",
    ],
  },
  {
    label: "Laboratory-results review",
    values: [
      false,
      "When clinically appropriate",
      "When clinically appropriate",
    ],
  },
  { label: "Quarterly comprehensive review", values: [false, false, true] },
  { label: "Advanced progress tracking", values: [false, false, true] },
  { label: "Priority support", values: [false, "Nonclinical", "Nonclinical"] },
];

const services: [PillarIconName, string, string][] = [
  ["bolt", "Fatigue Evaluation", "Clinical review"],
  ["leaf", "Nutrient-Status Review", "Iron, B12, vitamin D"],
  ["renew", "Thyroid and Metabolic Review", "When indicated"],
  ["lotus", "Sleep and Recovery", "Assessment and planning"],
  ["honeycomb", "Cognitive Stamina", "Focus and concentration"],
  ["infinity", "Performance Planning", "Training and recovery load"],
];

const providerDirected = [
  "Vitamin B12 evaluation and treatment",
  "Iron-status review",
  "Vitamin D review",
  "Thyroid assessment",
  "Metabolic-health evaluation",
  "Sleep and recovery recommendations",
  "Clinician-approved supplements",
  "Medication review and coordination",
];

const steps: [string, string][] = [
  [
    "Complete Your Assessment",
    "Tell us about your symptoms, sleep, medications, nutrition, exercise, menstrual or menopause changes and daily demands.",
  ],
  [
    "Receive a Clinical Evaluation",
    "A licensed provider reviews your history and determines whether additional evaluation or testing may be appropriate.",
  ],
  [
    "Follow Your Personalized Plan",
    "Receive provider-directed recommendations based on your symptoms, risk factors and available results.",
  ],
  [
    "Monitor Your Progress",
    "Track changes in energy, sleep, concentration and physical performance while completing required follow-ups.",
  ],
];

const faqs: [string, string][] = [
  [
    "What can contribute to persistent fatigue?",
    "A great many things, which is why an evaluation matters. Sleep quality, iron and ferritin, vitamin B12 and vitamin D, thyroid function, glucose regulation, medications, mood, stress, hormonal transitions and training load can all play a part — often more than one at once.",
  ],
  [
    "Will I need laboratory testing?",
    "Not always. Testing is ordered when a provider judges it clinically appropriate for your symptoms and history, not as a matter of course. Your provider will explain what any test is for and what the result changes.",
  ],
  [
    "Are laboratory tests included?",
    "No. Performance Plus and Complete Energy Care include coordinating and reviewing laboratory work, but the tests themselves are billed separately and their cost varies by panel and laboratory. Complete Energy Care includes discounts on eligible laboratory services.",
  ],
  [
    "Does the program prescribe stimulants?",
    "No. This is not a stimulant program and nothing here is intended to enhance performance in a healthy person. A provider treats identified clinical causes of fatigue where treatment is appropriate.",
  ],
  [
    "Can this program help with menopause-related fatigue?",
    "It can be part of the picture. Fatigue around perimenopause and menopause often has several contributors at once, and a provider will consider hormonal change alongside sleep, iron, thyroid and everything else. If hormone care turns out to be the right route, that is handled through the menopause and hormone program.",
  ],
  [
    "Can I combine Energy and Performance care with another Eve’s Sisters program?",
    "Yes, and it is worth telling your provider if you are enrolled elsewhere so your care is coordinated rather than duplicated. Each program is billed separately.",
  ],
  [
    "Are supplements or medications included?",
    "No. Not every patient is prescribed anything, and where a supplement or medication is recommended its cost is separate from the plan. What the plan covers is the clinical evaluation, the recommendations and the follow-up.",
  ],
  [
    "When should fatigue receive urgent in-person evaluation?",
    "Fatigue with chest pain, severe or sudden shortness of breath, fainting, new confusion, new one-sided weakness, severe palpitations, signs of significant bleeding or thoughts of self-harm needs urgent in-person care, not telehealth. Call 911 or go to an emergency department for severe or life-threatening symptoms.",
  ],
];

export default function EnergyPerformanceCarePage() {
  return (
    <>
      {/* ---------------------------------------------------------------
          Hero
          --------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-onyx-700 bg-[linear-gradient(115deg,var(--color-onyx)_0%,var(--color-onyx-900)_46%,var(--color-plum-900)_150%)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/4 hidden h-[34rem] w-[34rem] rounded-full bg-mauve/10 blur-[120px] lg:block"
        />

        <Container className="relative py-14 sm:py-16 lg:py-20">
          <nav aria-label="Breadcrumb">
            <ol className="brand-eyebrow flex flex-wrap items-center gap-2 text-[0.5625rem] text-taupe">
              <li>
                <Link
                  href="/care"
                  className="transition-colors hover:text-champagne"
                >
                  Care
                </Link>
              </li>
              <li aria-hidden="true" className="text-taupe-700">
                /
              </li>
              <li>
                <span aria-current="page" className="text-ivory-200">
                  Energy and Performance
                </span>
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:mt-12 lg:grid-cols-[1.08fr_minmax(0,0.92fr)] lg:gap-16">
            <div>
              <div className="brand-enter">
                <Eyebrow>Energy and Performance</Eyebrow>
              </div>

              <h1
                className="brand-enter mt-7 font-display text-[2.4rem] leading-[1.06] text-ivory sm:text-[3rem] lg:text-[3.4rem]"
                style={{ "--enter-delay": "90ms" } as React.CSSProperties}
              >
                Build Energy
                <span className="mt-2 block italic text-mauve">That Lasts</span>
              </h1>

              <span
                aria-hidden="true"
                className="brand-draw mt-9 block h-px w-28 bg-champagne/70"
                style={{ "--enter-delay": "200ms" } as React.CSSProperties}
              />

              <p
                className="brand-enter mt-8 max-w-xl text-base leading-relaxed text-ivory-200/85 sm:text-lg"
                style={{ "--enter-delay": "180ms" } as React.CSSProperties}
              >
                Personalized clinical support for women experiencing fatigue,
                reduced stamina, brain fog or changes in physical performance.
              </p>

              <div
                className="brand-enter mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
                style={{ "--enter-delay": "270ms" } as React.CSSProperties}
              >
                <a
                  href="#get-started"
                  className="button-sheen brand-eyebrow group bg-plum px-8 py-4 text-center text-[0.625rem] text-ivory transition-colors hover:bg-plum-600"
                >
                  Start Your Assessment
                  <span
                    aria-hidden="true"
                    className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
                <a
                  href="#plans"
                  className="hairline brand-eyebrow border px-8 py-4 text-center text-[0.625rem] text-champagne transition-colors hover:bg-onyx-800"
                >
                  Compare Plans
                </a>
              </div>

              <ul
                className="brand-enter mt-12 grid gap-5 sm:grid-cols-3"
                style={{ "--enter-delay": "360ms" } as React.CSSProperties}
              >
                {trustRow.map(([icon, label]) => (
                  <li
                    key={label}
                    className="hairline flex items-center gap-3 border-t pt-4"
                  >
                    <PillarIcon
                      name={icon}
                      className="h-5 w-5 shrink-0 text-champagne"
                    />
                    <span className="brand-eyebrow text-[0.5625rem] leading-relaxed text-ivory-200">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-onyx-700 sm:aspect-[5/6]">
                <Image
                  src="/images/care/care-energy-performance.webp"
                  alt="A strong, composed woman in warm light, draped in deep plum."
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 92vw"
                  className="brand-settle object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(200deg,transparent_40%,color-mix(in_oklab,var(--color-onyx)_70%,transparent)_100%)]"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Plans + comparison
          --------------------------------------------------------------- */}
      <section
        id="plans"
        aria-labelledby="plans-heading"
        className="scroll-mt-24 border-b border-onyx-700 bg-ivory"
      >
        <Container className="py-20 sm:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">Subscriptions</p>
            <h2
              id="plans-heading"
              className="mt-6 max-w-2xl font-display text-[2.1rem] leading-[1.1] text-onyx sm:text-[2.75rem]"
            >
              Choose Your Energy and Performance Plan
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-onyx-800/75">
              Start with the level of clinical support that fits your symptoms,
              goals and need for ongoing monitoring.
            </p>
          </Reveal>

          <PlanCards plans={plans} />

          <Reveal>
            <ComparisonTable
              columns={plans.map((plan) =>
                plan.id === "energy-performance-plus"
                  ? "Performance Plus"
                  : plan.title,
              )}
              rows={comparison}
              caption="Energy and performance plans compared across price, laboratory coordination and support"
              heading="Compare the plans"
              intro="A plan is clinical care and coordination. Laboratory tests, supplements and medication are billed separately, and anything a provider decides is listed as “when clinically appropriate” rather than as an included feature."
            />
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Potential areas of support
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="services-heading"
        className="border-b border-onyx-700 bg-onyx"
      >
        <Container className="py-20 sm:py-24">
          <Reveal>
            <Eyebrow>What may be available</Eyebrow>
            <h2
              id="services-heading"
              className="mt-6 font-display text-[2.1rem] leading-[1.1] text-ivory sm:text-[2.75rem]"
            >
              Potential Areas of Support
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(([icon, name, kind], index) => (
              <li key={name}>
                <Reveal delay={index * 60}>
                  <div className="flex h-full items-center gap-4 rounded-2xl border border-onyx-700 bg-onyx-900 px-6 py-5 transition-colors hover:border-champagne/40">
                    <PillarIcon
                      name={icon}
                      className="h-6 w-6 shrink-0 text-champagne"
                    />
                    <span>
                      <span className="block font-display text-xl leading-tight text-ivory">
                        {name}
                      </span>
                      <span className="brand-eyebrow mt-1.5 block text-[0.5rem] text-taupe">
                        {kind}
                      </span>
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal>
            <p className="hairline mt-10 max-w-3xl border-t pt-7 text-sm leading-relaxed text-ivory-200/70">
              Services and testing are provided only when clinically
              appropriate. Treatment recommendations depend on the patient&rsquo;s
              medical history, symptoms, laboratory results and independent
              provider judgment.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-12 rounded-3xl border border-onyx-700 bg-onyx-900/60 p-8 sm:p-10">
              <p className="brand-eyebrow text-[0.5rem] text-champagne">
                Provider-directed services may include
              </p>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {providerDirected.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne"
                    />
                    <span className="text-sm leading-relaxed text-ivory-200/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="hairline mt-8 border-t pt-6 text-xs leading-relaxed text-ivory-200/65">
                Not every patient receives medication or supplements. Nothing
                here is a stimulant program, and no plan promises improved
                physical or cognitive performance.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          How it works
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="how-heading"
        className="border-b border-onyx-700 bg-ivory"
      >
        <Container className="py-20 sm:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">Your pathway</p>
            <h2
              id="how-heading"
              className="mt-6 font-display text-[2.1rem] leading-[1.1] text-onyx sm:text-[2.75rem]"
            >
              How Energy Care Works
            </h2>
          </Reveal>

          <Steps steps={steps} />
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Get started — the assessment lead form
          --------------------------------------------------------------- */}
      <section
        id="get-started"
        aria-labelledby="get-started-heading"
        className="scroll-mt-24 border-b border-onyx-700 bg-[linear-gradient(160deg,var(--color-onyx)_0%,var(--color-onyx-900)_55%,var(--color-plum-900)_140%)]"
      >
        <Container className="grid gap-14 py-20 sm:py-24 lg:grid-cols-[0.85fr_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <Eyebrow>Get started</Eyebrow>
            <h2
              id="get-started-heading"
              className="mt-6 font-display text-[2.1rem] leading-[1.1] text-ivory sm:text-[2.6rem]"
            >
              Start Your Energy Assessment
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-ivory-200/85">
              Tell us what has changed and what you want to improve. A licensed
              provider will determine which evaluations and services may be
              appropriate.
            </p>
            <p className="hairline mt-9 border-t pt-6 text-xs leading-relaxed text-ivory-200/65">
              This form asks for your contact details, your main concern and
              the plan you are considering — nothing more. Your symptoms,
              medications, sleep and health history are asked inside the secure
              clinical assessment, not here.
            </p>
          </div>

          <CareLeadForm
            program="energy-performance"
            labelledBy="get-started-heading"
            privacyNote="Contact details and your area of interest only. Health questions are asked inside the secure clinical assessment."
          />
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          FAQ
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="faq-heading"
        className="border-b border-onyx-700 bg-ivory"
      >
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.8fr_minmax(0,1.2fr)] lg:gap-16">
          <Reveal>
            <p className="brand-eyebrow text-plum">Your questions</p>
            <h2
              id="faq-heading"
              className="mt-6 font-display text-[2.1rem] leading-[1.1] text-onyx sm:text-[2.6rem]"
            >
              Answered Plainly
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-onyx-800/75">
              Treatment decisions belong to the licensed provider who evaluates
              you. These answers describe how the care works, not what you will
              be prescribed.
            </p>
          </Reveal>

          <Reveal delay={90}>
            <div className="grid gap-3">
              {faqs.map(([question, answer]) => (
                <details
                  key={question}
                  className="group rounded-2xl border border-onyx/12 bg-white/70 px-6 open:bg-white/90"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg leading-snug text-onyx [&::-webkit-details-marker]:hidden">
                    {question}
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-xl text-plum transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-6 text-sm leading-relaxed text-onyx-800/80">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Keep reading
          --------------------------------------------------------------- */}
      <section aria-labelledby="continue-heading" className="bg-onyx-900">
        <Container className="py-16 sm:py-20">
          <h2 id="continue-heading" className="brand-eyebrow text-champagne">
            Continue
          </h2>
          <ul className="mt-8 grid gap-px bg-onyx-700/60 sm:grid-cols-3">
            {[
              [
                "/pillars/energy-performance",
                "Energy & Performance",
                "The pillar behind the plans — what drains capacity, and what to check.",
              ],
              [
                "/care/hormones-menopause",
                "Hormones & Menopause",
                "When the fatigue turns out to be a hormonal transition.",
              ],
              ["/care", "All Care", "Every pathway Eve’s Sisters supports."],
            ].map(([href, cardTitle, body]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex h-full flex-col gap-3 bg-onyx p-7 transition-colors hover:bg-onyx-800"
                >
                  <span className="font-display text-xl leading-snug text-ivory">
                    {cardTitle}
                  </span>
                  <span className="text-sm leading-relaxed text-ivory-200/75">
                    {body}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
