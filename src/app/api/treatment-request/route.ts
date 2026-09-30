import { NextResponse } from "next/server";
import { getLaunchCareCategory, getLaunchCareRequestOption } from "@/lib/launchCare";
import { forwardTo, isValidEmail } from "@/lib/forward";
import { clientKey, rateLimit } from "@/lib/rateLimit";

type TreatmentRequestBody = {
  category?: unknown;
  plan?: unknown;
  billing?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  mobile?: unknown;
  state?: unknown;
  consent?: unknown;
};

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const hasEnoughDigits = (value: string) => (value.match(/\d/g) ?? []).length >= 10;

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request));
  if (!limit.allowed) {
    return NextResponse.json(
      { message: "Please wait a moment before trying again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: TreatmentRequestBody | null;
  try {
    body = (await request.json()) as TreatmentRequestBody;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const category = getLaunchCareCategory(body?.category);
  const requestOption = category
    ? getLaunchCareRequestOption(category, body?.plan)
    : undefined;
  const firstName = text(body?.firstName, 80);
  const lastName = text(body?.lastName, 80);
  const mobile = text(body?.mobile, 32);
  const state = text(body?.state, 2).toUpperCase();
  const billing = body?.billing === "prepaid" ? "three months prepaid" : body?.billing === "monthly" ? "month to month" : "";

  if (!category || !requestOption || !billing || (category.slug === "eves-secret" && billing !== "month to month")) {
    return NextResponse.json({ message: "Please choose a valid treatment request." }, { status: 400 });
  }

  if (!firstName || !lastName || !isValidEmail(body?.email)) {
    return NextResponse.json({ message: "Please add your name and a valid email address." }, { status: 400 });
  }

  if (!hasEnoughDigits(mobile)) {
    return NextResponse.json({ message: "Please add a mobile number we can reach you on." }, { status: 400 });
  }

  if (!/^[A-Z]{2}$/.test(state)) {
    return NextResponse.json({ message: "Please select the state where you live." }, { status: 400 });
  }

  if (body?.consent !== true) {
    return NextResponse.json({ message: "Please confirm that we may contact you about this request." }, { status: 400 });
  }

  const webhook = process.env.EV_TREATMENT_REQUEST_WEBHOOK_URL ?? process.env.EV_CARE_LEAD_WEBHOOK_URL ?? process.env.EV_CONTACT_WEBHOOK_URL;
  const isLoopback = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(webhook ?? "");
  if (!webhook) {
    return NextResponse.json(
      { message: "Treatment requests are temporarily unavailable. Please contact our team through the Contact page for next steps. Do not share medical information there." },
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
    type: "treatment-request",
    category: category.label,
    requestedPlan: requestOption.title,
    requestType: requestOption.kind,
    billingPreference: category.slug === "eves-secret" ? "one consultation" : billing,
    firstName,
    lastName,
    email: body.email,
    mobile,
    state,
    consent: true,
    source: category.path,
    submittedAt: new Date().toISOString(),
  });

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  return NextResponse.json({
    message: "We received your nonclinical treatment request. We will email your secure clinical-assessment link and the next steps for your selected plan.",
  });
}
