import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/PolicyPage";
import { business, businessName, partners, recordRetentionYears } from "@/lib/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Eve’s Sisters collects, uses, shares, protects and retains your personal and health information.",
  alternates: { canonical: "/privacy-policy" },
};

const sections: PolicySection[] = [
  {
    heading: "Information we collect",
    body: [
      "We collect only the information we need to provide our website and to connect you with telehealth care:",
      [
        "Contact details, such as your name, email address, phone number and shipping address.",
        "Health information you share in an intake form or with a provider, such as your medical history, medications, allergies, goals and laboratory results.",
        "Payment information, which is collected and processed by our payment processor. We do not store full card numbers.",
        "Technical information, such as your browser, device and pages visited, collected through cookies and similar tools.",
      ],
    ],
  },
  {
    heading: "How we use your information",
    body: [
      [
        "To let a licensed provider review your intake and, when clinically appropriate, deliver care.",
        "To route prescriptions a provider issues to the dispensing pharmacy.",
        "To process payments, provide customer support and send service messages about your care or account.",
        "To send newsletters and marketing emails, only if you opt in. You can unsubscribe at any time.",
        "To operate, secure and improve the website, and to meet legal and regulatory obligations.",
      ],
      "We do not sell your personal information or your health information.",
    ],
  },
  {
    heading: "Who we share it with",
    body: [
      "We share information only with the parties needed to provide your care and run our service, each bound to protect it:",
      [
        `${partners.clinical.name} (${partners.clinical.url}), the independent physician group whose licensed providers review intakes and deliver clinical care.`,
        `${partners.pharmacy.name} (${partners.pharmacy.url}), the licensed pharmacy that fills and ships prescriptions.`,
        "Our telehealth technology platform, payment processor, email provider and hosting providers, under written agreements that limit how they may use your information.",
        "Government authorities, when required by law.",
      ],
      "Protected health information (PHI) is handled in accordance with the Health Insurance Portability and Accountability Act (HIPAA). See our HIPAA Policy for details.",
    ],
  },
  {
    heading: "How long we keep records",
    body: [
      `Medical records are retained for ${recordRetentionYears} years following your last clinical encounter, or longer where a state law requires it. After that period, protected health information is securely destroyed so it cannot be read or reconstructed.`,
      "If you stop using our services, your records are kept for the same period so that they remain available to you and your providers, and are then securely destroyed. Non-medical account and marketing information is deleted when it is no longer needed or when you ask us to delete it, unless we must keep it by law.",
    ],
  },
  {
    heading: "How we protect it",
    body: [
      "We use administrative, technical and physical safeguards, including encryption in transit, access controls and vendor agreements, to protect your information. No system is completely secure, so please contact us right away if you believe your information has been compromised.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "We use cookies and similar technologies to keep the site working, remember your preferences and understand how the site is used. You can block or delete cookies in your browser settings; some features may not work without them. We do not place health information in advertising cookies.",
    ],
  },
  {
    heading: "Your choices and rights",
    body: [
      "Depending on where you live, you may have the right to access, correct, delete or receive a copy of your personal information, and to opt out of marketing. Rights over your medical records are described in our HIPAA Policy. To make a request, contact us using the details below; we will verify your identity before responding.",
    ],
  },
  {
    heading: "Children",
    body: [
      "Our services are intended for adults 18 and older. We do not knowingly collect information from children.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      `We may update this policy from time to time. The effective date above shows when it last changed. Material changes will be posted on ${business.domain} before they take effect.`,
      `This policy is provided by ${businessName}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      intro="Your privacy matters, and your health information deserves particular care. This policy explains what we collect, why, who we share it with, how long we keep it and the choices you have."
      sections={sections}
    />
  );
}
