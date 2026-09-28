import type { Metadata } from "next";
import { notFound } from "next/navigation";

const canonical = "https://evevolutionhealth.com/care/recovery-rejuvenation";

export const metadata: Metadata = {
  title: { absolute: "Recovery & Rejuvenation Care Plans | Eve’s Sisters" },
  description: "Explore clinician-guided recovery and rejuvenation treatment requests with clear, all-in plan pricing.",
  alternates: { canonical },
  openGraph: { title: "Recovery & Rejuvenation Care Plans | Eve’s Sisters", description: "Clinician-guided recovery and rejuvenation treatment requests from Eve’s Sisters.", url: canonical, type: "website" },
};

export default function RecoveryRejuvenationCarePage() {
  notFound();
}
