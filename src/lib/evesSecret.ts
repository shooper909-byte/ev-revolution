export const tiers = [
  { id: "ember", name: "The Ember", price: 149, cadence: "month", tagline: "Where it starts", badge: null, prepay: { months: 10, total: 1490, label: "10 months for 12" }, features: [
    "Intimacy intake with a sexual-health clinician", "Validated desire screening (DSDS + FSFI), rescored quarterly", "Medication audit — SSRIs, oral contraceptives, beta-blockers", "Hormone panel: total T, SHBG, free T, estradiol, FSH, prolactin, TSH, ferritin, CBC", "Included Rx: low-dose vaginal estrogen or vaginal DHEA", "Comfort kit, resupplied quarterly", "Secure messaging",
  ] },
  { id: "flame", name: "The Flame", price: 299, cadence: "month", tagline: "Most chosen", badge: "Most chosen", prepay: { months: 10, total: 2990, label: "10 months for 12" }, features: [
    "Everything in The Ember", "Monthly clinician visits", "Desire Rx pathway — Addyi, Vyleesi, or off-label systemic testosterone", "Full GSM protocol: vaginal estrogen and DHEA, ospemifene option", "Arousal support cream (adjunct — evidence is limited, stated plainly)", "Beauty Rx: tretinoin, tinted iron-oxide SPF, phototype-matched tone regimen", "2 sessions/yr with an AASECT-certified sex therapist", "Pelvic floor PT referral and coordination",
  ] },
  { id: "wildfire", name: "The Wildfire", price: 549, cadence: "month", tagline: "Everything, all of it", badge: null, prepay: null, features: [
    "Everything in The Flame", "Concierge clinician access, same-day response window", "Full beauty Rx: hydroquinone cycling, lash serum, spironolactone, minoxidil, azelaic acid", "Quarterly advanced panel: hormones, lipids, A1c, vitamin D, iron studies", "Annual 90-minute reset and regimen rebuild", "4 coaching sessions/yr, partner session included", "20% off all Eve’s Secret products and add-ons",
  ] },
] as const;
