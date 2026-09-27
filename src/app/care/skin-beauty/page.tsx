import type { Metadata } from "next";
import { LaunchCarePage } from "@/components/LaunchCarePage";
import { requireLaunchCareCategory } from "@/lib/launchCare";

const category = requireLaunchCareCategory("skin-beauty");

const canonical = "https://evevolutionhealth.com/care/skin-beauty";

export const metadata: Metadata = {
  title: { absolute: "Skin & Beauty Care Plans | Eve’s Sisters" },
  description: "Explore clinician-guided skin and beauty treatment requests with clear, all-in plan pricing.",
  alternates: { canonical },
  openGraph: { title: "Skin & Beauty Care Plans | Eve’s Sisters", description: "Private, clinician-guided treatment requests for skin and beauty care.", url: canonical, type: "website" },
};

export default function SkinBeautyCarePage() {
  return <LaunchCarePage category={category} />;
}
