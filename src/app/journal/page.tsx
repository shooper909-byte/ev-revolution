import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { formatPostDate, posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Evidence-led writing on hormones, metabolism, skin, energy, recovery and longevity — for women at every stage.",
};

export default function JournalPage() {
  const [lead, ...rest] = posts;

  return (
    <>
      <section className="border-b border-onyx-700">
        <Container className="py-20 sm:py-24">
          <Eyebrow>The Journal</Eyebrow>
          <h1 className="mt-8 max-w-3xl font-display text-[2.5rem] leading-[1.08] text-ivory sm:text-6xl">
            Science meets self.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ivory-200/85">
            Long-form, carefully sourced, and written for the questions women
            actually ask. No miracle mornings, no protocols we would not follow
            ourselves.
          </p>
        </Container>
      </section>

      <section className="border-b border-onyx-700 bg-onyx-900">
        <Container className="py-16 sm:py-20">
          <article className="hairline grid gap-8 border p-9 lg:grid-cols-[2fr_1fr] lg:items-end lg:p-12">
            <div>
              <p className="brand-eyebrow text-[0.5rem] text-mauve">
                {lead.pillar}
              </p>
              <h2 className="mt-5 max-w-2xl font-display text-3xl leading-tight text-ivory sm:text-4xl">
                {lead.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory-200/80">
                {lead.excerpt}
              </p>
            </div>
            <p className="text-xs text-taupe-700 lg:text-right">
              {formatPostDate(lead.date)}
              <span className="mx-2">&middot;</span>
              {lead.readingTime}
            </p>
          </article>
        </Container>
      </section>

      <section className="border-b border-onyx-700">
        <Container className="py-16 sm:py-20">
          <ul className="grid gap-px bg-onyx-700/60 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <li key={post.slug}>
                <article className="flex h-full flex-col bg-onyx p-8">
                  <p className="brand-eyebrow text-[0.5rem] text-mauve">
                    {post.pillar}
                  </p>
                  <h2 className="mt-5 font-display text-2xl leading-snug text-ivory">
                    {post.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory-200/75">
                    {post.excerpt}
                  </p>
                  <p className="mt-7 text-xs text-taupe-700">
                    {formatPostDate(post.date)} &middot; {post.readingTime}
                  </p>
                </article>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-sm text-taupe">
            Full articles are in production. Join the list below and we will
            send each one as it publishes.
          </p>
        </Container>
      </section>

      <section className="bg-onyx-900">
        <Container className="py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <h2 className="font-display text-3xl leading-tight text-ivory sm:text-4xl">
              Never miss a piece.
            </h2>
            <NewsletterSignup source="journal" />
          </div>
        </Container>
      </section>
    </>
  );
}
