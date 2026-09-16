import type { Metadata } from "next";
import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Container, Eyebrow } from "@/components/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Reveal } from "@/components/Reveal";
import { formatPostDate, posts } from "@/lib/posts";
import s from "./Journal.module.css";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Evidence-led writing on hormones, metabolism, skin, energy, recovery and longevity — for women at every stage.",
};


const topics = ["All Topics", "Hormones", "Menopause", "Weight Management", "Skin & Beauty", "Energy", "Mental Health", "Longevity", "Nutrition", "Lifestyle"];
const stages = ["TEENS", "TWENTIES", "THIRTIES", "FORTIES", "FIFTIES", "BEYOND"];
function Photo({ name, priority = false }: { name: "hero" | "feature" | "stages" | "newsletter"; priority?: boolean }) {
  const src = `/images/journal/journal-${name}.jpg`;
  return <div className={s.photo} aria-hidden="true">{existsSync(join(process.cwd(), "public", src)) ? <Image src={src} alt="" fill sizes="(max-width: 767px) 100vw, 60vw" priority={priority} className={s.image} /> : <div className={s.fallback} />}</div>;
}
export default function JournalPage() {
  const [lead, ...rest] = posts;
  return <div className={s.journal}>
    <section className={s.hero} aria-labelledby="journal-title"><Photo name="hero" priority /><div className={s.shade} /><Container className={s.heroContent}><Reveal><Eyebrow>The Eve’s Sisters Journal</Eyebrow><h1 id="journal-title">Real Conversations.<br /><em>Real Solutions.</em></h1><p>Evidence-informed insights, practical guidance and perspectives for every stage of a woman’s life.</p><div className={s.search}><label htmlFor="journal-search">Search the Journal</label><div><span aria-hidden="true">⌕</span><input id="journal-search" type="search" placeholder="Search articles, topics, or keywords…" disabled aria-describedby="search-note" /></div><small id="search-note">Search coming soon. Explore the topics below.</small></div></Reveal></Container></section>
    <nav className={s.topics} aria-label="Journal topics"><Container><ul>{topics.map(topic=>{const term=topic === "Weight Management" ? "Weight" : topic;const match=posts.find(post=>post.pillar.includes(term));return <li key={topic}><a href={match ? `#post-${match.slug}` : "#articles"}>{topic}</a></li>})}</ul></Container></nav>
    <section id="articles" className={s.section} aria-label="Featured and upcoming articles"><Container><div className={s.featureGrid}><Reveal as="article" className={s.lead} ><div id={`post-${lead.slug}`} className={s.anchor} /><Photo name="feature" /><div className={s.cardCopy}><Eyebrow>Featured · {lead.pillar}</Eyebrow><h2>{lead.title}</h2><p>{lead.excerpt}</p><p className={s.date}>{formatPostDate(lead.date)} · {lead.readingTime}</p><a href="#newsletter" className={s.arrow}>Get publication updates <span aria-hidden="true">→</span></a></div></Reveal><div className={s.smallGrid}>{rest.slice(0,4).map((post,index)=><Reveal as="article" key={post.slug} delay={index*70} className={s.card}><div id={`post-${post.slug}`} className={s.anchor} /><Photo name="feature" /><div className={s.cardCopy}><Eyebrow>{post.pillar}</Eyebrow><h2>{post.title}</h2><p>{post.excerpt}</p><p className={s.date}>{formatPostDate(post.date)} · {post.readingTime}</p><a href="#newsletter" className={s.arrow}>Get updates <span aria-hidden="true">→</span></a></div></Reveal>)}</div></div>{rest.slice(4).map(post=><Reveal as="article" key={post.slug} className={s.remaining}><div id={`post-${post.slug}`} className={s.anchor} /><Eyebrow>{post.pillar}</Eyebrow><h2>{post.title}</h2><p>{post.excerpt}</p><p className={s.date}>{formatPostDate(post.date)} · {post.readingTime}</p></Reveal>)}<p className={s.notice}>Full articles are in production. Join the list below and we will send each one as it publishes.</p></Container></section>
    <section className={s.lifeStages} aria-labelledby="stages-title"><Container><Reveal><Eyebrow>Explore by Life Stage</Eyebrow><h2 id="stages-title">Guidance for <em>Every Chapter.</em></h2><p>Find perspectives for the questions that evolve with you.</p></Reveal><div className={s.stageGrid}>{stages.map((stage,index)=><Reveal key={stage} delay={index*60}><a href="#articles" className={s.stage}><Photo name="stages" /><span>{stage}</span><span className={s.stageAction}>Browse articles →</span></a></Reveal>)}</div></Container></section>
    <section className={s.section} aria-labelledby="popular-title"><Container className={s.popular}><Reveal><Eyebrow>Topics to Explore</Eyebrow><h2 id="popular-title">What Women Are<br /><em>Reading Right Now</em></h2><p>From our editorial collection. Explore upcoming pieces and join the list for publication updates.</p></Reveal><ol>{posts.slice(0,5).map((post,index)=><Reveal as="li" key={post.slug} delay={index*60}><a href={`#post-${post.slug}`}><span className={s.number}>{String(index+1).padStart(2,"0")}</span><span>{post.title}</span><span aria-hidden="true">→</span></a></Reveal>)}</ol></Container></section>
    <section id="newsletter" className={s.newsletter} aria-labelledby="newsletter-title"><Photo name="newsletter" /><div className={s.shade} /><Container className={s.newsletterContent}><Reveal><Eyebrow>Stay in the Know</Eyebrow><h2 id="newsletter-title">Get the Latest<br /><em>From Eve’s Sisters</em></h2><p>New articles, thoughtful perspectives and resources for every stage.</p></Reveal><NewsletterSignup /></Container></section>
  </div>;
}
