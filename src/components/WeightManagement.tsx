import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { PillarIcon, type PillarIconName } from "@/components/PillarIcon";
import type { Pillar } from "@/lib/pillars";
import s from "./WeightManagement.module.css";

const benefits: [PillarIconName, string][] = [
  ["leaf", "Sustainable Progress"], ["honeycomb", "Preserve Lean Muscle"],
  ["bolt", "Support Energy"], ["renew", "Metabolic Wellness"],
  ["lotus", "Body Composition"], ["infinity", "Build Confidence"],
];
const steps = [
  ["Share Your Goals", "Tell us about your goals, lifestyle and wellness priorities."],
  ["Complete Your Assessment", "Provide the information needed to personalize your experience."],
  ["Build Your Plan", "Explore a pathway designed around your needs and goals."],
  ["Track Your Progress", "Follow your progress and adjust your wellness approach over time."],
];
const faqs = [
  ["What is medical weight management?", "Medical weight management is care supervised by a qualified healthcare professional who considers health history and individual needs. This page provides general wellness information and does not offer a diagnosis or promise a prescription. Speak with your own clinician about medical care."],
  ["How is the program personalized?", "Your goals, lifestyle and wellness priorities help guide the conversation. Contact us to discuss the support currently available and whether it fits your needs."],
  ["Does weight management include nutrition and exercise?", "Nutrition, movement, strength, sleep and sustainable habits can all be part of weight management. An appropriate approach considers your circumstances and abilities; results vary."],
  ["How do I get started?", "Use Get Started to open the weight care plans and start your assessment. Share your contact details and a licensed provider will determine whether medical weight management is appropriate for you. Please do not send sensitive medical information through a general form."],
];
function Action({ children = "Get Started", href = "/care/weight-management#get-started" }: { children?: React.ReactNode; href?: string }) {
  return <Link href={href} className={s.button}>{children}<span aria-hidden="true"> →</span></Link>;
}
function Portrait({ priority = false }: { priority?: boolean }) {
  return <div className={s.portrait}><Image src="/images/about-mature-campaign.png" alt="A woman looking ahead in warm light." width={1122} height={1402} sizes="(max-width: 767px) 200vw, 110vw" priority={priority} /></div>;
}
export function WeightManagement({ pillar }: { pillar: Pillar }) {
  return <div className={s.page}>
    <section className={s.hero} aria-labelledby="weight-title">
      <Container className={s.heroGrid}>
        <div className={s.heroCopy}>
          <Eyebrow>Weight Management</Eyebrow>
          <h1 id="weight-title">A Healthier You<br /><em>at Every Stage</em></h1>
          <p>Personalized weight management and metabolic wellness designed around your body, goals and stage of life.</p>
          <div className={s.actions}><Action /><Link className={s.secondary} href="/care/weight-management#plans">Compare Options <span aria-hidden="true">→</span></Link></div>
          <ul className={s.features}>{[[pillar.icon, "Personalized Approach"], ["renew", "Metabolic Wellness"], ["infinity", "Ongoing Support"]].map(([icon, label]) => <li key={label}><PillarIcon name={icon as PillarIconName} className="h-8 w-8" /><span>{label}</span></li>)}</ul>
        </div>
        <Portrait priority />
      </Container>
    </section>
    <section className={s.light} aria-label="Wellness priorities"><Container><ul className={s.benefits}>{benefits.map(([icon, label]) => <li key={label}><PillarIcon name={icon} className="h-8 w-8" /><span>{label}</span></li>)}</ul></Container></section>
    <section id="program" className={s.program} aria-labelledby="program-title"><Container className={s.split}>
      <Portrait />
      <div className={s.copy}><Eyebrow>More Than a Number</Eyebrow><h2 id="program-title">Weight Management<br /><em>for a Healthier Life</em></h2><p>Weight management is about more than the scale. Eve&apos;s Sisters brings together metabolic wellness, nutrition, movement, body composition and sustainable habits in one personalized experience.</p>
        <ul className={s.checks}>{["Personalized wellness pathway", "Metabolic health focus", "Nutrition and lifestyle support", "Strength and muscle preservation", "Progress tracking and ongoing support"].map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><Action />
      </div>
    </Container></section>
    <section className={s.banner}><Container className={s.bannerInner}><div><Eyebrow>Your Next Chapter Starts Here</Eyebrow><h2>Support for <em>every stage.</em></h2><p>Explore a wellness approach that works for your life.</p></div><Action>Get Started Today</Action></Container></section>
    <section className={s.light} aria-labelledby="how-title"><Container className={s.section}><h2 id="how-title">How It Works</h2><p>Simple steps. Personal priorities.</p><ol className={s.steps}>{steps.map(([title, body], i) => <li key={title}><span className={s.number}>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></Container></section>
    <section aria-labelledby="faq-title"><Container className={s.faq}><div><Eyebrow>Your Questions</Eyebrow><h2 id="faq-title">Frequently Asked<br /><em>Questions</em></h2><p>Clear information for your next chapter.</p></div><div>{faqs.map(([question, answer]) => <details key={question} className={s.accordion}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></Container></section>
  </div>;
}
