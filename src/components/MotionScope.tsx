"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Runs the continuous animations inside it only while it is on screen.
 *
 * The CSS in globals.css parks `.energy-travel` and `.aurora` at
 * `animation-play-state: paused` and starts them under `[data-motion="on"]`,
 * so an off-screen hero costs nothing — no compositing, no wasted frames in a
 * background tab. Without JavaScript the attribute never appears and the
 * animations simply never start, which is the safe resting state.
 */
export function MotionScope({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => setActive(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: "120px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-motion={active ? "on" : undefined} className={className}>
      {children}
    </div>
  );
}
