/**
 * Educational guides. Informational, not promotional: no outcome claims, no
 * dosing, no comparisons to brand-name products. Each guide ends with a link
 * to the matching care package on the telehealth site (evevolutionwellness.com),
 * which is where prices, eligibility and intake live.
 *
 * Reviewed for: plain-language accuracy, "talk to a clinician" framing, and the
 * compounded-medication notice wherever compounded products are mentioned.
 */

export type GuideSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export type Guide = {
  slug: string;
  title: string;
  /** ≤ 155 characters, used as the meta description. */
  description: string;
  /** Primary search phrase this guide answers (from Google Ads Keyword Planner, Nov 2026). */
  keyword: string;
  readingTime: string;
  date: string;
  intro: string;
  sections: GuideSection[];
  /** Wellness-site path of the related package. */
  packagePath: string;
  packageLabel: string;
  mentionsCompounded: boolean;
};

export const compoundedNote =
  "Compounded medications are not FDA-approved. The FDA does not verify the safety, effectiveness, or quality of compounded medications. All treatment decisions are made by a licensed medical provider based on an individual evaluation.";

export const guides: Guide[] = [
  {
    slug: "perimenopause-weight-gain",
    title: "Perimenopause weight gain: why it happens and what can help",
    description:
      "Why weight often shifts in perimenopause, what changes in the body, and the options worth discussing with a clinician, from daily habits to medical care.",
    keyword: "perimenopause weight gain",
    readingTime: "7 min",
    date: "2026-11-11",
    intro:
      "Many women notice their weight changing in their 40s even when their routines haven’t. It is common, it has real biological drivers, and it is a fair thing to raise with a clinician.",
    sections: [
      {
        heading: "What changes in perimenopause",
        paragraphs: [
          "Perimenopause is the transition before menopause, often starting in the early-to-mid 40s and lasting several years. Estrogen and progesterone levels rise and fall unevenly before declining.",
          "Lower estrogen is associated with fat being stored more around the abdomen rather than the hips and thighs. At the same time, muscle mass tends to decline with age, which lowers the number of calories the body uses at rest.",
        ],
      },
      {
        heading: "Sleep, stress and appetite",
        paragraphs: [
          "Night sweats, hot flashes and changes in mood can disrupt sleep. Short or broken sleep is linked with stronger hunger signals and less energy for activity. Stress and busy midlife schedules add to this.",
        ],
      },
      {
        heading: "Habits that support you",
        paragraphs: ["None of these are quick fixes, but they are the foundation clinicians usually start with:"],
        bullets: [
          "Strength training two or more times a week to protect muscle.",
          "Protein spread across meals, plus fiber from vegetables, legumes and whole grains.",
          "A consistent sleep routine, and asking about treatment if night sweats wake you.",
          "Limiting alcohol, which can worsen sleep and hot flashes.",
        ],
      },
      {
        heading: "When medical care may be considered",
        paragraphs: [
          "Some women talk with a clinician about hormone therapy for symptoms such as hot flashes and sleep disruption. Hormone therapy is not prescribed as a weight treatment, but feeling better can make other changes easier.",
          "For women who meet medical criteria, a clinician may also discuss GLP-1 medications for weight management. Whether either option is appropriate depends on your health history, and only a licensed provider can decide.",
        ],
      },
      {
        heading: "Questions to bring to a clinician",
        paragraphs: [],
        bullets: [
          "Could my symptoms be perimenopause, thyroid or something else?",
          "Would hormone therapy be appropriate for me, and what are the risks?",
          "Do I meet the criteria for medical weight management?",
          "Which labs, if any, make sense for me?",
        ],
      },
    ],
    packagePath: "/packages/mrs-jones-weight-hormones",
    packageLabel: "See the Mrs. Jones weight + hormones plan",
    mentionsCompounded: true,
  },
  {
    slug: "online-hrt-cost",
    title: "What does online hormone therapy cost?",
    description:
      "How online menopause hormone therapy is usually priced: consults, memberships, medication and labs, plus the questions to ask before you choose.",
    keyword: "hormone replacement therapy online",
    readingTime: "6 min",
    date: "2026-11-11",
    intro:
      "Online menopause care has made hormone therapy easier to access, but prices are presented in very different ways. Here is how to compare them.",
    sections: [
      {
        heading: "The four parts of the price",
        paragraphs: ["Most services charge for some combination of:"],
        bullets: [
          "A clinician visit or consultation, sometimes free and sometimes $40–$250.",
          "A membership or subscription fee for messaging and follow-ups.",
          "The medication itself, which varies by type (pill, patch, cream) and dose.",
          "Lab tests, which are often extra or billed separately.",
        ],
      },
      {
        heading: "Why the same treatment can cost different amounts",
        paragraphs: [
          "A low headline price may cover medication only, with visits or follow-ups added later. An all-in price may look higher but include medication, follow-ups and delivery. Patches and some creams usually cost more than pills.",
        ],
      },
      {
        heading: "Questions to ask before you choose",
        paragraphs: [],
        bullets: [
          "Is the medication included in the monthly price?",
          "Are follow-ups and messaging included, and how often will I hear from a clinician?",
          "Are labs required, and who pays for them?",
          "Is there a minimum commitment, and how do I cancel?",
          "Will my price change if my dose or medication changes?",
        ],
      },
      {
        heading: "Is hormone therapy right for me?",
        paragraphs: [
          "Hormone therapy can help symptoms such as hot flashes and night sweats for many women, but it is not appropriate for everyone. Your personal and family history, including breast cancer, blood clots, stroke and heart disease, matters. A licensed clinician should review your history before anything is prescribed.",
        ],
      },
    ],
    packagePath: "/packages/menopause-essentials",
    packageLabel: "See Menopause Essentials pricing",
    mentionsCompounded: false,
  },
  {
    slug: "tirzepatide-vs-semaglutide-for-women",
    title: "Tirzepatide vs semaglutide: what women should know",
    description:
      "How tirzepatide and semaglutide differ, what to ask a clinician, and why menopause stage matters when you discuss GLP-1 care.",
    keyword: "glp 1 for women",
    readingTime: "7 min",
    date: "2026-11-11",
    intro:
      "Tirzepatide and semaglutide are both medicines used in medical weight management. They work in related but different ways, and the choice between them is a clinical one.",
    sections: [
      {
        heading: "How they differ",
        paragraphs: [
          "Semaglutide acts on the GLP-1 receptor. Tirzepatide acts on both the GLP-1 and GIP receptors. Both are usually taken as a weekly injection, and oral forms exist for some formulations.",
          "Both are started at a low dose and increased gradually, which is why prices are often different at the start and at a maintenance dose.",
        ],
      },
      {
        heading: "Common side effects",
        paragraphs: [
          "Nausea, constipation, diarrhea and reduced appetite are the most commonly reported side effects, especially when the dose increases. Your clinician will review your history, including any personal or family history of medullary thyroid cancer, pancreatitis or gallbladder disease.",
        ],
      },
      {
        heading: "Why menopause stage matters",
        paragraphs: [
          "Midlife hormone changes affect sleep, muscle mass and where the body stores fat. Some women find it helpful to have one clinician look at both weight and menopause symptoms, rather than treating them separately.",
        ],
      },
      {
        heading: "About compounded versions",
        paragraphs: [
          "Compounded semaglutide and tirzepatide are prepared by licensed compounding pharmacies for an individual prescription. They are not the same as brand-name products and are not FDA-approved.",
        ],
      },
      {
        heading: "Questions to bring to a clinician",
        paragraphs: [],
        bullets: [
          "Do I meet the criteria for GLP-1 care?",
          "Which medication and form fits my health history?",
          "What side effects should I watch for, and when should I call?",
          "Should my menopause symptoms be part of the plan?",
        ],
      },
    ],
    packagePath: "/packages",
    packageLabel: "Compare weight and hormone care packages",
    mentionsCompounded: true,
  },
  {
    slug: "testosterone-for-women",
    title: "Testosterone for women: what to know before you ask",
    description:
      "What testosterone does in women's bodies, how it changes with age, when clinicians may consider low-dose treatment, and the questions to ask first.",
    keyword: "testosterone for women",
    readingTime: "6 min",
    date: "2026-11-11",
    intro:
      "Testosterone is often thought of as a male hormone, but women make it too. Interest in low-dose testosterone for women has grown, and the evidence is more specific than social media suggests.",
    sections: [
      {
        heading: "Testosterone in women’s bodies",
        paragraphs: [
          "Women produce testosterone in the ovaries and adrenal glands. Levels gradually decline with age, and drop more sharply after surgical removal of the ovaries.",
        ],
      },
      {
        heading: "What the evidence supports",
        paragraphs: [
          "The strongest evidence for low-dose testosterone in women is for low sexual desire that causes distress (hypoactive sexual desire disorder) in postmenopausal women, after other causes have been considered. Evidence for other uses is limited.",
        ],
      },
      {
        heading: "Side effects and monitoring",
        paragraphs: [
          "Possible side effects include acne and unwanted hair growth. Clinicians usually check blood levels before and during treatment to keep them in the normal female range.",
        ],
      },
      {
        heading: "Questions to bring to a clinician",
        paragraphs: [],
        bullets: [
          "Could something else be affecting my desire or energy, such as sleep, mood, medications or relationship stress?",
          "Is low-dose testosterone appropriate for me?",
          "How will my levels be monitored?",
          "Are there other options, such as PT-141 or vaginal estrogen for comfort?",
        ],
      },
    ],
    packagePath: "/packages/desire-vitality",
    packageLabel: "See the Desire & Vitality plan",
    mentionsCompounded: true,
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
