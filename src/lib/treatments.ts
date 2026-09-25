/**
 * Treatments & Medications content — the single source for /treatments.
 *
 * Built line by line from the Karpa Treatment Catalog (effective 09/2026).
 * Every catalog line appears exactly once: either in a published card's
 * `catalogItems` (dosing tiers are consolidated onto one card) or in
 * `withheldTreatments` with the reason it is not published.
 *
 * A catalog listing does NOT confirm that a treatment is open for enrollment,
 * so published entries stay "pending" until Karpa confirms availability in
 * writing. Only change a status to "confirmed" with a dated confirmation
 * recorded in `availability`.
 *
 * Never show supplier costs, dosing or titration schedules, and never describe
 * a compounded product as an approved brand-name drug.
 */

export type AvailabilityStatus = "confirmed" | "pending" | "coming-soon";

/**
 * "compounded": the catalog item is necessarily compounded (a combination,
 * strength or dosage form with no FDA-approved equivalent).
 * "unconfirmed": could be a commercial product; confirm with Karpa.
 */
export type Formulation = "compounded" | "unconfirmed";

export type Source = { label: string; url: string };

export type CategoryId =
  | "weight"
  | "hormones"
  | "sexual"
  | "skin"
  | "hair"
  | "other";

export type TreatmentCategory = {
  id: CategoryId;
  label: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  /** Existing care page this category belongs to. */
  pathway: { href: string; label: string };
  /** Existing lead form, used while enrollment is not active. */
  waitlistHref: string;
  /** Shown when a category has nothing published yet. */
  pendingNote?: string;
};

export type Treatment = {
  id: string;
  name: string;
  /** Other names people search for. */
  aliases?: readonly string[];
  category: CategoryId;
  /** Form as listed in the catalog. */
  form: string;
  formulation: Formulation;
  description: string;
  /** Essential, source-backed eligibility caution. */
  caution?: string;
  status: AvailabilityStatus;
  availability: { note: string; checked: string };
  /** The catalog lines this card covers (tiers consolidated here). */
  catalogItems: readonly string[];
  sources: readonly Source[];
  verified: string;
};

export type ReviewFlag =
  | "Women-specific prescribing"
  | "Clinical scope"
  | "Lawful availability";

export type WithheldTreatment = {
  catalogItem: string;
  catalogSection: string;
  /** Label printed in the catalog itself, e.g. "Coming soon". */
  catalogLabel?: string;
  flags: readonly ReviewFlag[];
  reason: string;
};

export const catalogSource = "Karpa Treatment Catalog, effective 09/2026";
const CHECKED = "2026-09-22";
const PENDING = {
  note: "Listed in the Karpa catalog; active availability not yet confirmed by Karpa.",
  checked: CHECKED,
} as const;

const medline = (slug: string, label: string): Source => ({
  label: `MedlinePlus: ${label}`,
  url: `https://medlineplus.gov/druginfo/meds/${slug}.html`,
});
const bhtReview: Source = {
  label: "Mayo Clinic Proceedings: Bioidentical hormone therapy (PMC3127562)",
  url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3127562/",
};
const nasemCbht: Source = {
  label: "FDA: NASEM study on compounded bioidentical hormone therapy",
  url: "https://www.fda.gov/drugs/human-drug-compounding/national-academies-science-engineering-and-medicine-nasem-study-clinical-utility-treating-patients",
};
const ghkReview: Source = {
  label: "PubMed Central: GHK-Cu review (Pickart & Margolina, 2018)",
  url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6073405/",
};
const cosmeticActives: Source = {
  label: "PubMed Central: Topical niacinamide and caffeine (PMC10988741)",
  url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10988741/",
};
const tretinoinSources = [
  medline("a682437", "Tretinoin Topical"),
  {
    label: "DailyMed: Renova (tretinoin cream 0.02%) labeling",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9f0a0e8d-1051-48a4-80c5-1bd260dd9c36",
  },
] as const;

export const statusLabels: Record<AvailabilityStatus, string> = {
  confirmed: "Confirmed available",
  pending: "Availability pending confirmation",
  "coming-soon": "Coming soon",
};

