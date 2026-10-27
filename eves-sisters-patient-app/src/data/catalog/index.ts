import { treatmentCategories, treatments } from './treatments';
import type { Treatment, TreatmentCategory } from './types';

export * from './memberships';
export * from './mrsCollection';
export * from './source';
export { treatmentCategories, treatments };
export type { Treatment, TreatmentCategory };

/**
 * Per-treatment pricing is not published on the live site. The app shows
 * this statement rather than inventing or carrying forward stale prices.
 */
export const treatmentPricing = {
  published: false,
  note: 'Pricing is personalized and confirmed during your private consultation, before you commit to anything. Memberships start at $199/month. Any medication or lab costs are confirmed with you first.',
} as const;

export function getTreatment(slug: string | undefined): Treatment | undefined {
  return treatments.find((t) => t.slug === slug);
}

export function getCategory(slug: string | undefined): TreatmentCategory | undefined {
  return treatmentCategories.find((c) => c.slug === slug);
}

/** Treatments shown under a category: its own, or a pathway's curated list. */
export function treatmentsForCategory(category: TreatmentCategory): Treatment[] {
  if (category.kind === 'pathway') {
    return (category.includes ?? []).map(getTreatment).filter((t): t is Treatment => Boolean(t));
  }
  return treatments.filter((t) => t.category === category.slug);
}

export function searchTreatments(query: string): Treatment[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...treatments];
  return treatments.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      (t.aka?.toLowerCase().includes(q) ?? false) ||
      t.summary.toLowerCase().includes(q) ||
      (getCategory(t.category)?.name.toLowerCase().includes(q) ?? false),
  );
}
