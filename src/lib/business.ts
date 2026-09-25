/**
 * Business identity and care partners — the single source for the contact
 * page, the footer and every policy page.
 *
 * LegitScript checks that the email, phone and business address shown on the
 * site are real and consistent. Fill every empty value with the registered
 * details before submitting the application; an empty value is simply left
 * off the page rather than shown as "TBD".
 */

type Business = {
  brand: string;
  legalName: string;
  email: string;
  phone: string;
  address: readonly string[];
  domain: string;
};

export const business: Business = {
  brand: "Eve’s Sisters",
  /** Registered legal entity name, e.g. "Eve's Sisters LLC". */
  legalName: "",
  /** Support inbox patients use for questions and cancellations. */
  email: "info@evevolutionhealth.com",
  /** Customer support phone number, e.g. "(555) 555-0100". */
  phone: "",
  /** Registered business mailing address, one line per entry. */
  address: [],
  domain: "evevolutionhealth.com",
};

/** Name the business by its legal entity once one is set. */
export const businessName = business.legalName || business.brand;

export const partners = {
  clinical: {
    name: "Elite Care Health",
    role: "Independent physician group whose licensed providers deliver all clinical care",
    url: "https://elite-care.health",
    email: "mayur@elite-care.health",
    phone: "810-348-3003",
  },
  pharmacy: {
    name: "Rx Ave Health",
    role: "Licensed pharmacy that fills and ships prescriptions",
    url: "https://rxave.health",
    email: "info@rxave.health",
    phone: "(833) 360-4276",
  },
} as const;

/** How long medical records are kept after the last clinical encounter. */
export const recordRetentionYears = 7;

/** Date shown on every policy page; update it whenever a policy changes. */
export const policiesEffectiveDate = "September 25, 2026";
