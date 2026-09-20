import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { collectionDisclaimer, mrsExperiences } from "@/lib/mrsCollection";
import { PackageComparison } from "@/components/PackageComparison";

const canonical = "https://evevolutionhealth.com/packages/mrs-collection";
const consultationHref = "/care/weight-management#get-started";

export const metadata: Metadata = {
  title: "The Mrs. Collection",
  description: "Three private, personalized women’s wellness experiences for every shade, every stage, and every definition of confidence.",
  alternates: { canonical },
  openGraph: { title: "The Mrs. Collection | Eve’s Sisters", description: "Three experiences. One private standard of care.", url: canonical, type: "website" },
};

export default function MrsCollectionPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-champagne/35 bg-[radial-gradient(circle_at_70%_40%,color-mix(in_oklab,var(--color-plum)_38%,transparent),transparent_45%),var(--color-onyx)]">
        <Container className="grid max-w-[1366px] items-center gap-10 py-16 sm:py-24 lg:grid-cols-[0.78fr_1.22fr] lg:py-28">
          <Reveal>
            <Eyebrow>The Mrs. Collection</Eyebrow>
            <h1 className="mt-5 font-display text-5xl leading-[0.98] text-ivory sm:text-7xl">Three experiences. One private standard of care.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-ivory-200">Every woman carries a different story. Explore three personalized wellness collections created around changing bodies, evolving priorities, and the care women deserve at every stage.</p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ivory-200/85">Choose the experience that speaks to you. Your care will always be personalized according to your health history, goals, and clinician’s assessment—not your race or appearance.</p>
            <Link href="#experiences" className="button-sheen brand-eyebrow mt-9 inline-flex rounded-full bg-champagne px-8 py-4 text-[0.625rem] text-onyx">Enter the Mrs. Collection <span aria-hidden="true" className="ml-3">&darr;</span></Link>
          </Reveal>
          <div className="grid grid-cols-3 gap-2 sm:gap-4" aria-hidden="true">
            {mrsExperiences.map((item, index) => <Image key={item.slug} src={item.image} alt="" width={1122} height={1402} priority={index === 1} sizes="(min-width: 1024px) 24vw, 33vw" className={`h-[340px] w-full rounded-t-[5rem] object-cover object-top sm:h-[540px] ${index === 1 ? "mt-8" : ""}`} />)}
          </div>
        </Container>
      </section>

      <section className="border-y border-champagne/30 bg-onyx-900">
        <Container className="max-w-[1366px] py-20 sm:py-24">
          <Reveal className="text-center"><Eyebrow>Compare membership levels</Eyebrow><h2 className="mt-5 font-display text-4xl text-ivory sm:text-5xl">Essentials, Signature, and Elite.</h2><p className="mx-auto mt-5 max-w-2xl leading-7 text-ivory-200">One consistent membership structure across all three collections, personalized during your clinical intake.</p></Reveal>
          <div className="mt-12"><PackageComparison compact /></div>
        </Container>
      </section>

      <section id="experiences" className="scroll-mt-24 bg-onyx-900">
        <Container className="max-w-[1366px] py-20 sm:py-24">
          <Reveal className="text-center"><Eyebrow>Every shade. Every stage. Every woman.</Eyebrow><h2 className="mt-5 font-display text-4xl text-ivory sm:text-5xl">Choose the experience that speaks to you.</h2></Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {mrsExperiences.map((item, index) => (
              <Reveal key={item.slug} delay={index * 70} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-champagne/55 bg-onyx">
                  <Image src={item.image} alt={item.imageAlt} width={1122} height={1402} sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-[4/3] w-full object-cover object-top" />
                  <div className="flex flex-1 flex-col p-7">
                    <p className="brand-eyebrow text-[0.5625rem] text-champagne">{item.eyebrow}</p>
                    <h3 className="mt-4 font-display text-4xl text-ivory">{item.name}</h3>
                    <p className="mt-5 flex-1 leading-7 text-ivory-200">{item.description}</p>
                    <Link href={`/packages/${item.slug}`} className="brand-eyebrow mt-7 rounded-full border border-champagne px-6 py-4 text-center text-[0.625rem] text-champagne hover:bg-champagne hover:text-onyx focus-visible:bg-champagne focus-visible:text-onyx">Explore {item.name}</Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory text-onyx">
        <Container className="py-20 text-center sm:py-24">
          <Reveal>
            <Eyebrow className="text-plum">A private circle of personalized women’s wellness</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl sm:text-5xl">They can admire the transformation. The secret belongs to us.</h2>
            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-onyx-700">You are never required to choose according to your age, race, or complexion. Choose according to the experience and priorities that feel most like you.</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="#experiences" className="brand-eyebrow rounded-full border border-plum px-8 py-4 text-[0.625rem] text-plum">Compare the Experiences</Link>
              <Link href={consultationHref} className="button-sheen brand-eyebrow rounded-full bg-plum px-8 py-4 text-[0.625rem] text-ivory">Begin Your Private Consultation</Link>
            </div>
            <p className="mx-auto mt-12 max-w-4xl text-xs leading-6 text-onyx-700">{collectionDisclaimer}</p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
