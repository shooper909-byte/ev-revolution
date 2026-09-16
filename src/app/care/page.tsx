import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CareCard } from "@/components/CareCard";
import { Container, Eyebrow } from "@/components/Container";
import { PrincipleCarousel } from "@/components/PrincipleCarousel";
import { PillarIcon, type PillarIconName } from "@/components/PillarIcon";
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
  },
};

const heroValues = ["Personalized Support", "Whole-Person Wellness", "A Sisterhood That Cares"];
const benefits: [PillarIconName, string][] = [["lotus", "Hormonal Wellness"], ["honeycomb", "Mood & Emotional Wellness"], ["leaf", "Better Sleep"], ["bolt", "Metabolic Wellness"], ["renew", "Bone Health"], ["lotus", "Heart Health"], ["infinity", "Healthy Aging"]];
const carePriorities = ["Hormone and menopause wellness", "Mood, sleep and stress support", "Metabolic wellness", "Bone, heart and brain health", "Skin, energy and recovery support", "Longevity and healthy aging"];
const steps = [
 ["Share Your Goals", "Tell us what matters most — your wellness priorities, concerns and goals."],
 ["Get Personalized Guidance", "Explore education and wellness resources aligned with your needs."],
 ["Build Your Routine", "Create sustainable habits with tools and resources that fit your lifestyle."],
 ["Track & Adjust", "Review your progress and adapt as your needs evolve."],
];
const faqs = [
 ["What areas of women’s wellness does Eve’s Sisters cover?", "Explore six connected areas: weight management, menopause and hormones, skin and beauty, energy and performance, recovery, and longevity."],
 ["Can I explore more than one care area?", "Yes. Start with the priorities that matter to you and explore other pathways as your interests and needs evolve."],
 ["Is Eve’s Sisters medical care?", "This website provides wellness education and resources. It does not replace individual medical advice or confirm the availability of clinical services. Speak with a qualified healthcare professional about diagnosis or treatment."],
 ["How do the different care pathways work together?", "Each pathway offers a different perspective on whole-person wellness. Topics such as sleep, movement and everyday habits may connect several areas."],
 ["How do I get started?", "Visit our contact page to share general questions and wellness goals. Please avoid sharing sensitive medical information through the general contact form."],
];

