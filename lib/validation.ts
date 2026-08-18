import { z } from "zod";
import { publishedServices } from "@/content/services";

/**
 * Zod v4 compiles validators with `new Function` when it can, and probes for
 * that capability by evaluating `Function("")`. Our Content-Security-Policy
 * has no 'unsafe-eval', so the probe throws — Zod catches it and falls back
 * correctly, but Chrome still records a CSP violation on every page carrying
 * the form.
 *
 * Opting out of JIT up front stops the probe entirely. The alternative would be
 * adding 'unsafe-eval' to the CSP, which is a real security regression in
 * exchange for a micro-optimisation on a form with six fields.
 */
z.config({ jitless: true });

/**
 * Shared between the client form and the API route, so the browser and the
 * server can never disagree about what a valid submission looks like.
 */

const serviceValues = [
  ...publishedServices.map((s) => s.name),
  "Multiple services",
  "Shipment status update",
  "Something else",
] as const;

export const serviceOptions = serviceValues;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "That name is longer than we can accept."),

  email: z
    .string()
    .trim()
    .min(1, "Please enter your work email.")
    .email("Please enter a valid email address.")
    .max(254, "That email address is longer than we can accept."),

  phone: z
    .string()
    .trim()
    .max(32, "That phone number is longer than we can accept.")
    .refine((v) => v === "" || /^[+()\-.\s\d]{6,32}$/.test(v), {
      message: "Please enter a valid phone number, or leave this blank.",
    })
    .optional()
    .or(z.literal("")),

  company: z
    .string()
    .trim()
    .max(120, "That company name is longer than we can accept.")
    .optional()
    .or(z.literal("")),

  /**
   * Shipment reference, used by the status-request form. Optional everywhere
   * else — a customer chasing a shipment may not have the reference to hand,
   * and refusing the request on that basis would be unhelpful.
   */
  reference: z
    .string()
    .trim()
    .max(64, "That reference is longer than we can accept.")
    .optional()
    .or(z.literal("")),

  /**
   * Optional. For a business that moves cargo across borders it materially
   * changes what can be quoted, but demanding it up front would cost more
   * enquiries than it saves.
   */
  country: z
    .string()
    .trim()
    .max(60, "That country name is longer than we can accept.")
    .optional()
    .or(z.literal("")),

  service: z.enum(serviceValues, {
    message: "Please choose the service you are interested in.",
  }),

  message: z
    .string()
    .trim()
    .min(20, "Please give us a little more detail — at least 20 characters.")
    .max(4000, "Please keep your message under 4000 characters."),

  /**
   * Honeypot. Real people never see this field, so anything in it is a bot.
   *
   * Deliberately permissive: if the schema rejected a filled honeypot, the 400
   * response would name the field and tell the bot exactly what to leave empty
   * next time. Instead it validates cleanly and the API route checks it
   * separately, returning a plain 200 so the submission is dropped silently.
   */
  website: z.string().max(200).optional().or(z.literal("")),

  /**
   * Explicit consent rather than an implied "by submitting you agree".
   * The Privacy Policy already commits to using these details only to answer
   * the enquiry; this is the record that the person was told so.
   */
  /*
   * The type-level message matters as much as the refine: without it, omitting
   * the field entirely surfaced Zod's raw "expected boolean, received
   * undefined" to API callers. `.optional().default(false)` would also fix
   * that, but it makes the input and output types diverge, which breaks the
   * form resolver's typing.
   */
  consent: z
    .boolean({ message: "Please confirm we can use your details to reply." })
    .refine((v) => v === true, {
      message: "Please confirm we can use your details to reply.",
    }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const contactDefaults: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  reference: "",
  service: "Multiple services",
  message: "",
  website: "",
  consent: false,
};
