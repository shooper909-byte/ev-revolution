"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { marketingConsent, serviceInterests, stateCodes } from "@/lib/affirmingCare";
import styles from "@/app/gender-affirming-care/affirming.module.css";

export function AffirmingEarlyAccessForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const resultRef = useRef<HTMLParagraphElement>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/early-access", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: data.get("firstName"), email: data.get("email"), state: data.get("state"), serviceInterest: data.get("serviceInterest"), marketingConsent: data.get("marketingConsent") === "on", company: data.get("company") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "We could not complete your signup. Please try again.");
      setStatus("success");
      setMessage(result.message);
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not complete your signup. Please try again.");
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  return <form onSubmit={submit} className={styles.form} aria-busy={status === "submitting"}>
    <div className={styles.formGrid}>
      <label>First name <span aria-hidden="true">*</span><input name="firstName" autoComplete="given-name" required maxLength={60} /></label>
      <label>Email address <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      <label>State <span>(optional)</span><select name="state" defaultValue=""><option value="">Select your state</option>{stateCodes.map(state => <option key={state} value={state}>{state}</option>)}</select></label>
      <label>Service interest <span>(optional)</span><select name="serviceInterest" defaultValue=""><option value="">Choose an interest</option>{serviceInterests.map(interest => <option key={interest}>{interest}</option>)}</select></label>
    </div>
    <div className={styles.honeypot} aria-hidden="true"><label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label></div>
    <p className={styles.formHint}>For launch updates only. Please do not share medical history, diagnoses, gender identity, or medications. Choosing an interest is optional and does not establish eligibility.</p>
    <label className={styles.consent}><input type="checkbox" name="marketingConsent" required /><span>{marketingConsent} Read our <Link href="/privacy-policy">Privacy Policy</Link> and <Link href="/terms-of-service">Terms</Link>.</span></label>
    <button className={styles.goldButton} type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Joining…" : "Join the early access list"}<span aria-hidden="true">→</span></button>
    <p className={styles.formHint}>No payment. No SMS enrollment. Registration is not a request for treatment.</p>
    <p ref={resultRef} tabIndex={-1} role={status === "error" ? "alert" : "status"} aria-live="polite" className={status === "error" ? styles.formError : styles.formResult}>{message}</p>
  </form>;
}
