import Image from "next/image";
import Link from "next/link";
import { PillarIcon } from "@/components/PillarIcon";
import { careLabel, careSummary, type Pillar } from "@/lib/pillars";

/**
 * One care pathway on the Care hub.
 *
 * The whole card is a single link, so it works with a mouse, a tap or the
 * keyboard, and the title and summary are always visible — hover only adds
 * emphasis, it never reveals information.
 */
export function CareCard({ pillar }: { pillar: Pillar }) {
  return (
    <Link
      href={pillar.carePath ?? `/pillars/${pillar.slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden border border-onyx-700 bg-onyx-900"
    >
      {pillar.careImage && (
        <Image
          src={`/images/care/${pillar.careImage}.webp`}
          alt={pillar.careImageAlt ?? ""}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 88vw"
          className="object-cover transition-transform duration-[450ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
        />
      )}

      {/* Legibility scrim. It deepens slightly on hover, which is the only
          thing hover changes about the reading experience. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-onyx)_4%,color-mix(in_oklab,var(--color-onyx)_78%,transparent)_38%,transparent_72%)] transition-opacity duration-300 group-hover:opacity-[0.92]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-onyx/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* A champagne hairline that draws itself along the foot of the card. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-champagne/70 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-x-100"
      />

      <div className="relative p-7">
        <PillarIcon
          name={pillar.icon}
          className="h-6 w-6 text-champagne opacity-90"
        />
        <h3 className="mt-5 font-display text-[1.6rem] leading-tight text-ivory transition-transform duration-300 group-hover:-translate-y-1">
          {careLabel(pillar)}
        </h3>
        <p className="mt-2.5 text-base leading-relaxed text-ivory-200/85 transition-transform duration-300 group-hover:-translate-y-1">
          {careSummary(pillar)}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ivory-300/80">For women asking: “{pillar.question}”</p>
        <span className="brand-eyebrow mt-6 flex items-center gap-2 text-[0.5625rem] text-champagne">
          Explore Options
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
          >
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
