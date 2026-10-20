import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
export const metadata: Metadata = { title: "Resources", description: "Find Eve’s Sisters FAQs, service information, privacy policies, and contact details.", alternates: { canonical: "/resources" } };
export default function ResourcesPage() {
  const links = [{ href: "/faq", title: "Frequently asked questions", text: "Learn about Eve’s Sisters and the separate telehealth platform." }, { href: "/services", title: "Services overview", text: "Explore wellness pathways and clearly labeled planned services." }, { href: "/privacy-policy", title: "Privacy Policy", text: "Understand how information is handled." }, { href: "/contact", title: "Contact Eve’s Sisters", text: "Ask a general question about the brand or early access." }];
  return <Container className="py-20"><Eyebrow>Clear information. Thoughtful support.</Eyebrow><h1 className="mt-6 font-display text-5xl">Resources</h1><div className="mt-12 grid gap-6 sm:grid-cols-2">{links.map(link => <Link key={link.href} href={link.href} className="hairline rounded-lg border p-8 hover:bg-plum-900/30"><h2 className="font-display text-2xl">{link.title}</h2><p className="mt-4 text-ivory-200">{link.text}</p><span aria-hidden="true" className="mt-5 block text-champagne">→</span></Link>)}</div></Container>;
}
