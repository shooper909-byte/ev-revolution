import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { publicPillars, careLabel } from "@/lib/pillars";
import { telehealthUrl, handoffNote } from "@/lib/telehealth";

export const metadata: Metadata = { title: "Services", description: "Explore Eve’s Sisters wellness pathways and our plans for inclusive gender-affirming care.", alternates: { canonical: "/services" } };
export default function ServicesPage() {
  return <Container className="py-16 sm:py-24"><Eyebrow>Wellness, with you at the center</Eyebrow><h1 className="mt-6 font-display text-5xl">Explore our services</h1><p className="mt-6 max-w-2xl text-ivory-200">Explore established wellness pathways on our separate telehealth platform, or learn about the inclusive care services we’re developing.</p>
    <article className="hairline my-12 rounded-lg border bg-plum-900/40 p-8 sm:p-12"><p className="brand-eyebrow text-champagne">Planned service · Early access</p><h2 className="mt-5 font-display text-3xl sm:text-4xl">Gender-Affirming Care & LGBTQ+ Wellness</h2><p className="mt-5 max-w-2xl text-ivory-200">All bodies. All identities. All welcome. Discover our vision for feminizing care, masculinizing care, nonbinary and individualized care, and whole-person wellness.</p><p className="mt-4 max-w-2xl text-sm text-ivory-200">These services are under development. A clinical partner has not yet been contracted, and treatment and purchases are not available.</p><Link href="/gender-affirming-care" className="mt-7 inline-flex min-h-12 items-center border-b border-champagne text-champagne">Explore Gender-Affirming Care <span aria-hidden="true" className="ml-5">→</span></Link></article>
    <h2 className="font-display text-3xl">More wellness pathways</h2><p className="mt-4 text-sm text-ivory-200">{handoffNote} Availability and eligibility are confirmed by that platform and its clinicians.</p><div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{publicPillars.map(pillar => <a key={pillar.slug} href={telehealthUrl(pillar.carePath)} className="hairline block rounded-lg border p-7 transition-colors hover:bg-plum-900/30"><h3 className="font-display text-2xl">{careLabel(pillar)}</h3><p className="mt-4 text-sm text-champagne">Explore on the telehealth platform ↗</p></a>)}</div>
  </Container>;
}
