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
   /care/weight-management — the subscription and treatment-options page.

   The educational pillar page at /pillars/weight-loss is untouched; it now
   sends its two calls to action here instead of to /contact.

   Every claim on this page is written so nothing implies that medication is
   prescribed automatically: plans buy clinical support, and a licensed
   provider decides what — if anything — is appropriate.
   ------------------------------------------------------------------ */

const canonical = "https://evevolutionhealth.com/care/weight-management";

export const metadata: Metadata = {
  // `absolute` because the root layout otherwise appends "| Eve’s Sisters"
  // and the requested title already carries it.
  title: { absolute: "Weight Management Plans and GLP-1 Care | Eve’s Sisters" },
  description:
    "Explore personalized weight-management plans from Eve’s Sisters, including oral treatment options, GLP-1 care and ongoing clinical support.",
  alternates: { canonical },
  openGraph: {
    title: "Weight Management Plans and GLP-1 Care | Eve’s Sisters",
    description:
      "Explore personalized weight-management plans from Eve’s Sisters, including oral treatment options, GLP-1 care and ongoing clinical support.",
    url: canonical,
    type: "website",
    images: ["/opengraph-image.png"],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image.png"] },
};

const availableStateCodes = (process.env.EV_WEIGHT_CARE_STATES ?? "")
  .split(",")
  .map((code) => code.trim().toUpperCase())
  .filter((code) => /^[A-Z]{2}$/.test(code));

const trustRow = [
  ["renew", "Licensed clinical care"],
  ["lotus", "Personalized treatment"],
  ["infinity", "Ongoing support"],
] satisfies [PillarIconName, string][];

const plans: Plan[] = [
  {
    id: "oral-weight-care",
    title: "Oral Weight Care",
    price: "$89",
    priceNote: "/month",
    description:
      "A medical weight-management option with access to eligible oral treatments.",
    includes: [
      "Initial clinician evaluation",
      "Monthly clinical check-ins",
      "Secure provider messaging",
      "Prescription and refill management",
      "One eligible generic medication",
      "Progress monitoring",
    ],
    treatments: {
      label: "Possible treatments",
      body: "Metformin, topiramate or naltrexone/bupropion when clinically appropriate.",
    },
    cta: "Choose Oral Weight Care",
    footnote:
      "Medication options depend on clinical eligibility and provider approval.",
  },
  {
    id: "glp-1-care",
    title: "GLP-1 Care",
    price: "$79",
    priceNote: "/month + medication",
    badge: "Most popular",
    featured: true,
    description:
      "Ongoing clinical support for eligible patients prescribed compounded semaglutide or compounded tirzepatide.",
    includes: [
      "GLP-1 eligibility evaluation",
      "Prescription and refill management",
      "Monthly progress check-ins",
      "Side-effect monitoring",
      "Dose-adjustment support",
      "Secure provider messaging",
    ],
    treatments: {
      label: "Potential medications",
      body: "Compounded semaglutide or compounded tirzepatide when clinically appropriate and available.",
    },
    cta: "Choose GLP-1 Care",
    footnote:
      "Medication cost is separate. Compounded medications are not FDA-approved. The FDA does not evaluate compounded medications for safety, effectiveness, or quality.",
  },
  {
    id: "complete-weight-care",
    title: "Complete Weight Care",
    price: "$129",
    priceNote: "/month + medication",
    description:
      "Enhanced weight-management support for patients who want more accountability and clinical guidance.",
    includes: [
      "Everything in GLP-1 Care",
      "Nutrition and protein guidance",
      "Body-measurement tracking",
      "Monthly progress review",
      "Quarterly comprehensive review",
      "One annual Weight Management Panel",
      "Discounts on additional eligible labs",
      "Priority nonclinical support",
    ],
    cta: "Choose Complete Care",
    footnote: "Medication cost is separate.",
  },
];

const pageSchema = [{
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Weight Management Plans and GLP-1 Care",
  url: canonical,
  description: "Weight-management plans, clinician evaluation and contact-only assessment request.",
}, {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Eve’s Sisters Weight Management",
  url: canonical,
  serviceType: "Weight-management support",
  description: "Subscription support with treatment eligibility determined independently by a licensed clinician.",
  offers: plans.map((plan) => ({
    "@type": "Offer",
    name: plan.title,
    price: plan.price.replace("$", ""),
    priceCurrency: "USD",
    url: `${canonical}#plans`,
    description: `${plan.description} ${plan.footnote}`,
  })),
}, {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://evevolutionhealth.com/" },
    { "@type": "ListItem", position: 2, name: "Care", item: "https://evevolutionhealth.com/care" },
    { "@type": "ListItem", position: 3, name: "Weight Management", item: canonical },
  ],
}];

const comparison: ComparisonRow[] = [
  {
    label: "Monthly price",
    values: ["$89", "$79 + medication", "$129 + medication"],
  },
  {
    label: "Generic medication included",
    values: ["One eligible", false, false],
  },
  { label: "GLP-1 access", values: [false, "If eligible", "If eligible"] },
  { label: "Monthly check-ins", values: [true, true, true] },
  { label: "Provider messaging", values: [true, true, true] },
  { label: "Nutrition guidance", values: [false, false, true] },
  { label: "Annual Weight Management Panel", values: [false, false, true] },
  { label: "Priority support", values: [false, false, "Nonclinical"] },
];

const treatments: [PillarIconName, string, string][] = [
  ["renew", "Compounded Semaglutide", "GLP-1 · Compounded"],
  ["honeycomb", "Compounded Tirzepatide", "GLP-1 / GIP · Compounded"],
  ["leaf", "Metformin", "Oral"],
  ["bolt", "Topiramate", "Oral"],
  ["infinity", "Naltrexone/Bupropion", "Oral"],
];

