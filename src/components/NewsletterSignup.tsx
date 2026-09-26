"use client";

import { useId } from "react";
import type { CaptureSource } from "@/lib/brevo";
import { honeypotProps, useEmailCapture } from "@/components/emailCapture";

export function NewsletterSignup({
  compact = false,
  source = "site",
}: {
  compact?: boolean;
  /** Which capture this is, so Brevo can route and report on it. */
  source?: CaptureSource;
}) {
  const { email, setEmail, status, message, company, setCompany, submit } =
    useEmailCapture(source);
  const formId = useId().replace(/:/g, "");
  const inputId = `newsletter-email-${formId}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submit();
  }

  return (
    <div className={compact ? "" : "max-w-md"}>
      <form id={`newsletter-form-${formId}`} onSubmit={handleSubmit} aria-busy={status === "submitting"} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="your@email.com"
          className="hairline min-w-0 flex-1 border-b bg-transparent px-1 py-3 text-base text-ivory placeholder:text-taupe focus:border-champagne focus:outline-none"
        />
        <input
          {...honeypotProps}
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="brand-eyebrow shrink-0 bg-plum px-7 py-3.5 text-[0.625rem] text-ivory transition-colors hover:bg-plum-600 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending" : "Join"}
        </button>
      </form>

      <p
        aria-live="polite"
        role={status === "error" ? "alert" : "status"}
        className={`mt-3 text-sm ${
          status === "error" ? "text-mauve" : "text-taupe"
        }`}
      >
        {message ||
          "Evidence-led guidance on hormones, metabolism and longevity. No spam, ever."}
      </p>
    </div>
  );
}
