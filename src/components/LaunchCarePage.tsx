import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Reveal } from "@/components/Reveal";
import { TreatmentRequestPanel } from "@/components/TreatmentRequestPanel";
import { PlanCards, type Plan } from "@/components/care/PlanCards";
import { Steps } from "@/components/care/Steps";
import type { LaunchCareCategory } from "@/lib/launchCare";

const howItWorks: [string, string][] = [
  ["Choose your plan", "Choose the care pathway you would like to request. You are not purchasing a prescription."],
  ["Complete a short pre-screen", "Answer a few private, high-level questions. Those answers stay in your browser and are not submitted."],
  ["A licensed provider reviews", "Complete the secure clinical intake. A licensed clinician decides whether treatment is appropriate."],
  ["Discreet delivery", "If approved and enrolled, the pharmacy coordinates discreet shipment and the secure portal manages follow-up."],
];

function toPlanCard(plan: LaunchCareCategory["plans"][number]): Plan {
  const monthlyPrice = plan.monthly.replace(" / month", "");
  return {
    id: plan.id,
    title: plan.title,
    price: monthlyPrice,
    priceNote: "/month",
    description: plan.description,
    includes: plan.includes,
    treatments: plan.treatment,
    cta: "Request this treatment",
    href: "#pre-screen",
    footnote: `3-month option: ${plan.prepaid}`,
    featured: plan.featured,
    badge: plan.badge,
  };
}

