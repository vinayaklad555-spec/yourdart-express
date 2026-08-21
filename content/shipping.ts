import {
  Package,
  Boxes,
  PackageOpen,
  Truck,
  Timer,
  Plane,
  PlaneTakeoff,
  Route,
  Globe,
  Radar,
  Wallet,
  Headset,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * COPY FOR /services/shipping
 *
 * This page has its own content file because it is the only service with more
 * than one offering to explain — road and air, domestic and international —
 * and the shared `Service` shape cannot carry that without bending it out of
 * use for the other five.
 *
 * CONTENT RULE, same as content/services.ts and stricter here:
 * every line describes something the company actually does. What is NOT
 * offered, and must not appear on this page in any form:
 *
 *   LTL · less-than-truckload · truckload freight · postal distribution ·
 *   sea freight or container shipping · a separate International Express tier
 *
 * Also absent by design: delivery-time guarantees, coverage claims, and any
 * suggestion of an automated landed-cost calculator. Cost is described as
 * quote support, because that is what exists — a person answering with a
 * price, not a system computing one.
 */

export interface ShipmentType {
  title: string;
  body: string;
  icon: LucideIcon;
}

export interface ShippingService {
  title: string;
  body: string;
  icon: LucideIcon;
}

export const shippingHero = {
  eyebrow: "Shipping",
  heading: "Shipping that moves with your business.",
  body: "Parcels, packages and courier-sized shipments — moved by road across the country and by air across borders, with tracking throughout and a team you can actually reach.",
  primaryCta: { label: "Get a quote", href: "/talk-to-an-expert" },
  secondaryCta: { label: "Track shipment", href: "/track" },
};

/** Section 2 — what the service is built around. */
export const shipmentTypes = {
  eyebrow: "What we ship",
  heading: "Built around parcels, packages and courier-sized shipments",
  lead: "One parcel or a steady daily run, the shipment is handled the same way: checked before it moves, moved on the service that suits it, and confirmed when it lands.",
  items: [
    {
      title: "Parcels",
      body: "Single items and small consignments — one-off sends through to regular daily volume.",
      icon: Package,
    },
    {
      title: "Packages",
      body: "Larger or multi-item shipments that need more thought about how they are packed and handled.",
      icon: Boxes,
    },
    {
      title: "Courier-sized shipments",
      body: "Consignments above a standard parcel that still move on our road and air services.",
      icon: PackageOpen,
    },
  ] satisfies ShipmentType[],
};

/** Section 3 — the four confirmed services. */
export const shippingServices = {
  eyebrow: "Shipping services",
  heading: "Four ways we move a shipment",
  lead: "Two domestic, two international. Which one a shipment takes is decided per consignment, on what it is and when it has to arrive.",
  items: [
    {
      title: "Domestic ground shipping",
      body: "Road movement for parcels, packages and courier-sized shipments travelling within the country.",
      icon: Truck,
    },
    {
      title: "Domestic express",
      body: "The faster domestic option, for shipments that need to be there sooner than standard road.",
      icon: Timer,
    },
    {
      title: "International air shipping",
      body: "Parcels, packages and air cargo moved across borders by air.",
      icon: Plane,
    },
    {
      title: "Air cargo with road delivery",
      body: "Air cargo to the destination country, with the onward road leg arranged where the shipment needs to reach a final address.",
      icon: PlaneTakeoff,
    },
  ] satisfies ShippingService[],
};

/** Section 4 — domestic, in detail. */
export const domesticShipping = {
  eyebrow: "Domestic shipping",
  heading: "Two ways to move a shipment at home",
  body: "Most domestic shipments travel by road. When something has to arrive sooner, express is the option — chosen for the shipment that needs it rather than applied to everything you send.",
  points: [
    {
      title: "Ground shipping",
      body: "Road movement for parcels, packages and courier-sized shipments, on the service that suits the consignment.",
    },
    {
      title: "Domestic express",
      body: "For time-sensitive shipments. We confirm what is achievable for the route before you commit to it.",
    },
  ],
};

/** Section 5 — international, in detail. */
export const internationalShipping = {
  eyebrow: "International air shipping",
  heading: "Across borders by air",
  body: "International shipments move as air cargo. Where the destination needs it, we arrange the road leg at the other end, so the shipment reaches the delivery address rather than stopping at the airport.",
  points: [
    { title: "International parcels and packages", body: "Moved by air on the same booking process as domestic." },
    { title: "Air cargo", body: "Larger consignments prepared and moved as air cargo." },
    { title: "Onward road delivery", body: "Arranged where the shipment needs to travel beyond the arrival airport." },
  ],
};

/** Section 6 — the journey, start to finish. */
export const shippingProcess = {
  eyebrow: "How it works",
  heading: "How your shipment moves",
  lead: "Six steps from the first message to a delivered shipment you can still ask us about.",
  steps: [
    { step: "01", title: "Request a quote", body: "Send the shipment details — what it is, where it is going and when it needs to arrive." },
    { step: "02", title: "Confirm your shipment", body: "We come back with the price and the service that fits, and confirm what we can support." },
    { step: "03", title: "Pickup or drop-off", body: "The shipment is collected from you or dropped with us, whichever suits the booking." },
    { step: "04", title: "Road or air transport", body: "It moves on the service booked — domestic road, domestic express, or air for international." },
    { step: "05", title: "Delivery", body: "The shipment reaches the delivery address, including the onward road leg on international bookings." },
    { step: "06", title: "Track and get support", body: "Follow it from the tracking page, and reach the same team afterwards if anything needs chasing." },
  ],
};

/** Section 7 — cost. Quote support, deliberately not a calculator. */
export const shippingCost = {
  eyebrow: "Cost",
  heading: "Know what a shipment costs before you send it",
  body: "Send us the details and we will come back with a quote against your actual shipment — not a rate card. For international bookings we set out what else affects the cost at the destination, so the total is understood before anything moves.",
  cta: { label: "Get a quote", href: "/talk-to-an-expert" },
  /** Rendered as a quote-summary panel, not as a live calculator. */
  quote: {
    title: "What a quote covers",
    rows: [
      { label: "Origin and destination", value: "Per shipment" },
      { label: "Weight and dimensions", value: "Per shipment" },
      { label: "Service — road, express or air", value: "Confirmed with you" },
      { label: "International cost factors", value: "Set out upfront" },
    ],
    footnote: "Quotes are prepared by our team against the shipment you describe.",
  },
};

/** Section 8 — tracking. */
export const shippingTracking = {
  eyebrow: "Tracking",
  heading: "Follow the shipment after it leaves you",
  body: "Every shipment can be tracked from the header of this site. Enter the reference and see the stage it has reached, so you are not waiting on an email to find out where something is.",
  cta: { label: "Track shipment", href: "/track" },
  stages: ["Booked", "Collected", "In transit", "Out for delivery", "Delivered"],
};

/** Section 9 — after the shipment lands. */
export const shippingSupport = {
  eyebrow: "Support",
  heading: "We stay reachable after dispatch",
  body: "Questions do not stop when a shipment does. If something needs chasing, changing or explaining, you reach the same team that arranged it — not a queue where you start the story again.",
  points: [
    "Help with a shipment that is in progress",
    "Answers on paperwork and requirements",
    "Someone to follow up when a delivery needs attention",
  ],
};

/** Section 10 — why us, in practical terms. */
export const shippingValue = {
  eyebrow: "Why Your Dart Express",
  heading: "What you get working with us",
  items: [
    { title: "Road and air in one place", body: "Domestic road, domestic express and international air handled by the same team, on one account.", icon: Route },
    { title: "Domestic and international", body: "Shipments that stay in the country and shipments that cross a border are booked the same way.", icon: Globe },
    { title: "Visibility after dispatch", body: "Tracking from the header of this site, so the shipment's progress is not a phone call away.", icon: Radar },
    { title: "Cost clarity upfront", body: "A quote against your actual shipment, with international cost factors set out before you commit.", icon: Wallet },
    { title: "Support that continues", body: "The same team stays reachable once the shipment is moving, and after it arrives.", icon: Headset },
    /* Six, not five: the grid runs three across, and five left a visible hole
       in the last row. This one is also true — see whyUs on the homepage. */
    { title: "One team on your account", body: "The same people handle your bookings and your questions, so nothing has to be explained twice.", icon: Users },
  ],
};

/** Section 11 — the close. */
export const shippingCta = {
  heading: "Let's get your shipment moving.",
  body: "Tell us what you need to ship and where it needs to go. We will come back with a quote and the service that fits it.",
  primary: { label: "Get a quote", href: "/talk-to-an-expert" },
  secondary: { label: "Track shipment", href: "/track" },
};
