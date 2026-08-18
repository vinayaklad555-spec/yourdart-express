import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { TRACKING_STAGES, type TrackingStage } from "@/types/tracking";

/**
 * The five canonical stages, as a horizontal progress rail on desktop and a
 * vertical one on mobile. Stages after the current one are rendered as pending
 * rather than hidden, so a customer can see what is still to come.
 */
export function ShipmentStepper({
  stage,
  className,
}: {
  stage?: TrackingStage;
  className?: string;
}) {
  const currentIndex = stage ? TRACKING_STAGES.indexOf(stage) : -1;

  return (
    <ol className={cn("relative grid gap-6 sm:grid-cols-5 sm:gap-2", className)}>
      {/* Rail */}
      <span
        aria-hidden="true"
        className="absolute top-4 left-[0.9375rem] bottom-4 w-px bg-line sm:top-[0.9375rem] sm:right-[10%] sm:bottom-auto sm:left-[10%] sm:h-px sm:w-auto"
      />

      {TRACKING_STAGES.map((label, i) => {
        const done = currentIndex >= 0 && i < currentIndex;
        const current = i === currentIndex;
        return (
          <li key={label} className="relative flex items-start gap-3 sm:flex-col sm:items-center sm:gap-3 sm:text-center">
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full ring-1",
                done && "bg-accent text-white ring-accent",
                current && "bg-accent text-white ring-4 ring-accent/25",
                !done && !current && "bg-canvas text-ink-300 ring-line",
              )}
            >
              {done ? (
                <Check className="size-4" />
              ) : (
                <span className="size-2 rounded-full bg-current" />
              )}
            </span>
            <span
              className={cn(
                "pt-1 text-[0.875rem] sm:pt-0",
                current ? "font-medium text-ink-950" : done ? "text-ink-700" : "text-ink-400",
              )}
            >
              {label}
              {current ? <span className="sr-only"> — current stage</span> : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
