import {
  Package,
  Boxes,
  RotateCcw,
  Warehouse,
  Plane,
  ShoppingBag,
  Route,
  MessagesSquare,
  ClipboardCheck,
  Layers,
  Timer,
  ShieldCheck,
  Scale,
  FileCheck2,
  Undo2,
  Wallet,
  BarChart3,
  Truck,
  MapPin,
  Boxes as BoxesIcon,
  Handshake,
} from "lucide-react";
import type { Service } from "@/types/content";

/**
 * CONTENT RULE FOR THIS FILE
 * -------------------------------------------------------------------------
 * Every sentence describes a capability or a way of working. No volumes, no
 * delivery-rate percentages, no coverage maps, no customer counts, no SLAs
 * expressed as numbers. Where timing or geography matters, the copy says it is
 * confirmed per shipment — which is true and is what a new operator can honour.
 *
 * To retire a service from the public site, set `published: false`. Routes,
 * sitemap, navigation and every index page update automatically.
 */

export const services: Service[] = [
  {
    /*
     * NOTE: /services/shipping does NOT render from this entry.
     *
     * Shipping has a purpose-built page — components/sections/shipping-page.tsx,
     * copy in content/shipping.ts — because it is the only service with several
     * offerings to explain. What is still read from here: `name`, `shortName`,
     * `tagline`, `summary` and `icon` (navigation and the /services index),
     * plus `seo` and the JSON-LD built from this object.
     *
     * The hero/whatItIs/benefits/process/bestFor blocks below are kept only so
     * the entry satisfies `Service` alongside the other five. Editing them
     * changes nothing on the page — edit content/shipping.ts instead.
     */
    slug: "shipping",
    name: "Shipping",
    tagline: "Parcels and packages, by road and by air",
    summary:
      "Domestic express, ground delivery and international air shipping for parcels, packages and courier-sized consignments.",
    icon: Package,
    published: true,
    hero: {
      eyebrow: "Shipping",
      heading: "Shipping that moves with your business.",
      body: "From everyday parcels to time-sensitive packages and international air cargo, we help keep your shipments moving with practical road and air shipping solutions.",
    },
    /* The header already carries tracking, so the hero's second button points
       there rather than back to the service index. */
    heroSecondaryCta: { label: "Track shipment", href: "/track" },
    sections: {
      overview: {
        eyebrow: "What we cover",
        heading: "Shipping, built around real delivery needs.",
        lead: "From time-sensitive domestic deliveries to everyday road shipments and international air cargo, we help move parcels and packages based on where they need to go and how they need to move.",
      },
      benefits: {
        eyebrow: "How we help",
        heading: "Shipping options for the way you move.",
      },
      process: {
        eyebrow: "How it works",
        heading: "From first message to shipment delivery.",
      },
      bestFor: { heading: "Who this is for" },
    },
    whatItIs: [
      "Domestic express shipping for suitable parcels and packages.",
      "Ground delivery for parcels, packages and courier-sized shipments.",
      "International shipping through air transportation.",
      "Shipment tracking and support throughout the journey.",
    ],
    benefits: [
      {
        title: "Domestic Express",
        body: "A practical option for parcels and packages that need to move quickly within the country.",
        icon: Timer,
        visual: { kind: "steps", steps: ["Collected", "In transit", "Delivered"] },
      },
      {
        title: "Ground Shipping",
        body: "Reliable road delivery for parcels, packages and courier-sized shipments.",
        icon: Truck,
        /* The three labels ARE the scope of this service. Road here means
           parcels and courier-sized consignments — not LTL, not truckload. */
        visual: {
          kind: "checks",
          items: [{ label: "Parcels" }, { label: "Packages" }, { label: "Courier-sized" }],
        },
      },
      {
        title: "International Air Shipping",
        body: "Move international parcels, packages and air cargo across borders through air transportation.",
        icon: Plane,
        visual: {
          kind: "checks",
          items: [
            { label: "International parcels" },
            { label: "Packages" },
            { label: "Air cargo" },
          ],
        },
      },
      {
        title: "Tracking & Support",
        body: "Stay informed about your shipment and get support when you need it.",
        icon: MapPin,
        visual: {
          kind: "notify",
          to: "You",
          pings: ["Collected", "In transit", "Delivered"],
        },
      },
    ],
    process: [
      {
        step: "01",
        title: "Share the shipment",
        body: "Tell us what you need to move, where it is going and the details we need to understand your shipping requirements.",
      },
      {
        step: "02",
        title: "We confirm the details",
        body: "We review the shipment requirements and help determine a suitable road or air shipping option.",
      },
      {
        step: "03",
        title: "Your shipment moves",
        body: "Once the shipping details are in place, your shipment begins its journey to the destination.",
      },
      {
        step: "04",
        title: "Track and follow up",
        body: "Stay informed about your shipment's progress and reach out to our team when you need support.",
      },
    ],
    bestFor: [
      {
        title: "Businesses shipping parcels and packages",
        body: "For businesses that regularly need to move customer orders and business shipments.",
      },
      {
        title: "Teams with time-sensitive deliveries",
        body: "For shipments where domestic express delivery is a more suitable option.",
      },
      {
        title: "Businesses shipping internationally",
        body: "For parcels, packages and air cargo that need to move across borders by air.",
      },
    ],
    cta: {
      heading: "Let's find the right way to move your shipment.",
      body: "Tell us what you need to ship and where it needs to go. Our team will help you get the conversation started.",
      secondary: { label: "Track shipment", href: "/track" },
    },
    seo: {
      title: "Shipping Services — Domestic Ground, Express & International Air",
      description:
        "Parcel, package and courier-sized shipping from Your Dart Express: domestic ground and express by road, international air shipping and air cargo with onward road delivery, plus quotes, shipment tracking and support.",
      path: "/services/shipping",
    },
  },

  {
    slug: "fulfillment",
    name: "Fulfillment",
    tagline: "Store, pick, pack, dispatch",
    summary:
      "We hold your stock, pick and pack each order as it comes in, and dispatch it — so order volume stops competing with the rest of your day.",
    icon: Boxes,
    published: true,
    hero: {
      eyebrow: "Service",
      heading: "Your orders, picked and packed for you",
      body: "Send us your inventory. When an order arrives, we pick it, pack it to your specification and dispatch it. You keep selling; the physical work happens on our side.",
    },
    whatItIs: [
      "Inbound receiving and check-in of your stock against the expected manifest.",
      "Storage under recorded stock counts, with discrepancies flagged on arrival.",
      "Order-by-order picking and packing, including your own packaging and inserts.",
      "Same-flow dispatch into shipping, so fulfilment and delivery are not two vendors.",
    ],
    benefits: [
      {
        title: "Packed the way you specify",
        body: "Your boxes, your inserts, your presentation. We follow a written packing standard you approve, not a generic default.",
        icon: ClipboardCheck,
        visual: { kind: "annotated", subject: "Your carton", notes: ["Box type", "Inserts", "Labelling"] },
      },
      {
        title: "Fulfilment and shipping together",
        body: "The team that packs the order is the team that ships it. No handoff between suppliers where accountability can go missing.",
        icon: Layers,
        visual: { kind: "merge", lanes: ["Packed", "Shipped"], into: "One team", without: "Supplier handoff" },
      },
      {
        title: "Stock counted on arrival",
        body: "Inbound is checked against what you told us to expect. Shortages and damage are reported before they become a stockout.",
        icon: BoxesIcon,
        visual: { kind: "compare", left: "Expected", right: "Received", rows: ["Carton A", "Carton B", "Carton C"], flagged: 2 },
      },
      {
        title: "Scales with your order flow",
        body: "Built to take on more volume as you grow, without you having to renegotiate how the whole operation works.",
        icon: BarChart3,
        visual: { kind: "levels", bars: [{ label: "Quiet", height: 38 }, { label: "Normal", height: 62 }, { label: "Peak", height: 96 }] },
      },
    ],
    process: [
      {
        step: "01",
        title: "Send us your stock",
        body: "You share an inbound manifest and deliver the inventory. We receive, count and check it in.",
      },
      {
        step: "02",
        title: "Agree the packing standard",
        body: "We document exactly how each SKU should be picked, packed and presented, and you sign it off.",
      },
      {
        step: "03",
        title: "Orders come in",
        body: "As orders arrive — from your store, a spreadsheet or a connected channel — we pick and pack them.",
      },
      {
        step: "04",
        title: "Dispatched",
        body: "The packed order moves straight into shipping and out to your customer.",
      },
    ],
    bestFor: [
      "Stores that have outgrown packing orders at home or in the office",
      "Businesses running promotions with unpredictable order spikes",
      "Brands where unboxing and presentation matter",
    ],
    seo: {
      title: "E-commerce Fulfillment Services",
      description:
        "Order fulfillment from Your Dart Express — inbound receiving, recorded storage, pick and pack to your own packing standard, and dispatch straight into shipping.",
      path: "/services/fulfillment",
    },
  },

  {
    slug: "reverse-logistics",
    name: "Reverse Logistics",
    shortName: "Returns",
    tagline: "Returns collected and brought back",
    summary:
      "Returns collected from your customer, brought back to you or to our warehouse, inspected and recorded — so a return does not become a write-off by default.",
    icon: RotateCcw,
    published: true,
    hero: {
      eyebrow: "Service",
      heading: "Returns handled like a real part of the operation",
      body: "A return is a second shipment with a customer already waiting on it. We collect it, move it back, inspect it against your criteria and tell you what condition it arrived in.",
    },
    whatItIs: [
      "Return pickup arranged from the customer's address.",
      "Movement back to your premises or into our warehouse, whichever you prefer.",
      "Condition inspection against criteria you define, with findings recorded.",
      "Restock, hold or segregate — the disposition you specify, applied consistently.",
    ],
    benefits: [
      {
        title: "Your customer is not left waiting",
        body: "Return collection is scheduled and confirmed, so the person waiting for a refund knows something is actually happening.",
        icon: Undo2,
        visual: { kind: "notify", to: "Your customer", pings: ["Collection booked", "Collected", "Refund released"] },
      },
      {
        title: "Condition recorded on arrival",
        body: "Every returned item is checked against your criteria and the outcome written down. You decide refunds on evidence, not assumption.",
        icon: ClipboardCheck,
        visual: { kind: "inspect", subject: "Returned item", criteria: ["Condition", "Reason code", "Photographs"] },
      },
      {
        title: "Stock back into circulation",
        body: "Items that pass inspection can go straight back into sellable stock if we are holding your inventory.",
        icon: RotateCcw,
        visual: { kind: "cycle", nodes: ["Returned", "Inspected", "Sellable"] },
      },
      {
        title: "Your disposition rules, applied",
        body: "Restock, quarantine, return to you, hold for review — you set the rule per outcome and we follow it every time.",
        icon: ShieldCheck,
        visual: { kind: "branch", from: "Outcome", outcomes: ["Restock", "Quarantine", "Return to you"] },
      },
    ],
    process: [
      {
        step: "01",
        title: "Raise the return",
        body: "You send us the return request with the original order reference and the customer's collection address.",
      },
      {
        step: "02",
        title: "Collection arranged",
        body: "We contact the customer, agree a slot and collect the item.",
      },
      {
        step: "03",
        title: "Inspected on arrival",
        body: "The item is checked against your condition criteria and the result is recorded with the return reference.",
      },
      {
        step: "04",
        title: "Disposition applied",
        body: "Restocked, held or sent back to you — whichever rule you set for that outcome.",
      },
    ],
    bestFor: [
      "Apparel, footwear and other categories with routine returns",
      "Stores where returns currently arrive with no record of condition",
      "Businesses that want returned stock resold rather than written off",
    ],
    seo: {
      title: "Reverse Logistics & Returns Management",
      description:
        "Returns management from Your Dart Express — collection from your customer, transport back, condition inspection against your criteria, and the disposition rule you define.",
      path: "/services/reverse-logistics",
    },
  },

  {
    slug: "warehousing",
    name: "Warehousing",
    tagline: "Space, stock control and dispatch access",
    summary:
      "Storage for your inventory with recorded stock movements, so you always know what is on hand and what has left the building.",
    icon: Warehouse,
    published: true,
    hero: {
      eyebrow: "Service",
      heading: "Somewhere to put your stock, properly recorded",
      body: "Warehousing is not just floor space. It is knowing what arrived, what is on hand, what went out and when — and being able to answer that question without walking the aisles.",
    },
    whatItIs: [
      "Inbound receiving with a check against the expected manifest.",
      "Organised storage with recorded locations, so stock can actually be found.",
      "Stock movements logged in and out, with counts reconciled on a schedule you agree.",
      "Direct access to fulfilment and shipping from the same site.",
    ],
    benefits: [
      {
        title: "Stock you can account for",
        body: "Movements are recorded as they happen. Reconciliation is a report you receive, not an annual surprise.",
        icon: ClipboardCheck,
        visual: { kind: "ledger", rows: [{ label: "Goods in" }, { label: "Picked", out: true }, { label: "Dispatched", out: true }, { label: "Goods in" }] },
      },
      {
        title: "Storage that matches the goods",
        body: "Handling requirements are agreed before intake, so fragile, bulky or sensitive stock is stored appropriately rather than wherever it fits.",
        icon: ShieldCheck,
        visual: { kind: "bays", bays: ["Fragile", "Bulky", "Sensitive"] },
      },
      {
        title: "One site, three functions",
        body: "Stored, picked and dispatched from the same place. Nothing has to be trucked between vendors to get out the door.",
        icon: Layers,
        visual: { kind: "zones", site: "One site", zones: ["Store", "Pick", "Dispatch"] },
      },
      {
        title: "Capacity that flexes",
        body: "Space is agreed against your actual needs and reviewed as they change, rather than locked to a fixed footprint you have to grow into.",
        icon: Scale,
        visual: { kind: "capacity", label: "Agreed space", marks: ["Reviewed", "Adjusted"] },
      },
    ],
    process: [
      {
        step: "01",
        title: "Scope the requirement",
        body: "We go through volume, handling requirements, turnover and how long stock typically sits.",
      },
      {
        step: "02",
        title: "Intake",
        body: "Stock arrives, is checked against the manifest, and is put away to recorded locations.",
      },
      {
        step: "03",
        title: "Held and tracked",
        body: "Everything in and out is logged. You get stock position on the cadence you ask for.",
      },
      {
        step: "04",
        title: "Out the door",
        body: "Release stock into fulfilment, into a shipment, or back to you whenever you need it.",
      },
    ],
    bestFor: [
      "Businesses holding stock at home, in an office or in overflow space",
      "Importers who need somewhere for a container to land",
      "Sellers who need stock positioned closer to dispatch",
    ],
    seo: {
      title: "Warehousing & Storage Services",
      description:
        "Warehousing from Your Dart Express — inbound checking, recorded storage locations, logged stock movements and direct access to fulfillment and shipping from the same site.",
      path: "/services/warehousing",
    },
  },

  {
    slug: "freight-forwarding",
    name: "Air Freight Forwarding",
    tagline: "Cargo flown across borders",
    summary:
      "We book air carriage, prepare the documentation and coordinate customs formalities so your cargo moves between countries without stalling at a desk.",
    icon: Plane,
    published: true,
    hero: {
      eyebrow: "Service",
      heading: "Cross-border air cargo, arranged and documented",
      body: "Freight moves on paperwork as much as on aircraft. We book the carriage, prepare the documentation and coordinate customs formalities, and we tell you where the consignment actually is.",
    },
    whatItIs: [
      "Air carriage booked on a routing that fits the cargo and the deadline.",
      "Documentation prepared and checked before the consignment moves.",
      "Customs formalities coordinated with the relevant brokers and authorities.",
      "Onward movement arranged from the arrival airport through to the final destination.",
    ],
    benefits: [
      {
        title: "Documentation checked first",
        body: "Paperwork is prepared and reviewed before departure. Most border delays are document problems that could have been caught earlier.",
        icon: FileCheck2,
        visual: { kind: "stamp", docs: ["Commercial invoice", "Packing list", "Certificates"], mark: "Checked" },
      },
      {
        title: "Air freight, and we say so",
        body: "We forward by air. We do not run ocean or rail freight, and you will hear that from us up front rather than after the booking is taken.",
        icon: Plane,
        visual: { kind: "modes", modes: [{ label: "Air", ok: true }, { label: "Ocean", ok: false }, { label: "Rail", ok: false }] },
      },
      {
        title: "Customs coordinated",
        body: "We work with brokers and authorities on the formalities, and we come back to you with what is required rather than what went wrong.",
        icon: ShieldCheck,
        visual: { kind: "parties", left: ["Broker", "Carrier"], right: ["Authorities"], border: "Border" },
      },
      {
        title: "Through to the door",
        body: "Arrival at an airport is not delivery. We arrange the onward leg so the consignment finishes its journey.",
        icon: Route,
        visual: { kind: "lastleg", legs: ["Airport", "Customs", "Your door"] },
      },
    ],
    process: [
      {
        step: "01",
        title: "Tell us the cargo",
        body: "Commodity, weight, dimensions, origin, destination and the date it needs to arrive.",
      },
      {
        step: "02",
        title: "Routing and quote",
        body: "We propose the air routing, confirm what documentation is required, and quote it.",
      },
      {
        step: "03",
        title: "Booked and documented",
        body: "Carriage is booked, documents are prepared and checked, and the consignment departs.",
      },
      {
        step: "04",
        title: "Cleared and delivered",
        body: "Customs formalities are coordinated on arrival and the onward leg is arranged to the final address.",
      },
    ],
    bestFor: [
      "Importers bringing time-sensitive stock in from overseas suppliers",
      "Exporters shipping to international customers or distributors",
      "Businesses that have had consignments stall at customs",
    ],
    seo: {
      title: "Air Freight Forwarding Services",
      description:
        "Air freight forwarding from Your Dart Express — air carriage booked, documentation prepared and checked, customs formalities coordinated and onward delivery arranged.",
      path: "/services/freight-forwarding",
    },
  },

  {
    slug: "shop-and-ship",
    name: "Shop and Ship",
    tagline: "Buy where you like, we forward it on",
    summary:
      "Have purchases delivered to us, and we forward them on to you — useful when a retailer will not ship to your address directly.",
    icon: ShoppingBag,
    published: true,
    hero: {
      eyebrow: "Service",
      heading: "Shop anywhere. We handle the last leg.",
      body: "Plenty of retailers will not ship to where you are. Have the order delivered to us instead, and we forward it on — consolidating multiple purchases into one onward shipment where it makes sense.",
    },
    whatItIs: [
      "A delivery address you can use at checkout with retailers that will not ship to you.",
      "Receipt and check-in of parcels as they arrive from those retailers.",
      "Optional consolidation of several purchases into a single onward shipment.",
      "Onward forwarding, with the required documentation prepared for the route.",
    ],
    benefits: [
      {
        title: "Buy from retailers that exclude you",
        body: "Use our address at checkout and the shipping restriction stops being a reason you cannot order.",
        icon: ShoppingBag,
        visual: { kind: "checkout", field: "Delivery address", value: "Our address", note: "Accepted" },
      },
      {
        title: "Consolidate before forwarding",
        body: "Several parcels can be combined into one onward shipment, so you are not paying to move each box separately.",
        icon: Layers,
        visual: { kind: "consolidate", from: 4, into: "One shipment" },
      },
      {
        title: "Checked in on arrival",
        body: "We confirm what turned up. If a retailer sends the wrong thing, you know before it has crossed a border.",
        icon: ClipboardCheck,
        visual: { kind: "arrival", subject: "What turned up", checks: ["Received", "Condition", "Contents"] },
      },
      {
        title: "Documentation prepared",
        body: "Onward movement needs paperwork. We prepare what the route requires rather than leaving it to the recipient.",
        icon: FileCheck2,
        visual: { kind: "exportdocs", title: "Export documents", docs: ["Invoice", "Declaration", "Declared value"] },
      },
    ],
    process: [
      {
        step: "01",
        title: "Get your delivery address",
        body: "Talk to us and we set you up with the address to use at checkout.",
      },
      {
        step: "02",
        title: "Shop as normal",
        body: "Order from the retailer and have it delivered to that address.",
      },
      {
        step: "03",
        title: "We receive and check",
        body: "Parcels are received and checked in. Tell us if you want to wait and consolidate more.",
      },
      {
        step: "04",
        title: "Forwarded to you",
        body: "We prepare the documentation and forward the shipment on to your address.",
      },
    ],
    bestFor: [
      "Buyers blocked by retailer shipping restrictions",
      "People ordering from several retailers who want one onward shipment",
      "Businesses sourcing samples or small quantities from overseas",
    ],
    seo: {
      title: "Shop and Ship — Package Forwarding",
      description:
        "Shop and Ship from Your Dart Express — use our address at checkout with retailers that will not ship to you, consolidate purchases, and have them forwarded on with the documentation prepared.",
      path: "/services/shop-and-ship",
    },
  },
];

/** Only these ever reach navigation, routing, sitemap or index pages. */
export const publishedServices = services.filter((s) => s.published);

export function getService(slug: string): Service | undefined {
  return publishedServices.find((s) => s.slug === slug);
}

/** Used on the homepage — the services most businesses arrive looking for. */
export const featuredServiceSlugs = [
  "shipping",
  "fulfillment",
  "warehousing",
  "reverse-logistics",
] as const;

export const homepageServices = featuredServiceSlugs
  .map((slug) => publishedServices.find((s) => s.slug === slug))
  .filter((s): s is (typeof services)[number] => Boolean(s));

/** Icons re-exported for the "why us" block so it shares one icon vocabulary. */
export const sharedIcons = { Truck, Handshake, Wallet, MessagesSquare };
