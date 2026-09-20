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
   /care/hormones-menopause — the subscription and treatment-options page.

   The educational pillar page at /pillars/hormones-menopause is untouched;
   its calls to action now open this page instead of /contact.

   Nothing here promises hormone therapy, testosterone or any controlled
   medication. A plan buys clinical support; a licensed provider decides what
   is appropriate, and conditional care is written as "when clinically
   appropriate" rather than implied by a tick in a table.
   ------------------------------------------------------------------ */

const canonical = "https://www.evevolutionhealth.com/care/hormones-menopause";

export const metadata: Metadata = {
  title: { absolute: "Menopause and Hormone Care Plans | Eve’s Sisters" },
  description:
    "Explore personalized perimenopause, menopause and hormone-care plans from Eve’s Sisters, including symptom support, prescription management and ongoing clinical care.",
  alternates: { canonical },
  openGraph: {
    title: "Menopause and Hormone Care Plans | Eve’s Sisters",
    description:
      "Explore personalized perimenopause, menopause and hormone-care plans from Eve’s Sisters, including symptom support, prescription management and ongoing clinical care.",
    url: canonical,
    type: "website",
  },
};

const trustRow = [
  ["renew", "Licensed clinical care"],
  ["lotus", "Personalized treatment options"],
  ["infinity", "Ongoing symptom support"],
] satisfies [PillarIconName, string][];

const symptoms = [
  "Hot flashes and night sweats",
  "Sleep changes",
  "Mood changes",
  "Vaginal dryness and discomfort",
  "Changes in libido",
  "Brain fog and concentration",
  "Weight and metabolic changes",
  "Hair and skin changes",
];

const plans: Plan[] = [
  {
    id: "menopause-essential",
    title: "Menopause Essential",
    price: "$99",
    priceNote: "/month",
    description:
      "Personalized menopause care with access to eligible lower-cost hormone therapies.",
    includes: [
      "Initial menopause evaluation",
      "Medical and symptom-history review",
      "Personalized treatment plan",
      "Routine prescription management",
      "Secure provider messaging",
      "Scheduled clinical check-ins",
      "One eligible oral or vaginal medication",
    ],
    treatments: {
      label: "Potential treatments",
      body: "Estradiol tablets, vaginal estradiol products and micronized progesterone when clinically appropriate.",
    },
    cta: "Choose Essential Care",
    footnote:
      "Medication selection depends on clinical eligibility. Certain medications, laboratory tests and shipping costs may be billed separately.",
  },
  {
    id: "menopause-plus",
    title: "Menopause Plus",
    price: "$149",
    priceNote: "/month",
    badge: "Most popular",
    featured: true,
    description:
      "Enhanced hormone care for women who need more monitoring, medication flexibility and ongoing support.",
    includes: [
      "Everything in Menopause Essential",
      "Eligible estradiol patches when prescribed",
      "More frequent clinical check-ins",
      "Medication-adjustment reviews",
      "Structured symptom tracking",
      "Priority nonclinical support",
      "Discount on eligible laboratory services",
    ],
    cta: "Choose Menopause Plus",
    footnote:
      "Medication, laboratory and shipping costs may vary based on the prescribed treatment.",
  },
  {
    id: "sexual-wellness",
    title: "Sexual Wellness",
    pricePrefix: "From",
    price: "$79",
    priceNote: "/month",
    description:
      "Discreet clinical support for eligible women experiencing changes in libido, comfort or sexual wellness.",
    includes: [
      "Sexual-wellness evaluation",
      "Medication and health-history review",
      "Personalized treatment recommendations",
      "Secure provider messaging",
      "Routine follow-up",
      "Prescription management when appropriate",
    ],
    treatments: {
      label: "Potential treatments",
      body: "Local vaginal therapy, selected compounded sexual-wellness products and low-dose testosterone only when supported by the clinical partner, permitted by applicable law and prescribed by an appropriately licensed provider.",
    },
    cta: "Explore Sexual Wellness",
    footnote:
      "No medication is guaranteed. Certain treatments require additional screening and are not available in every state.",
  },
  {
    id: "complete-menopause-sexual-wellness",
    title: "Complete Menopause + Sexual Wellness",
    price: "$189",
    priceNote: "/month",
    badge: "Best value",
    description:
      "Menopause care and sexual-wellness support under one plan, coordinated by the same care team.",
    includes: [
      "Everything in Menopause Plus",
      "Sexual-wellness evaluation",
      "Coordinated medication management",
      "Symptom and libido tracking",
      "Priority ongoing support",
    ],
    cta: "Choose Complete Care",
    footnote:
      "Medication, laboratory and shipping costs may vary based on the prescribed treatment.",
  },
];

/* "When clinically appropriate" rather than a tick anywhere a provider, not a
   plan, decides — which is everywhere treatment is involved. */
