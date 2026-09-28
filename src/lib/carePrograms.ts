/**
 * The care programmes that accept assessment leads.
 *
 * One registry so the API route can validate a submission without trusting
 * anything the browser sends: the programme key decides which interest values
 * are acceptable, and the source path recorded with the lead.
 *
 * `interests` are subscription tiers and areas of interest — never a
 * diagnosis, a symptom or a medication. Detailed health information belongs in
 * the clinical assessment, behind a provider, and never passes through here.
 */
export type CareProgram = {
  label: string;
  source: string;
  interestLabel: string;
  interests: readonly string[];
  /** Optional second question: which tier the person is leaning towards. */
  planLabel?: string;
  plans?: readonly string[];
};

export const carePrograms = {
  "weight-management": {
    label: "Weight management",
    source: "/care/weight-management",
    interestLabel: "Primary interest",
    interests: [
      "Oral Weight Care",
      "GLP-1 Care",
      "Complete Weight Care",
      "I am not sure",
    ],
  },
  "hormones-menopause": {
    label: "Hormones and menopause",
    source: "/care/hormones-menopause",
    interestLabel: "Primary area of interest",
    interests: [
      "Perimenopause symptoms",
      "Menopause symptoms",
      "Vaginal or urinary symptoms",
      "Sexual wellness",
      "I am not sure",
    ],
  },
  "skin-beauty": {
    label: "Skin and beauty",
    source: "/care/skin-beauty",
    interestLabel: "Primary concern",
    interests: [
      "Acne",
      "Hyperpigmentation",
      "Fine lines or photoaging",
      "Hormonal acne",
      "Hair thinning or hair loss",
      "Eyelash concerns",
      "Multiple concerns",
      "I am not sure",
    ],
    planLabel: "Preferred plan",
    plans: [
      "Skin Essentials",
      "Skin and Hair Plus",
      "Complete Skin and Beauty",
      "Help me choose",
    ],
  },
  "energy-performance": {
    label: "Energy and performance",
    source: "/care/energy-performance",
    interestLabel: "Primary concern",
    interests: [
      "Persistent fatigue",
      "Brain fog or concentration",
      "Reduced exercise tolerance",
      "Sleep and recovery",
      "Nutrient concerns",
      "Thyroid or metabolic concerns",
      "Multiple concerns",
      "I am not sure",
    ],
    planLabel: "Preferred plan",
    plans: [
      "Energy Essential",
      "Energy Plus",
      "Complete Energy Care",
      "Help me choose",
    ],
  },
  "longevity-healthspan": {
    label: "Longevity and healthspan",
    source: "/care/longevity-healthspan",
    interestLabel: "Area of interest",
    interests: [],
  },
  "mrs-jones": {
    label: "Mrs. Jones collection",
    source: "/packages/mrs-jones",
    interestLabel: "Preferred care level",
    interests: ["Essentials", "Signature", "Elite", "Help me choose"],
  },
  "mrs-golden": {
    label: "Mrs. Golden collection",
    source: "/packages/mrs-golden",
    interestLabel: "Preferred care level",
    interests: ["Essentials", "Signature", "Elite", "Help me choose"],
  },
  "mrs-robinson": {
    label: "Mrs. Robinson collection",
    source: "/packages/mrs-robinson",
    interestLabel: "Preferred care level",
    interests: ["Essentials", "Signature", "Elite", "Help me choose"],
  },
} as const satisfies Record<string, CareProgram>;

export type CareProgramKey = keyof typeof carePrograms;

export function getCareProgram(key: unknown): CareProgram | undefined {
  return typeof key === "string" && key in carePrograms
    ? carePrograms[key as CareProgramKey]
    : undefined;
}
