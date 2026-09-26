/**
 * A small fixed-window limiter for the public capture endpoint.
 *
 * In-process only: on a serverless deployment each instance keeps its own
 * counters, so this is a brake on casual abuse rather than a guarantee. It is
 * worth having anyway — every accepted submission spends a real contact write
 * against the Brevo plan.
 */
const WINDOW_MS = 60_000;
const MAX_HITS = 5;
const MAX_TRACKED_KEYS = 5_000;

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt <= now) {
    if (hits.size >= MAX_TRACKED_KEYS) sweep(now);
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_HITS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  return { allowed: true, retryAfter: 0 };
}

function sweep(now: number) {
  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(key);
  }
  // Still full of live windows: drop the oldest insertions to stay bounded.
  if (hits.size >= MAX_TRACKED_KEYS) {
    const excess = hits.size - MAX_TRACKED_KEYS + 1;
    let dropped = 0;
    for (const key of hits.keys()) {
      hits.delete(key);
      if (++dropped >= excess) break;
    }
  }
}

/** Best-effort client identity from the proxy headers Vercel and friends set. */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  return ip;
}
