import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PillarCard } from "@/components/PillarCard";
import { PillarIcon } from "@/components/PillarIcon";
import { StagesLineup } from "@/components/StagesLineup";
import { pillars } from "@/lib/pillars";
import { formatPostDate, posts } from "@/lib/posts";

const principles = [
  {
    title: "Science meets self",
    body: "Every position we publish is tied to the evidence behind it, and we say plainly when the evidence is thin or contested.",
  },
  {
    title: "Every stage, every shape",
    body: "Twenty-five or seventy-five, first cycle or ten years post-menopause — the physiology changes and so does the guidance.",
  },
  {
    title: "Modern medicine, timeless you",
    body: "We help you arrive at your clinician's office with better questions, not with a plan you bought from the internet.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — drop /public/images/hero.jpg to layer the campaign image
          behind the gradient; the section is complete without it. */}
      <section
        className="relative overflow-hidden border-b border-onyx-700 bg-[linear-gradient(115deg,var(--color-onyx)_0%,var(--color-onyx-900)_45%,var(--color-plum-900)_140%)] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(115deg,var(--color-onyx)_0%,color-mix(in_oklab,var(--color-onyx)_92%,transparent)_45%,color-mix(in_oklab,var(--color-plum-900)_85%,transparent)_140%)]"
        />
        <Container className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-16 py-20 lg:grid-cols-[1.15fr_minmax(0,1fr)] lg:py-28">
          <div>
            <Eyebrow>Science supports every stage of you</Eyebrow>
            <h1 className="mt-7 font-display text-[2.5rem] leading-[1.06] text-ivory sm:text-5xl lg:text-[3.4rem]">
              Different stages.
              <span className="mt-2 block gold-text">The same power.</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-ivory-200/85 sm:text-lg">
              EV-REVOLUTION is a women&rsquo;s wellness and longevity platform
              covering weight, hormones and menopause, skin, energy, recovery
              and healthspan — held to the evidence, written for real life.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="#pillars"
                className="brand-eyebrow bg-plum px-8 py-4 text-center text-[0.625rem] text-ivory transition-colors hover:bg-plum-600"
              >
                Explore the six pillars
              </Link>
              <Link
                href="/about"
                className="hairline brand-eyebrow border px-8 py-4 text-center text-[0.625rem] text-champagne transition-colors hover:bg-onyx-800"
              >
                Our approach
              </Link>
            </div>

            <p className="brand-eyebrow mt-12 text-[0.5625rem] text-taupe">
              Healthy &middot; Confident &middot; Radiant &mdash; at every age
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
                    {pillar.name}
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
            More than a clinic.
            <span className="text-mauve"> A movement for women.</span>
          </p>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-ivory-200/80 sm:text-base">
            Women&rsquo;s health has been under-researched, under-funded and
            under-explained for generations. We are building the resource that
            should already have existed.
          </p>
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

      {/* Principles */}
      <section className="border-b border-onyx-700 bg-onyx-900">
        <Container className="py-20 sm:py-28">
          <Eyebrow>How we work</Eyebrow>
          <div className="mt-12 grid gap-12 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <div key={principle.title}>
                <p className="font-display text-3xl text-champagne-700">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="hairline mt-5 border-t pt-5 font-display text-2xl text-ivory">
                  {principle.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory-200/75">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
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
              <article key={post.slug} className="bg-onyx p-8">
                <p className="brand-eyebrow text-[0.5rem] text-mauve">
                  {post.pillar}
                </p>
                <h3 className="mt-5 font-display text-2xl leading-snug text-ivory">
                  {post.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory-200/75">
                  {post.excerpt}
                </p>
                <p className="mt-6 text-xs text-taupe-700">
                  {formatPostDate(post.date)} &middot; {post.readingTime}
                </p>
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
