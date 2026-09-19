import type { Metadata } from "next";
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
   /peptide-care — clinician-guided peptide care.

   A package buys clinical evaluation, coordination and follow-up. Nothing
   here states or implies that a peptide — or any medication — follows from
   paying for one. Whether a therapy is legal, available, appropriate and
   dispensable is decided by a licensed provider, applicable law, the
   patient's state and the dispensing pharmacy, in that order, and the copy
   says so everywhere a treatment is mentioned.

   Medications are deliberately NOT hard-coded into this page. See
   `treatmentOptions` below.
   ------------------------------------------------------------------ */

const canonical = "https://www.evevolutionhealth.com/peptide-care";
const title = "Clinician-Guided Peptide Care | Eve's Sisters";
const description =
  "Explore peptide-based treatment options through a licensed clinical provider. Every treatment requires medical evaluation and is prescribed only when appropriate and legally available.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
};

/* The consultation and enrolment route: the assessment lead form further down
   this page, which posts to /api/care-lead under the `peptide-care` programme.
   Every call to action on the page points here. */
const ENROLLMENT_HREF = "#get-started";

const trustRow = [
  ["renew", "Licensed providers"],
  ["honeycomb", "Medical evaluation required"],
  ["lotus", "Ongoing clinical support"],
] satisfies [PillarIconName, string][];

const atAGlance = [
  "Eligibility assessment before anything else",
  "Care delivered by licensed clinical providers",
  "Plans personalized to your history and goals",
  "Treatment only where appropriate and legally available",
  "Medication, laboratory and pharmacy charges billed separately",
];

/* ------------------------------------------------------------------
   Treatment data — the single editable object for this page.

   EDIT HERE, and only here, once the clinical partner supplies its current
   formulary. Add an entry only for a therapy that partner has confirmed it
   can lawfully prescribe and dispense. Do not add research-use-only peptides,
   and do not describe anything as FDA-approved, compounded or available
   unless the partner has confirmed that specific claim in writing.

   While the list is empty the section renders `treatmentNotice` instead,
   which is the accurate statement until a formulary exists.
   ------------------------------------------------------------------ */

type TreatmentOption = {
  /** Therapy name, exactly as the clinical partner's formulary lists it. */
  name: string;
  /** What it is used for, in plain language, without an outcome promise. */
  summary: string;
  /** Any partner-confirmed condition, e.g. state or screening limits. */
  availability: string;
};

const treatmentOptions: TreatmentOption[] = [];

const treatmentNotice =
  "Available treatment options are determined by your licensed provider, medical eligibility, state availability, and the dispensing pharmacy.";

/* ------------------------------------------------------------------
   Packages
   ------------------------------------------------------------------ */

const plans: Plan[] = [
  {
    id: "peptide-care-essentials",
    title: "Peptide Care Essentials",
    price: "$99",
    priceNote: "/month",
    description:
      "A starting point for women who want to find out whether peptide-based treatment is clinically appropriate for them.",
    includes: [
      "Initial eligibility assessment",
      "Licensed-provider consultation",
      "Personalized care plan",
      "Secure patient portal",
      "Prescription coordination when appropriate",
    ],
    cta: "Check My Eligibility",
    href: ENROLLMENT_HREF,
    footnote: "Medication and labs billed separately.",
  },
  {
    id: "peptide-care-plus",
    title: "Peptide Care Plus",
    price: "$199",
    priceNote: "/month",
    badge: "Most popular",
    featured: true,
    description:
      "Closer monitoring for women who want regular clinical review of their plan and their results.",
    includes: [
      "Everything in Essentials",
      "Monthly progress check-in",
      "Lab-order coordination",
      "Results review",
      "Secure care-team messaging",
      "Priority scheduling",
    ],
    cta: "Check My Eligibility",
    href: ENROLLMENT_HREF,
    footnote: "Medication and labs billed separately.",
  },
  {
    id: "eves-secret-peptide-concierge",
    title: "Eve's Secret Peptide Concierge",
    price: "$349",
    priceNote: "/month",
    badge: "Most complete",
    description:
      "Whole-woman care for those who want their peptide plan reviewed alongside everything else that shapes how they feel.",
    includes: [
      "Everything in Peptide Care Plus",
      "Comprehensive whole-woman assessment",
      "Weight, hormone, energy, sleep, skin, and intimate-wellness review",
      "Monthly clinician check-ins",
      "Quarterly treatment review",
      "Priority support",
      "15% savings on eligible nonprescription wellness products",
    ],
    cta: "Check My Eligibility",
    href: ENROLLMENT_HREF,
    footnote:
      "Medication and labs billed separately. Savings apply to eligible nonprescription wellness products only.",
  },
];

/* Anything a provider, a pharmacy or a state decides reads as a condition
   rather than as a feature a package hands over. */