const comparison: ComparisonRow[] = [
  {
    label: "Monthly price",
    values: ["$99", "$149", "From $79", "$189"],
  },
  { label: "Initial clinical evaluation", values: [true, true, true, true] },
  { label: "Provider messaging", values: [true, true, true, true] },
  {
    label: "Prescription management",
    values: [
      "When clinically appropriate",
      "When clinically appropriate",
      "When clinically appropriate",
      "When clinically appropriate",
    ],
  },
  {
    label: "Eligible oral or vaginal medication",
    values: [
      "One, when clinically appropriate",
      "When clinically appropriate",
      "When clinically appropriate",
      "When clinically appropriate",
    ],
  },
  {
    label: "Estradiol patch eligibility",
    values: [false, "When clinically appropriate", false, "When clinically appropriate"],
  },
  { label: "Symptom tracking", values: [false, true, false, true] },
  { label: "Sexual-wellness support", values: [false, false, true, true] },
  { label: "Laboratory discounts", values: [false, true, false, true] },
  {
    label: "Priority support",
    values: [false, "Nonclinical", false, "Nonclinical"],
  },
];

const treatments: [PillarIconName, string, string][] = [
  ["renew", "Estradiol Patch", "Transdermal"],
  ["honeycomb", "Estradiol Tablet", "Oral"],
  ["lotus", "Vaginal Estradiol", "Local therapy"],
  ["leaf", "Micronized Progesterone", "Oral"],
  ["infinity", "Sexual Wellness Cream", "Topical"],
  ["bolt", "Low-Dose Testosterone", "Where permitted"],
];

const steps: [string, string][] = [
  [
    "Tell Us What Has Changed",
    "Complete an assessment covering your symptoms, health history, medications, menstrual history and treatment goals.",
  ],
  [
    "Receive a Clinical Evaluation",
    "A licensed provider reviews your information, discusses appropriate screening and determines whether treatment may be suitable.",
  ],
  [
    "Begin Your Personalized Plan",
    "If treatment is prescribed, follow the provider's medication, monitoring and follow-up instructions.",
  ],
  [
    "Continue With Ongoing Support",
    "Track symptoms, complete required follow-ups and communicate with your care team when questions or changes arise.",
  ],
];

const faqs: [string, string][] = [
  [
    "What is the difference between perimenopause and menopause?",
    "Perimenopause is the transition leading up to your final period, when cycles and hormone levels often become irregular and symptoms can begin. Menopause is dated from twelve consecutive months without a period. Care can be appropriate in either stage — your provider will consider where you are, alongside your history and symptoms.",
  ],
  [
    "Is hormone therapy appropriate for everyone?",
    "No. Hormone therapy suits some women and not others, and the decision depends on your health history, risk factors, symptoms and preferences. A licensed provider makes that determination with you, and may recommend non-hormonal options instead.",
  ],
  [
    "Will I need laboratory testing?",
    "Not always. Testing is not required for every patient or every treatment. When it is clinically appropriate, your provider will explain what is needed and how the results affect your care.",
  ],
  [
    "Can I receive treatment if I still have regular periods?",
    "Possibly. Regular periods do not rule out perimenopausal symptoms or treatment, but they do change what a provider considers appropriate. Your evaluation covers your menstrual history for exactly that reason.",
  ],
  [
    "Are medications included in the membership?",
    "A membership covers clinical care: evaluation, prescription management where appropriate, messaging and follow-up. Menopause Essential includes one eligible oral or vaginal medication when clinically appropriate. Other medications, laboratory tests and shipping may be billed separately, and costs vary by treatment.",
  ],
  [
    "Can I use the program if I already take hormone medication?",
    "Yes. Tell your provider what you take and who prescribes it. They will review your current treatment and decide whether continuing, adjusting or changing it is appropriate.",
  ],
  [
    "Is testosterone automatically included?",
    "No. Low-dose testosterone is never automatic. It is prescribed only where it is supported by the clinical partner, permitted by applicable law and considered appropriate by a licensed provider, and it may require additional screening or monitoring.",
  ],
];

