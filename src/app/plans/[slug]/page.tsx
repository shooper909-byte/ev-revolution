import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow } from "@/components/Container";
import { COMPOUNDED_NOTICE, PACKAGE_VISIT_NOTE, getMedication, getPackage, packagePriceLine, packages } from "@/lib/catalog";
import { handoffNote, telehealthUrl } from "@/lib/telehealth";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPackage((await params).slug);
  if (!p) return {};
  const title = `${p.name}: what’s included and cost`;
  return { title, description: p.differentiator, alternates: { canonical: `/plans/${p.slug}` }, openGraph: { title, description: p.differentiator } };
}

export default async function PlanPage({ params }: Props) {
  const p = getPackage((await params).slug);
  if (!p) notFound();
  const from = `/plans/${p.slug}`;
  const meds = p.treatments.map(getMedication).filter((m) => !!m);

  return (
    <Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="brand-eyebrow text-ivory-200/60">
        <Link href="/plans" className="hover:text-champagne">Packages</Link>
      </nav>
      <article className="mx-auto mt-6 max-w-3xl">
        <Eyebrow>{p.tagline}</Eyebrow>
        <h1 className="mt-6 font-display text-4xl sm:text-5xl">{p.name}</h1>
        <p className="mt-6 text-lg text-ivory-200">{p.forWho}</p>

        <section className="hairline mt-10 rounded-lg border p-6">
          <h2 className="brand-eyebrow text-ivory-200/60">What’s included</h2>
          <ul className="mt-4 space-y-2 text-ivory-200">
            {p.includes.map((i) => (
              <li key={i}>✓ {i}</li>
            ))}
          </ul>
        </section>

        <section className="hairline mt-6 rounded-lg border p-6">
          <h2 className="brand-eyebrow text-ivory-200/60">What it costs</h2>
          <p className="mt-3 font-display text-2xl text-champagne">{packagePriceLine(p)}</p>
          {p.itemized && (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ivory-200">
              {p.itemized.map((line) => <li key={line}>{line}</li>)}
            </ul>
          )}
          <p className="mt-4 text-sm text-ivory-200/80">{PACKAGE_VISIT_NOTE}</p>
          {p.availability && <p className="mt-3 text-sm text-ivory-200/80">{p.availability}</p>}
        </section>

        {meds.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-3xl">Medications in this package</h2>
            <p className="mt-3 text-sm text-ivory-200/80">Your clinician may consider these. Nothing is guaranteed; each is prescribed only if appropriate for you.</p>
            <ul className="mt-4 space-y-2">
              {meds.map((m) => (
                <li key={m!.slug}>
                  <Link href={`/medications/${m!.slug}`} className="text-champagne hover:text-ivory">{m!.name}</Link>
                  <span className="text-sm text-ivory-200/70"> · {m!.summary}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <aside className="hairline mt-14 rounded-lg border bg-plum-900/40 p-8">
          <h2 className="font-display text-2xl">Start with {p.name}</h2>
          <p className="mt-4 text-sm text-ivory-200">
            Answer a private health questionnaire. A licensed clinician reviews it and decides which parts of the package are right for you.
          </p>
          <a
            href={telehealthUrl(from, `/packages/${p.slug}`)}
            className="button-sheen brand-eyebrow mt-6 inline-block rounded-full bg-champagne px-8 py-4 text-center text-[0.625rem] text-onyx hover:bg-champagne-200"
          >
            Start this package <span aria-hidden="true">&rarr;</span>
          </a>
          <p className="mt-4 text-xs leading-relaxed text-ivory-200/70">{handoffNote}</p>
        </aside>

        {p.compounded && <p className="mt-8 text-xs leading-relaxed text-ivory-200/60">{COMPOUNDED_NOTICE}</p>}
        <p className="mt-3 text-xs leading-relaxed text-ivory-200/60">
          Prices apply outside North Dakota and Ohio. This page is general information, not medical advice.
        </p>
      </article>
    </Container>
  );
}
