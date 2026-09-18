import { NextResponse } from "next/server";
import { forwardTo, isValidEmail } from "@/lib/forward";

/* ------------------------------------------------------------------
   Weight-care assessment leads.
   Handles /care/weight-management#get-started.

   The clinical intake vendor is not wired up yet, so the lead goes through
   the site's existing secure workflow: an HTTPS webhook, server side, the
   same mechanism the contact and newsletter forms use. Nothing is stored in
   this app and nothing is emailed from the browser.

   Only contact details are accepted. `interest` names a subscription tier,
   not a condition or a medication, so no health information passes through
   here — and none of it reaches an analytics destination.
   ------------------------------------------------------------------ */

const interests = [
  "Oral Weight Care",
  "GLP-1 Care",
  "Complete Weight Care",
  "I am not sure",
];

type LeadBody = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  mobile?: unknown;
  state?: unknown;
  interest?: unknown;
  consent?: unknown;
};

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/** At least 10 digits, so a real mobile number rather than a stray keystroke. */
const hasEnoughDigits = (value: string) => (value.match(/\d/g) ?? []).length >= 10;

export async function POST(request: Request) {
  let body: LeadBody | null;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const firstName = text(body?.firstName, 80);
  const lastName = text(body?.lastName, 80);
  const mobile = text(body?.mobile, 32);
  const state = text(body?.state, 2).toUpperCase();
  const interest = text(body?.interest, 40);

  if (!firstName || !lastName || !isValidEmail(body?.email)) {
    return NextResponse.json(
      { message: "Please add your name and a valid email address." },
      { status: 400 },
    );
  }

  if (!hasEnoughDigits(mobile)) {
    return NextResponse.json(
      { message: "Please add a mobile number we can reach you on." },
      { status: 400 },
    );
  }

  if (!/^[A-Z]{2}$/.test(state)) {
    return NextResponse.json(
      { message: "Please select the state where you live." },
      { status: 400 },
    );
  }

  if (!interests.includes(interest)) {
    return NextResponse.json(
      { message: "Please choose which plan you are interested in." },
      { status: 400 },
    );
  }

  if (body?.consent !== true) {
    return NextResponse.json(
      { message: "Please confirm we may contact you about your assessment." },
      { status: 400 },
    );
  }

  const webhook =
    process.env.EV_WEIGHT_CARE_WEBHOOK_URL ?? process.env.EV_CONTACT_WEBHOOK_URL;

  // A lead carrying a name, an email and a phone number never leaves over
  // plain HTTP, whatever a misconfigured environment asks for. A loopback
  // address is the one exception, so the workflow can be exercised locally.
  const isLoopback = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(
    webhook ?? "",
  );

  if (webhook && !webhook.startsWith("https://") && !isLoopback) {
    return NextResponse.json(
      { message: "We could not submit your request. Please try again shortly." },
      { status: 500 },
    );
  }

  const result = await forwardTo(webhook, {
    type: "weight-care-lead",
    firstName,
    lastName,
    email: body.email,
    mobile,
    state,
    interest,
    consent: true,
    source: "/care/weight-management",
    submittedAt: new Date().toISOString(),
  });

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  return NextResponse.json({
    message:
      "Your request is with our care team. We will email you a secure link to complete your clinical assessment.",
  });
}
