import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { PackageComparison } from "@/components/PackageComparison";
import { AddOnPackGrid } from "@/components/AddOnPackGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { ClinicalDisclaimer } from "@/components/ClinicalDisclaimer";
import { collectionDisclaimer, type MrsExperience } from "@/lib/mrsCollection";

const consultationHref = "/care/weight-management#get-started";

export function MrsExperiencePage({ experience }: { experience: MrsExperience }) {
  return (
    <>
      <section className="overflow-hidden border-b border-champagne/35 bg-onyx">
        <Container className="grid max-w-[1366px] items-stretch px-0 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
            <Reveal>
              <Eyebrow>The {experience.name} Collection</Eyebrow>
              <h1 className="mt-5 max-w-xl font-display text-5xl leading-[1.02] text-ivory sm:text-7xl">{experience.eyebrow}</h1>
              <p className="mt-7 max-w-xl font-display text-2xl leading-snug text-champagne sm:text-3xl">{experience.tagline}</p>
              <p className="mt-6 max-w-xl text-base leading-8 text-ivory-200">{experience.description}</p>
              <Link href={consultationHref} className="button-sheen brand-eyebrow mt-9 inline-flex w-fit rounded-full bg-champagne px-7 py-4 text-[0.625rem] text-onyx hover:bg-champagne-200 focus-visible:bg-champagne-200">
                Begin Your Private Consultation <span aria-hidden="true" className="ml-3">&rarr;</span>
              </Link>
            </Reveal>
          </div>
          <Image src={experience.image} alt={experience.imageAlt} width={1122} height={1402} priority sizes="(min-width: 1024px) 55vw, 100vw" className="h-full max-h-[850px] w-full object-cover object-top" />
        </Container>
      </section>

      <section className="border-b border-champagne/30 bg-onyx-900">
        <Container className="max-w-[1366px] py-20 sm:py-24">
          <Reveal className="text-center"><Eyebrow>Choose your care</Eyebrow><h2 className="mt-5 font-display text-4xl text-ivory sm:text-6xl">{experience.name} Collection</h2><p className="mx-auto mt-4 max-w-2xl text-ivory-200">Three levels of personalized support, with one private standard of care.</p></Reveal>
          <div className="mt-12"><PackageComparison /></div>
          <ClinicalDisclaimer />
        </Container>
      </section>

      <section className="bg-onyx">
        <Container className="max-w-[1366px] py-20 sm:py-24">
          <Reveal className="text-center"><Eyebrow>Add-on packs for this collection</Eyebrow><h2 className="mt-5 font-display text-4xl text-ivory sm:text-5xl">Personalize your care with focused support.</h2></Reveal>
          <div className="mt-12"><AddOnPackGrid addOns={experience.addOns} /></div>
        </Container>
      </section>

      <section className="border-y border-champagne/30 bg-onyx-900">
        <Container className="max-w-[1200px] py-20 sm:py-24">
          <Reveal className="text-center"><Eyebrow>How it works</Eyebrow><h2 className="mt-5 font-display text-4xl text-ivory sm:text-5xl">Simple, supportive, and built around you.</h2></Reveal>
          <div className="mt-12"><HowItWorks /></div>
        </Container>
      </section>

      <section className="bg-ivory text-onyx">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <Reveal>
            <Eyebrow className="text-plum">Private. Personalized. Yours.</Eyebrow>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl">Care designed around your priorities.</h2>
            <p className="mt-6 text-base leading-8 text-onyx-700">Your consultation and care plan are personalized around your body, priorities, health history, and stage of life.</p>
          </Reveal>
          <Reveal direction="right">
            <h3 className="font-display text-2xl">Your personalized plan may address:</h3>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {experience.priorities.map((priority) => (
                <li key={priority} className="flex gap-3 border-t border-champagne-700/40 pt-4 leading-7"><span aria-hidden="true" className="text-champagne-700">◆</span>{priority}</li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-champagne/30 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--color-plum)_28%,transparent),transparent_48%),var(--color-onyx-900)] text-center">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <p className="brand-eyebrow text-champagne">{experience.tagline}</p>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl text-ivory sm:text-5xl">They can admire the transformation. The secret belongs to us.</h2>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={consultationHref} className="button-sheen brand-eyebrow rounded-full bg-champagne px-8 py-4 text-[0.625rem] text-onyx">Begin Your Private Consultation</Link>
              <Link href="/packages/mrs-collection" className="brand-eyebrow rounded-full border border-champagne px-8 py-4 text-[0.625rem] text-champagne hover:bg-champagne hover:text-onyx">View the Collection</Link>
            </div>
            <p className="mx-auto mt-12 max-w-4xl text-xs leading-6 text-ivory-200/70">{collectionDisclaimer}</p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