export const treatmentCategories: readonly TreatmentCategory[] = [
  {
    id: "weight",
    label: "Weight Management",
    eyebrow: "Support a healthier you",
    image: "/images/care/care-weight-management.webp",
    imageAlt: "A smiling woman with long dark hair in a black dress.",
    pathway: { href: "/care/weight-management", label: "Weight Care" },
    waitlistHref: "/care/weight-management#get-started",
  },
  {
    id: "hormones",
    label: "Menopause & Hormones",
    eyebrow: "More balance. Brighter days.",
    image: "/images/care/care-menopause-hormones.webp",
    imageAlt: "A woman with silver-streaked hair looking upward in warm light.",
    pathway: { href: "/care/hormones-menopause", label: "Hormone Care" },
    waitlistHref: "/care/hormones-menopause#get-started",
  },
  {
    id: "sexual",
    label: "Sexual Wellness",
    eyebrow: "Desire. Connection. You.",
    image: "/images/care/care-together.webp",
    imageAlt: "Four women of different ages and body types standing together.",
    pathway: { href: "/eves-secret", label: "Eve’s Secret™" },
    waitlistHref: "/care/hormones-menopause#get-started",
  },
  {
    id: "skin",
    label: "Skin & Beauty",
    eyebrow: "Healthy skin at every age",
    image: "/images/care/care-skin-beauty-v3.webp",
    imageAlt: "A woman with luminous skin, head tilted back and one hand at her neck, in warm low light.",
    pathway: { href: "/care/skin-beauty", label: "Skin Care" },
    waitlistHref: "/care/skin-beauty#get-started",
  },
  {
    id: "hair",
    label: "Hair & Scalp",
    eyebrow: "Stronger hair. Brighter confidence.",
    image: "/images/care/care-longevity.webp",
    imageAlt: "A smiling woman with long silver hair in a black jacket.",
    pathway: { href: "/care/skin-beauty", label: "Hair Care" },
    waitlistHref: "/care/skin-beauty#get-started",
    pendingNote:
      "The hair-loss formulations listed by our clinical partner contain finasteride, which is FDA-approved for men only. They are under review for women-specific prescribing and are not published yet. A clinician can discuss hair-loss options with you.",
  },
  {
    id: "other",
    label: "Other Partner-Listed Treatments",
    eyebrow: "Under review",
    image: "/images/home/review-your-options.webp",
    imageAlt: "A woman at home on a video visit with a clinician.",
    pathway: { href: "/peptide-care", label: "Peptide Care" },
    waitlistHref: "/peptide-care#get-started",
    pendingNote:
      "Other treatments listed by our clinical partner — including peptides, some marked coming soon — are still being reviewed for clinical scope and lawful availability. None are published yet.",
  },
];

