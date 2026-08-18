import * as React from "react";
import { Check, Truck, Package, MapPin, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrackingCheckpoint, CheckpointState } from "@/types/tracking";

const stateIcon: Record<CheckpointState, React.ElementType> = {
  completed: Check,
  current: Truck,
  pending: MapPin,
  exception: AlertTriangle,
};

/**
 * The checkpoint timeline. Renders whatever the carrier feed supplies and
 * nothing it does not — a checkpoint without a location or timestamp simply
 * omits them rather than showing a placeholder that looks like data.
 *
 * Used both for real results and for the clearly-labelled illustrative example
 * on the tracking page.
 */
export function ShipmentTimeline({
  checkpoints,
  className,
}: {
  checkpoints: TrackingCheckpoint[];
  className?: string;
}) {
  return (
    <ol className={cn("relative", className)}>
      {/* Spine */}
      <span
        aria-hidden="true"
        className="absolute top-4 bottom-4 left-[0.9375rem] w-px bg-line"
      />

      {checkpoints.map((cp, i) => {
        const Icon = stateIcon[cp.state] ?? Package;
        return (
          <li key={`${cp.status}-${i}`} className="relative flex items-start gap-4 pb-6 last:pb-0">
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full ring-1",
                cp.state === "completed" && "bg-accent text-white ring-accent",
                cp.state === "current" && "bg-canvas text-accent ring-accent",
                cp.state === "pending" && "bg-canvas text-ink-300 ring-line",
                cp.state === "exception" && "bg-amber-100 text-amber-700 ring-amber-300",
              )}
            >
              <Icon className="size-3.5" />
            </span>

            <div className="min-w-0 pt-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p
                  className={cn(
                    "text-[0.9375rem] font-medium",
                    cp.state === "pending" ? "text-ink-400" : "text-ink-950",
                  )}
                >
                  {cp.status}
                </p>
                {cp.timestamp ? (
                  <time
                    dateTime={cp.timestamp}
                    className="font-mono text-[0.75rem] tracking-tight text-ink-400"
                  >
                    {formatStamp(cp.timestamp)}
                  </time>
                ) : null}
              </div>

              {cp.description ? (
                <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-400">
                  {cp.description}
                </p>
              ) : null}

              {cp.location ? (
                <p className="mt-1 inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-400">
                  <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
                  {cp.location}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Deterministic and locale-stable, so server and client agree. */
function formatStamp(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(d);
}
