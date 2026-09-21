import type { PillarIconName } from "@/components/PillarIcon";

export type Accent = {
  /** Written as literal class strings so Tailwind detects them. */
  text: string;
  border: string;
  dot: string;
  glow: string;
};

export type Pillar = {
  slug: string;
  /** Full name, as it appears on the brand board. */
  name: string;
  /** Short label for the navigation. */
  navLabel: string;
  icon: PillarIconName;
  accent: Accent;
  accentName: string;
  tagline: string;
  intro: string;
  focus: { title: string; body: string }[];
  covered: string[];
  question: string;

  /* ---- Care hub (/care) display overrides -------------------------------
     The pillar detail pages and navigation keep the canonical `name`. These
     optional fields only change how a pillar is presented on the Care hub,
     so there is a single source of truth for the six care areas. */

  /** Label shown on the Care hub, where the brand uses friendlier wording. */
  careLabel?: string;
  /** One-line description for the Care hub card. */
  careSummary?: string;
  /** Campaign photograph in /public/images/care, without the extension. */
  careImage?: string;
  /** Alt text for `careImage`. */
  careImageAlt?: string;

  /** The subscription page for this pillar, when one exists. The pillar page
      sends its calls to action there instead of to the contact form. */
  carePath?: string;
};

const plum: Accent = {
  text: "text-plum-400",
  border: "border-plum-600/60",
  dot: "bg-plum-600",
  glow: "from-plum/35",
};

const mauve: Accent = {
  text: "text-mauve",
  border: "border-mauve-700/60",
  dot: "bg-mauve-700",
  glow: "from-mauve-700/30",
};

const blush: Accent = {
  text: "text-ivory-300",
  border: "border-ivory-300/35",
  dot: "bg-ivory-300",
  glow: "from-ivory-300/20",
};

const deepPlum: Accent = {
  text: "text-plum-400",
  border: "border-plum-900",
  dot: "bg-plum-900",
  glow: "from-plum-900/60",
};

const taupe: Accent = {
  text: "text-taupe",
  border: "border-taupe-700/60",
  dot: "bg-taupe-700",
  glow: "from-taupe-700/30",
};

const champagne: Accent = {
  text: "text-champagne",
  border: "border-champagne-700/60",
  dot: "bg-champagne-700",
  glow: "from-champagne-700/25",
};

