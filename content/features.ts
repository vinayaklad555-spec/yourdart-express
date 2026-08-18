import {
  Cpu,
  Compass,
  Leaf,
  BarChart3,
  Store,
  Building2,
  Plug,
} from "lucide-react";
import type { Feature } from "@/types/content";

/**
 * "Highlights" in the client scope — how the company works, rather than what it
 * sells. These pages describe approach and capability. They deliberately carry
 * no performance figures, no uptime claims, no certifications and no named
 * partners, because none of those have been supplied by the business.
 */

export const features: Feature[] = [
  {
    slug: "technology",
    name: "Our Technology",
    tagline: "Systems that keep everyone looking at the same information",
    summary:
      "Bookings, stock and shipment status recorded in one place, so what you are told matches what is actually happening.",
    icon: Cpu,
    published: true,
    hero: {
      eyebrow: "How we work",
      heading: "Technology in service of an answer",
      body: "The value of a logistics system is not the interface. It is that when you ask where something is, the answer is correct, current and the same one everybody else can see.",
    },
    sections: [
      {
        heading: "One record per shipment",
        body: "Every booking creates a single record that carries the shipment from collection to delivery. Handovers, exceptions and confirmations are written to that record as they happen, rather than living in somebody's inbox.",
        points: [
          "Booking details, handling instructions and references captured once",
          "Status written at each handover rather than reconstructed afterwards",
          "Exceptions logged against the shipment, not raised and forgotten",
        ],
      },
      {
        heading: "Stock that reconciles",
        body: "For fulfilment and warehousing customers, inbound receipts, picks and dispatches are recorded as movements. Stock position is derived from those movements, which is what makes a count something you can check rather than something you have to trust.",
        points: [
          "Inbound checked against the expected manifest",
          "Picks and dispatches logged against the order",
          "Reconciliation reported on an agreed cadence",
        ],
      },
      {
        heading: "Connected to where you sell",
        body: "Orders can reach us directly from a connected sales channel instead of being re-keyed from a spreadsheet. Fewer transcriptions means fewer wrong addresses, and a wrong address is one of the most expensive mistakes in this business.",
        points: [
          "Shopify orders can flow through without manual entry",
          "Bulk order intake for channels that are not directly connected",
          "Order references preserved end to end so returns can be matched back",
        ],
      },
      {
        heading: "Built to be extended",
        body: "We are a young company and our systems are being developed alongside the operation. We would rather tell you plainly what is in place today than describe a platform that does not exist yet. What is running is running; what is coming, we will say is coming.",
      },
    ],
    seo: {
      title: "Our Technology",
      description:
        "How Your Dart Express uses systems — one record per shipment, stock positions derived from logged movements, and connected sales channels that remove manual re-keying.",
      path: "/technology",
    },
  },

  {
    slug: "approach",
    name: "Our Approach",
    tagline: "Fewer promises, kept properly",
    summary:
      "How we take on work, what we commit to, and what we do when something goes wrong — stated plainly.",
    icon: Compass,
    published: true,
    hero: {
      eyebrow: "How we work",
      heading: "We would rather be accurate than impressive",
      body: "Logistics is a business where the difference between a good supplier and a bad one usually shows up on the bad day. Our approach is built around that day.",
    },
    sections: [
      {
        heading: "We confirm before we commit",
        body: "Serviceability, handling requirements and timelines are checked before we accept a booking. Saying yes to something we cannot do is worse for you than saying no, because you find out later, with a customer already waiting.",
      },
      {
        heading: "We tell you when something goes wrong",
        body: "Shipments get delayed, held and refused. That happens to every operator. What should not happen is you finding out from your own customer. When a shipment is in trouble, we raise it, we say what we are doing, and we stay on it until it is resolved.",
      },
      {
        heading: "One team, one thread",
        body: "You deal with the same people. They know your account, your packing standard and your last three problems. Nobody asks you to re-explain a shipment you have already explained.",
      },
      {
        heading: "We write things down",
        body: "Packing standards, handling instructions, return criteria and disposition rules are documented and agreed. That is what makes a service repeatable when volume increases and different people are doing the work.",
      },
      {
        heading: "We grow where we can deliver",
        body: "We would rather do a smaller set of things properly than list capabilities we are not ready to honour. As the operation grows, what we offer grows with it — in that order.",
      },
    ],
    seo: {
      title: "Our Approach",
      description:
        "How Your Dart Express works — confirming serviceability before committing, raising exceptions early, one accountable team per account, and documented, repeatable standards.",
      path: "/approach",
    },
  },

  {
    slug: "sustainability",
    name: "Sustainability",
    tagline: "Practical choices, honestly described",
    summary:
      "The operational decisions that reduce waste and unnecessary movement, described without environmental claims we cannot evidence.",
    icon: Leaf,
    published: true,
    hero: {
      eyebrow: "How we work",
      heading: "What we actually do, not what sounds good",
      body: "We are not going to publish a carbon figure we have not measured. What we can describe is the set of operational choices that reduce waste and avoid moving things further than they need to go.",
    },
    sections: [
      {
        heading: "Consolidate before moving",
        body: "Wherever a customer's shipments allow it, we combine consignments so fewer, fuller movements happen instead of many part-empty ones. This is the single most effective thing a logistics operator can do, and it also costs you less.",
      },
      {
        heading: "Right-size the packaging",
        body: "Oversized boxes mean shipping air, more void fill and more damage in transit. We work with you on a packing standard that fits the product, which reduces material use and reduces claims at the same time.",
      },
      {
        heading: "Get returns back into stock",
        body: "The greenest returned item is the one that gets resold. Inspecting returns properly and restocking what passes keeps goods in circulation instead of sending saleable stock to disposal by default.",
      },
      {
        heading: "Fewer failed deliveries",
        body: "A failed delivery is an entire journey repeated. Confirming addresses, checking serviceability upfront and coordinating with recipients removes journeys that should never have happened.",
      },
      {
        heading: "What we are not claiming",
        body: "We hold no environmental certifications, we do not operate a carbon-offset programme, and we do not publish emissions figures. If and when we do any of those things, we will say so here — with the evidence.",
      },
    ],
    seo: {
      title: "Sustainability",
      description:
        "Your Dart Express on sustainability — consolidated movements, right-sized packaging, returns brought back into stock and fewer failed deliveries, described without unevidenced environmental claims.",
      path: "/sustainability",
    },
  },

  {
    slug: "analytics",
    name: "Business Intelligence & Analytics",
    tagline: "Your operation, in numbers you can act on",
    summary:
      "Reporting built from your own shipment and stock records — what you sent, what it cost, what came back and where things stalled.",
    icon: BarChart3,
    published: true,
    hero: {
      eyebrow: "How we work",
      heading: "Reporting on your operation, from your own data",
      body: "Every figure we report is derived from your shipments and your stock movements. We do not benchmark you against invented industry averages, and we do not present modelled numbers as measured ones.",
    },
    sections: [
      {
        heading: "Shipment reporting",
        body: "What was dispatched, where it went, when it was confirmed delivered, and which consignments hit an exception along the way. Over time this is what tells you which routes, destinations or product types are costing you more than they appear to.",
        points: [
          "Volume dispatched over the period you choose",
          "Delivery confirmations and outstanding shipments",
          "Exceptions by type, so patterns become visible",
        ],
      },
      {
        heading: "Stock and fulfilment reporting",
        body: "For customers whose stock we hold: what came in, what is on hand, what went out and how the recorded position reconciles against a physical count.",
        points: [
          "Inbound receipts against expected manifests",
          "Stock on hand by SKU",
          "Reconciliation variances, reported rather than absorbed",
        ],
      },
      {
        heading: "Returns reporting",
        body: "Return rate by product, condition on arrival and the disposition applied. This is usually the fastest way to find a product listing that is setting the wrong expectation or a packaging spec that is not protecting the item.",
      },
      {
        heading: "How reporting is delivered today",
        body: "Reporting is currently provided on an agreed cadence rather than through a self-serve dashboard. We would rather tell you that than show you a product screenshot that is not yet something you can log into. Self-serve access is on our roadmap, and we will announce it when it is real.",
      },
    ],
    seo: {
      title: "Business Intelligence & Analytics",
      description:
        "Reporting from Your Dart Express built from your own shipment and stock records — dispatch volume, delivery confirmations, exceptions by type, stock reconciliation and return outcomes.",
      path: "/analytics",
    },
  },

  {
    slug: "small-business",
    name: "Small Businesses",
    tagline: "Logistics support before you have a logistics team",
    summary:
      "For businesses where the person packing the orders is also the person running the company.",
    icon: Store,
    published: true,
    hero: {
      eyebrow: "Who we work with",
      heading: "You should not need a logistics department to ship well",
      body: "Most small businesses do not lose orders because their product is wrong. They lose them because dispatch is being squeezed into evenings and weekends by someone who should be growing the business.",
    },
    sections: [
      {
        heading: "Start with what hurts most",
        body: "You do not have to hand over the whole operation. Start with the part that is costing you the most time — usually dispatch or returns — and add to it when it is working.",
      },
      {
        heading: "No minimum-volume gatekeeping",
        body: "We are a young company and we are looking for businesses to grow alongside. You do not need to be shipping at a particular scale before we will take the conversation seriously.",
      },
      {
        heading: "Talk to a person",
        body: "When something goes wrong with an order, you need an answer that day. You get a direct line to the people handling your shipments rather than a ticket number.",
      },
      {
        heading: "Room to grow into",
        body: "The same setup that handles your first shipments handles them when there are considerably more. Warehousing, fulfilment and returns are already there when you need them, so growing does not mean changing suppliers.",
      },
    ],
    seo: {
      title: "Logistics for Small Businesses",
      description:
        "Your Dart Express for small businesses — start with dispatch or returns, no minimum-volume gatekeeping, direct access to the team handling your shipments, and room to add services as you grow.",
      path: "/small-business",
    },
  },

  {
    slug: "enterprise",
    name: "Enterprise Solutions",
    tagline: "Structured requirements, documented and reviewed",
    summary:
      "For organisations that need agreed procedures, named accountability and reporting they can take into a review.",
    icon: Building2,
    published: true,
    hero: {
      eyebrow: "Who we work with",
      heading: "Set up properly, reviewed regularly",
      body: "Larger organisations do not need a supplier who moves fastest. They need one whose procedures are written down, whose accountability is named, and whose reporting survives being read by somebody else.",
    },
    sections: [
      {
        heading: "Requirements scoped first",
        body: "Before anything moves, we go through volumes, handling requirements, destinations, documentation and escalation. That scope becomes the written basis of the engagement rather than something we work out as we go.",
      },
      {
        heading: "Documented operating procedures",
        body: "Packing standards, handling instructions, return criteria and disposition rules are documented, agreed and version-controlled. That is what keeps the service consistent when volume rises and different people are doing the work.",
      },
      {
        heading: "Named accountability and escalation",
        body: "You get named contacts and an agreed escalation path, so a problem has somewhere to go at the moment it needs to move.",
      },
      {
        heading: "Reporting and review",
        body: "Reporting on the cadence you require, drawn from your own shipment and stock records, plus scheduled review sessions where performance and problems are discussed against what was agreed.",
      },
      {
        heading: "Being straight about our stage",
        body: "We are an early-stage operator. For some enterprise requirements that is the right fit — you get responsiveness and a supplier who will build around you. For others it is not, and we will tell you so rather than take on something we cannot support properly.",
      },
    ],
    seo: {
      title: "Enterprise Logistics Solutions",
      description:
        "Enterprise engagement with Your Dart Express — scoped requirements, documented operating procedures, named accountability and escalation, and reporting reviewed on an agreed cadence.",
      path: "/enterprise",
    },
  },

  {
    slug: "integrations",
    name: "All Integrations",
    tagline: "Connect where you already sell",
    summary:
      "Connections that let orders reach us without being re-keyed by hand.",
    icon: Plug,
    published: false, // Rendered by its own richer route at /integrations
    hero: {
      eyebrow: "How we work",
      heading: "Connect where you already sell",
      body: "Orders should arrive with us the way they arrived with you.",
    },
    sections: [],
    seo: {
      title: "Integrations",
      description: "Connect your sales channel to Your Dart Express.",
      path: "/integrations",
    },
  },
];

export const publishedFeatures = features.filter((f) => f.published);

export function getFeature(slug: string): Feature | undefined {
  return publishedFeatures.find((f) => f.slug === slug);
}
