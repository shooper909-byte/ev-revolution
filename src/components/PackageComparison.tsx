import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const plans = [
  { name: "Essentials", price: "$199", features: ["45-minute clinician intake", "Baseline labs and yearly recheck", "Hormone prescriptions included when prescribed", "Message your care team at any time"] },
  { name: "Signature", price: "$399", popular: true, features: ["Everything in Essentials", "Monthly check-ins for the first three months", "Quarterly lab panels", "Monthly coaching", "One add-on pack included", "Weight-management medication evaluation and prescribing when clinically appropriate", "Medication billed separately"] },
  { name: "Elite", price: "$799", subtitle: "Premium clinician-guided care", features: ["Everything in Signature", "Monthly one-on-one clinician visits", "Weight-management medication included when prescribed", "Weekly coaching", "Two add-on packs included", "Same-day concierge messaging"] },
];

export function PackageComparison({ compact = false }: { compact?: boolean }) {
  return <div className="grid items-stretch gap-6 lg:grid-cols-3">
    {plans.map((plan, index) => <Reveal key={plan.name} delay={index * 60} className="h-full">
      <article className={`relative flex h-full flex-col rounded-2xl border bg-onyx p-7 ${plan.popular ? "border-2 border-champagne shadow-[0_0_28px_rgba(200,164,106,.14)] lg:scale-[1.025]" : "border-plum-600/70"}`}>
        {plan.popular && <span className="brand-eyebrow absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-champagne px-4 py-2 text-[0.55rem] text-onyx">MOST POPULAR</span>}
        <h3 className="font-display text-3xl text-ivory">{plan.name}</h3>
        <p className="mt-2 font-display text-4xl text-champagne">{plan.price}<span className="ml-1 font-sans text-sm text-ivory-200">/month</span></p>
        {plan.subtitle && <p className="mt-3 text-sm font-semibold text-champagne">{plan.subtitle}</p>}
        <ul className={`mt-6 flex-1 space-y-3 text-sm leading-6 text-ivory-200 ${compact ? "lg:min-h-[12rem]" : ""}`}>
          {plan.features.map((feature) => <li key={feature} className="flex gap-3"><span aria-hidden="true" className="text-plum-400">●</span><span>{feature}</span></li>)}
        </ul>
        <Link href="/care/weight-management#get-started" className={`brand-eyebrow mt-7 rounded-full px-5 py-4 text-center text-[0.625rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne ${plan.popular ? "button-sheen bg-champagne text-onyx" : "border border-champagne text-champagne hover:bg-champagne hover:text-onyx"}`}>Choose {plan.name}</Link>
      </article>
    </Reveal>)}
  </div>;
}
