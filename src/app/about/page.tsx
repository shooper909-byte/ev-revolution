import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PillarIcon, type PillarIconName } from "@/components/PillarIcon";
import s from "./about.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "About Eve’s Sisters | Women’s Wellness at Every Stage of Life",
  },
  description:
    "Meet Eve’s Sisters, a women’s wellness brand built around inclusion, clear information, and thoughtfully designed access to care.",
};

const values = [
  ["leaf", "Listen First", "Individual experiences deserve attention."],
  [
    "honeycomb",
    "Explain Clearly",
    "Pricing, inclusions, and next steps should be understandable.",
  ],
  ["lotus", "Respect Individuality", "No single plan fits every woman."],
] as const satisfies ReadonlyArray<
  readonly [PillarIconName, string, string]
>;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className={s.eyebrow}>
      {children}
      <span aria-hidden="true" />
    </p>
  );
}

function ActionLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={secondary ? s.secondary : s.primary} href={href}>
      {children}
    </Link>
  );
}

export default function AboutPage() {
  return (
    <main className={s.about}>
      <section className={s.heroSection} aria-labelledby="about-title">
        <Image
          src="/images/about/about-hero.webp"
          alt="A confident mature woman seated against deep-plum drapery."
          fill
          priority
          sizes="100vw"
          className={s.heroImage}
        />
        <div className={s.heroOverlay} aria-hidden="true" />
        <Container className={s.heroInner}>
          <div className={s.heroCopy}>
            <Eyebrow>Our story</Eyebrow>
            <h1 id="about-title">About Eve&rsquo;s Sisters.</h1>
            <p className={s.headline}>The Evolution of a Woman&rsquo;s Body.</p>
            <p>
              Women&rsquo;s needs change. Feeling heard should remain a constant.
              Eve&rsquo;s Sisters is a women&rsquo;s wellness brand built around inclusion,
              clear information, and thoughtfully designed access to care.
            </p>
            <div className={s.actions}>
              <ActionLink href="/care">Explore Care</ActionLink>
              <ActionLink href="/contact" secondary>
                Contact Us
              </ActionLink>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="philosophy"
        className={`${s.light} ${s.anchorSection}`}
        aria-labelledby="philosophy-title"
      >
        <Container className={s.section}>
          <div className={s.intro}>
            <div>
              <Eyebrow>Our philosophy</Eyebrow>
              <h2 id="philosophy-title">
                Every Stage. Every Shift. Every Woman.
              </h2>
            </div>
            <p>
              We believe women deserve clear information, respectful
              conversations, and care that considers their individual needs.
              From changes in weight and hormones to skin, intimacy, and healthy
              aging, our goal is to make the next step easier to understand.
            </p>
          </div>
          <div className={s.three}>
            {values.map(([icon, title, body]) => (
              <article className={s.value} key={title}>
                <PillarIcon name={icon} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={s.dark} aria-labelledby="care-model-title">
        <Container className={s.careModel}>
          <div>
            <Eyebrow>How care works</Eyebrow>
            <h2 id="care-model-title">
              Your Brand Experience. Independent Clinical Care.
            </h2>
          </div>
          <div className={s.careModelCopy}>
            <p>
              Eve&rsquo;s Sisters provides the branded experience, educational
              resources, and nonclinical support. Clinical evaluations and
              treatment decisions are handled by independent licensed healthcare
              providers affiliated with{" "}
              <a href="https://elite-care.health" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                Elite Care Health
              </a>
              , an independent physician group. Prescribed medications, when
              appropriate, are fulfilled by our pharmacy partner{" "}
              <a href="https://rxave.health" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                Rx Ave Health
              </a>
              .
            </p>
            <p className={s.disclosure}>
              Availability varies by service and state. An evaluation does not
              guarantee a prescription. Enrollment is opening in phases.
            </p>
          </div>
        </Container>
      </section>

      <section className={s.light} aria-labelledby="collections-title">
        <Container className={s.section}>
          <div className={s.sectionHeading}>
            <Eyebrow>Explore Eve&rsquo;s Sisters</Eyebrow>
            <h2 id="collections-title">Two ways to discover what speaks to you.</h2>
            <p>
              Collection names help organize the experience. They do not
              determine medical eligibility or require an additional membership.
            </p>
          </div>
          <div className={s.collectionGrid}>
            <article className={s.collectionCard}>
              <div className={s.collectionImage}>
                <Image
                  src="/images/care/care-together.webp"
                  alt="Four adult women together in an editorial portrait."
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={s.cover}
                />
              </div>
              <div className={s.collectionCopy}>
                <p className={s.cardEyebrow}>Sexual Wellness</p>
                <h3>Eve&rsquo;s Secret&trade;</h3>
                <p>
                  A space for open conversations about intimacy, desire, and
                  comfort.
                </p>
                <ActionLink href="/eves-secret">
                  Explore Eve&rsquo;s Secret
                </ActionLink>
              </div>
            </article>

            <article className={s.collectionCard}>
              <div
                className={`${s.collectionImage} ${s.mrsImages}`}
                aria-hidden="true"
              >
                {[
                  "/images/mrs-collection/mrs-jones.png",
                  "/images/mrs-collection/mrs-robinson.png",
                  "/images/mrs-collection/mrs-golden.png",
                ].map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={1122}
                    height={1402}
                    sizes="(min-width: 1024px) 17vw, 33vw"
                  />
                ))}
              </div>
              <div className={s.collectionCopy}>
                <p className={s.cardEyebrow}>Curated care options</p>
                <h3>The Mrs. Collection</h3>
                <p>
                  Meet Mrs. Jones, Mrs. Robinson, and Mrs. Golden&mdash;collections
                  designed to help you explore Eve&rsquo;s Sisters through different
                  interests and chapters of life.
                </p>
                <ActionLink href="/packages/mrs-collection">
                  Meet The Mrs. Collection
                </ActionLink>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className={s.dark} aria-labelledby="community-title">
        <Container className={s.split}>
          <div className={s.imageFrame}>
            <Image
              src="/images/about/about-sisterhood.webp"
              alt="Three adult women sharing a relaxed conversation at home."
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className={s.cover}
            />
          </div>
          <div className={s.splitCopy}>
            <Eyebrow>Connection matters</Eyebrow>
            <h2 id="community-title">
              A women&rsquo;s wellness brand for every stage of life.
            </h2>
            <p>
              Clear information and respectful conversation can make care feel
              easier to approach. Eve&rsquo;s Sisters is designed to help women
              explore their options without assumptions about age, appearance,
              background, or relationship status.
            </p>
          </div>
        </Container>
      </section>

      <section className={s.light} aria-labelledby="inclusion-title">
        <Container className={`${s.split} ${s.reverseSplit}`}>
          <div className={s.splitCopy}>
            <Eyebrow>Inclusive by design</Eyebrow>
            <h2 id="inclusion-title">Different lives. Individual next steps.</h2>
            <p>
              Women&rsquo;s wellness is not one age, one body, one background, or
              one experience. Educational resources and care pathways should
              reflect that reality while leaving clinical decisions to qualified
              independent professionals.
            </p>
          </div>
          <div className={s.imageFrame}>
            <Image
              src="/images/about/about-life-stages.webp"
              alt="Four adult women across life stages seated together in a warm interior."
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className={s.cover}
            />
          </div>
        </Container>
      </section>

      <section className={s.cta} aria-labelledby="next-chapter">
        <Container>
          <Eyebrow>A brighter tomorrow</Eyebrow>
          <h2 id="next-chapter">Your Next Chapter Starts Here.</h2>
          <p>Explore the care options and collections that speak to you.</p>
          <div className={s.actions}>
            <ActionLink href="/care">Explore Care</ActionLink>
          </div>
        </Container>
      </section>
    </main>
  );
}
