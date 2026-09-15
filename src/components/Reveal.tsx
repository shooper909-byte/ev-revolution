"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

const offsets: Record<Direction, string> = {
  up: "translate3d(0, 22px, 0)",
  left: "translate3d(-24px, 0, 0)",
  right: "translate3d(24px, 0, 0)",
  none: "none",
};

/**
 * Reveals its children once, the first time they scroll into view.
 *
 * Deliberately tiny: one IntersectionObserver per instance, no animation
 * dependency, and nothing that can trap content in a hidden state. The
 * transition lives in globals.css under `[data-reveal]`, which also forces
 * the revealed state when scripting is off or reduced motion is requested —
 * so the content is never invisible to a reader who cannot run the effect.
 */
export function Reveal({
  children,
  as: Tag = "div",
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  direction?: Direction;
  /** Stagger, in milliseconds. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-shown={shown ? "true" : undefined}
      className={className}
      style={
        {
          "--reveal-offset": offsets[direction],
          "--reveal-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
