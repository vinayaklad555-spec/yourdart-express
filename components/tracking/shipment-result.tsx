import * as React from "react";
import { MapPin, Package, Truck, Clock, FlaskConical } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { ShipmentStepper } from "./shipment-stepper";
import { ShipmentTimeline } from "./shipment-timeline";
import { cn } from "@/lib/utils";
import type { TrackedShipment, TrackingParty } from "@/types/tracking";

/**
 * A found shipment, rendered in full.
 *
 * Every block is conditional on the carrier actually supplying that data. A
 * field the feed omits is left out entirely rather than shown with a dash or a
 * placeholder — an empty row reads as "we know this and it is blank", which is
 * a different claim from "the carrier did not tell us".
 */
export function ShipmentResult({ shipment }: { shipment: TrackedShipment }) {
  const s = shipment;

  return (
    <div>
      {/*
        Sample data must never be mistakable for a real shipment. This banner is
        rendered above everything, in a colour used nowhere else on the page,
        and states plainly what the reader is looking at.
      */}
      {s.isSample ? (
        <div
          role="note"
          className="mb-6 flex gap-3.5 rounded-xl border border-amber-500/30 bg-amber-50 px-5 py-4"
        >
          <FlaskConical
            aria-hidden="true"
            className="mt-0.5 size-4.5 shrink-0 text-amber-700"
          />
          <div className="text-[0.875rem] leading-relaxed text-amber-950">
            <p className="font-medium">Sample data — not a real shipment</p>
            <p className="mt-1">
              No carrier feed is connected yet, so this page is showing an
              example so the interface can be reviewed. Nothing below describes
              an actual consignment. For the status of a real shipment, contact
              the team.
            </p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-7 xl:col-span-8">
        {/* ------------------------------------------------------ header */}
        <div className="rounded-xl border border-line bg-canvas">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line p-6">
            <div className="min-w-0">
              <p className="text-[0.6875rem] tracking-[0.09em] text-ink-400 uppercase">
                Shipment number
              </p>
              <p className="mt-1.5 font-mono text-[1.125rem] break-all text-ink-950">
                {s.reference}
              </p>
              {s.lastUpdated ? (
                <p className="mt-2 inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-400">
                  <Clock aria-hidden="true" className="size-3.5" />
                  Updated{" "}
                  <time dateTime={s.lastUpdated}>{formatStamp(s.lastUpdated)}</time>
                </p>
              ) : null}
            </div>

            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium",
                s.statusState === "exception"
                  ? "bg-amber-100 text-amber-900"
                  : "bg-accent text-white",
              )}
            >
              {s.status}
            </span>
          </div>

          <div className="p-6">
            <ShipmentStepper stage={s.stage} />
          </div>

          {(s.service || s.estimatedDelivery) && (
            <dl className="grid gap-4 border-t border-line p-6 sm:grid-cols-2">
              {s.service ? <Meta label="Service" value={s.service} /> : null}
              {s.estimatedDelivery ? (
                <Meta label="Expected" value={formatStamp(s.estimatedDelivery)} />
              ) : null}
            </dl>
          )}
        </div>

        {/* ----------------------------------------------------- journey */}
        {(s.origin || s.destination) && (
          <div className="mt-6 rounded-xl border border-line bg-canvas p-6">
            <Heading as="h2" size="h4">
              Journey
            </Heading>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {s.origin ? <Party label="From" party={s.origin} icon={Truck} /> : null}
              {s.destination ? (
                <Party label="To" party={s.destination} icon={MapPin} />
              ) : null}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- packages */}
        {s.packages && s.packages.length > 0 ? (
          <div className="mt-6 rounded-xl border border-line bg-canvas p-6">
            <Heading as="h2" size="h4">
              Packages
            </Heading>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {s.packages.map((pkg, i) => (
                <li key={i} className="flex items-start gap-3 py-4">
                  <Package
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-ink-400"
                  />
                  <div className="min-w-0">
                    <p className="text-[0.9375rem] text-ink-950">
                      {pkg.description ?? `Package ${i + 1}`}
                    </p>
                    <p className="mt-0.5 text-[0.8125rem] text-ink-400">
                      {[
                        pkg.quantity ? `Qty ${pkg.quantity}` : null,
                        pkg.weight,
                        pkg.dimensions,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {/* ------------------------------------------------------- history */}
      <div className="lg:col-span-5 xl:col-span-4">
        <div className="rounded-xl border border-line bg-canvas p-6 lg:sticky lg:top-28">
          <Heading as="h2" size="h4">
            Tracking history
          </Heading>
          {s.checkpoints.length > 0 ? (
            <ShipmentTimeline checkpoints={s.checkpoints} className="mt-5" />
          ) : (
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-400">
              No scans have been recorded against this shipment yet. If it was
              only just booked, the first update usually appears after
              collection.
            </p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.6875rem] tracking-[0.09em] text-ink-400 uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-[0.9375rem] text-ink-950">{value}</dd>
    </div>
  );
}

function Party({
  label,
  party,
  icon: Icon,
}: {
  label: string;
  party: TrackingParty;
  icon: React.ElementType;
}) {
  const lines = [
    ...(party.addressLines ?? []),
    [party.city, party.postcode].filter(Boolean).join(" "),
  ].filter(Boolean);

  return (
    <div className="flex gap-3">
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-canvas-sunk text-ink-950"
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[0.6875rem] tracking-[0.09em] text-ink-400 uppercase">
          {label}
        </p>
        {party.name ? (
          <p className="mt-1 text-[0.9375rem] font-medium text-ink-950">{party.name}</p>
        ) : null}
        {lines.length > 0 ? (
          <address className="mt-0.5 text-[0.875rem] leading-relaxed text-ink-400 not-italic">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        ) : null}
        {party.contactName || party.contactPhone ? (
          <p className="mt-1.5 text-[0.8125rem] text-ink-400">
            {[party.contactName, party.contactPhone].filter(Boolean).join(" · ")}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** Deterministic and locale-stable, so server and client agree. */
function formatStamp(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(d);
}
