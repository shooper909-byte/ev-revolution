import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { CareLeadForm } from "@/components/CareLeadForm";
import type { MrsExperience } from "@/lib/mrsCollection";

const pathways = [
  { href: "/care/weight-management", label: "Weight Management" },
  { href: "/care/hormones-menopause", label: "Menopause & Hormones" },
  { href: "/care/skin-beauty", label: "Skin & Beauty" },
  { href: "/eves-secret", label: "Eve’s Secret" },
];

export function MrsEditorialPage({ experience }: { experience: MrsExperience }) {
  return (
    <main className="bg-onyx text-ivory">
      <section className="border-b border-champagne/30">
        <Container className="grid items-center gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-20">
          <div>
            <Eyebrow>The {experience.name} Collection</Eyebrow>
            <h1 className="mt-6 max-w-xl font-display text-5xl leading-tight sm:text-7xl">{experience.eyebrow}</h1>
            <p className="mt-6 font-display text-2xl text-champagne">{experience.tagline}</p>
            <p className="mt-6 max-w-xl leading-8 text-ivory-200">{experience.description}</p>
            <Link href="#consultation" className="button-sheen brand-eyebrow mt-9 inline-block rounded-full bg-champagne px-8 py-4 text-xs text-onyx">Begin your private consultation</Link>
          </div>
          <Image src={experience.image} alt={experience.imageAlt} width={1122} height={1402} priority sizes="(min-width: 1024px) 55vw, 100vw" className="max-h-[760px] w-full rounded-2xl object-cover object-top" />
        </Container>
      </section>
      <section className="bg-onyx-900">
        <Container className="py-16 sm:py-24">
          <Eyebrow>Choose your care</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-4xl sm:text-5xl">The plan is yours to choose.</h2>
          <p className="mt-6 max-w-3xl leading-8 text-ivory-200">The Mrs. Collection is an introduction to Eve’s Sisters, available to women of every background. Each care page lists its own plans and prices. A licensed clinician determines whether any treatment is appropriate.</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-ivory-200/75">Individual results vary. A consultation request creates no charge, enrollment, or prescription. Any medication-inclusive amount is authorized and captured only after provider approval.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {pathways.map((item) => <Link key={item.href} href={item.href} className="rounded-2xl border border-champagne/30 bg-onyx p-7 font-display text-2xl text-champagne transition-colors hover:bg-plum-900">{item.label} →</Link>)}
          </div>
          <Link href="/packages/mrs-collection" className="brand-eyebrow mt-10 inline-block text-xs text-ivory-200">See all three collections →</Link>
        </Container>
      </section>
      <section id="consultation" aria-labelledby="mrs-consultation-heading" className="scroll-mt-24 border-t border-champagne/30 bg-onyx">
        <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Private consultation request</Eyebrow>
            <h2 id="mrs-consultation-heading" className="mt-5 font-display text-4xl sm:text-5xl">Begin with {experience.name}.</h2>
            <p className="mt-6 max-w-xl leading-8 text-ivory-200">Choose the collection level you want to discuss. This form collects contact details only and creates no charge.</p>
          </div>
          <CareLeadForm program={experience.slug} labelledBy="mrs-consultation-heading" privacyNote="Contact details only. Please do not submit symptoms, medications, or medical history here." />
        </Container>
      </section>
    </main>
  );
}
