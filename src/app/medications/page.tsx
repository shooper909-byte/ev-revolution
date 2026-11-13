import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import {
  BRAND_NOTICE,
  COMPOUNDED_NOTICE,
  PRICE_ON_TELEHEALTH,
  brandMedications,
  categoryImages,
  medicationCategories,
  medicationImage,
  medicationPrices,
  medications,
  type Medication,
} from "@/lib/catalog";
import { handoffNote, telehealthUrl } from "@/lib/telehealth";

export const metadata: Metadata = {
  title: "Medications & Treatments",
  description:
    "Every medication our clinicians may prescribe, explained in plain language: compounded and brand-name GLP-1s, menopause hormone therapy, skin, hair, intimate wellness and peptides, with prices.",
  alternates: { canonical: "/medications" },
};

function MedicationCard({ m }: { m: Medication }) {
  const price = medicationPrices[m.slug];
  const img = medicationImage(m);
  return (
    <Link href={`/medications/${m.slug}`} className="hairline flex flex-col overflow-hidden rounded-lg border hover:bg-plum-900/30">
      <div className={`relative h-52 w-full ${img.product ? "bg-gradient-to-b from-plum-900/50 to-transparent" : ""}`}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={img.product ? "object-contain p-4" : "object-cover"}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
      <h3 className="font-display text-2xl">{m.name}</h3>
      <p className="brand-eyebrow mt-2 text-ivory-200/60">{m.forms.join(" · ")}</p>
      <p className="mt-3 text-sm leading-relaxed text-ivory-200">{m.summary}</p>
      <p className="mt-4 text-sm text-champagne">{price ? price.line : PRICE_ON_TELEHEALTH}</p>
      <span aria-hidden="true" className="mt-auto pt-4 text-champagne">→</span>
      </div>
    </Link>
  );
}

export default function MedicationsPage() {
  const brandSlugs = new Set(brandMedications.map((b) => b.slug));
  return (
    <Container className="py-16 sm:py-24">
      <Eyebrow>Clear information. Thoughtful support.</Eyebrow>
      <h1 className="mt-6 font-display text-5xl">Medications &amp; treatments</h1>
      <p className="mt-6 max-w-2xl text-ivory-200">
        Every medication our licensed clinicians may prescribe, explained in plain language: what it is, how it’s used, what to know first,
        and what it costs. Nothing is prescribed unless a clinician decides it is right for you.
      </p>
      <nav aria-label="Categories" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {medicationCategories.map((c) => (
          <a key={c.slug} href={`#${c.slug}`} className="text-champagne hover:text-ivory">
            {c.name}
          </a>
        ))}
        <Link href="/plans" className="text-champagne hover:text-ivory">
          Packages →
        </Link>
      </nav>

      {medicationCategories.map((c) => {
        const own = medications.filter((m) => m.category === c.slug);
        const compounded = own.filter((m) => !brandSlugs.has(m.slug));
        const brands = own.filter((m) => brandSlugs.has(m.slug));
        return (
          <section key={c.slug} id={c.slug} className="mt-16 scroll-mt-24">
            <div className="grid items-center gap-6 sm:grid-cols-[1fr_14rem]">
              <div>
                <h2 className="font-display text-4xl">{c.name}</h2>
                <p className="mt-3 max-w-3xl text-ivory-200">{c.intro}</p>
              </div>
              {categoryImages[c.slug] && (
                <div className="relative h-56 w-full overflow-hidden rounded-lg sm:h-64">
                  <Image src={categoryImages[c.slug].src} alt={categoryImages[c.slug].alt} fill sizes="(min-width: 640px) 14rem, 100vw" className="object-cover object-top" />
                </div>
              )}
            </div>
            {brands.length > 0 && <h3 className="brand-eyebrow mt-8 text-ivory-200/70">Compounded &amp; other prescriptions</h3>}
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {compounded.map((m) => (
                <MedicationCard key={m.slug} m={m} />
              ))}
            </div>
            {brands.length > 0 && (
              <>
                <h3 className="brand-eyebrow mt-10 text-ivory-200/70">Brand-name medications</h3>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {brands.map((m) => (
                    <MedicationCard key={m.slug} m={m} />
                  ))}
                </div>
              </>
            )}
            <p className="mt-6 max-w-3xl text-xs leading-relaxed text-ivory-200/60">{c.clinicalNote}</p>
          </section>
        );
      })}

      <aside className="hairline mt-16 rounded-lg border bg-plum-900/40 p-8">
        <h2 className="font-display text-2xl">Not sure which is right for you?</h2>
        <p className="mt-4 text-sm text-ivory-200">
          Start a private assessment and a licensed clinician will recommend options based on your health history.
        </p>
        <a
          href={telehealthUrl("/medications")}
          className="button-sheen brand-eyebrow mt-6 inline-block rounded-full bg-champagne px-8 py-4 text-center text-[0.625rem] text-onyx hover:bg-champagne-200"
        >
          Start your consultation <span aria-hidden="true">&rarr;</span>
        </a>
        <p className="mt-4 text-xs leading-relaxed text-ivory-200/70">{handoffNote}</p>
      </aside>

      <p className="mt-8 text-xs leading-relaxed text-ivory-200/60">{COMPOUNDED_NOTICE}</p>
      <p className="mt-3 text-xs leading-relaxed text-ivory-200/60">{BRAND_NOTICE}</p>
      <p className="mt-3 text-xs leading-relaxed text-ivory-200/60">
        Prices apply outside North Dakota and Ohio. This page is general information, not medical advice.
      </p>
    </Container>
  );
}
