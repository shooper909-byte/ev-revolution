"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

/* Brand statements, not customer quotes. Nothing here is attributed to a
   client, a patient or a clinician. */
const principles = [
  "Every woman deserves to feel seen in her wellness experience.",
  "Different stages deserve different conversations.",
  "Wellness should evolve as women do.",
  "Science and self-care belong in the same conversation.",
];

const INTERVAL = 6000;
const SWIPE_THRESHOLD = 40;

export function PrincipleCarousel() {
  const regionId = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const go = useCallback(
    (next: number) =>
      setIndex((next + principles.length) % principles.length),
    [],
  );

  // Auto-advance, unless the reader has paused it by hovering, focusing
  // inside the carousel, or asking for reduced motion.
  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % principles.length),
      INTERVAL,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const end = event.changedTouches[0]?.clientX;
        touchStart.current = null;
        if (start == null || end == null) return;
        if (Math.abs(end - start) < SWIPE_THRESHOLD) return;
        go(end < start ? index + 1 : index - 1);
      }}
    >
      <p className="brand-eyebrow text-[0.5625rem] text-champagne-700">
        Eve&rsquo;s Sisters Principles
      </p>

      {/* aria-live announces the statement that replaces the current one,
          which is only useful while the carousel is not auto-advancing. */}
      <div
        id={regionId}
        aria-live={paused ? "polite" : "off"}
        aria-atomic="true"
        className="relative mt-6 grid"
      >
        {principles.map((principle, position) => (
          <p
            key={principle}
            aria-hidden={position === index ? undefined : "true"}
            className={`col-start-1 row-start-1 font-display text-2xl leading-snug text-onyx transition-opacity duration-500 sm:text-[1.75rem] ${
              position === index
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            &ldquo;{principle}&rdquo;
          </p>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-controls={regionId}
            className="hairline flex h-10 w-10 items-center justify-center rounded-full border text-onyx transition-colors hover:bg-onyx hover:text-ivory"
          >
            <span className="sr-only">Previous principle</span>
            <span aria-hidden="true">&larr;</span>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-controls={regionId}
            className="hairline flex h-10 w-10 items-center justify-center rounded-full border text-onyx transition-colors hover:bg-onyx hover:text-ivory"
          >
            <span className="sr-only">Next principle</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        <ul className="flex items-center gap-2.5">
          {principles.map((principle, position) => (
            <li key={principle}>
              <button
                type="button"
                onClick={() => setIndex(position)}
                aria-controls={regionId}
                aria-current={position === index ? "true" : undefined}
                className="flex h-10 w-4 items-center justify-center"
              >
                <span className="sr-only">
                  Show principle {position + 1} of {principles.length}
                </span>
                <span
                  aria-hidden="true"
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    position === index
                      ? "w-6 bg-plum"
                      : "w-1.5 bg-taupe-700/50"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
