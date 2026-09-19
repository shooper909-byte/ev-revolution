import { Reveal } from "@/components/Reveal";

/** The numbered pathway shown on the care pages, on an ivory section. */
export function Steps({ steps }: { steps: [string, string][] }) {
  return (
    <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {steps.map(([title, body], index) => (
        <li key={title}>
          <Reveal delay={index * 80}>
            <div className="border-t border-plum/30 pt-6">
              <span className="brand-eyebrow font-display text-2xl not-italic text-plum">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl leading-snug text-onyx">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-onyx-800/75">
                {body}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
