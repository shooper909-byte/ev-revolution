"use client";

import { useEffect, useRef, useState } from "react";
import { business } from "@/lib/business";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "hairline w-full border-b bg-transparent px-1 py-2 text-sm text-ivory placeholder:text-taupe-700 focus:border-champagne focus:outline-none";

const quickLinks = [
  { href: "/faq", label: "Read the FAQ" },
  { href: "/subscription-cancellation", label: "Cancel or change a subscription" },
  { href: "/care", label: "Explore care options" },
];

/**
 * Floating customer service bubble shown on every page. It offers the
 * support phone and email, a few self-serve links, and a short message
 * form that posts to the same /api/contact route as the contact page.
 */
export function SupportBubble() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a, button, input")?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      ...Object.fromEntries(new FormData(form)),
      topic: "Customer service (chat bubble)",
    };
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

  const tel = business.phone.replace(/[^\d+]/g, "");

  return (
    <div className="fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          ref={panelRef}
          id="support-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="support-title"
          className="hairline flex max-h-[calc(100dvh-7rem)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-y-auto border bg-onyx-900 shadow-2xl shadow-black/60"
        >
          <div className="bg-plum px-5 py-4">
            <p className="brand-eyebrow text-[0.5rem] text-champagne-200">
              {business.brand}
            </p>
            <h2 id="support-title" className="mt-1 font-display text-xl text-ivory">
              How can we help?
            </h2>
            <p className="mt-1 text-xs text-ivory-200">
              Our customer care team usually replies within one business day.
            </p>
          </div>

          <div className="grid gap-5 px-5 py-5">
            <div className="grid gap-2 text-sm">
              {business.phone && (
                <a
                  href={`tel:${tel}`}
                  className="flex items-center justify-between text-ivory-200 transition-colors hover:text-champagne"
                >
                  <span>Call us</span>
                  <span className="text-ivory">{business.phone}</span>
                </a>
              )}
              <a
                href={`mailto:${business.email}`}
                className="flex items-center justify-between gap-3 text-ivory-200 transition-colors hover:text-champagne"
              >
                <span>Email</span>
                <span className="truncate text-ivory">{business.email}</span>
              </a>
            </div>

            <ul className="hairline grid gap-2 border-t pt-4 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-ivory-200 transition-colors hover:text-champagne"
                  >
                    {link.label} →
                  </a>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit} className="hairline grid gap-3 border-t pt-4">
              <p className="brand-eyebrow text-[0.5rem] text-taupe">Send us a message</p>
              <label className="sr-only" htmlFor="support-name">Name</label>
              <input
                id="support-name"
                name="name"
                required
                autoComplete="name"
                placeholder="Your name"
                className={fieldClass}
              />
              <label className="sr-only" htmlFor="support-email">Email</label>
              <input
                id="support-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="your@email.com"
                className={fieldClass}
              />
              <label className="sr-only" htmlFor="support-message">Message</label>
              <textarea
                id="support-message"
                name="message"
                required
                rows={3}
                placeholder="How can we help?"
                className={`${fieldClass} resize-y`}
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="brand-eyebrow mt-1 bg-plum px-6 py-3 text-[0.625rem] text-ivory transition-colors hover:bg-plum-600 disabled:opacity-60"
              >
                {status === "submitting" ? "Sending" : "Send message"}
              </button>
              <p
                aria-live="polite"
                className={`text-xs ${status === "error" ? "text-mauve" : "text-taupe"}`}
              >
                {message ||
                  "For account, order and billing questions. We cannot give individual medical advice — in an emergency, call 911."}
              </p>
            </form>
          </div>
        </div>
      )}

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="support-panel"
        aria-label={open ? "Close customer service" : "Open customer service"}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-champagne/60 bg-plum text-ivory shadow-lg shadow-black/50 transition-colors hover:bg-plum-600"
      >
        {open ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path
              d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5z"
              strokeLinejoin="round"
            />
            <path d="M8.5 9.5h.01M12 9.5h.01M15.5 9.5h.01" strokeLinecap="round" strokeWidth="2.2" />
          </svg>
        )}
      </button>
    </div>
  );
}
