import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import type { ContactFormValues } from "./validation";
import { site } from "@/content/site";

/**
 * SMTP transport for Hostinger (or any standard SMTP provider).
 *
 * SECURITY: this module is marked `server-only`. Importing it from a client
 * component is a build error, so credentials cannot leak into the browser
 * bundle by accident. Values come from environment variables exclusively —
 * there is no fallback secret anywhere in this file.
 */

let cached: Transporter | null = null;

function requiredEnv(): {
  host: string;
  port: number;
  user: string;
  pass: string;
} | null {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !port || !user || !pass) return null;
  return { host, port: Number(port), user, pass };
}

export function isMailConfigured(): boolean {
  return requiredEnv() !== null;
}

function getTransporter(): Transporter | null {
  if (cached) return cached;
  const env = requiredEnv();
  if (!env) return null;

  cached = nodemailer.createTransport({
    host: env.host,
    port: env.port,
    // Hostinger: port 465 is implicit TLS, 587 upgrades via STARTTLS.
    secure: env.port === 465,
    auth: { user: env.user, pass: env.pass },
  });

  return cached;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strips CR/LF so user input can never inject extra SMTP headers. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function sendContactEmail(data: ContactFormValues): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) {
    throw new Error("SMTP is not configured. Set SMTP_* environment variables.");
  }

  const from = process.env.MAIL_FROM ?? process.env.SMTP_USER!;
  const to = process.env.MAIL_TO ?? site.contact.email;

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Company", data.company || "—"],
    ["Country", data.country || "—"],
    ["Shipment ref", data.reference || "—"],
    ["Service", data.service],
  ];

  const text = [
    `New enquiry from ${site.domain}`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;color:#0a0c0b">
      <p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#5a625d;margin:0 0 4px">
        New enquiry
      </p>
      <h1 style="font-size:20px;margin:0 0 20px;font-weight:600">${site.domain}</h1>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) => `<tr>
              <td style="padding:8px 16px 8px 0;color:#5a625d;white-space:nowrap;vertical-align:top;border-bottom:1px solid #e7e9e4">${k}</td>
              <td style="padding:8px 0;border-bottom:1px solid #e7e9e4">${escapeHtml(v)}</td>
            </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:24px 0 8px;color:#5a625d;font-size:13px">Message</p>
      <div style="white-space:pre-wrap;line-height:1.6;font-size:14px;padding:16px;background:#f6f7f4;border-radius:8px">${escapeHtml(
        data.message,
      )}</div>
    </div>`;

  await transporter.sendMail({
    from: `"${site.name} Website" <${from}>`,
    to,
    // Lets the team hit reply and reach the enquirer directly.
    replyTo: `${headerSafe(data.name)} <${headerSafe(data.email)}>`,
    subject: `New enquiry — ${headerSafe(data.service)} — ${headerSafe(data.name)}`,
    text,
    html,
  });
}
