import "server-only";

/**
 * Fixed-window rate limiter held in process memory.
 *
 * Deliberately simple: it stops a single client hammering the contact endpoint
 * on a single-instance Node deployment, which is exactly the Hostinger setup
 * this ships to. It is NOT a distributed limiter — if the app is ever scaled to
 * multiple instances, swap the Map for Redis/Upstash. The call signature will
 * not need to change.
 */

interface Entry {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Entry>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const DEFAULT_MAX = 5;

/** Removes expired buckets so the Map cannot grow without bound. */
function sweep(now: number) {
  if (buckets.size < 500) return;
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key);
  }
}

/**
 * `max` is per-endpoint on purpose. Five submissions in ten minutes is right
 * for a contact form; it is far too tight for shipment tracking, where a
 * customer waiting on a delivery will legitimately re-check several times in a
 * row. Each caller passes the budget that fits its use.
 */
export function rateLimit(
  identifier: string,
  max: number = DEFAULT_MAX,
): {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  sweep(now);

  const entry = buckets.get(identifier);

  if (!entry || entry.resetAt <= now) {
    buckets.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: max - 1, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);

  if (entry.count > max) {
    return { ok: false, remaining: 0, retryAfterSeconds };
  }

  return {
    ok: true,
    remaining: Math.max(0, max - entry.count),
    retryAfterSeconds,
  };
}

/**
 * Best-effort client identity. Hostinger and most reverse proxies populate
 * x-forwarded-for; the first entry is the original client.
 */
export function clientIdentifier(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
