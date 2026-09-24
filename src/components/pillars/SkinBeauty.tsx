import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import type { Pillar } from "@/lib/pillars";

/* Line pictograms for the focus bar and the steps. Drawn here rather than
   pulled in as an icon set, so they inherit the champagne stroke and stay
   consistent with the weight management page. */
type GlyphName =
  | "collagen"
  | "barrier"
  | "pigment"
  | "hair"
  | "sun"
  | "transition"
  | "calendar"
  | "plan"
  | "treatment"
  | "review";

const glyphs: Record<GlyphName, React.ReactNode> = {
  collagen: (
    <>
      <path d="M8 3c0 4 8 6 8 9s-8 5-8 9" />
      <path d="M16 3c0 4-8 6-8 9s8 5 8 9" />
    </>
  ),
  barrier: <path d="M12 3 4.5 6v5.5c0 4.5 3.1 7.7 7.5 9.5 4.4-1.8 7.5-5 7.5-9.5V6Z" />,
  pigment: (
    <>
      <circle cx="9.5" cy="12" r="6" />
      <circle cx="14.5" cy="12" r="6" />
    </>
  ),
  hair: (
    <>
      <path d="M6 21c0-7 1.5-12 6-18" />
      <path d="M12 21c0-7 1.5-12 6-18" />
      <path d="M4 21h16" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19" />
    </>
  ),
  transition: (
    <>
      <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 0 18" />
      <path d="M12 21a9 9 0 0 1-6.4-2.6" />
      <circle cx="12" cy="12" r="2.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  plan: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M9 2.5h6v3H9zM8.5 11h7M8.5 15h4.5" />
    </>
  ),
  treatment: (
    <>
      <rect x="3.2" y="9" width="17.6" height="6" rx="3" transform="rotate(-38 12 12)" />
      <path d="M9.4 14.6 14.6 9.4" />
    </>
  ),
  review: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-6M12 20V8M17 20v-9" />
    </>
  ),
};

function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  return (
    <span aria-hidden="true" className={className}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-full w-full"
      >
        {glyphs[name]}
      </svg>
    </span>
  );
}

/* The six areas this pillar covers, in the pillar record's own vocabulary
   rather than as benefit promises. */
const focusBar: { glyph: GlyphName; label: string }[] = [
  { glyph: "collagen", label: "Collagen" },
  { glyph: "barrier", label: "Barrier function" },
  { glyph: "pigment", label: "Pigment and tone" },
  { glyph: "hair", label: "Hair and scalp" },
  { glyph: "sun", label: "Sun protection" },
  { glyph: "transition", label: "Through the transition" },
];

const steps: { number: string; glyph: GlyphName; title: string; body: string }[] = [
  {
    number: "01",
    glyph: "calendar",
    title: "Choose a care option",
    body: "Start with the package that matches what you are looking for.",
  },
  {
    number: "02",
    glyph: "plan",
    title: "Complete a secure clinical evaluation",
    body: "Medical information is collected only here, never through an ordinary contact form.",
  },
  {
    number: "03",
    glyph: "treatment",
    title: "If prescribed, receive treatment at home",
    body: "A licensed clinician selects an option only when it is appropriate.",
  },
  {
    number: "04",
    glyph: "review",
    title: "Scheduled clinical reviews",
    body: "Each proposed package includes reviews with the treating clinician.",
  },
];

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

