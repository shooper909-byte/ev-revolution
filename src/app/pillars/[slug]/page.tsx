import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow } from "@/components/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PillarIcon } from "@/components/PillarIcon";
import { getPillar, pillars } from "@/lib/pillars";
import { posts } from "@/lib/posts";
import { WeightManagement } from "@/components/WeightManagement";
import { EnergyPerformance } from "@/components/pillars/EnergyPerformance";
import { SkinBeauty } from "@/components/pillars/SkinBeauty";
import { LongevityHealthspan } from "@/components/pillars/LongevityHealthspan";
import { RecoveryRejuvenation } from "@/components/RecoveryRejuvenation";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pillars.map((pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillar(slug);

  if (!pillar) return { title: "Not found" };

  if (slug === "weight-loss") {
    const description = "Personalized weight management and metabolic wellness for women at every stage of life.";
    return {
      title: "Weight Management",
      description,
      alternates: { canonical: "/pillars/weight-loss" },
      openGraph: {
        title: "Weight Management | Eve’s Sisters",
        description,
        type: "website",
        url: "https://evevolutionhealth.com/pillars/weight-loss",
        images: ["/og-image"],
      },
      twitter: { card: "summary_large_image", images: ["/og-image"] },
    };
  }

  if (slug === "energy-performance") {
    const title = "Energy and Performance for Women | Eve’s Sisters";
    const description =
      "Learn about common contributors to fatigue, brain fog and reduced performance and explore personalized energy-care options from Eve’s Sisters.";
    return {
      title: { absolute: title },
      description,
      openGraph: { title, description },
    };
  }

  if (slug === "skin-beauty") {
    const title = "Prescription Skin Care Packages | Eve’s Sisters";
    const description =
      "Explore proposed prescription skincare packages and treatment options through independent licensed clinicians.";
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: "/pillars/skin-beauty" },
      openGraph: { title, description },
    };
  }

  if (slug === "longevity-healthspan") {
    const title = "Longevity and Healthspan for Women | Eve’s Sisters";
    const description =
      "Explore education and proposed care pathways for strength, mobility, bone, heart, metabolic health, sleep and healthy aging.";
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: "/pillars/longevity-healthspan" },
      openGraph: { title, description },
    };
  }

  if (slug === "recovery-rejuvenation") {
    const title = "Recovery & Rejuvenation | Eve’s Sisters";
    const description =
      "Women’s wellness guidance for recovery, sleep, mobility, strength, stress management and healthy aging at every stage of life.";
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: "/pillars/recovery-rejuvenation" },
      openGraph: { title, description },
    };
  }

  return {
    title: pillar.name,
    description: pillar.intro,
    openGraph: { title: pillar.name, description: pillar.intro },
  };
}

