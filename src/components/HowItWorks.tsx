import { Reveal } from "@/components/Reveal";

const steps = [
  ["Book your intake", "Complete a 45-minute video visit with a licensed clinician."],
  ["Get your labs and care plan", "Complete any clinically appropriate testing and receive a plan based on your results and goals."],
  ["Receive ongoing care", "Access follow-ups, adjustments, coaching, and secure care-team messaging according to your membership."],
];

export function HowItWorks() {
  return <div className="grid gap-8 md:grid-cols-3">
    {steps.map(([title, copy], index) => <Reveal key={title} delay={index * 60}>
      <article className="border-t border-champagne/50 pt-6"><span className="font-display text-4xl text-champagne">{index + 1}.</span><h3 className="mt-3 font-display text-2xl text-ivory">{title}</h3><p className="mt-3 leading-7 text-ivory-200">{copy}</p></article>
    </Reveal>)}
  </div>;
}
