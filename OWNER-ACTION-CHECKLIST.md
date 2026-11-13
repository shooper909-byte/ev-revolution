# Owner action checklist: fixes outside the websites

These problems came out of the customer walkthrough on 2026-11-12. They can't be fixed in website code; they need changes in the intake/checkout platform admin (start.evevolutionwellness.com), Google Ads, or your domain DNS.

## 1. Google Ads: turn off Search Partners (biggest money leak)
Lovable analytics for Nov 4–11: 580 visits, **421 from ads, 308 of them from `syndicatedsearch.goog`**, which is Google's Search Partner network. Visitors averaged 1.27 pages per visit. Search Partner traffic is often low-intent or automated.
- Google Ads → each campaign → Settings → Networks → **uncheck "Include Google search partners"**. Also uncheck "Display Network" if it's on.
- Check that the conversion action fires on the intake platform's order-complete page, not on a page view.

## 2. Intake platform admin (start.evevolutionwellness.com)
The intake and checkout run on a separate platform (hosted on Azure), not on Lovable.
1. **Make the intro price text match checkout.** The first questionnaire screen says *Tirzepatide Starter $269/month or $699 for 3 months; Semaglutide $199/month or $499*. Checkout charges **$249/month or $710 for 3 months** for tirzepatide. The website now shows **from $159 (semaglutide) / $249 (tirzepatide)**. Update the intro text so all three agree.
2. **Default the billing cadence to Monthly.** Checkout currently opens on "3-month — Amount authorized today $710."
3. **Fix the checkout footer.** It reads "SSL ENCRYPTED · ONE-TIME PAYMENT · SHIPS AT ONCE" on the 3-month plan. That contradicts the subscription and the "only charged if a provider approves" banner. Change it to something like "SSL encrypted · Charged only if a provider approves."
4. **Explain the "Monthly" wording.** It says "Billed $249 every 28 days, 3 payments ($747 total)." If monthly is a 3-month commitment, say so plainly. If it isn't, remove "3 payments."
5. **Remove the internal note from the catalog.** The Compounded Tirzepatide card says "filled by Vios for Ohio and North Dakota."
6. **Reconsider the lab panel wording.** "$189 … billed when you submit your answers, even if a provider doesn't prescribe" scares buyers. Either bill it only on approval or make it clearly optional with softer wording.
7. **Ask the vendor for a women's intimacy (libido/desire) questionnaire.** Today Eve's Secrets has to use the HRT intake because the only sexual-health form is for erectile dysfunction. The website now tells customers this up front.
8. **Delete test records** named "Audit TestDoNotTreat" (info@evevolutionhealth.com, (713) 555-0147). They are unpaid partial submissions from the walkthrough.

## 3. Content only you can provide
- **Care team:** the "NAME & PHOTO TO COME" cards were removed. Send real clinician names, credentials and photos (with their permission) to put them back. This is one of the strongest trust signals for telehealth.
- **Reviews:** the site has a testimonials section that stays hidden until reviews are verified. Add only real customer reviews, with their consent. Fake reviews violate FTC rules.

## 4. Email for evevolutionwellness.com
The domain has **no MX record**, so mail to any `@evevolutionwellness.com` address bounces. If the intake platform sends patient emails from that domain, replies are lost. Add MX records at your DNS provider (or set up email forwarding), or have the platform send from @evevolutionhealth.com.
