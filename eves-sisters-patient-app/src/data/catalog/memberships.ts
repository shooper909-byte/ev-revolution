/**
 * Membership tiers as published on the live telehealth site (see
 * `source.ts`). Prices are monthly, in USD. Billing terms, renewal and
 * cancellation language are not published per tier and must come from the
 * approved enrollment flow — the app never takes payment.
 */
export type MembershipTier = {
  id: 'essentials' | 'signature' | 'elite';
  name: string;
  monthlyPriceUsd: number;
  positioning: string;
  features: string[];
  featured: boolean;
};

export const membershipTiers: MembershipTier[] = [
  {
    id: 'essentials',
    name: 'Essentials',
    monthlyPriceUsd: 199,
    positioning: 'Your entry into Eve’s Sisters care.',
    features: [
      'Virtual care access',
      'Foundational wellness support',
      'Selected eligible treatments & services',
      'Ongoing guidance from your care team',
    ],
    featured: false,
  },
  {
    id: 'signature',
    name: 'Signature',
    monthlyPriceUsd: 399,
    positioning: 'Expanded, personalized care.',
    features: [
      'Everything in Essentials',
      'Expanded personalized care plan',
      'Broader eligible treatment access',
      'Enhanced wellness support',
      'Scheduled follow-up care',
    ],
    featured: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    monthlyPriceUsd: 799,
    positioning: 'Our highest-touch, clinician-guided experience.',
    features: [
      'Everything in Signature',
      'Broadest eligible service access',
      'Advanced testing & support where available',
      'Priority care coordination',
      'Priority, high-touch experience',
    ],
    featured: false,
  },
];

export function formatMonthly(usd: number): string {
  return `$${usd.toLocaleString('en-US')}/month`;
}

export function getMembershipTier(id: string | undefined): MembershipTier | undefined {
  return membershipTiers.find((t) => t.id === id);
}

/** Trust points published alongside the membership tiers. */
export const trustPoints = [
  { title: 'Licensed clinicians', copy: 'Every plan is reviewed by a licensed provider.', icon: 'medkit-outline' },
  { title: 'Licensed pharmacies', copy: 'Prescriptions prepared by licensed U.S. pharmacies.', icon: 'flask-outline' },
  { title: 'Private by design', copy: 'Your health information is protected and confidential.', icon: 'lock-closed-outline' },
  { title: 'Discreet delivery', copy: 'Unbranded packaging, delivered to your door.', icon: 'cube-outline' },
] as const;
