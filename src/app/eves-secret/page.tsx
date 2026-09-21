import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { tiers } from "@/lib/evesSecret";

const canonical = "https://www.evevolutionhealth.com/eves-secret";
const CTA_HREF = "/contact";

export const metadata: Metadata = {
  title: { absolute: "Eve’s Secret™ Desire, Comfort & Confidence | Eve’s Sisters" },
  description: "Private, clinician-guided support for women’s desire, arousal, intimate comfort, beauty and confidence.",
  alternates: { canonical },
  openGraph: { title: "Eve’s Secret™ | Eve’s Sisters", description: "Desire. Comfort. And the face in the mirror.", url: canonical, type: "website" },
};

const areas = [
  { title: "Desire", heading: "Wanting to want it is still wanting it", body: "There are now three real medical options for low desire in women, and most women have never been offered one." },
  { title: "Arousal & Comfort", heading: "If it hurts, nothing else matters", body: "Dryness and pain with sex are the most treatable things on this page — and the most ignored." },
  { title: "Beauty", heading: "Feeling beautiful isn’t vanity", body: "It’s half of feeling desirable. We treat it like the clinical thing it is." },
  { title: "Confidence", heading: "Desire lives in the body and the head", body: "We work both." },
] as const;

const addOns = [
  { name: "Even Tone", detail: "melasma/PIH regimen, phototype-matched", price: "$79/mo" },
  { name: "Radiance Rx", detail: "retinoid + brightening + barrier", price: "$79/mo" },
  { name: "Lash & Brow", detail: "prescription lash serum", price: "$39/mo" },
  { name: "Crown", detail: "hair thinning protocol", price: "$59/mo" },
  { name: "Afterglow", detail: "postpartum / post-cancer intimacy recovery", price: "$89/mo" },
  { name: "Together", detail: "partner add-on", price: "$69/mo" },
] as const;

function DesireCheckLink({ className = "" }: { className?: string }) {
  return <Link href={CTA_HREF} className={`button-sheen brand-eyebrow inline-flex min-h-12 items-center justify-center rounded-full bg-champagne px-8 py-4 text-center text-[0.625rem] text-onyx transition-colors hover:bg-champagne-200 focus-visible:bg-champagne-200 ${className}`}>Take the 5-question desire check <span aria-hidden="true" className="ml-3">&rarr;</span></Link>;
}

export default function EvesSecretPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-champagne/30 bg-[radial-gradient(circle_at_80%_25%,color-mix(in_oklab,var(--color-plum)_45%,transparent),transparent_38%),var(--color-onyx)]">
        <Container className="relative py-24 sm:py-32 lg:py-40"><Reveal className="max-w-4xl"><Eyebrow>Eve’s Secret™</Eyebrow><h1 className="mt-6 font-display text-5xl leading-[1.02] text-ivory sm:text-7xl">Some things are better shared between sisters.</h1><p className="mt-7 font-display text-2xl text-champagne sm:text-4xl">Desire. Comfort. And the face in the mirror.</p><p className="mt-8 max-w-3xl text-base leading-8 text-ivory-200 sm:text-lg">Your sex drive didn’t disappear because something’s wrong with you. It changed because your hormones, your prescriptions, and your life changed — and almost no one has offered to look. We look.</p><div className="mt-10"><DesireCheckLink /></div></Reveal></Container>
      </section>

      <section className="bg-ivory text-onyx"><Container className="py-20 sm:py-24"><Reveal className="max-w-3xl"><Eyebrow className="text-plum">What Eve’s Secret is for</Eyebrow><h2 className="mt-5 font-display text-4xl sm:text-5xl">How she feels about her body.</h2><p className="mt-6 text-lg leading-8 text-onyx-700">Mrs. Collection is for how she feels in her body. Eve’s Secret is for how she feels about her body.</p></Reveal><div className="mt-12 grid gap-px bg-champagne-700/35 sm:grid-cols-2 lg:grid-cols-4">{areas.map((area, index) => <Reveal key={area.title} delay={index * 60} className="h-full bg-ivory p-7 sm:p-8"><p className="brand-eyebrow text-[0.5625rem] text-plum">{area.title}</p><h3 className="mt-5 font-display text-2xl leading-snug">{area.heading}</h3><p className="mt-4 text-sm leading-7 text-onyx-700">{area.body}</p></Reveal>)}</div></Container></section>

      <section className="border-y border-champagne/30 bg-onyx-900"><Container className="py-20 sm:py-24"><Reveal className="text-center"><Eyebrow>Choose your level of support</Eyebrow><h2 className="mt-5 font-display text-4xl text-ivory sm:text-5xl">A spark. A flame. The whole fire.</h2></Reveal><div className="mt-12 grid gap-6 lg:grid-cols-3">{tiers.map((tier, index) => <Reveal key={tier.id} delay={index * 70} className="h-full"><article className={`relative flex h-full flex-col rounded-2xl border p-7 sm:p-8 ${tier.badge ? "border-champagne bg-plum-900 text-ivory" : "border-ivory-300/25 bg-onyx text-ivory"}`}>{tier.badge && <span className="brand-eyebrow absolute right-5 top-5 rounded-full bg-champagne px-3 py-2 text-[0.5rem] text-onyx">{tier.badge}</span>}<p className="brand-eyebrow text-[0.5625rem] text-champagne">{tier.tagline}</p><h3 className="mt-5 font-display text-4xl">{tier.name}</h3><p className="mt-3 font-display text-3xl">${tier.price}<span className="ml-1 font-sans text-sm text-ivory-200/70">/{tier.cadence}</span></p>{tier.prepay && <p className="mt-2 text-sm text-ivory-200/70">{tier.prepay.label}: ${tier.prepay.total}</p>}<ul className="mt-8 flex-1 space-y-4">{tier.features.map((feature) => <li key={feature} className="flex gap-3 text-sm leading-relaxed text-ivory-200"><span aria-hidden="true" className="text-champagne">◆</span><span>{feature}</span></li>)}</ul><DesireCheckLink className="mt-9 w-full" /></article></Reveal>)}</div></Container></section>

      <section className="bg-ivory text-onyx"><Container className="py-20 sm:py-24"><Reveal className="text-center"><Eyebrow className="text-plum">Focused add-ons</Eyebrow><h2 className="mt-5 font-display text-4xl sm:text-5xl">Make it even more yours.</h2></Reveal><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{addOns.map((item, index) => <Reveal key={item.name} delay={index * 45} className="flex h-full flex-col border border-champagne-700/45 p-6"><h3 className="font-display text-2xl">{item.name}</h3><p className="mt-3 flex-1 text-sm leading-6 text-onyx-700">{item.detail}</p><p className="brand-eyebrow mt-6 text-plum">{item.price}</p></Reveal>)}</div></Container></section>

      <section className="border-t border-champagne/30 bg-[linear-gradient(115deg,var(--color-plum-900),var(--color-onyx)_65%)] text-center"><Container className="py-20 sm:py-24"><Reveal><Eyebrow>Private. Specific. Never dismissed.</Eyebrow><h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl text-ivory sm:text-5xl">Start with five questions. Decide what comes next.</h2><div className="mt-9"><DesireCheckLink /></div><p className="mx-auto mt-12 max-w-4xl text-xs leading-6 text-ivory-200/70">Services and treatment options vary by state and provider. Prescriptions and testing require an independent evaluation by a licensed clinician and are never guaranteed. Medication, laboratory, therapy, and pharmacy charges may be separate. Individual results vary.</p></Reveal></Container></section>
    </>
  );
}
