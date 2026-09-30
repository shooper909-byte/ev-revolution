export type LaunchPlan = {
  id: string;
  title: string;
  monthly: string;
  prepaid: string;
  description: string;
  includes: string[];
  treatment?: { label: string; body: string };
  featured?: boolean;
  badge?: string;
};

export type LaunchBundle = {
  id: string;
  title: string;
  label: string;
  body: string;
  semaglutidePrice?: string;
  tirzepatidePrice?: string;
  price?: string;
  includes: string[];
  featured?: boolean;
};

export type PreScreenQuestion = {
  id: string;
  prompt: string;
};

export type LaunchCareCategory = {
  slug: string;
  path: string;
  label: string;
  eyebrow: string;
  headline: string;
  highlightedHeadline: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  gallery?: { image: string; alt: string }[];
  whoItsFor: string[];
  plans: LaunchPlan[];
  addOns?: { name: string; price: string }[];
  bundles?: LaunchBundle[];
  relatedCare?: { label: string; href: string; body: string };
  waitlist?: { name: string; body: string }[];
  preScreen: {
    questions: PreScreenQuestion[];
    extraNote?: string;
  };
  labNote?: string;
  faq: [string, string][];
  /**
   * Set while none of the category's plans is confirmed available by the
   * pharmacy partner (see `src/lib/treatments.ts`). Plans stay visible with
   * their pricing, but every call to action goes to an email-only waitlist and
   * no treatment request or payment is offered.
   */
  availabilityPending?: string;
};

export type LaunchRequestOption = {
  id: string;
  title: string;
  kind: "plan" | "bundle";
};

const pregnancyQuestion: PreScreenQuestion = {
  id: "pregnancy",
  prompt: "Are you pregnant, breastfeeding, or planning a pregnancy?",
};

const standardFaqs: [string, string][] = [
  [
    "What happens after I request a treatment?",
    "After the short pre-screen, we collect only the contact details needed to send your secure clinical-assessment link. A licensed clinician reviews your completed intake and decides whether treatment is appropriate.",
  ],
  [
    "Will I be approved?",
    "No treatment or prescription is guaranteed. Eligibility depends on your medical history, current medications, state availability and the independent clinician’s evaluation.",
  ],
  [
    "When will I be charged?",
    "Your request and pre-screen do not charge you. Payment authorization and any renewal details are presented in the secure enrollment flow after the clinical pathway is confirmed.",
  ],
  [
    "Can I cancel?",
    "Cancellation and refund terms are shown before any payment authorization. If you are not approved, you are not charged for a treatment plan.",
  ],
  [
    "Are services available in every state?",
    "Services vary by state. The secure clinical intake confirms whether the requested program is available where you live and whether a live visit is required.",
  ],
];

