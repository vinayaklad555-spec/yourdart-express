import * as React from "react";
import { Check, Truck, Package, Warehouse, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * HERO VISUAL — CONCEPTUAL, AND LABELLED AS SUCH.
 *
 * This is not a screenshot of a product and it is not company performance data.
 * It is an illustration of the shipment lifecycle the service actually follows.
 * There are deliberately no figures anywhere in it: no counts, no percentages,
 * no delivery times, no locations. The reference is masked, the dates are
 * relative words, and a visible caption states that it is illustrative.
 */

const stages = [
  {
    label: "Booked",
    detail: "Serviceability confirmed",
    icon: Check,
    state: "done" as const,
  },
  {
    label: "Collected",
    detail: "Picked up from origin",
    icon: Package,
    state: "done" as const,
  },
  {
    label: "In transit",
    detail: "Moving through the network",
    icon: Truck,
    state: "active" as const,
  },
  {
    label: "Delivered",
    detail: "Confirmation returned to you",
    icon: MapPin,
    state: "pending" as const,
  },
];

export function HeroVisual({ className }: { className?: string }) {
  return (
    <figure className={cn("relative", className)}>
      {/* Flat: one hairline border, one radius, no wash and no nested frame. */}
      <div className="relative rounded-xl border border-line bg-canvas">
        <div className="rounded-xl">
          {/* ------------------------------------------------------ header */}
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
            <div className="min-w-0">
              <p className="text-[0.6875rem] tracking-[0.09em] text-ink-400 uppercase">
                Shipment
              </p>
              <p className="mt-1 font-mono text-[0.875rem] tracking-tight text-ink-800">
                YDX&#8209;<span className="text-ink-400">••••••</span>
              </p>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[0.75rem] text-white">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-white"
              />
              In transit
            </span>
          </div>

          {/* --------------------------------------------------- lifecycle */}
          <ol className="relative px-5 py-5">
            {/* Spine connecting the markers */}
            <div
              aria-hidden="true"
              className="absolute top-8 bottom-8 left-[2.0625rem] w-px bg-line"
            />
            <div
              aria-hidden="true"
              className="absolute top-8 left-[2.0625rem] h-[calc(50%-1rem)] w-px bg-ink-300"
            />

            {stages.map((stage) => {
              const Icon = stage.icon;
              return (
                <li key={stage.label} className="relative flex items-start gap-3.5 py-2.5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full ring-1",
                      stage.state === "done" &&
                        "bg-ink-950 text-white ring-ink-950",
                      stage.state === "active" &&
                        "bg-canvas text-ink-950 ring-ink-950",
                      stage.state === "pending" &&
                        "bg-canvas text-ink-300 ring-line",
                    )}
                  >
                    <Icon className="size-3.5" />
                  </span>

                  <div className="min-w-0 pt-1">
                    <p
                      className={cn(
                        "text-[0.875rem]",
                        stage.state === "pending" ? "text-ink-400" : "text-ink-950",
                      )}
                    >
                      {stage.label}
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 text-[0.8125rem]",
                        stage.state === "pending" ? "text-ink-400" : "text-ink-400",
                      )}
                    >
                      {stage.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* ------------------------------------------------------ footer */}
          <div className="flex items-center gap-2.5 border-t border-line px-5 py-3.5">
            <Warehouse aria-hidden="true" className="size-4 shrink-0 text-ink-400" />
            <p className="text-[0.8125rem] text-ink-400">
              Handled end to end by one team
            </p>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-center text-[0.75rem] text-ink-400">
        Illustrative example of the shipment lifecycle. Not live data.
      </figcaption>
    </figure>
  );
}
