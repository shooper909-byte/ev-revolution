import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/PolicyPage";
import { partners, recordRetentionYears } from "@/lib/business";

export const metadata: Metadata = {
  title: "HIPAA Policy",
  description: "How your protected health information may be used and disclosed, and your rights under HIPAA.",
  alternates: { canonical: "/hipaa-policy" },
};

const sections: PolicySection[] = [
  {
    heading: "Our commitment",
    body: [
      `We, and our clinical partner ${partners.clinical.name} and pharmacy partner ${partners.pharmacy.name}, are committed to protecting your protected health information (PHI) as required by the Health Insurance Portability and Accountability Act (HIPAA) and applicable state law. Vendors that handle PHI on our behalf must sign a business associate agreement and protect it to the same standard.`,
    ],
  },
  {
    heading: "How PHI may be used and disclosed",
    body: [
      [
        "Treatment: to allow licensed providers to evaluate you and deliver care, and to send prescriptions to the pharmacy.",
        "Payment: to bill and collect payment for services and medication.",
        "Health care operations: to run our services, including quality review, customer support and compliance.",
        "As required by law: for example, to public health authorities, in response to a court order, or to prevent a serious threat to health or safety.",
      ],
      "We will not sell your PHI or use it for marketing without your written authorization. Any other use requires your written authorization, which you may revoke at any time.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      [
        "Access: to see and receive a copy of your health records.",
        "Amendment: to ask us to correct information you believe is wrong or incomplete.",
        "Accounting of disclosures: to receive a list of certain disclosures of your PHI.",
        "Restrictions: to ask us to limit how your PHI is used or shared.",
        "Confidential communications: to ask us to contact you in a particular way or at a particular address.",
        "Notice: to receive a paper or electronic copy of this policy.",
        "Breach notification: to be notified if your unsecured PHI is affected by a breach.",
      ],
    ],
  },
  {
    heading: "Safeguards",
    body: [
      "We protect PHI with administrative, physical and technical safeguards, including access limited to people who need it, encryption in transit, secure storage and staff training.",
    ],
  },
  {
    heading: "Retention and destruction",
    body: [
      `Medical records are retained for ${recordRetentionYears} years following your last clinical encounter, or longer where state law requires. After that period, PHI is securely destroyed.`,
    ],
  },
  {
    heading: "Complaints",
    body: [
      "If you believe your privacy rights have been violated, you may contact us using the details below, or file a complaint with the U.S. Department of Health and Human Services Office for Civil Rights at hhs.gov/ocr. We will not retaliate against you for filing a complaint.",
    ],
  },
];

export default function HipaaPolicyPage() {
  return (
    <PolicyPage
      title="HIPAA Policy"
      intro="This notice describes how medical information about you may be used and disclosed and how you can get access to it. Please review it carefully."
      sections={sections}
    />
  );
}
