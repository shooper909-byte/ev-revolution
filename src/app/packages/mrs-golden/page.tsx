import type { Metadata } from "next";
import { MrsExperiencePage } from "@/components/MrsExperiencePage";
import { mrsExperiences } from "@/lib/mrsCollection";

const experience = mrsExperiences[1];
export const metadata: Metadata = { title: "Mrs. Golden | The Mrs. Collection", description: experience.description, alternates: { canonical: "https://evevolutionhealth.com/packages/mrs-golden" } };
export default function MrsGoldenPage() { return <MrsExperiencePage experience={experience} />; }
