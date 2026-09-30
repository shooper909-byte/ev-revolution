"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { getLaunchCareRequestOption, type LaunchCareCategory } from "@/lib/launchCare";

type ScreenAnswer = "yes" | "no" | "not-sure";
type ScreenStatus = "questions" | "eligible" | "referred";
type SubmitStatus = "idle" | "submitting" | "success" | "error";

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

const fieldClass =
  "hairline w-full rounded-xl border bg-onyx/40 px-4 py-3.5 text-sm text-ivory placeholder:text-taupe-700 transition-colors focus:border-champagne focus:outline-none";
const labelClass = "brand-eyebrow block text-[0.5rem] text-taupe";

export function TreatmentRequestPanel({ category }: { category: LaunchCareCategory }) {
  const id = useId();
  const requestOptions = [
    ...category.plans.map((plan) => ({ id: plan.id, label: plan.title, price: plan.monthly, kind: "plan" as const })),
    ...(category.bundles ?? []).filter((bundle) => !bundle.availabilityPending).map((bundle) => ({
      id: bundle.id,
      label: `${bundle.title} bundle`,
      price: bundle.price ?? `from ${bundle.semaglutidePrice ?? bundle.tirzepatidePrice}`,
      kind: "bundle" as const,
    })),
  ];
  const [answers, setAnswers] = useState<Record<string, ScreenAnswer | undefined>>({});
  const [screenMessage, setScreenMessage] = useState("");
  const [screenStatus, setScreenStatus] = useState<ScreenStatus>("questions");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(requestOptions[0]?.id ?? "");
  const [billing, setBilling] = useState("monthly");

  useEffect(() => {
    function selectRequestedPlan(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[data-request-plan]");
      const option = getLaunchCareRequestOption(category, link?.dataset.requestPlan);
      if (option) {
        setSelectedPlan(option.id);
        setSubmitStatus("idle");
        setSubmitMessage("");
      }
    }
    document.addEventListener("click", selectRequestedPlan);
    return () => document.removeEventListener("click", selectRequestedPlan);
  }, [category]);

  function restart() {
    setAnswers({});
    setScreenMessage("");
    setScreenStatus("questions");
    setSubmitStatus("idle");
    setSubmitMessage("");
  }

  function checkAnswers() {
    const allAnswered = category.preScreen.questions.every((question) => answers[question.id]);
    if (!allAnswered) {
      setScreenMessage("Please answer each question before continuing.");
      return;
    }

    const shouldRefer = category.preScreen.questions.some(
      (question) => answers[question.id] !== "no",
    );
    setScreenMessage("");
    setScreenStatus(shouldRefer ? "referred" : "eligible");
  }

  async function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitStatus === "submitting") return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitStatus("submitting");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/treatment-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          category: category.slug,
          plan: selectedPlan,
          billing,
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          mobile: formData.get("mobile"),
          state: formData.get("state"),
          consent: formData.get("consent") === "on",
        }),
      });
      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        setSubmitStatus("error");
        setSubmitMessage(payload.message ?? "We could not submit your request. Please try again.");
        return;
      }
      setSubmitStatus("success");
      setSubmitMessage(payload.message ?? "Your request was received.");
      form.reset();
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("We could not submit your request. Please try again or contact our team using the link below. Do not email medical information.");
    }
  }

  if (screenStatus === "referred") {
    return (
      <div className="hairline rounded-3xl border border-champagne/35 bg-onyx-900/70 p-7 sm:p-9">
        <p className="brand-eyebrow text-champagne">A safer next step</p>
        <h3 className="mt-5 font-display text-3xl leading-tight text-ivory">
          Please speak with a clinician directly before requesting this pathway.
        </h3>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ivory-200/85">
          This brief screen does not make a medical decision. Based on your answer, this online request path is not the right next step. For urgent or severe symptoms, seek appropriate in-person or emergency care.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="button-sheen brand-eyebrow rounded-full bg-champagne px-6 py-3 text-[0.5625rem] text-onyx hover:bg-champagne-200"
          >
            Contact our team
          </Link>
          <button
            type="button"
            onClick={restart}
            className="brand-eyebrow px-2 py-3 text-[0.5625rem] text-champagne underline underline-offset-[6px]"
          >
            Start again
          </button>
        </div>
      </div>
    );
  }

  if (screenStatus === "eligible") {
    if (submitStatus === "success") {
      return (
        <div role="status" className="hairline rounded-3xl border border-champagne/35 bg-onyx-900/70 p-7 sm:p-9">
          <p className="brand-eyebrow text-champagne">Request received</p>
          <h3 className="mt-5 font-display text-3xl leading-tight text-ivory">Your next step is on its way.</h3>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ivory-200/85">{submitMessage}</p>
          <button
            type="button"
            onClick={restart}
            className="brand-eyebrow mt-8 text-[0.5625rem] text-champagne underline underline-offset-[6px]"
          >
            Request another treatment
          </button>
        </div>
      );
    }

    return (
      <form
        method="post"
        action="/api/treatment-request"
        onSubmit={submitRequest}
        aria-busy={submitStatus === "submitting"}
        className="hairline grid gap-6 rounded-3xl border border-champagne/35 bg-onyx-900/70 p-7 sm:p-9"
      >
        <div>
          <p className="brand-eyebrow text-champagne">Step 2 of 2</p>
          <h3 className="mt-4 font-display text-3xl leading-tight text-ivory">Request your secure clinical assessment.</h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory-200/80">
            We only collect contact details and your requested plan here. Your pre-screen answers are not sent, and this request does not create a charge, prescription, or enrollment.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-plan`} className={labelClass}>Plan or bundle requested</label>
            <select id={`${id}-plan`} value={selectedPlan} onChange={(event) => setSelectedPlan(event.target.value)} className={`${fieldClass} mt-3`}>
              <optgroup label="Care plans">
                {requestOptions.filter((option) => option.kind === "plan").map((option) => <option key={option.id} value={option.id}>{option.label} — {option.price}</option>)}
              </optgroup>
              {requestOptions.some((option) => option.kind === "bundle") && (
                <optgroup label="Care bundles">
                  {requestOptions.filter((option) => option.kind === "bundle").map((option) => <option key={option.id} value={option.id}>{option.label} — {option.price}</option>)}
                </optgroup>
              )}
            </select>
          </div>
          <div>
            <label htmlFor={`${id}-billing`} className={labelClass}>Billing preference</label>
            <select id={`${id}-billing`} value={billing} onChange={(event) => setBilling(event.target.value)} className={`${fieldClass} mt-3`}>
              <option value="monthly">{category.slug === "eves-secret" ? "One consultation" : "Month to month"}</option>
              {category.slug !== "eves-secret" && <option value="prepaid">Three months prepaid</option>}
            </select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div><label htmlFor={`${id}-first`} className={labelClass}>First name</label><input id={`${id}-first`} name="firstName" required autoComplete="given-name" className={`${fieldClass} mt-3`} placeholder="First name" /></div>
          <div><label htmlFor={`${id}-last`} className={labelClass}>Last name</label><input id={`${id}-last`} name="lastName" required autoComplete="family-name" className={`${fieldClass} mt-3`} placeholder="Last name" /></div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div><label htmlFor={`${id}-email`} className={labelClass}>Email</label><input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={`${fieldClass} mt-3`} placeholder="you@email.com" /></div>
          <div><label htmlFor={`${id}-mobile`} className={labelClass}>Mobile number</label><input id={`${id}-mobile`} name="mobile" type="tel" required inputMode="tel" autoComplete="tel" className={`${fieldClass} mt-3`} placeholder="(555) 555-5555" /></div>
        </div>

        <div>
          <label htmlFor={`${id}-state`} className={labelClass}>State where you live</label>
          <select id={`${id}-state`} name="state" required defaultValue="" autoComplete="address-level1" className={`${fieldClass} mt-3`}>
            <option value="" disabled>Select your state</option>
            {states.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
        </div>

        <div className="flex items-start gap-3">
          <input id={`${id}-consent`} name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-plum)]" />
          <label htmlFor={`${id}-consent`} className="text-xs leading-relaxed text-ivory-200/80">
            I agree that Eve’s Sisters may contact me by email and, if provided, phone or text about this treatment request. Message rates may apply. I may opt out at any time.
          </label>
        </div>

        <p className="text-xs leading-relaxed text-ivory-200/65">
          Prescription treatment is not guaranteed and requires evaluation by a licensed clinician. Compounded medications are not FDA-approved. Services vary by state. Please do not submit symptoms, medication history or other medical information here.
        </p>

        <div>
          <button type="submit" disabled={submitStatus === "submitting"} className="button-sheen brand-eyebrow w-full rounded-full bg-champagne px-8 py-4 text-[0.625rem] text-onyx transition-colors hover:bg-champagne-200 disabled:opacity-60 sm:w-auto">
            {submitStatus === "submitting" ? "Sending request" : "Request this treatment"}
            <span aria-hidden="true" className="ml-2">→</span>
          </button>
          <p aria-live="polite" className={`mt-5 text-xs leading-relaxed ${submitStatus === "error" ? "text-mauve" : "text-ivory-200/65"}`}>{submitMessage}</p>
          {submitStatus === "error" && <Link href="/contact" className="mt-4 inline-block text-sm text-champagne underline">Contact our team about this request</Link>}
        </div>
      </form>
    );
  }

  return (
    <div className="hairline rounded-3xl border border-champagne/35 bg-onyx-900/70 p-7 sm:p-9">
      <p className="brand-eyebrow text-champagne">Step 1 of 2</p>
      <h3 className="mt-4 font-display text-3xl leading-tight text-ivory">A quick private pre-screen.</h3>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory-200/80">
        This takes about a minute and helps determine whether to continue with an online request. It is not medical advice or a clinical evaluation. Your answers stay in this browser and are not submitted.
      </p>
      {category.preScreen.extraNote && <p className="mt-4 rounded-2xl bg-onyx/40 px-4 py-3 text-xs leading-relaxed text-ivory-200/75">{category.preScreen.extraNote}</p>}

      <fieldset className="mt-8 grid gap-6">
        <legend className="sr-only">Pre-screen questions</legend>
        {category.preScreen.questions.map((question) => (
          <div key={question.id} className="border-b border-ivory-300/15 pb-6 last:border-0 last:pb-0">
            <p className="text-sm leading-relaxed text-ivory">{question.prompt}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {(["yes", "no", "not-sure"] as const).map((answer) => {
                const selected = answers[question.id] === answer;
                const label = answer === "not-sure" ? "Not sure" : answer === "yes" ? "Yes" : "No";
                return (
                  <button
                    key={answer}
                    type="button"
                    onClick={() => { setAnswers((current) => ({ ...current, [question.id]: answer })); setScreenMessage(""); }}
                    aria-pressed={selected}
                    className={`rounded-full border px-4 py-2 text-xs transition-colors ${selected ? "border-champagne bg-champagne text-onyx" : "border-ivory-300/35 text-ivory-200 hover:border-champagne hover:text-champagne"}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </fieldset>

      <div className="mt-8">
        <button type="button" onClick={checkAnswers} className="button-sheen brand-eyebrow w-full rounded-full bg-champagne px-8 py-4 text-[0.625rem] text-onyx transition-colors hover:bg-champagne-200 sm:w-auto">
          Continue to request
          <span aria-hidden="true" className="ml-2">→</span>
        </button>
        <p aria-live="polite" className="mt-4 text-xs leading-relaxed text-mauve">{screenMessage}</p>
      </div>
    </div>
  );
}
