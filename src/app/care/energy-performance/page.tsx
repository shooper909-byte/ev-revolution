import type { Metadata } from "next";
import { LaunchCarePage } from "@/components/LaunchCarePage";
import { requireLaunchCareCategory } from "@/lib/launchCare";

const category = requireLaunchCareCategory("energy-performance");

const canonical = "https://evevolutionhealth.com/care/energy-performance";

export const metadata: Metadata = {
  title: { absolute: "Energy & Performance Care Plans | Eve’s Sisters" },
  description: "Explore clinician-guided energy-support treatment requests with clear, all-in plan pricing.",
  alternates: { canonical },
  openGraph: { title: "Energy & Performance Care Plans | Eve’s Sisters", description: "Clinician-guided energy-support treatment requests from Eve’s Sisters.", url: canonical, type: "website" },
};

export default function EnergyPerformanceCarePage() {
  return <LaunchCarePage category={category} />;
}
