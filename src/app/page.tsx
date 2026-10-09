import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PillarCard } from "@/components/PillarCard";
import { PillarIcon } from "@/components/PillarIcon";
import { TelehealthHandoff } from "@/components/TelehealthHandoff";
import { careLabel, publicPillars } from "@/lib/pillars";
import { handoffNote, telehealthUrl } from "@/lib/telehealth";

export const metadata: Metadata = {
  alternates: { canonical: "https://evevolutionhealth.com/" },
  title: "Eve’s Sisters — Women's Wellness for Every Stage",
  description: "Evidence-led guidance and personalized wellness pathways for weight management, hormones, skin and sexual wellness.",
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
              management, hormones and menopause, skin and intimate wellness—
              created for the changing needs of women.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={telehealthUrl("/")}
                className="brand-eyebrow bg-plum px-8 py-4 text-center text-[0.625rem] text-ivory transition-colors hover:bg-plum-600"
              >
                Start Your Consultation
              </a>
              <Link
                href="#how-it-works"
                className="hairline brand-eyebrow border px-8 py-4 text-center text-[0.625rem] text-champagne transition-colors hover:bg-onyx-800"
              >
                How It Works
              </Link>
            </div>
            <p className="mt-4 text-xs text-ivory-200/65">{handoffNote}</p>

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
          <ul className="grid grid-cols-1 divide-y divide-onyx-700/70 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {publicPillars.map((pillar) => (
              <li key={pillar.slug}>
                <a
                  href={telehealthUrl(pillar.carePath ?? "/care")}
                  className="flex h-full flex-col items-center gap-3 px-3 py-8 text-center transition-colors hover:bg-onyx-800"
                >
                  <PillarIcon
                    name={pillar.icon}
                    className="h-6 w-6 text-champagne"
                  />
                  <span className="brand-eyebrow text-[0.5rem] text-ivory-200">
                    {careLabel(pillar)}
                  </span>
                </a>
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
              Choose the area of care that fits where you are, including Eve&rsquo;s Secret™, the
              sexual-wellness pathway. Each pathway opens on our secure telehealth platform.
            </p>
          </div>

          <div className="mt-14 grid gap-px bg-onyx-700/60 sm:grid-cols-2 lg:grid-cols-3">
            {publicPillars.map((pillar) => (
              <PillarCard key={pillar.slug} pillar={pillar} />
            ))}
          </div>

          <a
            href={telehealthUrl("/eves-secret")}
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
          </a>
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
          <TelehealthHandoff from="/" className="mt-12" />
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
