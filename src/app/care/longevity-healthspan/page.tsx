import type { Metadata } from "next";
import { LaunchCarePage } from "@/components/LaunchCarePage";
import { launchCareBySlug } from "@/lib/launchCare";

/* Read directly: longevity is not in `activeLaunchCareSlugs`, so it cannot be
   requested while its availability is pending. */
const category = launchCareBySlug["longevity-healthspan"];

const canonical = "https://evevolutionhealth.com/care/longevity-healthspan";
const title = "Longevity & Healthspan Care Plans | Eve’s Sisters";
const description =
  "Explore clinician-guided longevity and healthspan plans. Availability is pending confirmation; join the email waitlist for updates.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
};

export default function LongevityHealthspanCarePage() {
  return <LaunchCarePage category={category} />;
}
