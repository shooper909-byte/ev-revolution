# Instructions for Codex: publish the Eve's Sisters site to evevolutionhealth.com

Repo: `shooper909-byte/ev-revolution` (Next.js 15). Vercel project: `ev-revolution`.

## How the live site works (check this first)

- `https://evevolutionhealth.com` is on WordPress.com / Pressable hosting. The response headers show `x-ac: _atomic_dca` and `server-timing: a8c-cdn`, and `/wp-admin` redirects to `wp-login.php`.
- The HTML it returns is the Next.js build from this repo: it has `/_next/image` URLs, and `/eves-secret` shows the current `main` content. So WordPress appears to be passing requests through to the **Vercel production deployment**. Probably a proxy plugin, a custom mu-plugin, or a reverse-proxy rule does this.
- **Before changing anything, confirm this.** In wp-admin, look under Plugins and Tools, and check any mu-plugins over SFTP, for whatever fetches from `*.vercel.app` or the Vercel production URL. Write down which Vercel URL it points to.
- If it is proxying Vercel production, then **publishing = merge to `main` → Vercel deploys production → purge the WordPress/CDN cache.** Do not rebuild pages inside WordPress.

## Step 1 — Merge the finished work into `main`

Open PRs, checked against `main` on 2026-09-22:

| PR | What it does | Merges cleanly? | Action |
| --- | --- | --- | --- |
| [#25](https://github.com/shooper909-byte/ev-revolution/pull/25) | Eve's Secret "Make it even more yours." portrait add-on cards | Yes | Mark ready → confirm Vercel preview is green → squash-merge |
| [#10](https://github.com/shooper909-byte/ev-revolution/pull/10) | Brevo email capture + weight-management banner | Yes | **First** add the Brevo env vars in Step 2, then merge |
| [#6](https://github.com/shooper909-byte/ev-revolution/pull/6) | `/peptide-care` page | **No.** Conflicts in `src/app/peptide-care/page.tsx`, `src/app/sitemap.ts`, `src/components/SiteHeader.tsx`, `src/lib/carePrograms.ts` | `main` already has its own `/peptide-care`. Compare the two. Only port over anything missing from `main`. Merge `main` into the branch (no force-push), run checks, then merge |
| [#1](https://github.com/shooper909-byte/ev-revolution/pull/1) | Original "Build the EV-REVOLUTION website" (Sep 15) | **No.** Conflicts in 12 core files | **Do not merge.** Later PRs have replaced it. Close it after the owner confirms |

For each PR, before merging:
1. `npm ci && npx tsc --noEmit && npm run lint && npm run build`. All of them must pass.
2. Open the PR's Vercel preview and check the changed pages at desktop and phone width.
3. Merge one PR at a time. Wait for each Vercel production deploy to show **Ready** before merging the next one.

## Step 2 — Vercel environment variables (Production)

In Vercel → `ev-revolution` → Settings → Environment Variables → **Production**, make sure these are set. The site owner supplies the values; never commit them.

- `NEXT_PUBLIC_SITE_URL` = `https://evevolutionhealth.com`
- `BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_DOI_TEMPLATE_ID`, `BREVO_DOI_REDIRECT_URL`, `BREVO_CONSENT_ATTRIBUTE`, `BREVO_SOURCE_ATTRIBUTE` (needed by PR #10)
- `EV_CONTACT_WEBHOOK_URL`, `EV_NEWSLETTER_WEBHOOK_URL`, `EV_CARE_LEAD_WEBHOOK_URL`, `EV_WEIGHT_CARE_STATES`

After you change env vars, **Redeploy** the latest production deployment so the new values take effect.

## Step 3 — Make it live on the WordPress domain

1. Vercel → Deployments: the newest **Production** deployment is from the latest `main` commit and shows **Ready**.
2. Open the production deployment's URL (Vercel → Deployments → latest Production → Visit) at `/eves-secret` and confirm it shows "The finishing touches" with the portrait cards. Note: `ev-revolution.vercel.app` is **not** the current production alias. It 404s on `/longevity`, which is live on the domain.
3. Purge caches on the WordPress side: the site's caching or proxy plugin cache, plus the host's edge cache (WordPress.com: Settings → Performance/Hosting → Clear cache; Pressable: MyPressable → site → Cache → Flush). If the proxy plugin has its own cache, clear that too.
4. Check the live domain:
   - `https://evevolutionhealth.com/eves-secret`: shows "The finishing touches" and the portrait cards, not the old "Focused add-ons".
   - Home page, `/treatments`, `/care`, `/eves-secret`, `/peptide-care` and the weight-management page all load, and images render (`/_next/image` returns 200).
   - Test one email signup and confirm the contact shows up in the Brevo list.
5. If the domain still shows old content after purging, the WordPress proxy is pointing at an old deployment URL. Point it at the Vercel project's **production domain** (Vercel → Settings → Domains), not a per-deployment `ev-revolution-xxxx.vercel.app` URL.

## If WordPress is NOT proxying Vercel

If Step 0 finds no proxy, stop and report back to the owner what is actually serving the site. The cleanest option is then to point the domain at Vercel instead of WordPress:
- Vercel → `ev-revolution` → Settings → Domains → add `evevolutionhealth.com` and `www.evevolutionhealth.com`.
- At the DNS provider: apex `A` → `76.76.21.21`, and `www` `CNAME` → `cname.vercel-dns.com`. Use whatever values Vercel shows if they differ.
- Get the owner's approval before changing DNS. It takes the WordPress site offline for that domain. Keep WordPress on a subdomain, such as `blog.evevolutionhealth.com`, if it is still needed.

Do **not** try to copy Next.js pages into WordPress posts or pages. The site depends on server features: image optimization, API routes for Brevo and contact forms, and metadata. Those don't work as pasted HTML.

## Rules

- Never commit secrets or API keys.
- Never force-push to `main`, and never rewrite history on shared branches.
- Don't skip or disable checks to get a green build.
- Report back with: which PRs were merged, the production deployment URL, which caches were purged, and screenshots of `evevolutionhealth.com/eves-secret` at desktop and phone width.
