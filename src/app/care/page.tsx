import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CareCard } from "@/components/CareCard";
import { Container, Eyebrow } from "@/components/Container";
import { PrincipleCarousel } from "@/components/PrincipleCarousel";
import { Reveal } from "@/components/Reveal";
import { pillars } from "@/lib/pillars";

export const metadata: Metadata = {
  title: { absolute: "Care | Eve’s Sisters Women’s Wellness" },
  description:
    "Explore Eve’s Sisters care pathways for weight management, menopause and hormones, skin and beauty, energy and performance, recovery, and longevity at every stage of life.",
  alternates: { canonical: "/care" },
  openGraph: {
    title: "Care | Eve’s Sisters Women’s Wellness",
    description:
      "Six care pathways for women’s wellness — weight management, menopause and hormones, skin and beauty, energy and performance, recovery, and longevity.",
    type: "website",
    url: "https://evevolutionhealth.com/care",
    images: ["/og-image"],
  },
  twitter: { card: "summary_large_image", images: ["/og-image"] },
};

const careSteps = [
  ["Choose Your Path", "Explore the care area that best reflects your current goals and concerns."],
  ["Tell Us About You", "Complete a private request so the care team can understand what you are looking for."],
  ["Review Your Options", "Learn about available wellness programs and, where offered, next steps for evaluation."],
  ["Continue With Support", "Stay connected through guidance, education and ongoing wellness support."],
] as const;

const careSchema = [{
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Care | Eve’s Sisters Women’s Wellness",
  url: "https://evevolutionhealth.com/care",
  description: "Six women’s wellness pathways for every stage of life.",
}, {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://evevolutionhealth.com/" },
    { "@type": "ListItem", position: 2, name: "Care", item: "https://evevolutionhealth.com/care" },
  ],
}];

const heroValues = [
  "Whole-woman approach",
  "Personalized pathways",
  "Ongoing support",
];

/* Careful language throughout: these describe how the experience is designed,
   not clinical services or appointments that have been verified as live. */
const flexibleFeatures = [
  {
    icon: "virtual" as const,
    title: "Virtual access",
    body: "Connect from wherever you are when virtual services are available.",
  },
  {
    icon: "path" as const,
    title: "Personalized pathways",
    body: "Explore wellness options aligned with your goals.",
  },
  {
    icon: "support" as const,
    title: "Ongoing support",
    body: "Stay connected throughout your wellness journey.",
  },
  {
    icon: "conversation" as const,
    title: "Real conversations",
    body: "A more thoughtful, human-centered experience.",
  },
];

const featureIcons: Record<string, React.ReactNode> = {
  virtual: (
    <>
      <rect x="2.6" y="4.4" width="18.8" height="13" rx="1.6" />
      <path d="M8 21h8M12 17.4V21" />
    </>
  ),
  path: (
    <>
      <path d="M5 20c0-4.5 3-5.5 7-6.4 3.6-.8 5.6-2.1 5.6-5.2" />
      <circle cx="5" cy="20" r="1.6" />
      <circle cx="17.6" cy="5" r="1.6" />
    </>
  ),
  support: (
    <>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v3.2a2 2 0 0 0 2 2h1V13H6a2 2 0 0 0-2 0ZM20 13v3.2a2 2 0 0 1-2 2h-1V13h1a2 2 0 0 1 2 0Z" />
    </>
  ),
  conversation: (
    <>
      <path d="M3.4 6.4a1.8 1.8 0 0 1 1.8-1.8h9.6a1.8 1.8 0 0 1 1.8 1.8v5.4a1.8 1.8 0 0 1-1.8 1.8H8l-4.6 3.4V6.4Z" />
      <path d="M18.8 9h.8a1.8 1.8 0 0 1 1.8 1.8v8.6L18 17.2h-4.6a1.8 1.8 0 0 1-1.8-1.8v-.6" />
    </>
  ),
};

/* Truthful brand pillars. The approved mockup showed numeric impact blocks;
   there are no verified figures to publish, so these state what is
   demonstrably true about the brand instead. */
