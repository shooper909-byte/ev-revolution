import { handoffNote, telehealthUrl } from "@/lib/telehealth";

/* The one way this site starts care: a button to the matching page on the
   telehealth site, with a line saying the visitor is moving there. */
export function TelehealthHandoff({
  from,
  label = "Start your consultation",
  tone = "dark",
  className = "",
}: {
  /** The page on this site the visitor is leaving. */
  from: string;
  label?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={className}>
      <a
        href={telehealthUrl(from)}
        className={`button-sheen brand-eyebrow inline-block rounded-full px-8 py-4 text-center text-[0.625rem] transition-colors ${
          tone === "dark" ? "bg-champagne text-onyx hover:bg-champagne-200" : "bg-plum text-ivory hover:bg-plum-600"
        }`}
      >
        {label} <span aria-hidden="true">&rarr;</span>
      </a>
      <p className={`mt-4 text-xs leading-relaxed ${tone === "dark" ? "text-ivory-200/70" : "text-onyx-800/70"}`}>{handoffNote}</p>
    </div>
  );
}
