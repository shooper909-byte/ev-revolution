import type { Metadata } from "next";
import { MrsEditorialPage } from "@/components/MrsEditorialPage";
import { mrsExperiences } from "@/lib/mrsCollection";

export const metadata: Metadata = {
  title: "Mrs. Robinson",
  alternates: { canonical: "/packages/mrs-robinson" },
};

export default function MrsRobinsonPage() {
  return <MrsEditorialPage experience={mrsExperiences[2]} />;
}
