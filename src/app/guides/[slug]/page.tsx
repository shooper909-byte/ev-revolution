import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow } from "@/components/Container";
import { compoundedNote, getGuide, guides } from "@/lib/guides";
import { handoffNote, telehealthUrl } from "@/lib/telehealth";
import { business } from "@/lib/business";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { title: g.title, description: g.description, type: "article" },
  };
}

export default async function GuidePage({ params }: Props) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const from = `/guides/${g.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    datePublished: g.date,
    dateModified: g.date,
    author: { "@type": "Organization", name: business.brand },
    publisher: { "@type": "Organization", name: business.brand },
    mainEntityOfPage: `https://${business.domain}${from}`,
  };

  return (
    <Container className="py-16 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="brand-eyebrow text-ivory-200/60">
        <Link href="/guides" className="hover:text-champagne">Guides</Link>
      </nav>
      <article className="mx-auto mt-6 max-w-3xl">
        <Eyebrow>{g.readingTime} read</Eyebrow>
        <h1 className="mt-6 font-display text-4xl sm:text-5xl">{g.title}</h1>
        <p className="mt-6 text-lg text-ivory-200">{g.intro}</p>

        {g.sections.map((s) => (
          <section key={s.heading} className="mt-12">
            <h2 className="font-display text-3xl">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-ivory-200">{p}</p>
            ))}
            {s.bullets && (
              <ul className="mt-4 list-disc space-y-2 pl-6 text-ivory-200">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            )}
          </section>
        ))}

        <aside className="hairline mt-14 rounded-lg border bg-plum-900/40 p-8">
          <h2 className="font-display text-2xl">Talk it through with a clinician</h2>
          <p className="mt-4 text-sm text-ivory-200">
            Care, pricing and eligibility live on our telehealth platform. Any medication is prescribed only if a licensed provider determines it is appropriate.
          </p>
          <a
            href={telehealthUrl(from, g.packagePath)}
            className="button-sheen brand-eyebrow mt-6 inline-block rounded-full bg-champagne px-8 py-4 text-center text-[0.625rem] text-onyx hover:bg-champagne-200"
          >
            {g.packageLabel} <span aria-hidden="true">&rarr;</span>
          </a>
          <p className="mt-4 text-xs leading-relaxed text-ivory-200/70">{handoffNote}</p>
        </aside>

        {g.mentionsCompounded && <p className="mt-8 text-xs leading-relaxed text-ivory-200/60">{compoundedNote}</p>}
        <p className="mt-4 text-xs leading-relaxed text-ivory-200/60">
          This guide is general education, not medical advice. Talk with a licensed clinician about your own health.
        </p>
      </article>
    </Container>
  );
}
