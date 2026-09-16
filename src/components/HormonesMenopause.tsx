import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Container, Eyebrow } from "@/components/Container";
import { PillarIcon, type PillarIconName } from "@/components/PillarIcon";
import type { Pillar } from "@/lib/pillars";
import s from "./HormonesMenopause.module.css";

const benefits: [PillarIconName, string][] = [
 ["lotus", "Hormonal Wellness"], ["honeycomb", "Mood & Emotional Wellness"], ["leaf", "Better Sleep"], ["bolt", "Metabolic Wellness"], ["renew", "Bone Health"], ["lotus", "Heart Health"], ["infinity", "Healthy Aging"],
];
const categories = ["Perimenopause Support", "Menopause Education", "Mood & Stress", "Sleep & Nighttime Wellness", "Metabolic Wellness", "Bone, Heart & Brain Health"];
const steps = [
 ["Explore Your Goals", "Share your wellness priorities and questions about this stage of life."],
 ["Discover Solutions", "Explore educational resources for everyday wellbeing."],
 ["Build Your Routine", "Make space for sustainable movement, rest and self-care habits."],
 ["Track & Adjust", "Reflect on your routine and adapt as your needs change."],
];
const faqs = [
 ["What is perimenopause?", "Perimenopause is the transition leading up to menopause. Hormone levels and menstrual patterns can change during this time. Experiences vary from person to person."],
 ["What are common menopause symptoms?", "Experiences may include hot flashes, night sweats, changes in sleep, mood changes and vaginal dryness. Not everyone has the same symptoms. Discuss new or concerning symptoms with a qualified healthcare professional."],
 ["How can lifestyle support hormonal wellness?", "Regular movement, balanced nutrition, rest and stress-management routines can support general wellbeing. They do not guarantee symptom relief or replace individualized healthcare."],
 ["How can sleep change during menopause?", "Some women experience disrupted sleep, including waking with night sweats. A consistent routine and comfortable sleep environment may help. Persistent sleep difficulties are worth discussing with a healthcare professional."],
 ["How do I get started?", "Contact us with your general goals and questions. For personal advice about symptoms or treatment, speak with a qualified healthcare professional."],
];
function Action({ children }: { children: React.ReactNode }) {
  return <Link href="/contact" className={s.button}>{children}<span aria-hidden="true">→</span></Link>;
}
function Photo({ name, alt, hero = false, children }: {
  name: "hero" | "feature" | "stages" | "lifestyle"; alt: string; hero?: boolean; children?: React.ReactNode;
}) {
  const src = `/images/hormones/hormones-${name}.jpg`;
  // Missing approved photography uses CSS, without requesting a broken image URL.
  const available = existsSync(join(process.cwd(), "public", src));
  return <div className={`${s.photo} ${s[name]}`}>
    {available ? <Image src={src} alt={alt} fill sizes={hero ? "(max-width: 767px) 100vw, 60vw" : "(max-width: 767px) 100vw, 50vw"} priority={hero} className={s.image} /> : <div className={s.fallback} aria-hidden="true"><span /></div>}
    {children}
  </div>;
}
export function HormonesMenopause({ pillar }: { pillar: Pillar }) {
  return <div className={s.page}>
    <section className={s.heroSection} aria-labelledby="hormones-title">
      <Container className={s.heroGrid}>
        <div className={s.heroCopy}>
          <Eyebrow>Hormones &amp; Menopause</Eyebrow>
          <h1 id="hormones-title">Every Phase.<br /><em>A Stronger You.</em></h1>
          <p>Support for hormonal transitions, sleep, mood, metabolism and whole-body wellness through every stage of a woman&apos;s life.</p>
          <Action>Start Your Hormone Journey</Action>
          <ul className={s.values}>{[[pillar.icon, "Hormonal Wellness"], ["honeycomb", "Feel Like Yourself"], ["lotus", "Thrive at Every Stage"]].map(([icon, label]) => <li key={label}><PillarIcon name={icon as PillarIconName} className="h-8 w-8 shrink-0" /><span>{label}</span></li>)}</ul>
        </div>
        <Photo name="hero" hero alt="Women across adult life stages, of diverse races and body types, sharing a moment together."><p className={s.heroAside}>For every stage.<br />Every goal.<br />Every you.</p></Photo>
      </Container>
    </section>
    <section className={s.ivory} aria-label="Hormonal wellness priorities"><Container><ul className={s.benefits}>{benefits.map(([icon, label]) => <li key={label}><PillarIcon name={icon} className="h-8 w-8" /><span>{label}</span></li>)}</ul></Container></section>
    <section className={s.education} aria-labelledby="education-title">
      <div className={s.educationStory}><Photo name="feature" alt="An adult woman enjoying a quiet reflective moment in warm light." /><div className={s.educationCopy}><Eyebrow>Support Through Every Transition</Eyebrow><h2 id="education-title">Hormonal Health<br /><em>for a Brighter Tomorrow.</em></h2><p>Perimenopause and menopause can bring changes to sleep, mood and everyday wellbeing. Explore education about metabolism, bone health, cardiovascular wellness and healthy aging, with space for your individual experience.</p><ul className={s.checklist}>{["Understand perimenopause and menopause", "Explore sleep and mood changes", "Learn about metabolic wellness", "Make bone and cardiovascular health part of the conversation", "Build everyday habits for healthy aging"].map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><Action>Explore Hormone Support</Action></div></div>
      <div className={s.categoryPanel}><h2 className={s.faqTitle}>Explore Hormones &amp; Menopause Topics</h2><div className={s.categories}>{categories.map((title,i) => <Link href="/contact" key={title} className={s.category}><PillarIcon name={(["lotus","leaf","honeycomb","infinity","bolt","renew"] as const)[i]} className="h-10 w-10" /><h3>{title}</h3><span>Learn More <span aria-hidden="true">→</span></span></Link>)}</div></div>
    </section>
    <section className={s.feature} aria-labelledby="stages-title"><Photo name="stages" alt="Women across adult generations and diverse races and body types enjoying time outdoors." /><div className={s.stageCopy}><Eyebrow>Through Every Chapter</Eyebrow><h2 id="stages-title">Different Stages.<br /><em>Same Sisterhood.</em></h2><p>Your experience is your own. Make room for knowledge, connection and everyday wellness as your priorities evolve.</p><Action>Find Your Next Step</Action></div></section>
    <section className={s.ivory} aria-labelledby="how-title"><Container className={s.section}><h2 id="how-title">How It Works</h2><p>Simple steps. Personal priorities.</p><ol className={s.steps}>{steps.map(([title, body], i) => <li key={title}><div className={s.stepTop}><PillarIcon name={(["leaf", "honeycomb", "lotus", "renew"] as const)[i]} className="h-8 w-8" /><span>{String(i + 1).padStart(2, "0")}</span></div><h3>{title}</h3><p>{body}</p></li>)}</ol></Container></section>
    <section className={s.feature} aria-labelledby="faq-title"><Photo name="lifestyle" alt="An adult woman enjoying time outdoors after exercise in athletic clothing."><div className={s.photoCaption}><p>Restore. Reconnect.<br /><em>Thrive.</em></p><span>Rest · Reflect · Reconnect · Thrive</span></div></Photo><div className={s.copy}><h2 id="faq-title" className={s.faqTitle}>Frequently Asked Questions</h2>{faqs.map(([question, answer]) => <details key={question} className={s.accordion}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className={s.banner}><Container className={s.bannerInner}><div><Eyebrow>Your Next Chapter Starts Here</Eyebrow><h2>Balance Today.<br /><em>A Brighter Tomorrow.</em></h2></div><Action>Start Your Journey</Action></Container></section>
  </div>;
}
