import type { Metadata } from "next";
import Link from "next/link";
import { BusinessContact } from "@/components/PolicyPage";
import { Container, Eyebrow } from "@/components/Container";
import { business, partners } from "@/lib/business";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Where telehealth care is available, how prescriptions are decided, who provides care and who fills prescriptions.",
  alternates: { canonical: "/faq" },
};

const faqs: [string, string][] = [
  [
    "Where are telehealth services available?",
    `Telehealth services may be available in all 50 states where clinically appropriate and permitted by applicable law. Clinical care is provided by licensed medical providers affiliated with an independent physician group, ${partners.clinical.name}.`,
  ],
  [
    "Is treatment guaranteed?",
    "No. Completing an intake form or selecting a program does not guarantee treatment. Prescription medications are only provided when a licensed medical provider determines they are clinically appropriate.",
  ],
  [
    "Do I need to speak with a provider?",
    "Your intake is reviewed by a licensed medical provider. Depending on your health history, goals, treatment request, and applicable requirements, the provider may request additional information, lab work, or a consultation before making a treatment decision.",
  ],
  [
    "Are compounded medications FDA-approved?",
    "No. Compounded medications are not FDA-approved. The FDA does not evaluate compounded medications for safety, effectiveness, or quality.",
  ],
  [
    `Can I use ${business.brand} for emergency care?`,
    `No. ${business.brand} is not for emergencies. If you are experiencing a medical emergency, call 911 or seek immediate medical attention.`,
  ],
  [
    "Who provides the clinical care?",
    `Clinical care is provided by licensed providers affiliated with ${partners.clinical.name} (${partners.clinical.url}), an independent physician group. Contact: ${partners.clinical.email}, ${partners.clinical.phone}.`,
  ],
  [
    "Who handles pharmacy and prescription fulfillment?",
    `Prescriptions are filled and shipped by ${partners.pharmacy.name} (${partners.pharmacy.url}), a licensed pharmacy. Contact: ${partners.pharmacy.email}, ${partners.pharmacy.phone}.`,
  ],
  [
    "When is my card charged for medication?",
    "Your card may be pre-authorized when you request a medication. The charge for the medication itself is processed only after a licensed provider approves the prescription. If the provider does not approve it, the pre-authorization is released.",
  ],
  [
    "Are refills automatic?",
    "No. Every refill is reviewed by a licensed provider before it is issued.",
  ],
  [
    "Do hormone therapies require lab work?",
    "Yes. Hormone therapies, including any testosterone therapy, require lab testing and ongoing provider oversight, and are never provided without prior testing.",
  ],
  [
    "How do I cancel my membership?",
    "You can cancel at any time. See our Subscription Cancellation policy for how to cancel and when it takes effect.",
  ],
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function FaqPage() {
  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container className="py-20 sm:py-28">
        <Eyebrow>Help</Eyebrow>
        <h1 className="mt-8 max-w-3xl font-display text-[2.5rem] leading-[1.08] text-ivory sm:text-5xl">
          Frequently Asked Questions
        </h1>

        <div className="mt-16 max-w-3xl divide-y divide-onyx-700 border-y border-onyx-700">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg text-ivory [&::-webkit-details-marker]:hidden">
                {question}
                <span aria-hidden="true" className="text-champagne transition-transform motion-safe:group-open:rotate-45">+</span>
              </summary>
              <p className="pb-6 text-base leading-relaxed text-ivory-200/80">{answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl leading-snug text-ivory">Still have a question?</h2>
          <BusinessContact />
          <p className="mt-6 text-sm text-ivory-200/80">
            Read our{" "}
            <Link href="/telehealth-consent" className="text-ivory underline hover:text-champagne">Telehealth Consent</Link>,{" "}
            <Link href="/privacy-policy" className="text-ivory underline hover:text-champagne">Privacy Policy</Link> and{" "}
            <Link href="/subscription-cancellation" className="text-ivory underline hover:text-champagne">Subscription Cancellation</Link> policy.
          </p>
        </div>
      </Container>
    </section>
  );
}
