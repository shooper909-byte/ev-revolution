import { NextResponse } from "next/server";
import { forwardTo, isValidEmail } from "@/lib/forward";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const email = (body as { email?: unknown } | null)?.email;

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const result = await forwardTo(process.env.EV_NEWSLETTER_WEBHOOK_URL, {
    type: "newsletter",
    email,
    submittedAt: new Date().toISOString(),
  });

  if (!result.ok) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json({ message: "You're on the list." });
}
