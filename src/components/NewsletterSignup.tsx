"use client";

import { useId, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const formId = useId().replace(/:/g, "");
  const inputId = `newsletter-email-${formId}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { message?: string };

      if (response.ok) {
        setStatus("success");
        setMessage(data.message ?? "You're on the list.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
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
