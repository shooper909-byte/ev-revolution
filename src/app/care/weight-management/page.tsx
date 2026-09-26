import type { Metadata } from "next";
import { LaunchCarePage } from "@/components/LaunchCarePage";
import { requireLaunchCareCategory } from "@/lib/launchCare";

const category = requireLaunchCareCategory("weight-management");

const canonical = "https://evevolutionhealth.com/care/weight-management";

export const metadata: Metadata = {
  title: { absolute: "Weight Management Plans | Eve’s Sisters" },
  description: "Explore clinician-guided weight-management treatment requests and all-in monthly plan options from Eve’s Sisters.",
  alternates: { canonical },
  openGraph: { title: "Weight Management Plans | Eve’s Sisters", description: "Clinician-guided weight-management requests with clear, all-in plan pricing.", url: canonical, type: "website" },
};

export default function WeightManagementCarePage() {
  return <LaunchCarePage category={category} />;
}
