#!/usr/bin/env node
/**
 * One-time Brevo setup for the Eve's Sisters captures.
 *
 * Creates the folder, the lists each capture source writes to, the custom
 * contact attributes the API route stamps on new contacts, the sending
 * identity, and the domain authentication record set. Re-running is safe:
 * anything that already exists is reported and left untouched.
 *
 *   BREVO_API_KEY=xkeysib-... npm run brevo:setup
 *
 * It prints the environment lines to paste into .env.local when it finishes.
 */

const API_BASE = "https://api.brevo.com/v3";
const FOLDER_NAME = "Eve's Sisters";

/** One list per capture source, so reporting can tell them apart. */
const LISTS = [
  { env: "BREVO_LIST_ID", name: "Eve's Sisters — Newsletter" },
  { env: "BREVO_LIST_ID_POPUP", name: "Eve's Sisters — Popup" },
];

const ATTRIBUTES = [
  { env: "BREVO_SOURCE_ATTRIBUTE", name: "EVS_SIGNUP_SOURCE", type: "text" },
  { env: "BREVO_CONSENT_ATTRIBUTE", name: "EVS_CONSENT_AT", type: "text" },
];

/** The address campaigns send from. Brevo emails it a verification link. */
const SENDER = {
  name: process.env.BREVO_SENDER_NAME ?? "Eve's Sisters",
  email: process.env.BREVO_SENDER_EMAIL ?? "customerservice@evevolutionhealth.com",
};

const apiKey = process.env.BREVO_API_KEY;
if (!apiKey) {
  console.error(
    "BREVO_API_KEY is not set.\n" +
      "Create a v3 API key at https://app.brevo.com/settings/keys/api and run:\n" +
      "  BREVO_API_KEY=xkeysib-... npm run brevo:setup",
  );
  process.exit(1);
}

async function call(method, path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const detail = data.message ?? text ?? response.statusText;
    throw new Error(`${method} ${path} → ${response.status}: ${detail}`);
  }

  return data;
}

async function findFolder(name) {
  const { folders = [] } = await call("GET", "/contacts/folders?limit=50&offset=0");
  return folders.find((folder) => folder.name === name) ?? null;
}

async function findList(name) {
  const { lists = [] } = await call("GET", "/contacts/lists?limit=50&offset=0");
  return lists.find((list) => list.name === name) ?? null;
}

async function findSender(email) {
  const { senders = [] } = await call("GET", "/senders");
  return (
    senders.find(
      (sender) => sender.email?.toLowerCase() === email.toLowerCase(),
    ) ?? null
  );
}

async function findDomain(name) {
  const response = await call("GET", "/senders/domains");
  const domains = response.domains ?? response.data ?? [];
  return (
    domains.find(
      (domain) =>
        (domain.domain_name ?? domain.domain ?? domain.name ?? "").toLowerCase() ===
        name.toLowerCase(),
    ) ?? null
  );
}

function printDnsRecords(records) {
  for (const [label, record] of Object.entries(records ?? {})) {
    if (!record?.host_name) continue;
    const state = record.status ? "verified" : "not yet verified";
    console.log(`            ${label} (${state})`);
    console.log(`              host  ${record.host_name}`);
    console.log(`              type  ${record.type ?? "TXT"}`);
    console.log(`              value ${record.value}`);
  }
}

async function existingAttributeNames() {
  const { attributes = [] } = await call("GET", "/contacts/attributes");
  return new Set(attributes.map((attribute) => attribute.name));
}

async function main() {
  const account = await call("GET", "/account");
  console.log(`Connected to Brevo as ${account.email} (${account.companyName}).\n`);

  let folder = await findFolder(FOLDER_NAME);
  if (folder) {
    console.log(`folder    ${FOLDER_NAME} — exists (#${folder.id})`);
  } else {
    const created = await call("POST", "/contacts/folders", { name: FOLDER_NAME });
    folder = { id: created.id, name: FOLDER_NAME };
    console.log(`folder    ${FOLDER_NAME} — created (#${folder.id})`);
  }

  const envLines = [];

  for (const list of LISTS) {
    const found = await findList(list.name);
    if (found) {
      console.log(`list      ${list.name} — exists (#${found.id})`);
      envLines.push(`${list.env}=${found.id}`);
      continue;
    }
    const created = await call("POST", "/contacts/lists", {
      name: list.name,
      folderId: folder.id,
    });
    console.log(`list      ${list.name} — created (#${created.id})`);
    envLines.push(`${list.env}=${created.id}`);
  }

  const present = await existingAttributeNames();
  for (const attribute of ATTRIBUTES) {
    if (present.has(attribute.name)) {
      console.log(`attribute ${attribute.name} — exists`);
    } else {
      await call("POST", `/contacts/attributes/normal/${attribute.name}`, {
        type: attribute.type,
      });
      console.log(`attribute ${attribute.name} — created`);
    }
    envLines.push(`${attribute.env}=${attribute.name}`);
  }

  // Sending identity. Contact capture works without this; campaigns do not.
  const sender = await findSender(SENDER.email);
  if (sender) {
    console.log(`sender    ${SENDER.email} — exists (#${sender.id})`);
  } else {
    const created = await call("POST", "/senders", {
      name: SENDER.name,
      email: SENDER.email,
    });
    console.log(`sender    ${SENDER.email} — created (#${created.id})`);
    console.log(
      `            Brevo has emailed a verification link to ${SENDER.email}.`,
    );
    console.log("            The sender cannot be used until it is clicked.");
  }

  // Domain authentication is what keeps campaigns out of spam folders. It
  // needs DNS records only the domain's owner can add, so print them and
  // carry on — a failure here must not cost the list setup above.
  const domainName = SENDER.email.split("@")[1];
  try {
    const existing = await findDomain(domainName);
    if (existing) {
      console.log(`domain    ${domainName} — already added to Brevo`);
      if (existing.dns_records) printDnsRecords(existing.dns_records);
    } else {
      const created = await call("POST", "/senders/domains", {
        name: domainName,
      });
      console.log(`domain    ${domainName} — added`);
      console.log("            Add these DNS records at your DNS host:");
      printDnsRecords(created.dns_records);
    }
  } catch (error) {
    console.log(`domain    ${domainName} — skipped: ${error.message}`);
    console.log(
      "            Add it by hand under Senders \u2192 Domains in Brevo.",
    );
  }

  console.log("\nAdd these to .env.local (and to the hosting environment):\n");
  console.log("BREVO_API_KEY=<your key>");
  for (const line of envLines) console.log(line);
  console.log("");
}

main().catch((error) => {
  console.error(`\nSetup failed: ${error.message}`);
  process.exit(1);
});
