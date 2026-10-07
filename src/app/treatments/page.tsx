import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";

export const metadata: Metadata = {
  title: "Treatments & Medications",
  description: "Eve’s Sisters treatment plans, starting prices and current availability.",
  alternates: { canonical: "/treatments" },
};

const groups = [
  {
    label: "Weight Management",
    href: "/care/weight-management",
    rows: [
      ["Compounded semaglutide — all doses", "$219 / month"],
      ["Compounded tirzepatide — all doses", "$319 / month"],
      ["Compounded semaglutide — lower-dose maintenance", "$179 / month"],
      ["Compounded tirzepatide — lower-dose maintenance", "$219 / month"],
      ["Eve Complete", "$329 / month"],
      ["Eve Complete Plus", "$429 / month"],
      ["Signature bundle", "$269 / month"],
      ["Elite bundle", "$379 / month"],
    ],
  },
  {
    label: "Menopause & Hormones",
    href: "/care/hormones-menopause",
    rows: [
      ["Oral HRT", "$159 / month"],
      ["Cream HRT", "$159 / month"],
      ["Patch HRT", "$199 / month"],
      ["Hormone Signature", "$209 / month"],
      ["Hormone lab panel", "$179 one-time"],
    ],
  },
  {
    label: "Energy & Longevity",
    href: "/care/energy-performance",
    rows: [
      ["NAD+ injection", "$199 / month"],
      ["NAD+ nasal spray", "$149 / month"],
      ["Sermorelin", "$199 / month"],
      ["Eve Radiance — members only", "$269 / month"],
    ],
  },
  {
    label: "Eve’s Secret™",
    href: "/eves-secret",
    rows: [
      ["Eve’s Secret™ sexual wellness plans", "Starting at $119 / month"],
      ["Eve Desire", "$179 / month"],
      ["Eve’s Secret Troche (Fem Max)", "$149 / month"],
      ["Olympus Troche", "$119 / month"],
      ["PT-141 Starter", "$129 one-time per 90 days"],
    ],
  },
] as const;

const comingSoon = [
  "Eve Balance — Hormone Balance + Energy",
  "Skin Health — prescription skincare, including tretinoin-based treatments",
  "Hair Health — prescription hair-thinning treatments",
  "Sexual Wellness — additional daily and as-needed options",
  "Thyroid Support",
  "Men’s Health",
  "Advanced Peptide Therapies — pending regulatory review",
] as const;

export default function TreatmentsPage() {
  return (
    <main>
      <section className="border-b border-onyx-700"><Container className="py-20 sm:py-28"><Eyebrow>Current treatment list</Eyebrow><h1 className="mt-8 max-w-4xl font-display text-[2.5rem] leading-[1.08] text-ivory sm:text-6xl">Plans, starting prices and availability.</h1><p className="mt-8 max-w-3xl text-base leading-relaxed text-ivory-200/85">A licensed provider decides whether any option is appropriate. State and pharmacy availability may vary. Labs are separate unless a card states otherwise.</p><p className="mt-5 max-w-3xl text-sm leading-relaxed text-ivory-200/75">Compounded medications are not FDA-approved. The FDA does not evaluate compounded medications for safety, effectiveness, or quality.</p></Container></section>

      <section className="bg-onyx-900"><Container className="grid gap-6 py-16 sm:grid-cols-2 sm:py-20">
        {groups.map((group) => <article key={group.label} className="hairline flex h-full flex-col border p-7 sm:p-9"><h2 className="font-display text-3xl text-ivory">{group.label}</h2><ul className="mt-6 flex-1 space-y-4">{group.rows.map(([name, price]) => <li key={name} className="border-t border-onyx-700 pt-4"><h3 className="text-base font-medium text-ivory">{name}</h3><p className="mt-2 text-sm text-champagne">{price}</p></li>)}</ul><Link href={group.href} className="brand-eyebrow mt-8 text-[0.625rem] text-champagne hover:underline">Review eligibility and pricing →</Link></article>)}
      </Container></section>

      <section className="border-t border-onyx-700 bg-ivory text-onyx"><Container className="py-16 sm:py-20"><Eyebrow className="text-plum">Coming soon — join the waitlist</Eyebrow><h2 className="mt-6 font-display text-3xl sm:text-5xl">Programs in development</h2><ul className="mt-8 grid gap-4 sm:grid-cols-2">{comingSoon.map((item) => <li key={item} className="rounded-2xl border border-plum/20 bg-white p-5 text-sm leading-7">{item}</li>)}</ul><p className="mt-8 text-sm text-onyx-800/70">Waitlist only. Online requests are not open yet, and no payment is taken.</p></Container></section>
    </main>
  );
}
