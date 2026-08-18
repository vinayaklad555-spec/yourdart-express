import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendContactEmail, isMailConfigured } from "@/lib/mailer";
import { rateLimit, clientIdentifier } from "@/lib/rate-limit";

/** Never prerendered or cached — this endpoint has side effects. */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  // ---------------------------------------------------------------- throttle
  const identifier = clientIdentifier(request.headers);
  const limit = rateLimit(identifier);

  if (!limit.ok) {
    return NextResponse.json(
      {
        error:
          "Too many messages sent from this connection. Please wait a few minutes, or email us directly at contact@yourdartexpress.com.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  // ------------------------------------------------------------------ parse
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // The same Zod schema the browser used — the client check is convenience,
  // this one is the actual gate.
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // Honeypot filled means a bot. Return 200 so the bot learns nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // ------------------------------------------------------------------- send
  if (!isMailConfigured()) {
    console.error(
      "[contact] SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASSWORD.",
    );
    return NextResponse.json(
      {
        error:
          "Our contact form is temporarily unavailable. Please email us directly at contact@yourdartexpress.com and we will pick it up.",
      },
      { status: 503 },
    );
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    // Logged server-side only — the client never sees transport internals.
    console.error("[contact] Failed to send enquiry:", error);
    return NextResponse.json(
      {
        error:
          "We could not send your message just now. Please try again shortly, or email us directly at contact@yourdartexpress.com.",
      },
      { status: 502 },
    );
  }
}
