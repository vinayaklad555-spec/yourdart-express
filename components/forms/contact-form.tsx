"use client";

import * as React from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Check, AlertTriangle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, Select, Honeypot } from "@/components/ui/field";
import { Heading } from "@/components/ui/typography";
import {
  contactSchema,
  contactDefaults,
  serviceOptions,
  type ContactFormValues,
} from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  defaultService,
  submitLabel = "Send message",
  showReference = false,
  showCountry = false,
  messageHint,
  messagePlaceholder,
}: {
  /** Adds the country field. Useful wherever cross-border work is in scope. */
  showCountry?: boolean;
  defaultService?: string;
  submitLabel?: string;
  /** Adds the shipment-reference field, used by the status-request page. */
  showReference?: boolean;
  messageHint?: string;
  messagePlaceholder?: string;
}) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const successRef = React.useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      ...contactDefaults,
      service: (defaultService as ContactFormValues["service"]) ?? contactDefaults.service,
    },
    mode: "onBlur",
  });

  const messageValue = useWatch({ control, name: "message" });

  // Move focus to the confirmation so it is announced rather than missed.
  React.useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(
          payload.error ??
            "We could not send your message. Please try again, or email us directly.",
        );
      }

      reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please email us directly instead.",
      );
      setStatus("error");
    }
  };

  /* --------------------------------------------------------------- success */
  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-xl border border-line bg-canvas-sunk p-8 text-center focus:outline-none sm:p-10"
      >
        <span
          aria-hidden="true"
          className="inline-flex size-11 items-center justify-center rounded-full bg-ink-950 text-white"
        >
          <Check className="size-5" />
        </span>
        <Heading as="h2" size="h3" className="mt-5">
          Message sent
        </Heading>
        <p className="mx-auto mt-3 max-w-[32rem] text-[0.9375rem] leading-relaxed text-ink-400">
          Thank you — we have received your enquiry and a member of the team will
          come back to you. If it is urgent, call us and we will pick it up
          straight away.
        </p>
        <Button
          variant="outline"
          className="mt-7"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  /* ------------------------------------------------------------------ form */
  const submitting = status === "submitting";
  const MESSAGE_MAX = 4000;
  /*
   * `useWatch` rather than `watch()`: the latter subscribes outside React's
   * model and the compiler flags it as an incompatible library call.
   */
  const messageLength = (messageValue ?? "").length;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Honeypot {...register("website")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name?.message}>
          {(a11y) => (
            <Input
              {...a11y}
              {...register("name")}
              autoComplete="name"
              placeholder="Your name"
              disabled={submitting}
            />
          )}
        </Field>

        <Field id="email" label="Work email" required error={errors.email?.message}>
          {(a11y) => (
            <Input
              {...a11y}
              {...register("email")}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              disabled={submitting}
            />
          )}
        </Field>

        <Field id="phone" label="Phone" error={errors.phone?.message}>
          {(a11y) => (
            <Input
              {...a11y}
              {...register("phone")}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+1 555 000 0000"
              disabled={submitting}
            />
          )}
        </Field>

        <Field id="company" label="Company" error={errors.company?.message}>
          {(a11y) => (
            <Input
              {...a11y}
              {...register("company")}
              autoComplete="organization"
              placeholder="Your company"
              disabled={submitting}
            />
          )}
        </Field>

        {showCountry ? (
          <Field id="country" label="Country" error={errors.country?.message}>
            {(a11y) => (
              <Input
                {...a11y}
                {...register("country")}
                autoComplete="country-name"
                placeholder="Where you are shipping from"
                disabled={submitting}
              />
            )}
          </Field>
        ) : null}
      </div>

      {showReference ? (
        <Field
          id="reference"
          label="Shipment reference"
          error={errors.reference?.message}
          hint="If you have it. We can still look the shipment up without one."
        >
          {(a11y) => (
            <Input
              {...a11y}
              {...register("reference")}
              placeholder="e.g. YDX-000000"
              disabled={submitting}
            />
          )}
        </Field>
      ) : null}

      <Field
        id="service"
        label="Service required"
        required
        error={errors.service?.message}
      >
        {(a11y) => (
          <Select {...a11y} {...register("service")} disabled={submitting}>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        )}
      </Field>

      <Field
        id="message"
        label="Message"
        required
        error={errors.message?.message}
        hint={
          messageHint ??
          "What are you moving, where from and where to, and roughly how often?"
        }
      >
        {(a11y) => (
          <Textarea
            {...a11y}
            {...register("message")}
            rows={6}
            placeholder={
              messagePlaceholder ??
              "Tell us about your shipping, storage or fulfilment requirement…"
            }
            disabled={submitting}
          />
        )}
      </Field>

      <p className="-mt-3 text-right text-[0.75rem] tabular-nums text-ink-400">
        <span className="sr-only">Characters used: </span>
        {messageLength} / {MESSAGE_MAX}
      </p>

      {/* Live region so failures are announced, not just displayed */}
      <div aria-live="polite">
        {status === "error" && errorMessage ? (
          <div
            role="alert"
            className="flex gap-3 rounded-lg border border-red-500/25 bg-red-50 px-4 py-3.5 text-[0.875rem] text-red-900"
          >
            <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red-600" />
            <p>{errorMessage}</p>
          </div>
        ) : null}
      </div>

      {/*
        Explicit consent rather than an implied "by submitting you agree".
        Required by the schema, so it is a real gate rather than decoration.
      */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            {...register("consent")}
            disabled={submitting}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 size-4 shrink-0 rounded-xs border-line-strong text-accent accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-950"
          />
          <span className="text-[0.8125rem] leading-relaxed text-ink-400">
            I agree that Your Dart Express may store and use the details above to
            respond to this enquiry, as described in the{" "}
            <Link
              href="/legal/privacy-policy"
              className="font-medium text-ink-950 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p
            id="consent-error"
            role="alert"
            className="flex items-center gap-1.5 pl-7 text-[0.75rem] text-red-600"
          >
            <AlertTriangle aria-hidden="true" className="size-3.5 shrink-0" />
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={submitting} className="sm:w-auto">
          {submitting ? (
            <>
              <Loader2 aria-hidden="true" className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              {submitLabel}
              <Send aria-hidden="true" />
            </>
          )}
        </Button>
        <p className="text-[0.75rem] leading-relaxed text-ink-400 sm:max-w-[22rem] sm:text-right">
          We reply within one business day. Your details are never sold or
          shared with third parties for marketing.
        </p>
      </div>
    </form>
  );
}
