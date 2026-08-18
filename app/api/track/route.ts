import { NextResponse } from "next/server";
import { lookupShipment } from "@/lib/tracking";
import { rateLimit, clientIdentifier } from "@/lib/rate-limit";
import type { TrackingMethod } from "@/types/tracking";

/** Live data: never prerendered, never cached. */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const METHODS: TrackingMethod[] = ["reference", "order", "mobile"];

export async function GET(request: Request) {
  const identifier = clientIdentifier(request.headers);
  // Tracking is polled far more than a contact form: its own bucket, and a
  // budget that does not punish someone refreshing a late delivery.
  const limit = rateLimit(`track:${identifier}`, 40);

  if (!limit.ok) {
    return NextResponse.json(
      { state: "error", message: "Too many lookups. Please wait a moment." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  const params = new URL(request.url).searchParams;
  const query = params.get("q") ?? params.get("ref") ?? "";
  const by = params.get("by") ?? "reference";
  const method: TrackingMethod = METHODS.includes(by as TrackingMethod)
    ? (by as TrackingMethod)
    : "reference";

  if (!query) {
    return NextResponse.json(
      { state: "invalid", message: "Enter a tracking number." },
      { status: 400 },
    );
  }

  const result = await lookupShipment(query, method);

  // The result shape carries its own outcome, so anything the caller can act
  // on is a 200. Only a genuine server fault is a 5xx.
  return NextResponse.json(result, {
    status: result.state === "error" ? 502 : 200,
    headers: { "Cache-Control": "no-store" },
  });
}
