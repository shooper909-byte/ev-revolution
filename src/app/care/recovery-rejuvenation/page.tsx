import type { Metadata } from "next";
import { RecoveryRejuvenation } from "@/components/RecoveryRejuvenation";

const canonical = "https://evevolutionhealth.com/care/recovery-rejuvenation";
export const metadata: Metadata = {
  title: { absolute: "Recovery & Rejuvenation | Eve’s Sisters" },
  description: "Explore rest, movement, sleep and everyday recovery wellness information.",
  alternates: { canonical },
  openGraph: { title: "Recovery & Rejuvenation | Eve’s Sisters", description: "Explore rest, movement, sleep and everyday recovery wellness information.", url: canonical, type: "website" },
};

export default function Page() {
  return <><div className="border-b border-onyx-700 bg-onyx-900 px-6 py-5 text-center text-sm text-ivory-200">Wellness education. Treatment programs, pricing and enrollment are pending confirmation. <a href="/contact" className="underline">Contact us for current availability.</a></div><RecoveryRejuvenation /></>;
}
