import type { Metadata } from "next";
import { MrsEditorialPage } from "@/components/MrsEditorialPage";
import { mrsExperiences } from "@/lib/mrsCollection";

export const metadata: Metadata = {
  title: "Mrs. Jones",
  alternates: { canonical: "/packages/mrs-jones" },
};

export default function MrsJonesPage() {
  return <MrsEditorialPage experience={mrsExperiences[0]} />;
}
