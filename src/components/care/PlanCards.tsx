import Image from "next/image";
import { Reveal } from "@/components/Reveal";

/* ------------------------------------------------------------------
   Subscription cards, shared by the care pages.

   A plan buys clinical support. Nothing here states or implies that a
   medication follows from paying for one, which is why every card can carry
   a `treatments` note ("when clinically appropriate") and a footnote about
   eligibility and separate costs.
   ------------------------------------------------------------------ */

export type Plan = {
  id: string;
  title: string;
  price: string;
  priceNote?: string;
  /** Small word before the price, e.g. "From". */
  pricePrefix?: string;
  description: string;
  includes: string[];
  treatments?: { label: string; body: string };
  cta: string;
  /** Where the card's button goes. Defaults to the assessment form. */
  href?: string;
  footnote: string;
  featured?: boolean;
  badge?: string;
  image?: string;
  imageAlt?: string;
};

/* Champagne type does not meet contrast on ivory, so light sections take
   their accent — and their focus ring — from plum. */
export const onIvoryFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-plum";

export function Check({ className = "mt-0.5 h-4 w-4 shrink-0" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function PlanCards({ plans }: { plans: Plan[] }) {
  // Three plans read best in thirds. Four in a row would leave each card
  // about 260px wide inside the container, so they pair off into a 2x2
  // instead and keep their line lengths readable.
  const columns = plans.length >= 4 ? "sm:grid-cols-2" : "lg:grid-cols-3";

  return (
    <div className={`mt-14 grid gap-6 ${columns} lg:gap-7`}>
      {plans.map((plan, index) => (
        <Reveal key={plan.id} delay={index * 90} className="h-full">
          <div
            id={plan.id}
            className={`group relative flex h-full scroll-mt-28 flex-col rounded-3xl p-8 sm:p-9 ${
              plan.featured
                ? "border border-champagne bg-plum-900 text-ivory shadow-[0_26px_70px_-40px_rgba(8,11,11,0.9)]"
                : "border border-onyx/12 bg-white/70 text-onyx"
            }`}
          >
            {plan.image && plan.imageAlt && (
              <div className="relative -mx-8 -mt-8 mb-7 aspect-[4/3] overflow-hidden rounded-t-[calc(1.5rem-1px)] sm:-mx-9 sm:-mt-9">
                <Image
                  src={plan.image}
                  alt={plan.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                  className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-onyx/35 to-transparent" />
              </div>
            )}
            {plan.badge && (
              <span
                className={`brand-eyebrow absolute -top-3 left-8 rounded-full px-4 py-1.5 text-[0.5rem] ${
                  plan.featured
                    ? "bg-champagne text-onyx"
                    : "bg-plum text-ivory"
                }`}
              >
                {plan.badge}
              </span>
            )}

            <h3
              className={`font-display text-[1.75rem] leading-tight ${
                plan.featured ? "text-ivory" : "text-onyx"
              }`}
            >
              {plan.title}
            </h3>

            <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
              {plan.pricePrefix && (
                <span
                  className={`text-sm ${
                    plan.featured ? "text-ivory-200/80" : "text-onyx-800/70"
                  }`}
                >
                  {plan.pricePrefix}
                </span>
              )}
              <span
                className={`font-display text-[2.5rem] leading-none ${
                  plan.featured ? "text-champagne" : "text-plum"
                }`}
              >
                {plan.price}
              </span>
              <span
                className={`text-sm ${
                  plan.featured ? "text-ivory-200/80" : "text-onyx-800/70"
                }`}
              >
                {plan.priceNote}
              </span>
            </p>

            <p
              className={`mt-5 text-sm leading-relaxed ${
                plan.featured ? "text-ivory-200/85" : "text-onyx-800/75"
              }`}
            >
              {plan.description}
            </p>

            <ul className="mt-7 grid gap-3">
              {plan.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className={plan.featured ? "text-champagne" : "text-plum"}>
                    <Check />
                  </span>
                  <span
                    className={`text-sm leading-relaxed ${
                      plan.featured ? "text-ivory-200/90" : "text-onyx-800/85"
                    }`}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {plan.treatments && (
              <p
                className={`mt-7 rounded-2xl px-5 py-4 text-xs leading-relaxed ${
                  plan.featured
                    ? "bg-onyx/35 text-ivory-200/80"
                    : "bg-ivory-200/60 text-onyx-800/75"
                }`}
              >
                <span
                  className={`brand-eyebrow block text-[0.5rem] ${
                    plan.featured ? "text-champagne" : "text-plum"
                  }`}
                >
                  {plan.treatments.label}
                </span>
                <span className="mt-2 block">{plan.treatments.body}</span>
              </p>
            )}

            <div className="mt-auto pt-8">
              <a
                href={plan.href ?? "#get-started"}
                className={`button-sheen brand-eyebrow block rounded-full px-7 py-4 text-center text-[0.625rem] transition-colors ${
                  plan.featured
                    ? "bg-champagne text-onyx hover:bg-champagne-200"
                    : `bg-plum text-ivory hover:bg-plum-600 ${onIvoryFocus}`
                }`}
              >
                {plan.cta}
              </a>
              <p
                className={`mt-4 text-xs leading-relaxed ${
                  plan.featured ? "text-ivory-200/75" : "text-onyx-800/70"
                }`}
              >
                {plan.footnote}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
