/**
 * Treatments & Medications content — the single source for /treatments.
 *
 * Source of truth: the Karpa Treatment Catalog (effective 09/2026) and
 * verified clinical-partner information. A catalog listing alone does NOT
 * confirm that a treatment is open for enrolment, so every entry starts as
 * "pending" until Karpa confirms availability in writing. Only change a
 * status to "confirmed" with a dated confirmation recorded in `availability`.
 *
 * Descriptions are plain-language summaries checked against the sources
 * listed on each entry. Never add dosing, titration or self-treatment advice,
 * and never describe a compounded product as an approved brand-name drug.
 */

export type AvailabilityStatus = "confirmed" | "pending" | "coming-soon";

/** Whether the partner-supplied product is compounded, per the catalog. */
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
  /** Existing lead form, used while enrolment is not active. */
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
  /** Only forms that appear in the current Karpa catalog. */
  form?: string;
  formulation: Formulation;
  description: string;
  /** Essential, source-backed eligibility caution. */
  caution?: string;
  status: AvailabilityStatus;
  availability: { note: string; checked: string };
  catalogRef: string;
  sources: readonly Source[];
  verified: string;
};

export const catalogSource = "Karpa Treatment Catalog, effective 09/2026";
const CHECKED = "2026-09-22";
const PENDING = {
  note: "Listed in the Karpa catalog; active availability not yet confirmed by Karpa.",
  checked: CHECKED,
} as const;

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

const medline = (slug: string, label: string): Source => ({
  label: `MedlinePlus: ${label}`,
  url: `https://medlineplus.gov/druginfo/meds/${slug}.html`,
});

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
    image: "/images/care/care-skin-beauty.webp",
    imageAlt: "Close profile of a woman with deep brown skin against a dark background.",
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
      "Other treatments listed by our clinical partner are still being reviewed for availability, formulation and clinical scope. None are published yet.",
  },
];