export function LaunchCarePage({ category }: { category: LaunchCareCategory }) {
  const planCards = category.plans.map(toPlanCard);

  return (
    <div className="overflow-x-clip">
      <section className="relative isolate overflow-hidden border-b border-onyx-700 bg-onyx">
        <Image src={category.heroImage} alt={category.heroAlt} fill priority sizes="100vw" className="-z-20 object-cover object-[67%_center]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,11,11,0.98)_0%,rgba(8,11,11,0.9)_43%,rgba(8,11,11,0.34)_70%,rgba(8,11,11,0.16)_100%)]" />
        <Container className="relative py-20 sm:py-28 lg:py-36">
          <nav aria-label="Breadcrumb" className="brand-eyebrow text-[0.5625rem] text-taupe">
            <Link href="/care" className="transition-colors hover:text-champagne">Care</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page" className="text-ivory-200">{category.label}</span>
          </nav>
          <div className="mt-10 max-w-3xl">
            <Eyebrow>{category.eyebrow}</Eyebrow>
            <h1 className="mt-7 font-display text-[2.7rem] leading-[1.04] text-ivory sm:text-6xl lg:text-7xl">
              {category.headline}
              <span className="mt-2 block italic text-mauve">{category.highlightedHeadline}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-ivory-200/90 sm:text-lg">{category.intro}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#plans" className="button-sheen brand-eyebrow bg-plum px-8 py-4 text-center text-[0.625rem] text-ivory transition-colors hover:bg-plum-600">See treatment options</a>
              <a href="#pre-screen" className="hairline brand-eyebrow border px-8 py-4 text-center text-[0.625rem] text-champagne transition-colors hover:bg-onyx-800">Start a private request</a>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-onyx/10 bg-ivory">
        <Container className="grid gap-12 py-20 lg:grid-cols-[0.75fr_1.25fr] lg:py-24">
          <Reveal>
            <Eyebrow className="text-plum">Who it’s for</Eyebrow>
            <h2 className="mt-6 font-display text-[2.25rem] leading-tight text-onyx sm:text-5xl">A path for the woman you are right now.</h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-onyx/10 bg-onyx/10 sm:grid-cols-2">
            {category.whoItsFor.map((item, index) => (
              <Reveal key={item} delay={index * 60} className="bg-ivory p-7 sm:p-8">
                <span className="brand-eyebrow text-[0.5625rem] text-plum">0{index + 1}</span>
                <p className="mt-4 font-display text-xl leading-snug text-onyx">{item}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {category.gallery && (
        <section aria-label={`${category.label} portraits and scenes`} className="border-b border-onyx/10 bg-ivory">
          <Container className="py-8 sm:py-12">
            <div className={`grid gap-4 ${category.gallery.length > 2 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>
              {category.gallery.map((item) => (
                <div key={item.image} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-onyx-900">
                  <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-onyx-800/60">Campaign imagery is illustrative. Models are not presented as patients or clinicians.</p>
          </Container>
        </section>
      )}

      <section id="plans" aria-labelledby="plans-heading" className="scroll-mt-24 border-b border-onyx/10 bg-ivory-200/40">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <Eyebrow className="text-plum">Treatment options</Eyebrow>
            <h2 id="plans-heading" className="mt-6 max-w-3xl font-display text-[2.25rem] leading-tight text-onyx sm:text-5xl">Choose a plan to request.</h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-onyx-800/75">Every published price is all-in after approval: medication if prescribed, asynchronous provider review, shipping and secure messaging. Required labs are quoted separately.</p>
          </Reveal>
          <PlanCards plans={planCards} />

          {category.addOns && (
            <div className="mt-10 rounded-3xl border border-plum/20 bg-ivory px-6 py-6 sm:px-8">
              <p className="brand-eyebrow text-plum">Add-ons</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {category.addOns.map((item) => <p key={item.name} className="text-sm text-onyx-800/80"><span className="font-medium text-onyx">{item.name}</span><span className="mx-2 text-taupe">·</span>{item.price}</p>)}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-onyx-800/65">Add-ons selected with the first order may share one provider review and shipment. Adding an item later may require a new review.</p>
            </div>
          )}
        </Container>
      </section>

      {category.waitlist && (
        <section className="border-b border-onyx-700 bg-onyx-900">
          <Container className="grid gap-12 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:py-24">
            <Reveal>
              <Eyebrow>Not available yet</Eyebrow>
              <h2 className="mt-6 font-display text-[2.25rem] leading-tight text-ivory sm:text-5xl">A thoughtful waitlist, not a checkout.</h2>
              <p className="mt-6 text-base leading-relaxed text-ivory-200/85">These items are not listed for purchase or treatment request. Join the email waitlist for future availability updates only.</p>
              <div className="mt-8"><NewsletterSignup source="waitlist" hint="Email only. We’ll share a future availability update, not a treatment offer." /></div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.waitlist.map((item, index) => (
                <Reveal key={item.name} delay={index * 55}>
                  <article className="h-full rounded-2xl border border-ivory-300/15 bg-onyx px-5 py-6">
                    <p className="brand-eyebrow text-[0.5625rem] text-champagne">Waitlist only</p>
                    <h3 className="mt-4 font-display text-2xl text-ivory">{item.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-ivory-200/75">{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {category.bundles && (
        <section className="border-b border-onyx-700 bg-onyx">
          <Container className="py-20 sm:py-24">
            <Reveal className="max-w-3xl">
              <Eyebrow>Bundle and save time</Eyebrow>
              <h2 className="mt-6 font-display text-[2.25rem] leading-tight text-ivory sm:text-5xl">One coordinated review. One considered plan.</h2>
              <p className="mt-6 text-base leading-relaxed text-ivory-200/85">Bundles group clinically appropriate requests under one multi-service provider review and coordinated shipment. The Signature option is highlighted, not assumed to be right for everyone.</p>
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {category.bundles.map((bundle, index) => (
                <Reveal key={bundle.title} delay={index * 80} className="h-full">
                  <article className={`flex h-full flex-col rounded-3xl border p-8 sm:p-9 ${bundle.featured ? "border-champagne bg-plum-900 text-ivory" : "border-ivory-300/20 bg-onyx-900 text-ivory"}`}>
                    <p className="brand-eyebrow text-[0.5625rem] text-champagne">{bundle.label}</p>
                    <h3 className="mt-5 font-display text-4xl">{bundle.title}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory-200/85">{bundle.body}</p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {bundle.semaglutidePrice && <p className="rounded-2xl bg-onyx/30 px-4 py-3 text-sm text-ivory-200"><span className="block text-xs text-ivory-200/65">Semaglutide base</span><span className="mt-1 block font-display text-xl text-champagne">{bundle.semaglutidePrice}</span></p>}
                      {bundle.tirzepatidePrice && <p className="rounded-2xl bg-onyx/30 px-4 py-3 text-sm text-ivory-200"><span className="block text-xs text-ivory-200/65">Tirzepatide base</span><span className="mt-1 block font-display text-xl text-champagne">{bundle.tirzepatidePrice}</span></p>}
                      {bundle.price && <p className="rounded-2xl bg-onyx/30 px-4 py-3 text-sm text-ivory-200"><span className="block text-xs text-ivory-200/65">Monthly</span><span className="mt-1 block font-display text-xl text-champagne">{bundle.price}</span></p>}
                    </div>
                    <ul className="mt-7 grid gap-3 text-sm leading-relaxed text-ivory-200/85">
                      {bundle.includes.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-champagne">✦</span>{item}</li>)}
                    </ul>
                    <a href="#pre-screen" className="button-sheen brand-eyebrow mt-auto rounded-full bg-champagne px-7 py-4 text-center text-[0.625rem] text-onyx transition-colors hover:bg-champagne-200">Request this bundle</a>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {category.relatedCare && (
        <section className="border-b border-onyx/10 bg-ivory">
          <Container className="py-14 sm:py-16">
            <div className="flex flex-col justify-between gap-6 rounded-3xl border border-plum/20 bg-ivory-200/55 p-7 sm:flex-row sm:items-center sm:p-9">
              <div><p className="brand-eyebrow text-plum">Related care</p><p className="mt-3 max-w-2xl text-sm leading-relaxed text-onyx-800/75">{category.relatedCare.body}</p></div>
              <Link href={category.relatedCare.href} className="button-sheen brand-eyebrow shrink-0 rounded-full bg-plum px-6 py-3 text-center text-[0.5625rem] text-ivory transition-colors hover:bg-plum-600">{category.relatedCare.label}</Link>
            </div>
          </Container>
        </section>
      )}

      <section className="border-b border-onyx/10 bg-ivory">
        <Container className="py-20 sm:py-24">
          <Reveal className="max-w-3xl">
            <Eyebrow className="text-plum">How it works</Eyebrow>
            <h2 className="mt-6 font-display text-[2.25rem] leading-tight text-onyx sm:text-5xl">Clear steps, no pressure.</h2>
          </Reveal>
          <Steps steps={howItWorks} />
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-onyx-900">
        <Container className="grid gap-12 py-20 lg:grid-cols-[0.75fr_1.25fr] lg:py-24">
          <Reveal>
            <Eyebrow>Pricing clarity</Eyebrow>
            <h2 className="mt-6 font-display text-[2.25rem] leading-tight text-ivory sm:text-5xl">What your plan price includes.</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Medication if prescribed", "Asynchronous provider review", "Discreet shipping", "Secure care-team messaging"].map((item) => <div key={item} className="rounded-2xl border border-ivory-300/15 bg-onyx p-5 text-sm text-ivory-200">{item}</div>)}
            </div>
            <p className="mt-7 text-sm leading-relaxed text-ivory-200/80">Labs are quoted separately only when required. {category.labNote ?? "Your clinician explains any required lab work during the secure intake."}</p>
            <p className="mt-4 text-xs leading-relaxed text-ivory-200/60">The private pre-screen and treatment request below do not take payment or authorize a card. Payment authorization, renewal terms, cancellation and refund details belong in the secure enrollment flow after clinical approval.</p>
          </Reveal>
        </Container>
      </section>

      <section id="pre-screen" aria-labelledby="pre-screen-heading" className="scroll-mt-24 border-b border-onyx-700 bg-[radial-gradient(circle_at_15%_20%,rgba(111,41,87,0.32),transparent_35%),var(--color-onyx)]">
        <Container className="grid gap-12 py-20 lg:grid-cols-[0.75fr_1.25fr] lg:py-24">
          <Reveal>
            <Eyebrow>Start here</Eyebrow>
            <h2 id="pre-screen-heading" className="mt-6 font-display text-[2.25rem] leading-tight text-ivory sm:text-5xl">Request this treatment privately.</h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory-200/85">This free pre-screen helps us keep the public request flow simple. It does not make a medical decision, accept payment, or replace your clinician’s secure assessment.</p>
          </Reveal>
          <Reveal delay={80}><TreatmentRequestPanel category={category} /></Reveal>
        </Container>
      </section>

      <section className="border-b border-onyx/10 bg-ivory">
        <Container className="grid gap-12 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:py-24">
          <Reveal><Eyebrow className="text-plum">Questions</Eyebrow><h2 className="mt-6 font-display text-[2.25rem] leading-tight text-onyx sm:text-5xl">{category.label} FAQ</h2></Reveal>
          <div className="divide-y divide-onyx/15 border-y border-onyx/15">
            {category.faq.map(([question, answer]) => <details key={question} className="group"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg text-onyx [&::-webkit-details-marker]:hidden">{question}<span aria-hidden="true" className="text-plum transition-transform motion-safe:group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-6 text-sm leading-relaxed text-onyx-800/80">{answer}</p></details>)}
          </div>
        </Container>
      </section>

      <section className="bg-plum-900">
        <Container className="py-12 sm:py-14">
          <p className="brand-eyebrow text-champagne">Important disclosure</p>
          <p className="mt-4 max-w-5xl text-sm leading-relaxed text-ivory-200/90">Prescription treatment is not guaranteed and requires evaluation by a licensed clinician. Compounded medications are not FDA-approved. Services vary by state.</p>
        </Container>
      </section>
    </div>
  );
}
