/**
 * SHIPMENT TRACKING — TYPES
 *
 * These describe the shape a carrier feed must be normalised into. They exist
 * so the whole tracking interface can be built, reviewed and tested before a
 * provider is connected — and so that connecting one is a matter of writing a
 * single mapping function, not redesigning the pages.
 */

export type CheckpointState = "completed" | "current" | "pending" | "exception";

/** How the customer identified the shipment. */
export type TrackingMethod = "reference" | "order" | "mobile";

export interface TrackingCheckpoint {
  /** Short label: "Collected", "In transit", "Out for delivery". */
  status: string;
  /** What happened, in a sentence. */
  description?: string;
  /** Where it happened. Omitted when the carrier does not supply it. */
  location?: string;
  /** ISO 8601. Omitted when the carrier does not supply it. */
  timestamp?: string;
  state: CheckpointState;
}

/** One end of the journey. Every field optional — carriers vary wildly. */
export interface TrackingParty {
  name?: string;
  addressLines?: string[];
  city?: string;
  postcode?: string;
  contactName?: string;
  contactPhone?: string;
}

export interface TrackedPackage {
  description?: string;
  quantity?: number;
  weight?: string;
  dimensions?: string;
}

/** The canonical stages a shipment moves through, for the progress stepper. */
export const TRACKING_STAGES = [
  "Booked",
  "Collected",
  "In transit",
  "Out for delivery",
  "Delivered",
] as const;

export type TrackingStage = (typeof TRACKING_STAGES)[number];

export interface TrackedShipment {
  /**
   * True when this shipment came from demo mode rather than a carrier feed.
   * The UI must render a visible sample-data banner whenever it is set — see
   * components/tracking/shipment-result.tsx. A real carrier response never
   * sets it.
   */
  isSample?: boolean;
  reference: string;
  /** Human-readable overall status, e.g. "In transit". */
  status: string;
  statusState: CheckpointState;
  /** Which canonical stage the shipment has reached, for the stepper. */
  stage?: TrackingStage;
  service?: string;
  /** ISO 8601 of the most recent scan. */
  lastUpdated?: string;
  /** ISO 8601. Only rendered when the carrier actually supplies it. */
  estimatedDelivery?: string;
  origin?: TrackingParty;
  destination?: TrackingParty;
  packages?: TrackedPackage[];
  /** Newest first. */
  checkpoints: TrackingCheckpoint[];
}

/**
 * Every outcome the lookup can produce. The UI switches on `state`, so a new
 * outcome cannot be added without the interface being updated to handle it.
 */
export type TrackingResult =
  | { state: "found"; shipment: TrackedShipment }
  /** The query matched more than one shipment — mobile lookups often do. */
  | { state: "multiple"; shipments: TrackedShipment[] }
  | { state: "not_found"; query: string }
  | { state: "invalid"; message: string }
  /** No carrier feed is configured. See lib/tracking.ts. */
  | { state: "unavailable"; query: string }
  | { state: "error"; message: string };
