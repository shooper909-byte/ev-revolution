import type { Metadata } from "next";
import { LaunchCarePage } from "@/components/LaunchCarePage";
import { requireLaunchCareCategory } from "@/lib/launchCare";

const category = requireLaunchCareCategory("hormones-menopause");

const canonical = "https://evevolutionhealth.com/care/hormones-menopause";

export const metadata: Metadata = {
  title: { absolute: "Menopause & Hormone Care Plans | Eve’s Sisters" },
  description: "Explore clinician-guided menopause and hormone-care treatment requests with clear, all-in plan pricing.",
  alternates: { canonical },
  openGraph: { title: "Menopause & Hormone Care Plans | Eve’s Sisters", description: "Private, clinician-guided treatment requests for menopause and hormone care.", url: canonical, type: "website" },
};

export default function HormonesMenopauseCarePage() {
  return <LaunchCarePage category={category} />;
}
