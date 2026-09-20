import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PillarCard } from "@/components/PillarCard";
import { PillarIcon } from "@/components/PillarIcon";
import { StagesLineup } from "@/components/StagesLineup";
import { careLabel, pillars } from "@/lib/pillars";
import { formatPostDate, posts } from "@/lib/posts";

export const metadata: Metadata = {
  alternates: { canonical: "https://evevolutionhealth.com/" },
  title: "Eve’s Sisters — Women's Wellness for Every Stage",
  description: "Evidence-led guidance and personalized wellness pathways for weight management, hormones, skin, energy, recovery and longevity.",
  openGraph: {
    title: "Eve’s Sisters — Women's Wellness for Every Stage",
    description: "Your body evolves. Your care should too.",
    url: "https://evevolutionhealth.com/",
    images: ["/opengraph-image.png"],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image.png"] },
};

const steps = [
  {
    title: "Choose Your Path",
    body: "Explore the area of care that best reflects your current goals and concerns.",
  },
  {
    title: "Tell Us About You",
    body: "Complete a private request so the care team can better understand what you are looking for.",
  },
  {
    title: "Review Your Options",
    body: "Learn about available wellness programs and, where offered, appropriate next steps for clinical evaluation.",
  },
  {
    title: "Continue With Support",
    body: "Stay connected through guidance, education and ongoing wellness support.",
  },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Eve’s Sisters",
  url: "https://evevolutionhealth.com/",
  logo: "https://evevolutionhealth.com/images/eves-sisters-logo.png",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Eve’s Sisters",
  url: "https://evevolutionhealth.com/",
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd, websiteJsonLd]) }} />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-onyx-700 bg-[linear-gradient(115deg,var(--color-onyx)_0%,var(--color-onyx-900)_45%,var(--color-plum-900)_140%)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(115deg,var(--color-onyx)_0%,color-mix(in_oklab,var(--color-onyx)_92%,transparent)_45%,color-mix(in_oklab,var(--color-plum-900)_85%,transparent)_140%)]"
        />
        <Container className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-12 py-16 lg:grid-cols-[1.15fr_minmax(0,1fr)] lg:py-20">
          <div>
            <Eyebrow>Women&rsquo;s wellness for every stage</Eyebrow>
            <h1 className="mt-7 font-display text-[2.5rem] leading-[1.06] text-ivory sm:text-5xl lg:text-[3.4rem]">
              Your body evolves.
              <span className="mt-2 block gold-text">Your care should too.</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-ivory-200/85 sm:text-lg">
              Evidence-led guidance and personalized wellness pathways for weight
              management, hormones and menopause, skin, energy, recovery and
              longevity—created for the changing needs of women.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/care"
                className="brand-eyebrow bg-plum px-8 py-4 text-center text-[0.625rem] text-ivory transition-colors hover:bg-plum-600"
              >
                Explore Your Care Options
              </Link>
              <Link
                href="#how-it-works"
                className="hairline brand-eyebrow border px-8 py-4 text-center text-[0.625rem] text-champagne transition-colors hover:bg-onyx-800"
              >
                How It Works
              </Link>
            </div>

            <p className="brand-eyebrow mt-12 text-[0.5625rem] text-taupe">
              Every stage. Every shift. Every woman.
            </p>
          </div>

          <div className="lg:pl-6">
            <StagesLineup />
            <p className="mt-10 text-center font-display text-2xl tracking-[0.12em] text-ivory sm:text-3xl">
              Women. Evolved.
            </p>
          </div>
        </Container>
      </section>

      {/* Pillar icon bar — the lockup from the brand board. */}
      <section className="border-b border-onyx-700 bg-onyx-900">
        <Container>
          <ul className="grid grid-cols-2 divide-x divide-y divide-onyx-700/70 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
            {pillars.map((pillar) => (
              <li key={pillar.slug}>
                <Link
                  href={`/pillars/${pillar.slug}`}
                  className="flex h-full flex-col items-center gap-3 px-3 py-8 text-center transition-colors hover:bg-onyx-800"
                >
                  <PillarIcon
                    name={pillar.icon}
                    className="h-6 w-6 text-champagne"
                  />
                  <span className="brand-eyebrow text-[0.5rem] text-ivory-200">
                    {careLabel(pillar)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Statement band */}
      <section className="border-b border-onyx-700 bg-plum-900/35">
        <Container className="py-20 text-center sm:py-24">
          <p className="mx-auto max-w-3xl font-display text-3xl leading-tight text-ivory sm:text-4xl lg:text-[2.75rem]">
            More than wellness information.
            <span className="text-mauve"> A movement for women.</span>
          </p>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-ivory-200/80 sm:text-base">
            Women&rsquo;s health has been under-researched, under-funded and
            under-explained for generations. Eve&rsquo;s Sisters is building a more
            thoughtful destination for evidence-led wellness, clearer conversations
            and care that respects every stage of a woman&rsquo;s life.
          </p>
          <ul className="mx-auto mt-9 grid max-w-3xl gap-3 text-base text-ivory-200 sm:grid-cols-3">
            {['Evidence-Led Information', 'Privacy-Minded Experience', 'Created for Every Stage'].map((point) => <li key={point} className="hairline border px-4 py-3">{point}</li>)}
          </ul>
        </Container>
      </section>

      {/* Pillars */}
      <section id="pillars" className="scroll-mt-24 border-b border-onyx-700">
        <Container className="py-20 sm:py-28">
          <div className="max-w-2xl">
            <Eyebrow>The six pillars</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight text-ivory sm:text-5xl">
              Every stage. Every shape. Stronger.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ivory-200/80">
              Six areas where the questions are most common and the plain
              answers are hardest to find.
            </p>
          </div>

          <div className="mt-14 grid gap-px bg-onyx-700/60 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.slug} pillar={pillar} />
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-24 border-b border-onyx-700 bg-onyx-900">
        <Container className="py-20 sm:py-28">
          <Eyebrow>How Eve&rsquo;s Sisters Works</Eyebrow>
          <h2 className="mt-6 max-w-3xl font-display text-4xl leading-tight text-ivory sm:text-5xl">Care that begins with understanding you.</h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory-200/85">Your needs change over time. Eve&rsquo;s Sisters helps you explore the right wellness pathway, understand your options and take the next step with greater confidence.</p>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title}>
                <p className="font-display text-3xl text-champagne-700">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="hairline mt-5 border-t pt-5 font-display text-2xl text-ivory">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ivory-200/85">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
          <Link href="/care" className="button-sheen brand-eyebrow mt-12 inline-block bg-plum px-8 py-4 text-xs text-ivory transition-colors hover:bg-plum-600">Explore Care Options</Link>
        </Container>
      </section>

      {/* Featured care options */}
      <section className="border-b border-onyx-700 bg-ivory text-onyx">
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow className="text-plum">Featured care options</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
              Modern options. Thoughtful clinical guidance.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-onyx-700">
              Explore care pathways that begin with your goals and health history. Prescription treatment is never guaranteed and requires an independent evaluation by a licensed clinician.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-champagne-700/45 bg-ivory-200">
              <Image src="/images/care/care-weight-management-glp1.png" alt="Women discussing personalized weight-management and GLP-1 care options." width={1536} height={1024} sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              <div className="flex flex-1 flex-col p-7">
                <p className="brand-eyebrow text-[0.5625rem] text-plum">Weight management</p>
                <h3 className="mt-4 font-display text-3xl">GLP-1 Care</h3>
                <p className="mt-4 flex-1 leading-7 text-onyx-700">Clinical evaluation, prescription coordination when appropriate, and ongoing support for eligible patients.</p>
                <Link href="/care/weight-management#plans" className="brand-eyebrow mt-7 w-fit text-[0.625rem] text-plum hover:underline">Explore GLP-1 Care &rarr;</Link>
              </div>
            </article>

            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-champagne-700/45 bg-ivory-200">
              <Image src="/images/products/nad-plus-support.png" alt="Unbranded amber wellness vial and glass dropper in champagne light." width={1536} height={1024} sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              <div className="flex flex-1 flex-col p-7">
                <p className="brand-eyebrow text-[0.5625rem] text-plum">Energy and healthy aging</p>
                <h3 className="mt-4 font-display text-3xl">NAD+ Support</h3>
                <p className="mt-4 flex-1 leading-7 text-onyx-700">Ask a licensed clinician whether NAD+ support is available and appropriate for your goals, health history, and location.</p>
                <Link href="/peptide-care#get-started" className="brand-eyebrow mt-7 w-fit text-[0.625rem] text-plum hover:underline">Ask About NAD+ &rarr;</Link>
              </div>
            </article>

            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-champagne-700/45 bg-ivory-200">
              <Image src="/images/products/peptide-care.png" alt="Two unbranded wellness vials on black stone in warm champagne light." width={1536} height={1024} sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              <div className="flex flex-1 flex-col p-7">
                <p className="brand-eyebrow text-[0.5625rem] text-plum">Personalized clinical pathway</p>
                <h3 className="mt-4 font-display text-3xl">Peptide Care</h3>
                <p className="mt-4 flex-1 leading-7 text-onyx-700">Explore clinician-guided peptide care with eligibility assessment, personalized planning, and ongoing monitoring.</p>
                <Link href="/peptide-care" className="brand-eyebrow mt-7 w-fit text-[0.625rem] text-plum hover:underline">Explore Peptide Care &rarr;</Link>
              </div>
            </article>
          </div>

          <p className="mt-9 text-xs leading-6 text-onyx-700">Services and treatment options vary by state and provider. Prescriptions, laboratory testing, and pharmacy charges may be separate. Individual results vary.</p>
        </Container>
      </section>

      <section className="overflow-hidden border-b border-onyx-700 bg-[radial-gradient(circle_at_28%_30%,color-mix(in_oklab,var(--color-plum)_45%,transparent),transparent_40%),linear-gradient(120deg,var(--color-onyx),var(--color-plum-900))]">
        <Container className="grid max-w-[1366px] items-stretch px-0 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div className="flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
            <Eyebrow>The Signature Experience</Eyebrow>
            <h2 className="mt-6 font-display text-5xl text-ivory sm:text-6xl">Eve&rsquo;s Secret™</h2>
            <p className="mt-4 font-display text-2xl text-champagne">Some things are better shared between sisters.</p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory-200/90">A more elevated way to explore women&rsquo;s wellness—bringing multiple areas of care together in one thoughtfully designed experience.</p>
            <ul className="mt-8 flex flex-wrap gap-3 text-base text-ivory"><li className="hairline border px-4 py-3">More personalized</li><li className="hairline border px-4 py-3">More connected</li><li className="hairline border px-4 py-3">Designed around your goals</li></ul>
            <Link href="/eves-secret" className="button-sheen brand-eyebrow mt-10 inline-block w-fit bg-plum px-8 py-4 text-xs text-ivory transition-colors hover:bg-plum-600">Unlock Eve&rsquo;s Secret</Link>
          </div>
          <Link href="/eves-secret" aria-label="Explore Eve’s Secret" className="group relative block min-h-[360px] overflow-hidden border-t border-champagne/25 lg:min-h-[560px] lg:border-l lg:border-t-0">
            <Image src="/images/eves-secret-hero.png" alt="Four women together in an elegant black and purple Eve’s Secret setting." width={1680} height={937} sizes="(min-width: 1024px) 58vw, 100vw" className="h-full w-full object-cover object-[72%_center] transition-transform duration-700 group-hover:scale-[1.02]" />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-onyx/20 via-transparent to-transparent" />
          </Link>
        </Container>
      </section>

      {/* Journal preview */}
      <section className="border-b border-onyx-700">
        <Container className="py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>The Journal</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight text-ivory sm:text-5xl">
                Modern medicine. Timeless you.
              </h2>
            </div>
            <Link
              href="/journal"
              className="brand-eyebrow text-[0.5625rem] text-champagne hover:underline"
            >
              All articles &rarr;
            </Link>
          </div>

          <div className="mt-14 grid gap-px bg-onyx-700/60 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <article key={post.slug} className="bg-onyx">
                <Link href="/journal" className="group block h-full p-8 transition-colors hover:bg-onyx-800 focus-visible:bg-onyx-800" aria-label={`Read ${post.title}`}>
                <p className="brand-eyebrow text-[0.5rem] text-mauve">
                  {post.pillar}
                </p>
                <h3 className="mt-5 font-display text-2xl leading-snug text-ivory">
                  {post.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ivory-200/85">
                  {post.excerpt}
                </p>
                <p className="mt-6 text-xs text-taupe-700">
                  {formatPostDate(post.date)} &middot; {post.readingTime}
                </p>
                <span className="brand-eyebrow mt-6 block text-xs text-champagne group-hover:underline">Read article &rarr;</span>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="bg-onyx-900">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow>Join us</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight text-ivory sm:text-5xl">
                A brighter tomorrow, one stage at a time.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory-200/75">
                One considered email. Research worth knowing about, questions
                worth asking, and nothing we would not send our own mothers.
              </p>
            </div>
            <NewsletterSignup />
          </div>
        </Container>
      </section>
    </>
  );
}
