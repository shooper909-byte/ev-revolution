import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { mrsExperiences } from "@/lib/mrsCollection";

export const metadata: Metadata = {
  title: "The Mrs. Collection",
  description: "Meet Mrs. Jones, Mrs. Golden and Mrs. Robinson. Three stories, with care chosen for your individual needs.",
};

export default function MrsCollectionPage() {
  return (
    <main className="bg-onyx text-ivory">
      <Container className="py-16 sm:py-24">
        <Eyebrow>The Mrs. Collection</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">Three experiences. One private standard of care.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-ivory-200">Find the story that speaks to you, then explore the same care plans across all three collections. Your background never determines your eligibility or treatment.</p>
        <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-4" aria-hidden="true">
          {mrsExperiences.map((item, index) => <Image key={item.slug} src={item.image} alt="" width={1122} height={1402} priority={index === 1} sizes="(min-width: 1024px) 24vw, 33vw" className={`h-[240px] w-full rounded-t-[5rem] object-cover object-top sm:h-[480px] ${index === 1 ? "mt-6" : ""}`} />)}
        </div>
      </Container>
      <section className="border-t border-champagne/30 bg-onyx-900">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-6 lg:grid-cols-3">
            {mrsExperiences.map((item) => (
              <article key={item.slug} className="flex flex-col overflow-hidden rounded-2xl border border-champagne/40 bg-onyx">
                <Image src={item.image} alt={item.imageAlt} width={1122} height={1402} sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-[4/3] w-full object-cover object-top" />
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="font-display text-3xl text-champagne">{item.name}</h2>
                  <p className="mt-3 font-display text-xl">{item.eyebrow}</p>
                  <p className="mt-5 flex-1 text-sm leading-7 text-ivory-200">{item.description}</p>
                  <p className="mt-5 font-display text-xl text-ivory">Starting at {item.startingAt}</p>
                  <ul className="mt-4 space-y-2 text-sm text-ivory-200">{item.recommendedPlans.map((plan) => <li key={`${plan.name}-${plan.price}`}>{plan.name} · {plan.price}</li>)}</ul>
                  <Link href={`/packages/${item.slug}`} className="brand-eyebrow mt-7 inline-block text-xs text-champagne">Explore {item.name} →</Link>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-ivory-200">The collection introduces our care pathways. See each plan’s inclusions and price before requesting treatment.</p>
          <div className="mt-6 text-center"><Link href="/care" className="button-sheen brand-eyebrow inline-block rounded-full bg-champagne px-8 py-4 text-xs text-onyx">View all care plans</Link></div>
        </Container>
      </section>
    </main>
  );
}