export const pillars: Pillar[] = [
  {
    slug: "weight-loss",
    carePath: "/care/weight-management",
    name: "Weight Loss",
    navLabel: "Weight",
    icon: "leaf",
    accent: plum,
    accentName: "Deep Plum",
    tagline: "Metabolic health, without the noise.",
    intro:
      "Weight is a metabolic conversation, not a moral one. We look at the whole picture — glucose and insulin patterns, thyroid, sleep, stress load, muscle mass — and at how all of it shifts through a woman's decades.",
    focus: [
      {
        title: "Metabolic context",
        body: "Why the same habits stop producing the same results after 35, and what is actually changing underneath.",
      },
      {
        title: "Muscle as the anchor",
        body: "Lean mass is the most protective asset most women are never told to build. We treat it as foundational, not optional.",
      },
      {
        title: "Structure that survives real life",
        body: "Nutrition and movement frameworks built for travel, caregiving, perimenopause and a demanding career.",
      },
    ],
    covered: [
      "The metabolic markers worth understanding",
      "Protein, fibre and satiety in practice",
      "Strength training for body composition",
      "Sleep and stress as metabolic inputs",
      "How to discuss medical options with your clinician",
    ],
    question: "Why has my body stopped responding to what used to work?",
    careLabel: "Weight Management",
    careSummary:
      "Medical weight management and metabolic wellness.",
    careImage: "care-weight-management",
    careImageAlt:
      "A woman in a black evening gown standing with one hand on her hip, smiling confidently.",
  },
  {
    slug: "hormones-menopause",
    carePath: "/care/hormones-menopause",
    name: "Hormones & Menopause",
    navLabel: "Hormones",
    icon: "lotus",
    accent: mauve,
    accentName: "Dusty Mauve",
    tagline: "The decade nobody prepared you for.",
    intro:
      "Perimenopause can begin a decade before the last period and reach sleep, mood, cognition, skin, bone and heart. We cover it plainly: what is happening, what the evidence says, and what to ask for.",
    focus: [
      {
        title: "The full symptom map",
        body: "Beyond hot flashes — fragmented sleep, joint pain, brain fog, anxiety, changing cycles, shifting body composition.",
      },
      {
        title: "An evidence-literate view",
        body: "Where the research on hormone therapy actually stands today, and how to weigh it with a qualified clinician.",
      },
      {
        title: "The long view",
        body: "Bone density, cardiovascular and cognitive health are shaped in this window. It is a long-horizon decision point.",
      },
    ],
    covered: [
      "Perimenopause, menopause and postmenopause",
      "Tracking symptoms in a way clinicians can use",
      "Questions for a menopause-trained provider",
      "Sleep, mood and cognition through the transition",
      "Protecting bone and cardiovascular health",
    ],
    question: "Is this normal, and who do I ask?",
    careLabel: "Menopause & Hormones",
    careSummary:
      "Support through perimenopause, menopause and hormonal changes.",
    careImage: "care-menopause-hormones",
    careImageAlt:
      "A woman in her fifties with silver-streaked hair, lit against a dark background and looking upward.",
  },
  {
    slug: "skin-beauty",
    carePath: "/eves-secret",
    name: "Skin & Beauty",
    navLabel: "Skin",
    icon: "honeycomb",
    accent: blush,
    accentName: "Ivory & Blush",
    tagline: "Skin is an organ before it is an aesthetic.",
    intro:
      "Collagen, barrier function and pigment all respond to hormonal change. We separate the ingredients with real evidence behind them from the ones carried by packaging alone.",
    focus: [
      {
        title: "Barrier first",
        body: "Most 'sensitive skin' is a compromised barrier. Repairing it changes what everything else can do.",
      },
      {
        title: "Ingredients that earn their place",
        body: "Retinoids, sunscreen, niacinamide, peptides — what the literature supports, at what strength, over what timeline.",
      },
      {
        title: "Skin through the transition",
        body: "Why texture, laxity and pigment shift in your forties and fifties, and what is realistic to expect.",
      },
    ],
    covered: [
      "Building a routine that is short and consistent",
      "Reading an ingredient list without the marketing",
      "Sun protection as the highest-leverage habit",
      "Evaluating in-clinic options and their claims",
      "Hair and scalp changes worth flagging",
    ],
    question: "Which of these products is actually doing something?",
    careLabel: "Skin & Beauty",
    careSummary:
      "Skin, hair and beauty-focused wellness.",
    careImage: "care-skin-beauty",
    careImageAlt:
      "Close profile of a woman with luminous deep brown skin against an onyx background.",
  },
  {
    slug: "energy-performance",
    carePath: "/care/energy-performance",
    name: "Energy & Performance",
    navLabel: "Energy",
    icon: "bolt",
    accent: deepPlum,
    accentName: "Deep Plum, darkened",
    tagline: "Capacity you can count on.",
    intro:
      "Fatigue is a signal, not a personality trait. Iron and ferritin, thyroid, B12, sleep architecture and training load all sit underneath how much you actually have to give.",
    focus: [
      {
        title: "Rule things out first",
        body: "The common, testable causes of persistent fatigue in women — and why they are so often missed.",
      },
      {
        title: "Train with your physiology",
        body: "Strength, cardiovascular base, and structuring effort around a cycle or a transition rather than against it.",
      },
      {
        title: "Cognitive stamina",
        body: "Focus, mood and mental endurance as outputs of sleep, fuel and load — all of them trainable.",
      },
    ],
    covered: [
      "Common causes of persistent fatigue",
      "Iron, ferritin and what the numbers mean",
      "Building a cardiovascular base after 40",
      "Fuelling for output rather than restriction",
      "When fatigue warrants a clinical workup",
    ],
    question: "Why am I this tired, and is it something I can fix?",
    careLabel: "Energy & Performance",
    careSummary:
      "Energy, strength, focus and performance.",
    careImage: "care-energy-performance",
    careImageAlt:
      "Warm-lit study of a strong, toned torso draped in deep plum silk.",
  },
  {
    slug: "recovery-rejuvenation",
    name: "Recovery & Rejuvenation",
    navLabel: "Recovery",
    icon: "renew",
    accent: taupe,
    accentName: "Warm Taupe",
    tagline: "The half of the work that gets skipped.",
    intro:
      "Adaptation happens in recovery. Sleep quality, nervous-system load and rest architecture decide how much benefit you actually keep from everything else you do.",
    focus: [
      {
        title: "Sleep as infrastructure",
        body: "Hormonal change disrupts sleep architecture directly. Protecting it is one of the highest-return moves available.",
      },
      {
        title: "Nervous-system load",
        body: "Chronic stress load is measurable in ways that matter — and modifiable without a wellness retreat.",
      },
      {
        title: "Deload and repair",
        body: "Structured rest, mobility and soft-tissue work, and telling overreaching apart from genuine overtraining.",
      },
    ],
    covered: [
      "Sleep habits that survive a real schedule",
      "Recovery metrics: what is useful, what is noise",
      "Rest days, deloads and periodisation",
      "Stress physiology in plain language",
      "Joint and connective-tissue care",
    ],
    question: "Am I under-recovering rather than under-training?",
    careLabel: "Recovery",
    careSummary:
      "Rest, recovery, mobility and whole-body wellness.",
    careImage: "care-recovery",
    careImageAlt:
      "A rolled towel resting on a dark floor in a quiet, low-lit recovery space.",
  },
  {
    slug: "longevity-healthspan",
    name: "Longevity & Healthspan",
    navLabel: "Longevity",
    icon: "infinity",
    accent: champagne,
    accentName: "Champagne Gold",
    tagline: "Healthspan is the number that matters.",
    intro:
      "Not lifespan — healthspan. Strength, bone density, cardiovascular and cognitive health and metabolic resilience are the levers with the strongest evidence behind them, and they are built decades before they are needed.",
    focus: [
      {
        title: "Bone and muscle",
        body: "Peak bone mass and lean tissue are the clearest predictors of independence later. Both are trainable.",
      },
      {
        title: "Cardiometabolic health",
        body: "Cardiovascular disease is the leading cause of death in women and remains chronically under-discussed with them.",
      },
      {
        title: "Cognitive reserve",
        body: "Sleep, cardiovascular fitness, hearing, and social and intellectual load all feed long-term brain health.",
      },
    ],
    covered: [
      "Baselines and screening worth establishing early",
      "Strength and bone loading across the decades",
      "Cardiovascular risk in women specifically",
      "Longevity evidence versus longevity marketing",
      "Building a clinical team that will actually listen",
    ],
    question: "What should I be doing now for the woman I will be at 70?",
    careLabel: "Longevity",
    careSummary:
      "Healthy aging, prevention and long-term vitality.",
    careImage: "care-longevity",
    careImageAlt:
      "A silver-haired woman in a black blazer, relaxed and smiling at the camera.",
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((pillar) => pillar.slug === slug);
}

/** The label to use for a pillar on the Care hub. */
export function careLabel(pillar: Pillar): string {
  return pillar.careLabel ?? pillar.name;
}

/** The Care hub summary for a pillar, falling back to its tagline. */
export function careSummary(pillar: Pillar): string {
  return pillar.careSummary ?? pillar.tagline;
}
