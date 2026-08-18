"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import type { TrackingMethod } from "@/types/tracking";

/**
 * The tracking entry point: pick how you want to identify the shipment, enter
 * it, go. Submitting navigates to /track/<query>, so a result is a real URL —
 * shareable, reloadable, and linkable from a despatch email.
 *
 * Validation happens here for immediate feedback and again on the server,
 * which is the check that actually counts.
 */

const TABS: {
  id: TrackingMethod;
  label: string;
  placeholder: string;
  hint: string;
  inputMode?: "text" | "tel";
  autoComplete?: string;
}[] = [
  {
    id: "reference",
    label: "Tracking number",
    placeholder: "e.g. YDX-000000",
    hint: "On your booking confirmation and despatch email.",
  },
  {
    id: "order",
    label: "Order ID",
    placeholder: "e.g. #1042",
    hint: "The order reference from the store you bought from.",
  },
  {
    id: "mobile",
    label: "Mobile number",
    placeholder: "e.g. +1 978 830 3897",
    hint: "The number given when the shipment was booked.",
    inputMode: "tel",
    autoComplete: "tel",
  },
];

const PATTERNS: Record<TrackingMethod, RegExp> = {
  reference: /^[A-Za-z0-9][A-Za-z0-9\-_/]{3,39}$/,
  order: /^[A-Za-z0-9][A-Za-z0-9\-_/#]{2,39}$/,
  mobile: /^\+?[0-9][0-9\s\-()]{6,19}$/,
};

export function TrackingForm({
  initialMethod = "reference",
  initialValue = "",
  compact = false,
  size = "default",
}: {
  initialMethod?: TrackingMethod;
  initialValue?: string;
  compact?: boolean;
  /** `large` is used where the form is the focus of its own section. */
  size?: "default" | "large";
}) {
  const router = useRouter();
  const [method, setMethod] = React.useState<TrackingMethod>(initialMethod);
  const [value, setValue] = React.useState(initialValue);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);

  const active = TABS.find((t) => t.id === method)!;
  const large = size === "large";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = value.trim();

    if (!raw) {
      setError("Enter a value to track.");
      return;
    }
    if (!PATTERNS[method].test(raw)) {
      setError(
        method === "mobile"
          ? "That does not look like a phone number."
          : "That does not look right — check it against your confirmation.",
      );
      return;
    }

    setError(null);
    setPending(true);
    const q = method === "mobile" ? raw.replace(/[\s\-()]/g, "") : raw.toUpperCase();
    router.push(`/track/${encodeURIComponent(q)}?by=${method}`);
  };

  return (
    <div
      className={cn(
        "rounded-xl bg-canvas shadow-[0_1px_2px_0_rgb(12_10_8/0.04),0_12px_32px_-12px_rgb(12_10_8/0.12)]",
        large ? "p-6 sm:p-9 lg:p-10" : "p-5 sm:p-7",
        compact && "p-4 sm:p-5",
      )}
    >
      {/* -------------------------------------------------------- methods */}
      <div role="tablist" aria-label="Choose how to track" className="flex gap-1 border-b border-line">
        {TABS.map((tab) => {
          const selected = tab.id === method;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`track-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls="track-panel"
              className={cn(
                "-mb-px border-b-2 transition-colors",
                large
                  ? "px-3 py-3 text-[0.9375rem] sm:px-5"
                  : "px-3 py-2.5 text-[0.875rem] sm:px-4",
                selected
                  ? "border-accent font-medium text-ink-950"
                  : "border-transparent text-ink-400 hover:text-ink-950",
              )}
              onClick={() => {
                setMethod(tab.id);
                setError(null);
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ---------------------------------------------------------- input */}
      <form
        id="track-panel"
        role="tabpanel"
        aria-labelledby={`track-tab-${method}`}
        onSubmit={onSubmit}
        className={large ? "pt-7" : "pt-5"}
      >
        <label htmlFor="track-query" className="sr-only">
          {active.label}
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-400",
                large ? "size-[1.125rem]" : "size-4",
              )}
            />
            <Input
              id="track-query"
              name="q"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError(null);
              }}
              placeholder={active.placeholder}
              inputMode={active.inputMode}
              autoComplete={active.autoComplete ?? "off"}
              spellCheck={false}
              enterKeyHint="search"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "track-error" : "track-hint"}
              className={cn("pl-11", large ? "h-14 text-[1.0625rem]" : "h-12 text-[1rem]")}
              disabled={pending}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={pending}
            className={cn("sm:w-auto", large ? "h-14 px-7 text-[1rem]" : "h-12")}
          >
            {pending ? (
              <>
                <Loader2 aria-hidden="true" className="animate-spin" />
                Checking…
              </>
            ) : (
              "Track now"
            )}
          </Button>
        </div>

        {error ? (
          <p
            id="track-error"
            role="alert"
            className="mt-3 flex items-center gap-1.5 text-[0.8125rem] text-red-600"
          >
            <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
            {error}
          </p>
        ) : (
          <p id="track-hint" className="mt-3 text-[0.8125rem] text-ink-400">
            {active.hint}
          </p>
        )}
      </form>
    </div>
  );
}
