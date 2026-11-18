#!/usr/bin/env node
/**
 * Builds the Eve's Sisters signup emails into emails/dist/*.html, ready to
 * paste into Brevo (Campaigns → Templates → Code your own, or Automations).
 *
 *   node emails/build.mjs
 *
 * Brevo placeholders used:
 *   {{ doubleoptin }}  confirmation link (double opt-in template only)
 *   {{ unsubscribe }}  unsubscribe link (required in marketing emails)
 *   {{ update_profile }}  preference link
 *
 * Copy follows the site's editorial policy and LegitScript standards: general
 * wellness education, no outcome promises, no drug names, no claim that a
 * prescription is guaranteed.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const SITE = "https://evevolutionhealth.com";
const utm = (campaign) => `utm_source=brevo&utm_medium=email&utm_campaign=${campaign}`;

const color = {
  onyx: "#080B0B",
  ivory: "#F7EFE6",
  plum: "#642A52",
  champagne: "#DAB16A",
  taupe: "#6F655E",
  line: "#E6DACB",
};
const serif = "'Playfair Display', Georgia, 'Times New Roman', serif";
const sans = "Inter, 'Helvetica Neue', Arial, sans-serif";

function button(label, href) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0 8px;">
  <tr><td bgcolor="${color.plum}" style="border-radius:999px;">
    <a href="${href}" style="display:inline-block;padding:15px 34px;font-family:${sans};font-size:12px;letter-spacing:2.4px;text-transform:uppercase;color:#FFFFFF;text-decoration:none;border-radius:999px;">${label}</a>
  </td></tr>
</table>`;
}

const p = (text) =>
  `<p style="margin:0 0 18px;font-family:${sans};font-size:16px;line-height:1.65;color:${color.onyx};">${text}</p>`;

function layout({ preheader, eyebrow, title, body, footerNote, marketing = true }) {
  const unsubscribe = marketing
    ? `<a href="{{ unsubscribe }}" style="color:${color.taupe};text-decoration:underline;">Unsubscribe</a> &nbsp;·&nbsp; <a href="{{ update_profile }}" style="color:${color.taupe};text-decoration:underline;">Update preferences</a><br><br>`
    : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${title.replace(/<[^>]+>/g, "")}</title>
<style>
  @media (max-width: 620px) {
    .card { padding: 36px 24px !important; }
    .title { font-size: 30px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${color.ivory};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${color.ivory}">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
    <tr><td bgcolor="${color.onyx}" align="center" style="padding:30px 24px;border-bottom:1px solid ${color.champagne};">
      <a href="${SITE}/?${utm("header")}" style="text-decoration:none;">
        <span style="font-family:${serif};font-size:26px;letter-spacing:4px;color:${color.champagne};">EVE&rsquo;S SISTERS</span><br>
        <span style="font-family:${sans};font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#CFC4B8;">The Evolution of a Woman&rsquo;s Body</span>
      </a>
    </td></tr>
    <tr><td class="card" bgcolor="#FFFFFF" style="padding:48px 48px 40px;">
      <p style="margin:0 0 14px;font-family:${sans};font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${color.plum};">${eyebrow}</p>
      <h1 class="title" style="margin:0 0 24px;font-family:${serif};font-weight:400;font-size:36px;line-height:1.15;color:${color.onyx};">${title}</h1>
      ${body}
    </td></tr>
    <tr><td style="padding:28px 24px;font-family:${sans};font-size:12px;line-height:1.6;color:${color.taupe};text-align:center;">
      ${footerNote ? `${footerNote}<br><br>` : ""}
      Eve&rsquo;s Sisters publishes general wellness education. Nothing in this email is medical advice, diagnosis or treatment. If you are experiencing a medical emergency, call 911.<br><br>
      ${unsubscribe}Eve&rsquo;s Sisters &middot; 3247 Woods Canyon Ct, Missouri City, TX 77459<br>
      <a href="mailto:info@evevolutionhealth.com" style="color:${color.taupe};">info@evevolutionhealth.com</a> &middot; (832) 800-7818<br>
      <a href="${SITE}/privacy-policy" style="color:${color.taupe};">Privacy Policy</a>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>
`;
}

const emails = [
  {
    file: "01-confirm-subscription.html",
    subject: "Please confirm your subscription",
    html: layout({
      marketing: false,
      preheader: "One click and you're in.",
      eyebrow: "One last step",
      title: "Please confirm your email.",
      body:
        p("Thank you for signing up for Eve&rsquo;s Sisters. To make sure we have the right address, please confirm your subscription.") +
        button("Confirm my subscription", "{{ doubleoptin }}") +
        p(`<span style="font-size:13px;color:${color.taupe};">If you didn&rsquo;t sign up, you can ignore this email and you won&rsquo;t hear from us again.</span>`),
    }),
  },
  {
    file: "02-welcome.html",
    subject: "Welcome to Eve's Sisters",
    html: layout({
      preheader: "Care for every stage of a woman's life, starting with the questions you actually ask.",
      eyebrow: "Welcome",
      title: "Different stages.<br>The same power.",
      body:
        p("Thank you for joining Eve&rsquo;s Sisters. You&rsquo;ll hear from us with clear, evidence-informed wellness education for every chapter: perimenopause and menopause, weight and metabolism, skin, energy, sleep and healthy aging.") +
        p("No hype and no pressure. Just thoughtful information and a straightforward look at your options.") +
        p(`<strong style="font-weight:600;">When you&rsquo;re ready to explore care</strong>, our pathways start with your goals and health history. Every request is reviewed by a licensed provider affiliated with Elite Care Health, who decides whether any treatment is appropriate for you. Treatment is never guaranteed.`) +
        button("Explore care pathways", `${SITE}/care?${utm("welcome")}`),
    }),
  },
  {
    file: "03-how-care-works.html",
    subject: "How care works at Eve's Sisters",
    html: layout({
      preheader: "From your first question to ongoing support, here's what to expect.",
      eyebrow: "How it works",
      title: "Care that starts with you.",
      body:
        p("People often ask what happens after they start an assessment. Here is the whole path, plainly:") +
        `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 10px;">
          ${[
            ["1", "Share your history", "A secure intake covering your health history, medications and goals."],
            ["2", "A licensed provider reviews it", "Providers affiliated with Elite Care Health, an independent physician group, review every request. They may ask for more information, lab work or a consultation."],
            ["3", "A decision made for you", "If a treatment is clinically appropriate, your provider prescribes it and a licensed pharmacy, Rx Ave Health, fills it. If not, your provider will let you know and may suggest other options."],
            ["4", "Ongoing support", "Regular check-ins with your care team. Every refill is reviewed by a provider; refills are never automatic."],
          ]
            .map(
              ([n, head, text]) => `<tr>
            <td valign="top" style="padding:0 16px 18px 0;font-family:${serif};font-size:28px;line-height:1;color:${color.champagne};">${n}</td>
            <td valign="top" style="padding:0 0 18px;font-family:${sans};font-size:15px;line-height:1.6;color:${color.onyx};"><strong style="font-weight:600;">${head}.</strong> ${text}</td>
          </tr>`,
            )
            .join("")}
        </table>` +
        p("Your card is only charged for a medication after a provider approves the prescription.") +
        button("See how it works", `${SITE}/care?${utm("how_care_works")}#pathways`),
      footerNote: `Questions? Read our <a href="${SITE}/faq?${utm("how_care_works")}" style="color:${color.taupe};">FAQ</a> or reply to this email.`,
    }),
  },
  {
    file: "04-find-your-pathway.html",
    subject: "Which chapter are you in?",
    html: layout({
      preheader: "Six areas of care, each built around a different stage of life.",
      eyebrow: "Find your pathway",
      title: "Which chapter are you in?",
      body:
        p("Every woman&rsquo;s body changes in its own way and on its own timeline. Our care is organized around the areas women ask us about most:") +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 16px;border-top:1px solid ${color.line};">
          ${[
            ["Weight Management", "/care/weight-management"],
            ["Menopause &amp; Hormones", "/care/hormones-menopause"],
            ["Skin &amp; Beauty", "/care/skin-beauty"],
            ["Energy &amp; Vitality", "/care/energy-performance"],
            ["Longevity &amp; Healthspan", "/care/longevity-healthspan"],
          ]
            .map(
              ([label, path]) => `<tr><td style="padding:14px 0;border-bottom:1px solid ${color.line};">
            <a href="${SITE}${path}?${utm("pathways")}" style="font-family:${serif};font-size:19px;color:${color.onyx};text-decoration:none;">${label} <span style="color:${color.plum};">&rarr;</span></a>
          </td></tr>`,
            )
            .join("")}
        </table>` +
        p("Each pathway explains what&rsquo;s involved, what it costs and what a provider will look at. Individual results vary, and a provider decides whether any treatment is right for you.") +
        button("Explore all care", `${SITE}/care?${utm("pathways")}`),
    }),
  },
];

const out = join(here, "dist");
mkdirSync(out, { recursive: true });
const index = [];
for (const email of emails) {
  writeFileSync(join(out, email.file), email.html);
  index.push(`${email.file}\t${email.subject}`);
}
writeFileSync(join(out, "subjects.tsv"), `file\tsubject\n${index.join("\n")}\n`);
console.log(`Built ${emails.length} emails into ${out}`);