const steps: [string, string][] = [
  [
    "Complete Your Assessment",
    "Tell us about your health history, goals, medications and previous weight-management experience.",
  ],
  [
    "Meet Your Clinical Team",
    "A licensed provider reviews your information and determines which treatment options may be appropriate.",
  ],
  [
    "Begin Your Personalized Plan",
    "If approved, receive your prescription and follow the treatment and monitoring plan provided by your clinician.",
  ],
  [
    "Receive Ongoing Support",
    "Complete required check-ins, track your progress and communicate with your care team throughout treatment.",
  ],
];

export default function WeightManagementCarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      {/* ---------------------------------------------------------------
          Hero
          --------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-onyx-700 bg-[linear-gradient(115deg,var(--color-onyx)_0%,var(--color-onyx-900)_46%,var(--color-plum-900)_150%)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/4 hidden h-[34rem] w-[34rem] rounded-full bg-plum/15 blur-[120px] lg:block"
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
                  Weight Management
                </span>
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:mt-12 lg:grid-cols-[1.08fr_minmax(0,0.92fr)] lg:gap-16">
            <div>
              <div className="brand-enter">
                <Eyebrow>Weight Management</Eyebrow>
              </div>

              <h1
                className="brand-enter mt-7 font-display text-[2.4rem] leading-[1.06] text-ivory sm:text-[3rem] lg:text-[3.4rem]"
                style={{ "--enter-delay": "90ms" } as React.CSSProperties}
              >
                Weight Care
                <span className="mt-2 block italic text-mauve">
                  Designed Around You
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
                Personalized medical weight-management support for every stage,
                every shift and every woman. Connect with a licensed clinician
                to explore oral medications, GLP-1 treatment and comprehensive
                weight-care options.
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
                  src="/images/care/care-weight-management-glp1.png"
                  alt="Weight-care medication formats arranged with a measuring tape in the Eve’s Sisters black, purple and gold palette."
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
              Choose Your Weight Care Plan
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-onyx-800/75">
              Start with the level of medical support that fits your needs. All
              prescriptions require an independent clinical evaluation.
            </p>
          </Reveal>

          <PlanCards plans={plans} />

          <Reveal>
            <ComparisonTable
              columns={plans.map((plan) => plan.title)}
              rows={comparison}
              caption="Weight care plans compared across price, medication access and support"
              heading="Compare the plans"
              intro="A plan is clinical support, not a prescription. Medication is included or accessed only when a licensed provider determines it is appropriate for you."
            />
          </Reveal>

          <Reveal>
            <div className="mt-14 grid gap-5 border-t border-onyx/15 pt-10 text-sm leading-relaxed text-onyx-800/80 sm:grid-cols-2 lg:grid-cols-3">
              <p><strong>Consultations and check-ins.</strong> The listed plan price covers only the services shown for that plan. Treatment still requires independent clinician evaluation.</p>
              <p><strong>Medication and refills.</strong> Oral Weight Care includes one eligible generic medication only when prescribed. GLP-1 and Complete plan medication costs are separate. Refill management is included where listed; approval and supply are not guaranteed.</p>
              <p><strong>Laboratory testing.</strong> Complete Weight Care includes one Annual Weight Management Panel per membership year when ordered as appropriate. It means the panel service, not every possible test. Additional labs may cost extra.</p>
              <p><strong>Shipping.</strong> Any medication shipping availability and charge depend on the dispensing arrangement and must be disclosed before fulfillment.</p>
              <p><strong>Cancellation.</strong> Renewal and cancellation timing must be reviewed in the enrollment terms before purchase; this page does not add a separate cancellation fee.</p>
              <p><strong>Insurance.</strong> Insurance coverage or reimbursement is not promised. Confirm coverage and out-of-pocket costs before enrolling.</p>
            </div>
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
              Treatment Options
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map(([icon, name, kind], index) => (
              <li key={name}>
                <Reveal delay={index * 60}>
                  <div className="flex items-center gap-4 rounded-2xl border border-onyx-700 bg-onyx-900 px-6 py-5 transition-colors hover:border-champagne/40">
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
              <strong className="text-ivory-200">
                Compounded medications are not FDA-approved. The FDA does not
                evaluate compounded medications for safety, effectiveness, or
                quality.
              </strong>{" "}
              Medication is prescribed only when clinically appropriate
              following an evaluation by a licensed provider. Medication
              availability, eligibility and pricing may vary. Prescription
              approval is not guaranteed. Medication and additional laboratory
              costs may be billed separately.
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
              How Weight Care Works
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
              Start Your Weight Care Assessment
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-ivory-200/85">
              Share contact information and the weight-care option you want to
              explore. If service is verified in your state, the care team will
              send the secure clinical next step; otherwise, this request joins
              the availability waitlist.
            </p>
            <p className="hairline mt-9 border-t pt-6 text-xs leading-relaxed text-ivory-200/65">
              Please do not include medical details in this form. Your care team
              collects your health history inside the clinical assessment, where
              it belongs.
            </p>
          </div>

          <CareLeadForm
            program="weight-management"
            labelledBy="get-started-heading"
            availableStateCodes={availableStateCodes}
          />
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
                "/pillars/weight-loss",
                "Weight Management",
                "The pillar behind the plans — how we think about metabolic wellness.",
              ],
              [
                "/care/hormones-menopause",
                "Hormones & Menopause",
                "Where weight, hormones and midlife meet.",
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
