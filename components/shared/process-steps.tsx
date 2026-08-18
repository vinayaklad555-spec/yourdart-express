import * as React from "react";
import { cn } from "@/lib/utils";
import { RevealGroup, RevealItem } from "./reveal";
import type { ProcessStep } from "@/types/content";

/**
 * The four-step flow, shared by the homepage, every service page and the
 * Shopify integration page. A connecting rule runs behind the markers on
 * desktop and down the left edge on mobile.
 */
export function ProcessSteps({
  steps,
  tone = "light",
  className,
}: {
  steps: ProcessStep[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <RevealGroup
      as="ol"
      className={cn(
        "relative grid gap-y-9 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-6",
        className,
      )}
    >
      {/* Connector: vertical on mobile, horizontal across the markers on lg */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute top-0 bottom-0 left-[1.1875rem] w-px sm:hidden",
          dark ? "bg-white/12" : "bg-line",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute top-[1.1875rem] right-8 left-8 hidden h-px lg:block",
          dark ? "bg-white/12" : "bg-line",
        )}
      />

      {steps.map((step) => (
        <RevealItem as="li" key={step.step} className="relative flex gap-4 lg:block">
          <span
            aria-hidden="true"
            className={cn(
              "relative z-10 inline-flex size-9.5 shrink-0 items-center justify-center rounded-full text-[0.75rem] font-medium tracking-[0.02em] ring-1",
              dark
                ? "bg-accent-950 text-accent-bright ring-white/20"
                : "bg-canvas text-ink-950 ring-line-strong",
            )}
          >
            {step.step}
          </span>

          <div className="lg:mt-5 lg:pr-4">
            <h3
              className={cn(
                "text-[1rem] font-medium tracking-[-0.012em]",
                dark ? "text-white" : "text-ink-950",
              )}
            >
              {step.title}
            </h3>
            <p
              className={cn(
                "mt-2 text-[0.9375rem] leading-relaxed",
                dark ? "text-white/64" : "text-ink-400",
              )}
            >
              {step.body}
            </p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
