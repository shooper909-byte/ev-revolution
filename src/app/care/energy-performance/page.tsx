import type { Metadata } from "next";
import { LaunchCarePage } from "@/components/LaunchCarePage";
import { launchCareBySlug } from "@/lib/launchCare";

/* Read directly: energy is not in `activeLaunchCareSlugs`, so it cannot be
   requested while its availability is pending. */
const category = launchCareBySlug["energy-performance"];

const canonical = "https://evevolutionhealth.com/care/energy-performance";
const title = "Energy & Performance Care Plans | Eve’s Sisters";
const description =
  "Explore clinician-guided energy-support plans. Availability is pending confirmation; join the email waitlist for updates.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
};

export default function EnergyPerformanceCarePage() {
  return <LaunchCarePage category={category} />;
}
