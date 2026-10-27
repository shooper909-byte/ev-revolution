export type TreatmentCategory = {
  slug: string;
  name: string;
  short: string;
  promise: string;
  intro: string;
  experiences: string[];
  clinicalNote: string;
  /** "pathway" groups treatments from other categories around a goal. */
  kind: 'category' | 'pathway';
  /** Treatment slugs, for pathways only. */
  includes?: string[];
  /** A bundled image (`require(...)`). */
  image: number;
};

export type Treatment = {
  slug: string;
  name: string;
  aka?: string;
  /** Primary category slug. */
  category: string;
  forms: string[];
  summary: string;
  howItsUsed: string;
  programs?: string[];
  compounded: 'yes' | 'partial' | 'no';
  compoundedNote?: string;
  considerations: string[];
  /** The source flags this entry's copy as awaiting pharmacy confirmation. */
  contentPending?: boolean;
};
