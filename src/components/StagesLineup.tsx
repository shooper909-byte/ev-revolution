import { CurvatureMark } from "@/components/Wordmark";

/**
 * "Different stages. The same power." — the brand's stages lineup, rendered
 * from the curvature mark at rising scale so it holds without photography.
 * Drop /public/images/stages.jpg in to replace this with the campaign image.
 */
const stages = [
  { label: "20s", scale: "h-10 sm:h-16", opacity: "opacity-35" },
  { label: "30s", scale: "h-12 sm:h-[4.5rem]", opacity: "opacity-50" },
  { label: "40s", scale: "h-14 sm:h-20", opacity: "opacity-65" },
  { label: "50s", scale: "h-16 sm:h-24", opacity: "opacity-80" },
  { label: "60s", scale: "h-20 sm:h-28", opacity: "opacity-90" },
  { label: "70s+", scale: "h-24 sm:h-32", opacity: "opacity-100" },
];

export function StagesLineup() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,var(--color-plum-900),transparent)] opacity-70 blur-2xl"
      />
      <ul className="relative flex items-end justify-center gap-2 sm:gap-5">
        {stages.map((stage) => (
          <li key={stage.label} className="flex flex-col items-center gap-3">
            <CurvatureMark className={`${stage.scale} w-auto ${stage.opacity}`} />
            <span className="brand-eyebrow text-[0.5rem] text-taupe">
              {stage.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
