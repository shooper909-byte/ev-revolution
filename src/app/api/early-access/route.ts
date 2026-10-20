import { NextResponse } from "next/server";
import { subscribeToBrevo, isBrevoConfigured } from "@/lib/brevo";
import { isValidEmail } from "@/lib/forward";
import { clientKey, rateLimit } from "@/lib/rateLimit";
import { consentVersion, earlyAccessSuccess, marketingConsent, serviceInterests, stateCodes } from "@/lib/affirmingCare";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request));
  if (!limit.allowed) return NextResponse.json({ message: "Too many attempts. Please try again shortly." }, { status: 429, headers: { "retry-after": String(limit.retryAfter) } });
  let body: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 4096) return NextResponse.json({ message: "Please use only the fields in this form." }, { status: 413 });
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch { return NextResponse.json({ message: "Invalid request." }, { status: 400 }); }
  if (typeof body.company === "string" && body.company.trim()) return NextResponse.json({ message: earlyAccessSuccess });
  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!firstName || firstName.length > 60 || !isValidEmail(email) || email.length > 254) return NextResponse.json({ message: "Please enter your first name and a valid email address." }, { status: 400 });
  if (body.marketingConsent !== true) return NextResponse.json({ message: "Please check the marketing-consent box to receive early-access emails." }, { status: 400 });
  const state = typeof body.state === "string" ? body.state : "";
  const serviceInterest = typeof body.serviceInterest === "string" ? body.serviceInterest : "";
  if ((state && !stateCodes.includes(state)) || (serviceInterest && !(serviceInterests as readonly string[]).includes(serviceInterest))) return NextResponse.json({ message: "Please choose a state and service interest from the provided options, or leave them blank." }, { status: 400 });
  if (!isBrevoConfigured()) return NextResponse.json({ message: "Early-access signup is not connected yet. Please try again later." }, { status: 503 });
  const result = await subscribeToBrevo({ email, firstName, source: "early_access", submittedAt: new Date().toISOString(), state: state || undefined, serviceInterest: serviceInterest || undefined, marketingConsent: { text: marketingConsent, version: consentVersion } });
  if (!result.ok) return NextResponse.json({ message: result.message }, { status: result.status });
  return NextResponse.json({ message: result.pendingConfirmation ? "Please check your inbox and confirm your email to finish joining the early-access list." : earlyAccessSuccess, pendingConfirmation: result.pendingConfirmation });
}
