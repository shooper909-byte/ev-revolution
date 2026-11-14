import {
  getTreatment,
  membershipTiers,
  mrsCollection,
  searchTreatments,
  treatmentCategories,
  treatments,
  treatmentsForCategory,
} from '@/data/catalog';

describe('verified catalog integrity', () => {
  it('has exactly the three Mrs. Collection packages', () => {
    expect(mrsCollection.map((p) => p.name)).toEqual(['Mrs. Jones', 'Mrs. Golden', 'Mrs. Robinson']);
  });

  it('every Mrs. package references real treatments and care areas', () => {
    mrsCollection.forEach((p) => {
      p.treatments.forEach((slug) => expect(getTreatment(slug)).toBeDefined());
      p.focus.forEach((slug) => expect(treatmentCategories.some((c) => c.slug === slug)).toBe(true));
    });
  });

  it('every treatment belongs to a published care area', () => {
    const slugs = new Set(treatmentCategories.map((c) => c.slug));
    treatments.forEach((t) => expect(slugs.has(t.category)).toBe(true));
  });

  it('every care area and pathway lists at least one treatment', () => {
    treatmentCategories.forEach((c) => expect(treatmentsForCategory(c).length).toBeGreaterThan(0));
  });

  it('treatment slugs are unique', () => {
    expect(new Set(treatments.map((t) => t.slug)).size).toBe(treatments.length);
  });

  it('every treatment carries safety considerations', () => {
    treatments.forEach((t) => expect(t.considerations.length).toBeGreaterThan(0));
  });

  it('contains no dosing amounts or strengths', () => {
    const dose = /\b\d+(\.\d+)?\s?(mg|mcg|µg|ml|mL|iu|IU|units?)\b|\d+(\.\d+)?\s?%/;
    treatments.forEach((t) => {
      const text = [t.name, t.summary, t.howItsUsed, ...(t.programs ?? []), ...t.considerations].join(' ');
      expect(text).not.toMatch(dose);
    });
  });

  it('contains no invented per-treatment prices', () => {
    treatments.forEach((t) => expect(JSON.stringify(t)).not.toMatch(/\$\d/));
  });

  it('membership prices match the published tiers', () => {
    expect(membershipTiers.map((t) => [t.name, t.monthlyPriceUsd])).toEqual([
      ['Essentials', 199],
      ['Signature', 399],
      ['Elite', 799],
    ]);
  });

  it('search matches names, aliases and categories', () => {
    expect(searchTreatments('bremelanotide').map((t) => t.slug)).toContain('pt-141');
    expect(searchTreatments('hair').length).toBeGreaterThan(0);
    expect(searchTreatments('zzz')).toEqual([]);
  });
});
