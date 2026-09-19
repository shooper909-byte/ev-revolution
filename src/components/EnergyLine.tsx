/**
 * The slow travelling line under the energy hero.
 *
 * A gentle sine wave, not a monitor trace: no spikes, no QRS complex,
 * nothing that reads as a medical readout. One highlight drifts along a
 * static plum path in champagne, taking eleven seconds to cross.
 *
 * It is `aria-hidden` and sits in a fixed-height box, so it carries no
 * meaning and cannot shift anything around it. The animation is paused
 * unless a MotionScope marks it on screen, and stops entirely under
 * reduced motion.
 */
export function EnergyLine({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 620 48"
      preserveAspectRatio="none"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="energy-base" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--color-plum)" stopOpacity="0" />
          <stop offset="18%" stopColor="var(--color-plum)" stopOpacity="0.85" />
          <stop offset="82%" stopColor="var(--color-mauve)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--color-mauve)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* The resting wave. */}
      <path
        d="M0 24 C 78 24, 78 10, 155 10 S 232 38, 310 38 S 387 12, 465 12 S 542 26, 620 26"
        stroke="url(#energy-base)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* The champagne highlight that travels along it. */}
      <path
        className="energy-travel"
        d="M0 24 C 78 24, 78 10, 155 10 S 232 38, 310 38 S 387 12, 465 12 S 542 26, 620 26"
        stroke="var(--color-champagne)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="34 586"
        opacity="0.9"
      />
    </svg>
  );
}
