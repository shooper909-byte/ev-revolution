/**
 * Brevo (formerly Sendinblue) contact capture.
 *
 * Every email capture on the site — footer, journal, the site-wide popup —
 * lands here. Addresses go straight from this server route into Brevo over
 * HTTPS; nothing is stored in this app and the API key never reaches the
 * browser.
 *
 * Brevo is optional by design. With BREVO_API_KEY unset the caller falls back
 * to the existing webhook path, and if neither is configured the visitor is
 * told the form is not connected rather than being shown a fake success.
 */

const API_BASE = "https://api.brevo.com/v3";
const TIMEOUT_MS = 8_000;

/** Where a capture happened. Each source can route to its own Brevo list. */
export type CaptureSource = "footer" | "journal" | "popup" | "site";

export const CAPTURE_SOURCES: readonly CaptureSource[] = [
  "footer",
  "journal",
  "popup",
  "site",
];

export function isCaptureSource(value: unknown): value is CaptureSource {
  return (
    typeof value === "string" &&
    (CAPTURE_SOURCES as readonly string[]).includes(value)
  );
}

export type BrevoResult =
  | { ok: true; alreadySubscribed: boolean; pendingConfirmation: boolean }
  | { ok: false; status: number; message: string };

export function isBrevoConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY);
}

/**
 * Lists the contact joins, most specific first: a per-source list when one is
 * configured (BREVO_LIST_ID_POPUP and friends), otherwise the default list.
 */
function listIdsFor(source: CaptureSource): number[] {
  const perSource = process.env[`BREVO_LIST_ID_${source.toUpperCase()}`];
  const ids = parseListIds(perSource) ?? parseListIds(process.env.BREVO_LIST_ID);
  return ids ?? [];
}

function parseListIds(raw: string | undefined): number[] | null {
  if (!raw) return null;
  const ids = raw
    .split(",")
    .map((part) => Number.parseInt(part.trim(), 10))
    .filter((id) => Number.isInteger(id) && id > 0);
  return ids.length > 0 ? ids : null;
}

/**
 * Custom attributes have to exist in Brevo before a contact can carry them —
 * `npm run brevo:setup` creates them. Until they do, BREVO_SOURCE_ATTRIBUTE and
 * BREVO_CONSENT_ATTRIBUTE stay unset and we send the built-in fields only.
 */
function buildAttributes(input: SubscribeInput): Record<string, string> {
  const attributes: Record<string, string> = {};

  if (input.firstName) attributes.FIRSTNAME = input.firstName;

  const sourceAttribute = process.env.BREVO_SOURCE_ATTRIBUTE;
  if (sourceAttribute) attributes[sourceAttribute] = input.source;

  const consentAttribute = process.env.BREVO_CONSENT_ATTRIBUTE;
  if (consentAttribute) attributes[consentAttribute] = input.submittedAt;

  return attributes;
}

export type SubscribeInput = {
  email: string;
  firstName?: string;
  source: CaptureSource;
  submittedAt: string;
};

type BrevoError = { code?: string; message?: string };

export async function subscribeToBrevo(
  input: SubscribeInput,
): Promise<BrevoResult> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      message: "This form is not connected to Brevo yet.",
    };
  }

  const listIds = listIdsFor(input.source);
  if (listIds.length === 0) {
    // Landing a contact in no list at all looks like a success and behaves
    // like a leak, so refuse loudly in the logs instead.
    console.error(
      `[brevo] no list configured for source "${input.source}" — set BREVO_LIST_ID`,
    );
    return {
      ok: false,
      status: 503,
      message:
        "This form is not connected to a mailing list yet. Please try again later.",
    };
  }

  const attributes = buildAttributes(input);
  const firstAttempt = await send(apiKey, input, listIds, attributes);

  // A custom attribute that does not exist in Brevo yet should cost us the
  // attribute, not the subscriber: retry once with the built-in fields only.
  if (
    !firstAttempt.ok &&
    firstAttempt.retryWithoutAttributes &&
    Object.keys(attributes).length > 0
  ) {
    console.warn(
      "[brevo] contact attributes rejected, retrying without them:",
      firstAttempt.detail,
    );
    const minimal: Record<string, string> = input.firstName
      ? { FIRSTNAME: input.firstName }
      : {};
    const retry = await send(apiKey, input, listIds, minimal);
    return retry.result;
  }

  return firstAttempt.result;
}

type SendOutcome =
  | { ok: true; result: BrevoResult }
  | {
      ok: false;
      result: BrevoResult;
      retryWithoutAttributes: boolean;
      detail: string;
    };

async function send(
  apiKey: string,
  input: SubscribeInput,
  listIds: number[],
  attributes: Record<string, string>,
): Promise<SendOutcome> {
  const doubleOptIn = doubleOptInConfig();

  const endpoint = doubleOptIn
    ? `${API_BASE}/contacts/doubleOptinConfirmation`
    : `${API_BASE}/contacts`;

  const payload = doubleOptIn
    ? {
        email: input.email,
        attributes,
        includeListIds: listIds,
        templateId: doubleOptIn.templateId,
        redirectionUrl: doubleOptIn.redirectionUrl,
      }
    : {
        email: input.email,
        attributes,
        listIds,
        updateEnabled: true,
      };

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    console.error("[brevo] request failed:", error);
    return {
      ok: false,
      retryWithoutAttributes: false,
      detail: String(error),
      result: {
        ok: false,
        status: 502,
        message: "We could not reach our email provider. Please try again shortly.",
      },
    };
  }

  if (response.ok) {
    return {
      ok: true,
      result: {
        ok: true,
        alreadySubscribed: false,
        pendingConfirmation: Boolean(doubleOptIn),
      },
    };
  }

  const error = await readError(response);
  const detail = `${response.status} ${error.code ?? ""} ${error.message ?? ""}`.trim();

  // Brevo reports an existing contact as a 400. Confirming a subscription
  // someone already has is not a failure the visitor should see.
  if (response.status === 400 && isDuplicate(error)) {
    return {
      ok: true,
      result: { ok: true, alreadySubscribed: true, pendingConfirmation: false },
    };
  }

  console.error("[brevo] contact create failed:", detail);

  return {
    ok: false,
    retryWithoutAttributes: response.status === 400 && isAttributeProblem(error),
    detail,
    result: {
      ok: false,
      status: 502,
      message: "We could not complete your signup. Please try again shortly.",
    },
  };
}

function doubleOptInConfig(): { templateId: number; redirectionUrl: string } | null {
  const templateId = Number.parseInt(
    process.env.BREVO_DOI_TEMPLATE_ID ?? "",
    10,
  );
  const redirectionUrl = process.env.BREVO_DOI_REDIRECT_URL;

  if (!Number.isInteger(templateId) || templateId <= 0) return null;
  if (!redirectionUrl?.startsWith("https://")) return null;

  return { templateId, redirectionUrl };
}

async function readError(response: Response): Promise<BrevoError> {
  try {
    return (await response.json()) as BrevoError;
  } catch {
    return {};
  }
}

function isDuplicate(error: BrevoError): boolean {
  if (error.code === "duplicate_parameter") return true;
  return /already (exist|associated|subscribed)/i.test(error.message ?? "");
}

function isAttributeProblem(error: BrevoError): boolean {
  return /attribute/i.test(error.message ?? "");
}
