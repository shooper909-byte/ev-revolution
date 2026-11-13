/**
 * Medications and packages shown on evevolutionhealth.com.
 *
 * `catalog-data.json` is exported from the telehealth site's code
 * (eve-sister-wellness-guide: src/data/care.ts, packages.ts, pricing.ts) so both
 * sites use the same medication copy and the same prices. Re-export it when
 * those files change; do not hand-edit the JSON.
 *
 * Prices here must match what Karpa checkout charges. Only prices that were
 * checked against checkout are shown; everything else says the price is shown
 * on the telehealth site.
 */
import data from "./catalog-data.json";

export type CategorySlug = (typeof data.categories)[number]["slug"];

export type Category = {
  slug: string;
  name: string;
  short: string;
  promise: string;
  intro: string;
  clinicalNote: string;
  /** "pathway" categories own no medications; they list ones from other categories. */
  kind: string;
  includes: string[];
};

export type Medication = {
  slug: string;
  name: string;
  aka?: string;
  category: string;
  forms: string[];
  summary: string;
  whatItIs: string;
  howItsUsed: string;
  programs: string[];
  considerations: string[];
  /** true, false, or "partial" (only some forms are compounded). */
  compounded: boolean | string;
  compoundedNote?: string;
};

export type Package = {
  slug: string;
  name: string;
  persona?: string;
  tagline: string;
  forWho: string;
  includes: string[];
  price: number;
  maintenancePrice?: number;
  treatments: string[];
  compounded: boolean;
  availability?: string;
  differentiator: string;
  itemized?: string[];
  priceSummary?: string;
  category: string;
  prepay?: number;
};

