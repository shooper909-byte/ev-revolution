import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions, press enquiries and partnerships — reach the Eve's Sisters team.",
};

export default function ContactPage() {
  return (
    <section>
      <Container className="grid gap-16 py-20 sm:py-28 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-8 font-display text-[2.5rem] leading-[1.08] text-ivory sm:text-5xl">
            Let&rsquo;s talk.
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-ivory-200/85">
            Whether it is a question about one of the six pillars, a press
            enquiry, or a partnership — we would like to hear from you.
          </p>

          <dl className="mt-12 space-y-8">
            <div>
              <dt className="brand-eyebrow text-[0.5rem] text-champagne">
                General
              </dt>
              <dd className="mt-3 text-sm text-ivory-200">
                <a
                  href="mailto:hello@ev-revolution.com"
                  className="hover:text-champagne"
                >
                  hello@ev-revolution.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="brand-eyebrow text-[0.5rem] text-champagne">
                Press &amp; partnerships
              </dt>
              <dd className="mt-3 text-sm text-ivory-200">
                <a
                  href="mailto:press@ev-revolution.com"
                  className="hover:text-champagne"
                >
                  press@ev-revolution.com
                </a>
              </dd>
            </div>
          </dl>

          <p className="hairline mt-12 border-t pt-6 text-xs leading-relaxed text-taupe-700">
            We cannot provide medical advice, diagnosis or treatment by email.
            For anything urgent, contact your clinician or emergency services.
          </p>
        </div>

        <div className="hairline border p-9 lg:p-12">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
