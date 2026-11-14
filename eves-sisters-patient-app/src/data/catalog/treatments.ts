// GENERATED from the live telehealth catalog (see ./source.ts) — copy is verbatim.
// Regenerate rather than hand-editing wording; structural types live in ./types.ts.
import type { TreatmentCategory, Treatment } from "./types";

export const treatmentCategories: TreatmentCategory[] = [
  {"slug":"weight-management","name":"Weight Management","short":"Weight","promise":"Metabolic care that understands a woman’s body changes — and changes with it.","intro":"Provider-supervised programs that pair modern prescription options with nutrition and movement guidance, designed around your hormones, your history and your life.","experiences":["What used to work no longer does","Shifts in appetite or cravings","Metabolic changes around perimenopause","Wanting a plan with real clinical support"],"clinicalNote":"Prescription weight management requires a clinician evaluation to confirm eligibility. Programs are provider-supervised and used alongside nutrition and activity changes. Individual experiences vary.","kind":"category", image: require("@/assets/images/care/care-weight-management.jpg") },
  {"slug":"hormones-menopause","name":"Hormones & Menopause","short":"Hormones","promise":"Perimenopause, menopause and beyond — met with expertise, not a shrug.","intro":"Hormone and thyroid support guided by clinicians who specialize in the transitions women are too often told to simply endure.","experiences":["Hot flashes or night sweats","Sleep that no longer feels restful","Changes in mood, focus or memory","Irregular or changing cycles","Vaginal dryness or discomfort"],"clinicalNote":"All hormone therapy requires a provider evaluation and lab testing where appropriate. Your clinician will review your health history, discuss benefits and risks, and determine whether treatment is right for you.","kind":"category", image: require("@/assets/images/care/care-menopause-hormones.jpg") },
  {"slug":"skin-beauty","name":"Skin & Beauty","short":"Skin","promise":"Prescription-grade skincare, tailored to your skin — every tone, every texture.","intro":"Clinician-directed topical formulas for concerns like breakouts, fine lines and uneven texture, chosen for your skin type and routine.","experiences":["Fine lines or uneven texture","Adult or hormonal breakouts","Skin that changed with your hormones","Wanting a routine that actually works"],"clinicalNote":"Prescription topicals are dispensed only after a clinician reviews your skin history and goals. Some ingredients increase sun sensitivity and are not appropriate during pregnancy or breastfeeding.","kind":"category", image: require("@/assets/images/care/care-skin-beauty-v3.jpg") },
  {"slug":"hair-health","name":"Hair Health","short":"Hair","promise":"Thinning hair is common. Feeling alone with it doesn’t have to be.","intro":"Oral and topical prescription options, evaluated by a clinician who looks at the full picture — hormones, history and lifestyle.","experiences":["A widening part or thinning crown","More shedding than usual","Hair changes after pregnancy or menopause"],"clinicalNote":"Hair treatments require a clinician evaluation. Some options are not appropriate during pregnancy, while trying to conceive, or while breastfeeding — your clinician will review this with you.","kind":"category", image: require("@/assets/images/care/care-longevity.jpg") },
  {"slug":"longevity-renewal","name":"Longevity & Renewal","short":"Longevity","promise":"Invest in the woman you’re becoming — with a long-term, clinician-guided plan.","intro":"A thoughtful approach to healthy aging that brings together labs, hormone care and clinician-directed wellness and peptide programs — reviewed with you over time.","experiences":["Planning proactively for healthy aging","Wanting to understand my numbers, not guess","Wanting a more intentional wellness routine","Looking for care that follows me over time"],"clinicalNote":"Longevity care begins with a clinician evaluation and labs where appropriate. Programs are prescribed only when medically appropriate, are not intended to diagnose, treat, cure or prevent any disease, and individual experiences vary.","kind":"pathway","includes":["nad-plus","sermorelin","glutathione","nad-plus-nasal-spray","ghk-cu-cream","t3-t4"], image: require("@/assets/images/care/longevity-hero.jpg") },
  {"slug":"energy-vitality","name":"Energy & Vitality","short":"Energy","promise":"Running on empty? Let’s find out why — with a clinician, labs and a plan made for you.","intro":"Low energy can have many causes — hormones, thyroid, nutrition, sleep and stress among them. Your clinician starts with your history and labs, then discusses whether options like thyroid support or a wellness program are appropriate.","experiences":["Feeling depleted by mid-afternoon","Tired even after a full night’s sleep","Brain fog that wasn’t there before","Wanting to understand what’s really going on"],"clinicalNote":"Fatigue has many possible causes and should be evaluated by a licensed clinician. Treatment is prescribed only when medically appropriate. Wellness programs are not intended to diagnose, treat, cure or prevent any disease, and no specific energy outcome is guaranteed.","kind":"pathway","includes":["liothyronine","t3-t4","nad-plus","nad-plus-nasal-spray","mic-b12-lipostat"], image: require("@/assets/images/care/energy-hero.jpg") },
  {"slug":"rest-wellbeing","name":"Rest & Well-Being","short":"Well-Being","promise":"Rest isn’t a luxury. It’s part of your care.","intro":"Clinician-guided wellness programs that may complement a calmer, more restful routine — alongside sleep, movement and nutrition guidance from your care team.","experiences":["Feeling run-down more often","Sleep that doesn’t feel restful","Wanting a calmer, more restful routine"],"clinicalNote":"Wellness programs require a clinician evaluation and are prescribed only when medically appropriate. They are not intended to diagnose, treat, cure or prevent any disease, and individual experiences vary.","kind":"pathway","includes":["glutathione","sermorelin","nad-plus","nad-plus-nasal-spray"], image: require("@/assets/images/care/recovery-hero.jpg") },
  {"slug":"eves-secrets","name":"Eve’s Secrets","short":"Intimate","promise":"Desire, intimacy and pleasure are part of health. Discreetly, beautifully, yours.","intro":"A private, clinician-guided pathway for intimate and sexual wellness — evaluated with care, delivered discreetly.","experiences":["Changes in desire","Arousal that feels different than before","Discomfort that affects intimacy","Wanting a private, judgment-free conversation"],"clinicalNote":"Intimate wellness options require a clinician evaluation to confirm they are medically appropriate for you. Eligibility, audience and use are always clinician-directed.","kind":"category", image: require("@/assets/images/care/care-eves-secret-collection.jpg") },
  {"slug":"peptides","name":"Peptide Therapy","short":"Peptides","promise":"Clinician-directed peptide programs — prescribed only when medically appropriate.","intro":"Peptides are short chains of amino acids. A licensed provider evaluates whether a peptide program is appropriate for you, then oversees your care with follow-up and lab monitoring where needed.","experiences":["Curious whether peptides are right for me","Wanting clinician oversight, not guesswork","Looking for a program with monitoring and follow-up"],"clinicalNote":"Peptide programs require a clinician evaluation and are prescribed only when medically appropriate. Compounded peptides are not FDA-approved and are prepared by a licensed pharmacy. Lab monitoring may be required. Not intended to diagnose, treat, cure or prevent any disease.","kind":"category", image: require("@/assets/images/care/care-hero.jpg") },
];

