export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  pillar: string;
  readingTime: string;
  date: string;
};

/**
 * Editorial queue. These are the planned launch pieces — swap this module for a
 * CMS or MDX loader when the content pipeline is chosen.
 */
export const posts: Post[] = [
  {
    slug: "perimenopause-timeline",
    title: "The perimenopause timeline nobody hands you",
    excerpt:
      "It can start a decade before your last period. Here is what typically shifts, roughly when, and which changes are worth raising with a clinician.",
    pillar: "Hormones & Menopause",
    readingTime: "9 min",
    date: "2026-08-28",
  },
  {
    slug: "muscle-is-the-longevity-organ",
    title: "Muscle is a longevity organ",
    excerpt:
      "Lean mass predicts independence, metabolic health and fall risk decades out — and it is the asset women are least often told to build.",
    pillar: "Longevity & Healthspan",
    readingTime: "7 min",
    date: "2026-08-14",
  },
  {
    slug: "reading-a-skincare-label",
    title: "How to read a skincare label without the marketing",
    excerpt:
      "Concentration, formulation and order on the list decide whether an active does anything. A practical method for telling the two apart.",
    pillar: "Skin & Beauty",
    readingTime: "6 min",
    date: "2026-07-30",
  },
  {
    slug: "tired-is-a-symptom",
    title: "Tired is a symptom, not a personality",
    excerpt:
      "Ferritin, thyroid, B12, sleep architecture and training load — the common, testable explanations for fatigue that get missed in women.",
    pillar: "Energy & Performance",
    readingTime: "8 min",
    date: "2026-07-16",
  },
  {
    slug: "strength-training-after-forty",
    title: "Starting strength training after forty",
    excerpt:
      "What to actually do in the first twelve weeks, how to load safely, and why bone responds to things cardio cannot touch.",
    pillar: "Weight Loss",
    readingTime: "10 min",
    date: "2026-07-02",
  },
  {
    slug: "recovery-metrics-worth-tracking",
    title: "Which recovery metrics are worth tracking",
    excerpt:
      "Wearables produce a great deal of data and not much signal. A short list of what genuinely changes a decision.",
    pillar: "Recovery & Rejuvenation",
    readingTime: "6 min",
    date: "2026-06-18",
  },
];

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
