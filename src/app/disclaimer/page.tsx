import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/Container";

export const metadata: Metadata = {
  title: "Medical Disclaimer",
  description:
    "Eve's Sisters publishes general wellness education. It is not medical advice, diagnosis or treatment.",
  robots: { index: true, follow: true },
};

const sections = [
  {
    heading: "This is education, not medical advice",
    body: "Everything published by Eve's Sisters — on this site, in the Journal, and in our emails — is general wellness and longevity education. It is not medical advice, diagnosis or treatment, and it does not create a clinician–patient relationship. It cannot account for your history, your medications, your labs or your circumstances.",
  },
  {
    heading: "Always involve a qualified clinician",
    body: "Speak with a licensed healthcare professional before starting, stopping or changing any medication, supplement, hormone therapy, diet or exercise programme. If you have a diagnosed condition or are pregnant or breastfeeding, that conversation matters even more.",
  },
  {
    heading: "In an emergency",
    body: "Never delay seeking care or disregard professional medical advice because of something you read here. If you think you may be experiencing a medical emergency, contact your local emergency services immediately.",
  },
  {
    heading: "On evidence and change",
    body: "We work from the best available evidence at the time of writing and say plainly when a question is unsettled. Science moves; older articles may not reflect current consensus, and we do not guarantee that any information here is complete or current.",
  },
  {
    heading: "No outcome is promised",
    body: "Individual results vary. Nothing on this site should be read as a promise of a particular health, weight, appearance or longevity outcome.",
  },
  {
    heading: "A note on our sister company",
    body: "Eve's Sisters is a consumer wellness and longevity brand. It is operated separately from any research-use-only laboratory business under common ownership, and nothing published by such a business should be read as a therapeutic claim, a consumer health service, or an offer of treatment.",
  },
];

export default function DisclaimerPage() {
  return (
    <section>
      <Container className="py-20 sm:py-28">
        <Eyebrow>Important</Eyebrow>
        <h1 className="mt-8 max-w-3xl font-display text-[2.5rem] leading-[1.08] text-ivory sm:text-5xl">
          Medical Disclaimer
        </h1>

        <div className="mt-16 max-w-3xl space-y-12">
          {sections.map((section) => (
            <div key={section.heading} className="hairline border-t pt-6">
              <h2 className="font-display text-2xl leading-snug text-ivory">
                {section.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ivory-200/80">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
