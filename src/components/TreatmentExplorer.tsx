"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import {
  statusLabels,
  treatmentCategories,
  treatments,
  type CategoryId,
  type Treatment,
  type TreatmentCategory,
} from "@/lib/treatments";

type Filter = CategoryId | "all";

const normalize = (value: string) =>
  value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, " ").trim();

function matches(treatment: Treatment, query: string) {
  if (!query) return true;
  return [treatment.name, ...(treatment.aliases ?? [])].some((name) =>
    normalize(name).includes(query),
  );
}

/**
 * Searchable, filterable treatment list for /treatments.
 *
 * Filtering never hides the disclosure or status copy, and the result count
 * is announced politely so screen-reader users hear what changed.
 */
export function TreatmentExplorer() {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const q = normalize(query);

  const visible = useMemo(
    () =>
      treatmentCategories
        .filter((category) => filter === "all" || category.id === filter)
        .map((category) => ({
          category,
          items: treatments.filter(
            (item) => item.category === category.id && matches(item, q),
          ),
        }))
        // While searching, only categories with matches are shown.
        .filter(({ items }) => !q || items.length > 0),
    [filter, q],
  );

  const count = visible.reduce((total, group) => total + group.items.length, 0);
  const clear = () => {
    setQuery("");
    setFilter("all");
  };

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="relative lg:w-80 lg:shrink-0">
          <label htmlFor={searchId} className="sr-only">
            Search medications by name
          </label>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-champagne"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search medications…"
            autoComplete="off"
            className="hairline w-full rounded-full border bg-onyx/60 py-3.5 pl-11 pr-5 text-sm text-ivory placeholder:text-taupe transition-colors focus:border-champagne focus:outline-none"
          />
        </div>

        <div role="group" aria-label="Filter by care category" className="flex flex-wrap gap-2">
          {([["all", "All treatments"], ...treatmentCategories.map((c) => [c.id, c.label])] as [Filter, string][]).map(
            ([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={filter === id}
                onClick={() => setFilter(id)}
                className={`rounded-full border px-4 py-2.5 text-xs transition-colors ${
                  filter === id
                    ? "border-champagne bg-champagne text-onyx"
                    : "border-ivory-300/30 text-ivory-200 hover:border-champagne hover:text-champagne"
                }`}
              >
                {label}
              </button>
            ),
          )}
        </div>
      </div>

      <p aria-live="polite" className="mt-5 text-xs text-ivory-200/70">
        {count === 1 ? "1 treatment shown." : `${count} treatments shown.`}{" "}
        {treatments.every((item) => item.status !== "confirmed") && (
          <span className="italic">No listing is confirmed available yet.</span>
        )}
      </p>

      {visible.length === 0 ? (
        <div className="hairline mt-10 rounded-2xl border bg-onyx-900/70 p-8 text-center sm:p-12">
          <p className="font-display text-2xl text-ivory">No published treatments match “{query}”.</p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ivory-200/80">
            Check the spelling, try the generic name, or browse all categories. Some
            partner-listed treatments are still under review and are not shown here —
            a clinician can talk through every option with you.
          </p>
          <button
            type="button"
            onClick={clear}
            className="brand-eyebrow mt-7 rounded-full border border-champagne px-6 py-3 text-[0.5625rem] text-champagne transition-colors hover:bg-champagne hover:text-onyx"
          >
            Show all treatments
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-8">
          {visible.map(({ category, items }) => (
            <CategorySection key={category.id} category={category} items={items} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategorySection({
  category,
  items,
}: {
  category: TreatmentCategory;
  items: readonly Treatment[];
}) {
  const headingId = `category-${category.id}`;
  return (
    <section
      aria-labelledby={headingId}
      className="hairline grid overflow-hidden rounded-2xl border bg-onyx-900/80 md:grid-cols-[15rem_1fr]"
    >
      <div className="relative h-44 md:h-auto">
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          sizes="(min-width: 768px) 240px, 100vw"
          className="object-cover object-top"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-onyx-900)_0%,transparent_60%)] md:bg-[linear-gradient(to_left,var(--color-onyx-900)_0%,transparent_45%)]"
        />
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 id={headingId} className="font-display text-[1.75rem] leading-tight text-ivory">
              {category.label}
            </h2>
            <p className="brand-eyebrow mt-2 text-[0.5rem] text-taupe">{category.eyebrow}</p>
          </div>
          <span className="rounded-full border border-champagne/60 px-3 py-1.5 text-[0.6875rem] text-champagne">
            Pending confirmation
          </span>
        </div>

        {items.length > 0 ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.id}>
                <TreatmentCard item={item} category={category} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-ivory-300/25 p-5">
            <p className="text-sm leading-relaxed text-ivory-200/85">{category.pendingNote}</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              <CareLinks category={category} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function TreatmentCard({ item, category }: { item: Treatment; category: TreatmentCategory }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-ivory-300/15 bg-onyx/50 p-5">
      <h3 className="font-display text-xl text-ivory">{item.name}</h3>
      <p className="mt-1.5 text-xs text-taupe">
        {item.form} ·{" "}
        {item.formulation === "compounded"
          ? "Compounded formulation"
          : "Compounding status pending confirmation"}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ivory-200/90">{item.description}</p>
      {item.caution && (
        <p className="mt-3 border-l border-mauve/60 pl-3 text-xs leading-relaxed text-ivory-200/75">
          {item.caution}
        </p>
      )}
      <p className="mt-4 flex items-center gap-2 text-xs text-champagne">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne" />
        {statusLabels[item.status]}
      </p>
      <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-5">
        <CareLinks category={category} treatmentName={item.name} />
      </div>
    </article>
  );
}

function CareLinks({
  category,
  treatmentName,
}: {
  category: TreatmentCategory;
  treatmentName?: string;
}) {
  const about = treatmentName ? ` for ${treatmentName}` : ` for ${category.label}`;
  return (
    <>
      <Link
        href={category.pathway.href}
        className="group text-sm text-champagne underline-offset-4 hover:underline"
      >
        Explore Care<span className="sr-only">{about}</span>
        <span aria-hidden="true" className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
          &rarr;
        </span>
      </Link>
      <Link
        href={category.waitlistHref}
        className="text-sm text-ivory-200 underline underline-offset-4 hover:text-champagne"
      >
        Join the Waitlist<span className="sr-only">{about}</span>
      </Link>
    </>
  );
}
