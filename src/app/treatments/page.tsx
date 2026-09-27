import { permanentRedirect } from "next/navigation";

/**
 * The care pages are the current source of truth for plan availability,
 * pricing and required disclosures. Preserve established links without
 * keeping the retired product catalog live.
 */
export default function TreatmentsPage() {
  permanentRedirect("/care");
}
