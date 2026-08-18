import "server-only";
import type { TrackedShipment, TrackingStage } from "@/types/tracking";

/**
 * DEMO MODE — SAMPLE SHIPMENTS FOR PREVIEWING THE INTERFACE.
 *
 * This exists so the tracking result page can be seen, reviewed and demoed
 * before a carrier feed is connected. It is NOT a stand-in for real tracking.
 *
 * Three things keep it safe:
 *
 *   1. It is OFF in production unless TRACKING_DEMO_MODE=true is set
 *      explicitly. `next dev` gets it for free; a production build does not.
 *   2. It never runs when a real carrier is configured — a live feed always
 *      wins, so demo data cannot mask a genuine lookup.
 *   3. Every shipment it returns carries `isSample: true`, and the result page
 *      renders an unmissable banner for it. A customer cannot mistake a sample
 *      for their own parcel.
 *
 * Turn it off for launch. The production checklist says so.
 */

export function isDemoMode(): boolean {
  const flag = process.env.TRACKING_DEMO_MODE;
  if (flag === "true") return true;
  if (flag === "false") return false;
  // Unset: on while developing, off in a production build.
  return process.env.NODE_ENV !== "production";
}

/**
 * The last character of the reference selects the scenario, so every state can
 * be demoed without needing a back end:
 *
 *   ...1  in transit        ...3  exception / held
 *   ...2  delivered         ...4  booked, no scans yet
 *   else  out for delivery
 */
export function sampleShipment(reference: string): TrackedShipment {
  const last = reference.trim().slice(-1);

  if (last === "2") return delivered(reference);
  if (last === "3") return held(reference);
  if (last === "4") return justBooked(reference);
  if (last === "1") return inTransit(reference);
  return outForDelivery(reference);
}

/* ------------------------------------------------------------------ parts */

const origin = {
  name: "Sample Trading Co.",
  addressLines: ["Unit 4, Example Business Park"],
  city: "Newark",
  postcode: "NJ 07102",
  contactName: "Warehouse team",
  contactPhone: "+1 555 010 0100",
};

const destination = {
  name: "Sample Recipient",
  addressLines: ["18 Example Avenue"],
  city: "Brooklyn",
  postcode: "NY 11201",
  contactName: "Front desk",
  contactPhone: "+1 555 010 0200",
};

const packages = [
  { description: "Carton — general goods", quantity: 2, weight: "6.4 kg", dimensions: "40 x 30 x 25 cm" },
];

/**
 * Timestamps are derived from the current time so the sample never looks
 * stale. Hours back from now, rounded to the minute.
 */
function hoursAgo(h: number): string {
  const d = new Date(Date.now() - h * 3600_000);
  d.setSeconds(0, 0);
  return d.toISOString();
}

function base(
  reference: string,
  status: string,
  stage: TrackingStage,
  statusState: TrackedShipment["statusState"],
): Omit<TrackedShipment, "checkpoints"> {
  return {
    isSample: true,
    reference,
    status,
    stage,
    statusState,
    service: "Parcel — standard",
    origin,
    destination,
    packages,
    lastUpdated: hoursAgo(2),
  };
}

const booked = (h: number) => ({
  status: "Booked",
  description: "Serviceability confirmed and a collection slot agreed.",
  timestamp: hoursAgo(h),
  state: "completed" as const,
});

const collected = (h: number) => ({
  status: "Collected",
  description: "Picked up from the origin address.",
  location: "Newark, NJ",
  timestamp: hoursAgo(h),
  state: "completed" as const,
});

const departed = (h: number) => ({
  status: "In transit",
  description: "Departed the sorting hub.",
  location: "Elizabeth, NJ",
  timestamp: hoursAgo(h),
  state: "completed" as const,
});

/* -------------------------------------------------------------- scenarios */

function inTransit(reference: string): TrackedShipment {
  return {
    ...base(reference, "In transit", "In transit", "current"),
    estimatedDelivery: new Date(Date.now() + 26 * 3600_000).toISOString(),
    checkpoints: [
      {
        status: "In transit",
        description: "Moving through the network toward the delivery depot.",
        location: "Elizabeth, NJ",
        timestamp: hoursAgo(2),
        state: "current",
      },
      collected(9),
      booked(26),
    ],
  };
}

function outForDelivery(reference: string): TrackedShipment {
  return {
    ...base(reference, "Out for delivery", "Out for delivery", "current"),
    estimatedDelivery: new Date(Date.now() + 5 * 3600_000).toISOString(),
    checkpoints: [
      {
        status: "Out for delivery",
        description: "With the driver for delivery today.",
        location: "Brooklyn, NY",
        timestamp: hoursAgo(2),
        state: "current",
      },
      departed(11),
      collected(20),
      booked(34),
    ],
  };
}

function delivered(reference: string): TrackedShipment {
  return {
    ...base(reference, "Delivered", "Delivered", "completed"),
    checkpoints: [
      {
        status: "Delivered",
        description: "Delivered and signed for at the destination.",
        location: "Brooklyn, NY",
        timestamp: hoursAgo(2),
        state: "completed",
      },
      {
        status: "Out for delivery",
        description: "With the driver for delivery.",
        location: "Brooklyn, NY",
        timestamp: hoursAgo(8),
        state: "completed",
      },
      departed(19),
      collected(28),
      booked(42),
    ],
  };
}

function held(reference: string): TrackedShipment {
  return {
    ...base(reference, "Held — action needed", "In transit", "exception"),
    checkpoints: [
      {
        status: "Held at depot",
        description:
          "The delivery address could not be confirmed. Our team has been notified and will make contact.",
        location: "Brooklyn, NY",
        timestamp: hoursAgo(3),
        state: "exception",
      },
      departed(12),
      collected(21),
      booked(35),
    ],
  };
}

function justBooked(reference: string): TrackedShipment {
  return {
    ...base(reference, "Booked", "Booked", "current"),
    lastUpdated: hoursAgo(1),
    checkpoints: [
      {
        status: "Booked",
        description:
          "Serviceability confirmed. The first scan appears once the shipment has been collected.",
        timestamp: hoursAgo(1),
        state: "current",
      },
    ],
  };
}
