"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PillarIcon } from "@/components/PillarIcon";
import type { Pillar } from "@/lib/pillars";

export function PillarCard({ pillar }: { pillar: Pillar }) {
  const [imageAvailable, setImageAvailable] = useState(Boolean(pillar.careImage));

  return (
    <Link
      href={`/pillars/${pillar.slug}`}
      className={`group relative flex min-h-[285px] flex-col overflow-hidden border ${pillar.accent.border} bg-onyx-900/60 p-8 transition-colors hover:bg-onyx-800 sm:min-h-[300px] lg:min-h-[310px]`}
    >
      {pillar.careImage && imageAvailable && (
        <Image
          src={`/images/care/${pillar.careImage}.webp`}
          alt={pillar.careImageAlt ?? ""}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          onError={() => setImageAvailable(false)}
          className="object-cover object-right transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      )}

      {imageAvailable && pillar.careImage ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,11,0.98)_0%,rgba(8,11,11,0.92)_38%,rgba(8,11,11,0.58)_68%,rgba(8,11,11,0.2)_100%)]"
        />
      ) : (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${pillar.accent.glow} to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none`}
        />
      )}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ivory/0 transition-colors group-hover:ring-ivory/20 motion-reduce:transition-none"
      />

      <div className="relative z-10 flex h-full max-w-[78%] flex-1 flex-col">
        <PillarIcon
          name={pillar.icon}
          className={`h-7 w-7 ${pillar.accent.text}`}
        />
        <h3 className="mt-6 font-display text-2xl leading-tight text-ivory">
          {pillar.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ivory-200/90">
          {pillar.tagline}
        </p>
        <span className="brand-eyebrow mt-auto flex items-center gap-2 pt-8 text-[0.5625rem] text-champagne">
          Explore
          <span
            aria-hidden="true"
            className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          >
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
