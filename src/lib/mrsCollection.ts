export type MrsExperience = {
  slug: "mrs-jones" | "mrs-golden" | "mrs-robinson";
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  priorities: string[];
};

export const mrsExperiences: MrsExperience[] = [
  {
    slug: "mrs-jones",
    name: "Mrs. Jones",
    eyebrow: "Everybody notices. Nobody needs to know.",
    tagline: "There’s something about Mrs. Jones.",
    description: "A discreet, whole-woman wellness experience created with special awareness of concerns that are often overlooked in women with melanin-rich skin.",
    image: "/images/mrs-collection/mrs-jones.png",
    imageAlt: "Three confident Black women of different ages in elegant black, purple and gold attire.",
    priorities: ["Hormonal and metabolic health", "Weight-management goals", "Energy, sleep, stress, and intimacy", "Hair, scalp, and melanin-conscious skincare", "Healthy aging and ongoing wellness support", "Clinician-recommended labs and treatment, when appropriate"],
  },
  {
    slug: "mrs-golden",
    name: "Mrs. Golden",
    eyebrow: "They’ll call it luck. We’ll know better.",
    tagline: "Her beauty lives between the lines. Her care should too.",
    description: "A radiant, multicultural wellness experience for women who want greater balance, energy, confidence, and support through every stage of change.",
    image: "/images/mrs-collection/mrs-golden.png",
    imageAlt: "Four women from different cultural backgrounds in elegant black, purple and champagne attire.",
    priorities: ["Hormonal balance", "Weight and body-composition goals", "Energy, sleep, and stress", "Skin, hair, and scalp wellness", "Intimate wellness", "Nutrition and healthy-aging support", "Clinician-recommended labs and treatment, when appropriate"],
  },
  {
    slug: "mrs-robinson",
    name: "Mrs. Robinson",
    eyebrow: "Let them wonder.",
    tagline: "There’s more to Mrs. Robinson than meets the eye.",
    description: "A sophisticated renewal and longevity experience designed around hormonal transitions, changing skin, metabolic health, and the strength required for the years ahead.",
    image: "/images/mrs-collection/mrs-robinson.png",
    imageAlt: "Three confident women in midlife and beyond wearing elegant black and deep purple attire.",
    priorities: ["Perimenopause and menopause support", "Weight and metabolic health", "Bone, muscle, and heart-health considerations", "Sleep, energy, and intimate wellness", "Hair and age-supportive skincare", "Long-term wellness planning", "Clinician-recommended labs and treatment, when appropriate"],
  },
];

export const collectionDisclaimer = "The Mrs. Collection is available to adult women of every background. Services, testing, prescriptions, and treatment eligibility are determined by an independent licensed healthcare professional.";