export default function CarePage() {
  return (
    <div className="overflow-x-clip">
      {/* ---------------------------------------------------------------
          Hero
          --------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-onyx-700 bg-[linear-gradient(115deg,var(--color-onyx)_0%,var(--color-onyx-900)_48%,var(--color-plum-900)_150%)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/4 hidden h-[34rem] w-[34rem] rounded-full bg-plum/15 blur-[120px] lg:block"
        />

        <Container className="relative grid items-center gap-8 py-12 lg:grid-cols-[1fr_minmax(0,1.2fr)] lg:gap-10 lg:py-16">
          <div>
            <div className="brand-enter">
              <Eyebrow>Care Designed Around Her</Eyebrow>
            </div>

            <h1
              className="brand-enter mt-7 font-display text-[2.4rem] leading-[1.06] text-ivory sm:text-[2.9rem] lg:text-[3.1rem]"
              style={{ "--enter-delay": "90ms" } as React.CSSProperties}
            >
              Whole Woman Care
              <span className="mt-2 block italic text-champagne">
                for Every Stage of Life.
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
              Personalized, evidence-informed support for hormones, metabolism, longevity, beauty and wellness — designed around the way women’s needs evolve through life.
            </p>

            <div
              className="brand-enter mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              style={{ "--enter-delay": "270ms" } as React.CSSProperties}
            >
              <Link
                href="/contact"
                className="button-sheen brand-eyebrow group rounded-full bg-plum px-8 py-4 text-center text-[0.625rem] text-ivory transition-colors hover:bg-plum-600"
              >
                Start Your Care Journey
                <span
                  aria-hidden="true"
                  className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>

            </div>

            <ul
              className="brand-enter mt-14 grid gap-5 sm:grid-cols-3"
              style={{ "--enter-delay": "360ms" } as React.CSSProperties}
            >
              {heroValues.map((value, index) => (
                <li key={value} className="hairline border-t pt-4"><PillarIcon name={(["lotus", "leaf", "honeycomb"] as const)[index]} className="mb-3 h-7 w-7 text-champagne" />
                  <span className="brand-eyebrow text-[0.5625rem] text-ivory-200">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden border border-onyx-700 lg:aspect-[5/6]">
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

      <section className="bg-ivory text-onyx" aria-label="Wellness priorities"><Container><ul className="grid grid-cols-2 gap-6 py-7 sm:grid-cols-4 lg:grid-cols-7">{benefits.map(([icon,label]) => <li key={label} className="flex flex-col items-center gap-3 text-center text-sm"><PillarIcon name={icon} className="h-8 w-8" /><span>{label}</span></li>)}</ul></Container></section>
      <section aria-labelledby="care-priority-heading" className="overflow-hidden border-b border-onyx-700 bg-onyx"><div className="grid lg:grid-cols-2"><Reveal direction="left" className="relative min-h-80 lg:min-h-[34rem]"><Image src="/images/care/care-flexible.webp" alt="Four generations of a family standing together in warm, soft light." fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" /></Reveal><Reveal direction="right" className="px-6 py-12 sm:px-12 lg:py-16"><Eyebrow>Personalized Care. Lasting Support.</Eyebrow><h2 id="care-priority-heading" className="mt-5 font-display text-4xl leading-tight text-ivory sm:text-5xl">Your Health.<br /><em className="text-champagne">Our Priority.</em></h2><p className="mt-6 max-w-xl leading-relaxed text-ivory-200/85">Eve’s Sisters brings women’s wellness together across every stage of life, with education, resources and personalized pathways designed around individual goals.</p><ul className="my-7 grid gap-3 text-ivory">{carePriorities.map(item => <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-champagne">✓</span>{item}</li>)}</ul><Link href="#pathways" className="button-sheen inline-flex min-h-12 items-center rounded-full bg-plum px-7 py-3 text-center text-sm text-ivory hover:bg-plum-600">Explore Our Care Options <span aria-hidden="true" className="ml-2">→</span></Link></Reveal></div></section>

      {/* ---------------------------------------------------------------
          Six pathways
          --------------------------------------------------------------- */}
      <section
        id="pathways"
        aria-labelledby="pathways-heading"
        className="scroll-mt-24 border-b border-onyx-700 bg-onyx"
      >
        <Container className="py-20 sm:py-28">
          <Reveal className="max-w-2xl">
            <p className="brand-eyebrow text-champagne-700">
              Explore Our Care
            </p>
            <h2
              id="pathways-heading"
              className="mt-6 font-display text-[2.1rem] leading-[1.1] text-ivory sm:text-[2.75rem]"
            >
              Explore Our Care Categories.
              <span className="block italic text-champagne">
                A Healthier, Brighter You.
              </span>
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ivory-200/85">
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
          Stronger together
          --------------------------------------------------------------- */}
      <section
        aria-labelledby="together-heading"
        className="border-b border-onyx-700 bg-plum-900"
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
                Every Stage. Every Chapter.
              </p>
              <h2
                id="together-heading"
                className="mt-6 font-display text-[2.1rem] leading-[1.1] text-onyx sm:text-[2.75rem]"
              >
                Care for Every<br /><em className="text-champagne">Stage of Her Life.</em>
              </h2>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-onyx-800/75">
                From her teens through midlife and beyond, women’s needs evolve. Eve’s Sisters is designed to support wellness through every chapter.
              </p>

              <Link href="/about" className="button-sheen mt-7 inline-flex min-h-12 items-center rounded-full bg-plum px-7 py-3 text-center text-sm text-ivory hover:bg-plum-600">Learn More About Our Care <span aria-hidden="true" className="ml-2">→</span></Link>
              <div className="hairline mt-12 border-t pt-10">
                <PrincipleCarousel />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section aria-labelledby="how-heading" className="bg-ivory text-onyx"><Container className="py-12 sm:py-16"><Reveal><h2 id="how-heading" className="text-center font-display text-4xl">How It Works</h2><p className="brand-eyebrow mt-4 text-center text-onyx">Simple Steps. Personalized Care.</p></Reveal><ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([title,body],index) => <Reveal as="li" key={title} delay={index*90}><div className="mb-5 flex items-center gap-4"><PillarIcon name={(["leaf","honeycomb","lotus","renew"] as const)[index]} className="h-10 w-10 text-plum" /><span className="font-display text-2xl">{String(index+1).padStart(2,"0")}</span></div><h3 className="font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed">{body}</p></Reveal>)}</ol></Container></section>
      <section aria-labelledby="faq-heading" className="bg-onyx"><Container className="py-12 sm:py-16"><Reveal><Eyebrow>Your Questions</Eyebrow><h2 id="faq-heading" className="my-6 font-display text-3xl text-ivory sm:text-4xl">Frequently Asked Questions</h2>{faqs.map(([question,answer]) => <details key={question} className="mb-3 border border-onyx-700 text-ivory"><summary className="min-h-12 cursor-pointer px-5 py-4 focus-visible:outline-2 focus-visible:outline-champagne">{question}</summary><p className="max-w-3xl px-5 pb-5 leading-relaxed text-ivory-200/85">{answer}</p></details>)}</Reveal></Container></section>

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
            <p className="brand-eyebrow text-champagne">Your Next Chapter Starts Here</p>
            <h2
              id="cta-heading"
              className="mx-auto mt-7 max-w-2xl font-display text-[2.25rem] leading-[1.08] text-ivory sm:text-[3rem]"
            >
              Care. Support.<br /><em className="text-champagne">Sisterhood.</em>
            </h2>
            <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-ivory-200/85">
              Personalized wellness. Thoughtful support. A healthier, brighter
              you.
            </p>
            <Link
              href="/contact"
              className="button-sheen brand-eyebrow group mt-11 inline-block rounded-full bg-plum px-10 py-4 text-[0.625rem] text-ivory transition-colors hover:bg-plum-600"
            >
              Get Started
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
