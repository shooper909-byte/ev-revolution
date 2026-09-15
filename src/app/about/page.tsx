import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PillarIcon, type PillarIconName } from "@/components/PillarIcon";
import s from "./about.module.css";
export const metadata: Metadata = {
  title: {
    absolute: "About Eve's Sisters | Women’s Wellness at Every Stage of Life",
  },
  description:
    "Discover Eve's Sisters, a modern women’s wellness platform focused on weight management, menopause and hormones, longevity, skin and beauty, energy, performance, and recovery across every stage of life.",
};
const philosophy = [
  [
    "lotus",
    "Wellness",
    "Whole-body wellness designed around how women live and change.",
  ],
  [
    "honeycomb",
    "Beauty",
    "Confidence, skin health, hair wellness, and beauty-focused care within a modern wellness experience.",
  ],
  [
    "infinity",
    "Longevity",
    "A focus on vitality, prevention, healthy aging, and long-term wellness.",
  ],
] as const;
const values = [
  [
    "leaf",
    "Personalized",
    "Care and wellness experiences shaped around individual goals.",
  ],
  [
    "honeycomb",
    "Evidence-informed",
    "Information and services grounded in responsible health and wellness practices.",
  ],
  [
    "lotus",
    "Inclusive",
    "Designed to represent women across ages, backgrounds, bodies, and life stages.",
  ],
  [
    "infinity",
    "Beautifully designed",
    "A more thoughtful, elevated approach to women’s wellness.",
  ],
] as const;
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className={s.eyebrow}>
      {children}
      <span aria-hidden="true" />
    </p>
  );
}
function Actions({ secondary = false }: { secondary?: boolean }) {
  return (
    <div className={s.actions}>
      <Link className={s.primary} href="/contact">
        Get Started
      </Link>
      {secondary && (
        <Link className={s.secondary} href="/#pillars">
          Explore Care
        </Link>
      )}
    </div>
  );
}
function Mini({
  items,
}: {
  items: readonly (readonly [PillarIconName, string])[];
}) {
  return (
    <div className={s.mini}>
      {items.map(([icon, label]) => (
        <div key={label}>
          <PillarIcon name={icon} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
// Viewports expose only approved photography, never the reference's UI or copy.
function Photo({ kind }: { kind: "hero" | "generations" | "inclusive" }) {
  const hero = kind === "hero";
  return (
    <div className={`${s.photo} ${s[kind]}`}>
      <Image
        src={
          hero
            ? "/images/about-mature-campaign.png"
            : "/images/about-approved-reference.png"
        }
        alt={
          hero
            ? "A mature woman looking ahead in warm cinematic light."
            : kind === "generations"
              ? "Four generations of women representing different stages of life."
              : "Three women together in an editorial wellness portrait."
        }
        width={hero ? 1122 : 948}
        height={hero ? 1402 : 1660}
        sizes="(max-width: 767px) 190vw, 100vw"
        priority={hero}
      />
    </div>
  );
}
export default function AboutPage() {
  return (
    <div className={s.about}>
      <section className={s.heroSection} aria-labelledby="about-title">
        <Container className={s.heroGrid}>
          <div className={s.heroCopy}>
            <Eyebrow>Our story</Eyebrow>
            <h1 id="about-title">
              About
              <br />
              <span className={s.brand}>
                <span>Eve's</span> Sisters
              </span>
            </h1>
            <p className={s.headline}>
              Women’s Wellness, Weight Loss &amp; Longevity
              <br />
              at Every Stage of Life.
            </p>
            <p>
              We believe modern women’s care should feel more personal, more
              inclusive, and more thoughtfully designed for every chapter of
              life.
            </p>
            <Actions secondary />
          </div>
          <Photo kind="hero" />
          <p className={s.heroAside}>
            Stronger.
            <br />
            Brighter.
            <br />
            Balanced.
            <br />
            At every age.
          </p>
        </Container>
      </section>
      <section className={s.light} aria-labelledby="philosophy">
        <Container className={s.section}>
          <div className={s.intro}>
            <div>
              <Eyebrow>Our philosophy</Eyebrow>
              <h2 id="philosophy">
                More Than Care.
                <br />A Movement for Women.
              </h2>
            </div>
            <p>
              Eve's Sisters is built on a simple belief: women deserve
              comprehensive, compassionate, and elevated care at every stage of
              life. We bring wellness, beauty, metabolic health, hormonal
              health, recovery, and healthy aging together in one modern
              experience.
            </p>
          </div>
          <div className={s.three}>
            {philosophy.map(([icon, title, body]) => (
              <div className={s.value} key={title}>
                <PillarIcon name={icon} />
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className={s.dark} aria-labelledby="stages">
        <Container className={s.split}>
          <div className={s.splitCopy}>
            <Eyebrow>Every woman belongs</Eyebrow>
            <h2 id="stages">
              Every Stage.
              <br />
              Every Shift.
              <br />
              Every Woman.
            </h2>
            <p>
              From early adulthood through midlife, menopause and beyond,
              Eve's Sisters brings women’s wellness together in one elevated,
              personalized experience.
            </p>
            <Mini
              items={[
                ["leaf", "Wellness today"],
                ["lotus", "Confidence tomorrow"],
                ["infinity", "Longevity for what’s next"],
              ]}
            />
          </div>
          <Photo kind="generations" />
        </Container>
      </section>
      <section className={s.light} aria-labelledby="inclusive">
        <Container className={`${s.split} ${s.inclusiveSplit}`}>
          <Photo kind="inclusive" />
          <div className={s.splitCopy}>
            <Eyebrow>Inclusive care</Eyebrow>
            <h2 id="inclusive">Inclusive By Design.</h2>
            <p>
              Women’s health is not one age, one body, one background, or one
              experience. Eve's Sisters is designed to reflect the women we serve
              across stages of life, cultures, goals, and wellness needs.
            </p>
            <Mini
              items={[
                ["leaf", "Weight management"],
                ["lotus", "Hormones & menopause"],
                ["honeycomb", "Skin & beauty"],
                ["bolt", "Energy & recovery"],
              ]}
            />
            <p className={s.statement}>
              Real women. Real lives. More personal care.
            </p>
          </div>
        </Container>
      </section>
      <section className={s.dark} aria-labelledby="standard">
        <Container className={s.section}>
          <div className={s.intro}>
            <div>
              <Eyebrow>Our values</Eyebrow>
              <h2 id="standard">The Eve's Sisters Standard.</h2>
            </div>
            <p>
              A higher standard in women’s wellness — where evidence,
              personalization, inclusion, and a beautiful human experience
              belong together.
            </p>
          </div>
          <div className={s.four}>
            {values.map(([icon, title, body]) => (
              <div className={s.value} key={title}>
                <PillarIcon name={icon} />
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className={s.cta} aria-labelledby="next-chapter">
        <div className={s.botanical} aria-hidden="true">
          <Image
            src="/images/about-approved-reference.png"
            alt=""
            width={948}
            height={1660}
            sizes="1900px"
          />
        </div>
        <Container>
          <Eyebrow>A brighter tomorrow</Eyebrow>
          <h2 id="next-chapter">Your Next Chapter Starts Here.</h2>
          <p>Personalized wellness for every stage of womanhood.</p>
          <Actions />
        </Container>
      </section>
    </div>
  );
}