const brandPillars = [
  {
    label: "Women-centered",
    body: "Built specifically around women’s wellness.",
  },
  {
    label: "Six care areas",
    body: "Connected support across the Eve’s Sisters ecosystem.",
  },
  {
    label: "Every stage",
    body: "Designed around the way women’s needs evolve.",
  },
  {
    label: "One experience",
    body: "A more unified approach to wellness.",
  },
];

export default function CarePage() {
  return (
    <div className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careSchema) }}
      />
      {/* ---------------------------------------------------------------
          Hero
          --------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-onyx-700 bg-[linear-gradient(115deg,var(--color-onyx)_0%,var(--color-onyx-900)_48%,var(--color-plum-900)_150%)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/4 hidden h-[34rem] w-[34rem] rounded-full bg-plum/15 blur-[120px] lg:block"
        />

        <Container className="relative grid items-center gap-14 py-20 lg:grid-cols-[1.12fr_minmax(0,0.88fr)] lg:gap-14 lg:py-28">
          <div>
            <div className="brand-enter">
              <Eyebrow>Our Care</Eyebrow>
            </div>

            <h1
              className="brand-enter mt-7 font-display text-[2.05rem] leading-[1.06] text-ivory sm:text-[2.9rem] lg:text-[3.1rem]"
              style={{ "--enter-delay": "90ms" } as React.CSSProperties}
            >
              Personalized Care for
              <span className="mt-2 block italic text-mauve">
                Every Chapter.
              </span>
            </h1>

            <span
              aria-hidden="true"
              className="brand-draw mt-9 block h-px w-28 bg-champagne/70"
              style={{ "--enter-delay": "200ms" } as React.CSSProperties}
            />

            <p
              className="brand-enter mt-8 max-w-lg text-base leading-relaxed text-ivory-200/85 sm:text-lg"
              style={{ "--enter-delay": "180ms" } as React.CSSProperties}
            >
              Modern women&rsquo;s wellness designed around your body, your
              goals, and every stage of life.
            </p>

            <div
              className="brand-enter mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              style={{ "--enter-delay": "270ms" } as React.CSSProperties}
            >
              <Link
                href="/care/weight-management#get-started"
                className="button-sheen brand-eyebrow group bg-plum px-8 py-4 text-center text-[0.625rem] text-ivory transition-colors hover:bg-plum-600"
              >
                Start With Weight Care
                <span
                  aria-hidden="true"
                  className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
              <Link
                href="#how-it-works"
                className="hairline brand-eyebrow border px-8 py-4 text-center text-[0.625rem] text-champagne transition-colors hover:bg-onyx-800"
              >
                How It Works
              </Link>
            </div>

            <ul
              className="brand-enter mt-14 grid gap-5 sm:grid-cols-3"
              style={{ "--enter-delay": "360ms" } as React.CSSProperties}
            >
              {heroValues.map((value) => (
                <li key={value} className="hairline border-t pt-4">
                  <span className="brand-eyebrow text-[0.5625rem] text-ivory-200">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="relative aspect-[5/6] overflow-hidden border border-onyx-700 sm:aspect-[4/5] lg:aspect-[5/7]">
              <Image
                src="/images/care/care-hero.webp"
                alt="A woman with dark curly hair wrapped in deep plum silk, head tilted back in warm light."
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="brand-settle object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(200deg,transparent_35%,color-mix(in_oklab,var(--color-onyx)_72%,transparent)_100%)]"
              />
            </div>

            <div className="mt-8 flex items-end justify-between gap-6">
              <p
                aria-hidden="true"
                className="font-display text-lg italic leading-snug text-champagne-700/80 sm:text-xl"
              >
                Care Looks Good On You.
              </p>
              <p className="brand-eyebrow shrink-0 text-right text-[0.5rem] leading-[2.2] text-taupe">
                Science.
                <br />
                Beauty.
                <br />
                Balance.
                <br />
                <span className="text-champagne-700">A brighter you.</span>
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="how-it-works" aria-labelledby="how-it-works-heading" className="scroll-mt-24 border-b border-onyx-700 bg-onyx-900">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <Eyebrow>How Eve&rsquo;s Sisters Works</Eyebrow>
            <h2 id="how-it-works-heading" className="mt-6 max-w-3xl font-display text-[2.1rem] leading-tight text-ivory sm:text-[2.75rem]">Care that begins with understanding you.</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory-200/85">Explore the right pathway, share what you are looking for and review the options currently available—without promises of automatic approval or guaranteed outcomes.</p>
          </Reveal>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {careSteps.map(([title, body], index) => <Reveal as="li" key={title} delay={index * 80}><p className="font-display text-3xl text-champagne-700">{String(index + 1).padStart(2, "0")}</p><h3 className="hairline mt-5 border-t pt-5 font-display text-2xl text-ivory">{title}</h3><p className="mt-4 text-base leading-relaxed text-ivory-200/85">{body}</p></Reveal>)}
          </ol>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/care/weight-management#get-started" className="button-sheen brand-eyebrow inline-block bg-plum px-8 py-4 text-center text-xs text-ivory transition-colors hover:bg-plum-600">Explore Intake Options</Link>
            <Link href="/treatments" className="hairline brand-eyebrow inline-block border px-8 py-4 text-center text-xs text-champagne transition-colors hover:bg-onyx-800">View Treatments &amp; Medications</Link>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Six pathways
          --------------------------------------------------------------- */}
      <section
        id="pathways"
        aria-labelledby="pathways-heading"
        className="scroll-mt-24 border-b border-onyx-700 bg-ivory"
      >
        <Container className="py-20 sm:py-28">
          <Reveal className="max-w-2xl">
            <p className="brand-eyebrow text-champagne-700">
              Explore Our Care
            </p>
            <h2
              id="pathways-heading"
              className="mt-6 font-display text-[2.1rem] leading-[1.1] text-onyx sm:text-[2.75rem]"
            >
              Six Pathways.
              <span className="block text-plum">
                A Healthier, Brighter You.
              </span>
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-onyx-800/75">
              From weight management to hormone health, skin, energy, recovery
              and longevity, Eve&rsquo;s Sisters brings women&rsquo;s wellness together
              in one thoughtfully designed experience.
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal
                as="li"
                key={pillar.slug}
                delay={(index % 3) * 90}
                className="h-full"
              >
                <CareCard pillar={pillar} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Flexible care
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="flexible-heading"
        className="border-b border-onyx-700 bg-onyx"
      >
        <div className="grid lg:grid-cols-2">
          <Reveal direction="left" className="relative">
            <div className="relative h-72 w-full sm:h-96 lg:h-full lg:min-h-[36rem]">
              <Image
                src="/images/care/care-flexible.webp"
                alt="Four generations of a family standing together in warm, soft light."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
              />
              {/* The copy sits in the lower half, so the scrim has to carry it
                  on its own — the faces in this frame are light enough that a
                  thin gradient would leave the eyebrow unreadable. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-onyx)_0%,color-mix(in_oklab,var(--color-onyx)_94%,transparent)_30%,color-mix(in_oklab,var(--color-onyx)_70%,transparent)_52%,transparent_82%)]"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
              <p className="brand-eyebrow text-champagne">
                Care that fits your life
              </p>
              <h2
                id="flexible-heading"
                className="mt-6 font-display text-[2rem] leading-[1.1] text-ivory sm:text-[2.5rem]"
              >
                Flexible.
                <br />
                Accessible.
                <br />
                <span className="text-mauve">Yours.</span>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory-200/85">
                Wellness support designed to fit your schedule, your goals, and
                your life.
              </p>
              <Link
                href="#how-it-works"
                className="brand-eyebrow group mt-8 inline-flex items-center gap-2 text-[0.5625rem] text-champagne"
              >
                How It Works
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  &rarr;
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal direction="right" className="bg-plum-900">
            <div className="grid h-full content-center gap-10 px-8 py-16 sm:px-12 sm:py-20 lg:px-14">
              {flexibleFeatures.map((feature, index) => (
                <Reveal key={feature.title} delay={index * 110}>
                  <div className="flex gap-6">
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-1 h-7 w-7 shrink-0 text-champagne"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {featureIcons[feature.icon]}
                    </svg>
                    <div>
                      <h3 className="brand-eyebrow text-[0.625rem] text-ivory">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ivory-200/80">
                        {feature.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Stronger together
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="together-heading"
        className="border-b border-onyx-700 bg-ivory"
      >
        <Container className="py-20 sm:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_minmax(0,0.95fr)]">
            <Reveal direction="left">
              <div className="relative aspect-[8/5] overflow-hidden border border-taupe/30">
                <Image
                  src="/images/care/care-together.webp"
                  alt="Four women of different ages, sizes and skin tones standing together and smiling."
                fill
                  sizes="(min-width: 1024px) 52vw, 92vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal direction="right" delay={80}>
              <p className="brand-eyebrow text-champagne-700">
                Real Women. Real Journeys.
              </p>
              <h2
                id="together-heading"
                className="mt-6 font-display text-[2.1rem] leading-[1.1] text-onyx sm:text-[2.75rem]"
              >
                Stronger Together.
              </h2>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-onyx-800/75">
                Different backgrounds. Different goals. The same desire to feel
                better, live brighter, and thrive at every stage.
              </p>

              <div className="hairline mt-12 border-t pt-10">
                <PrincipleCarousel />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section aria-labelledby="secret-heading" className="border-b border-onyx-700 bg-[radial-gradient(circle_at_80%_25%,color-mix(in_oklab,var(--color-plum)_45%,transparent),transparent_38%),linear-gradient(120deg,var(--color-onyx),var(--color-plum-900))]">
        <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <Reveal>
            <Eyebrow>The Signature Experience</Eyebrow>
            <h2 id="secret-heading" className="mt-6 font-display text-5xl text-ivory sm:text-6xl">Eve&rsquo;s Secret™</h2>
            <p className="mt-4 font-display text-2xl text-champagne">Some things are better shared between sisters.</p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory-200/90">A more elevated way to explore women&rsquo;s wellness—bringing multiple areas of care together in one thoughtfully designed experience.</p>
            <Link href="/eves-secret" className="button-sheen brand-eyebrow mt-10 inline-block bg-plum px-8 py-4 text-xs text-ivory transition-colors hover:bg-plum-600">Unlock Eve&rsquo;s Secret</Link>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative aspect-square overflow-hidden border border-champagne/30">
              <Image
                src="/images/care/care-eves-secret-collection.webp"
                alt="Eve’s Secret collection artwork: four women in plum and black, each holding a finger to her lips, above the words confidence, intimacy, beauty and wellness."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Brand pillars
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="standard-heading"
        className="border-b border-onyx-700 bg-onyx"
      >
        <Container className="py-20 sm:py-28">
          <Reveal>
            <h2
              id="standard-heading"
              className="brand-eyebrow text-center text-champagne"
            >
              The Eve&rsquo;s Sisters Standard
            </h2>
          </Reveal>

          <ul className="mt-16 grid gap-px bg-onyx-700 sm:grid-cols-2 lg:grid-cols-4">
            {brandPillars.map((item, index) => (
              <Reveal as="li" key={item.label} delay={index * 90}>
                <div className="h-full bg-onyx px-7 py-12 text-center">
                  <p className="gold-text flex min-h-[4.5rem] items-center justify-center font-display text-[1.7rem] leading-tight text-balance">
                    {item.label}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mx-auto mt-6 block h-px w-10 bg-champagne/40"
                  />
                  <p className="mt-6 text-sm leading-relaxed text-ivory-200/75">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Final CTA
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="cta-heading"
        className="relative overflow-hidden bg-onyx"
      >
        <Image
          src="/images/care/care-cta-silk.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-onyx)_88%,transparent)_0%,color-mix(in_oklab,var(--color-plum-900)_82%,transparent)_100%)]"
        />

        <Container className="relative py-24 text-center sm:py-32">
          <Reveal>
            <p className="brand-eyebrow text-champagne">A Brighter Tomorrow</p>
            <h2
              id="cta-heading"
              className="mx-auto mt-7 max-w-2xl font-display text-[2.25rem] leading-[1.08] text-ivory sm:text-[3rem]"
            >
              Your Next Chapter Starts Here.
            </h2>
            <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-ivory-200/85">
              Personalized wellness. Thoughtful support. A healthier, brighter
              you.
            </p>
            <Link
              href="/care/weight-management#get-started"
              className="button-sheen brand-eyebrow group mt-11 inline-block bg-champagne px-10 py-4 text-[0.625rem] text-onyx transition-colors hover:bg-champagne-200"
            >
              Explore Intake Options
              <span
                aria-hidden="true"
                className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
