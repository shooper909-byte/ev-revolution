import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Container, Eyebrow } from "@/components/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PillarCard } from "@/components/PillarCard";
import { Reveal } from "@/components/Reveal";
import { pillars } from "@/lib/pillars";
import { formatPostDate, posts } from "@/lib/posts";
import s from "./Home.module.css";

const stages = [
  ["TEENS", "Confidence & Healthy Habits", "Start with everyday wellbeing, self-confidence and supportive conversations with trusted adults."],
  ["TWENTIES", "Energy & Everyday Life", "Explore routines that fit a changing life: movement, rest and time for yourself."],
  ["THIRTIES", "Your Changing Priorities", "Make room for your wellbeing alongside work, relationships and the chapters you choose."],
  ["FORTIES", "Knowledge & Connection", "Explore changing wellness priorities and bring informed questions to your healthcare professional."],
  ["FIFTIES", "Strength & Vitality", "Discover education about menopause, strength, sleep and everyday wellbeing."],
  ["BEYOND", "Independence & Possibility", "Keep exploring movement, connection and the habits that fit your next chapter."],
];
const steps = [["Discover", "Explore the care areas that matter to you."], ["Understand", "Build knowledge and find useful resources."], ["Build", "Make room for habits that fit your life."], ["Evolve", "Reflect and adapt as your priorities change."]];
function Photo({ name, className = "", priority = false }: { name: "hero" | "stages" | "sisterhood" | "journal"; className?: string; priority?: boolean }) {
  const src = `/images/home/home-${name}.jpg`;
  const available = existsSync(join(process.cwd(), "public", src));
  return <div className={`${s.photo} ${className}`} aria-hidden="true">{available ? <Image src={src} alt="" fill sizes="(max-width: 767px) 100vw, 60vw" priority={priority} className={s.image} /> : <div className={s.fallback} />}</div>;
}
function Action({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link href={href} className={`${s.button} ${secondary ? s.secondary : ""}`}>{children}<span aria-hidden="true">→</span></Link>;
}
export default function HomePage() {
  return <div className={s.home}>
    <section className={s.hero} aria-labelledby="home-title">
      <Photo name="hero" priority className={s.heroPhoto} /><div className={s.heroShade} />
      <Container className={s.heroInner}><Reveal><Eyebrow>Women’s Wellness. Reimagined.</Eyebrow><h1 id="home-title">Every Stage.<br /><em>Every Shift.</em><br />Every Woman.</h1><p>Wellness designed around the evolution of a woman’s body.</p><div className={s.actions}><Action href="/care">Explore Your Care</Action><Action href="/about" secondary>Our Story</Action></div></Reveal></Container>
    </section>
    <section className={s.section} aria-labelledby="stages-title"><Container><Reveal><Eyebrow>Different Stages. Same Sisterhood.</Eyebrow><h2 id="stages-title">Your Body Evolves.<br /><em>Your Care Should Too.</em></h2><p>Select a stage to explore.</p></Reveal><div className={s.stagesBackdrop}><Photo name="stages" /><div className={s.stages}>{stages.map(([title,label,body],index)=><Reveal key={title} delay={index*60}><details className={s.stage}><summary><span className={s.stageNumber}>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><span>{label}</span><span className={s.stageToggle} aria-hidden="true">+</span></summary><p>{body}</p><Link href="/care">Explore care <span aria-hidden="true">→</span></Link></details></Reveal>)}</div></div></Container></section>
    <section id="pillars" className={s.section} aria-labelledby="care-title"><Container><Reveal><Eyebrow>Care Designed Around Her</Eyebrow><h2 id="care-title">Six Pathways.<br /><em>A Healthier, More Empowered You.</em></h2></Reveal><div className={s.tiles}>{pillars.map((pillar,index)=><Reveal key={pillar.slug} delay={(index%3)*80} className={s.tile}><div className={s.tilePhoto}>{pillar.careImage && <Image src={`/images/care/${pillar.careImage}.webp`} alt={pillar.careImageAlt ?? ""} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className={s.image} />}</div><PillarCard pillar={pillar.slug === "weight-loss" ? { ...pillar, name: "Weight Management" } : pillar} /></Reveal>)}</div></Container></section>
    <section className={s.sisterhood} aria-labelledby="sisterhood-title"><Photo name="sisterhood" /><Reveal className={s.sisterhoodCopy}><Eyebrow>One Sisterhood</Eyebrow><h2 id="sisterhood-title">One Woman.<br /><em>Many Chapters.</em></h2><h3>One Place Designed for All of Them.</h3><p>From her teens through midlife and beyond, Eve’s Sisters brings together wellness education, resources and a community-minded approach for every chapter.</p><Action href="/about">Our Story</Action></Reveal></section>
    <section className={s.section} aria-labelledby="journal-title"><Container><Reveal><Eyebrow>The Eve’s Sisters Journal</Eyebrow><h2 id="journal-title">Real Conversations.<br /><em>Fresh Perspectives.</em></h2><Link href="/journal" className={s.textLink}>Explore the Journal →</Link></Reveal><div className={s.journal}>{posts.slice(0,3).map((post,index)=><Reveal as="article" key={post.slug} delay={index*80} className={index===0?s.featureArticle:s.article}><Photo name="journal" /><div className={s.articleCopy}><Eyebrow>{post.pillar}</Eyebrow><h3>{post.title}</h3><p>{post.excerpt}</p><p className={s.date}>{formatPostDate(post.date)} · {post.readingTime}</p><Link href="/journal" className={s.textLink}>Explore the Journal →</Link></div></Reveal>)}</div></Container></section>
    <section className={s.section} aria-labelledby="how-title"><Container><Reveal><Eyebrow>How It Works</Eyebrow><h2 id="how-title">Simple Steps.<br /><em>Your Next Chapter.</em></h2></Reveal><ol className={s.steps}>{steps.map(([title,body],index)=><Reveal as="li" key={title} delay={index*80}><span className={s.stageNumber}>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</ol></Container></section>
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

    <section className={s.final}><Container><Reveal><Eyebrow>Your Next Chapter Starts Here.</Eyebrow><h2>Care. Confidence. Longevity.</h2><Action href="/contact">Get Started</Action></Reveal></Container></section>
  </div>;
}
