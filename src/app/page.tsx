import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PillarCard } from "@/components/PillarCard";
import { PillarIcon } from "@/components/PillarIcon";
import { mrsExperiences } from "@/lib/mrsCollection";
import { careLabel, pillars } from "@/lib/pillars";
import { formatPostDate, posts } from "@/lib/posts";

export const metadata: Metadata = {
  alternates: { canonical: "https://evevolutionhealth.com/" },
  title: "Eve’s Sisters — Women's Wellness for Every Stage",
  description: "Evidence-led guidance and personalized wellness pathways for weight management, hormones, skin, energy, recovery, longevity and sexual wellness.",
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
    image: "/images/home/choose-your-path.webp",
    imageAlt: "Woman browsing women’s healthcare and wellness options on a laptop at home.",
  },
  {
    title: "Tell Us About You",
    body: "Complete a private request so the care team can better understand what you are looking for.",
    image: "/images/home/tell-us-about-you.webp",
    imageAlt: "Woman privately completing a secure online health-intake form on her laptop.",
  },
  {
    title: "Review Your Options",
    body: "Learn about available wellness programs and, where offered, appropriate next steps for clinical evaluation.",
    image: "/images/home/review-your-options.webp",
    imageAlt: "Woman speaking with a female clinician by telehealth with unbranded wellness products nearby.",
  },
  {
    title: "Continue With Support",
    body: "Stay connected through guidance, education and ongoing wellness support.",
    image: "/images/home/continue-with-support.webp",
    imageAlt: "Woman opening a discreet wellness delivery while reviewing a follow-up message on her phone.",
  },
];

const mrsHomepageExperiences = ["mrs-jones", "mrs-robinson", "mrs-golden"].map(
  (slug) => mrsExperiences.find((experience) => experience.slug === slug)!,
);

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
      <section className="relative overflow-hidden border-b border-onyx-700 bg-onyx">
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src="/images/home/home-hero-women.webp"
            alt="Five adult women of different ages and skin tones wearing elegant purple, black and champagne dresses."
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,11,0.98)_0%,rgba(8,11,11,0.9)_28%,rgba(8,11,11,0.28)_46%,rgba(8,11,11,0)_64%)]" />
        </div>

        <Container className="relative flex min-h-[39rem] flex-col justify-center py-16 lg:py-24">
          <div className="max-w-xl">
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

          <div className="relative -mx-6 mt-12 aspect-[1983/793] overflow-hidden sm:-mx-8 lg:hidden">
            <Image
              src="/images/home/home-hero-women.webp"
              alt="Five adult women of different ages and skin tones wearing elegant purple, black and champagne dresses."
              fill
              priority
              sizes="100vw"
              className="object-contain object-center"
            />
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
            <Eyebrow>Care pathways</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight text-ivory sm:text-5xl">
              Every stage. Every shape. Stronger.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ivory-200/80">
              Explore six core areas of care plus Eve&rsquo;s Secret™, the
              sexual-wellness pathway.
            </p>
          </div>

          <div className="mt-14 grid gap-px bg-onyx-700/60 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.slug} pillar={pillar} />
            ))}
          </div>

          <Link
            href="/eves-secret"
            className="group relative mt-px flex min-h-[330px] overflow-hidden border border-mauve-700/60 bg-onyx-900 transition-colors hover:border-mauve focus-visible:border-mauve sm:min-h-[360px]"
          >
            <Image
              src="/images/eves-secret-hero.png"
              alt="Four adult women together in an elegant black and purple Eve’s Secret setting."
              fill
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover object-[72%_center] transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,11,0.99)_0%,rgba(8,11,11,0.94)_38%,rgba(8,11,11,0.55)_68%,rgba(8,11,11,0.16)_100%)]" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ivory/0 transition-colors group-hover:ring-ivory/20 motion-reduce:transition-none" />
            <span className="relative z-10 flex max-w-2xl flex-col justify-center p-8 sm:p-10 lg:p-12">
              <PillarIcon name="lotus" className="h-7 w-7 text-mauve" />
              <span className="brand-eyebrow mt-6 text-[0.5625rem] text-champagne">Sexual Wellness</span>
              <span className="mt-3 font-display text-3xl leading-tight text-ivory sm:text-4xl">Eve&rsquo;s Secret™</span>
              <span className="mt-5 max-w-xl text-base leading-relaxed text-ivory-200/90">An open conversation about desire, intimacy, and comfort through every stage of womanhood.</span>
              <span className="brand-eyebrow mt-8 flex items-center gap-2 text-[0.625rem] text-champagne">
                Explore Eve&rsquo;s Secret
                <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">&rarr;</span>
              </span>
            </span>
          </Link>
        </Container>
      </section>

      {/* The Mrs. Collection is a curated collection, not a medical specialty. */}
      <section aria-labelledby="mrs-collection-heading" className="border-b border-onyx-700 bg-plum-900/30">
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow>Curated care options</Eyebrow>
            <h2 id="mrs-collection-heading" className="mt-6 font-display text-4xl leading-tight text-ivory sm:text-5xl">Meet The Mrs. Collection</h2>
            <p className="mt-6 text-base leading-relaxed text-ivory-200/85">Explore Mrs. Jones, Mrs. Robinson, and Mrs. Golden—three collections within Eve&rsquo;s Sisters, with care options guided by your individual needs.</p>
            <p className="mt-4 text-sm leading-relaxed text-ivory-200/70">The Mrs. Collection organizes curated care options. Eve&rsquo;s Secret™ is the sexual-wellness pathway.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {mrsHomepageExperiences.map((experience) => (
              <Link
                key={experience.slug}
                href={`/packages/${experience.slug}`}
                className="group relative min-h-[390px] overflow-hidden rounded-2xl border border-champagne/45 bg-onyx focus-visible:border-champagne sm:min-h-[440px]"
              >
                <Image
                  src={experience.image}
                  alt={experience.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/20 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 z-10 p-7">
                  <span className="block font-display text-3xl text-ivory">{experience.name}</span>
                  <span className="mt-3 block text-sm leading-relaxed text-ivory-200/90">{experience.tagline}</span>
                  <span className="brand-eyebrow mt-5 flex items-center gap-2 text-[0.5625rem] text-champagne">
                    Explore {experience.name}
                    <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">&rarr;</span>
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <Link href="/packages/mrs-collection" className="button-sheen brand-eyebrow mt-12 inline-block bg-plum px-8 py-4 text-xs text-ivory transition-colors hover:bg-plum-600">Explore The Mrs. Collection</Link>
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
                <div className="hairline mt-2 border-t pt-4">
                  <div className="relative aspect-[3/2] overflow-hidden border border-plum-600/70">
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-onyx/15"
                    />
                  </div>
                </div>
                <h3 className="mt-5 font-display text-2xl text-ivory">
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