export const launchCareCategories: LaunchCareCategory[] = [
  {
    slug: "weight-management",
    path: "/care/weight-management",
    label: "Weight Management",
    eyebrow: "Weight Management",
    headline: "Weight care that respects",
    highlightedHeadline: "your whole life.",
    intro:
      "For women whose weight has changed, stalled, or stopped responding to what used to work. Explore clinician-guided options without promises, pressure, or judgment.",
    heroImage: "/images/care/care-weight-management.webp",
    heroAlt:
      "A woman in a black evening gown standing confidently with one hand on her hip.",
    gallery: [
      { image: "/images/care/care-weight-management-glp1.png", alt: "Weight-care presentation with a measuring tape in the Eve’s Sisters palette." },
    ],
    whoItsFor: [
      "Weight that stopped responding to what used to work",
      "A goal to maintain results after a period of weight change",
      "Interest in discussing a GLP-1 pathway with a licensed clinician",
      "A desire for a discreet, clinician-guided monthly plan",
    ],
    plans: [
      {
        id: "semaglutide",
        title: "Compounded semaglutide",
        monthly: "$199 / month",
        prepaid: "$537 prepaid for 3 months ($179 / month)",
        description:
          "A clinician-guided weekly injection pathway, if prescribed after evaluation.",
        includes: [
          "Medication if prescribed",
          "Asynchronous provider review",
          "Supplies and discreet shipping",
          "Secure care-team messaging",
        ],
        treatment: {
          label: "Clinical pathway",
          body: "The provider determines dose, suitability and follow-up after reviewing your secure intake.",
        },
      },
      {
        id: "tirzepatide",
        title: "Compounded tirzepatide",
        monthly: "$279 / month",
        prepaid: "$747 prepaid for 3 months ($249 / month)",
        description:
          "A clinician-guided weekly injection pathway with the same published price at every dose, if prescribed.",
        includes: [
          "Medication if prescribed",
          "Asynchronous provider review",
          "Supplies and discreet shipping",
          "Secure care-team messaging",
        ],
        featured: true,
        badge: "Most requested",
        treatment: {
          label: "Clinical pathway",
          body: "A licensed clinician decides whether this option is appropriate and sets the treatment plan.",
        },
      },
      {
        id: "semaglutide-maintenance",
        title: "Compounded semaglutide maintenance",
        monthly: "$149 / month",
        prepaid: "$402 prepaid for 3 months ($134 / month)",
        description:
          "A lower-dose semaglutide pathway for clinician-guided maintenance after goal weight, if prescribed.",
        includes: [
          "Medication if prescribed",
          "Asynchronous provider review",
          "Supplies and discreet shipping",
          "Secure care-team messaging",
        ],
      },
      {
        id: "tirzepatide-maintenance",
        title: "Compounded tirzepatide maintenance",
        monthly: "$179 / month",
        prepaid: "$483 prepaid for 3 months ($161 / month)",
        description:
          "A lower-dose tirzepatide pathway for clinician-guided maintenance, if prescribed.",
        includes: [
          "Medication if prescribed",
          "Asynchronous provider review",
          "Supplies and discreet shipping",
          "Secure care-team messaging",
        ],
      },
    ],
    addOns: [
      { name: "MIC-B12", price: "$89" },
      { name: "Eve’s Secret troche", price: "$69" },
      { name: "NAD+ nasal spray", price: "$99" },
    ],
    bundles: [
      {
        id: "signature-bundle",
        title: "Signature",
        label: "Most Popular",
        body: "GLP-1 pathway plus one selected add-on: Eve’s Secret troche or tretinoin.",
        semaglutidePrice: "$249 / month",
        tirzepatidePrice: "$329 / month",
        includes: ["One multi-service provider review", "One coordinated shipment", "One selected add-on"],
        featured: true,
      },
      {
        id: "elite-bundle",
        title: "Elite",
        label: "More complete care",
        body: "GLP-1 pathway plus Eve’s Secret troche and NAD+ nasal spray.",
        semaglutidePrice: "$379 / month",
        tirzepatidePrice: "$449 / month",
        includes: ["One multi-service provider review", "One coordinated shipment", "Two selected add-ons"],
      },
    ],
    preScreen: {
      questions: [
        pregnancyQuestion,
        { id: "thyroid", prompt: "Do you have a personal or family history of medullary thyroid cancer or MEN2?" },
        { id: "pancreatitis", prompt: "Have you had pancreatitis?" },
        { id: "type-one-diabetes", prompt: "Do you have type 1 diabetes?" },
        { id: "other-glp-one", prompt: "Are you currently taking another GLP-1 medication?" },
      ],
      extraNote: "The secure intake may request your current weight and height, a full-body photo and identification.",
    },
    faq: [
      [
        "Is this the same as a brand-name medication?",
        "No comparison or substitution is promised. If a compounded medication is prescribed, it is not FDA-approved and is not presented as interchangeable with any brand-name medication.",
      ],
      [
        "Will I need a live video visit?",
        "Usually, provider review is asynchronous. A provider may request a video visit, and certain states may require one.",
      ],
      ...standardFaqs,
    ],
  },
  {
    slug: "hormones-menopause",
    path: "/care/hormones-menopause",
    label: "Menopause & Hormones",
    eyebrow: "Menopause & Hormones",
    headline: "Care for the shifts",
    highlightedHeadline: "no one prepared you for.",
    intro:
      "Explore symptom-focused hormone-care options for perimenopause, menopause and intimate comfort. A clinician decides what is appropriate for you.",
    heroImage: "/images/care/care-menopause-hormones.webp",
    heroAlt:
      "A woman with silver-streaked hair looking upward in warm, low light.",
    whoItsFor: [
      "Hot flashes, night sweats or sleep changes",
      "Mood, focus, skin or body changes through midlife",
      "Vaginal dryness or intimate discomfort",
      "A desire to discuss hormone-care options with a clinician",
    ],
    plans: [
      {
        id: "oral-hrt",
        title: "Oral HRT",
        monthly: "$129 / month",
        prepaid: "$348 prepaid for 3 months ($116 / month)",
        description:
          "An estradiol-capsule and progesterone pathway, if prescribed after a clinician evaluation.",
        includes: ["Medication if prescribed", "Asynchronous provider review", "Discreet shipping", "Secure care-team messaging"],
      },
      {
        id: "patch-hrt",
        title: "Patch HRT",
        monthly: "$159 / month",
        prepaid: "$429 prepaid for 3 months ($143 / month)",
        description:
          "An estradiol-patch and progesterone pathway, if prescribed after a clinician evaluation.",
        includes: ["Medication if prescribed", "Asynchronous provider review", "Discreet shipping", "Secure care-team messaging"],
        featured: true,
        badge: "Most requested",
      },
      {
        id: "cream-hrt",
        title: "Cream HRT",
        monthly: "$139 / month",
        prepaid: "$375 prepaid for 3 months ($125 / month)",
        description:
          "A BIEST (20:80) cream and progesterone pathway, if prescribed after a clinician evaluation.",
        includes: ["Medication if prescribed", "Asynchronous provider review", "Discreet shipping", "Secure care-team messaging"],
      },
      {
        id: "vaginal-comfort",
        title: "Vaginal Comfort",
        monthly: "$69 / month",
        prepaid: "$186 prepaid for 3 months ($62 / month)",
        description:
          "An estradiol-vaginal-insert pathway for intimate comfort, if prescribed.",
        includes: ["Medication if prescribed", "Asynchronous provider review", "Discreet shipping", "Secure care-team messaging"],
      },
    ],
    addOns: [
      { name: "Eve’s Secret troche", price: "$69" },
      { name: "Vaginal estradiol with another HRT plan", price: "$59" },
    ],
    bundles: [
      {
        id: "hormone-signature-bundle",
        title: "Hormone Signature",
        label: "Coordinated care",
        body: "Oral HRT plus an Eve’s Secret troche, when each is clinically appropriate.",
        price: "$179 / month",
        includes: ["One multi-service provider review", "One coordinated shipment", "Secure care-team messaging"],
      },
    ],
    preScreen: {
      questions: [
        pregnancyQuestion,
        { id: "cancer", prompt: "Do you have a history of breast or uterine cancer?" },
        { id: "clot-stroke", prompt: "Have you had a blood clot or stroke?" },
        { id: "bleeding", prompt: "Do you have unexplained vaginal bleeding?" },
        { id: "liver", prompt: "Do you have active liver disease?" },
      ],
      extraNote: "The secure intake may request cycle history and a symptom checklist. A hormone panel may be required before treatment.",
    },
    labNote: "A hormone panel may be required before treatment. If required, it is quoted separately.",
    faq: [
      [
        "Do these plans include testosterone?",
        "No. Testosterone and other controlled substances are not offered on this site.",
      ],
      [
        "Can I get a patch in every state?",
        "State availability varies. Current program limitations are confirmed during the secure clinical intake.",
      ],
      ...standardFaqs,
    ],
  },
  {
    slug: "skin-beauty",
    path: "/care/skin-beauty",
    label: "Skin & Beauty",
    eyebrow: "Skin & Beauty",
    headline: "Your skin deserves care",
    highlightedHeadline: "that feels like you.",
    intro:
      "Clinician-guided skin-care options for women who want an intentional routine, without overpromising a result.",
    heroImage: "/images/care/care-skin-beauty-v3.webp",
    heroAlt: "A woman with luminous skin in warm low light, her hand at her neck.",
    whoItsFor: [
      "A simple, consistent skin-care plan",
      "Texture, tone or appearance concerns you want to discuss",
      "Interest in prescription-strength skin care, if appropriate",
      "A routine designed around your skin and your stage of life",
    ],
    plans: [
      {
        id: "tretinoin",
        title: "Tretinoin",
        monthly: "$79 / month",
        prepaid: "$213 prepaid for 3 months ($71 / month)",
        description: "Tretinoin cream 0.02% or gel 0.01%, if prescribed after review.",
        includes: ["Medication if prescribed", "Asynchronous provider review", "Discreet shipping", "Secure care-team messaging"],
      },
    ],
    addOns: [
      { name: "Tretinoin with another plan", price: "$59" },
    ],
    preScreen: {
      questions: [pregnancyQuestion],
      extraNote: "The secure intake may request front and side face photos so the clinician can review your concern.",
    },
    faq: [
      [
        "Are these products guaranteed to change my skin?",
        "No. Skin response, suitability and treatment recommendations vary. A clinician determines whether any medication is appropriate for you.",
      ],
      ...standardFaqs,
    ],
  },
  {
    slug: "energy-performance",
    path: "/care/energy-performance",
    label: "Energy & Performance",
    eyebrow: "Energy & Performance",
    headline: "Energy support for the life",
    highlightedHeadline: "you are building.",
    intro:
      "Explore clinician-guided energy-support options with clear boundaries: no disease claims, no anti-aging promises, just an option to request an evaluation.",
    heroImage: "/images/energy/energy-hero.webp",
    heroAlt: "An adult woman taking a calm morning walk through a city park.",
    gallery: [
      { image: "/images/energy/movement-recovery.webp", alt: "A woman stretching gently at home." },
      { image: "/images/home/review-your-options.webp", alt: "Illustrative telehealth conversation between a woman and a clinician." },
    ],
    whoItsFor: [
      "A desire for more support around everyday energy",
      "A clinician-guided approach to performance and recovery",
      "Interest in an NAD+ or MIC-B12 pathway, if appropriate",
      "A simpler way to request a private clinical review",
    ],
    plans: [
      {
        id: "nad-injection",
        title: "NAD+ Injection",
        monthly: "$169 / month",
        prepaid: "$456 prepaid for 3 months ($152 / month)",
        description: "NAD+ 100 mg/mL, three vials and two shipments, if prescribed.",
        includes: ["Medication if prescribed", "Asynchronous provider review", "Supplies and discreet shipping", "Secure care-team messaging"],
      },
      {
        id: "nad-nasal-spray",
        title: "NAD+ Nasal Spray",
        monthly: "$129 / month",
        prepaid: "$348 prepaid for 3 months ($116 / month)",
        description: "NAD+ 300 mg/mL nasal spray, if prescribed after clinician review.",
        includes: ["Medication if prescribed", "Asynchronous provider review", "Discreet shipping", "Secure care-team messaging"],
        featured: true,
        badge: "Easy add-on",
      },
      {
        id: "mic-b12",
        title: "MIC-B12",
        monthly: "$119 / month",
        prepaid: "$321 prepaid for 3 months ($107 / month)",
        description: "Methionine, inositol, choline and B12 injection pathway, if prescribed.",
        includes: ["Medication if prescribed", "Asynchronous provider review", "Supplies and discreet shipping", "Secure care-team messaging"],
      },
    ],
    preScreen: { questions: [pregnancyQuestion] },
    faq: [
      [
        "Do these plans treat fatigue or a medical condition?",
        "No. These are clinician-guided energy-support pathways, not a diagnosis or a cure. New, severe or worsening symptoms need appropriate medical care.",
      ],
      ...standardFaqs,
    ],
  },
  {
    slug: "recovery-rejuvenation",
    path: "/care/recovery-rejuvenation",
    label: "Recovery & Rejuvenation",
    eyebrow: "Recovery & Rejuvenation",
    headline: "Give your recovery",
    highlightedHeadline: "a little more room.",
    intro:
      "A clinician-guided glutathione pathway for women seeking a measured approach to recovery and rejuvenation support.",
    heroImage: "/images/recovery/recovery-hero-banner-v2.webp",
    heroAlt: "Women of different ages relaxing together outdoors in soft, warm light.",
    whoItsFor: [
      "A desire to prioritize recovery within a clinician-guided plan",
      "Interest in glutathione support, if a provider finds it appropriate",
      "A calmer, more intentional wellness routine",
      "A private request flow with no purchase before approval",
    ],
    plans: [
      {
        id: "glutathione",
        title: "Glutathione",
        monthly: "$119 / month",
        prepaid: "$321 prepaid for 3 months ($107 / month)",
        description: "Glutathione 200 mg/mL injection pathway with three vials, if prescribed.",
        includes: ["Medication if prescribed", "Asynchronous provider review", "Supplies and discreet shipping", "Secure care-team messaging"],
        featured: true,
        badge: "Recovery support",
      },
    ],
    waitlist: [
      { name: "BPC-157", body: "Join the waitlist. No price, purchase or prescription request is offered at this time." },
      { name: "TB-500", body: "Join the waitlist. No price, purchase or prescription request is offered at this time." },
      { name: "MOTS-C", body: "Join the waitlist. No price, purchase or prescription request is offered at this time." },
      { name: "Wolverine", body: "Join the waitlist. No price, purchase or prescription request is offered at this time." },
      { name: "Glow", body: "Join the waitlist. No price, purchase or prescription request is offered at this time." },
    ],
    relatedCare: {
      label: "Explore Energy & Performance",
      href: "/care/energy-performance",
      body: "NAD+ options are available on the Energy & Performance page, where a clinician can evaluate which pathway may be appropriate.",
    },
    preScreen: { questions: [pregnancyQuestion] },
    faq: [
      [
        "Are the waitlist items available now?",
        "No. Waitlist items are not available for purchase or request until the clinical partner confirms a lawful, supportable pathway in writing.",
      ],
      ...standardFaqs,
    ],
  },
  {
    slug: "longevity-healthspan",
    path: "/care/longevity-healthspan",
    label: "Longevity & Healthspan",
    eyebrow: "Longevity & Healthspan",
    headline: "Support for the years",
    highlightedHeadline: "you are still becoming.",
    intro:
      "Explore clinician-guided options focused on healthspan and the capacity to keep showing up for the life you want. No anti-aging or disease-cure claims.",
    heroImage: "/images/longevity/longevity-hero.webp",
    heroAlt: "An active older woman enjoying a walk outside at golden hour.",
    gallery: [
      { image: "/images/mrs-collection/mrs-golden.png", alt: "Women of different backgrounds sharing a moment together." },
      { image: "/images/home/review-your-options.webp", alt: "Illustrative telehealth conversation between a woman and a clinician." },
    ],
    whoItsFor: [
      "A thoughtful approach to long-term health habits",
      "Interest in a clinician-guided peptide pathway, if appropriate",
      "A desire for structured check-ins and clear next steps",
      "A preference for realistic, individual care over big promises",
    ],
    plans: [
      {
        id: "sermorelin",
        title: "Sermorelin",
        monthly: "$179 / month",
        prepaid: "$483 prepaid for 3 months ($161 / month)",
        description: "Sermorelin 3 mg/mL, three-vial pathway, if prescribed after a clinician evaluation.",
        includes: ["Medication if prescribed", "Asynchronous provider review", "Discreet shipping", "Secure care-team messaging"],
      },
      {
        id: "tesamorelin",
        title: "Tesamorelin",
        monthly: "$179 / month",
        prepaid: "$483 prepaid for 3 months ($161 / month)",
        description: "Tesamorelin 2 mg/mL, three-vial pathway, if prescribed after a clinician evaluation.",
        includes: ["Medication if prescribed", "Asynchronous provider review", "Discreet shipping", "Secure care-team messaging"],
        featured: true,
        badge: "Clinician-guided",
      },
    ],
    addOns: [{ name: "Baseline or 90-day check-in panel", price: "$149" }],
    preScreen: {
      questions: [
        pregnancyQuestion,
        { id: "cancer-treatment", prompt: "Are you in active cancer treatment or do you have active cancer?" },
      ],
    },
    labNote: "A baseline or 90-day Peptide Panel 2 may be offered as a $149 add-on when clinically appropriate.",
    availabilityPending:
      "Sermorelin, Tesamorelin and the Peptide Panel 2 add-on are listed in our pharmacy partner’s current catalog, but their availability has not yet been confirmed. They cannot be requested, prescribed or purchased yet.",
    faq: [
      [
        "Are these treatments available now?",
        "Not yet. Each option is listed in our pharmacy partner’s current catalog, but availability is pending written confirmation. Join the availability waitlist for an email update; no request, prescription or payment is taken in the meantime.",
      ],
      [
        "Do these plans promise anti-aging or disease prevention?",
        "No. They are individual clinician-guided pathways. They are not promises of anti-aging, disease prevention or a specific health outcome.",
      ],
      // Only the standard answers that hold while enrollment is not open.
      ...standardFaqs.filter(([question]) => question === "Will I be approved?" || question === "Are services available in every state?"),
    ],
  },
  {
    slug: "eves-secret",
    path: "/eves-secret",
    label: "Eve’s Secret™",
    eyebrow: "Eve’s Secret™",
    headline: "Private care for the parts",
    highlightedHeadline: "you should never have to hide.",
    intro:
      "A discreet, adult-facing care pathway for desire and intimacy concerns. You decide what to ask about; a licensed clinician decides what is appropriate.",
    heroImage: "/images/eves-secret-hero.png",
    heroAlt: "Four women featured in the Eve’s Secret campaign.",
    gallery: [
      { image: "/images/eves-secret/addon-even-tone.webp", alt: "Woman in a plum satin blouse smiling softly." },
      { image: "/images/eves-secret/addon-radiance-rx.webp", alt: "Woman resting her chin on her hand." },
      { image: "/images/eves-secret/addon-lash-brow.webp", alt: "Portrait of a woman with long dark hair." },
      { image: "/images/eves-secret/addon-crown.webp", alt: "Woman with curly hair and gold earrings." },
      { image: "/images/eves-secret/addon-afterglow.webp", alt: "Woman in a plum satin robe." },
      { image: "/images/eves-secret/addon-together.webp", alt: "A couple leaning toward each other." },
    ],
    whoItsFor: [
      "Changes in desire you want to discuss privately",
      "Questions about intimate comfort or sexual wellness",
      "A preference for an adult, discreet request experience",
      "A clinician-guided pathway without performance guarantees",
    ],
    plans: [
      {
        id: "sexual-wellness-consultation",
        title: "Sexual wellness consultation",
        monthly: "$89",
        prepaid: "No prepaid medication plan",
        description: "A private clinician consultation. Any medication recommended after evaluation is quoted separately and charged only after approval and consent.",
        includes: ["Licensed-provider consultation", "Personalized care recommendations", "Secure care-team messaging"],
      },
    ],
    preScreen: {
      questions: [
        pregnancyQuestion,
        { id: "nitrates", prompt: "Are you taking nitrate medication?" },
        { id: "recent-heart-event", prompt: "Have you had a heart attack or stroke in the last six months?" },
        { id: "blood-pressure", prompt: "Do you have uncontrolled blood pressure?" },
      ],
    },
    faq: [
      [
        "Will this guarantee sexual performance or desire?",
        "No. Eve’s Secret does not make performance guarantees. A clinician evaluates your individual history and may recommend a different approach or no prescription treatment.",
      ],
      ...standardFaqs,
    ],
  },
];

