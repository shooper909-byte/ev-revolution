import type { Metadata } from "next";
import { LaunchCarePage } from "@/components/LaunchCarePage";
import { requireLaunchCareCategory } from "@/lib/launchCare";

const category = requireLaunchCareCategory("longevity-healthspan");

const canonical = "https://evevolutionhealth.com/care/longevity-healthspan";

export const metadata: Metadata = {
  title: { absolute: "Longevity & Healthspan Care Plans | Eve’s Sisters" },
  description: "Explore clinician-guided longevity and healthspan treatment requests with clear, all-in plan pricing.",
  alternates: { canonical },
  openGraph: { title: "Longevity & Healthspan Care Plans | Eve’s Sisters", description: "Clinician-guided longevity and healthspan treatment requests from Eve’s Sisters.", url: canonical, type: "website" },
};

export default function LongevityHealthspanCarePage() {
  return <LaunchCarePage category={category} />;
}