export function SkinBeauty({ pillar }: { pillar: Pillar }) {
  return (
    <>
      {/* Hero -------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-champagne/40 bg-onyx">
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
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
                className="button-sheen cta-glow hover:cta-glow-hover brand-eyebrow mt-9 inline-flex rounded-full px-7 py-4 text-[0.625rem] text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
              >
                Explore Skin Packages <span aria-hidden="true">&rarr;</span>
              </Link>

              <ul className="mt-12 grid gap-6 sm:grid-cols-3">
                {pillar.focus.map((item) => (
                  <li key={item.title}>
                    <p className="font-display text-lg leading-snug text-ivory">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ivory-200/75">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[4/5] w-full overflow-hidden bg-onyx-900">
              <Image
                src="/images/care/care-skin-beauty-v3.webp"
                alt={pillar.careImageAlt ?? "A woman photographed in close profile against an onyx background."}
                fill
                priority
                sizes="(max-width: 1023px) 92vw, 44vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* What this pillar covers ------------------------------------------- */}
      <section aria-label="What skin and beauty care covers" className="border-b border-onyx/15 bg-ivory text-onyx">
        <Container className="py-10 sm:py-12">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
            {focusBar.map((item) => (
              <li key={item.label} className="flex flex-col items-center gap-3 text-center">
                <Glyph name={item.glyph} className="block h-8 w-8 text-plum" />
                <p className="text-sm leading-snug font-medium">{item.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* More than aesthetics ---------------------------------------------- */}
      <section aria-labelledby="aesthetics-heading" className="border-b border-onyx-700 bg-onyx">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[380px] lg:min-h-[560px]">
            <Image
              src="/images/skin-beauty/hero.webp"
              alt="Three adult women of different ages and skin tones with natural skin texture."
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[62%_center]"
            />
          </div>
          <div className="flex items-center px-6 py-16 sm:px-12 lg:px-16">
            <div className="max-w-2xl">
              <Eyebrow>More than aesthetics</Eyebrow>
              <h2 id="aesthetics-heading" className="mt-6 font-display text-[2.2rem] leading-tight text-ivory sm:text-5xl">
                {pillar.tagline}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ivory-200/90">{pillar.intro}</p>
              <ul className="mt-9 space-y-4">
                {pillar.covered.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed text-ivory-200">
                    <span aria-hidden="true" className="mt-px text-champagne">&#10003;</span>
                    {line}
                  </li>
                ))}
              </ul>
              <Link
                href="#packages"
                className="button-sheen cta-glow hover:cta-glow-hover brand-eyebrow mt-10 inline-flex rounded-full px-8 py-4 text-[0.625rem] text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
              >
                See the Proposed Packages <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Question band ------------------------------------------------------ */}
      <section aria-label="The question we hear most" className="relative overflow-hidden border-b border-champagne/30">
        <Image
          src="/images/care/care-cta-silk.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(100deg,var(--color-plum-900)_10%,color-mix(in_oklab,var(--color-plum)_78%,transparent)_100%)]" />
        <Container className="relative flex flex-col items-center gap-8 py-16 text-center sm:py-20 lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="brand-eyebrow text-champagne">The question we hear most</p>
            <p className="mt-5 font-display text-[1.9rem] leading-tight text-ivory sm:text-4xl">
              &ldquo;{pillar.question}&rdquo;
            </p>
          </div>
          <Link
            href="#products"
            className="hairline brand-eyebrow shrink-0 border px-8 py-4 text-[0.625rem] text-ivory hover:bg-onyx-900/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
          >
            See the Options <span aria-hidden="true">&rarr;</span>
          </Link>
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

      <section id="products" aria-labelledby="products-heading" className="scroll-mt-24 border-b border-onyx-700 bg-onyx">
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

      {/* How it works ------------------------------------------------------ */}
      <section aria-labelledby="how-heading" className="border-b border-onyx/15 bg-ivory text-onyx">
        <Container className="py-20 sm:py-24">
          <p className="brand-eyebrow text-plum">How it works</p>
          <h2 id="how-heading" className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
            Care that starts with a conversation
          </h2>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.number}>
                <span className="inline-grid h-14 w-14 place-items-center rounded-full bg-[color-mix(in_oklab,var(--color-champagne)_24%,transparent)] text-champagne-700">
                  <Glyph name={step.glyph} className="block h-6 w-6" />
                </span>
                <p className="mt-5 font-display text-2xl text-plum">{step.number}</p>
                <p className="mt-2 font-display text-xl leading-snug">{step.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-onyx-800/70">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-12 max-w-3xl text-sm leading-relaxed text-onyx-800/70">
            Medical information is collected only within the secure clinical evaluation&mdash;not through an ordinary website contact form.
          </p>
        </Container>
      </section>

      {/* FAQ ---------------------------------------------------------------- */}
      <section aria-labelledby="faq-heading" className="border-b border-onyx-700 bg-onyx-900">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[360px] lg:min-h-[540px]">
            <Image
              src="/images/skin-beauty/clinician-telehealth.webp"
              alt="Female clinician conducting a private telehealth visit from a warm office."
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="px-6 py-16 sm:px-12 lg:px-16 lg:py-20">
            <Eyebrow>Your questions</Eyebrow>
            <h2 id="faq-heading" className="mt-5 font-display text-4xl text-ivory sm:text-5xl">Answered plainly</h2>
            <div className="mt-10 grid gap-3">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group rounded-xl border border-onyx-700 bg-onyx px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-xl text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne [&::-webkit-details-marker]:hidden">
                    {question}<span aria-hidden="true" className="text-champagne transition-transform motion-reduce:transition-none group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-6 text-sm leading-relaxed text-ivory-200/80">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing band -------------------------------------------------------- */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/care/care-cta-silk.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(100deg,var(--color-plum-900)_5%,color-mix(in_oklab,var(--color-plum)_72%,transparent)_100%)]" />
        <Container className="relative py-20 text-center sm:py-24">
          <p className="brand-eyebrow text-champagne">Your next chapter starts here</p>
          <h2 className="mt-5 font-display text-4xl text-ivory sm:text-6xl">A new chapter for your skin.</h2>
          <Link href="#packages" className="button-sheen cta-glow hover:cta-glow-hover brand-eyebrow mt-9 inline-flex rounded-full px-8 py-4 text-[0.625rem] text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne">
            Explore Your Options <span aria-hidden="true">&rarr;</span>
          </Link>
        </Container>
      </section>
    </>
  );
}