export default function HormonesMenopauseCarePage() {
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
                  Hormones and Menopause
                </span>
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:mt-12 lg:grid-cols-[1.08fr_minmax(0,0.92fr)] lg:gap-16">
            <div>
              <div className="brand-enter">
                <Eyebrow>Hormones and Menopause</Eyebrow>
              </div>

              <h1
                className="brand-enter mt-7 font-display text-[2.4rem] leading-[1.06] text-ivory sm:text-[3rem] lg:text-[3.4rem]"
                style={{ "--enter-delay": "90ms" } as React.CSSProperties}
              >
                Care That Evolves
                <span className="mt-2 block italic text-mauve">With You</span>
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
                Personalized support for perimenopause, menopause and changing
                hormone-related symptoms. Connect with a licensed clinician to
                explore treatment options based on your health history,
                symptoms and individual needs.
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
                  src="/images/care/care-menopause-hormones.webp"
                  alt="A poised woman in midlife, silver-streaked hair, looking calmly ahead in warm light."
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
          Symptoms
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="symptoms-heading"
        className="border-b border-onyx-700 bg-ivory"
      >
        <Container className="py-20 sm:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">What you may notice</p>
            <h2
              id="symptoms-heading"
              className="mt-6 max-w-2xl font-display text-[2.1rem] leading-[1.1] text-onyx sm:text-[2.75rem]"
            >
              You Deserve to Feel Heard
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-onyx-800/75">
              Hormonal changes can affect far more than your menstrual cycle.
              Your clinician will consider your symptoms, health history, risk
              factors and treatment preferences before recommending care.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {symptoms.map((symptom, index) => (
              <li key={symptom}>
                <Reveal delay={index * 50}>
                  <div className="h-full rounded-2xl border border-onyx/12 bg-white/70 px-6 py-5">
                    <span className="text-sm leading-relaxed text-onyx-800/85">
                      {symptom}
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal>
            <p className="mt-9 max-w-3xl border-t border-onyx/12 pt-7 text-sm leading-relaxed text-onyx-800/70">
              Symptoms like these are common around perimenopause and
              menopause, but they are not always caused by hormonal change.
              Part of an evaluation is working out what else could explain what
              you are experiencing.
            </p>
          </Reveal>
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
              Choose Your Hormone Care Plan
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-onyx-800/75">
              Every treatment begins with an independent clinical evaluation.
              Prescriptions and laboratory testing are provided only when
              medically appropriate.
            </p>
          </Reveal>

          <PlanCards plans={plans} />

          <Reveal>
            <ComparisonTable
              columns={plans.map((plan) =>
                plan.id === "complete-menopause-sexual-wellness"
                  ? "Complete Care"
                  : plan.title,
              )}
              rows={comparison}
              caption="Hormone care plans compared across price, medication eligibility and support"
              heading="Compare the plans"
              intro="A plan is clinical support, not a prescription. Anything a provider decides — including every medication — is listed as “when clinically appropriate” rather than as an included feature."
            />
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Treatment options
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="treatments-heading"
        className="border-b border-onyx-700 bg-onyx"
      >
        <Container className="py-20 sm:py-24">
          <Reveal>
            <Eyebrow>What may be available</Eyebrow>
            <h2
              id="treatments-heading"
              className="mt-6 font-display text-[2.1rem] leading-[1.1] text-ivory sm:text-[2.75rem]"
            >
              Potential Treatment Options
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map(([icon, name, kind], index) => (
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
              Treatment options are determined by an independent licensed
              provider. Not every treatment is appropriate for every patient.
              Certain medications require additional screening, laboratory
              monitoring or synchronous visits. Prescription approval is not
              guaranteed.
            </p>
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
              How Hormone Care Works
            </h2>
          </Reveal>

          <Steps steps={steps} />
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Laboratory testing
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="labs-heading"
        className="border-b border-onyx-700 bg-onyx"
      >
        <Container className="grid gap-10 py-20 sm:py-24 lg:grid-cols-[0.9fr_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <Eyebrow>Testing</Eyebrow>
            <h2
              id="labs-heading"
              className="mt-6 font-display text-[2.1rem] leading-[1.1] text-ivory sm:text-[2.6rem]"
            >
              Laboratory Testing When Needed
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="text-base leading-relaxed text-ivory-200/85">
              Laboratory testing is not required for every patient or every
              menopause treatment. When testing is clinically appropriate, your
              provider will explain what is needed and how the results affect
              your care.
            </p>
            <p className="hairline mt-8 border-t pt-7 text-sm leading-relaxed text-ivory-200/65">
              Any laboratory pricing will be published here once the panel, the
              laboratory cost and the interpretation fee are confirmed.
            </p>
          </Reveal>
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
              Start Your Hormone Care Assessment
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-ivory-200/85">
              Tell us about your symptoms, health history and care preferences.
              A licensed provider will determine which evaluations and
              treatment options may be appropriate.
            </p>
            <p className="hairline mt-9 border-t pt-6 text-xs leading-relaxed text-ivory-200/65">
              This form asks for your contact details and the area you want
              help with — nothing more. Questions about your symptoms, medical
              history, medications and menstrual or surgical history are asked
              inside the secure clinical assessment, not here.
            </p>
          </div>

          <CareLeadForm
            program="hormones-menopause"
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
                "/pillars/hormones-menopause",
                "Hormones & Menopause",
                "The pillar behind the plans — what changes, and why it matters.",
              ],
              [
                "/care/weight-management",
                "Weight Management",
                "Metabolic care for the shifts that often arrive alongside.",
              ],
              ["/care", "All Care", "Every pathway Eve’s Sisters supports."],
            ].map(([href, title, body]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex h-full flex-col gap-3 bg-onyx p-7 transition-colors hover:bg-onyx-800"
                >
                  <span className="font-display text-xl leading-snug text-ivory">
                    {title}
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
