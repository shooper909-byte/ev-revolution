"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { carePrograms, type CareProgram, type CareProgramKey } from "@/lib/carePrograms";

type Status = "idle" | "submitting" | "success" | "error";

const states: [string, string][] = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
  ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"],
  ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
  ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"],
  ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
  ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
  ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"],
  ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"],
  ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"],
  ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"],
  ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
];

const fieldClass = "hairline w-full rounded-xl border bg-onyx/40 px-4 py-3.5 text-sm text-ivory placeholder:text-taupe-700 transition-colors focus:border-champagne focus:outline-none";
const labelClass = "brand-eyebrow block text-[0.5rem] text-taupe";

export function CareLeadForm({ program, labelledBy, availableStateCodes = [], privacyNote = "Contact details only. Please do not submit medical information." }: {
  program: CareProgramKey;
  labelledBy: string;
  availableStateCodes?: readonly string[];
  privacyNote?: string;
}) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const contactOnlyWaitlist =
    program === "energy-performance" || program === "longevity-healthspan";
  const waitlistName =
    program === "energy-performance" ? "Energy Care" : "Longevity Care";
  const { interestLabel, interests, planLabel, plans }: CareProgram = carePrograms[program];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/care-lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          program,
          name: formData.get("name"),
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          mobile: formData.get("mobile"),
          state: formData.get("state"),
          interest: formData.get("interest"),
          plan: formData.get("plan"),
          consent: formData.get("consent") === "on",
        }),
      });
      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(payload.message ?? "We could not save your request. Please try again.");
        return;
      }
      setStatus("success");
      setMessage(payload.message ?? "Thank you. Your request was saved.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("We could not save your request. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="hairline flex flex-col justify-center rounded-3xl border bg-onyx-900/70 p-9 sm:p-11">
        <p className="brand-eyebrow text-champagne">Request received</p>
        <p className="mt-6 font-display text-[1.75rem] leading-tight text-ivory">{contactOnlyWaitlist ? `You are on the ${waitlistName} waitlist.` : "Thank you — your request was received."}</p>
        <p className="mt-5 text-sm leading-relaxed text-ivory-200/85">{message}</p>
        <button type="button" onClick={() => { setStatus("idle"); setMessage(""); }} className="brand-eyebrow mt-8 self-start text-[0.5625rem] text-champagne underline underline-offset-[6px]">Submit another request</button>
      </div>
    );
  }

  return (
    <form method="post" action="/api/care-lead" onSubmit={handleSubmit} aria-busy={status === "submitting"} aria-labelledby={labelledBy} className="hairline grid gap-6 rounded-3xl border bg-onyx-900/70 p-7 sm:p-9">
      {contactOnlyWaitlist ? (
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>Name</label>
          <input id={`${id}-name`} name="name" required autoComplete="name" className={`${fieldClass} mt-3`} placeholder="Your name" />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          <div><label htmlFor={`${id}-first`} className={labelClass}>First name</label><input id={`${id}-first`} name="firstName" required autoComplete="given-name" className={`${fieldClass} mt-3`} placeholder="First name" /></div>
          <div><label htmlFor={`${id}-last`} className={labelClass}>Last name</label><input id={`${id}-last`} name="lastName" required autoComplete="family-name" className={`${fieldClass} mt-3`} placeholder="Last name" /></div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div><label htmlFor={`${id}-email`} className={labelClass}>Email</label><input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={`${fieldClass} mt-3`} placeholder="your@email.com" /></div>
        <div><label htmlFor={`${id}-mobile`} className={labelClass}>{contactOnlyWaitlist ? "Phone number (optional)" : "Mobile number"}</label><input id={`${id}-mobile`} name="mobile" type="tel" required={!contactOnlyWaitlist} inputMode="tel" autoComplete="tel" className={`${fieldClass} mt-3`} placeholder="(555) 555-5555" /></div>
      </div>

      <div className={contactOnlyWaitlist ? "" : "grid gap-6 sm:grid-cols-2"}>
        <div>
          <label htmlFor={`${id}-state`} className={labelClass}>{contactOnlyWaitlist ? "State" : "State (availability shown)"}</label>
          <select id={`${id}-state`} name="state" required defaultValue="" autoComplete="address-level1" className={`${fieldClass} mt-3`}>
            <option value="" disabled>Select your state</option>
            {states.map(([code, name]) => <option key={code} value={code}>{name}{!contactOnlyWaitlist && !availableStateCodes.includes(code) ? " — Join waitlist" : ""}</option>)}
          </select>
        </div>
        {!contactOnlyWaitlist && (
          <div>
            <label htmlFor={`${id}-interest`} className={labelClass}>{interestLabel}</label>
            <select id={`${id}-interest`} name="interest" required defaultValue="" className={`${fieldClass} mt-3`}><option value="" disabled>Select an option</option>{interests.map((option) => <option key={option} value={option}>{option}</option>)}</select>
          </div>
        )}
      </div>

      {!contactOnlyWaitlist && planLabel && plans && (
        <div><label htmlFor={`${id}-plan`} className={labelClass}>{planLabel}</label><select id={`${id}-plan`} name="plan" required defaultValue="" className={`${fieldClass} mt-3`}><option value="" disabled>Select an option</option>{plans.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
      )}

      {contactOnlyWaitlist && <p className="rounded-xl border border-champagne/25 bg-onyx/30 px-4 py-3 text-xs leading-relaxed text-ivory-200/80">Please do not submit symptoms, medications, or medical history here. Clinical information will be collected only through the approved secure clinical intake after launch.</p>}

      <div className="flex items-start gap-3">
        <input id={`${id}-consent`} name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-plum)]" />
        <label htmlFor={`${id}-consent`} className="text-xs leading-relaxed text-ivory-200/80">I agree that Eve&rsquo;s Sisters may contact me by email and, if provided, phone or text about {contactOnlyWaitlist ? `${waitlistName} availability` : "my request"}. Message rates may apply, and I may opt out at any time.</label>
      </div>

      <p className="text-xs leading-relaxed text-ivory-200/65">This form sends only the contact details shown above to the existing lead system. Values are not added to URLs, analytics, or advertising pixels. For questions, use the <Link href="/contact" className="text-champagne underline underline-offset-4">contact page</Link>. Review the <Link href="/disclaimer" className="text-champagne underline underline-offset-4">Medical Disclaimer</Link>.</p>

      <div>
        <button type="submit" disabled={status === "submitting"} className="button-sheen brand-eyebrow group w-full rounded-full bg-champagne px-8 py-4 text-[0.625rem] text-onyx transition-colors hover:bg-champagne-200 disabled:opacity-60 sm:w-auto">{status === "submitting" ? "Saving" : contactOnlyWaitlist ? `Join the ${waitlistName} Waitlist` : "Submit Request"}<span aria-hidden="true" className="ml-2 inline-block transition-transform duration-300 motion-safe:group-hover:translate-x-1">&rarr;</span></button>
        <p aria-live="polite" className={`mt-5 text-xs leading-relaxed ${status === "error" ? "text-mauve" : "text-ivory-200/65"}`}>{message || privacyNote}</p>
      </div>
    </form>
  );
}