export const KARPA = data.KARPA;
export const GLP1_PLANS = data.GLP1_PLANS;
export const GLP1_EXTRAS = data.GLP1_EXTRAS;
export const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0 })}`;

export const categories: Category[] = data.categories;

/**
 * Brand-name (FDA-approved, manufacturer-made) weight-management options the
 * weight-loss intake offers under "Brand-name options". Plan prices are what the
 * intake loaded on Nov 13 2026 (outside North Dakota and Ohio): price every 28 days
 * for each phase, and the 3-month upfront price. Re-check against checkout before
 * changing.
 */
export type BrandPlan = { phase: string; every28Days: number; upfront3mo: number };
export type BrandInfo = { maker: string; ingredient: string; approvedUse: string; plans: BrandPlan[] };

const brandEntries: (Medication & { brand: BrandInfo })[] = [
  {
    slug: "wegovy",
    name: "Wegovy",
    category: "weight-management",
    forms: ["Prefilled injection pen"],
    summary: "Brand-name semaglutide pens made by Novo Nordisk, taken once a week.",
    whatItIs:
      "Wegovy is the brand-name, FDA-approved form of semaglutide, a GLP-1 receptor agonist made by Novo Nordisk. It is approved for chronic weight management in adults with obesity, or overweight with at least one weight-related health condition, alongside a reduced-calorie diet and more physical activity.",
    howItsUsed:
      "A once-weekly injection under the skin from a prefilled pen. The dose is increased gradually; your clinician decides whether Wegovy is appropriate and how your plan progresses.",
    programs: ["Starter, continuation and maintenance plans"],
    considerations: [
      "Requires a clinician evaluation to confirm eligibility.",
      "Not for anyone with a personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).",
      "Your clinician will review your health history, current medications and possible side effects, which most often affect the stomach and digestion.",
    ],
    compounded: false,
    brand: {
      maker: "Novo Nordisk",
      ingredient: "semaglutide",
      approvedUse: "FDA-approved for chronic weight management.",
      plans: [
        { phase: "Starter", every28Days: 719, upfront3mo: 1599 },
        { phase: "Continuation", every28Days: 789, upfront3mo: 2139 },
        { phase: "Maintenance", every28Days: 789, upfront3mo: 2139 },
      ],
    },
  },
  {
    slug: "wegovy-oral",
    name: "Wegovy Oral",
    category: "weight-management",
    forms: ["Daily tablet"],
    summary: "Brand-name oral semaglutide tablets made by Novo Nordisk, taken once a day.",
    whatItIs:
      "Wegovy tablets are the brand-name, FDA-approved oral form of semaglutide, a GLP-1 receptor agonist made by Novo Nordisk, for chronic weight management alongside a reduced-calorie diet and more physical activity.",
    howItsUsed:
      "A tablet taken once a day, with specific timing around food and water that your clinician and pharmacist will explain. Your clinician decides whether it is appropriate for you.",
    programs: ["Starter and maintenance plans"],
    considerations: [
      "Requires a clinician evaluation to confirm eligibility.",
      "Not for anyone with a personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).",
      "Your clinician will review your health history, current medications and possible side effects.",
    ],
    compounded: false,
    brand: {
      maker: "Novo Nordisk",
      ingredient: "semaglutide (oral)",
      approvedUse: "FDA-approved for chronic weight management.",
      plans: [
        { phase: "Starter", every28Days: 609, upfront3mo: 1399 },
        { phase: "Maintenance", every28Days: 689, upfront3mo: 1849 },
      ],
    },
  },
  {
    slug: "zepbound",
    name: "Zepbound KwikPen",
    category: "weight-management",
    forms: ["Multi-dose injection pen (KwikPen)"],
    summary: "Brand-name tirzepatide pens made by Eli Lilly, taken once a week.",
    whatItIs:
      "Zepbound is the brand-name, FDA-approved form of tirzepatide, a dual GIP and GLP-1 receptor agonist made by Eli Lilly. It is approved for chronic weight management in adults with obesity, or overweight with at least one weight-related condition, alongside diet and physical activity, and for moderate-to-severe obstructive sleep apnea in adults with obesity.",
    howItsUsed:
      "A once-weekly injection under the skin from a KwikPen. The dose is increased gradually; your clinician decides whether Zepbound is appropriate and how your plan progresses.",
    programs: ["Starter, continuation and maintenance plans"],
    considerations: [
      "Requires a clinician evaluation to confirm eligibility.",
      "Not for anyone with a personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).",
      "Your clinician will review your health history, current medications (including birth control pills) and possible side effects.",
    ],
    compounded: false,
    brand: {
      maker: "Eli Lilly",
      ingredient: "tirzepatide",
      approvedUse: "FDA-approved for chronic weight management.",
      plans: [
        { phase: "Starter", every28Days: 899, upfront3mo: 2319 },
        { phase: "Continuation", every28Days: 969, upfront3mo: 2679 },
        { phase: "Maintenance", every28Days: 969, upfront3mo: 2679 },
      ],
    },
  },
  {
    slug: "mounjaro",
    name: "Mounjaro",
    category: "weight-management",
    forms: ["Injection pen"],
    summary: "Brand-name tirzepatide pens made by Eli Lilly, taken once a week.",
    whatItIs:
      "Mounjaro is the brand-name form of tirzepatide made by Eli Lilly. It is FDA-approved to improve blood sugar in adults with type 2 diabetes, alongside diet and exercise. It is not FDA-approved for weight management; prescribing it for that purpose is off-label and is your clinician's decision.",
    howItsUsed:
      "A once-weekly injection under the skin. The dose is increased gradually; your clinician decides whether it is appropriate for you.",
    programs: ["Starter, continuation and maintenance plans"],
    considerations: [
      "Requires a clinician evaluation to confirm eligibility.",
      "Not for anyone with a personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).",
      "Your clinician will review your health history, current medications and possible side effects.",
    ],
    compounded: false,
    brand: {
      maker: "Eli Lilly",
      ingredient: "tirzepatide",
      approvedUse: "FDA-approved for type 2 diabetes; use for weight management is off-label.",
      plans: [
        { phase: "Starter", every28Days: 1779, upfront3mo: 5109 },
        { phase: "Continuation", every28Days: 1779, upfront3mo: 5109 },
        { phase: "Maintenance", every28Days: 1779, upfront3mo: 5109 },
      ],
    },
  },
  {
    slug: "orforglipron",
    name: "Orforglipron (Foundayo)",
    category: "weight-management",
    forms: ["Daily tablet"],
    summary: "A brand-name, once-daily oral GLP-1 tablet made by Eli Lilly.",
    whatItIs:
      "Orforglipron, sold as Foundayo, is a once-daily oral GLP-1 receptor agonist made by Eli Lilly for weight management. Your clinician will review its approved uses and whether it is right for you.",
    howItsUsed: "A tablet taken once a day. Your clinician decides whether it is appropriate and how your plan progresses.",
    programs: ["Starter and maintenance plans"],
    considerations: [
      "Requires a clinician evaluation to confirm eligibility.",
      "Your clinician will review your health history, current medications, warnings and possible side effects.",
    ],
    compounded: false,
    brand: {
      maker: "Eli Lilly",
      ingredient: "orforglipron",
      approvedUse: "Brand-name medication.",
      plans: [
        { phase: "Starter", every28Days: 609, upfront3mo: 1399 },
        { phase: "Maintenance", every28Days: 689, upfront3mo: 1849 },
      ],
    },
  },
];

export const BRAND_NOTICE =
  "Wegovy is a registered trademark of Novo Nordisk. Zepbound, Mounjaro and Foundayo are trademarks of Eli Lilly and Company. Eve’s Sisters is not affiliated with or endorsed by either company. Brand-name medications are dispensed by licensed pharmacies only when a licensed provider prescribes them.";

export const brandInfo = (slug: string): BrandInfo | undefined => brandEntries.find((b) => b.slug === slug)?.brand;
export const brandMedications: Medication[] = brandEntries;
export const medications: Medication[] = [...(data.treatments as Medication[]), ...brandEntries];

/** Lifestyle photo for each category (brand-site care images). */
export const categoryImages: Record<string, { src: string; alt: string }> = {
  "weight-management": { src: "/images/care/care-weight-management.webp", alt: "A woman smiling in natural light" },
  "hormones-menopause": { src: "/images/care/care-menopause-hormones.webp", alt: "A woman in her fifties relaxing at home" },
  "skin-beauty": { src: "/images/care/care-skin-beauty-v3.webp", alt: "A woman with glowing skin" },
  "hair-health": { src: "/images/care/care-hair.webp", alt: "A woman with healthy, full hair" },
  "eves-secrets": { src: "/images/care/care-eves-secret-collection.webp", alt: "The Eve’s Secret collection" },
  peptides: { src: "/images/products/peptide-care.png", alt: "Eve’s Sisters peptide care products" },
  "longevity-renewal": { src: "/images/care/care-longevity.webp", alt: "A woman enjoying an active, healthy life" },
};

/**
 * Product photo for a medication: the labeled Eve's Sisters product shot
 * (from the telehealth site's product images). Brand-name medications use an
 * original, unbranded illustration of their form (weekly pen or daily tablets)
 * instead: manufacturer packaging is trademarked and is not imitated, and the
 * page labels the image as an illustration (`illustration: true`).
 */
export function medicationImage(m: Medication): { src: string; alt: string; product: boolean; illustration: boolean } {
  const brand = brandEntries.find((b) => b.slug === m.slug);
  if (!brand) return { src: `/images/medications/${m.slug}.webp`, alt: `${m.name} product`, product: true, illustration: false };
  const pen = brand.forms.some((f) => /pen/i.test(f));
  return {
    src: `/images/medications/${m.slug}.webp`,
    alt: pen ? "Illustration of a once-weekly injection pen, not the actual product" : "Illustration of once-daily oral tablets, not the actual product",
    product: true,
    illustration: true,
  };
}

export const ILLUSTRATION_NOTE = "Illustration only. The actual product and packaging look different.";

/**
 * Photo for each package, chosen so no two package cards share a photo.
 * Owner-supplied campaign photos live in /images/plans; the rest use the
 * Mrs. Collection portrait or the category photo.
 */
const packageImages: Record<string, { src: string; alt: string }> = {
  "glp1-semaglutide": { src: "/images/plans/glp1-semaglutide.webp", alt: "Three women in their fifties and sixties, smiling" },
  "glp1-tirzepatide": { src: "/images/plans/glp1-tirzepatide.webp", alt: "Three women of different backgrounds, close together" },
  "elite-total-evolution": { src: "/images/plans/elite-total-evolution.webp", alt: "Four women in elegant evening wear in a lounge" },
  "menopause-essentials": { src: "/images/plans/menopause-essentials.webp", alt: "Three women laughing together on a sofa" },
  "mrs-jones-tirzepatide": categoryImages["weight-management"],
};

export function packageImage(p: Package): { src: string; alt: string } {
  if (packageImages[p.slug]) return packageImages[p.slug];
  if (p.persona) return { src: `/images/mrs-collection/${p.persona}.png`, alt: `${p.name}` };
  return categoryImages[p.category] ?? categoryImages["weight-management"];
}

export const getMedication = (slug: string) => medications.find((m) => m.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

/** Medications a category owns, plus the ones a "pathway" category points to. */
export function medicationsIn(slug: string): Medication[] {
  const cat = getCategory(slug);
  const own = medications.filter((m) => m.category === slug);
  const pulled = (cat?.includes ?? []).map(getMedication).filter((m): m is Medication => !!m && m.category !== slug);
  return [...own, ...pulled];
}

/** Categories that own medications, in display order (pathways list others' medications, so they're skipped on the hub). */
export const medicationCategories = categories.filter((c) => c.kind !== "pathway");

const HRT_VISIT = `plus a ${money(KARPA.hrtVisit)} clinician visit for hormone care`;

/**
 * Prices checked against Karpa checkout (Nov 2026). `line` is the headline,
 * `detail` the fine print. Medications without an entry show no price.
 */
export const medicationPrices: Record<string, { line: string; detail?: string }> = {
  semaglutide: {
    line: `From ${money(KARPA.semaglutide)} every 28 days`,
    detail: `${money(GLP1_PLANS[0].every28Days)} every 28 days for ${GLP1_PLANS[0].payments} payments (${money(GLP1_PLANS[0].every28Days * GLP1_PLANS[0].payments)} total), or ${money(GLP1_PLANS[0].upfront3mo)} upfront for 3 months. ${money(KARPA.semaglutideMaintenance)} every 28 days at the maintenance dose. Oral tablet plan from $189 every 28 days ($419 upfront for 3 months); microdose plan $179 every 28 days ($449 upfront). Includes your first clinician visit and shipping.`,
  },
  tirzepatide: {
    line: `From ${money(KARPA.tirzepatide)} every 28 days`,
    detail: `${money(GLP1_PLANS[1].every28Days)} every 28 days for ${GLP1_PLANS[1].payments} payments (${money(GLP1_PLANS[1].every28Days * GLP1_PLANS[1].payments)} total), or ${money(GLP1_PLANS[1].upfront3mo)} upfront for 3 months. ${money(KARPA.tirzepatideMaintenance)} every 28 days at the maintenance dose. Oral tablet plan from $209 every 28 days ($519 upfront for 3 months); microdose plan $249 every 28 days ($649 upfront). Includes your first clinician visit and shipping.`,
  },
  ...Object.fromEntries(
    brandEntries.map((b) => [
      b.slug,
      {
        line: `From ${money(b.brand.plans[0].every28Days)} every 28 days`,
        detail: `${b.brand.plans
          .map((p) => `${p.phase}: ${money(p.every28Days)} every 28 days for 3 payments, or ${money(p.upfront3mo)} upfront for 3 months`)
          .join(". ")}. Includes your first clinician visit.`,
      },
    ]),
  ),
  "mic-b12-lipostat": { line: `${money(GLP1_EXTRAS.micB12_3mo)} per 3-month supply`, detail: "Offered as an add-on to a GLP-1 plan at checkout." },
  ondansetron: { line: `${money(GLP1_EXTRAS.ondansetron3mo)} per 3-month supply`, detail: "Offered as an add-on to a GLP-1 plan at checkout." },
  estradiol: { line: `From ${money(KARPA.estradiolMonthly)}/month`, detail: `Medication price, ${HRT_VISIT}.` },
  "progesterone-ir": { line: `From ${money(KARPA.progesteroneMonthly)}/month`, detail: `Medication price, ${HRT_VISIT}.` },
  "biest-progesterone": { line: `From ${money(KARPA.biestProgesteroneMonthly)}/month`, detail: `Medication price, ${HRT_VISIT}.` },
  "estradiol-vaginal-cream": { line: `${money(KARPA.vaginalEstradiolPerGram)} per gram`, detail: `Medication price, ${HRT_VISIT}.` },
  "tretinoin-cream": { line: `${money(KARPA.tretinoin3mo)} per 3-month supply` },
  "cashmere-cream": { line: `${money(KARPA.cashmere3mo)} per 3-month supply` },
  "pt-141": { line: `${money(KARPA.pt141_3mo)} per 3-month supply` },
  sermorelin: { line: `${money(KARPA.sermorelin3mo)} per 3-month supply` },
  "nad-plus-nasal-spray": { line: `${money(KARPA.nadNasal3mo)} per 3-month supply` },
};

/** Shown where a medication has no checked price. */
export const PRICE_ON_TELEHEALTH = "Your price is shown on our telehealth site before you pay.";

/**
 * Corrections to the exported package copy, so "what's included" is exact.
 * The telehealth site's packages listed "follow-ups" as included; the intake
 * price screen says additional visits are not included, and hormone-care visits
 * are billed per visit. Follow-ups are explained in `PACKAGE_VISIT_NOTE` instead.
 */
const INCLUDE_FIXES: Record<string, string> = {
  "Follow-ups every refill cycle and discreet delivery": "Discreet delivery",
  "Licensed clinician evaluation and follow-ups": "Licensed clinician evaluation",
  "Licensed clinician care": "Your first clinician visit",
  "Licensed clinician care and discreet delivery": "Licensed clinician evaluation and discreet delivery",
};

export const PACKAGE_VISIT_NOTE = `Follow-up visits are billed separately: hormone-care visits are ${money(KARPA.hrtVisit)} each, and GLP-1 plan prices include your first clinician visit only.`;

/** GLP-1 packages sold as one plan: exact price lines matching checkout. */
const glp1PriceLines: Record<string, string[]> = {
  "glp1-semaglutide": [medicationPrices.semaglutide.detail!],
  "glp1-tirzepatide": [medicationPrices.tirzepatide.detail!],
};

/** GLP-1 plans bill every 28 days, not per calendar month; the exported copy says "/month". */
const glp1Billing = (s: string) =>
  s
    .replace(/(Semaglutide plan:?|Tirzepatide plan:?|tirzepatide plan:?|GLP-1 plan from|Tirzepatide) (\$\d+)\/month/g, "$1 $2 every 28 days")
    .replace(/\((\$\d+) at maintenance dose\)/g, "($1 every 28 days at the maintenance dose)");

export const packages: Package[] = (data.packages as Package[]).map((p) => ({
  ...p,
  includes: p.includes.map((i) => INCLUDE_FIXES[i] ?? i),
  itemized: (p.itemized ?? glp1PriceLines[p.slug])?.map(glp1Billing),
  priceSummary: p.priceSummary && glp1Billing(p.priceSummary),
}));

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);

/** Short price line for package cards. */
export const packagePriceLine = (p: Package) =>
  p.priceSummary ?? (p.slug.startsWith("glp1-") ? `From ${money(p.price)} every 28 days` : `${money(p.price)}/month`);

export const COMPOUNDED_NOTICE =
  "Compounded medications are not FDA-approved. The FDA does not verify their safety, effectiveness or quality. They are prepared by licensed pharmacies and prescribed only when a licensed provider determines they are appropriate for you.";
