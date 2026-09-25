import { business } from "@/lib/business";

/**
 * Forwards a submission to whatever service is configured for it.
 *
 * Nothing is stored by this app. If the destination webhook is not configured,
 * the caller gets an explicit "not connected" result rather than a fake
 * success — a form that silently drops addresses is worse than no form.
 */
export type ForwardResult =
  | { ok: true }
  | { ok: false; status: number; message: string };

export async function forwardTo(
  webhookUrl: string | undefined,
  payload: Record<string, unknown>,
): Promise<ForwardResult> {
  if (!webhookUrl) {
    return {
      ok: false,
      status: 503,
      message: `This form is not connected to a provider yet. Please email ${business.email} in the meantime.`,
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        ok: false,
        status: 502,
        message: "We could not reach our provider. Please try again shortly.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      status: 502,
      message: "We could not reach our provider. Please try again shortly.",
    };
  }
}

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}
