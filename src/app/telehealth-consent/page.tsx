import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/PolicyPage";
import { businessName, partners } from "@/lib/business";

export const metadata: Metadata = {
  title: "Telehealth Consent",
  description: "What telehealth is, its benefits and risks, and what you agree to when you receive care through Eve’s Sisters.",
  alternates: { canonical: "/telehealth-consent" },
};

const sections: PolicySection[] = [
  {
    heading: "What telehealth is",
    body: [
      `Telehealth means receiving healthcare remotely, through secure online forms, messaging, audio or video, rather than in person. Care arranged through ${businessName} is delivered by licensed providers affiliated with ${partners.clinical.name}, an independent physician group. Depending on your state and your needs, care may be delivered asynchronously (a provider reviews your intake without a live visit) or through a real-time audio or video consultation.`,
    ],
  },
  {
    heading: "Benefits",
    body: [
      "Telehealth can offer more convenient access to care, less travel and time away from work, and easier follow-up with your care team.",
    ],
  },
  {
    heading: "Risks and limitations",
    body: [
      [
        "A provider cannot perform a physical examination, and information shared remotely may be incomplete. The provider may decide telehealth is not appropriate for you and refer you to in-person care.",
        "Technical problems may delay or interrupt care.",
        "Although we use secure systems, electronic communication carries a small risk of unauthorized access.",
        "Decisions based on inaccurate or incomplete information you provide could affect your care.",
      ],
    ],
  },
  {
    heading: "Prescriptions",
    body: [
      "Your provider decides, using independent clinical judgement, whether any medication is appropriate. Submitting an intake or choosing a treatment does not guarantee a prescription. The provider reviews your medical history, diagnosis, current medications, contraindications and risk factors, and may request lab work or a live consultation before deciding. Refills are reviewed by a provider and are never automatic.",
      `Prescriptions are filled by ${partners.pharmacy.name}, a licensed pharmacy. Compounded medications are not FDA-approved; the FDA does not evaluate compounded medications for safety, effectiveness or quality. Hormone therapies, including any testosterone, require lab testing and provider oversight and are never provided without prior testing.`,
    ],
  },
  {
    heading: "Your responsibilities",
    body: [
      [
        "Give complete, truthful information about your health, medications and allergies.",
        "Follow your provider’s instructions and report side effects or changes in your health promptly.",
        "Keep a primary care provider for routine and in-person care.",
      ],
    ],
  },
  {
    heading: "Emergencies",
    body: [
      "Telehealth is not for emergencies. If you are experiencing a medical emergency, call 911 or go to the nearest emergency room.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You may decline or stop telehealth care at any time without affecting your right to future care. Your health information is protected as described in our Privacy Policy and HIPAA Policy, and you may request a copy of your records.",
      "By completing an intake or receiving care, you confirm that you have read and understood this consent, have had the chance to ask questions, and agree to receive care through telehealth.",
    ],
  },
];

export default function TelehealthConsentPage() {
  return (
    <PolicyPage
      title="Telehealth Consent"
      intro="Before you receive care, please read this informed consent. It explains how telehealth works, its benefits and limitations, and how prescription decisions are made."
      sections={sections}
    />
  );
}
