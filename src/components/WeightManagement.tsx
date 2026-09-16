import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Pillar } from "@/lib/pillars";
import s from "./WeightManagement.module.css";

type IconName = "leaf" | "heart" | "people" | "scale" | "strength" | "lotus" | "metabolism" | "body" | "calendar" | "plan" | "path" | "chart";
const artwork: Record<IconName, ReactNode> = {
  leaf: <><path d="M26 5C12 5 5 12 7 25c13 2 20-6 19-20Z"/><path d="m6 28 16-17M14 19l-1-6m6 2 5 1"/></>,
  heart: <path d="M16 28 4.5 16.5C-3 8 9 0 16 9c7-9 19-1 11.5 7.5Z"/>,
  people: <><circle cx="16" cy="9" r="5"/><path d="M7 29v-7a9 9 0 0 1 18 0v7ZM4 8a4 4 0 0 1 3 7M28 8a4 4 0 0 0-3 7M3 29H1v-6a7 7 0 0 1 5-7m23 13h2v-6a7 7 0 0 0-5-7"/></>,
  scale: <><rect x="4" y="3" width="24" height="26" rx="3"/><path d="M10 9a7 7 0 0 1 12 0l-6 5-6-5Zm6-3v8"/></>,
  strength: <><path d="M11 16h10M3 12v8m26-8v8"/><rect x="6" y="7" width="5" height="18" rx="1"/><rect x="21" y="7" width="5" height="18" rx="1"/></>,
  lotus: <><path d="M16 3C5 14 10 24 16 27c6-3 11-13 0-24Z"/><path d="M10 11 3 9c-1 12 5 18 13 18 8 0 14-6 13-18l-7 2M7 18l-6-2c1 9 7 13 15 13s14-4 15-13l-6 2"/></>,
  metabolism: <><circle cx="16" cy="16" r="9"/><path d="M16 10v6l4 3M27 8A14 14 0 0 0 3 15m2 9a14 14 0 0 0 24-7M27 3v6h-6M5 29v-6h6"/></>,
  body: <><path d="M10 2c3 7 0 11-2 16-2 4-1 8 0 12M22 2c-3 7 0 11 2 16 2 4 1 8 0 12M9 20c4-3 10-3 14 0m-7 3v7"/><path d="M16 12v2"/></>,
  calendar: <><rect x="3" y="6" width="26" height="24" rx="2"/><path d="M3 13h26M10 2v8M22 2v8M16 17v9m-4-4h8"/></>,
  plan: <><rect x="6" y="5" width="21" height="25" rx="2"/><rect x="12" y="2" width="9" height="6" rx="1"/><path d="m10 14 2 2 3-4m-5 10 2 2 3-4m4-5h4m-4 8h4"/></>,
  path: <><path d="M7 27h15a6 6 0 0 0 0-12H10a6 6 0 0 1 0-12h11m-4 6 6-6-6-2"/><circle cx="5" cy="27" r="3"/></>,
  chart: <><path d="M3 29h27"/><rect x="5" y="19" width="5" height="10"/><rect x="14" y="11" width="5" height="18"/><rect x="23" y="3" width="5" height="26"/></>,
};
function Icon({name}: {name: IconName}) { return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{artwork[name]}</svg>; }
const benefits: [IconName,string][] = [["scale","Sustainable Progress"],["strength","Preserve Lean Muscle"],["lotus","Support Energy"],["metabolism","Metabolic Wellness"],["body","Body Composition"],["heart","Build Confidence"]];
const steps: [IconName,string,string][] = [
  ["calendar","Share Your Goals","Tell us about your goals, lifestyle and wellness priorities."],
  ["plan","Explore Your Personal Plan","Discuss an approach shaped around your body, needs and daily life."],
  ["path","Build Your Routine","Focus on nutrition, movement and practical habits with ongoing support."],
  ["chart","Track Your Progress","Review your progress and discuss adjustments as your needs evolve."],
];
const faqs = [
  ["What does the program focus on?","Our weight-management approach brings together metabolic wellness, nutrition, lifestyle habits, body composition and progress monitoring. Contact us to discuss the support currently available."],
  ["How is my plan personalized?","Your goals, routines and wellness priorities guide the conversation and help shape the next steps that fit your life."],
  ["What progress should I expect?","Everyone’s circumstances and pace are different. Progress may include more consistent habits and changes in strength, wellbeing or body composition. Specific outcomes are not guaranteed."],
  ["How do I get started?","Start Your Journey takes you to our contact page. Share your questions and goals so our team can explain available next steps. Please do not send sensitive medical information through the general contact form."],
];
function Action({children="Start Your Journey"}: {children?: ReactNode}) { return <Link className={s.button} href="/contact">{children}<span aria-hidden="true">→</span></Link>; }
export function WeightManagement(_props: {pillar: Pillar}) {
  return <div className={s.page}>
    <section className={s.hero} aria-labelledby="weight-title">
      <Image src="/images/weight/hero.png" alt="Woman in black activewear in a warmly lit marble interior." fill priority sizes="100vw" className={s.heroImage}/>
      <div className={s.heroShade}/>
      <div className={s.heroInner}>
        <p className={s.eyebrow}>Weight Management</p>
        <h1 id="weight-title">A Healthier You<br/><em>at Every Stage.</em></h1>
        <p className={s.intro}>Personalized weight management designed around your body, your goals and your life. Discover a thoughtful approach to metabolic wellness with support at every stage.</p>
        <Action/>
        <ul className={s.features}>{([["leaf","Personalized Approach"],["people","Metabolic Wellness"],["heart","Ongoing Support"]] as [IconName,string][]).map(([icon,label])=><li key={label}><Icon name={icon}/><span>{label}</span></li>)}</ul>
      </div>
    </section>
    <section className={s.benefitStrip} aria-label="Wellness priorities"><ul>{benefits.map(([icon,label])=><li key={label}><Icon name={icon}/><span>{label}</span></li>)}</ul></section>
    <section id="program" className={s.program} aria-labelledby="program-title">
      <div className={s.bodyPhoto}><Image src="/images/weight/bodies.png" alt="Three women with different body types standing together in black activewear." fill sizes="(max-width: 767px) 100vw, 53vw"/><span className={s.photoCaption}>Different bodies. Shared possibilities.</span></div>
      <div className={s.programCopy}><p className={s.eyebrow}>More Than a Number</p><h2 id="program-title">Weight Management<br/><em>for a Healthier Life</em></h2><p>Our approach goes beyond the scale. Explore metabolic wellness, body composition and everyday habits through a personalized plan built around your priorities.</p>
      <ul className={s.checks}>{["Personalized weight-management assessment","Metabolic wellness focus","Nutrition and lifestyle support","Body composition and muscle preservation","Ongoing progress monitoring and support"].map(item=><li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><Action>Explore Your Options</Action></div>
    </section>
    <section className={s.banner}><div><p className={s.eyebrow}>Your Next Chapter Starts Here</p><h2>Real Support. <em>Lasting Habits.</em></h2><p>You don’t have to do this alone. Find an approach that works for your life.</p></div><Action>Get Started Today</Action></section>
    <section id="how-it-works" className={s.how} aria-labelledby="how-title"><div className={s.howHeading}><div><h2 id="how-title">How It Works</h2><p className={s.eyebrow}>Simple Steps. Personal Priorities.</p></div><p>Your wellbeing. Our shared focus.</p></div><ol className={s.steps}>{steps.map(([icon,title,body],i)=><li key={title}><div className={s.stepIcon}><Icon name={icon}/></div><div><span className={s.number}>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{body}</p></div></li>)}</ol></section>
    <section className={s.faqSection} aria-labelledby="faq-title"><div className={s.lifestyle}><Image src="/images/weight/lifestyle.png" alt="Woman relaxing beside a sunlit swimming pool." fill sizes="(max-width: 767px) 100vw, 48vw"/></div><div className={s.faq}><h2 id="faq-title" className={s.eyebrow}>Frequently Asked Questions</h2>{faqs.map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
  </div>;
}
