import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Pillar } from "@/lib/pillars";
import s from "./SkinBeauty.module.css";

type BeautyIcon = "collagen" | "shield" | "sparkle" | "hair" | "drop" | "lotus" | "leaf" | "heart" | "calendar" | "plan" | "routine" | "chart";
const paths: Record<BeautyIcon, ReactNode> = {
  collagen: <><path d="m7 8 9-4 9 5-2 12-10 6-9-7 3-12Zm0 0 6 19m3-23 7 17M4 20 25 9"/><circle cx="7" cy="8" r="2"/><circle cx="16" cy="4" r="2"/><circle cx="25" cy="9" r="2"/><circle cx="23" cy="21" r="2"/><circle cx="13" cy="27" r="2"/><circle cx="4" cy="20" r="2"/></>,
  shield: <path d="M16 2c4 4 8 5 12 5v9c0 7-6 12-12 15C10 28 4 23 4 16V7c4 0 8-1 12-5Z"/>,
  sparkle: <><path d="M13 2c0 9 3 12 10 12-7 0-10 3-10 12 0-9-3-12-10-12C10 14 13 11 13 2Zm13 18c0 4 1 6 5 6-4 0-5 2-5 6 0-4-1-6-5-6 4 0 5-2 5-6Z"/></>,
  hair: <><path d="M2 19h11m10 0h7M24 2c-9 7-13 14-13 22a5 5 0 0 0 10 0c-3-9-1-16 3-22Z"/><path d="M17 25c-2-7 0-13 4-19"/></>,
  drop: <path d="M16 2C12 9 5 16 5 22a11 11 0 0 0 22 0c0-6-7-13-11-20ZM10 23c0 3 2 5 5 5"/>,
  lotus: <><path d="M16 3C5 14 10 24 16 27c6-3 11-13 0-24Z"/><path d="M10 11 3 9c-1 12 5 18 13 18 8 0 14-6 13-18l-7 2M7 18l-6-2c1 9 7 13 15 13s14-4 15-13l-6 2"/></>,
  leaf: <><path d="M28 3C11 3 3 12 6 27c15 2 23-7 22-24Z"/><path d="M3 30 23 8"/></>,
  heart: <path d="M16 28 4.5 16.5C-3 8 9 0 16 9c7-9 19-1 11.5 7.5Z"/>,
  calendar: <><rect x="3" y="6" width="26" height="24" rx="2"/><path d="M3 13h26M10 2v8M22 2v8M10 19h2m5 0h2m-9 6h2m5 0h2"/></>,
  plan: <><rect x="6" y="5" width="21" height="25" rx="2"/><rect x="12" y="2" width="9" height="6" rx="1"/><path d="M11 13h11m-11 6h11m-11 6h8"/></>,
  routine: <><rect x="7" y="11" width="18" height="19" rx="3"/><path d="M11 11V5h10v6M16 5V2h8M12 20h8m-4-4v8"/></>,
  chart: <><path d="M3 29h27"/><rect x="5" y="19" width="5" height="10"/><rect x="14" y="11" width="5" height="18"/><rect x="23" y="3" width="5" height="26"/></>,
};
function Icon({name}: {name:BeautyIcon}) { return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>; }
const benefits: [BeautyIcon,string][] = [["collagen","Collagen Support"],["shield","Skin Barrier"],["sparkle","Even Tone"],["hair","Hair & Scalp"],["drop","Hydration"],["lotus","Healthy Aging"]];
const topics = ["Barrier repair and skin renewal","Retinoids and ingredient education","Sunscreen and sun protection","Niacinamide and skincare ingredients","Topical peptides and collagen-focused skincare","Pigmentation and uneven tone","Hair and scalp health","Skin wellness through hormonal changes"];
const steps: [BeautyIcon,string,string][] = [
  ["calendar","Share Your Skin Goals","Tell us about your skin, hair and beauty priorities, and the questions you want to explore."],
  ["plan","Understand Your Routine","Look at your current products and habits, and where clearer information could help."],
  ["routine","Build Consistent Habits","Explore a simple routine around your needs, preferences and everyday life."],
  ["chart","Reflect & Refine","Keep track of your experience and revisit questions as your skin and priorities evolve."],
];
const faqs = [
  ["What does Skin & Beauty cover?","We explore skin-barrier care, skincare ingredients, sun protection, pigmentation, hormonal skin changes, and hair and scalp topics. This is an educational starting point; contact us to ask what support is currently available."],
  ["Which products are actually doing something?","Our focus is on understanding ingredients and the evidence behind claims, rather than choosing products by packaging alone. Bring your current routine and questions to the conversation."],
  ["Do you offer prescriptions or beauty treatments?","This page does not advertise prescription services, procedures or peptide therapy. Contact us for current service information; questions about diagnosis or medical treatment belong with a qualified clinician."],
  ["Can I explore hormonal skin changes?","Yes. Changes in skin texture, pigmentation, hair and scalp are part of the topics covered here. We help frame questions to discuss with your own clinician, without diagnosing the cause."],
  ["How do I begin?","Start Your Glow Journey opens our contact page. Share your general interests and questions, and our team can explain available next steps. Please avoid sending sensitive medical information through the general form."],
];
function Action({children="Start Your Glow Journey"}: {children?:ReactNode}) { return <Link href="/contact" className={s.button}>{children}<span aria-hidden="true">→</span></Link>; }
export function SkinBeauty({pillar}: {pillar:Pillar}) {
 return <div className={s.page}>
  <section className={s.hero} aria-labelledby="skin-title">
   <Image src="/images/skin/hero.png" alt="Luminous beauty portrait of a woman in warm champagne light." fill priority sizes="100vw" className={s.heroImage}/><div className={s.heroShade}/>
   <div className={s.heroInner}><p className={s.eyebrow}>{pillar.name}</p><h1 id="skin-title">Radiance<br/><em>That Evolves</em><br/>With You.</h1><p className={s.intro}>Thoughtful skin, hair and beauty education for every stage of life. Discover what belongs in your routine—and what deserves a closer look.</p><Action/>
   <ul className={s.features}>{([["sparkle","Your Skin. Your Priorities."],["leaf","Evidence-Focused Education"],["heart","Every Stage of You"]] as [BeautyIcon,string][]).map(([icon,label])=><li key={label}><Icon name={icon}/><span>{label}</span></li>)}</ul></div>
   <p className={s.heroNote}>Healthy skin.<br/><em>Confident you.</em></p>
  </section>
  <section className={s.benefitStrip} aria-label="Skin and beauty priorities"><ul>{benefits.map(([icon,label])=><li key={label}><Icon name={icon}/><span>{label}</span></li>)}</ul></section>
  <section id="program" className={s.program} aria-labelledby="skin-health-title"><div className={s.editorial}><Image src="/images/skin/editorial.png" alt="Three women with diverse skin tones in a warm beauty editorial portrait." fill sizes="(max-width:767px) 100vw, 53vw"/><p>Different skin.<br/><em>Every stage.</em></p></div><div className={s.programCopy}><p className={s.eyebrow}>More Than Aesthetics</p><h2 id="skin-health-title">Beauty Begins<br/>With <em>Skin Health.</em></h2><p>{pillar.intro}</p><ul className={s.checks}>{topics.map(topic=><li key={topic}><span aria-hidden="true">✓</span>{topic}</li>)}</ul><Action>Explore Your Skin Goals</Action></div></section>
  <section className={s.banner}><div><p className={s.eyebrow}>Confidence Looks Good on You</p><h2>Healthy Skin. <em>A Brighter Tomorrow.</em></h2><p>Thoughtful choices. Consistent care. Your own kind of radiance.</p></div><Action>Get Started Today</Action></section>
  <section id="how-it-works" className={s.how} aria-labelledby="skin-how-title"><h2 id="skin-how-title">How It Works</h2><p className={s.eyebrow}>Simple Steps. Thoughtful Care.</p><ol className={s.steps}>{steps.map(([icon,title,body],i)=><li key={title}><div className={s.stepIcon}><Icon name={icon}/></div><div><span className={s.number}>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{body}</p></div></li>)}</ol></section>
  <section className={s.faqSection} aria-labelledby="skin-faq-title"><div className={s.lifestyle}><Image src="/images/skin/spa.png" alt="Woman in a white spa robe and towel enjoying a quiet skincare moment." fill sizes="(max-width:767px) 100vw, 50vw"/><p>Invest in<br/><em>You.</em></p></div><div className={s.faq}><h2 id="skin-faq-title" className={s.eyebrow}>Frequently Asked Questions</h2>{faqs.map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
  <section className={`${s.banner} ${s.final}`}><div><p className={s.eyebrow}>Your Next Chapter Starts Here</p><h2>Radiant Skin. <em>Empowered You.</em></h2></div><Action/></section>
 </div>;
}
