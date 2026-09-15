import Link from "next/link";
import { PillarIcon } from "@/components/PillarIcon";
import type { Pillar } from "@/lib/pillars";

export function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <Link
      href={`/pillars/${pillar.slug}`}
      className={`group relative flex flex-col overflow-hidden border ${pillar.accent.border} bg-onyx-900/60 p-8 transition-colors hover:bg-onyx-800`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${pillar.accent.glow} to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
      />
      <PillarIcon
        name={pillar.icon}
        className={`h-7 w-7 ${pillar.accent.text}`}
      />
      <h3 className="mt-6 font-display text-2xl leading-tight text-ivory">
        {pillar.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ivory-200/75">
        {pillar.tagline}
      </p>
      <span className="brand-eyebrow mt-8 flex items-center gap-2 text-[0.5625rem] text-champagne">
        Explore
        <span
          aria-hidden="true"
          className="inline-block transition-transform group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}
