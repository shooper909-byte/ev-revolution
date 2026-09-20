import { Reveal } from "@/components/Reveal";
import type { MrsExperience } from "@/lib/mrsCollection";

export function AddOnPackGrid({ addOns }: { addOns: MrsExperience["addOns"] }) {
  return <>
    <div className="grid gap-5 md:grid-cols-3">
      {addOns.map((addOn, index) => <Reveal key={addOn.name} delay={index * 60} className="h-full">
        <article className="h-full rounded-xl border border-plum-500/60 border-l-4 bg-onyx-800 p-6">
          <div className="flex items-start justify-between gap-4"><h3 className="font-display text-2xl text-ivory">{addOn.name}</h3><span className="shrink-0 font-semibold text-champagne">{addOn.price}</span></div>
          <p className="mt-4 text-sm leading-6 text-ivory-200">{addOn.description}</p>
        </article>
      </Reveal>)}
    </div>
    <p className="mt-7 text-center text-sm leading-6 text-ivory-200/75">Any member may select any available add-on pack. Add-ons may be changed or canceled according to the membership terms.</p>
  </>;
}
