import {
  Timer,
  Truck,
  Package,
  Plane,
  Radar,
  Layers,
  Globe,
  Headset,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * COPY FOR /services/shipping
 *
 * SIX sections, deliberately. An earlier version ran to eleven and said the
 * same things more than once — parcels were introduced, then listed as a
 * service, then explained again; tracking had a section, a service card and a
 * value block. Everything below earns its place or it is not here.
 *
 * CONTENT RULE, stricter on this page than elsewhere: every line describes
 * something the company actually does. What is NOT offered, and must not
 * appear in any form:
 *
 *   LTL · truckload · postal distribution · ocean freight or cargo ships ·
 *   a second international method or tier
 *
 * Also absent by design: delivery-time guarantees, coverage claims, and any
 * suggestion of an automated landed-cost calculator — no such system exists
 * on the site, so the page does not imply one.
 */

export interface ShippingService {
  title: string;
  body: string;
  icon: LucideIcon;
}

/** 1 — Hero. Broad offering, four lines, two actions. */
export const shippingHero = {
  eyebrow: "Shipping",
  heading: "Shipping that moves with your business.",
  body: "Parcels, packages and courier-sized shipments — moved by road across the country, by air across borders, and tracked the whole way.",
  primaryCta: { label: "Get a quote", href: "/talk-to-an-expert" },
  secondaryCta: { label: "Track shipment", href: "/track" },
};

/** 2 — What you can actually ship with us. The page's main answer. */
export const shippingServices = {
  eyebrow: "Services we offer",
  heading: "Shipping services",
  lead: "Everything below is a service we run today. Which one a shipment takes is decided per consignment, on what it is and where it has to be.",
  items: [
    {
      title: "Domestic express",
      body: "The quicker domestic option, for shipments that cannot wait for standard road.",
      icon: Timer,
    },
    {
      title: "Ground shipping",
      body: "Road movement within the country, for shipments suited to travelling by road.",
      icon: Truck,
    },
    {
      title: "Parcel and package shipping",
      body: "Parcels, packages and courier-sized shipments, from one-off sends to steady volume.",
      icon: Package,
    },
    {
      title: "International air shipping",
      body: "Shipments crossing a border move by air, with the onward road leg arranged where it is needed.",
      icon: Plane,
    },
    {
      title: "Tracking and shipment support",
      body: "Follow a shipment from the header of this site, and reach the same team while it is moving.",
      icon: Radar,
    },
  ] satisfies ShippingService[],
};

/**
 * 3 — Choosing. Framed as decisions a customer is already making, NOT as a
 * second pass over the service list.
 */
export const rightShipping = {
  eyebrow: "Choosing a service",
  heading: "The right way to move every shipment",
  body: "What a shipment needs depends on what it is and where it is going. We work that out with you at the quote rather than leaving you to pick from a menu.",
  points: [
    {
      title: "One parcel or a regular run",
      body: "Volume does not change how a shipment is handled — it changes which service is worth booking.",
    },
    {
      title: "When it has to be there sooner",
      body: "Express is chosen for the shipment that needs it, not applied to everything you send.",
    },
    {
      title: "When it crosses a border",
      body: "International shipments move by air, and we arrange road delivery at the other end where the address needs it.",
    },
  ],
};

/** 4 — Compact. A supporting explanation, not the centre of the page. */
export const shippingSteps = {
  eyebrow: "How it works",
  heading: "From first message to delivered",
  steps: [
    { step: "01", title: "Tell us what you're shipping", body: "Share your shipment details and destination." },
    { step: "02", title: "Get the right shipping option", body: "We help identify the suitable service for your requirements." },
    { step: "03", title: "Book and send your shipment", body: "Your shipment is arranged through the appropriate delivery network." },
    { step: "04", title: "Track it along the way", body: "Follow your shipment and get support when needed." },
  ],
};

/** 5 — Four reasons, each saying something the others do not. */
export const shippingValue = {
  eyebrow: "Why Your Dart Express",
  heading: "Why ship with us",
  items: [
    {
      title: "Clear shipping options",
      body: "A short list of services we actually run, and help choosing between them.",
      icon: Layers,
    },
    {
      title: "Domestic and international",
      body: "Road within the country and air across borders, booked through one team.",
      icon: Globe,
    },
    {
      title: "Shipment tracking",
      body: "Check where a shipment has reached from the header of any page.",
      icon: Radar,
    },
    {
      title: "Dedicated support",
      body: "The people who arranged your shipment stay reachable while it moves, and after.",
      icon: Headset,
    },
  ],
};

/** 6 — The close. */
export const shippingCta = {
  heading: "Ready to move your next shipment?",
  body: "Tell us what you are sending and where it needs to go. We will come back with a quote and the service that fits.",
  primary: { label: "Get a quote", href: "/talk-to-an-expert" },
  secondary: { label: "Track shipment", href: "/track" },
};
