import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { activeLaunchCareCategories } from "@/lib/launchCare";

export const metadata: Metadata = {
  title: "Treatments & Medications",
  description: "The current Eve’s Sisters treatment list, eligibility boundaries, and medication disclosures.",
  alternates: { canonical: "/treatments" },
};

/* Compounded items listed under a category's plans on this page. */
const compoundedListings: Record<string, { heading: string; items: string[] }> = {
  "weight-management": {
    heading: "Weight Management add-ons",
    items: ["MIC-B12 injection (compounded)", "NAD+ nasal spray (compounded)"],
  },
  "eves-secret": {
    heading: "Eve’s Secret™",
    items: ["Eve’s Secret troche (compounded; contains tadalafil, oxytocin and bremelanotide (PT-141))"],
  },
};

export default function TreatmentsPage() {
  return (
    <main>
      <section className="border-b border-onyx-700">
        <Container className="py-20 sm:py-28">
          <Eyebrow>Current treatment list</Eyebrow>
          <h1 className="mt-8 max-w-4xl font-display text-[2.5rem] leading-[1.08] text-ivory sm:text-6xl">
            Treatments offered through Eve&rsquo;s Sisters.
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-ivory-200/85">
            This page is the public source of truth for treatment options currently presented on this site. A licensed provider decides whether any option is appropriate, and state and pharmacy availability may vary.
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ivory-200/75">
            Compounded medications are not FDA-approved. The FDA does not evaluate compounded medications for safety, effectiveness, or quality. Compounded GLP-1s are prescribed only when a licensed provider documents a patient-specific clinical need — not for cost or preference.
          </p>
        </Container>
      </section>

      <section className="bg-onyx-900">
        <Container className="grid gap-6 py-16 sm:grid-cols-2 sm:py-20">
          {activeLaunchCareCategories.map((category) => (
            <article key={category.slug} className="hairline flex h-full flex-col border p-7 sm:p-9">
              <h2 className="font-display text-3xl text-ivory">{category.label}</h2>
              <ul className="mt-6 flex-1 space-y-4">
                {category.plans.map((plan) => (
                  <li key={plan.id} className="border-t border-onyx-700 pt-4">
                    <h3 className="text-base font-medium text-ivory">{plan.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ivory-200/75">{plan.description}</p>
                  </li>
                ))}
              </ul>
              {compoundedListings[category.slug] && (
                <div className="mt-6 border-t border-onyx-700 pt-4">
                  <h3 className="brand-eyebrow text-[0.625rem] text-champagne">{compoundedListings[category.slug].heading}</h3>
                  <ul className="mt-3 space-y-2">
                    {compoundedListings[category.slug].items.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-ivory-200/85">{item}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs leading-relaxed text-ivory-200/65">Compounded medications are not FDA-approved.</p>
                </div>
              )}
              <Link href={category.path} className="brand-eyebrow mt-8 text-[0.625rem] text-champagne hover:underline">
                Review {category.label} eligibility and pricing &rarr;
              </Link>
            </article>
          ))}
        </Container>
      </section>
    </main>
  );
}
