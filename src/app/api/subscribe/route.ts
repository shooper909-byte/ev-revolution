import { NextResponse } from "next/server";
import {
  isBrevoConfigured,
  isCaptureSource,
  subscribeToBrevo,
  type CaptureSource,
} from "@/lib/brevo";
import { forwardTo, isValidEmail } from "@/lib/forward";
import { clientKey, rateLimit } from "@/lib/rateLimit";

/* ------------------------------------------------------------------
   Newsletter and popup email capture.

   Addresses go to Brevo when BREVO_API_KEY is configured, and to the legacy
   webhook otherwise, so the site keeps working through the switchover. The
   capture source travels with the address so list membership and reporting can
   tell a footer signup from a popup one.
   ------------------------------------------------------------------ */

export const runtime = "nodejs";

type SubscribeBody = {
  email?: unknown;
  firstName?: unknown;
  source?: unknown;
  /** Honeypot. Real visitors never see this field, so anything in it is a bot. */
  company?: unknown;
};

const SUCCESS = "You're on the list.";

export async function POST(request: Request) {
  let body: SubscribeBody | null;
  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  // Bots get the same reply a human gets, and nothing is sent anywhere.
  if (typeof body?.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ message: SUCCESS });
  }

  const email = body?.email;
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const limit = rateLimit(clientKey(request));
  if (!limit.allowed) {
    return NextResponse.json(
      { message: "Too many attempts. Please try again in a minute." },
      { status: 429, headers: { "retry-after": String(limit.retryAfter) } },
    );
  }

  const source: CaptureSource = isCaptureSource(body?.source)
    ? body.source
    : "site";
  const firstName =
    typeof body?.firstName === "string"
      ? body.firstName.trim().slice(0, 60)
      : "";
  const submittedAt = new Date().toISOString();

  if (isBrevoConfigured()) {
    const result = await subscribeToBrevo({
      email,
      firstName: firstName || undefined,
      source,
      submittedAt,
    });

    if (!result.ok) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status },
      );
    }

    if (result.pendingConfirmation) {
      return NextResponse.json({
        message: "Almost there — check your inbox to confirm.",
      });
    }

    return NextResponse.json({
      message: result.alreadySubscribed ? "You're already on the list." : SUCCESS,
    });
  }

  const result = await forwardTo(process.env.EV_NEWSLETTER_WEBHOOK_URL, {
    type: "newsletter",
    email,
    firstName: firstName || undefined,
    source,
    submittedAt,
  });

  if (!result.ok) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json({ message: SUCCESS });
}
