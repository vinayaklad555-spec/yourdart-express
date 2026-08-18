import "server-only";
import type {
  TrackingResult,
  TrackedShipment,
  TrackingMethod,
} from "@/types/tracking";
import { isDemoMode, sampleShipment } from "./tracking-demo";

/**
 * SHIPMENT LOOKUP — THE PROVIDER ADAPTER.
 *
 * This is the single seam between the tracking interface and a real carrier
 * feed. The whole flow — landing form, result page, every state — is built
 * against it and needs no changes when a provider arrives.
 *
 * Right now no feed is connected, so `lookupShipment` returns `unavailable`.
 * It does NOT return invented shipments. A tracking page that fabricates
 * checkpoints is worse than no tracking page: a customer will believe it, and
 * "out for delivery" is a statement of fact about someone's parcel.
 *
 * TO CONNECT A CARRIER
 * --------------------
 * 1. Set TRACKING_API_URL and TRACKING_API_KEY in the environment.
 * 2. Implement `normaliseProviderPayload` for that provider's response shape.
 * That is the entire integration.
 */

const PATTERNS: Record<TrackingMethod, RegExp> = {
  reference: /^[A-Za-z0-9][A-Za-z0-9\-_/]{3,39}$/,
  order: /^[A-Za-z0-9][A-Za-z0-9\-_/#]{2,39}$/,
  mobile: /^\+?[0-9][0-9\s\-()]{6,19}$/,
};

const HINTS: Record<TrackingMethod, string> = {
  reference:
    "That does not look like a tracking number. They are 4–40 letters and numbers.",
  order: "That does not look like an order ID. Check it against your confirmation.",
  mobile: "That does not look like a phone number. Include the country code if you have it.",
};

export function normaliseQuery(input: string, method: TrackingMethod): string {
  const trimmed = input.trim();
  if (method === "mobile") return trimmed.replace(/[\s\-()]/g, "");
  return trimmed.replace(/\s+/g, "").toUpperCase();
}

export function isValidQuery(input: string, method: TrackingMethod): boolean {
  return PATTERNS[method].test(normaliseQuery(input, method));
}

export function validationHint(method: TrackingMethod): string {
  return HINTS[method];
}

function providerConfig(): { url: string; key: string } | null {
  const url = process.env.TRACKING_API_URL;
  const key = process.env.TRACKING_API_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export function isTrackingConfigured(): boolean {
  return providerConfig() !== null;
}

/**
 * Maps a provider payload onto our shape. THIS IS THE ONLY THING LEFT TO DO.
 *
 * Left unimplemented on purpose: writing a speculative mapping for a carrier
 * that has not been chosen would be guesswork that later has to be unpicked.
 * Throwing surfaces as an `error` state rather than silently producing an
 * empty shipment.
 *
 * Return one `TrackedShipment` per matching consignment. Populate only the
 * fields the carrier actually sends — the UI omits any block it has no data
 * for, and a field left undefined renders as absent rather than as an empty
 * row. `stage` drives the five-step progress rail; `checkpoints` should be
 * newest first.
 *
 * The full result UI was verified end to end against a mock carrier returning
 * this shape: header, progress rail, journey, packages and history all render
 * from real data with no further changes.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function normaliseProviderPayload(payload: unknown): TrackedShipment[] {
  throw new Error("No carrier payload mapping implemented. See lib/tracking.ts.");
}

export async function lookupShipment(
  rawQuery: string,
  method: TrackingMethod = "reference",
): Promise<TrackingResult> {
  const query = normaliseQuery(rawQuery, method);

  if (!isValidQuery(query, method)) {
    return { state: "invalid", message: validationHint(method) };
  }

  const config = providerConfig();

  if (!config) {
    /*
     * No carrier feed. Demo mode returns a sample so the interface can be seen
     * and demoed; it is off in production unless explicitly enabled, and every
     * shipment it produces is flagged `isSample` and banner-ed in the UI.
     *
     * Note the ordering: a real provider always wins. Demo data can never mask
     * a genuine lookup.
     */
    if (isDemoMode()) {
      return { state: "found", shipment: sampleShipment(query) };
    }
    return { state: "unavailable", query };
  }

  try {
    const url = new URL(config.url);
    url.searchParams.set("by", method);
    url.searchParams.set("q", query);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${config.key}` },
      // Tracking is live data; never serve it from a cache.
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (response.status === 404) return { state: "not_found", query };
    if (!response.ok) {
      console.error("[tracking] provider returned", response.status);
      return {
        state: "error",
        message: "The carrier system did not respond. Please try again shortly.",
      };
    }

    const shipments = normaliseProviderPayload(await response.json());
    if (shipments.length === 0) return { state: "not_found", query };
    if (shipments.length === 1) return { state: "found", shipment: shipments[0] };
    return { state: "multiple", shipments };
  } catch (error) {
    console.error("[tracking] lookup failed:", error);
    return {
      state: "error",
      message: "We could not complete the lookup just now. Please try again shortly.",
    };
  }
}
