import type { Metadata } from "next";
import { MrsExperiencePage } from "@/components/MrsExperiencePage";
import { mrsExperiences } from "@/lib/mrsCollection";

const experience = mrsExperiences[0];
export const metadata: Metadata = { title: "Mrs. Jones | The Mrs. Collection", description: experience.description, alternates: { canonical: "https://evevolutionhealth.com/packages/mrs-jones" } };
export default function MrsJonesPage() { return <MrsExperiencePage experience={experience} />; }
