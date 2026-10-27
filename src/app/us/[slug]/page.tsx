import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, Eyebrow } from "@/components/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { campaignEnrollUrl, campaignOrigin, campaigns, findCampaign } from "@/lib/campaigns";
import { handoffNote } from "@/lib/telehealth";

/* evevolutionwellness.us landing pages. The middleware serves /us/<slug> at
   /<slug> on the .us host; see src/lib/campaigns.ts. */

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return campaigns.map((campaign) => ({ slug: campaign.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const campaign = findCampaign((await params).slug);
  if (!campaign) return {};
  return {
    title: campaign.title,
    description: campaign.intro,
    alternates: { canonical: `${campaignOrigin}/${campaign.slug}` },
    // Campaign traffic only: the brand site owns search for these topics.
    robots: { index: false, follow: true },
    openGraph: {
      title: `Eve’s Sisters — ${campaign.title}`,
      url: `${campaignOrigin}/${campaign.slug}`,
      images: [{ url: campaign.image.src, width: campaign.image.width, height: campaign.image.height }],
    },
  };
}

export default async function CampaignPage({ params }: Props) {
  const campaign = findCampaign((await params).slug);
  if (!campaign) notFound();

  return (
    <>
      <section>
        <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="hairline overflow-hidden border">
            <Image
              src={campaign.image.src}
              alt={campaign.image.alt}
              width={campaign.image.width}
              height={campaign.image.height}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-auto w-full"
            />
          </div>

          <div>
            <Eyebrow>{campaign.eyebrow}</Eyebrow>
            <h1 className="mt-8 font-display text-[2.5rem] leading-[1.08] text-ivory sm:text-5xl">
              {campaign.headline}
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ivory-200/85">{campaign.intro}</p>

            <div id="early-access" className="mt-10">
              <p className="brand-eyebrow text-[0.625rem] text-champagne">
                {campaign.waitlistOnly ? "Join the waitlist" : "Get early access"}
              </p>
              <div className="mt-4">
                <NewsletterSignup source={campaign.source} hint={campaign.formHint} />
              </div>
            </div>

            {!campaign.waitlistOnly && (
              <div className="hairline mt-12 border-t pt-8">
                <p className="text-sm leading-relaxed text-ivory-200/85">Ready to enroll now?</p>
                <a
                  href={campaignEnrollUrl(campaign)}
                  className="button-sheen brand-eyebrow mt-4 inline-block rounded-full bg-champagne px-8 py-4 text-center text-[0.625rem] text-onyx transition-colors hover:bg-champagne-200"
                >
                  Start your consultation <span aria-hidden="true">&rarr;</span>
                </a>
                <p className="mt-4 text-xs leading-relaxed text-ivory-200/70">{handoffNote}</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="hairline border-t">
        <Container className="grid gap-10 py-16 sm:grid-cols-3 sm:py-20">
          {campaign.points.map((point) => (
            <div key={point.title}>
              <h2 className="font-display text-xl text-ivory">{point.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-ivory-200/85">{point.body}</p>
            </div>
          ))}
        </Container>
        <Container className="pb-16">
          <p className="max-w-3xl text-xs leading-relaxed text-ivory-200/60">
            Eve&rsquo;s Sisters is a telehealth service. Treatment, including any
            prescription, is available only after a licensed provider reviews
            your health information and decides it is appropriate. Availability
            varies by state. Results vary.
          </p>
        </Container>
      </section>
    </>
  );
}