export const launchCareBySlug = Object.fromEntries(
  launchCareCategories.map((category) => [category.slug, category]),
) as Record<string, LaunchCareCategory>;

export const activeLaunchCareSlugs = [
  "weight-management",
  "hormones-menopause",
  "skin-beauty",
  "eves-secret",
] as const;

export const activeLaunchCareCategories = launchCareCategories.filter((category) =>
  activeLaunchCareSlugs.includes(category.slug as (typeof activeLaunchCareSlugs)[number]),
);

export function getLaunchCareCategory(slug: unknown) {
  return typeof slug === "string" && activeLaunchCareSlugs.includes(slug as (typeof activeLaunchCareSlugs)[number])
    ? launchCareBySlug[slug]
    : undefined;
}

export function requireLaunchCareCategory(slug: string): LaunchCareCategory {
  const category = getLaunchCareCategory(slug);
  if (!category) throw new Error(`Launch care configuration is missing for ${slug}.`);
  return category;
}

export function getLaunchCareRequestOption(
  category: LaunchCareCategory,
  optionId: unknown,
): LaunchRequestOption | undefined {
  if (typeof optionId !== "string") return undefined;

  const plan = category.plans.find((item) => item.id === optionId);
  if (plan) return { id: plan.id, title: plan.title, kind: "plan" };

  const bundle = category.bundles?.find((item) => item.id === optionId);
  if (bundle) return { id: bundle.id, title: bundle.title, kind: "bundle" };

  return undefined;
}
