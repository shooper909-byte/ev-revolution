"use client";

import { useId, useState } from "react";
import { carePrograms, type CareProgramKey } from "@/lib/carePrograms";

/* ------------------------------------------------------------------
   The assessment lead form, shared by the care subscription pages.

   It collects contact details and one area of interest — no symptoms, no
   health history, no medications. Those questions belong inside the clinical
   assessment, behind a licensed provider and a secure intake workflow, so
   they are deliberately absent here until that workflow is live.

   The submission goes to this site's own API route, which forwards it over
   HTTPS through the configured lead workflow. Nothing is emailed from the
   browser and nothing is sent to an analytics destination.
   ------------------------------------------------------------------ */

type Status = "idle" | "submitting" | "success" | "error";

const states: [string, string][] = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"],
  ["DE", "Delaware"], ["DC", "District of Columbia"], ["FL", "Florida"],
  ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"], ["IL", "Illinois"],
  ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"], ["KY", "Kentucky"],
  ["LA", "Louisiana"], ["ME", "Maine"], ["MD", "Maryland"],
  ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"],
  ["NE", "Nebraska"], ["NV", "Nevada"], ["NH", "New Hampshire"],
  ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"],
  ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"],
  ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"], ["SC", "South Carolina"], ["SD", "South Dakota"],
  ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"],
  ["VA", "Virginia"], ["WA", "Washington"], ["WV", "West Virginia"],
  ["WI", "Wisconsin"], ["WY", "Wyoming"],
];

const fieldClass =
  "hairline w-full rounded-xl border bg-onyx/40 px-4 py-3.5 text-sm text-ivory placeholder:text-taupe-700 transition-colors focus:border-champagne focus:outline-none";

const labelClass = "brand-eyebrow block text-[0.5rem] text-taupe";

export function CareLeadForm({
  program,
  labelledBy,
  privacyNote = "Contact details only. Your health history is collected inside the clinical assessment.",
}: {
  program: CareProgramKey;
  /** id of the heading this form belongs to. */
  labelledBy: string;
  privacyNote?: string;
}) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const { interestLabel, interests } = carePrograms[program];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          mobile: formData.get("mobile"),
          state: formData.get("state"),
          interest: formData.get("interest"),
          consent: formData.get("consent") === "on",
        }),
      });
      const payload = (await response.json()) as { message?: string };

      if (response.ok) {
        setStatus("success");
        setMessage(
          payload.message ??
            "Thank you — your request is with our care team. We will email you the next step in your assessment.",
        );
        form.reset();
      } else {
        setStatus("error");
        setMessage(payload.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="hairline flex flex-col justify-center rounded-3xl border bg-onyx-900/70 p-9 sm:p-11"
      >
        <p className="brand-eyebrow text-champagne">Request received</p>
        <p className="mt-6 font-display text-[1.75rem] leading-tight text-ivory">
          Thank you — your assessment is on its way.
        </p>
        <p className="mt-5 text-sm leading-relaxed text-ivory-200/85">{message}</p>
        <p className="mt-7 text-xs leading-relaxed text-ivory-200/65">
          A licensed provider reviews every request. Treatment is offered only
          when it is clinically appropriate.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
          className="brand-eyebrow mt-8 self-start text-[0.5625rem] text-champagne underline underline-offset-[6px]"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby={labelledBy}
      className="hairline grid gap-6 rounded-3xl border bg-onyx-900/70 p-7 sm:p-9"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-first`} className={labelClass}>
            First name
          </label>
          <input
            id={`${id}-first`}
            name="firstName"
            required
            autoComplete="given-name"
            className={`${fieldClass} mt-3`}
            placeholder="First name"
          />
        </div>
        <div>
          <label htmlFor={`${id}-last`} className={labelClass}>
            Last name
          </label>
          <input
            id={`${id}-last`}
            name="lastName"
            required
            autoComplete="family-name"
            className={`${fieldClass} mt-3`}
            placeholder="Last name"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-email`} className={labelClass}>
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${fieldClass} mt-3`}
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor={`${id}-mobile`} className={labelClass}>
            Mobile number
          </label>
          <input
            id={`${id}-mobile`}
            name="mobile"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            className={`${fieldClass} mt-3`}
            placeholder="(555) 555-5555"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-state`} className={labelClass}>
            State
          </label>
          <select
            id={`${id}-state`}
            name="state"
            required
            defaultValue=""
            autoComplete="address-level1"
            className={`${fieldClass} mt-3`}
          >
            <option value="" disabled>
              Select your state
            </option>
            {states.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-interest`} className={labelClass}>
            {interestLabel}
          </label>
          <select
            id={`${id}-interest`}
            name="interest"
            required
            defaultValue=""
            className={`${fieldClass} mt-3`}
          >
            <option value="" disabled>
              Select an option
            </option>
            {interests.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <input
          id={`${id}-consent`}
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-plum)]"
        />
        <label
          htmlFor={`${id}-consent`}
          className="text-xs leading-relaxed text-ivory-200/80"
        >
          I agree that Eve&rsquo;s Sisters may contact me by email, phone or
          text about my assessment. Message rates may apply and I can opt out at
          any time.
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="button-sheen brand-eyebrow group w-full rounded-full bg-champagne px-8 py-4 text-[0.625rem] text-onyx transition-colors hover:bg-champagne-200 disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending" : "Continue to Assessment"}
          <span
            aria-hidden="true"
            className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </button>

        <p
          aria-live="polite"
          className={`mt-5 text-xs leading-relaxed ${
            status === "error" ? "text-mauve" : "text-ivory-200/65"
          }`}
        >
          {message || privacyNote}
        </p>
      </div>
    </form>
  );
}
