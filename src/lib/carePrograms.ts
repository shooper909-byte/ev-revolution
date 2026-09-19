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
} as const satisfies Record<string, CareProgram>;

export type CareProgramKey = keyof typeof carePrograms;

export function getCareProgram(key: unknown): CareProgram | undefined {
  return typeof key === "string" && key in carePrograms
    ? carePrograms[key as CareProgramKey]
    : undefined;
}
