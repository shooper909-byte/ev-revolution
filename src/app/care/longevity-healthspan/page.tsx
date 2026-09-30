import type { Metadata } from "next";
import { LongevityHealthspan } from "@/components/pillars/LongevityHealthspan";

const canonical = "https://evevolutionhealth.com/care/longevity-healthspan";
export const metadata: Metadata = {
  title: { absolute: "Longevity & Healthspan | Eve’s Sisters" },
  description: "Explore strength, mobility, sleep and healthy-aging wellness information.",
  alternates: { canonical },
  openGraph: { title: "Longevity & Healthspan | Eve’s Sisters", description: "Explore strength, mobility, sleep and healthy-aging wellness information.", url: canonical, type: "website" },
};

export default function Page() {
  return <><div className="border-b border-onyx-700 bg-onyx-900 px-6 py-5 text-center text-sm text-ivory-200">Wellness education. Treatment programs, pricing and enrollment are pending confirmation. <a href="/contact" className="underline">Contact us for current availability.</a></div><LongevityHealthspan /></>;
}