export const treatments: Treatment[] = [
  {
    "slug": "semaglutide",
    "name": "Compounded Semaglutide",
    "category": "weight-management",
    "forms": [
      "Injectable vial",
      "Oral tablet"
    ],
    "summary": "A compounded formulation of semaglutide, a GLP-1 receptor agonist, prescribed for weight management when a licensed provider determines it is clinically appropriate.",
    "howItsUsed": "Injectable semaglutide is given once weekly under the skin. An oral tablet option is also available. Your clinician determines which form and program is appropriate.",
    "programs": [
      "Injectable — starter, continuation, maintenance and microdose programs",
      "Oral tablet — starter and continuation programs"
    ],
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation to confirm eligibility.",
      "Your clinician will review your health history, current medications and potential side effects."
    ]
  },
  {
    "slug": "tirzepatide",
    "name": "Compounded Tirzepatide",
    "category": "weight-management",
    "forms": [
      "Injectable vial",
      "Oral tablet"
    ],
    "summary": "A compounded formulation of tirzepatide, a dual GIP/GLP-1 receptor agonist, prescribed for weight management when a licensed provider determines it is clinically appropriate.",
    "howItsUsed": "Injectable tirzepatide is given once weekly under the skin. An oral tablet option is also available. Your clinician determines which form and program is appropriate.",
    "programs": [
      "Injectable — starter, continuation, maintenance and microdose programs",
      "Oral tablet — starter and continuation programs"
    ],
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation to confirm eligibility.",
      "Your clinician will review your health history, current medications and potential side effects."
    ]
  },
  {
    "slug": "mic-b12-lipostat",
    "name": "MIC-B12 Lipostat",
    "category": "weight-management",
    "forms": [
      "Injectable vial"
    ],
    "summary": "A compounded formulation of methionine, inositol, choline and vitamin B12, used in weight management care, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Given as an injection. Your clinician will determine whether it fits your plan.",
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation."
    ]
  },
  {
    "slug": "biest",
    "name": "BIEST",
    "category": "hormones-menopause",
    "forms": [
      "Cream"
    ],
    "summary": "A compounded topical cream containing bi-estrogen (estradiol and estriol), used in hormone replacement therapy, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Applied as a topical cream as directed by your clinician.",
    "compounded": "yes",
    "considerations": [
      "Requires a provider evaluation and lab testing where appropriate.",
      "Your clinician will discuss the benefits and risks of hormone therapy with you.",
      "Estrogen therapy carries risks — including blood clots, stroke and certain cancers — which your provider will review with you."
    ]
  },
  {
    "slug": "biest-progesterone",
    "name": "BIEST / Progesterone",
    "category": "hormones-menopause",
    "forms": [
      "Capsule"
    ],
    "summary": "A compounded oral capsule containing bi-estrogen (estradiol and estriol) with progesterone, used in hormone replacement therapy, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Taken by mouth as directed by your clinician.",
    "compounded": "yes",
    "considerations": [
      "Requires a provider evaluation and lab testing where appropriate.",
      "Estrogen therapy carries risks — including blood clots, stroke and certain cancers — which your provider will review with you."
    ]
  },
  {
    "slug": "dhea",
    "name": "DHEA",
    "category": "hormones-menopause",
    "forms": [
      "Cream"
    ],
    "summary": "A compounded topical cream containing DHEA, used in hormone support, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Applied as a topical cream as directed by your clinician.",
    "compounded": "yes",
    "considerations": [
      "Requires a provider evaluation and lab testing where appropriate.",
      "Not appropriate during pregnancy or breastfeeding."
    ]
  },
  {
    "slug": "estradiol",
    "name": "Estradiol",
    "category": "hormones-menopause",
    "forms": [
      "Capsule"
    ],
    "summary": "An oral capsule containing estradiol, used in hormone replacement therapy, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Taken by mouth as directed by your clinician.",
    "compounded": "no",
    "considerations": [
      "Requires a provider evaluation and lab testing where appropriate.",
      "Your clinician will discuss the benefits and risks of estrogen therapy with you.",
      "Estrogen therapy carries risks — including blood clots, stroke and certain cancers — which your provider will review with you."
    ]
  },
  {
    "slug": "estradiol-patch",
    "name": "Estradiol Patch",
    "category": "hormones-menopause",
    "forms": [
      "Patch"
    ],
    "summary": "A transdermal patch delivering estradiol, used in hormone replacement therapy, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Worn on the skin and changed on a set schedule determined by your clinician.",
    "compounded": "no",
    "considerations": [
      "Requires a provider evaluation and lab testing where appropriate.",
      "Estrogen therapy carries risks — including blood clots, stroke and certain cancers — which your provider will review with you."
    ]
  },
  {
    "slug": "estradiol-vaginal-insert",
    "name": "Estradiol Vaginal Insert",
    "category": "hormones-menopause",
    "forms": [
      "Vaginal insert"
    ],
    "summary": "A compounded vaginal insert containing estradiol, used in hormone replacement therapy, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Used as directed by your clinician.",
    "compounded": "yes",
    "considerations": [
      "Requires a provider evaluation and lab testing where appropriate.",
      "Estrogen therapy carries risks — including blood clots, stroke and certain cancers — which your provider will review with you."
    ]
  },
  {
    "slug": "progesterone-ir",
    "name": "Progesterone IR",
    "category": "hormones-menopause",
    "forms": [
      "Capsule"
    ],
    "summary": "A compounded immediate-release oral capsule containing progesterone, used in hormone replacement therapy, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Taken by mouth as directed by your clinician.",
    "compounded": "yes",
    "considerations": [
      "Requires a provider evaluation and lab testing where appropriate."
    ]
  },
  {
    "slug": "liothyronine",
    "name": "Liothyronine SR",
    "aka": "T3",
    "category": "hormones-menopause",
    "forms": [
      "Sustained-release capsule"
    ],
    "summary": "A compounded oral capsule containing liothyronine (T3), used in thyroid hormone therapy, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Taken by mouth as a sustained-release (SR) capsule, as directed by your clinician.",
    "compounded": "yes",
    "considerations": [
      "Requires a provider evaluation and thyroid lab testing.",
      "Thyroid hormone should not be used for weight management or in people with normal thyroid function."
    ]
  },
  {
    "slug": "t3-t4",
    "name": "T3 / T4",
    "category": "hormones-menopause",
    "forms": [
      "Capsule"
    ],
    "summary": "A compounded oral capsule containing liothyronine (T3) and levothyroxine (T4), used in thyroid hormone therapy, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Taken by mouth as directed by your clinician.",
    "compounded": "yes",
    "considerations": [
      "Requires a provider evaluation and thyroid lab testing.",
      "Thyroid hormone should not be used for weight management or in people with normal thyroid function."
    ]
  },
  {
    "slug": "tretinoin-cream",
    "name": "Tretinoin Cream",
    "category": "skin-beauty",
    "forms": [
      "Cream"
    ],
    "summary": "A compounded topical cream containing tretinoin, a retinoid used in skincare, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Applied to the skin at night.",
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation.",
      "Can increase sun sensitivity — daily sunscreen is essential.",
      "Not appropriate during pregnancy."
    ]
  },
  {
    "slug": "tretinoin-gel",
    "name": "Tretinoin Gel",
    "category": "skin-beauty",
    "forms": [
      "Gel"
    ],
    "summary": "A compounded topical gel containing tretinoin, a retinoid used in skincare, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Applied to the skin at night.",
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation.",
      "Can increase sun sensitivity — daily sunscreen is essential.",
      "Not appropriate during pregnancy."
    ]
  },
  {
    "slug": "tretinoin-foam",
    "name": "Tretinoin Foam",
    "category": "skin-beauty",
    "forms": [
      "Foam"
    ],
    "summary": "A compounded topical foam containing tretinoin, a retinoid used in skincare, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Applied to the skin at night.",
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation.",
      "Can increase sun sensitivity — daily sunscreen is essential.",
      "Not appropriate during pregnancy."
    ]
  },
  {
    "slug": "cashmere-cream",
    "name": "Cashmere Cream",
    "category": "skin-beauty",
    "forms": [
      "Cream"
    ],
    "summary": "A compounded topical skincare formulation, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Applied to the skin as directed by your clinician.",
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation."
    ],
    "contentPending": true
  },
  {
    "slug": "ghk-cu-cream",
    "name": "GHK-Cu Cream",
    "category": "skin-beauty",
    "forms": [
      "Cream"
    ],
    "summary": "A compounded topical cream containing GHK-Cu, a copper peptide, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Applied to the skin as directed. Topical form only.",
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation."
    ]
  },
  {
    "slug": "finasteride",
    "name": "Finasteride",
    "category": "hair-health",
    "forms": [
      "Tablet",
      "Capsule",
      "Topical"
    ],
    "summary": "Finasteride as an oral tablet, or as a compounded capsule or topical formulation, used in hair loss care, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Usually taken once daily, or applied topically, as directed by your clinician.",
    "compounded": "partial",
    "compoundedNote": "The capsule and topical forms are compounded; the tablet is not.",
    "considerations": [
      "Requires a clinician evaluation.",
      "Not appropriate during pregnancy, while trying to conceive, or for anyone who may become pregnant without clinician guidance.",
      "Finasteride is FDA-approved for male pattern hair loss; its use for women is off-label and is decided by your provider."
    ]
  },
  {
    "slug": "minoxidil",
    "name": "Minoxidil",
    "category": "hair-health",
    "forms": [
      "Tablet",
      "Capsule",
      "Topical"
    ],
    "summary": "Minoxidil as a topical formulation or a compounded oral capsule, used in hair loss care, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Available as a topical or an oral prescription, as directed by your clinician.",
    "compounded": "partial",
    "compoundedNote": "The oral capsule is compounded; the topical form is not.",
    "considerations": [
      "Requires a clinician evaluation, including a review of blood pressure and heart health.",
      "Oral minoxidil for hair loss is an off-label use; your provider will discuss whether it is appropriate for you."
    ]
  },
  {
    "slug": "finasteride-minoxidil",
    "name": "Finasteride / Minoxidil",
    "category": "hair-health",
    "forms": [
      "Oral",
      "Topical"
    ],
    "summary": "A compounded formulation combining finasteride and minoxidil, used in hair loss care, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Available in oral or topical form, as directed by your clinician.",
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation.",
      "Not appropriate during pregnancy or while trying to conceive.",
      "Finasteride and oral minoxidil are used off-label for women’s hair loss; your provider will decide whether this is appropriate."
    ]
  },
  {
    "slug": "sermorelin",
    "name": "Sermorelin",
    "category": "peptides",
    "forms": [
      "Injectable vial"
    ],
    "summary": "A compounded formulation of sermorelin, a growth hormone-releasing hormone (GHRH) analog, prescribed only when a licensed provider determines it is appropriate for a legitimate medical indication.",
    "howItsUsed": "Given as an injection under the skin, as directed by your clinician.",
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation and lab testing where appropriate."
    ]
  },
  {
    "slug": "nad-plus",
    "name": "NAD+",
    "category": "peptides",
    "forms": [
      "Injectable vial"
    ],
    "summary": "A compounded formulation of nicotinamide adenine dinucleotide (NAD+), prescribed only when a licensed provider determines it is appropriate.",
    "howItsUsed": "Offered as an injection within clinician-guided wellness programs.",
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation.",
      "Individual experiences vary."
    ]
  },
  {
    "slug": "nad-plus-nasal-spray",
    "name": "NAD+ Nasal Spray",
    "category": "peptides",
    "forms": [
      "Nasal spray"
    ],
    "summary": "A compounded intranasal formulation of NAD+, prescribed only when a licensed provider determines it is appropriate.",
    "howItsUsed": "Used as a nasal spray as directed by your clinician.",
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation.",
      "Individual experiences vary."
    ]
  },
  {
    "slug": "glutathione",
    "name": "Glutathione",
    "category": "peptides",
    "forms": [
      "Injectable vial"
    ],
    "summary": "A compounded formulation of glutathione, prescribed only when a licensed provider determines it is appropriate.",
    "howItsUsed": "Offered as an injection within clinician-guided wellness programs.",
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation.",
      "Individual experiences vary."
    ]
  },
  {
    "slug": "pt-141",
    "name": "PT-141",
    "aka": "Bremelanotide",
    "category": "eves-secrets",
    "forms": [
      "Injectable vial"
    ],
    "summary": "A compounded formulation of bremelanotide (PT-141), prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Given as an injection under the skin before intimacy, as directed by your clinician.",
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation, including a review of blood pressure and heart health."
    ]
  },
  {
    "slug": "sildenafil",
    "name": "Sildenafil",
    "category": "eves-secrets",
    "forms": [
      "Capsule"
    ],
    "summary": "An oral formulation of sildenafil, a PDE5 inhibitor used for erectile dysfunction, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Taken by mouth before intimacy, as directed by your clinician.",
    "compounded": "no",
    "considerations": [
      "Eligibility and appropriate use are always clinician-directed.",
      "Must not be used with nitrate medications — your provider will review all of your medications.",
      "This medication is FDA-approved for erectile dysfunction in men; its use for women is off-label and is decided by your provider."
    ]
  },
  {
    "slug": "tadalafil",
    "name": "Tadalafil",
    "category": "eves-secrets",
    "forms": [
      "Capsule"
    ],
    "summary": "An oral formulation of tadalafil, a PDE5 inhibitor used for erectile dysfunction, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Taken by mouth as needed or daily, as prescribed by your clinician.",
    "compounded": "no",
    "considerations": [
      "Eligibility and appropriate use are always clinician-directed.",
      "Must not be used with nitrate medications — your provider will review all of your medications.",
      "This medication is FDA-approved for erectile dysfunction in men; its use for women is off-label and is decided by your provider."
    ]
  },
  {
    "slug": "fem-max-troche",
    "name": "Fem Max Troche",
    "category": "eves-secrets",
    "forms": [
      "Troche"
    ],
    "summary": "A compounded troche containing tadalafil, oxytocin and PT-141, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Dissolved in the mouth, as directed by your clinician.",
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation."
    ]
  },
  {
    "slug": "olympus-troche",
    "name": "Olympus Troche",
    "category": "eves-secrets",
    "forms": [
      "Troche"
    ],
    "summary": "A compounded troche containing oxytocin, tadalafil and bremelanotide, prescribed when a licensed provider determines it is appropriate.",
    "howItsUsed": "Dissolved in the mouth, as directed by your clinician.",
    "compounded": "yes",
    "considerations": [
      "Requires a clinician evaluation."
    ]
  }
];
