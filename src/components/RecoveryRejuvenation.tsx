import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Container, Eyebrow } from "@/components/Container";
import { PillarIcon, type PillarIconName } from "@/components/PillarIcon";
import s from "./RecoveryRejuvenation.module.css";

const benefits: [PillarIconName, string][] = [
  ["leaf", "Better Sleep"], ["lotus", "Stress Support"], ["honeycomb", "Cellular Wellness"],
  ["renew", "Everyday Comfort"], ["infinity", "Mobility"], ["leaf", "Healthy Aging"], ["lotus", "Overall Wellness"],
];
const categories: [PillarIconName, string, string, string][] = [
  ["renew", "Recovery Support", "recovery-support", "Explore everyday rest and recovery priorities around your activity, work and lifestyle."],
  ["honeycomb", "Cellular Wellness", "cellular-wellness", "Learn about movement, nutrition and restful routines as foundations of everyday wellbeing."],
  ["infinity", "Joint & Mobility", "joint-mobility", "Explore comfortable movement and mobility routines suited to your current abilities."],
  ["bolt", "Energy & Vitality Education", "energy-vitality", "Explore energy-support information and the current availability of our Energy & Performance programs."],
  ["leaf", "Sleep & Stress", "sleep-stress", "Explore sleep routines, rest and ways to balance everyday demands."],
  ["lotus", "Beauty & Rejuvenation", "beauty-rejuvenation", "Explore the Skin & Beauty care page for current clinician-guided options and prices."],
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
  ["How does physical activity affect rest?", "Activity and rest work together. The amount of rest you need varies with activity, experience and individual circumstances. Avoid pushing through pain and discuss concerns with a qualified professional."],
  ["How do I get started?", "Use Start Your Journey to contact us with your general goals and questions. We can explain available next steps. Please avoid sharing sensitive medical information through the general contact form."],
];
function Action({ children }: { children: React.ReactNode }) {
  return <Link href="/contact" className={s.button}>{children}<span aria-hidden="true">→</span></Link>;
}
function Photo({ name, alt, children }: {
  name: "stages" | "stretch" | "mitochondria"; alt: string; children?: React.ReactNode;
}) {
  const src = `/images/recovery/recovery-${name}.jpg`;
  // Missing approved photography uses CSS, without requesting a broken image URL.
  const available = existsSync(join(process.cwd(), "public", src));
  return <div className={`${s.photo} ${s[name]}`}>
    {available ? <Image src={src} alt={alt} fill sizes="(max-width: 767px) 100vw, 50vw" className={s.image} /> : <div className={s.fallback} aria-hidden="true"><span /></div>}
    {children}
  </div>;
}
export function RecoveryRejuvenation() {
  return <div className={s.page}>
    <section className={s.heroSection} aria-labelledby="recovery-title">
      <h1 id="recovery-title" className="sr-only">Recovery and Rejuvenation</h1>
      <div className={s.heroBanner}>
        <Image src="/images/recovery/recovery-hero-banner-v2.webp" alt="Eve's Sisters: Recovery and Rejuvenation. Restore, replenish, rebalance, renew. Four women relaxing on a terrace overlooking the sea at sunset." fill sizes="(max-width: 1672px) 100vw, 1672px" priority className={s.image} />
        {/* Sits over the "Explore Recovery & Rejuvenation" button drawn into the banner. */}
        <Link href="#recovery-categories" className={s.heroCta}><span className="sr-only">Explore Recovery &amp; Rejuvenation</span></Link>
      </div>
    </section>
    <section className={s.ivory} aria-label="Recovery and wellness priorities"><Container><ul className={s.benefits}>{benefits.map(([icon, label]) => <li key={label}><PillarIcon name={icon} className="h-8 w-8" /><span>{label}</span></li>)}</ul></Container></section>
    <section className={s.cellular} aria-labelledby="cellular-title">
      <div className={s.cellularStory}>
        <Photo name="mitochondria" alt="Artistic illustration of a mitochondrion, representing cellular energy." />
        <div className={s.cellularCopy}><Eyebrow>Power From Within</Eyebrow><h2 id="cellular-title">Cellular Wellness<br /><em>for a Vibrant You.</em></h2><p>Your cells depend on energy production, recovery, sleep, movement and nutrition. Supporting these foundations can help maintain resilience and healthy aging over time.</p><ul className={s.checklist}>{["Support cellular energy", "Support restful routines", "Promote healthy movement", "Support long-term wellness"].map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><Action>Explore Recovery</Action></div>
      </div>
      <div id="recovery-categories" className={s.categoryPanel}><h2 className={s.faqTitle}>Recovery Categories</h2><div className={s.categories}>{categories.map(([icon, title, id]) => <Link href={`#${id}`} key={title} className={s.category}><PillarIcon name={icon} className="h-10 w-10" /><h3>{title}</h3><span>Learn More <span aria-hidden="true">→</span></span></Link>)}</div></div>
    </section>
    <section className={s.ivory} aria-labelledby="recovery-details-title"><Container className={s.section}><h2 id="recovery-details-title">Explore your recovery priorities</h2><p>These are wellness education topics. Recovery treatment programs and enrollment remain pending confirmation.</p><div className="mt-8 grid gap-6 md:grid-cols-2">{categories.map(([, title, id, description]) => <article key={id} id={id} className="scroll-mt-28 rounded-2xl border border-onyx/15 p-6"><h3 className="font-display text-2xl text-onyx">{title}</h3><p className="mt-4 text-base leading-relaxed text-onyx-800">{description}</p><Link href={id === "energy-vitality" ? "/care/energy-performance" : id === "beauty-rejuvenation" ? "/care/skin-beauty" : "/contact"} className="mt-5 inline-block text-sm text-plum underline">{id === "energy-vitality" ? "View Energy availability" : id === "beauty-rejuvenation" ? "View Skin & Beauty options" : "Ask about availability"}</Link></article>)}</div></Container></section>
    <section className={s.feature} aria-labelledby="stages-title"><Photo name="stages" alt="Women across generations in modest casual clothing and activewear."><div className={s.photoCaption}><p>Different Stages.<br /><em>Same Strength.</em></p><span>Every age · Every body · Every chapter</span></div></Photo><div className={s.stageCopy}><Eyebrow>At Every Stage</Eyebrow><h2 id="stages-title">Move. Recover. Rejuvenate.<br /><em>At Every Stage.</em></h2><p>Rest needs evolve with activity, work, family, age and hormonal changes. Build habits that support mobility, sleep and resilience throughout life.</p><Action>Explore Your Next Step</Action></div></section>
    <section className={s.ivory} aria-labelledby="how-title"><Container className={s.section}><h2 id="how-title">How It Works</h2><p>Simple steps. Personal priorities.</p><ol className={s.steps}>{steps.map(([title, body], i) => <li key={title}><div className={s.stepTop}><PillarIcon name={(["leaf", "honeycomb", "lotus", "renew"] as const)[i]} className="h-8 w-8" /><span>{String(i + 1).padStart(2, "0")}</span></div><h3>{title}</h3><p>{body}</p></li>)}</ol></Container></section>
    <section className={s.feature} aria-labelledby="faq-title"><Photo name="stretch" alt="Women in modest activewear stretching together."><div className={s.photoCaption}><p>Move. Recover.<br /><em>Rejuvenate. Repeat.</em></p><span>Move · Recover · Rejuvenate · Repeat</span></div></Photo><div className={s.copy}><h2 id="faq-title" className={s.faqTitle}>Frequently Asked Questions</h2>{faqs.map(([question, answer]) => <details key={question} className={s.accordion}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className={s.banner}><Container className={s.bannerInner}><div><Eyebrow>Your Next Chapter Starts Here</Eyebrow><h2>Recover.<br /><em>Rejuvenate. Thrive.</em></h2></div><Action>Start Your Journey</Action></Container></section>
  </div>;
}
