import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/PolicyPage";
import { businessName, partners } from "@/lib/business";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Eve’s Sisters website and telehealth services.",
  alternates: { canonical: "/terms-of-service" },
};

const sections: PolicySection[] = [
  {
    heading: "Agreement",
    body: [
      `These Terms of Service are an agreement between you and ${businessName} (“we”, “us”). By using this website or our services you agree to these terms, our Privacy Policy and our Telehealth Consent. If you do not agree, please do not use the services.`,
    ],
  },
  {
    heading: "Eligibility",
    body: [
      "You must be at least 18 years old, located in a state where our services are offered, and able to enter a binding agreement. You agree to give complete and accurate information, including your full medical history, and to keep it up to date.",
    ],
  },
  {
    heading: "Who provides your care",
    body: [
      `${businessName} provides the website and a technology and support service. We do not practise medicine or pharmacy. Clinical care is provided by independent licensed providers affiliated with ${partners.clinical.name}, who use their own professional judgement. Prescriptions are filled by ${partners.pharmacy.name}, a licensed pharmacy.`,
    ],
  },
  {
    heading: "No guarantee of treatment",
    body: [
      "Completing an intake form, selecting a program or paying a fee does not guarantee that you will receive a prescription or any particular treatment. Prescription medications are provided only when a licensed provider determines, after reviewing your information, that they are clinically appropriate. A provider may request more information, lab work or a consultation, and may approve, change, recommend an alternative to or decline any treatment. Individual results vary.",
      "Compounded medications are not FDA-approved. The FDA does not evaluate compounded medications for safety, effectiveness or quality.",
    ],
  },
  {
    heading: "Not for emergencies",
    body: [
      "Our services are not for emergencies. If you are experiencing a medical emergency, call 911 or seek immediate medical attention.",
    ],
  },
  {
    heading: "Fees and payment",
    body: [
      [
        "Program and consultation fees are shown before you purchase. Medication, laboratory and pharmacy charges may be separate.",
        "When you request a prescription medication, your card may be pre-authorized. The charge for the medication itself is processed only after a licensed provider approves the prescription. If the provider does not approve it, the pre-authorization is released.",
        "Memberships renew automatically each billing period until you cancel. See our Subscription Cancellation policy.",
        "Refills are reviewed by a provider and are never automatic.",
      ],
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "You agree not to misuse the services, including by giving false information, using the services on behalf of someone else, reselling or sharing medication, interfering with the website, or using it for any unlawful purpose.",
    ],
  },
  {
    heading: "Content and intellectual property",
    body: [
      "Educational content on this site is for general information only and is not medical advice. All site content, logos and trademarks belong to us or our licensors, and may not be copied or used without permission.",
    ],
  },
  {
    heading: "Disclaimers and limitation of liability",
    body: [
      "The website is provided “as is”. To the fullest extent permitted by law, we disclaim implied warranties and are not liable for indirect, incidental or consequential damages arising from your use of the website. Nothing in these terms limits liability that cannot be limited by law, and nothing limits a licensed provider’s professional responsibility to you.",
    ],
  },
  {
    heading: "Changes and termination",
    body: [
      "We may update these terms; the effective date above shows the latest version. We may suspend access for a breach of these terms. You may stop using the services and cancel your membership at any time.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      `These terms are governed by the laws of the state in which ${businessName} is organized, without regard to conflict-of-law rules, and by applicable federal law.`,
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <PolicyPage
      title="Terms of Service"
      intro="Please read these terms carefully. They explain how our website and telehealth services work, what we are responsible for and what we ask of you."
      sections={sections}
    />
  );
}
