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
   /care/skin-beauty — the subscription and treatment-options page.

   The educational pillar page at /pillars/skin-beauty is untouched; its
   calls to action now open this page instead of /contact.

   Prescription skincare is slow, conditional and sometimes irritating, so
   nothing here promises a medication or a result. A plan buys clinical care;
   a licensed provider decides what is appropriate, and anything conditional
   is written as "when clinically appropriate" rather than implied by a tick.

   Photographs are clinical data. The form on this page never accepts one —
   photos belong in the secure clinical intake, behind a provider.
   ------------------------------------------------------------------ */

const canonical = "https://www.evevolutionhealth.com/care/skin-beauty";
const title = "Prescription Skin and Hair Care Plans | Eve’s Sisters";
const description =
  "Explore personalized prescription skincare, hormonal-acne and hair-care plans from Eve’s Sisters with licensed clinical support and ongoing treatment management.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
};

const trustRow = [
  ["renew", "Licensed clinical care"],
  ["lotus", "Personalized treatment"],
  ["infinity", "Ongoing progress support"],
] satisfies [PillarIconName, string][];

const concerns = [
  "Acne and breakouts",
  "Fine lines and photoaging",
  "Hyperpigmentation",
  "Uneven skin tone",
  "Hormonal acne",
  "Thinning hair",
  "Eyelash concerns",
  "Dryness and texture changes",
];

const plans: Plan[] = [
  {
    id: "skin-essentials",
    title: "Skin Essentials",
    price: "$59",
    priceNote: "/month",
    description:
      "Personalized prescription skincare for common concerns such as acne, uneven tone and visible signs of photoaging.",
    includes: [
      "Initial online skin evaluation",
      "Personalized treatment plan",
      "Secure provider messaging",
      "Routine progress check-ins",
      "Prescription and refill management",
      "One eligible generic topical medication",
    ],
    treatments: {
      label: "Potential treatments",
      body: "Tretinoin, acne treatment and selected hyperpigmentation therapies when clinically appropriate.",
    },
    cta: "Choose Skin Essentials",
    footnote:
      "Medication selection depends on clinical eligibility. Certain compounded products, shipping and laboratory services may cost extra.",
  },
  {
    id: "skin-hair-plus",
    title: "Skin and Hair Plus",
    price: "$99",
    priceNote: "/month",
    badge: "Most popular",
    featured: true,
    description:
      "Coordinated support for women experiencing skin concerns, hormonal acne or thinning hair.",
    includes: [
      "Everything in Skin Essentials",
      "Hair-loss or hormonal-acne evaluation",
      "Combination treatment management",
      "Progress-photo tracking",
      "More frequent medication adjustments",
      "One eligible generic skin or hair medication",
      "Priority nonclinical support",
    ],
    treatments: {
      label: "Potential treatments",
      body: "Tretinoin, spironolactone, topical minoxidil and other provider-selected options when clinically appropriate.",
    },
    cta: "Choose Skin and Hair Plus",
    footnote:
      "Medication, product and shipping costs may vary based on the prescribed treatment. Not every medication is included.",
  },
  {
    id: "complete-skin-beauty",
    title: "Complete Skin and Beauty",
    price: "$139",
    priceNote: "/month",
    badge: "Complete care",
    description:
      "Expanded prescription support for women managing multiple skin, hair or beauty-related concerns.",
    includes: [
      "Everything in Skin and Hair Plus",
      "Up to two coordinated treatment pathways",
      "Quarterly comprehensive review",
      "Enhanced progress tracking",
      "Treatment-adjustment reviews",
      "Eligible eyelash-care evaluation",
      "Priority ongoing support",
      "Discounts on eligible add-on products",
    ],
    cta: "Choose Complete Care",
    footnote:
      "Medications and products are not all included. Additional pharmacy, product and shipping costs are billed separately and vary by treatment.",
  },
];

/* "When clinically appropriate" wherever a provider, not a plan, decides —
   which is everywhere a medication is involved. */
