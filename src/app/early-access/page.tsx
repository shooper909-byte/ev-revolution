import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow } from "@/components/Container";

/* Brevo-hosted waitlist form. The QR code on this page and on the printed
   poster opens the same form at its non-embed address. */
const waitlistFormUrl =
  "https://3917a97a.sibforms.com/v2/serve/MUIFAGvE0Mt6ns3UIwTC4v9IrXtCeQTWU4xZUYyvjf2b5CubhTYizkvIr-EY6Ma41hg1qoiCqYSBI_Kea0Icm2iGr9TN1ZAAE9YNGLYKd2G8hhX2wKYH-MbBqBcdHT-CzF-suom2FikpAtsaDzPqA-kgcXMh09xYaAuD-EbFUk3XxsH5TNkBL7UQGbwkozYbmnFZUGQVCiCj8sjpQw==";

export const metadata: Metadata = {
  title: "Early Access",
  description:
    "Your turn. Join the Eve’s Sisters waitlist for early access before we open to everyone.",
  openGraph: {
    title: "Eve’s Sisters — Your Turn. Early Access",
    images: [{ url: "/images/early-access/your-turn.webp", width: 1122, height: 1402 }],
  },
};

export default function EarlyAccessPage() {
  return (
    <section>
      <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="hairline overflow-hidden border">
          <Image
            src="/images/early-access/your-turn.webp"
            alt="Eve’s Sisters — Your Turn. Early Access."
            width={1122}
            height={1402}
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-auto w-full"
          />
        </div>

        <div>
          <Eyebrow>Early access</Eyebrow>
          <h1 className="mt-8 font-display text-[2.5rem] leading-[1.08] text-ivory sm:text-5xl">
            Your turn.
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-ivory-200/85">
            Join the waitlist and be first through the door when Eve&rsquo;s
            Sisters opens — early access, before everyone else.
          </p>

          <div className="mt-10 overflow-hidden rounded-sm bg-ivory">
            <iframe
              src={waitlistFormUrl}
              title="Eve’s Sisters early access waitlist"
              width="540"
              height="305"
              loading="lazy"
              allowFullScreen
              className="block h-[960px] w-full max-w-full sm:h-[720px] lg:h-[640px]"
            />
          </div>

          <div className="hairline mt-12 flex items-center gap-6 border-t pt-8">
            <div className="shrink-0 bg-white p-2">
              <Image
                src="/images/early-access/waitlist-qr.png"
                alt="QR code that opens the early access waitlist form"
                width={112}
                height={112}
                unoptimized
              />
            </div>
            <p className="text-sm leading-relaxed text-ivory-200/85">
              On another device? Scan to join, or{" "}
              <a
                href={waitlistFormUrl.replace("/v2/serve/", "/serve/")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-champagne hover:underline"
              >
                open the form in a new tab
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
