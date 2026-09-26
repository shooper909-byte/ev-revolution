import { permanentRedirect } from "next/navigation";

/**
 * Legacy links now land on the recovery page, where only the currently
 * available plan and the appropriate email-only waitlists are presented.
 */
export default function PeptideCarePage() {
  permanentRedirect("/care/recovery-rejuvenation");
}
