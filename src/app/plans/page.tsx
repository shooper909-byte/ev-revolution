import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { COMPOUNDED_NOTICE, PACKAGE_VISIT_NOTE, packagePriceLine, packages } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Every Eve’s Sisters care package and exactly what it includes: GLP-1 weight management, menopause hormone care, the Mrs. Collection, intimacy and renewal plans, with prices.",
  alternates: { canonical: "/plans" },
};

export default function PlansPage() {
  return (
    <Container className="py-16 sm:py-24">
      <Eyebrow>Care, bundled thoughtfully</Eyebrow>
      <h1 className="mt-6 font-display text-5xl">Packages</h1>
      <p className="mt-6 max-w-2xl text-ivory-200">
        Each package brings together the care a woman at that stage most often asks about. Here is exactly what each one includes and what it costs.
        Every medication is prescribed only if a licensed clinician decides it is right for you.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {packages.map((p) => (
          <Link key={p.slug} href={`/plans/${p.slug}`} className="hairline flex flex-col rounded-lg border p-8 hover:bg-plum-900/30">
            <h2 className="font-display text-2xl">{p.name}</h2>
            <p className="mt-2 text-ivory-200/80">{p.tagline}</p>
            <p className="mt-4 text-champagne">{packagePriceLine(p)}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ivory-200">
              {p.includes.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <span aria-hidden="true" className="mt-auto pt-5 text-champagne">→</span>
          </Link>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-sm text-ivory-200">{PACKAGE_VISIT_NOTE}</p>
      <p className="mt-6 text-sm">
        <Link href="/medications" className="text-champagne hover:text-ivory">See every medication on its own →</Link>
      </p>
      <p className="mt-8 text-xs leading-relaxed text-ivory-200/60">{COMPOUNDED_NOTICE}</p>
      <p className="mt-3 text-xs leading-relaxed text-ivory-200/60">Prices apply outside North Dakota and Ohio. This page is general information, not medical advice.</p>
    </Container>
  );
}