const comparison: ComparisonRow[] = [
  { label: "Monthly price", values: ["$99", "$199", "$349"] },
  { label: "Initial eligibility assessment", values: [true, true, true] },
  { label: "Licensed-provider consultation", values: [true, true, true] },
  { label: "Personalized care plan", values: [true, true, true] },
  { label: "Secure patient portal", values: [true, true, true] },
  {
    label: "Prescription coordination",
    values: [
      "When clinically appropriate",
      "When clinically appropriate",
      "When clinically appropriate",
    ],
  },
  { label: "Monthly progress check-in", values: [false, true, true] },
  {
    label: "Lab-order coordination",
    values: [false, "When clinically appropriate", "When clinically appropriate"],
  },
  {
    label: "Results review",
    values: [false, "When clinically appropriate", "When clinically appropriate"],
  },
  { label: "Secure care-team messaging", values: [false, true, true] },
  { label: "Priority scheduling", values: [false, true, true] },
  { label: "Comprehensive whole-woman assessment", values: [false, false, true] },
  { label: "Monthly clinician check-ins", values: [false, false, true] },
  { label: "Quarterly treatment review", values: [false, false, true] },
  { label: "Priority support", values: [false, false, "Nonclinical"] },
  {
    label: "Savings on eligible nonprescription wellness products",
    values: [false, false, "15%"],
  },
];

const steps: [string, string][] = [
  [
    "Complete Your Health Assessment",
    "Share your health history, medications and goals through the secure assessment.",
  ],
  [
    "Meet With a Licensed Provider",
    "A licensed provider reviews your history with you and determines whether peptide-based treatment is appropriate.",
  ],
  [
    "Receive a Personalized Plan if Eligible",
    "If you are eligible, your provider builds a plan around your history, your results and what is legally available to you.",
  ],
  [
    "Begin Treatment With Ongoing Monitoring",
    "Start your plan with scheduled follow-up, so it can be reviewed and adjusted over time.",
  ],
];

const disclaimer =
  "Medical services are available only in supported states. Treatment is not guaranteed. Prescription medications require consultation and provider approval. Medication, laboratory, and pharmacy charges may be separate. Compounded medications are not FDA-approved. Availability and pricing may change.";