export default async function PillarPage({ params }: Params) {
  const { slug } = await params;
  const pillar = getPillar(slug);

  if (!pillar) notFound();
  if (slug === "weight-loss") return <WeightManagement pillar={pillar} />;
  if (slug === "energy-performance") return <EnergyPerformance pillar={pillar} />;
  if (slug === "skin-beauty") return <SkinBeauty pillar={pillar} />;
  if (slug === "longevity-healthspan") return <LongevityHealthspan />;
  if (slug === "recovery-rejuvenation") return <RecoveryRejuvenation pillar={pillar} />;

  const related = posts.filter((post) => post.pillar === pillar.name);
  const others = pillars.filter((item) => item.slug !== pillar.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-onyx-700">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br ${pillar.accent.glow} to-transparent blur-3xl`}
        />
        <Container className="relative py-20 sm:py-28">
          <Link
            href="/#pillars"
            className="brand-eyebrow text-[0.5625rem] text-taupe hover:text-champagne"
          >
            &larr; All pillars
          </Link>

          <div className="mt-10 flex items-center gap-4">
            <PillarIcon
              name={pillar.icon}
              className={`h-9 w-9 ${pillar.accent.text}`}
            />
            <Eyebrow className="text-taupe">{pillar.accentName}</Eyebrow>
          </div>

          <h1 className="mt-8 max-w-3xl font-display text-[2.5rem] leading-[1.08] text-ivory sm:text-6xl">
            {pillar.name}
          </h1>
          <p className={`mt-6 font-display text-2xl ${pillar.accent.text}`}>
            {pillar.tagline}
          </p>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ivory-200/85">
            {pillar.intro}
          </p>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-onyx-900">
        <Container className="py-20 sm:py-24">
          <Eyebrow>Where we focus</Eyebrow>
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {pillar.focus.map((item) => (
              <div key={item.title} className="hairline border-t pt-6">
                <h2 className="font-display text-2xl leading-snug text-ivory">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ivory-200/75">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-onyx-700">
        <Container className="grid gap-16 py-20 sm:py-24 lg:grid-cols-2">
          <div>
            <Eyebrow>What we cover</Eyebrow>
            <ul className="mt-10 space-y-5">
              {pillar.covered.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${pillar.accent.dot}`}
                  />
                  <span className="text-base leading-relaxed text-ivory-200/85">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hairline flex flex-col justify-center border p-10">
            <Eyebrow>The question we hear most</Eyebrow>
            <p className="mt-6 font-display text-3xl leading-tight text-ivory">
              &ldquo;{pillar.question}&rdquo;
            </p>
            <p className="mt-6 text-sm leading-relaxed text-ivory-200/75">
              You deserve an answer that accounts for your physiology rather
              than dismissing it. That is what this pillar exists to give you —
              and what to bring to your own clinician.
            </p>
            {/* A pillar with a subscription page sends people to the plans
                and the assessment; the rest still open the contact form. */}
            {pillar.slug === "skin-beauty" ? (
              <Link
                href="/eves-secret"
                className="button-sheen brand-eyebrow mt-10 self-start bg-plum px-7 py-3.5 text-center text-[0.625rem] text-ivory transition-colors hover:bg-plum-600"
              >
                Explore Eve’s Secret
              </Link>
            ) : pillar.carePath ? (
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href={`${pillar.carePath}#get-started`}
                  className="button-sheen brand-eyebrow bg-plum px-7 py-3.5 text-center text-[0.625rem] text-ivory transition-colors hover:bg-plum-600"
                >
                  Get Started Today
                </Link>
                <Link
                  href={`${pillar.carePath}#plans`}
                  className="hairline brand-eyebrow border px-7 py-3.5 text-center text-[0.625rem] text-champagne transition-colors hover:bg-onyx-800"
                >
                  Compare Options
                </Link>
              </div>
            ) : (
              <Link
                href="/contact"
                className="brand-eyebrow mt-10 self-start bg-plum px-7 py-3.5 text-[0.625rem] text-ivory transition-colors hover:bg-plum-600"
              >
                Ask us
              </Link>
            )}
          </div>
        </Container>
      </section>

      {pillar.slug === "hormones-menopause" && (
        <section className="border-b border-champagne/30 bg-plum-900">
          <Container className="py-10 text-center">
            <Link href="/eves-secret" className="font-display text-2xl text-ivory transition-colors hover:text-champagne">
              If it’s desire and comfort, that’s Eve’s Secret <span aria-hidden="true">&rarr;</span>
            </Link>
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-b border-onyx-700 bg-onyx-900">
          <Container className="py-20 sm:py-24">
            <Eyebrow>From the Journal</Eyebrow>
            <div className="mt-12 grid gap-px bg-onyx-700/60 md:grid-cols-2">
              {related.map((post) => (
                <article key={post.slug} className="bg-onyx-900 p-8">
                  <h3 className="font-display text-2xl leading-snug text-ivory">
                    {post.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ivory-200/75">
                    {post.excerpt}
                  </p>
                  <p className="mt-6 text-xs text-taupe-700">
                    {post.readingTime}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="border-b border-onyx-700">
        <Container className="py-20 sm:py-24">
          <Eyebrow>Continue</Eyebrow>
          <ul className="mt-10 grid gap-px bg-onyx-700/60 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/pillars/${item.slug}`}
                  className="flex h-full flex-col gap-4 bg-onyx p-7 transition-colors hover:bg-onyx-800"
                >
                  <PillarIcon
                    name={item.icon}
                    className={`h-5 w-5 ${item.accent.text}`}
                  />
                  <span className="font-display text-lg leading-snug text-ivory">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-onyx-900">
        <Container className="py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <h2 className="font-display text-3xl leading-tight text-ivory sm:text-4xl">
              Stay with us through every stage.
            </h2>
            <NewsletterSignup />
          </div>
        </Container>
      </section>
    </>
  );
}