const comparison: ComparisonRow[] = [
  { label: "Monthly price", values: ["$59", "$99", "$139"] },
  { label: "Initial clinical evaluation", values: [true, true, true] },
  { label: "Provider messaging", values: [true, true, true] },
  {
    label: "Prescription management",
    values: [
      "When clinically appropriate",
      "When clinically appropriate",
      "When clinically appropriate",
    ],
  },
  {
    label: "Eligible generic topical medication",
    values: [
      "One, when clinically appropriate",
      "One, when clinically appropriate",
      "When clinically appropriate",
    ],
  },
  {
    label: "Hair-care evaluation",
    values: [false, "When clinically appropriate", "When clinically appropriate"],
  },
  {
    label: "Hormonal-acne support",
    values: [false, "When clinically appropriate", "When clinically appropriate"],
  },
  { label: "Progress-photo tracking", values: [false, true, true] },
  {
    label: "Multiple treatment pathways",
    values: [false, false, "Up to two, when clinically appropriate"],
  },
  { label: "Priority support", values: [false, "Nonclinical", "Nonclinical"] },
];

const treatments: [PillarIconName, string, string][] = [
  ["renew", "Tretinoin", "Topical retinoid"],
  ["leaf", "Acne Care", "Topical or oral"],
  ["lotus", "Hyperpigmentation Care", "Topical"],
  ["honeycomb", "Hormonal Acne", "Provider-selected"],
  ["infinity", "Hair-Loss Care", "Topical or oral"],
  ["bolt", "Eyelash Care", "Prescription treatment"],
];

const steps: [string, string][] = [
  [
    "Share Your Concerns",
    "Complete an assessment covering your skin or hair concerns, medical history, medications and treatment goals.",
  ],
  [
    "Upload Clear Photos",
    "Provide well-lit photos through the approved secure clinical intake when requested.",
  ],
  [
    "Receive Your Treatment Plan",
    "A licensed provider reviews your information and determines which treatment options may be appropriate.",
  ],
  [
    "Track Your Progress",
    "Complete required check-ins, upload progress photos and communicate with your care team about tolerance or changes.",
  ],
];

const safetyNotes = [
  "Daily sun protection may be recommended.",
  "Some treatments can cause irritation or dryness.",
  "Pregnancy status can affect treatment options.",
  "Hair-growth treatments require ongoing evaluation.",
  "Contact the care team if significant side effects develop.",
];

const faqs: [string, string][] = [
  [
    "Do I need a prescription?",
    "Not necessarily. Some concerns respond to over-the-counter care, and part of an evaluation is working out whether a prescription is the right step for you. If a licensed provider decides prescription treatment is appropriate, they will prescribe and manage it through your plan.",
  ],
  [
    "Are medications included in the membership?",
    "Partly. Skin Essentials and Skin and Hair Plus each include one eligible generic medication when it is clinically appropriate. Other medications, compounded products, add-on products, laboratory services and shipping are billed separately, and costs vary by treatment.",
  ],
  [
    "How long does prescription skincare take to work?",
    "Longer than most people expect. Many topical treatments need consistent use over several months before the change is visible, and some concerns look worse before they improve. Your provider will tell you what to expect for the specific treatment you are given.",
  ],
  [
    "Can I receive care for skin and hair concerns together?",
    "Yes. Skin and Hair Plus and Complete Skin and Beauty are built for exactly that, with one care team coordinating the treatments so they work together rather than against each other.",
  ],
  [
    "Will I need to upload photographs?",
    "Usually, yes — photos help a provider assess your skin or scalp and track change over time. They are requested through the secure clinical intake, never through the form on this page.",
  ],
  [
    "Can I use prescription skincare during pregnancy?",
    "Some treatments are not appropriate during pregnancy or while trying to conceive, and retinoids in particular are avoided. Tell your provider if you are pregnant, breastfeeding or planning a pregnancy so they can account for it.",
  ],
  [
    "Does the program include cosmetic injections or procedures?",
    "No. This program covers prescription skincare and hair care managed remotely by a licensed provider. Cosmetic injections, lasers and in-person procedures are not included, and would only become available if a qualified partner is added later.",
  ],
  [
    "Are results guaranteed?",
    "No. Prescription approval is not guaranteed, and neither is any specific cosmetic result. Individual results vary with your skin, your concern, the treatment prescribed and how consistently it is used.",
  ],
];

