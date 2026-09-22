import { NextResponse } from "next/server";
import { getCareProgram } from "@/lib/carePrograms";
import { forwardTo, isValidEmail } from "@/lib/forward";

/* ------------------------------------------------------------------
   Assessment leads from the care subscription pages.
   Serves the care pages, including the contact-only Energy Care waitlist.

   The clinical intake vendor is not wired up yet, so these leads go through
   the site's existing secure workflow: an HTTPS webhook, server side, the
   same mechanism the contact and newsletter forms use. Nothing is stored in
   this app and nothing is emailed from the browser.

   Only the fields rendered by each approved form are accepted. Energy Care
   collects contact details only; symptoms, medications and medical history
   remain outside this route and never reach an analytics destination.
   ------------------------------------------------------------------ */

type LeadBody = {
  program?: unknown;
  name?: unknown;
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

  const energyWaitlist = program.source === "/care/energy-performance";
  const submittedName = text(body?.name, 160);
  const nameParts = submittedName.split(/\s+/).filter(Boolean);
  const firstName = energyWaitlist ? (nameParts[0] ?? "") : text(body?.firstName, 80);
  const lastName = energyWaitlist ? nameParts.slice(1).join(" ") : text(body?.lastName, 80);
  const mobile = text(body?.mobile, 32);
  const state = text(body?.state, 2).toUpperCase();
  const interest = text(body?.interest, 60);
  const plan = text(body?.plan, 60);

  if ((energyWaitlist ? !submittedName : !firstName || !lastName) || !isValidEmail(body?.email)) {
    return NextResponse.json(
      { message: "Please add your name and a valid email address." },
      { status: 400 },
    );
  }

  if ((!energyWaitlist || mobile) && !hasEnoughDigits(mobile)) {
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

  if (!energyWaitlist && !program.interests.includes(interest)) {
    return NextResponse.json(
      { message: "Please choose the option that fits you best." },
      { status: 400 },
    );
  }

  // A programme that offers a preferred-plan question requires one of its own
  // options; a programme that does not ask cannot have one smuggled in.
  if (!energyWaitlist && (program.plans ? !program.plans.includes(plan) : plan)) {
    return NextResponse.json(
      { message: "Please choose the plan that fits you best." },
      { status: 400 },
    );
  }

  if (body?.consent !== true) {
    return NextResponse.json(
      { message: "Please confirm we may contact you about this request." },
      { status: 400 },
    );
  }

  const webhook =
    process.env.EV_CARE_LEAD_WEBHOOK_URL ?? process.env.EV_CONTACT_WEBHOOK_URL;
  const availableStates = new Set(
    (process.env.EV_WEIGHT_CARE_STATES ?? "")
      .split(",")
      .map((code) => code.trim().toUpperCase())
      .filter((code) => /^[A-Z]{2}$/.test(code)),
  );
  const waitlist =
    energyWaitlist ||
    (program.source === "/care/weight-management" && !availableStates.has(state));

  // A lead carrying a name, an email and a phone number never leaves over
  // plain HTTP, whatever a misconfigured environment asks for. A loopback
  // address is the one exception, so the workflow can be exercised locally.
  const isLoopback = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(
    webhook ?? "",
  );

  if (!webhook) {
    return NextResponse.json(
      { message: "Assessment requests are temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  if (!webhook.startsWith("https://") && !isLoopback) {
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
    ...(mobile ? { mobile } : {}),
    state,
    ...(interest ? { interest } : {}),
    ...(plan ? { plan } : {}),
    consent: true,
    availability: waitlist ? "waitlist" : "service-area",
    source: program.source,
    submittedAt: new Date().toISOString(),
  });

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  return NextResponse.json({
    message: energyWaitlist
      ? "Your contact details were saved to the Energy Care waitlist. We will contact you when enrollment becomes available."
      : waitlist
      ? "Your contact request is on the waitlist for your state. We will email you if weight-care services become available there."
      : "Your request is with our care team. We will email you a secure link to complete your clinical assessment.",
  });
}
