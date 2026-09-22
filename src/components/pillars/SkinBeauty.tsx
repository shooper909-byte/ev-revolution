import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";

const packages = [
  {
    id: "skin-essentials",
    name: "Skin Essentials",
    price: "$149",
    image: "/images/skin-beauty/skin-essentials.webp",
    alt: "Unbranded ivory cream and gel tubes arranged on pale stone with plum silk.",
    summary: "Selected tretinoin cream or gel, if prescribed.",
    inclusions: "Proposed inclusions: scheduled clinical reviews and standard shipping.",
    cta: "Explore Essentials",
  },
  {
    id: "skin-signature",
    name: "Skin Signature",
    price: "$229",
    image: "/images/skin-beauty/skin-signature.webp",
    alt: "Unbranded ivory skincare jar with a champagne lid beside plum silk and flowers.",
    summary: "Selected Cashmere Cream formulation, if prescribed.",
    inclusions: "Proposed inclusions: scheduled clinical reviews and standard shipping.",
    cta: "Explore Signature",
    featured: true,
  },
];

const products = [
  {
    id: "tretinoin-cream",
    name: "Tretinoin Cream 0.02%",
    image: "/images/skin-beauty/tretinoin-cream.webp",
    alt: "Illustrative unbranded ivory cream tube on a warm stone surface.",
    package: "Proposed for Skin Essentials when selected and prescribed.",
    detail:
      "A prescription tretinoin cream option. Selection, formulation, availability and instructions are determined by the treating clinician and dispensing pharmacy.",
  },
  {
    id: "tretinoin-gel",
    name: "Tretinoin Gel 0.01%",
    image: "/images/skin-beauty/tretinoin-gel.webp",
    alt: "Illustrative unbranded slender ivory gel tube on pale stone.",
    package: "Proposed for Skin Essentials when selected and prescribed.",
    detail:
      "A prescription tretinoin gel option. Selection, formulation, availability and instructions are determined by the treating clinician and dispensing pharmacy.",
  },
  {
    id: "cashmere-cream",
    name: "Cashmere Cream",
    image: "/images/skin-beauty/cashmere-cream.webp",
    alt: "Illustrative unbranded ivory cream jar with a champagne lid and plum silk.",
    package: "Proposed for Skin Signature when selected and prescribed.",
    detail:
      "Proposed compounded formulation: caffeine / GHK-Cu / niacinamide / tretinoin. Final formulation, availability and instructions must be confirmed by the treating clinician and dispensing pharmacy before enrollment.",
  },
  {
    id: "ghk-cu-cream",
    name: "GHK-Cu Cream 0.5%",
    image: "/images/skin-beauty/ghk-cu-cream.webp",
    alt: "Illustrative unbranded ivory airless pump bottle with a champagne collar.",
    package: "Separate option; pricing is pending confirmation.",
    detail:
      "A proposed GHK-Cu cream option separate from the two packages shown above. Formulation, availability, pricing and any clinical requirements remain to be confirmed.",
  },
];

const faqs = [
  [
    "Is a prescription required?",
    "Yes for prescription treatment. A licensed clinician must complete an independent evaluation before prescribing.",
  ],
  [
    "Is treatment guaranteed?",
    "No. A clinician determines eligibility and treatment selection after evaluation; a prescription is never guaranteed.",
  ],
  [
    "What is included in each package?",
    "The proposed packages include the selected treatment, if prescribed, scheduled clinical reviews and standard shipping. Final inclusions are confirmed before enrollment.",
  ],
  [
    "How is the treatment selected?",
    "An independent licensed clinician reviews the secure clinical evaluation and selects an option only when appropriate.",
  ],
  [
    "Does availability vary by state?",
    "Yes. Clinical services, prescriptions and pharmacy fulfillment may vary by state and provider availability.",
  ],
];

