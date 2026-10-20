// Isolated contract tests: no requests reach Brevo and no real contacts are used.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, env = {}, fetch = () => { throw new Error('Unexpected network request'); }, imports = {}) {
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(source, { exports, process: { env }, fetch, AbortSignal, console: { error() {}, warn() {}, info() {} }, require: name => {
    if (name in imports) return imports[name];
    throw new Error(`Unexpected import ${name}`);
  } });
  return exports;
}
const names = ['EVS_SIGNUP_SOURCE', 'EVS_CONSENT_AT', 'EVS_CONSENT_TEXT', 'EVS_CONSENT_VERSION', 'EVS_EARLY_ACCESS_STATE', 'EVS_SERVICE_INTEREST'];
const input = { email: 'test@example.invalid', firstName: 'Test', source: 'early_access', submittedAt: '2026-10-19T00:00:00.000Z', marketingConsent: { text: 'Test consent', version: 'test-v1' }, state: 'TX', serviceInterest: 'General updates' };
const env = { BREVO_API_KEY: 'test-only-not-a-key', BREVO_LIST_ID: '2' };
function provider(mode = 'success') {
  const calls = []; let saved;
  return { calls, fetch: async (url, options = {}) => {
    calls.push({ url, options });
    if (url.endsWith('/contacts/attributes')) return Response.json({ attributes: names.map(name => ({ name, type: mode === 'wrong-schema' ? 'number' : 'text', category: 'normal' })) });
    if (options.method === 'POST') {
      saved = JSON.parse(options.body);
      if (mode === 'provider-error') return Response.json({ message: 'attribute rejected' }, { status: 400 });
      return new Response(null, { status: 204 });
    }
    return Response.json({ listIds: mode === 'missing-membership' ? [] : saved.listIds, attributes: mode === 'missing-consent' ? {} : saved.attributes });
  } };
}
async function main() {
  let passed = 0;
  const check = async (name, fn) => { await fn(); console.log(`PASS ${name}`); passed++; };
  await check('Missing backend fails closed', async () => assert.equal((await load('src/lib/brevo.ts').subscribeToBrevo(input)).ok, false));
  await check('Missing consent makes no provider call', async () => { const p = provider(); const result = await load('src/lib/brevo.ts', env, p.fetch).subscribeToBrevo({ ...input, marketingConsent: undefined }); assert.equal(result.ok, false); assert.equal(p.calls.length, 0); });
  for (const mode of ['wrong-schema', 'provider-error', 'missing-membership', 'missing-consent']) {
    await check(`${mode} never reports success`, async () => { const p = provider(mode); assert.equal((await load('src/lib/brevo.ts', env, p.fetch).subscribeToBrevo(input)).ok, false); assert.ok(p.calls.filter(c => c.options.method === 'POST').length <= 1); });
  }
  await check('Signup saves and verifies list, source, full consent and preferences', async () => {
    const p = provider(); const result = await load('src/lib/brevo.ts', env, p.fetch).subscribeToBrevo(input);
    assert.equal(result.ok, true); const payload = JSON.parse(p.calls.find(c => c.options.method === 'POST').options.body);
    assert.deepEqual(payload.listIds, [2]); assert.equal(payload.attributes.EVS_CONSENT_TEXT, input.marketingConsent.text); assert.equal(payload.attributes.EVS_CONSENT_AT, input.submittedAt); assert.equal(payload.attributes.EVS_EARLY_ACCESS_STATE, 'TX'); assert.equal(payload.attributes.EVS_SERVICE_INTEREST, input.serviceInterest); assert.equal(payload.attributes.EVS_SIGNUP_SOURCE, 'gender-affirming-care-early-access'); assert.equal(p.calls.length, 3);
  });
  await check('Existing newsletter flow does not provision early-access attributes', async () => { const p = provider(); assert.equal((await load('src/lib/brevo.ts', env, p.fetch).subscribeToBrevo({ email: input.email, source: 'footer', submittedAt: input.submittedAt })).ok, true); assert.equal(p.calls.length, 1); });
  let forwarded = 0;
  const constants = load('src/lib/affirmingCare.ts');
  const route = load('src/app/api/early-access/route.ts', {}, undefined, {
    'next/server': { NextResponse: Response },
    '@/lib/brevo': { isBrevoConfigured: () => true, subscribeToBrevo: async () => { forwarded++; return { ok: true, pendingConfirmation: false }; } },
    '@/lib/forward': { isValidEmail: value => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) },
    '@/lib/rateLimit': { clientKey: () => 'test', rateLimit: () => ({ allowed: true }) },
    '@/lib/affirmingCare': constants,
  });
  const post = body => route.POST(new Request('https://example.invalid/api/early-access', { method: 'POST', body: JSON.stringify(body) }));
  for (const body of [{}, { firstName: 'Test', email: input.email, marketingConsent: false }, { firstName: 'Test', email: input.email, marketingConsent: 'true' }, { firstName: 'Test', email: input.email, marketingConsent: true, serviceInterest: 'arbitrary medical data' }]) {
    await check('Invalid or unconsented request rejected before provider', async () => { assert.equal((await post(body)).status, 400); assert.equal(forwarded, 0); });
  }
  await check('Honeypot never creates a contact', async () => { assert.equal((await post({ company: 'bot' })).status, 200); assert.equal(forwarded, 0); });
  await check('Valid consented request reaches provider', async () => { assert.equal((await post({ firstName: 'Test', email: input.email, marketingConsent: true })).status, 200); assert.equal(forwarded, 1); });
  console.log(`${passed} contract checks passed.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
