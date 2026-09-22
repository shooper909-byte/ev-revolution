"use client";

import { useCallback, useState } from "react";
import type { CaptureSource } from "@/lib/brevo";

export type CaptureStatus = "idle" | "submitting" | "success" | "error";

/**
 * The submit half of every email capture on the site, so the footer, the
 * journal and the popup behave identically: same endpoint, same honeypot, same
 * wording when something goes wrong.
 */
export function useEmailCapture(source: CaptureSource) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<CaptureStatus>("idle");
  const [message, setMessage] = useState("");
  /** Honeypot value — bound to a field kept out of the accessibility tree. */
  const [company, setCompany] = useState("");

  const submit = useCallback(async () => {
    if (status === "submitting") return false;
    setStatus("submitting");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source, company }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
      };

      if (response.ok) {
        setStatus("success");
        setMessage(data.message ?? "You're on the list.");
        setEmail("");
        return true;
      }

      setStatus("error");
      setMessage(data.message ?? "Something went wrong.");
      return false;
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      return false;
    }
  }, [company, email, source, status]);

  return {
    email,
    setEmail,
    status,
    message,
    company,
    setCompany,
    submit,
  };
}

/** Shared props for the hidden honeypot input. */
export const honeypotProps = {
  type: "text" as const,
  name: "company",
  tabIndex: -1,
  autoComplete: "off",
  "aria-hidden": true as const,
  className:
    "pointer-events-none absolute left-[-9999px] h-px w-px opacity-0" as const,
};