export function SkinBeauty() {
  return (
    <>
      <section className="relative min-h-[650px] overflow-hidden border-b border-champagne/40 bg-onyx">
        <Image
          src="/images/skin-beauty/hero.webp"
          alt="Three adult women of different ages and skin tones with natural skin texture."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,11,.98)_0%,rgba(8,11,11,.9)_36%,rgba(8,11,11,.25)_70%,rgba(8,11,11,.08)_100%)]" />
        <Container className="relative flex min-h-[650px] items-center py-20">
          <div className="max-w-2xl">
            <Eyebrow>Skin &amp; Beauty</Eyebrow>
            <h1 className="mt-7 font-display text-[3rem] leading-[1.02] text-ivory sm:text-6xl lg:text-7xl">
              Your skin evolves.<br />
              <span className="text-champagne">Your care should too.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ivory-200">
              Explore personalized prescription skincare through independent licensed clinicians.
            </p>
            <Link
              href="#packages"
              className="button-sheen brand-eyebrow mt-9 inline-flex bg-plum px-7 py-4 text-[0.625rem] text-ivory transition-colors hover:bg-plum-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
            >
              Explore Skin Packages <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </Container>
      </section>

      <section
        id="packages"
        aria-labelledby="packages-heading"
        className="scroll-mt-24 border-b border-champagne/35 bg-[radial-gradient(circle_at_top,var(--color-plum-900),var(--color-onyx)_68%)]"
      >
        <Container className="py-20 sm:py-24">
          <div className="text-center">
            <Eyebrow>Proposed packages</Eyebrow>
            <h2 id="packages-heading" className="mt-5 font-display text-4xl text-ivory sm:text-5xl">
              Choose your skin care plan
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {packages.map((plan) => (
              <article key={plan.id} className="overflow-hidden rounded-2xl border border-champagne/65 bg-onyx-900/95">
                <div className="relative aspect-[3/2] overflow-hidden border-b border-champagne/35">
                  <Image src={plan.image} alt={plan.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                  {plan.featured && (
                    <span className="brand-eyebrow absolute right-5 top-5 rounded-full bg-champagne px-4 py-2 text-[0.55rem] text-onyx">
                      Featured Plan
                    </span>
                  )}
                </div>
                <div className="p-7 sm:p-9">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <h3 className="font-display text-3xl text-ivory">{plan.name}</h3>
                    <p className="font-display text-3xl text-ivory">
                      <span className="sr-only">Proposed price </span>{plan.price}
                      <span className="ml-1 font-sans text-sm text-ivory-200">/ month</span>
                    </p>
                  </div>
                  <ul className="mt-7 space-y-4 text-sm leading-relaxed text-ivory-200">
                    <li className="flex gap-3"><span aria-hidden="true" className="text-champagne">&#10003;</span>{plan.summary}</li>
                    <li className="flex gap-3"><span aria-hidden="true" className="text-champagne">&#10003;</span>{plan.inclusions}</li>
                  </ul>
                  <details id={`${plan.id}-details`} className="group mt-8 rounded-xl border border-plum-500/70 bg-plum/25 px-5">
                    <summary className="brand-eyebrow flex cursor-pointer list-none items-center justify-between py-4 text-[0.625rem] text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne [&::-webkit-details-marker]:hidden">
                      {plan.cta}<span aria-hidden="true" className="transition-transform motion-reduce:transition-none group-open:rotate-45">+</span>
                    </summary>
                    <div className="border-t border-plum-500/50 pb-5 pt-4 text-sm leading-relaxed text-ivory-200">
                      <p>{plan.summary}</p>
                      <p className="mt-3">{plan.inclusions}</p>
                      <p className="mt-3">Proposed pricing. Final inclusions confirmed before enrollment.</p>
                      <span aria-disabled="true" className="brand-eyebrow mt-5 inline-flex cursor-not-allowed bg-onyx-700 px-5 py-3 text-[0.55rem] text-taupe">
                        Enrollment coming soon
                      </span>
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-ivory-200/80">
            Proposed pricing. Final inclusions confirmed before enrollment.<br />
            Prescription required. Treatment is not guaranteed.
          </p>
        </Container>
      </section>

      <section aria-labelledby="products-heading" className="border-b border-onyx-700 bg-onyx">
        <Container className="py-20 sm:py-24">
          <div className="text-center">
            <Eyebrow>Product options</Eyebrow>
            <h2 id="products-heading" className="mt-5 font-display text-4xl text-ivory sm:text-5xl">
              Explore prescription skincare
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-xl border border-champagne/45 bg-onyx-900">
                <div className="relative aspect-square overflow-hidden border-b border-champagne/25">
                  <Image src={product.image} alt={product.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl leading-snug text-ivory">{product.name}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-champagne">{product.package}</p>
                  <details className="group mt-4 border-t border-onyx-700">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm text-ivory-200 underline decoration-champagne/60 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne [&::-webkit-details-marker]:hidden">
                      Learn more <span aria-hidden="true" className="text-champagne transition-transform motion-reduce:transition-none group-open:rotate-45">+</span>
                    </summary>
                    <p className="pb-5 text-xs leading-relaxed text-ivory-200/75">{product.detail}</p>
                  </details>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-7 text-center text-xs text-taupe">
            Illustrative packaging. Pharmacy packaging may differ.
          </p>
        </Container>
      </section>

      <section aria-labelledby="how-heading" className="border-b border-onyx/15 bg-ivory text-onyx">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-[520px]">
            <Image
              src="/images/skin-beauty/clinician-telehealth.webp"
              alt="Female clinician conducting a private telehealth visit from a warm office."
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex items-center px-6 py-16 sm:px-12 lg:px-16">
            <div className="max-w-2xl">
              <p className="brand-eyebrow text-plum">How it works</p>
              <h2 id="how-heading" className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                Care that starts with a conversation
              </h2>
              <ol className="mt-10 grid gap-7 sm:grid-cols-3">
                {[
                  ["01", "Choose a care option."],
                  ["02", "Complete a secure clinical evaluation."],
                  ["03", "If prescribed, receive treatment at home."],
                ].map(([number, label]) => (
                  <li key={number} className="border-t border-plum/25 pt-5">
                    <span className="font-display text-2xl text-plum">{number}</span>
                    <p className="mt-4 font-display text-xl leading-snug">{label}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-sm leading-relaxed text-onyx-800/70">
                Medical information is collected only within the secure clinical evaluation—not through an ordinary website contact form.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="border-b border-onyx-700 bg-onyx-900">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Eyebrow>Your questions</Eyebrow>
            <h2 id="faq-heading" className="mt-5 font-display text-4xl text-ivory sm:text-5xl">Answered plainly</h2>
          </div>
          <div className="grid gap-3">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group rounded-xl border border-onyx-700 bg-onyx px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-xl text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne [&::-webkit-details-marker]:hidden">
                  {question}<span aria-hidden="true" className="text-champagne transition-transform motion-reduce:transition-none group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 text-sm leading-relaxed text-ivory-200/80">{answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[radial-gradient(circle_at_center,var(--color-plum-900),var(--color-onyx)_75%)]">
        <Container className="py-20 text-center sm:py-24">
          <h2 className="font-display text-4xl text-ivory sm:text-6xl">A new chapter for your skin.</h2>
          <Link href="#packages" className="button-sheen brand-eyebrow mt-8 inline-flex bg-plum px-8 py-4 text-[0.625rem] text-ivory transition-colors hover:bg-plum-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne">
            Explore Your Options <span aria-hidden="true">&rarr;</span>
          </Link>
        </Container>
      </section>
    </>
  );
}
