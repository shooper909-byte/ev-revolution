import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Container, Eyebrow } from "@/components/Container";
import { PillarIcon, type PillarIconName } from "@/components/PillarIcon";
import type { Pillar } from "@/lib/pillars";
import s from "./LongevityHealthspan.module.css";

const benefits: [PillarIconName, string][] = [
 ["renew", "Strength & Muscle"], ["infinity", "Bone Health"], ["lotus", "Heart & Metabolic Health"], ["honeycomb", "Brain Health"], ["bolt", "Cellular Energy"], ["leaf", "Sleep & Recovery"], ["lotus", "Healthy Aging"],
];
const categories: [PillarIconName, string][] = [
 ["bolt", "Cellular & Mitochondrial Health"], ["honeycomb", "Brain & Cognitive Health"], ["lotus", "Heart & Metabolic Health"], ["renew", "Strength, Bone & Mobility"], ["leaf", "Sleep & Recovery"], ["infinity", "Healthy Aging & Independence"],
];
const steps = [
 ["Explore Your Goals", "Tell us what matters most: strength, energy, mobility, rest or everyday independence."],
 ["Discover Resources", "Explore education aligned with your stage of life and personal priorities."],
 ["Build Your Routine", "Make room for movement, rest, connection and sustainable everyday habits."],
 ["Track & Adjust", "Review your priorities and adapt your routine as your needs evolve."],
];
const faqs = [
 ["What is healthspan?", "Healthspan describes the years of life spent in good health. This page focuses on everyday function, wellbeing and independence, rather than promises about how long someone will live."],
 ["When should I start thinking about healthy aging?", "Your priorities can evolve from young adulthood through your 70s, 80s and beyond. Start with goals that matter to your daily life and discuss individual health questions with your healthcare professional."],
 ["What topics can I explore here?", "Our education areas include strength and muscle preservation, bone health, heart and metabolic health, cognitive wellbeing, cellular energy, sleep and recovery."],
 ["Are longevity products available?", "These categories introduce educational topics and areas for future offerings. They are not a product catalog or a promise of availability. Contact us for information about current options."],
 ["How do I get started?", "Contact us with your general wellness goals and questions. For personal medical advice, screening or treatment decisions, speak with a qualified healthcare professional."],
];
function Action({ children }: { children: React.ReactNode }) {
  return <Link href="/contact" className={s.button}>{children}<span aria-hidden="true">→</span></Link>;
}
function Photo({ name, alt, hero = false, children }: {
  name: "hero" | "stages" | "lifestyle" | "mitochondria"; alt: string; hero?: boolean; children?: React.ReactNode;
}) {
  const src = `/images/longevity/longevity-${name}.jpg`;
  // Missing approved photography uses CSS, without requesting a broken image URL.
  const available = existsSync(join(process.cwd(), "public", src));
  return <div className={`${s.photo} ${s[name]}`}>
    {available ? <Image src={src} alt={alt} fill sizes={hero ? "(max-width: 767px) 100vw, 60vw" : "(max-width: 767px) 100vw, 50vw"} priority={hero} className={s.image} /> : <div className={s.fallback} aria-hidden="true"><span /></div>}
    {children}
  </div>;
}
export function LongevityHealthspan({ pillar }: { pillar: Pillar }) {
  return <div className={s.page}>
    <section className={s.heroSection} aria-labelledby="longevity-title">
      <Container className={s.heroGrid}>
        <div className={s.heroCopy}>
          <Eyebrow>Longevity &amp; Healthspan</Eyebrow>
          <h1 id="longevity-title">More Life<br /><em>For the Life</em><br />You Love.</h1>
          <p>Explore strength, mobility, cognitive wellbeing and everyday wellness — from young adulthood through your 70s, 80s and beyond.</p>
          <Action>Start Your Longevity Journey</Action>
          <ul className={s.values}>{[[pillar.icon, "Age Well Today"], ["honeycomb", "Stay Strong Tomorrow"], ["lotus", "More Life on Your Terms"]].map(([icon, label]) => <li key={label}><PillarIcon name={icon as PillarIconName} className="h-8 w-8 shrink-0" /><span>{label}</span></li>)}</ul>
        </div>
        <Photo name="hero" hero alt="Women of varied races and body sizes, from young adulthood to their 70s and 80s, together in activewear."><p className={s.heroAside}>For every stage.<br />Every goal.<br />Every you.</p></Photo>
      </Container>
    </section>
    <section className={s.ivory} aria-label="Longevity and healthspan priorities"><Container><ul className={s.benefits}>{benefits.map(([icon, label]) => <li key={label}><PillarIcon name={icon} className="h-8 w-8" /><span>{label}</span></li>)}</ul></Container></section>
    <section className={s.cellular} aria-labelledby="cellular-title">
      <div className={s.cellularStory}>
        <Photo name="mitochondria" alt="Artistic illustration of a mitochondrion, representing cellular energy." />
        <div className={s.cellularCopy}><Eyebrow>Science for a Brighter Tomorrow</Eyebrow><h2 id="cellular-title">Longevity Is More Than Years.<br /><em>Make Room for Living Well.</em></h2><p>Explore the foundations of a full, active life: muscle preservation, bone health, heart and metabolic health, cognitive wellbeing and cellular energy. Bring questions about your individual needs to your healthcare professional.</p><ul className={s.checklist}>{["Learn about cellular and mitochondrial energy", "Explore brain, heart and metabolic wellness", "Prioritize strength, muscle and bone health", "Make space for sleep and recovery", "Plan for mobility and everyday independence"].map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><Action>Start Your Longevity Journey</Action></div>
      </div>
      <div className={s.categoryPanel}><h2 className={s.faqTitle}>Explore Longevity Topics</h2><p>Education today. A foundation for future wellness offerings.</p><div className={s.categories}>{categories.map(([icon, title]) => <Link href="/contact" key={title} className={s.category}><PillarIcon name={icon} className="h-10 w-10" /><h3>{title}</h3><span>Learn More <span aria-hidden="true">→</span></span></Link>)}</div></div>
    </section>
    <section className={s.feature} aria-labelledby="stages-title"><Photo name="stages" alt="Women of varied races and body sizes, from young adults to women in their 70s and 80s, walking and enjoying time outdoors."><div className={s.photoCaption}><p>Every Stage. Every Goal.<br /><em>A Brighter You.</em></p><span>Every age · Every body · Every chapter</span></div></Photo><div className={s.stageCopy}><Eyebrow>At Every Stage</Eyebrow><h2 id="stages-title">Healthy Aging.<br /><em>On Your Terms.</em></h2><p>From strength training and walking to mobility practice and time with others, build a routine that fits your life. Your goals may change across the decades; feeling capable and connected can remain at the center.</p><Action>Explore Your Next Step</Action></div></section>
    <section className={s.ivory} aria-labelledby="how-title"><Container className={s.section}><h2 id="how-title">How It Works</h2><p>Simple steps. Personal priorities.</p><ol className={s.steps}>{steps.map(([title, body], i) => <li key={title}><div className={s.stepTop}><PillarIcon name={(["leaf", "honeycomb", "lotus", "renew"] as const)[i]} className="h-8 w-8" /><span>{String(i + 1).padStart(2, "0")}</span></div><h3>{title}</h3><p>{body}</p></li>)}</ol></Container></section>
    <section className={s.feature} aria-labelledby="faq-title"><Photo name="lifestyle" alt="An older woman enjoying a peaceful outdoor moment after gentle movement."><div className={s.photoCaption}><p>A Healthier Tomorrow<br /><em>Starts Today.</em></p><span>Move · Nourish · Restore · Thrive</span></div></Photo><div className={s.copy}><h2 id="faq-title" className={s.faqTitle}>Frequently Asked Questions</h2>{faqs.map(([question, answer]) => <details key={question} className={s.accordion}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className={s.banner}><Container className={s.bannerInner}><div><Eyebrow>Your Next Chapter Starts Here</Eyebrow><h2>More Life.<br /><em>Live It Well.</em></h2></div><Action>Start Your Journey</Action></Container></section>
  </div>;
}