export default function PeptideCarePage() {
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
                  Peptide Care
                </span>
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:mt-12 lg:grid-cols-[1.08fr_minmax(0,0.92fr)] lg:gap-16">
            <div>
              <div className="brand-enter">
                <Eyebrow>Peptide Care</Eyebrow>
              </div>

              <h1
                className="brand-enter mt-7 font-display text-[2.4rem] leading-[1.06] text-ivory sm:text-[3rem] lg:text-[3.4rem]"
                style={{ "--enter-delay": "90ms" } as React.CSSProperties}
              >
                Clinician-Guided
                <span className="mt-2 block italic text-mauve">
                  Peptide Care
                </span>
              </h1>

              <span
                aria-hidden="true"
                className="brand-draw mt-9 block h-px w-28 bg-champagne/70"
                style={{ "--enter-delay": "200ms" } as React.CSSProperties}
              />

              <p
                className="brand-enter mt-8 brand-eyebrow text-[0.625rem] leading-relaxed text-champagne"
                style={{ "--enter-delay": "150ms" } as React.CSSProperties}
              >
                Personalized treatment. Licensed providers. Ongoing support.
              </p>

              <p
                className="brand-enter mt-7 max-w-xl text-base leading-relaxed text-ivory-200/85 sm:text-lg"
                style={{ "--enter-delay": "180ms" } as React.CSSProperties}
              >
                Explore peptide-based treatment options through a licensed
                clinical provider. Every treatment requires medical evaluation
                and is prescribed only when appropriate and legally available.
              </p>

              <div
                className="brand-enter mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
                style={{ "--enter-delay": "270ms" } as React.CSSProperties}
              >
                <a
                  href={ENROLLMENT_HREF}
                  className="button-sheen brand-eyebrow group bg-plum px-8 py-4 text-center text-[0.625rem] text-ivory transition-colors hover:bg-plum-600"
                >
                  Check My Eligibility
                  <span
                    aria-hidden="true"
                    className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
                <a
                  href="#packages"
                  className="hairline brand-eyebrow border px-8 py-4 text-center text-[0.625rem] text-champagne transition-colors hover:bg-onyx-800"
                >
                  Compare Packages
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

            <Reveal>
              <div className="hairline rounded-3xl border bg-onyx-900/60 p-8 sm:p-10">
                <p className="brand-eyebrow text-[0.5rem] text-champagne">
                  How this works
                </p>
                <ul className="mt-7 grid gap-4">
                  {atAGlance.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne"
                      />
                      <span className="text-sm leading-relaxed text-ivory-200/85">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="hairline mt-8 border-t pt-6 text-xs leading-relaxed text-ivory-200/65">
                  A package is clinical care and coordination. It is not a
                  prescription, and no medication is guaranteed.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Packages + comparison
          --------------------------------------------------------------- */}
      <section
        id="packages"
        aria-labelledby="packages-heading"
        className="scroll-mt-24 border-b border-onyx-700 bg-ivory"
      >
        <Container className="py-20 sm:py-24">
          <Reveal>
            <p className="brand-eyebrow text-plum">Packages</p>
            <h2
              id="packages-heading"
              className="mt-6 max-w-2xl font-display text-[2.1rem] leading-[1.1] text-onyx sm:text-[2.75rem]"
            >
              Choose Your Level of Support
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-onyx-800/75">
              Every package begins with an eligibility assessment and a licensed
              provider. What changes between them is how closely your plan is
              monitored and reviewed.
            </p>
          </Reveal>

          <PlanCards plans={plans} />

          <Reveal>
            <ComparisonTable
              columns={plans.map((plan) =>
                plan.id === "eves-secret-peptide-concierge"
                  ? "Peptide Concierge"
                  : plan.title,
              )}
              rows={comparison}
              caption="Peptide care packages compared across price, monitoring and support"
              heading="Compare the packages"
              intro="A package is clinical care and coordination. Medication, laboratory and pharmacy charges are billed separately, and anything a provider decides is listed as “when clinically appropriate” rather than as an included feature."
            />
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Treatment options — driven by `treatmentOptions` above
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="treatment-heading"
        className="border-b border-onyx-700 bg-onyx"
      >
        <Container className="py-20 sm:py-24">
          <Reveal>
            <Eyebrow>Determined by your provider</Eyebrow>
            <h2
              id="treatment-heading"
              className="mt-6 font-display text-[2.1rem] leading-[1.1] text-ivory sm:text-[2.75rem]"
            >
              Treatment Options
            </h2>
          </Reveal>

          {treatmentOptions.length > 0 ? (
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {treatmentOptions.map((option, index) => (
                <li key={option.name}>
                  <Reveal delay={index * 60}>
                    <div className="flex h-full flex-col rounded-2xl border border-onyx-700 bg-onyx-900 px-6 py-6 transition-colors hover:border-champagne/40">
                      <span className="font-display text-xl leading-tight text-ivory">
                        {option.name}
                      </span>
                      <span className="mt-3 text-sm leading-relaxed text-ivory-200/80">
                        {option.summary}
                      </span>
                      <span className="hairline mt-5 border-t pt-4 text-xs leading-relaxed text-ivory-200/65">
                        {option.availability}
                      </span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal>
              <p className="mt-12 max-w-3xl rounded-3xl border border-onyx-700 bg-onyx-900/60 p-8 text-base leading-relaxed text-ivory-200/85 sm:p-10">
                {treatmentNotice}
              </p>
            </Reveal>
          )}

          <Reveal delay={80}>
            <p className="hairline mt-10 max-w-3xl border-t pt-7 text-sm leading-relaxed text-ivory-200/70">
              Not every patient is eligible, and not every patient is prescribed
              anything. Eligibility, treatment selection and dosing are
              independent decisions made by a licensed provider, based on your
              medical history, your results, applicable law and what the
              dispensing pharmacy can supply in your state.
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
              How Peptide Care Works
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
              Check Your Eligibility
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-ivory-200/85">
              Tell us where you are and what you are hoping to address. A
              licensed provider will determine whether peptide-based treatment
              is appropriate and available to you.
            </p>
            <p className="hairline mt-9 border-t pt-6 text-xs leading-relaxed text-ivory-200/65">
              This form asks for your contact details, your area of interest and
              the package you are considering &mdash; nothing more. Your
              symptoms, medications and health history are asked inside the
              secure clinical assessment, not here.
            </p>
          </div>

          <CareLeadForm
            program="peptide-care"
            labelledBy="get-started-heading"
            privacyNote="Contact details and your area of interest only. Health questions are asked inside the secure clinical assessment."
          />
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Disclaimer
          --------------------------------------------------------------- */}
      <section aria-labelledby="disclaimer-heading" className="bg-onyx-900">
        <Container className="py-16 sm:py-20">
          <div className="hairline max-w-3xl border-t pt-8">
            <h2
              id="disclaimer-heading"
              className="brand-eyebrow text-[0.5625rem] text-champagne"
            >
              Important information
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-ivory-200/75">
              {disclaimer}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-ivory-200/75">
              Read the full{" "}
              <Link
                href="/disclaimer"
                className="text-champagne underline underline-offset-4 transition-colors hover:text-champagne-200"
              >
                medical disclaimer
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
