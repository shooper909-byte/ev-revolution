import type { Metadata } from "next";
import Image from "next/image";
import { AffirmingEarlyAccessForm } from "@/components/AffirmingEarlyAccessForm";
import { affirmingPackages, affirmingServices } from "@/lib/affirmingCare";
import styles from "./affirming.module.css";

const description = "Explore Eve’s Sisters’ plans for inclusive gender-affirming telehealth, LGBTQ+ wellness, and personalized care. Join our early-access list.";
export const metadata: Metadata = {
  title: "Gender-Affirming Care & LGBTQ+ Wellness", description,
  alternates: { canonical: "/gender-affirming-care" },
  openGraph: { title: "Gender-Affirming Care & LGBTQ+ Wellness | Eve’s Sisters", description, url: "/gender-affirming-care", images: [{ url: "/images/affirming-care/editorial-group.webp", width: 1774, height: 887, alt: "Illustrative editorial portrait of four adults" }] },
};

const steps = [
  { title: "Join Early Access", body: "Register your interest and receive launch updates.", icon: "✧", future: false },
  { title: "Explore Your Options", body: "Learn about the services and membership plans as they become available.", icon: "◇", future: false },
  { title: "Complete Clinical Onboarding", body: "When launched, eligible patients will be connected with licensed providers for independent medical evaluation.", icon: "＋", future: true },
  { title: "Receive Ongoing Support", body: "Approved patients may receive individualized care and follow-up according to their treatment plan.", icon: "♡", future: true },
];