export const treatments: readonly Treatment[] = [
  // Weight Management. Karpa's partner costs for these programs are far below
  // any branded GLP-1, so the injectables are treated as compounded.
  {
    id: "semaglutide",
    name: "Semaglutide",
    category: "weight",
    form: "Injectable",
    formulation: "compounded",
    description: "A GLP-1 medication that can help regulate appetite and blood sugar.",
    caution: "Not for use during pregnancy. Tell your clinician if you are planning a pregnancy.",
    status: "pending",
    availability: PENDING,
    catalogItems: [
      "Semaglutide Starter",
      "Semaglutide Continuation",
      "Semaglutide Maintenance",
      "Semaglutide Microdose",
    ],
    sources: [medline("a618008", "Semaglutide Injection")],
    verified: CHECKED,
  },
  {
    id: "tirzepatide",
    name: "Tirzepatide",
    category: "weight",
    form: "Injectable",
    formulation: "compounded",
    description:
      "A medication that acts on GIP and GLP-1 pathways to help regulate appetite and blood sugar.",
    caution: "Can make birth-control pills less effective. Not for use during pregnancy.",
    status: "pending",
    availability: PENDING,
    catalogItems: [
      "Tirzepatide Starter",
      "Tirzepatide Continuation",
      "Tirzepatide Maintenance",
      "Tirzepatide Microdose",
    ],
    sources: [
      medline("a622044", "Tirzepatide Injection"),
      {
        label: "DailyMed: tirzepatide prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=487cd7e7-434c-4925-99fa-aa80b1cc776b",
      },
    ],
    verified: CHECKED,
  },

  // Menopause & Hormones
  {
    id: "estradiol-capsule",
    name: "Estradiol",
    category: "hormones",
    form: "Capsule",
    // FDA-approved oral estradiol-only products are tablets.
    formulation: "compounded",
    description:
      "An estrogen used in appropriate patients to treat certain menopause symptoms.",
    caution:
      "Not for use during pregnancy. Women with a uterus are usually prescribed a progestin with it.",
    status: "pending",
    availability: PENDING,
    catalogItems: ["Estradiol (Capsule)"],
    sources: [medline("a682922", "Estradiol")],
    verified: CHECKED,
  },
  {
    id: "estradiol-patch",
    name: "Estradiol Patch",
    category: "hormones",
    form: "Transdermal patch",
    formulation: "unconfirmed",
    description:
      "An estrogen skin patch used in appropriate patients to treat certain menopause symptoms.",
    caution:
      "Not for use during pregnancy. Women with a uterus are usually prescribed a progestin with it.",
    status: "pending",
    availability: PENDING,
    catalogItems: ["Estradiol Patch"],
    sources: [medline("a605042", "Estradiol Transdermal Patch")],
    verified: CHECKED,
  },
  {
    id: "estradiol-vaginal-insert",
    name: "Estradiol Vaginal Insert",
    category: "hormones",
    form: "Vaginal insert",
    formulation: "unconfirmed",
    description:
      "A local estrogen treatment used for vaginal symptoms associated with menopause.",
    status: "pending",
    availability: PENDING,
    catalogItems: ["Estradiol Vaginal Insert"],
    sources: [medline("a606005", "Estradiol Vaginal")],
    verified: CHECKED,
  },
  {
    id: "progesterone",
    name: "Progesterone",
    category: "hormones",
    form: "Capsule",
    formulation: "unconfirmed",
    description:
      "A hormone prescribed with estrogen to help protect the uterine lining in women who have a uterus.",
    status: "pending",
    availability: PENDING,
    catalogItems: ["Progesterone IR (Capsule)"],
    sources: [
      medline("a604017", "Progesterone"),
      {
        label: "DailyMed: Prometrium (progesterone) labeling",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cf73c385-5173-4b54-af23-069581c5d560",
      },
    ],
    verified: CHECKED,
  },
  {
    id: "biest",
    name: "BIEST",
    aliases: ["Bi-est", "Estriol"],
    category: "hormones",
    form: "Cream",
    formulation: "compounded",
    description: "A compounded combination of estriol and estradiol.",
    caution: "Compounded hormones are not FDA-approved and carry the same risks as other estrogens.",
    status: "pending",
    availability: PENDING,
    catalogItems: ["BIEST (20:80) (Cream)"],
    sources: [bhtReview, nasemCbht],
    verified: CHECKED,
  },
  {
    id: "biest-progesterone",
    name: "BIEST / Progesterone",
    aliases: ["Bi-est", "Estriol"],
    category: "hormones",
    form: "Capsule",
    formulation: "compounded",
    description: "A compounded combination containing estrogens and progesterone.",
    caution: "Compounded hormones are not FDA-approved.",
    status: "pending",
    availability: PENDING,
    catalogItems: ["BIEST (20:80) / Progesterone IR (Capsule)"],
    sources: [bhtReview, nasemCbht, medline("a604017", "Progesterone")],
    verified: CHECKED,
  },

  // Sexual Wellness — women's formulations only.
  {
    id: "bremelanotide",
    name: "Bremelanotide / PT-141",
    aliases: ["PT-141", "PT141"],
    category: "sexual",
    form: "Injectable vial",
    formulation: "compounded",
    description: "A medication that acts on brain pathways involved in sexual desire.",
    caution:
      "The FDA-approved form is a brand-name injection for certain premenopausal women. This compounded version is not that product and is not FDA-approved.",
    status: "pending",
    availability: PENDING,
    catalogItems: ["PT-141 Starter"],
    sources: [medline("a619054", "Bremelanotide Injection")],
    verified: CHECKED,
  },
  {
    id: "fem-max",
    name: "Fem Max",
    category: "sexual",
    form: "Troche",
    formulation: "compounded",
    description: "A compounded combination of tadalafil, oxytocin, and bremelanotide.",
    caution:
      "No combination of these ingredients is FDA-approved for women’s sexual wellness. Eligibility is decided by a clinician.",
    status: "pending",
    availability: PENDING,
    catalogItems: ["Fem Max Troche (Tadalafil / Oxytocin / PT-141)"],
    sources: [
      medline("a604008", "Tadalafil"),
      medline("a619054", "Bremelanotide Injection"),
      {
        label: "DailyMed: Pitocin (oxytocin injection) labeling",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=969d5b35-0add-4c23-9605-6a5b6ab65c95",
      },
    ],
    verified: CHECKED,
  },

  // Skin & Beauty — the two tretinoin vehicles are separate formulations.
  {
    id: "tretinoin-cream",
    name: "Tretinoin Cream 0.02%",
    aliases: ["Tretinoin", "Retinoid"],
    category: "skin",
    form: "Cream",
    formulation: "unconfirmed",
    description:
      "A topical retinoid used for acne; some prescription forms are approved to reduce fine facial wrinkles.",
    caution: "Not recommended during pregnancy. Your clinician will review this with you.",
    status: "pending",
    availability: PENDING,
    catalogItems: ["Tretinoin Cream 0.02%"],
    sources: tretinoinSources,
    verified: CHECKED,
  },
  {
    id: "tretinoin-gel",
    name: "Tretinoin Gel 0.01%",
    aliases: ["Tretinoin", "Retinoid"],
    category: "skin",
    form: "Gel",
    formulation: "unconfirmed",
    description: "A topical retinoid gel used to treat acne.",
    caution: "Not recommended during pregnancy. Your clinician will review this with you.",
    status: "pending",
    availability: PENDING,
    catalogItems: ["Tretinoin Gel 0.01%"],
    sources: [medline("a682437", "Tretinoin Topical")],
    verified: CHECKED,
  },
  {
    id: "cashmere-cream",
    name: "Cashmere Cream",
    category: "skin",
    form: "Cream",
    formulation: "compounded",
    description:
      "A compounded cream containing caffeine, GHK-Cu, niacinamide, and tretinoin.",
    caution: "Contains tretinoin, which is not recommended during pregnancy.",
    status: "pending",
    availability: PENDING,
    catalogItems: ["Cashmere Cream"],
    sources: [medline("a682437", "Tretinoin Topical"), ghkReview, cosmeticActives],
    verified: CHECKED,
  },
  {
    id: "ghk-cu-cream",
    name: "GHK-Cu Cream",
    aliases: ["Copper peptide"],
    category: "skin",
    form: "Cream",
    formulation: "compounded",
    description:
      "A topical copper-peptide formulation; clinical benefits depend on the product and evidence.",
    status: "pending",
    availability: PENDING,
    catalogItems: ["GHK-Cu Cream"],
    sources: [
      ghkReview,
      {
        label: "FDA: Bulk drug substances that may present significant safety risks",
        url: "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
      },
    ],
    verified: CHECKED,
  },
];

