"use client";

import { useState } from "react";
import { pillars } from "@/lib/pillars";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "hairline w-full border-b bg-transparent px-1 py-3 text-sm text-ivory placeholder:text-taupe-700 focus:border-champagne focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await response.json()) as { message?: string };

      if (response.ok) {
        setStatus("success");
        setMessage(payload.message ?? "Thank you — we'll be in touch.");
        form.reset();
      } else {
        setStatus("error");
        setMessage(payload.message ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="brand-eyebrow text-[0.5rem] text-taupe"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            className={`${fieldClass} mt-3`}
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="brand-eyebrow text-[0.5rem] text-taupe"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${fieldClass} mt-3`}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-topic"
          className="brand-eyebrow text-[0.5rem] text-taupe"
        >
          Topic
        </label>
        <select
          id="contact-topic"
          name="topic"
          defaultValue="General"
          className={`${fieldClass} mt-3`}
        >
          <option value="General">General enquiry</option>
          {pillars.map((pillar) => (
            <option key={pillar.slug} value={pillar.name}>
              {pillar.name}
            </option>
          ))}
          <option value="Press">Press &amp; partnerships</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="brand-eyebrow text-[0.5rem] text-taupe"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={`${fieldClass} mt-3 resize-y`}
          placeholder="How can we help?"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="brand-eyebrow bg-plum px-9 py-4 text-[0.625rem] text-ivory transition-colors hover:bg-plum-600 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending" : "Send message"}
        </button>
        <p
          aria-live="polite"
          className={`mt-4 text-xs ${
            status === "error" ? "text-mauve" : "text-taupe"
          }`}
        >
          {message ||
            "We read everything. We cannot give individual medical advice."}
        </p>
      </div>
    </form>
  );
}
