#!/usr/bin/env node
/**
 * One-time Brevo setup for the Eve's Sisters captures.
 *
 * Creates the folder, the lists each capture source writes to, and the custom
 * contact attributes the API route wants to stamp on new contacts — none of
 * which can be created from the Brevo UI's form builder alone. Re-running is
 * safe: anything that already exists is reported and left untouched.
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

  console.log("\nAdd these to .env.local (and to the hosting environment):\n");
  console.log("BREVO_API_KEY=<your key>");
  for (const line of envLines) console.log(line);
  console.log("");
}

main().catch((error) => {
  console.error(`\nSetup failed: ${error.message}`);
  process.exit(1);
});
