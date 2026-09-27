import { MrsEditorialPage } from "@/components/MrsEditorialPage";
import { mrsExperiences } from "@/lib/mrsCollection";

export default function MrsGoldenPage() {
  return <MrsEditorialPage experience={mrsExperiences[1]} />;
}