export default function GenderAffirmingCarePage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="affirming-title">
      <div className={styles.heroPhoto}><Image src="/images/affirming-care/editorial-group.webp" alt="Illustrative editorial portrait of four adults with varied personal styles, together against a violet backdrop" fill sizes="(max-width: 760px) 100vw, 70vw" priority /></div>
      <div className={styles.heroShade} />
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>Gender-Affirming Care & LGBTQ+ Wellness</p>
        <h1 id="affirming-title">All bodies.<br />All identities.<br /><span>All welcome.</span></h1>
        <p className={styles.heroCopy}>Your identity deserves respect. Your health deserves personalized attention. Discover Eve’s Sisters’ vision for inclusive, affirming telehealth and whole-person wellness.</p>
        <div className={styles.heroActions}><a className={styles.goldButton} href="#early-access">Join the early access list <span aria-hidden="true">→</span></a><a className={styles.textButton} href="#services">Explore our services <span aria-hidden="true">↗</span></a></div>
        <p className={styles.plannedNotice}><span />Planned services · Join for launch updates</p>
      </div>
      <div className={styles.heroBottom}><p>Confidential. Inclusive. Personalized.</p><span>Illustrative AI-generated imagery. Not patients or clinicians.</span></div>
    </section>

    <nav className={styles.pathways} aria-label="Explore planned care pathways">{affirmingServices.map(service => <a href={`#${service.id}`} key={service.id}><span aria-hidden="true" className={styles.pathwayIcon}>{service.symbol}</span><span>{service.short}</span><small>Planned service</small></a>)}</nav>

    <section id="services" className={styles.services} aria-labelledby="services-heading">
      <div className={styles.sectionIntro}><p className={styles.eyebrow}>Your goals. Your journey.</p><h2 id="services-heading">Comprehensive<br /><span>Gender-Affirming Care</span></h2><p>Personalized care designed around your identity, health, and goals.</p><p className={styles.developmentNote}>We’re developing these care pathways. A clinical partner for gender-affirming services has not yet been contracted. These services are not currently available.</p></div>
      <div className={styles.serviceGrid}>{affirmingServices.map(service => <article key={service.id} id={service.id} className={styles.serviceCard}>
        <div className={styles.servicePhoto}><Image src="/images/affirming-care/editorial-group.webp" alt="Illustrative adult wellness campaign portrait; not a patient or clinician" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw" style={{ objectPosition: `${service.position} center` }} /><span className={styles.serviceSymbol} aria-hidden="true">{service.symbol}</span></div>
        <div className={styles.serviceBody}><p className={styles.badge}>Planned service</p><h3>{service.title}</h3><p>{service.description}</p><details><summary>Learn more <span className={styles.srOnly}>about planned {service.title}</span><span aria-hidden="true">＋</span></summary><p className={styles.potential}>Potential services, subject to provider confirmation:</p><ul>{service.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul><p className={styles.potential}>Any future prescription requires an independent clinician’s evaluation. Eligibility and availability are not guaranteed.</p></details></div>
      </article>)}</div>
    </section>

    <section id="memberships" className={styles.memberships} aria-labelledby="memberships-heading">
      <div className={styles.centerIntro}><p className={styles.eyebrow}>Proposed membership concepts</p><h2 id="memberships-heading">Care That Evolves With You</h2><p>Thoughtful support. Flexible care. A plan shaped around you.</p></div>
      <div className={styles.packageGrid}>{affirmingPackages.map((plan, index) => <article key={plan.name} className={`${styles.package} ${index === 1 ? styles.featuredPackage : ""}`}>
        {index === 1 && <div className={styles.popular}>Most popular <span>· Proposed featured tier</span></div>}
        <h3>{plan.name}</h3><p className={styles.tier}>{plan.tier}</p><p className={styles.price}><sup>$</sup>{plan.price}<span>/month</span></p><p className={styles.proposed}>Proposed price · Not available to purchase</p>
        <ul>{plan.benefits.map(benefit => <li key={benefit}><span aria-hidden="true">✓</span>{benefit}</li>)}</ul><a className={styles.goldButton} href="#early-access" aria-label={`Join early access for ${plan.name} ${plan.tier}`}>Join early access <span aria-hidden="true">→</span></a>
      </article>)}</div>
      <p className={styles.disclosure}>Membership plans, pricing, and clinical services are under development. Availability will depend on licensed provider partnerships, medical eligibility, and applicable state regulations. Medications and laboratory services may involve additional charges.</p>
      <p className={styles.disclosure}>All benefits are potential inclusions. “Most popular” identifies the proposed featured tier, not measured enrollment. No purchases or recurring billing are available.</p>
    </section>

    <section className={styles.how} aria-labelledby="how-heading"><div className={styles.centerIntro}><p className={styles.eyebrow}>Simple. Thoughtful. Supportive.</p><h2 id="how-heading">How It Works</h2></div><ol className={styles.steps}>{steps.map((step, index) => <li key={step.title}><div className={styles.stepTop}><span className={styles.stepNumber}>{index + 1}</span><span className={styles.stepIcon} aria-hidden="true">{step.icon}</span></div><h3>{step.title}</h3>{step.future && <p className={styles.future}>Future experience · After launch</p>}<p>{step.body}</p></li>)}</ol></section>

    <section className={styles.earlyAccess} id="early-access" aria-labelledby="early-access-heading"><div><p className={styles.eyebrow}>Be part of what’s next</p><h2 id="early-access-heading">A place for you.<br /><span>From the very beginning.</span></h2><p>Join our early-access list for updates as our inclusive care vision takes shape.</p><p className={styles.accessNote}>This is an interest list, not clinical onboarding. We’ll share confirmed launch details, availability, and next steps when they’re ready.</p></div><AffirmingEarlyAccessForm /></section>

    <section className={styles.finalCta}><p className={styles.eyebrow}>Different journeys. Shared belonging.</p><h2>Real care. Real support.<br /><em>Real you.</em></h2><p>Every identity deserves respect. Every journey deserves support. Be among the first to hear about Eve’s Sisters’ expanding vision for inclusive healthcare.</p><a className={styles.goldButton} href="#early-access">Join the early access list <span aria-hidden="true">→</span></a></section>
  </div>;
}
