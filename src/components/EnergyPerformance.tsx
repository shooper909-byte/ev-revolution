import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Container, Eyebrow } from "@/components/Container";
import { PillarIcon, type PillarIconName } from "@/components/PillarIcon";
import type { Pillar } from "@/lib/pillars";
import s from "./EnergyPerformance.module.css";

const benefits: [PillarIconName, string][] = [
  ["bolt", "Increase Energy"], ["honeycomb", "Mental Focus"],
  ["infinity", "Endurance"], ["lotus", "Build Strength"],
  ["renew", "Recovery"], ["leaf", "Better Sleep"], ["lotus", "Overall Wellness"],
];
const steps = [
  ["Share Your Goals", "Tell us about your energy, lifestyle, sleep, performance and wellness priorities."],
  ["Complete Your Assessment", "Share the information needed to understand your goals and current routine."],
  ["Explore Your Plan", "Review a personalized wellness pathway designed around your needs."],
  ["Track Your Progress", "Follow your progress and adjust your approach as your needs evolve."],
];
const faqs = [
  ["What can affect a woman's energy levels?", "Sleep, nutrition, activity, stress and changes in daily routines can influence energy. Persistent or unexplained tiredness is worth discussing with a qualified healthcare professional. This information does not diagnose its cause."],
  ["How can sleep affect energy and performance?", "Sleep supports rest, attention and recovery. Consistent sleep and wake times and a restful environment can support a sustainable routine. Individual needs and experiences vary."],
  ["How can strength training support women?", "Appropriately paced strength training can support muscle strength and everyday movement. Begin at a level suited to your experience and abilities, and seek qualified guidance when needed."],
  ["What role does nutrition play in energy?", "Food provides energy for everyday activity. Regular, balanced meals and hydration can support your routine. Nutrition needs vary, so individual concerns are best discussed with a qualified professional."],
  ["How do I get started?", "Use Start Your Journey to reach our contact page and share your goals or questions. We can explain available next steps. Please avoid sending sensitive medical information through the general contact form."],
];
function Action({ children }: { children: React.ReactNode }) {
  return <Link href="/contact" className={s.button}>{children}<span aria-hidden="true">→</span></Link>;
}
function Photo({ name, alt, hero = false, children }: {
  name: "hero" | "stages" | "lifestyle"; alt: string; hero?: boolean; children?: React.ReactNode;
}) {
  const src = `/images/energy/energy-${name}.jpg`;
  // Missing approved photography uses CSS, without requesting a broken image URL.
  const available = existsSync(join(process.cwd(), "public", src));
  return <div className={`${s.photo} ${s[name]}`}>
    {available ? <Image src={src} alt={alt} fill sizes={hero ? "(max-width: 767px) 100vw, 60vw" : "(max-width: 767px) 100vw, 50vw"} priority={hero} className={s.image} /> : <div className={s.fallback} aria-hidden="true"><span /></div>}
    {children}
  </div>;
}
export function EnergyPerformance({ pillar }: { pillar: Pillar }) {
  return <div className={s.page}>
    <section className={s.heroSection} aria-labelledby="energy-title">
      <Container className={s.heroGrid}>
        <div className={s.heroCopy}>
          <Eyebrow>Energy &amp; Performance</Eyebrow>
          <h1 id="energy-title">More Energy<br /><em>for Everything</em><br />You Do.</h1>
          <p>Feel stronger. Think clearer. Perform better.<br />Explore practical support for energy, endurance, focus, recovery and whole-body wellness at every stage of life.</p>
          <Action>Start Your Energy Journey</Action>
          <ul className={s.values}>{[[pillar.icon, "Sustained Energy"], ["honeycomb", "Sharper Focus"], ["lotus", "Stronger Performance"]].map(([icon, label]) => <li key={label}><PillarIcon name={icon as PillarIconName} className="h-8 w-8 shrink-0" /><span>{label}</span></li>)}</ul>
        </div>
        <Photo name="hero" hero alt="Adult women in athletic clothing sharing an active moment together."><p className={s.heroAside}>For every stage.<br />Every goal.<br />Every you.</p></Photo>
      </Container>
    </section>
    <section className={s.ivory} aria-label="Energy and performance priorities"><Container><ul className={s.benefits}>{benefits.map(([icon, label]) => <li key={label}><PillarIcon name={icon} className="h-8 w-8" /><span>{label}</span></li>)}</ul></Container></section>
    <section aria-labelledby="stages-title" className={s.feature}>
      <Photo name="stages" alt="Women at different life stages with a teen in modest athletic clothing."><div className={s.photoCaption}><p>Different Stages.<br /><em>Same Drive.</em></p><span>School · Career · Family · Fitness · Life</span></div></Photo>
      <div className={s.copy}><Eyebrow>Fuel a Stronger You</Eyebrow><h2 id="stages-title">Energy &amp; Performance<br /><em>at Every Stage.</em></h2><p>Your energy needs can change with school, work, family, training, sleep and hormonal transitions. Eve&apos;s Sisters focuses on sustainable habits and wellness strategies that support how you want to live, move and perform.</p><ul className={s.checklist}>{["Sustainable energy support", "Mental clarity and focus", "Strength and physical performance", "Recovery and resilience", "Sleep and lifestyle foundations", "Support for active and demanding schedules"].map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><Action>Explore Your Next Step</Action></div>
    </section>
    <section className={s.banner}><Container className={s.bannerInner}><div><Eyebrow>Energy Fuels Opportunity</Eyebrow><h2>A More Powerful You.</h2><p>Support for the strength, focus and endurance your life demands.</p></div><Action>Get Started Today</Action></Container></section>
    <section className={s.ivory} aria-labelledby="how-title"><Container className={s.section}><h2 id="how-title">How It Works</h2><p>Simple steps. Personal priorities.</p><ol className={s.steps}>{steps.map(([title, body], i) => <li key={title}><div className={s.stepTop}><PillarIcon name={(["leaf", "honeycomb", "lotus", "renew"] as const)[i]} className="h-8 w-8" /><span>{String(i + 1).padStart(2, "0")}</span></div><h3>{title}</h3><p>{body}</p></li>)}</ol></Container></section>
    <section className={s.feature} aria-labelledby="faq-title"><Photo name="lifestyle" alt="An adult woman enjoying time outdoors after exercise in athletic clothing."><div className={s.photoCaption}><p>Energy Looks<br /><em>Good On You.</em></p><span>Move · Focus · Achieve · Repeat</span></div></Photo><div className={s.copy}><h2 id="faq-title" className={s.faqTitle}>Frequently Asked Questions</h2>{faqs.map(([question, answer]) => <details key={question} className={s.accordion}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className={s.banner}><Container className={s.bannerInner}><div><Eyebrow>Your Next Chapter Starts Here</Eyebrow><h2>More Energy.<br /><em>A Brighter You.</em></h2></div><Action>Start Your Journey</Action></Container></section>
  </div>;
}
