import type { Metadata } from "next";
import { MrsExperiencePage } from "@/components/MrsExperiencePage";
import { mrsExperiences } from "@/lib/mrsCollection";

const experience = mrsExperiences[2];
export const metadata: Metadata = { title: "Mrs. Robinson | The Mrs. Collection", description: experience.description, alternates: { canonical: "https://evevolutionhealth.com/packages/mrs-robinson" } };
export default function MrsRobinsonPage() { return <MrsExperiencePage experience={experience} />; }
