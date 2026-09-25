import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/PolicyPage";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Subscription Cancellation Policy",
  description: "How to cancel an Eve’s Sisters membership, when cancellation takes effect and how refunds work.",
  alternates: { canonical: "/subscription-cancellation" },
};

const contactLine = business.phone
  ? `email ${business.email} or call ${business.phone}`
  : `email ${business.email}`;

const sections: PolicySection[] = [
  {
    heading: "How memberships renew",
    body: [
      "Memberships are billed monthly and renew automatically at the price shown when you enrolled until you cancel. We will tell you in advance before any price change applies to your membership.",
    ],
  },
  {
    heading: "How to cancel",
    body: [
      `You can cancel at any time, for any reason. To cancel, ${contactLine} from the address on your account and ask us to cancel your membership. We will confirm your cancellation in writing. There is no cancellation fee.`,
      "Please cancel at least 24 hours before your next billing date to avoid being charged for the next period.",
    ],
  },
  {
    heading: "When cancellation takes effect",
    body: [
      "Your membership stays active until the end of the billing period you have already paid for, and you will not be charged again after that. Any prescription already approved and in process may still be filled and shipped unless you ask us to stop it before the pharmacy dispenses it.",
    ],
  },
  {
    heading: "Refunds",
    body: [
      [
        "If a provider does not approve a requested prescription, you are not charged for that medication, and any pre-authorization is released.",
        "Membership fees for a billing period that has started, and fees for a consultation that has been completed, are not refundable.",
        "Medication cannot be returned or refunded once the pharmacy has dispensed it, as required by pharmacy regulations, unless it arrives damaged or incorrect. Contact us within 7 days of delivery if that happens.",
      ],
    ],
  },
  {
    heading: "After you cancel",
    body: [
      "You can re-enroll at any time. Your medical records are kept as described in our Privacy Policy and remain available to you on request.",
    ],
  },
];

export default function SubscriptionCancellationPage() {
  return (
    <PolicyPage
      title="Subscription Cancellation Policy"
      intro="You are never locked in. This policy explains how to cancel your membership, when it takes effect and how refunds work."
      sections={sections}
    />
  );
}
