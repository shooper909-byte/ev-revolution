export const earlyAccessSuccess = "Thank you for joining the Eve’s Sisters early-access list. We'll share updates as our inclusive care services develop.";

export const marketingConsent = "I agree to receive Eve’s Sisters early-access and marketing emails. I can unsubscribe at any time.";
export const consentVersion = "inclusive-care-2026-10-19";

export const serviceInterests = ["Feminizing Care", "Masculinizing Care", "Nonbinary Care", "LGBTQ+ Wellness", "General Updates"] as const;
export const stateCodes = "AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY AS GU MP PR VI".split(" ");

export const affirmingServices = [
  { id: "feminizing-care", title: "Feminizing Hormone Care", short: "Feminizing Care", symbol: "♀", position: "16%", description: "A thoughtful approach to feminizing care, shaped around your goals and whole-person wellbeing.", benefits: ["Estradiol-based hormone therapy", "Testosterone suppression when appropriate", "Hormone monitoring", "Personalized treatment planning", "Ongoing clinical follow-up"] },
  { id: "masculinizing-care", title: "Masculinizing Hormone Care", short: "Masculinizing Care", symbol: "♂", position: "68%", description: "Individualized support for your goals, with a future care plan guided by an independent clinician.", benefits: ["Clinician-directed testosterone therapy", "Hormone and laboratory monitoring", "Personalized treatment goals", "Ongoing follow-up", "Long-term wellness support"] },
  { id: "nonbinary-care", title: "Nonbinary & Individualized Care", short: "Nonbinary Care", symbol: "⚧", position: "94%", description: "Room for your own definition of wellbeing. An individualized approach without a one-size-fits-all path.", benefits: ["Personalized hormone consultations", "Individualized treatment approaches", "Gender-diverse wellness support", "Fertility and reproductive-health discussions", "Long-term care planning"] },
  { id: "lgbtq-wellness", title: "LGBTQ+ Whole-Person Wellness", short: "LGBTQ+ Wellness", symbol: "♡", position: "42%", description: "A broader vision of wellbeing that makes space for your physical, emotional, and everyday health.", benefits: ["Sexual-health consultations", "STI screening and prevention", "HIV PrEP evaluation", "Mental-health support and referrals", "Hair and skin health", "Weight management and preventive wellness"] },
] as const;

export const affirmingPackages = [
  { name: "Eve Affirm", tier: "Essentials", price: 129, benefits: ["Initial consultation coordination", "Personalized care planning", "Routine follow-up support", "Medication eligibility review", "Membership assistance"] },
  { name: "Eve Transform", tier: "Signature", price: 229, benefits: ["Essentials benefits", "Ongoing clinician follow-up coordination", "Laboratory-result review", "Treatment-plan adjustment appointments", "Expanded wellness support", "Priority nonclinical messaging"] },
  { name: "Eve Evolve", tier: "Elite", price: 349, benefits: ["Signature benefits", "Comprehensive care coordination", "Sexual-health and wellness support", "Skin and hair consultation coordination", "Priority scheduling", "Expanded ongoing support"] },
] as const;
