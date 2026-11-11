import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Plain-language guides to perimenopause, menopause hormone therapy, GLP-1 care and intimacy for women, with the questions to ask a clinician.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <Container className="py-16 sm:py-24">
      <Eyebrow>Clear information. Thoughtful support.</Eyebrow>
      <h1 className="mt-6 font-display text-5xl">Guides</h1>
      <p className="mt-6 max-w-2xl text-ivory-200">
        Evidence-led explanations of the changes women ask us about most, and the questions worth bringing to a clinician.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {guides.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="hairline rounded-lg border p-8 hover:bg-plum-900/30">
            <p className="brand-eyebrow text-champagne">{g.readingTime} read</p>
            <h2 className="mt-4 font-display text-2xl">{g.title}</h2>
            <p className="mt-4 text-ivory-200">{g.description}</p>
            <span aria-hidden="true" className="mt-5 block text-champagne">→</span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
