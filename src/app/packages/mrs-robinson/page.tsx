import { MrsEditorialPage } from "@/components/MrsEditorialPage";
import { mrsExperiences } from "@/lib/mrsCollection";

export default function MrsRobinsonPage() {
  return <MrsEditorialPage experience={mrsExperiences[2]} />;
}
