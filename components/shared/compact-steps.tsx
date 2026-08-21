import * as React from "react";
import { RevealGroup, RevealItem } from "./reveal";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/types/content";

/**
 * A four-across process row, deliberately light.
 *
 * The counterpart to ProcessSteps, which is the full-height treatment used on
 * the dark bands. Here the process is a supporting explanation rather than the
 * point of the page, so the numerals are small, there are no cards, and the
 * only structure is a hairline above each step — read as one rule running the
 * width of the row on desktop, and as a list divider on mobile.
 *
 * `<ol>` because the order is the meaning.
 */
export function CompactSteps({
  steps,
  className,
}: {
  steps: ProcessStep[];
  className?: string;
}) {
  return (
    <RevealGroup
      as="ol"
      className={cn("grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4", className)}
    >
      {steps.map((step) => (
        <RevealItem as="li" key={step.step} className="bg-canvas">
          <div className="h-full border-t-2 border-ink-950 pt-5 pr-6">
            <span
              aria-hidden="true"
              className="font-mono text-[0.75rem] tracking-tight text-ink-400"
            >
              {step.step}
            </span>
            <h3 className="mt-3 text-[1rem] font-medium tracking-[-0.015em] text-ink-950">
              {step.title}
            </h3>
            <p className="mt-1.5 text-[0.875rem] leading-[1.6] text-ink-400">
              {step.body}
            </p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
