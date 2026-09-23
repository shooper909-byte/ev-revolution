import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Container, Eyebrow } from "@/components/Container";
import { PillarIcon, type PillarIconName } from "@/components/PillarIcon";
import type { Pillar } from "@/lib/pillars";
import s from "./RecoveryRejuvenation.module.css";

const benefits: [PillarIconName, string][] = [
  ["leaf", "Better Sleep"], ["lotus", "Stress Support"], ["honeycomb", "Cellular Wellness"],
  ["renew", "Muscle & Joint Recovery"], ["infinity", "Mobility"], ["leaf", "Healthy Aging"], ["lotus", "Overall Wellness"],
];
const categories: [PillarIconName, string][] = [
  ["renew", "Recovery Support"], ["honeycomb", "Cellular Wellness"], ["infinity", "Joint & Mobility"],
  ["bolt", "Energy & NAD+ Education"], ["leaf", "Sleep & Stress"], ["lotus", "Beauty & Rejuvenation"],
];
const steps = [
  ["Explore Your Goals", "Identify your recovery, movement, sleep and wellness priorities."],
  ["Choose Your Focus", "Explore resources aligned with your needs and lifestyle."],
  ["Build Your Routine", "Create sustainable recovery habits around movement, rest and wellness."],
  ["Track & Adjust", "Review what works and adapt as your needs change."],
];
const faqs = [
  ["What does recovery mean for overall wellness?", "Recovery includes rest and routines that help balance everyday demands. Sleep, nutrition, movement and stress management are useful foundations. Needs differ between people and stages of life."],
  ["How important is sleep for recovery?", "Sleep provides time for rest and supports daily functioning. A consistent sleep routine can be a helpful starting point. Discuss persistent sleep difficulties with a qualified healthcare professional."],
  ["Can mobility work support healthy aging?", "Movement suited to your abilities can help you maintain a comfortable, active routine. Start gradually and seek qualified guidance if you have pain, an injury or concerns about movement."],
  ["How does strength training affect recovery?", "Training and rest work together. The amount of recovery needed varies with activity, experience and individual circumstances. Avoid pushing through pain and discuss concerns with a qualified professional."],
  ["How do I get started?", "Use Start Your Journey to contact us with your general goals and questions. We can explain available next steps. Please avoid sharing sensitive medical information through the general contact form."],
];
function Action({ children }: { children: React.ReactNode }) {
  return <Link href="/contact" className={s.button}>{children}<span aria-hidden="true">→</span></Link>;
}
function Photo({ name, alt, hero = false, children }: {
  name: "hero" | "stages" | "stretch" | "mitochondria"; alt: string; hero?: boolean; children?: React.ReactNode;
}) {
  const src = `/images/recovery/recovery-${name}.jpg`;
  // Missing approved photography uses CSS, without requesting a broken image URL.
  const available = existsSync(join(process.cwd(), "public", src));
  return <div className={`${s.photo} ${s[name]}`}>
    {available ? <Image src={src} alt={alt} fill sizes={hero ? "(max-width: 767px) 100vw, 60vw" : "(max-width: 767px) 100vw, 50vw"} priority={hero} className={s.image} /> : <div className={s.fallback} aria-hidden="true"><span /></div>}
    {children}
  </div>;
}
export function RecoveryRejuvenation({ pillar }: { pillar: Pillar }) {
  return <div className={s.page}>
    <section className={s.heroSection} aria-labelledby="recovery-title">
      <Container className={s.heroGrid}>
        <div className={s.heroCopy}>
          <Eyebrow>Recovery &amp; Rejuvenation</Eyebrow>
          <h1 id="recovery-title">Recover Stronger.<br /><em>Live Better.</em></h1>
          <p>Recovery is part of performance. Explore practical support for sleep, mobility, muscle recovery, stress management and long-term wellness at every stage of life.</p>
          <Action>Explore Recovery</Action>
          <ul className={s.values}>{[[pillar.icon, "Recover Faster"], ["honeycomb", "Rebuild Stronger"], ["lotus", "Feel Better Longer"]].map(([icon, label]) => <li key={label}><PillarIcon name={icon as PillarIconName} className="h-8 w-8 shrink-0" /><span>{label}</span></li>)}</ul>
        </div>
        <Photo name="hero" hero alt="Adult women in athletic clothing sharing an active moment together."><p className={s.heroAside}>For every stage.<br />Every goal.<br />Every you.</p></Photo>
      </Container>
    </section>
    <section className={s.ivory} aria-label="Recovery and wellness priorities"><Container><ul className={s.benefits}>{benefits.map(([icon, label]) => <li key={label}><PillarIcon name={icon} className="h-8 w-8" /><span>{label}</span></li>)}</ul></Container></section>
    <section className={s.cellular} aria-labelledby="cellular-title">
      <div className={s.cellularStory}>
        <Photo name="mitochondria" alt="Artistic illustration of a mitochondrion, representing cellular energy." />
        <div className={s.cellularCopy}><Eyebrow>Power From Within</Eyebrow><h2 id="cellular-title">Cellular Wellness<br /><em>for a Vibrant You.</em></h2><p>Your cells depend on energy production, recovery, sleep, movement and nutrition. Supporting these foundations can help maintain resilience and healthy aging over time.</p><ul className={s.checklist}>{["Support cellular energy", "Support recovery", "Maintain muscle function", "Promote healthy movement", "Support long-term wellness"].map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><Action>Explore Recovery</Action></div>
      </div>
      <div className={s.categoryPanel}><h2 className={s.faqTitle}>Recovery Categories</h2><div className={s.categories}>{categories.map(([icon, title]) => <Link href="/contact" key={title} className={s.category}><PillarIcon name={icon} className="h-10 w-10" /><h3>{title}</h3><span>Learn More <span aria-hidden="true">→</span></span></Link>)}</div></div>
    </section>
    <section className={s.feature} aria-labelledby="stages-title"><Photo name="stages" alt="Women across generations in modest casual and athletic clothing."><div className={s.photoCaption}><p>Different Stages.<br /><em>Same Strength.</em></p><span>Every age · Every body · Every chapter</span></div></Photo><div className={s.stageCopy}><Eyebrow>At Every Stage</Eyebrow><h2 id="stages-title">Move. Recover. Rejuvenate.<br /><em>At Every Stage.</em></h2><p>Recovery needs evolve with training, work, family, age and hormonal changes. Build habits that support strength, mobility, sleep and resilience throughout life.</p><Action>Explore Your Next Step</Action></div></section>
    <section className={s.ivory} aria-labelledby="how-title"><Container className={s.section}><h2 id="how-title">How It Works</h2><p>Simple steps. Personal priorities.</p><ol className={s.steps}>{steps.map(([title, body], i) => <li key={title}><div className={s.stepTop}><PillarIcon name={(["leaf", "honeycomb", "lotus", "renew"] as const)[i]} className="h-8 w-8" /><span>{String(i + 1).padStart(2, "0")}</span></div><h3>{title}</h3><p>{body}</p></li>)}</ol></Container></section>
    <section className={s.feature} aria-labelledby="faq-title"><Photo name="stretch" alt="Women in modest athletic clothing stretching together during a recovery session."><div className={s.photoCaption}><p>Move. Recover.<br /><em>Rejuvenate. Repeat.</em></p><span>Move · Recover · Rejuvenate · Repeat</span></div></Photo><div className={s.copy}><h2 id="faq-title" className={s.faqTitle}>Frequently Asked Questions</h2>{faqs.map(([question, answer]) => <details key={question} className={s.accordion}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className={s.banner}><Container className={s.bannerInner}><div><Eyebrow>Your Next Chapter Starts Here</Eyebrow><h2>Recover.<br /><em>Rejuvenate. Thrive.</em></h2></div><Action>Start Your Journey</Action></Container></section>
  </div>;
}
