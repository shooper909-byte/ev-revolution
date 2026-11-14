/**
 * The Mrs. Collection — transcribed verbatim from the live telehealth site.
 * See `source.ts` for provenance. Prices are not listed per package on the
 * site; see `mrsPricingStatement`.
 */
export type MrsPackage = {
  slug: 'mrs-jones' | 'mrs-golden' | 'mrs-robinson';
  name: string;
  line: string;
  pillar: string;
  pillarPoints: string[];
  persona: string;
  manifesto: string;
  priorities: { title: string; copy: string }[];
  /** Treatment-category slugs this package focuses on. */
  focus: string[];
  lifeStage: string;
  forWho: string[];
  /** Treatment slugs a clinician may consider within this package. */
  treatments: string[];
  includes: string[];
  /** A bundled image (`require(...)`). */
  image: number;
  imageAlt: string;
};

export const mrsCollection: MrsPackage[] = [
  {
    slug: 'mrs-jones',
    name: 'Mrs. Jones',
    line: 'Everybody notices. Nobody needs to know.',
    pillar: 'Confidence & Whole-Woman Care',
    pillarPoints: [
      'Feel more like you.',
      'Support your changing body.',
      'Care for your mind, mood and more.',
      'A stronger you, inside and out.',
    ],
    persona:
      'She runs the meeting, the household and the group chat. She’s in her stride — and she wants care that keeps up with her.',
    manifesto:
      'Mrs. Jones doesn’t explain herself. She books the consultation between meetings, reviews her plan on the way home and lets the confidence speak for itself.',
    priorities: [
      { title: 'Metabolic support', copy: 'Provider-supervised weight management that respects your hormones.' },
      { title: 'Hormone clarity', copy: 'Perimenopause care with labs that look deeper.' },
      { title: 'Whole-woman view', copy: 'One care team that sees the full picture, not one symptom.' },
    ],
    focus: ['weight-management', 'hormones-menopause'],
    lifeStage: 'Often in her 40s–50s · perimenopause and the years around it',
    forWho: [
      'Juggling career, family and everything in between',
      'Noticing her metabolism, sleep or mood shifting',
      'Wanting one care team that sees the whole picture',
      'Ready for a plan that fits a full calendar',
    ],
    treatments: ['semaglutide', 'tirzepatide', 'estradiol-patch', 'progesterone-ir', 'biest'],
    includes: [
      'Private consultation with a licensed provider',
      'A personalized metabolic and hormone care plan',
      'Labs where appropriate — HRT or Comprehensive Panel',
      'Prescriptions if appropriate, fulfilled by Rx Ave',
      'Ongoing messaging and scheduled check-ins',
      'Discreet delivery to your door',
    ],
    image: require('@/assets/images/collection/mrs-jones.jpg'),
    imageAlt: 'Three confident Black women of different ages in elegant black, purple and gold attire.',
  },
  {
    slug: 'mrs-golden',
    name: 'Mrs. Golden',
    line: 'They’ll call it luck. We’ll know better.',
    pillar: 'Radiance & Balance',
    pillarPoints: [
      'Feel vibrant. Live fully.',
      'Support your energy and focus.',
      'Embrace balance through life’s changes.',
      'Look good. Feel even better.',
    ],
    persona:
      'She travels, she hosts, she’s the one everyone asks for advice. Her glow isn’t luck — it’s intention.',
    manifesto:
      'Mrs. Golden treats her well-being like her wardrobe: considered, investment-worthy and entirely her own.',
    priorities: [
      { title: 'Skin, elevated', copy: 'Prescription skincare tailored to every tone and texture.' },
      { title: 'Hair health', copy: 'Clinician-guided options for thinning and shedding.' },
      { title: 'Balance', copy: 'Hormone care for the transitions that shift everything.' },
    ],
    focus: ['skin-beauty', 'hair-health', 'hormones-menopause'],
    lifeStage: 'Often in her 50s–60s · menopause and beyond',
    forWho: [
      'Wanting her skin and hair to feel like hers again',
      'Navigating hormonal change with grace',
      'Investing in herself — intentionally',
      'Preferring expert guidance over trial and error',
    ],
    treatments: ['tretinoin-cream', 'ghk-cu-cream', 'minoxidil', 'estradiol', 'dhea'],
    includes: [
      'Private consultation with a licensed provider',
      'A personalized skin, hair and hormone care plan',
      'Prescription-grade topicals if appropriate',
      'Labs where appropriate — HRT Panel',
      'Follow-ups to review and adjust your plan',
      'Discreet delivery to your door',
    ],
    image: require('@/assets/images/collection/mrs-golden.jpg'),
    imageAlt: 'Four women from different cultural backgrounds in elegant black, purple and champagne attire.',
  },
  {
    slug: 'mrs-robinson',
    name: 'Mrs. Robinson',
    line: 'Let them wonder.',
    pillar: 'Renewal & Longevity',
    pillarPoints: [
      'A healthier tomorrow.',
      'Plan for the years ahead.',
      'Invest in your long-term well-being.',
      'More living. More you.',
    ],
    persona:
      'She has nothing left to prove and every intention of enjoying what’s next. Mature, magnetic and entirely unbothered.',
    manifesto:
      'Mrs. Robinson plays the long game — longevity, intimacy and the private confidence of a woman who knows exactly what she wants.',
    priorities: [
      { title: 'Longevity programs', copy: 'Clinician-guided peptide and wellness programs.' },
      { title: 'Intimate wellness', copy: 'Eve’s Secrets — a discreet pathway for desire and comfort.' },
      { title: 'Proactive care', copy: 'Hormone and thyroid support with ongoing follow-up.' },
    ],
    focus: ['longevity-renewal', 'peptides', 'eves-secrets', 'hormones-menopause'],
    lifeStage: 'Often 55+ · longevity and her most confident years',
    forWho: [
      'Planning for a long, vibrant future',
      'Curious about longevity labs and peptide programs',
      'Wanting intimacy and comfort to be part of her care',
      'Valuing privacy above all',
    ],
    treatments: ['nad-plus', 'sermorelin', 'glutathione', 'pt-141', 'estradiol-vaginal-insert'],
    includes: [
      'Private consultation with a licensed provider',
      'A longevity plan guided by labs — Comprehensive or peptide monitoring panels',
      'Clinician-directed peptide programs if appropriate',
      'Access to the Eve’s Secrets intimate wellness pathway',
      'Ongoing follow-up with your care team',
      'Discreet delivery to your door',
    ],
    image: require('@/assets/images/collection/mrs-robinson.jpg'),
    imageAlt: 'Three confident women in midlife and beyond wearing elegant black and deep purple attire.',
  },
];

export function getMrsPackage(slug: string | undefined): MrsPackage | undefined {
  return mrsCollection.find((p) => p.slug === slug);
}