const peptideReason =
  "Peptide program: clinical scope, lawful compounding status and a supportable description not confirmed.";
const trtReason =
  "Testosterone program is listed as coming soon (Scale tier) and requires a separately authorized controlled-substance program.";

/**
 * Catalog lines deliberately NOT published, with the review flag and reason.
 * Review each with Karpa before moving it into `treatments`.
 */
export const withheldTreatments: readonly WithheldTreatment[] = [
  // Weight Management
  ...["Semaglutide Oral Tablet Starter", "Semaglutide Oral Tablet Continuation", "Tirzepatide Oral Tablet Starter", "Tirzepatide Oral Tablet Continuation"].map(
    (catalogItem): WithheldTreatment => ({
      catalogItem,
      catalogSection: "Weight Loss (GLP-1)",
      flags: ["Lawful availability"],
      reason:
        "Compounded oral tablet; exact formulation and lawful availability not confirmed. Must not be presented as interchangeable with an FDA-approved oral drug.",
    }),
  ),
  {
    catalogItem: "MIC-B12 Lipostat",
    catalogSection: "Weight Loss (GLP-1)",
    flags: ["Clinical scope"],
    reason: "No confirmed clinical use or supportable plain-language description.",
  },

  // Sexual health
  ...["Sildenafil 55mg PRN", "Tadalafil 25mg PRN", "Tadalafil 5mg Daily"].map(
    (catalogItem): WithheldTreatment => ({
      catalogItem,
      catalogSection: "ED / Sexual Health",
      flags: ["Women-specific prescribing"],
      reason: "Erectile dysfunction product; not placed in the women’s offering.",
    }),
  ),
  {
    catalogItem: "Olympus Troche (Oxytocin / Tadalafil / Bremelanotide)",
    catalogSection: "ED / Sexual Health",
    flags: ["Women-specific prescribing"],
    reason: "Not identified as a women’s formulation (Fem Max is the women’s version).",
  },

  // Peptides
  ...["Sermorelin", "Tesamorelin", "NAD+", "Glutathione", "NAD+ Nasal Spray"].map(
    (catalogItem): WithheldTreatment => ({
      catalogItem,
      catalogSection: "Peptides",
      flags: catalogItem === "Tesamorelin" ? ["Clinical scope", "Lawful availability"] : ["Clinical scope"],
      reason:
        catalogItem === "Tesamorelin"
          ? `${peptideReason} Compounded tesamorelin must not be an essential copy of an FDA-approved drug.`
          : peptideReason,
    }),
  ),
  {
    catalogItem: "BPC-157 Oral",
    catalogSection: "Peptides",
    flags: ["Lawful availability", "Clinical scope"],
    reason: "BPC-157 is not on FDA’s approved bulk-substance list for compounding; status unresolved.",
  },
  ...["CJC-1295 / Ipamorelin", "BPC-157", "MOTS-C", "GHK-Cu", "TB-500", "Wolverine (BPC-157 / TB-500)", "Glow (GHK-Cu / BPC-157 / TB-500)"].map(
    (catalogItem): WithheldTreatment => ({
      catalogItem,
      catalogSection: "Peptides",
      catalogLabel: "Coming soon",
      flags: ["Lawful availability", "Clinical scope"],
      reason:
        "Catalog marks this coming soon. Injectable peptide whose compounding status with FDA is unresolved.",
    }),
  ),

  // Hair Loss — all contain finasteride.
  ...["Finasteride 1mg", "Finasteride / Minoxidil Capsule", "Finasteride / Minoxidil Topical", "Finasteride / Minoxidil / Tretinoin Foam"].map(
    (catalogItem): WithheldTreatment => ({
      catalogItem,
      catalogSection: "Hair Loss",
      flags: ["Women-specific prescribing"],
      reason:
        "Contains finasteride, which is FDA-approved for men only and must not be used by women who are or may become pregnant. Confirm Karpa’s clinicians prescribe it to women.",
    }),
  ),

  // HRT
  {
    catalogItem: "DHEA (Cream)",
    catalogSection: "HRT",
    flags: ["Clinical scope"],
    reason: "Compounded DHEA cream; clinical use and a supportable description not confirmed.",
  },
  ...["Liothyronine (T3) SR (Dye-Free)", "T3/T4 (Capsule)"].map(
    (catalogItem): WithheldTreatment => ({
      catalogItem,
      catalogSection: "HRT",
      flags: ["Clinical scope"],
      reason: "Thyroid medication; a thyroid clinical service is not confirmed.",
    }),
  ),

  // Testosterone
  ...["Testosterone Cypionate MCT", "Testosterone Cypionate (Commercial)", "Testosterone Cream"].map(
    (catalogItem): WithheldTreatment => ({
      catalogItem,
      catalogSection: "Testosterone",
      catalogLabel: "Coming soon (partner offer sheet)",
      flags: ["Lawful availability", "Clinical scope"],
      reason: trtReason,
    }),
  ),
  ...["HCG (Chorionic) powder for reconstitution", "Enclomiphene Citrate 25 mg", "Enclomiphene Citrate 51 mg", "Anastrozole SR"].map(
    (catalogItem): WithheldTreatment => ({
      catalogItem,
      catalogSection: "Testosterone",
      catalogLabel: "Coming soon (partner offer sheet)",
      flags: ["Women-specific prescribing", "Clinical scope"],
      reason: `${trtReason} Listed as part of male testosterone therapy.`,
    }),
  ),

  // Diagnostics
  {
    catalogItem: "TRT Panel",
    catalogSection: "Diagnostics & Lab Panels",
    flags: ["Women-specific prescribing", "Clinical scope"],
    reason: "Laboratory panel for the testosterone program (includes PSA); not a medication.",
  },
  ...["HRT Panel", "Comprehensive Panel", "Peptide Panel", "Peptide Panel 2"].map(
    (catalogItem): WithheldTreatment => ({
      catalogItem,
      catalogSection: "Diagnostics & Lab Panels",
      flags: ["Clinical scope"],
      reason: "Laboratory panel, not a medication; ordering scope and pricing not confirmed.",
    }),
  ),
  {
    catalogItem: "White-Label At-Home Testing Kit (Tasso)",
    catalogSection: "Diagnostics & Lab Panels",
    catalogLabel: "Coming soon",
    flags: ["Clinical scope"],
    reason: "Catalog marks this coming soon with price TBD; not a medication.",
  },
];