export default function SkinBeautyCarePage() {
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
                  Skin and Beauty
                </span>
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:mt-12 lg:grid-cols-[1.08fr_minmax(0,0.92fr)] lg:gap-16">
            <div>
              <div className="brand-enter">
                <Eyebrow>Skin and Beauty</Eyebrow>
              </div>

              <h1
                className="brand-enter mt-7 font-display text-[2.4rem] leading-[1.06] text-ivory sm:text-[3rem] lg:text-[3.4rem]"
                style={{ "--enter-delay": "90ms" } as React.CSSProperties}
              >
                Care That Helps You
                <span className="mt-2 block italic text-mauve">
                  Feel Like Yourself
                </span>
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
                Personalized prescription skincare and hair support designed
                around your goals, medical history and changing needs.
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
                  src="/images/care/care-skin-beauty-v3.webp"
                  alt="A woman with luminous skin, head tilted back and one hand at her neck, in warm low light."
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
          Concerns
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="concerns-heading"
        className="border-b border-onyx-700 bg-ivory"
      >
        <Container className="py-20 sm:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">What you may notice</p>
            <h2
              id="concerns-heading"
              className="mt-6 max-w-2xl font-display text-[2.1rem] leading-[1.1] text-onyx sm:text-[2.75rem]"
            >
              Care for the Changes You Can See and Feel
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-onyx-800/75">
              Skin and hair change with age, hormones, sun exposure and health.
              Your clinician will consider what you are noticing alongside your
              history before recommending anything.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {concerns.map((concern, index) => (
              <li key={concern}>
                <Reveal delay={index * 50}>
                  <div className="h-full rounded-2xl border border-onyx/12 bg-white/70 px-6 py-5">
                    <span className="text-sm leading-relaxed text-onyx-800/85">
                      {concern}
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal>
            <p className="mt-9 max-w-3xl border-t border-onyx/12 pt-7 text-sm leading-relaxed text-onyx-800/70">
              Not every concern needs a prescription. Some respond to
              over-the-counter care, some are better addressed in person, and
              part of an evaluation is telling you which is which.
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
              Choose Your Skin and Beauty Plan
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-onyx-800/75">
              Treatment recommendations are based on an independent clinical
              evaluation and your individual skincare or hair goals.
            </p>
          </Reveal>

          <PlanCards plans={plans} />

          <Reveal>
            <ComparisonTable
              columns={plans.map((plan) => plan.title)}
              rows={comparison}
              caption="Skin and beauty plans compared across price, medication eligibility and support"
              heading="Compare the plans"
              intro="A plan is clinical care, not a prescription. Anything a provider decides — including every medication — is listed as “when clinically appropriate” rather than as an included feature."
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
              Treatment is provided only when clinically appropriate following
              an evaluation by a licensed provider. Medication availability,
              pricing and eligibility may vary. Prescription approval and
              specific cosmetic results are not guaranteed.
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
              How Skin and Beauty Care Works
            </h2>
          </Reveal>

          <Steps steps={steps} />
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Expectations and safety
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="safety-heading"
        className="border-b border-onyx-700 bg-onyx"
      >
        <Container className="grid gap-10 py-20 sm:py-24 lg:grid-cols-[0.9fr_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <Eyebrow>What to expect</Eyebrow>
            <h2
              id="safety-heading"
              className="mt-6 font-display text-[2.1rem] leading-[1.1] text-ivory sm:text-[2.6rem]"
            >
              Prescription Care With Realistic Expectations
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="text-base leading-relaxed text-ivory-200/85">
              Skin and hair treatments often require consistent use over time.
              Your provider will explain how to use prescribed medication, what
              side effects to watch for and when to expect a follow-up.
              Individual results vary.
            </p>
            <ul className="hairline mt-8 grid gap-4 border-t pt-7">
              {safetyNotes.map((note) => (
                <li key={note} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne"
                  />
                  <span className="text-sm leading-relaxed text-ivory-200/75">
                    {note}
                  </span>
                </li>
              ))}
            </ul>
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
              Start Your Skin and Beauty Assessment
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-ivory-200/85">
              Tell us about your concerns and treatment goals. A licensed
              provider will determine which options may be appropriate.
            </p>
            <p className="hairline mt-9 border-t pt-6 text-xs leading-relaxed text-ivory-200/65">
              This form asks for your contact details, your main concern and
              the plan you are considering — nothing more. Photographs of your
              skin or scalp and questions about your medical history are
              handled inside the secure clinical assessment, and cannot be
              submitted here.
            </p>
          </div>

          <CareLeadForm
            program="skin-beauty"
            labelledBy="get-started-heading"
            privacyNote="Contact details and your area of interest only. Photographs and health questions are handled inside the secure clinical assessment."
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
                "/pillars/skin-beauty",
                "Skin & Beauty",
                "The pillar behind the plans — what changes, and why it matters.",
              ],
              [
                "/care/hormones-menopause",
                "Hormones & Menopause",
                "Hormonal shifts that often show up first in skin and hair.",
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
