/**
 * Provenance for every catalog string in `src/data/catalog`.
 *
 * evevolutionhealth.com is the brand site; since PR #53 in this repository it
 * hands treatments, the Mrs. Collection and membership off to the Eve's
 * Sisters telehealth site. The copy in this folder was transcribed verbatim
 * from that live telehealth site's published catalog. Nothing here was
 * written from scratch: if a field could not be verified it is either left
 * out or marked as a placeholder with `PLACEHOLDER`.
 *
 * Before any release, re-verify against the live site and record the date.
 */
export const catalogSource = {
  label: 'Eve’s Sisters telehealth site (linked from evevolutionhealth.com)',
  url: 'https://eve-sisters.vercel.app',
  brandSite: 'https://www.evevolutionhealth.com',
  retrieved: '2026-10-27',
} as const;

/** Prefix used for any copy that is not yet verified. Searchable before launch. */
export const PLACEHOLDER = '[Placeholder — confirm before launch]';

/** Published on the telehealth site's Mrs. Collection page. */
export const mrsPricingStatement =
  'Pricing for each Mrs. program is personalized and confirmed during your private consultation — before you commit to anything. Eve’s Sisters memberships start at $199/month. Any medication or lab costs are confirmed with you first.';

/** General statements used across treatment pages. */
export const generalDisclosures = {
  evaluation:
    'Every treatment requires an evaluation by a licensed clinician. Evaluation does not guarantee a prescription; treatment is prescribed only when the clinician determines it is medically appropriate.',
  /** Verbatim from the telehealth site. */
  compounded:
    'Compounded medications are not FDA-approved. The FDA does not verify the safety, effectiveness, or quality of compounded medications. All treatment decisions are made by a licensed medical provider based on an individual evaluation.',
  stateAvailability:
    'Services vary by state. Whether a program is available where you live, and whether a live visit is required, is confirmed during the secure clinical intake.',
  emergency: 'This app is not for emergencies. If you are experiencing a medical emergency, call 911.',
  noIndividualAdvice:
    'Information in this app is general and educational. It is not individual medical advice, a recommendation for any medication, or dosing guidance.',
} as const;

/** Brand details published on the telehealth site. */
export const brand = {
  name: 'Eve’s Sisters',
  /** From the app brand brief; the site itself uses `siteTagline`. */
  tagline: 'Fall in Love With Yourself Again.',
  siteTagline: 'The Evolution of a Woman’s Body.',
  inclusion: ['Every Race.', 'Every Body.', 'Every Story.', 'Every Stage.', 'Every Woman.'],
  empowerment: 'Your Journey. Your Power.',
  supportEmail: 'care@evevolutionhealth.com',
  website: 'https://www.evevolutionhealth.com',
} as const;

/** "How it works" — the published patient journey, verbatim. */
export const patientJourney = [
  {
    n: '01',
    title: 'Tell us what you’re experiencing',
    copy: 'Start with how you feel — not a diagnosis. A private online assessment takes minutes.',
    icon: 'clipboard-outline',
  },
  {
    n: '02',
    title: 'Meet your clinician',
    copy: 'A licensed clinician reviews your history, orders labs where appropriate and talks it through with you.',
    icon: 'videocam-outline',
  },
  {
    n: '03',
    title: 'Receive your personal plan',
    copy: 'If treatment is right for you, your prescription is prepared by a licensed pharmacy and shipped discreetly.',
    icon: 'cube-outline',
  },
  {
    n: '04',
    title: 'Evolve with ongoing care',
    copy: 'Follow-ups, adjustments and a care team that grows with you through every chapter.',
    icon: 'sparkles-outline',
  },
] as const;
