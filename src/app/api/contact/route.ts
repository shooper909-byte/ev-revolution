import { NextResponse } from "next/server";
import { forwardTo, isValidEmail } from "@/lib/forward";

type ContactBody = {
  name?: unknown;
  email?: unknown;
  topic?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  let body: ContactBody | null;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const topic = typeof body?.topic === "string" ? body.topic : "General";

  if (!name || !message || !isValidEmail(body?.email)) {
    return NextResponse.json(
      { message: "Please complete every field with a valid email address." },
      { status: 400 },
    );
  }

  const result = await forwardTo(process.env.EV_CONTACT_WEBHOOK_URL, {
    type: "contact",
    name,
    email: body.email,
    topic,
    message,
    submittedAt: new Date().toISOString(),
  });

  if (!result.ok) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json({ message: "Thank you — we'll be in touch." });
}
