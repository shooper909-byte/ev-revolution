import { NextResponse } from "next/server";
import { getCareProgram } from "@/lib/carePrograms";
import { forwardTo, isValidEmail } from "@/lib/forward";

/* ------------------------------------------------------------------
   Assessment leads from the care subscription pages.
   Serves /care/weight-management and /care/hormones-menopause.

   The clinical intake vendor is not wired up yet, so these leads go through
   the site's existing secure workflow: an HTTPS webhook, server side, the
   same mechanism the contact and newsletter forms use. Nothing is stored in
   this app and nothing is emailed from the browser.

   Only contact details and one area of interest are accepted. Symptoms,
   medications, menstrual or surgical history and anything else clinical stay
   out of this route by construction — they belong in the secure clinical
   assessment — and none of it reaches an analytics destination.
   ------------------------------------------------------------------ */

type LeadBody = {
  program?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  mobile?: unknown;
  state?: unknown;
  interest?: unknown;
  plan?: unknown;
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

  const program = getCareProgram(body?.program);
  if (!program) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const firstName = text(body?.firstName, 80);
  const lastName = text(body?.lastName, 80);
  const mobile = text(body?.mobile, 32);
  const state = text(body?.state, 2).toUpperCase();
  const interest = text(body?.interest, 60);
  const plan = text(body?.plan, 60);

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

  if (!program.interests.includes(interest)) {
    return NextResponse.json(
      { message: "Please choose the option that fits you best." },
      { status: 400 },
    );
  }

  // A programme that offers a preferred-plan question requires one of its own
  // options; a programme that does not ask cannot have one smuggled in.
  if (program.plans ? !program.plans.includes(plan) : plan) {
    return NextResponse.json(
      { message: "Please choose the plan that fits you best." },
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
    process.env.EV_CARE_LEAD_WEBHOOK_URL ?? process.env.EV_CONTACT_WEBHOOK_URL;

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
    type: "care-lead",
    program: program.label,
    firstName,
    lastName,
    email: body.email,
    mobile,
    state,
    interest,
    ...(plan ? { plan } : {}),
    consent: true,
    source: program.source,
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
