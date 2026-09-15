import Link from "next/link";

/**
 * The EV-REVOLUTION curvature mark: a champagne-gold feminine silhouette with
 * a single controlled deep-plum ribbon behind it. Gold and ivory carry the
 * mark — the plum is one detail, never a field.
 */
export function CurvatureMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="ev-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-champagne-700)" />
          <stop offset="35%" stopColor="var(--color-champagne-200)" />
          <stop offset="65%" stopColor="var(--color-champagne)" />
          <stop offset="100%" stopColor="var(--color-champagne-700)" />
        </linearGradient>
      </defs>
      {/* Plum hair sweep, set behind the figure — the one controlled
          mulberry detail in the mark. */}
      <path
        d="M23.4 6.2c-5.4 3.6-7.2 9.4-4.6 14.6 2.6 5.2 2 9.8-1.8 13.8-2.8 3-3.9 6.8-3.1 11.2"
        stroke="var(--color-plum-600)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <ellipse cx="26.2" cy="8.6" rx="3.4" ry="3.9" fill="url(#ev-gold)" />
      <path
        d="M27.2 13.2c3 1 5.2 3.4 5.4 6.8.2 3.8-2.4 6-3.2 8.8-.6 2.2-.2 4 1.6 5.8 2.4 2.4 3.4 5.4 2.6 8.8-1 4.4-4 7.6-6 11.6-1.2 2.4-1.6 4.6-1.4 6.4h-3.4c-.2-2.4.4-5 1.8-7.6 2-3.8 4.8-6.8 5.6-10.6.6-2.8-.2-5-2.2-6.8-2.4-2.2-3.2-5-2.4-8s3.2-5.2 3.2-8.2c0-2.8-1.4-5-3.8-6.2Z"
        fill="url(#ev-gold)"
      />
    </svg>
  );
}

export function Wordmark({
  showTagline = true,
  className = "",
}: {
  showTagline?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="Eve's Sisters — home"
    >
      <CurvatureMark className="h-10 w-auto shrink-0 transition-opacity group-hover:opacity-85" />
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-display text-lg tracking-[0.02em] sm:text-xl">
          <span className="gold-text">EVE'S</span>
          <span className="text-ivory"> SISTERS</span>
        </span>
        {showTagline && (
          <span className="brand-eyebrow mt-1.5 whitespace-nowrap text-[0.5rem] text-taupe sm:text-[0.5625rem]">
            The Evolution of a Woman's Body
          </span>
        )}
      </span>
    </Link>
  );
}
