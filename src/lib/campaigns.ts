import type { CaptureSource } from "@/lib/brevo";
import { telehealthUrl } from "@/lib/telehealth";

/**
 * Patient-acquisition landing pages served on evevolutionwellness.us.
 *
 * The .us domain is a marketing funnel, not a third site: each page explains
 * one care area, collects an early-access email for its own Brevo source, and
 * sends visitors who are ready to enroll to the telehealth site. The pages
 * live at /us/<slug> in this app; on the .us host the middleware serves them
 * at /<slug>. They are noindexed so they never compete with the brand site.
 */

export const campaignHost = "evevolutionwellness.us";
export const campaignOrigin = `https://${campaignHost}`;

export type Campaign = {
  slug: string;
  /** Brevo capture source; BREVO_LIST_ID_<SOURCE> routes it to its own list. */
  source: CaptureSource;
  eyebrow: string;
  title: string;
  headline: string;
  intro: string;
  points: { title: string; body: string }[];
  image: { src: string; alt: string; width: number; height: number };
  /** Page on the brand site whose telehealth match receives enrollments. */
  careFrom?: string;
  /** Waitlist-only pages offer no enrollment until care is available. */
  waitlistOnly?: boolean;
  formHint: string;
};

export const campaigns: Campaign[] = [
  {
    slug: "weight",
    source: "us_weight",
    eyebrow: "Weight Management",
    title: "Weight Management & GLP-1 Consultations",
    headline: "Weight care built around your body.",
    intro:
      "Licensed clinicians review your health history and goals to decide whether medical weight management, including GLP-1 medication, is appropriate for you — with ongoing support through membership.",
    points: [
      {
        title: "A clinician decides, not a checkout",
        body: "Every treatment starts with a medical review. Prescriptions are issued only when a licensed provider finds them appropriate.",
      },
      {
        title: "Membership, not a one-off",
        body: "Follow-ups, dose adjustments and messaging with your care team are part of the plan.",
      },
      {
        title: "Your stage of life, considered",
        body: "Metabolism changes through perimenopause and beyond. Your plan takes that into account.",
      },
    ],
    image: {
      src: "/images/care/care-weight-management.webp",
      alt: "A woman in an editorial portrait for Eve’s Sisters weight care.",
      width: 560,
      height: 700,
    },
    careFrom: "/care/weight-management",
    formHint: "Get early access and membership details for weight care. Email only — no health information.",
  },
  {
    slug: "menopause",
    source: "us_menopause",
    eyebrow: "Menopause & Hormones",
    title: "Perimenopause, Menopause & Hormone Care",
    headline: "Different stages. The same power.",
    intro:
      "Hot flashes, sleep, mood, energy and libido can all shift through perimenopause and menopause. Our clinicians talk through your symptoms and options, including hormone therapy where it is appropriate.",
    points: [
      {
        title: "Heard, not dismissed",
        body: "Consultations make room for the symptoms that are easy to overlook.",
      },
      {
        title: "Options explained",
        body: "Hormonal and non-hormonal approaches, with their benefits and risks, so you can decide together with your provider.",
      },
      {
        title: "Care that adjusts",
        body: "Follow-ups as your body and your needs change.",
      },
    ],
    image: {
      src: "/images/care/care-menopause-hormones.webp",
      alt: "A woman in an editorial portrait for Eve’s Sisters hormone care.",
      width: 560,
      height: 700,
    },
    careFrom: "/care/hormones-menopause",
    formHint: "Get early access to menopause and hormone care. Email only — no health information.",
  },
  {
    slug: "longevity",
    source: "us_longevity",
    eyebrow: "Longevity & Beauty",
    title: "Longevity, Skin & Healthy Aging",
    headline: "Invest in the years ahead.",
    intro:
      "Healthy aging programs that bring together skin, energy and long-term wellness, guided by clinicians and grounded in evidence.",
    points: [
      {
        title: "Skin and beauty",
        body: "Clinician-guided options for skin health and visible signs of aging.",
      },
      {
        title: "Energy and recovery",
        body: "Support for sleep, recovery and day-to-day vitality.",
      },
      {
        title: "Healthspan",
        body: "A long-term view of wellness, reviewed with your care team.",
      },
    ],
    image: {
      src: "/images/care/care-longevity.webp",
      alt: "A woman in an editorial portrait for Eve’s Sisters longevity care.",
      width: 560,
      height: 700,
    },
    careFrom: "/care/longevity-healthspan",
    formHint: "Get early access to longevity and beauty programs. Email only — no health information.",
  },
  {
    slug: "eves-secret",
    source: "us_eves_secret",
    eyebrow: "Eve’s Secret™",
    title: "Eve’s Secret — Sexual Wellness & Intimacy",
    headline: "A private space for desire, comfort and intimacy.",
    intro:
      "Discreet consultations about sexual wellness, with licensed clinicians who take these conversations seriously.",
    points: [
      {
        title: "Discreet by design",
        body: "Private consultations and discreet communication.",
      },
      {
        title: "Open conversations",
        body: "Desire, comfort and intimacy at every stage of life.",
      },
      {
        title: "Clinician-led",
        body: "Any treatment is prescribed only when a licensed provider finds it appropriate.",
      },
    ],
    image: {
      src: "/images/care/care-eves-secret-collection.webp",
      alt: "The Eve’s Secret collection, styled in an editorial still life.",
      width: 1254,
      height: 1254,
    },
    careFrom: "/eves-secret",
    formHint: "Get early access to Eve’s Secret. Email only — no health information.",
  },
];

/**
 * .us paths that hand off to a full page on the brand site instead of a
 * landing page here. Inclusive Care has its own page and early-access form
 * there (state, service interest, consent), so one list stays the source.
 */
export const campaignHandoffs: Record<string, string> = {
  inclusive: "/gender-affirming-care",
};

export function findCampaign(slug: string): Campaign | undefined {
  return campaigns.find((campaign) => campaign.slug === slug);
}

/** Enrollment link tagged so the telehealth site can attribute the .us campaign. */
export function campaignEnrollUrl(campaign: Campaign): string {
  const url = new URL(telehealthUrl(campaign.careFrom ?? "/"));
  url.searchParams.set("utm_source", "evevolutionwellness_us");
  url.searchParams.set("utm_medium", "landing_page");
  url.searchParams.set("utm_campaign", campaign.slug);
  url.searchParams.set("utm_content", "enroll");
  return url.toString();
}
