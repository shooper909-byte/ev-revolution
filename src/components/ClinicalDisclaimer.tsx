import { clinicalDisclaimer } from "@/lib/mrsCollection";

/* Partner URLs inside the disclaimer text render as links. */
const url = /(https:\/\/[^\s)]+)/;

export function ClinicalDisclaimer() {
  return <p className="mx-auto mt-10 max-w-5xl border-t border-champagne/25 pt-7 text-xs leading-6 text-ivory-200/75">{clinicalDisclaimer.split(url).map((part, index) => url.test(part) ? <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-champagne underline underline-offset-4 hover:text-champagne-200">{part.replace("https://", "")}</a> : part)}</p>;
}
