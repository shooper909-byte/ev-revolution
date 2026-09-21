export type MrsExperience = {
  slug: "mrs-jones" | "mrs-golden" | "mrs-robinson";
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  priorities: string[];
  addOns: { name: string; price: string; description: string }[];
};

export const mrsExperiences: MrsExperience[] = [
  {
    slug: "mrs-jones",
    name: "Mrs. Jones",
    eyebrow: "Everybody notices. Nobody needs to know.",
    tagline: "There’s something about Mrs. Jones.",
    description: "Personalized care for changing hormones, persistent symptoms, skin concerns, heart health, and the parts of womanhood that are too often overlooked.",
    image: "/images/mrs-collection/mrs-jones.png",
    imageAlt: "Three confident Black women of different ages in elegant black, purple and gold attire.",
    priorities: ["Hormonal and metabolic health", "Weight-management goals", "Energy, sleep, stress, and intimacy", "Hair, scalp, and melanin-conscious skincare", "Healthy aging and ongoing wellness support", "Clinician-recommended labs and treatment, when appropriate"],
    addOns: [
      { name: "Flow & Fibroid Check", price: "$59/month", description: "Heavy-bleeding and anemia work-up, imaging-referral coordination, and an iron plan." },
      { name: "Even Tone Skin", price: "$79/month", description: "A dark-spot and melasma regimen with prescription topicals and sunscreen guidance." },
      { name: "Heart & Pressure", price: "$59/month", description: "A home blood-pressure kit, lipid and A1c tracking, and vitamin D testing." },
    ],
  },
  {
    slug: "mrs-golden",
    name: "Mrs. Golden",
    eyebrow: "They’ll call it luck. We’ll know better.",
    tagline: "Her beauty lives between the lines. Her care should too.",
    description: "Care that starts with your whole story—not an average. Your plan considers your results, risks, goals, hormones, metabolism, and skin concerns together.",
    image: "/images/mrs-collection/mrs-golden.png",
    imageAlt: "Four women from different cultural backgrounds in elegant black, purple and champagne attire.",
    priorities: ["Hormonal balance", "Weight and body-composition goals", "Energy, sleep, and stress", "Skin, hair, and scalp wellness", "Intimate wellness", "Nutrition and healthy-aging support", "Clinician-recommended labs and treatment, when appropriate"],
    addOns: [
      { name: "Metabolic Shield", price: "$69/month", description: "Early A1c, cholesterol, triglyceride, and liver panels reviewed against the member’s individual risk profile, plus nutrition guidance." },
      { name: "Even Tone Skin", price: "$79/month", description: "A dark-spot and melasma regimen with prescription topicals and sunscreen guidance." },
      { name: "PCOS Path", price: "$79/month", description: "A symptom and hormone work-up, metabolic labs, and a personalized treatment plan." },
    ],
  },
  {
    slug: "mrs-robinson",
    name: "Mrs. Robinson",
    eyebrow: "Let them wonder.",
    tagline: "There’s more to Mrs. Robinson than meets the eye.",
    description: "Support for bone strength, changing skin, metabolic health, and a smoother menopause transition—with a plan designed for the years ahead.",
    image: "/images/mrs-collection/mrs-robinson.png",
    imageAlt: "Three confident women in midlife and beyond wearing elegant black and deep purple attire.",
    priorities: ["Perimenopause and menopause support", "Weight and metabolic health", "Bone, muscle, and heart-health considerations", "Sleep, energy, and intimate wellness", "Hair and age-supportive skincare", "Long-term wellness planning", "Clinician-recommended labs and treatment, when appropriate"],
    addOns: [
      { name: "Bone Strong", price: "$59/month", description: "A bone-health risk review, bone-density scan coordination, and a calcium and vitamin D plan." },
      { name: "Radiance Rx", price: "$79/month", description: "A sun-damage and age-supportive skincare regimen with prescription retinoids and sunscreen guidance." },
      { name: "Skin Check", price: "$49/month", description: "Photo-based skin-check triage, dermatology-referral guidance, and yearly reminders." },
    ],
  },
];

export const collectionDisclaimer = "The Mrs. Collection is available to adult women of every background. Services, testing, prescriptions, and treatment eligibility are determined by an independent licensed healthcare professional.";

export const clinicalDisclaimer = "Eve’s Sisters clinical services are provided through licensed healthcare professionals using telehealth. Evaluation does not guarantee treatment. Prescriptions, laboratory testing, and weight-management medication are provided only when clinically appropriate and at the treating clinician’s discretion. Elite includes eligible weight-management medication only when prescribed. Signature medication costs are billed separately. Prices are monthly and subject to change. Results vary. This service is not for emergencies; call 911 for emergency assistance.";
