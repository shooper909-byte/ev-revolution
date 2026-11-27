"use client";

import { useEffect, useState } from "react";
import { CONSENT_KEY, META_PIXEL_ID, pixelAllowedOn } from "@/lib/metaPixel";

type Choice = "accepted" | "declined" | null;

function readChoice(): Choice {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Exclude<Choice, null>) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    /* storage blocked: the choice lasts for this page only */
  }
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

function loadPixel(id: string) {
  if (!pixelAllowedOn(window.location.pathname) || window.fbq) return;
  /* Standard Meta loader, without advanced matching. */
  const w = window as unknown as Record<string, unknown>;
  const n = function (...args: unknown[]) {
    const self = n as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[][] };
    if (self.callMethod) self.callMethod(...args);
    else self.queue.push(args);
  } as unknown as { push: unknown; loaded: boolean; version: string; queue: unknown[][] };
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  w.fbq = n;
  if (!w._fbq) w._fbq = n;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  const fbq = w.fbq as (...args: unknown[]) => void;
  fbq("set", "autoConfig", false, id);
  fbq("init", id);
  fbq("track", "PageView");
}

export function CookieConsent() {
  const [choice, setChoice] = useState<Choice>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    const saved = readChoice();
    setChoice(saved);
    setOpen(saved === null);
    if (saved === "accepted") loadPixel(META_PIXEL_ID);
    const reopen = () => setOpen(true);
    window.addEventListener("es-cookie-settings", reopen);
    return () => window.removeEventListener("es-cookie-settings", reopen);
  }, []);

  if (!META_PIXEL_ID || !open) return null;

  const decide = (c: Exclude<Choice, null>) => {
    saveChoice(c);
    setChoice(c);
    setOpen(false);
    if (c === "accepted") loadPixel(META_PIXEL_ID);
    else if (choice === "accepted") window.location.reload();
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie choices"
      className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-xl rounded-lg border border-onyx-700 bg-onyx p-4 text-sm text-ivory-200 shadow-lg"
    >
      <p>
        We use cookies to see how visitors find us and to measure our ads. We never share your health information.{" "}
        <a href="/privacy-policy" className="underline hover:text-champagne">
          Privacy Policy
        </a>
      </p>
      <div className="mt-3 flex gap-3">
        <button type="button" onClick={() => decide("accepted")} className="rounded bg-champagne px-4 py-2 font-medium text-onyx">
          Accept
        </button>
        <button type="button" onClick={() => decide("declined")} className="rounded border border-ivory-200/40 px-4 py-2">
          Decline
        </button>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner. Hidden while the pixel is off. */
export function CookieSettingsLink({ className }: { className?: string }) {
  if (!META_PIXEL_ID) return null;
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("es-cookie-settings"))}>
      Cookie settings
    </button>
  );
}
