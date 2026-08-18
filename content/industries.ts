import { ShoppingCart, Building, Network } from "lucide-react";
import type { Industry, CaseStudy } from "@/types/content";

export const industries: Industry[] = [
  {
    slug: "dtc",
    name: "Direct to Consumer",
    tagline: "Every order goes to somebody who is waiting for it",
    summary:
      "For brands selling straight to customers, where dispatch speed and returns handling are part of the product experience.",
    icon: ShoppingCart,
    published: true,
    hero: {
      eyebrow: "Industry",
      heading: "In DTC, delivery is part of the product",
      body: "Your customer does not separate the parcel from the brand. A late delivery, a damaged box or a return that goes quiet is a review, whether or not you were the one who dropped it.",
    },
    challenges: [
      {
        title: "Dispatch competes with everything else",
        body: "Packing orders is the first thing to fall behind when a promotion lands or the founder is travelling — and it is the thing customers notice first.",
      },
      {
        title: "Returns arrive as a black hole",
        body: "Items come back with no record of condition, so refunds get decided on assumption and saleable stock quietly becomes a write-off.",
      },
      {
        title: "Presentation matters and gets skipped",
        body: "The unboxing you designed is the first thing dropped when someone is packing forty orders at eleven at night.",
      },
      {
        title: "Spikes are unpredictable",
        body: "A product gets picked up somewhere and volume changes shape overnight. Capacity that was fine on Monday is not fine on Wednesday.",
      },
    ],
    howWeHelp: [
      {
        title: "Dispatch off your plate",
        body: "We hold your stock, pick and pack each order to a standard you approve, and dispatch it. Your packaging, your inserts, done the same way every time.",
      },
      {
        title: "Returns with a paper trail",
        body: "Return collection is arranged with your customer, items are inspected against your criteria, and the condition is recorded before you decide anything.",
      },
      {
        title: "Restock what can be resold",
        body: "Returned items that pass inspection go back into sellable stock rather than to disposal by default.",
      },
      {
        title: "Orders flow in directly",
        body: "Connect your Shopify store and orders reach us without being copied out of a spreadsheet — which is where wrong addresses come from.",
      },
    ],
    relatedServices: ["fulfillment", "shipping", "reverse-logistics", "warehousing"],
    seo: {
      title: "Logistics for Direct-to-Consumer Brands",
      description:
        "Your Dart Express for DTC brands — stock held and orders picked and packed to your standard, returns inspected and recorded, and Shopify orders flowing in without manual re-keying.",
      path: "/industries/dtc",
    },
  },

  {
    slug: "b2b",
    name: "B2B",
    tagline: "Trade consignments, documentation and delivery windows",
    summary:
      "For businesses shipping to trade customers, distributors and retail partners, where paperwork and delivery conditions are as important as the goods.",
    icon: Building,
    published: true,
    hero: {
      eyebrow: "Industry",
      heading: "Trade shipments run on documentation",
      body: "A B2B consignment gets rejected for the wrong paperwork, the wrong delivery window or the wrong pallet configuration far more often than it gets lost. We handle the conditions, not just the transport.",
    },
    challenges: [
      {
        title: "Delivery conditions are non-negotiable",
        body: "Trade customers have booking-in requirements, delivery windows and site rules. Miss one and the consignment is turned away at the gate with the transport already paid for.",
      },
      {
        title: "Documentation errors are expensive",
        body: "A missing reference or an incorrect declaration turns a routine consignment into a week of correspondence.",
      },
      {
        title: "Order sizes vary wildly",
        body: "One customer takes a pallet, another takes three cartons. The handling and the transport decision are different every time.",
      },
      {
        title: "Cross-border adds a whole second problem",
        body: "The moment goods cross a border, customs formalities become the thing most likely to stop the shipment.",
      },
    ],
    howWeHelp: [
      {
        title: "Delivery conditions captured at booking",
        body: "Booking-in references, delivery windows and site requirements are recorded with the consignment and travel with it, rather than sitting in an email nobody forwarded.",
      },
      {
        title: "Documentation prepared and checked",
        body: "Paperwork is prepared and reviewed before the consignment moves, because problems found before departure cost far less than problems found at a border.",
      },
      {
        title: "Transport chosen per consignment",
        body: "Parcel, pallet, freight or cross-border — the decision is made on what you are actually sending and when it has to arrive.",
      },
      {
        title: "Customs coordinated",
        body: "For international consignments we coordinate customs formalities and arrange the onward leg through to the delivery address.",
      },
    ],
    relatedServices: ["shipping", "freight-forwarding", "warehousing", "fulfillment"],
    seo: {
      title: "B2B Logistics & Trade Shipments",
      description:
        "Your Dart Express for B2B — booking-in references and delivery windows captured at booking, documentation prepared and checked before departure, and customs formalities coordinated for cross-border consignments.",
      path: "/industries/b2b",
    },
  },

  {
    slug: "omnichannel",
    name: "Omnichannel",
    tagline: "One stock pool behind every sales channel",
    summary:
      "For businesses selling across several channels who need one accurate stock position behind all of them.",
    icon: Network,
    /**
     * UNPUBLISHED. Retained in the content layer, fully written, because the
     * client's long-term scope includes it. It was not among the areas the
     * business confirmed as live, so it is not routed, navigated or indexed.
     * Set `published: true` to launch it — no other change is needed.
     */
    published: false,
    hero: {
      eyebrow: "Industry",
      heading: "One stock position behind every channel",
      body: "Selling in more places multiplies the ways a stock count can be wrong.",
    },
    challenges: [],
    howWeHelp: [],
    relatedServices: ["fulfillment", "warehousing", "shipping"],
    seo: {
      title: "Omnichannel Logistics",
      description: "One stock pool behind every sales channel.",
      path: "/industries/omnichannel",
    },
  },
];

export const publishedIndustries = industries.filter((i) => i.published);

export function getIndustry(slug: string): Industry | undefined {
  return publishedIndustries.find((i) => i.slug === slug);
}

/**
 * CASE STUDIES — intentionally empty.
 *
 * The /case-studies route exists and is designed, but no case study will be
 * published until a real customer engagement is complete and that customer has
 * approved being named. Fabricating a case study is not an option.
 */
export const caseStudies: CaseStudy[] = [];

export const publishedCaseStudies = caseStudies.filter((c) => c.published);
