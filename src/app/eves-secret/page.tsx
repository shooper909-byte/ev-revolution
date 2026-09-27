import type { Metadata } from "next";
import { LaunchCarePage } from "@/components/LaunchCarePage";
import { requireLaunchCareCategory } from "@/lib/launchCare";

const category = requireLaunchCareCategory("eves-secret");

const canonical = "https://evevolutionhealth.com/eves-secret";

export const metadata: Metadata = {
  title: { absolute: "Eve’s Secret™ Private Care | Eve’s Sisters" },
  description: "Discreet clinician-guided treatment requests for desire and intimate wellness concerns, with clear all-in plan pricing.",
  alternates: { canonical },
  openGraph: { title: "Eve’s Secret™ Private Care | Eve’s Sisters", description: "Private, adult-facing clinician-guided treatment requests from Eve’s Sisters.", url: canonical, type: "website" },
};

export default function EvesSecretPage() {
  return <LaunchCarePage category={category} />;
}
