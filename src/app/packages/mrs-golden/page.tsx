import type { Metadata } from "next";
import { MrsEditorialPage } from "@/components/MrsEditorialPage";
import { mrsExperiences } from "@/lib/mrsCollection";

export const metadata: Metadata = {
  title: "Mrs. Golden",
  alternates: { canonical: "/packages/mrs-golden" },
};

export default function MrsGoldenPage() {
  return <MrsEditorialPage experience={mrsExperiences[1]} />;
}
