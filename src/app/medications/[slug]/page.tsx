import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow } from "@/components/Container";
import {
  BRAND_NOTICE,
  COMPOUNDED_NOTICE,
  PRICE_ON_TELEHEALTH,
  brandInfo,
  getCategory,
  getMedication,
  medicationPrices,
  medications,
  packagePriceLine,
  packages,
} from "@/lib/catalog";
import { handoffNote, telehealthUrl } from "@/lib/telehealth";

type Props = { params: Promise<{ slug: string }> };

/** How and when payment happens, per Karpa's billing for each kind of care. */
function billingNote(category: string): string {
  if (category === "weight-management")
    return "Your card is authorized at checkout and charged only after a clinician reviews your answers. If treatment isn’t approved, you pay only the consultation fee.";
  if (category === "hormones-menopause")
    return "If your clinician prescribes hormone therapy, you approve and pay for each prescription in your patient portal before it ships.";
  return "You’re not charged for medication unless a licensed clinician prescribes it.";
}

export function generateStaticParams() {
  return medications.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getMedication((await params).slug);
  if (!m) return {};
  const title = `${m.name}: what it is, how it’s used and cost`;
  return {
    title,
    description: m.summary,
    alternates: { canonical: `/medications/${m.slug}` },
    openGraph: { title, description: m.summary },
  };
}

export default async function MedicationPage({ params }: Props) {
  const m = getMedication((await params).slug);
  if (!m) notFound();
  const from = `/medications/${m.slug}`;
  const cat = getCategory(m.category);
  const brand = brandInfo(m.slug);
  const price = medicationPrices[m.slug];
  const inPackages = packages.filter((p) => p.treatments.includes(m.slug));
  // Brand-name options are chosen inside the weight-management questionnaire; everything else has its own start page.
  const start = brand ? `/start/consultation?category=${m.category}` : `/start/${m.slug}`;

  return (
    <Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="brand-eyebrow text-ivory-200/60">
        <Link href="/medications" className="hover:text-champagne">Medications</Link>
        {cat && (
          <>
            {" / "}
            <Link href={`/medications#${cat.slug}`} className="hover:text-champagne">{cat.name}</Link>
          </>
        )}
      </nav>
      <article className="mx-auto mt-6 max-w-3xl">
        <Eyebrow>{brand ? `Brand-name · ${brand.maker}` : m.compounded ? "Compounded prescription" : "Prescription"}</Eyebrow>
        <h1 className="mt-6 font-display text-4xl sm:text-5xl">{m.name}</h1>
        {m.aka && <p className="mt-2 text-ivory-200/70">Also called {m.aka}</p>}
        <p className="mt-6 text-lg text-ivory-200">{m.summary}</p>

        <div className="hairline mt-8 rounded-lg border p-6">
          <p className="brand-eyebrow text-ivory-200/60">Price</p>
          <p className="mt-2 font-display text-2xl text-champagne">{price ? price.line : PRICE_ON_TELEHEALTH}</p>
          {price?.detail && <p className="mt-2 text-sm leading-relaxed text-ivory-200">{price.detail}</p>}
          <p className="mt-3 text-xs text-ivory-200/60">
            {billingNote(m.category)}{" "}
            <Link href="/subscription-cancellation" className="underline hover:text-champagne">Cancellation &amp; refunds</Link>
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-3xl">What it is</h2>
          <p className="mt-4 leading-relaxed text-ivory-200">{m.whatItIs}</p>
          {brand && <p className="mt-3 text-sm text-ivory-200/80">{brand.approvedUse}</p>}
        </section>

        <section className="mt-10">
          <h2 className="font-display text-3xl">How it’s used</h2>
          <p className="mt-4 leading-relaxed text-ivory-200">{m.howItsUsed}</p>
          <p className="mt-4 text-sm text-ivory-200/80">
            <span className="text-ivory">Forms:</span> {m.forms.join(", ")}
          </p>
          {m.programs.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-ivory-200">
              {m.programs.map((p) => <li key={p}>{p}</li>)}
            </ul>
          )}
        </section>

        <section className="mt-10">
          <h2 className="font-display text-3xl">Before you start</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-ivory-200">
            {m.considerations.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </section>

        {inPackages.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-3xl">Packages that include it</h2>
            <ul className="mt-4 space-y-2">
              {inPackages.map((p) => (
                <li key={p.slug}>
                  <Link href={`/plans/${p.slug}`} className="text-champagne hover:text-ivory">{p.name}</Link>
                  <span className="text-sm text-ivory-200/70"> · {packagePriceLine(p)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <aside className="hairline mt-14 rounded-lg border bg-plum-900/40 p-8">
          <h2 className="font-display text-2xl">Is {m.name} right for you?</h2>
          <p className="mt-4 text-sm text-ivory-200">
            A licensed clinician reviews your health history and decides whether it is appropriate. {brand ? "Choose “Brand-name options” when the questionnaire asks which medication you prefer." : ""}
          </p>
          <a
            href={telehealthUrl(from, start)}
            className="button-sheen brand-eyebrow mt-6 inline-block rounded-full bg-champagne px-8 py-4 text-center text-[0.625rem] text-onyx hover:bg-champagne-200"
          >
            Start your assessment <span aria-hidden="true">&rarr;</span>
          </a>
          <p className="mt-4 text-xs leading-relaxed text-ivory-200/70">{handoffNote}</p>
        </aside>

        {m.compounded ? (
          <p className="mt-8 text-xs leading-relaxed text-ivory-200/60">
            {m.compounded === "partial" ? "Some forms of this medication are compounded. " : ""}
            {m.compoundedNote ? `${m.compoundedNote} ` : ""}
            {COMPOUNDED_NOTICE}
          </p>
        ) : null}
        {brand && <p className="mt-8 text-xs leading-relaxed text-ivory-200/60">{BRAND_NOTICE}</p>}
        {cat && <p className="mt-3 text-xs leading-relaxed text-ivory-200/60">{cat.clinicalNote}</p>}
        <p className="mt-3 text-xs leading-relaxed text-ivory-200/60">
          Prices apply outside North Dakota and Ohio. This page is general information, not medical advice. Talk with a licensed clinician about your own health.
        </p>
      </article>
    </Container>
  );
}
