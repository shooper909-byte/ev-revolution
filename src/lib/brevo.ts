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
export type CaptureSource =
  | "footer"
  | "journal"
  | "popup"
  | "site"
  | "waitlist"
  | "early_access"
  // evevolutionwellness.us landing pages, one per campaign
  | "us_weight"
  | "us_menopause"
  | "us_longevity"
  | "us_eves_secret";

export const CAPTURE_SOURCES: readonly CaptureSource[] = [
  "footer",
  "journal",
  "popup",
  "site",
  "waitlist",
  "early_access",
  "us_weight",
  "us_menopause",
  "us_longevity",
  "us_eves_secret",
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
  const perSource = process.env[`BREVO_LIST_ID_${source.toUpperCase()}`] || (source === "early_access" ? process.env.BREVO_LIST_ID_WAITLIST : undefined);
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

  if (input.source === "early_access" && input.marketingConsent) {
    attributes.EVS_SIGNUP_SOURCE = "gender-affirming-care-early-access";
    attributes.EVS_CONSENT_AT = input.submittedAt;
    attributes.EVS_CONSENT_TEXT = input.marketingConsent.text;
    attributes.EVS_CONSENT_VERSION = input.marketingConsent.version;
    // Do not erase previously supplied preferences when optional fields are blank.
    if (input.state) attributes.EVS_EARLY_ACCESS_STATE = input.state;
    if (input.serviceInterest) attributes.EVS_SERVICE_INTEREST = input.serviceInterest;
  }

  return attributes;
}

export type SubscribeInput = {
  email: string;
  firstName?: string;
  source: CaptureSource;
  submittedAt: string;
  state?: string;
  serviceInterest?: string;
  marketingConsent?: { text: string; version: string };
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
  if (input.source === "early_access") {
    if (!input.marketingConsent) return { ok: false, status: 400, message: "Marketing consent is required for early-access emails." };
    // Provision only this form's namespaced text fields. Never silently discard
    // consent metadata if the provider rejects an attribute.
    const ready = await ensureEarlyAccessAttributes(apiKey);
    if (!ready) return { ok: false, status: 503, message: "Signup is temporarily unavailable. Please try again later." };
  }
  const firstAttempt = await send(apiKey, input, listIds, attributes);

  // A custom attribute that does not exist in Brevo yet should cost us the
  // attribute, not the subscriber: retry once with the built-in fields only.
  if (
    !firstAttempt.ok &&
    input.source !== "early_access" &&
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

let earlyAccessAttributesReady = false;
async function ensureEarlyAccessAttributes(apiKey: string): Promise<boolean> {
  if (earlyAccessAttributesReady) return true;
  const names = ["EVS_SIGNUP_SOURCE", "EVS_CONSENT_AT", "EVS_CONSENT_TEXT", "EVS_CONSENT_VERSION", "EVS_EARLY_ACCESS_STATE", "EVS_SERVICE_INTEREST"];
  const headers = { "api-key": apiKey, "content-type": "application/json", accept: "application/json" };
  try {
    const current = await fetch(`${API_BASE}/contacts/attributes`, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!current.ok) return false;
    const body = await current.json() as { attributes?: { name: string; category: string; type: string }[] };
    for (const name of names) {
      const existing = body.attributes?.find(attribute => attribute.name === name);
      if (existing) { if (existing.type !== "text" || existing.category !== "normal") return false; continue; }
      const created = await fetch(`${API_BASE}/contacts/attributes/normal/${name}`, { method: "POST", headers, body: JSON.stringify({ type: "text" }), signal: AbortSignal.timeout(TIMEOUT_MS) });
      // A concurrent request may have created the same attribute; a later
      // submission can retry safely, without accepting incomplete consent.
      if (!created.ok) return false;
    }
    earlyAccessAttributesReady = true;
    return true;
  } catch { return false; }
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
    if (input.source === "early_access" && !doubleOptIn) {
      // Confirm the saved list and consent, including updates to an existing
      // contact. A provider write response alone is not proof of enrollment.
      try {
        const saved = await fetch(`${API_BASE}/contacts/${encodeURIComponent(input.email)}`, {
          headers: { accept: "application/json", "api-key": apiKey },
          cache: "no-store", signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        if (!saved.ok) throw new Error("Contact readback failed");
        const contact = await saved.json() as { listIds?: number[]; attributes?: Record<string, string> };
        if (!listIds.every(id => contact.listIds?.includes(id)) ||
            !Object.entries(attributes).every(([key, value]) => contact.attributes?.[key] === value)) {
          throw new Error("Saved membership or consent did not match");
        }
        console.info("[brevo] early-access list membership and consent verified");
      } catch {
        return { ok: false, retryWithoutAttributes: false, detail: "Enrollment verification failed", result: { ok: false, status: 502, message: "We could not confirm your signup. Please try again shortly." } };
      }
    }
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
  if (response.status === 400 && isDuplicate(error) && input.source !== "early_access") {
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