export const treatments: readonly Treatment[] = [
  // Weight Management — injectable programs only. Oral compounded tablets are
  // withheld (see `withheldTreatments`).
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
    catalogRef: `${catalogSource}, p. 1 (Semaglutide programs)`,
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
    catalogRef: `${catalogSource}, p. 1 (Tirzepatide programs)`,
    sources: [
      medline("a622044", "Tirzepatide Injection"),
      { label: "DailyMed: Zepbound (tirzepatide) labeling", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=487cd7e7-434c-4925-99fa-aa80b1cc776b" },
    ],
    verified: CHECKED,
  },

  // Menopause & Hormones
  {
    id: "estradiol",
    name: "Estradiol",
    category: "hormones",
    form: "Capsule or transdermal patch",
    formulation: "unconfirmed",
    description:
      "An estrogen used in appropriate patients to treat certain menopause symptoms.",
    caution:
      "Not for use during pregnancy. Women with a uterus are usually prescribed a progestin with it.",
    status: "pending",
    availability: PENDING,
    catalogRef: `${catalogSource}, p. 4 (Estradiol capsule; Estradiol patch)`,
    sources: [medline("a682922", "Estradiol")],
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
    catalogRef: `${catalogSource}, p. 4 (Estradiol Vaginal Insert)`,
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
    catalogRef: `${catalogSource}, p. 4 (Progesterone IR)`,
    sources: [
      medline("a604017", "Progesterone"),
      { label: "DailyMed: Prometrium (progesterone) labeling", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cf73c385-5173-4b54-af23-069581c5d560" },
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
    catalogRef: `${catalogSource}, p. 4 (BIEST 20:80 cream)`,
    sources: [
      bhtReview,
      nasemCbht,
    ],
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
    catalogRef: `${catalogSource}, p. 4 (BIEST (20:80) / Progesterone IR capsule)`,
    sources: [
      bhtReview,
      nasemCbht,
      medline("a604017", "Progesterone"),
    ],
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
    catalogRef: `${catalogSource}, p. 2 (PT-141 Starter)`,
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
      "No combination of these ingredients is FDA-approved for women’s sexual wellness. Women-specific eligibility requires confirmation.",
    status: "pending",
    availability: PENDING,
    catalogRef: `${catalogSource}, p. 2 (Fem Max Troche)`,
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

  // Skin & Beauty
  {
    id: "tretinoin",
    name: "Tretinoin",
    category: "skin",
    form: "Cream or gel",
    formulation: "unconfirmed",
    description:
      "A topical retinoid used for acne; some prescription forms are approved to reduce fine facial wrinkles.",
    caution: "Not recommended during pregnancy. Your clinician will review this with you.",
    status: "pending",
    availability: PENDING,
    catalogRef: `${catalogSource}, p. 3 (Tretinoin Cream 0.02%; Tretinoin Gel 0.01%)`,
    sources: [
      medline("a682437", "Tretinoin Topical"),
      { label: "DailyMed: Renova (tretinoin cream 0.02%) labeling", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9f0a0e8d-1051-48a4-80c5-1bd260dd9c36" },
    ],
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
    catalogRef: `${catalogSource}, p. 3 (Cashmere Cream)`,
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
    catalogRef: `${catalogSource}, p. 3 (GHK-Cu Cream 0.5%)`,
    sources: [
      ghkReview,
      {
        label: "FDA: Bulk drug substances that may present significant safety risks",
        url: "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
      },
    ],
    verified: CHECKED,
  },

  // Hair & Scalp — forms exactly as supplied in the catalog.
  {
    id: "finasteride",
    name: "Finasteride",
    category: "hair",
    form: "Tablet",
    formulation: "unconfirmed",
    description:
      "A medication that blocks production of a male hormone in the scalp linked to some types of hair loss.",
    caution:
      "FDA-approved for men only. Women who are or may become pregnant should not take it or touch broken or crushed tablets.",
    status: "pending",
    availability: PENDING,
    catalogRef: `${catalogSource}, p. 3 (Finasteride 1mg)`,
    sources: [medline("a698016", "Finasteride")],
    verified: CHECKED,
  },
  {
    id: "finasteride-minoxidil",
    name: "Finasteride / Minoxidil combinations",
    aliases: ["Minoxidil"],
    category: "hair",
    form: "Capsule, topical solution, or topical foam (with tretinoin)",
    formulation: "compounded",
    description: "Formulations combining two medications used for certain types of hair loss.",
    caution:
      "Contain finasteride, which is not for women who are or may become pregnant. Oral minoxidil is FDA-approved only for high blood pressure. Prescribing to women requires confirmation.",
    status: "pending",
    availability: PENDING,
    catalogRef: `${catalogSource}, p. 3 (Finasteride / Minoxidil capsule, topical, and foam)`,
    sources: [
      medline("a698016", "Finasteride"),
      medline("a689003", "Minoxidil Topical"),
      medline("a682608", "Minoxidil (oral)"),
    ],
    verified: CHECKED,
  },
];

/**
 * Partner-listed items deliberately NOT published, with the reason. Review
 * each with Karpa before adding it to `treatments`.
 */
export const withheldTreatments: readonly { name: string; reason: string }[] = [
  { name: "Semaglutide Oral Tablet", reason: "Compounded oral tablet; exact formulation and lawful availability not confirmed. Must not be presented as interchangeable with an approved oral drug." },
  { name: "Tirzepatide Oral Tablet", reason: "Compounded oral tablet; exact formulation and lawful availability not confirmed." },
  { name: "MIC-B12 Lipostat", reason: "No confirmed clinical service or supportable description." },
  { name: "Olympus Troche (oxytocin / tadalafil / bremelanotide)", reason: "Not identified as a women’s formulation; women-specific eligibility unconfirmed." },
  { name: "Sildenafil 55mg, Tadalafil 25mg PRN, Tadalafil 5mg daily", reason: "Male ED products; not placed in the women’s offering." },
  { name: "DHEA Cream", reason: "No confirmed clinical service or verified description." },
  { name: "Liothyronine (T3) SR, T3/T4", reason: "Thyroid medications; relevant clinical service not confirmed." },
  { name: "Testosterone Cypionate, Testosterone Cream, Enclomiphene, Anastrozole, HCG", reason: "Requires the separately authorized controlled-substance / testosterone program (listed as coming soon on the partner offer sheet)." },
  { name: "Sermorelin, Tesamorelin, NAD+ (injection and nasal), Glutathione, BPC-157 Oral", reason: "Availability, lawful offering, clinical scope and supportable descriptions not confirmed." },
  { name: "CJC-1295 / Ipamorelin, BPC-157, MOTS-C, GHK-Cu injection, TB-500, Wolverine, Glow", reason: "Catalog lists as coming soon; regulatory status unresolved." },
  { name: "Lab panels and at-home test kit", reason: "Diagnostics, not medications; at-home kit listed as coming soon." },
];
