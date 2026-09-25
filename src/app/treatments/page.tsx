import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { TreatmentExplorer } from "@/components/TreatmentExplorer";

const title = "Treatments & Medications | Eve’s Sisters";
const description =
  "Explore medications that may be available through Eve’s Sisters’ independent clinical partners. A licensed clinician determines whether a treatment is appropriate for you.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/treatments" },
  openGraph: { title, description, type: "website", url: "https://evevolutionhealth.com/treatments" },
};

const disclosure =
  "Treatment depends on clinical evaluation. Availability varies by state and pharmacy. A prescription is not guaranteed. Compounded medications are not FDA-approved. The FDA does not evaluate compounded medications for safety, effectiveness, or quality.";

const steps = [
  ["Explore options", "Browse treatments and learn what each one is."],
  ["Clinical evaluation", "An independent licensed clinician reviews your health history and goals."],
  ["Personalized next steps", "Get guidance on the options that may be right for you."],
] as const;

export default function TreatmentsPage() {
  return (
    <div className="overflow-x-clip">
      <section className="relative overflow-hidden border-b border-onyx-700 bg-[linear-gradient(115deg,var(--color-onyx)_0%,var(--color-onyx-900)_45%,var(--color-plum-900)_140%)]">
        <Image
          src="/images/skin-beauty/hero.webp"
          alt="Three women of different ages and backgrounds in plum and ivory silk."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] opacity-60 md:opacity-100"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,11,0.97)_0%,rgba(8,11,11,0.88)_40%,rgba(8,11,11,0.35)_75%,rgba(8,11,11,0.15)_100%)]"
        />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-2xl">
            <Eyebrow>Wellness through every chapter</Eyebrow>
            <h1 className="mt-6 font-display text-[2.6rem] leading-[1.04] text-ivory sm:text-6xl">
              Treatments &amp; Medications
            </h1>
            <p className="mt-5 font-display text-xl text-champagne sm:text-2xl">
              Understand your options. Find your next step.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory-200/90">
              Explore medications that may be available through our independent
              clinical partners. A licensed clinician determines whether a
              treatment is appropriate for you.
            </p>
          </div>
        </Container>
      </section>

      <section aria-label="Important information" className="border-b border-champagne/25 bg-plum-900/60">
        <Container className="py-5">
          <p className="text-sm leading-relaxed text-ivory-200">
            <strong className="font-semibold text-champagne">Please note: </strong>
            {disclosure}
          </p>
        </Container>
      </section>

      <section aria-label="Treatment list" className="bg-onyx">
        <Container className="max-w-7xl py-14 sm:py-20">
          <TreatmentExplorer />
          <p className="mt-10 text-xs leading-relaxed text-ivory-200/70">
            Descriptions are general information, not medical advice, and do not
            include dosing or prices. Listings reflect our clinical partner&rsquo;s
            catalog (effective September 2026) and are not an offer to prescribe. See the{" "}
            <Link href="/disclaimer" className="text-champagne underline underline-offset-4">
              Medical Disclaimer
            </Link>
            .
          </p>
        </Container>
      </section>

      <section aria-labelledby="treatment-steps" className="bg-ivory text-onyx">
        <Container className="py-16 sm:py-20">
          <h2 id="treatment-steps" className="sr-only">How it works</h2>
          <ol className="grid gap-10 md:grid-cols-3">
            {steps.map(([heading, body], index) => (
              <li key={heading} className="flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-onyx/40 font-display text-xl">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl">{heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-onyx-700">{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-12 text-center">
            <Link
              href="/care"
              className="button-sheen brand-eyebrow inline-block bg-plum px-8 py-4 text-[0.625rem] text-ivory transition-colors hover:bg-plum-600"
            >
              Explore All Care Pathways
            </Link>
          </p>
        </Container>
      </section>
    </div>
  );
}
