import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { handoffNote, telehealthUrl } from "@/lib/telehealth";

export const metadata: Metadata = {
  title: "The Mrs. Collection",
  description:
    "Discover the Mrs. Collection by Eve’s Sisters. Explore our approach to women’s wellness, learn what to review, and find your next step.",
  alternates: { canonical: "/packages/mrs-collection" },
};

export default function MrsCollectionPage() {
  return (
    <Container className="py-20 sm:py-28">
      <Eyebrow>Eve&rsquo;s Sisters</Eyebrow>
      <h1 className="mt-8 font-display text-[2.5rem] leading-tight text-ivory sm:text-5xl">
        The Mrs. Collection
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ivory-200/85">
        Different stages. The same power. The Mrs. Collection is part of the
        Eve&rsquo;s Sisters approach to helping women explore wellness options
        as their needs and priorities change. A collection name is a way to
        organize the experience; it does not determine medical eligibility.
      </p>
      <div className="mt-14 grid gap-12 lg:grid-cols-2">
        <section aria-labelledby="collection-options">
          <h2 id="collection-options" className="font-display text-3xl text-ivory">
            Begin with clear information
          </h2>
          <p className="mt-5 leading-relaxed text-ivory-200/85">
            Before choosing a plan, review its current price, what is included,
            any separate medication or laboratory costs, and its cancellation
            terms. Current plan details and enrollment steps are provided on
            our telehealth platform. This overview does not offer a prescription
            or guarantee that a particular treatment is available to you.
          </p>
          <a href={telehealthUrl("/packages/mrs-collection")}
            className="mt-7 inline-block bg-plum px-6 py-4 text-ivory hover:bg-plum-600">
            Continue to the telehealth platform
          </a>
          <p className="mt-3 text-sm text-ivory-200/75">{handoffNote}</p>
        </section>
        <section aria-labelledby="collection-support">
          <h2 id="collection-support" className="font-display text-3xl text-ivory">
            Find your next step
          </h2>
          <p className="mt-5 leading-relaxed text-ivory-200/85">
            Learn about our brand, explore our service information, or contact
            the team with general questions. Clinical evaluations and treatment
            decisions belong to independent licensed healthcare professionals.
            Availability varies by service and state, and an evaluation does
            not guarantee a prescription.
          </p>
          <ul className="mt-6 space-y-4 text-champagne">
            <li><Link href="/services" className="underline underline-offset-4">Explore service information</Link></li>
            <li><Link href="/about" className="underline underline-offset-4">About Eve&rsquo;s Sisters</Link></li>
            <li><Link href="/contact" className="underline underline-offset-4">Contact our team</Link></li>
          </ul>
        </section>
      </div>
    </Container>
  );
}
