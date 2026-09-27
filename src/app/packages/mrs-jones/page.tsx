import { MrsEditorialPage } from "@/components/MrsEditorialPage";
import { mrsExperiences } from "@/lib/mrsCollection";

export default function MrsJonesPage() {
  return <MrsEditorialPage experience={mrsExperiences[0]} />;
}
