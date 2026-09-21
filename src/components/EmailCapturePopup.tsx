"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { honeypotProps, useEmailCapture } from "@/components/emailCapture";

/* ------------------------------------------------------------------
   The site-wide email capture.

   It opens on whichever comes first: exit intent, half the page scrolled, or a
   long dwell. It opens once. Someone who closes it is left alone for a month,
   and someone who subscribes never sees it again — the list is worth more than
   the impression.

   Pages whose whole purpose is a form of their own are excluded, so the popup
   never covers the thing the visitor came to fill in.
   ------------------------------------------------------------------ */

const STORAGE_KEY = "evs:email-capture";
const DISMISS_DAYS = 30;
const DWELL_MS = 30_000;
const SCROLL_TRIGGER = 0.5;

/** Routes where a capture form is already the primary action. */
const EXCLUDED_PATHS = [
  "/contact",
  "/care/weight-management",
  "/care/hormones-menopause",
];

type Suppression = { state: "dismissed" | "subscribed"; at: number };

function readSuppression(): Suppression | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Suppression>;
    if (parsed.state !== "dismissed" && parsed.state !== "subscribed") {
      return null;
    }
    return { state: parsed.state, at: Number(parsed.at) || 0 };
  } catch {
    // Private browsing, blocked storage, corrupt value: fall through and show
    // the popup rather than failing closed on a broken read.
    return null;
  }
}

function writeSuppression(state: Suppression["state"]) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ state, at: Date.now() }),
    );
  } catch {
    /* Nothing to do — worst case the popup returns next visit. */
  }
}

function isSuppressed(): boolean {
  const record = readSuppression();
  if (!record) return false;
  if (record.state === "subscribed") return true;
  return Date.now() - record.at < DISMISS_DAYS * 24 * 60 * 60 * 1000;
}

export function EmailCapturePopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  const headingId = `capture-title-${useId().replace(/:/g, "")}`;
  const { email, setEmail, status, message, company, setCompany, submit } =
    useEmailCapture("popup");

  const close = useCallback((reason: "dismissed" | "subscribed") => {
    writeSuppression(reason);
    setVisible(false);
    setOpen(false);
  }, []);

  /* Arm the triggers once per page view, unless the popup is already up, the
     visitor has already answered it, or the page owns its own form. */
  useEffect(() => {
    if (open) return;
    if (EXCLUDED_PATHS.some((path) => pathname?.startsWith(path))) return;
    if (isSuppressed()) return;

    let cancelled = false;

    const trigger = () => {
      if (cancelled) return;
      cancelled = true;
      cleanup();
      setOpen(true);
    };

    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= SCROLL_TRIGGER) trigger();
    };

    // Exit intent only makes sense with a cursor; on touch the dwell and
    // scroll triggers do the work.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const onMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget === null && event.clientY <= 0) trigger();
    };

    const timer = window.setTimeout(trigger, DWELL_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (finePointer) document.addEventListener("mouseout", onMouseOut);

    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    }

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [open, pathname]);

  /* Open: lock the page, move focus in, and animate on the next frame. */
  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      setVisible(true);
      inputRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      restoreFocusTo.current?.focus?.();
    };
  }, [open]);

  /* Escape closes; Tab stays inside the dialog. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close("dismissed");
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close, open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subscribed = await submit();
    if (subscribed) {
      // Let the confirmation be read before the dialog goes away.
      window.setTimeout(() => close("subscribed"), 2_600);
    }
  }

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[90] flex items-end justify-center bg-onyx/80 p-4 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none sm:items-center ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close("dismissed");
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className={`hairline relative w-full max-w-lg border bg-onyx-900 p-8 shadow-2xl transition-all duration-300 motion-reduce:transition-none sm:p-12 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => close("dismissed")}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-2xl leading-none text-taupe transition-colors hover:text-ivory focus-visible:text-ivory focus-visible:outline-none"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <p className="brand-eyebrow text-champagne">Eve&rsquo;s Sisters</p>
        <h2
          id={headingId}
          className="mt-5 font-display text-3xl leading-tight text-ivory sm:text-4xl"
        >
          Some things are better
          <br />
          <em>shared between sisters.</em>
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-ivory-200/85">
          Evidence-led guidance on hormones, metabolism, skin and longevity —
          written for the questions women actually ask. One email at a time, no
          spam, unsubscribe whenever.
        </p>

        <form
          onSubmit={handleSubmit}
          aria-busy={status === "submitting"}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="capture-popup-email" className="sr-only">
            Email address
          </label>
          <input
            ref={inputRef}
            id="capture-popup-email"
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
            disabled={status === "submitting" || status === "success"}
            className="brand-eyebrow shrink-0 bg-plum px-7 py-3.5 text-[0.625rem] text-ivory transition-colors hover:bg-plum-600 disabled:opacity-60"
          >
            {status === "submitting" ? "Sending" : "Join"}
          </button>
        </form>

        <p
          aria-live="polite"
          role={status === "error" ? "alert" : "status"}
          className={`mt-4 text-sm ${
            status === "error" ? "text-mauve" : "text-taupe"
          }`}
        >
          {message ||
            "Eve’s Sisters publishes general wellness education, not medical advice."}
        </p>

        <button
          type="button"
          onClick={() => close("dismissed")}
          className="mt-6 text-xs text-taupe-700 underline underline-offset-4 transition-colors hover:text-taupe"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
