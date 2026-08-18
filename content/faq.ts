import type { FaqItem, FaqCategory } from "@/types/content";

/**
 * Every answer here describes a process we control or states plainly that
 * something is confirmed case by case. No pricing, no transit times, no
 * coverage areas and no operating hours — none of those have been confirmed by
 * the business, and inventing them would be the fastest way to lose a customer
 * on their first shipment.
 */

export const faqs: FaqItem[] = [
  // ---------------------------------------------------------------- Getting started
  {
    question: "How do I get started with Your Dart Express?",
    answer:
      "Send us a message through the contact form or email contact@yourdartexpress.com with a short description of what you need moved, stored or fulfilled. We will come back to you to confirm whether we can support it, what we would need from you, and what it would cost. There is no obligation and no account to open before that conversation.",
    category: "Getting started",
    featured: true,
  },
  {
    question: "Do I need to be shipping a certain volume before you will work with me?",
    answer:
      "No. We are an early-stage company and we are actively looking for businesses to grow alongside, so there is no minimum-volume threshold you have to clear before we will take the conversation seriously. What matters more is whether the service you need is one we can genuinely deliver for you.",
    category: "Getting started",
    featured: true,
  },
  {
    question: "What information do you need to quote?",
    answer:
      "For shipping: origin, destination, weight, dimensions, what is inside and when it needs to arrive. For fulfilment or warehousing: how many SKUs you hold, roughly how much space they take, your order volume and how you want orders packed. For freight: the commodity, the route and the deadline. If you are not sure what any of that means for your situation, tell us what you are trying to do and we will work it out with you.",
    category: "Getting started",
  },

  // ---------------------------------------------------------------- Services
  {
    question: "Which services are available right now?",
    answer:
      "Shipping, fulfillment, warehousing, reverse logistics, air freight forwarding and shop and ship. Each has its own page describing exactly what it covers and how it works. If something you need is not listed, ask — we will tell you honestly whether we can do it rather than take the booking and work it out afterwards.",
    category: "Services",
    featured: true,
  },
  {
    question: "Do you handle returns?",
    answer:
      "Yes. Our reverse logistics service arranges collection of the return from your customer, brings it back to you or into our warehouse, inspects it against condition criteria you define, and applies the disposition rule you have set — restock, hold, quarantine or return to you. The condition on arrival is recorded, so refund decisions are made on evidence rather than assumption.",
    category: "Services",
    featured: true,
  },
  {
    question: "Can you hold my stock and pack orders for me?",
    answer:
      "Yes. That is our fulfillment service. You send us your inventory, we receive and check it in against your manifest, and we store it to recorded locations. When an order comes in we pick it, pack it to a written standard you have approved — your packaging, your inserts — and dispatch it. Fulfilment and shipping are handled by the same team, so there is no handoff between suppliers where accountability can go missing.",
    category: "Services",
  },
  {
    question: "Can you ship internationally?",
    answer:
      "We offer air freight forwarding for cross-border cargo, which covers booking the air carriage, preparing and checking the documentation, coordinating customs formalities and arranging the onward leg to the final destination. Whether a specific route and commodity are workable is confirmed per consignment before we accept the booking.",
    category: "Services",
  },
  {
    question: "What is Shop and Ship?",
    answer:
      "Some retailers will not ship to certain addresses. Shop and Ship gives you a delivery address to use at checkout instead. We receive the parcel, check it in, optionally hold it so several purchases can be consolidated into one onward shipment, prepare the documentation the route requires, and forward it on to you.",
    category: "Services",
  },

  // ---------------------------------------------------------------- Shipments
  {
    question: "Which areas do you deliver to?",
    answer:
      "Serviceability is confirmed per shipment rather than published as a coverage map. We check the destination, the parcel profile and the timeline before accepting a booking, so you find out what is possible before your customer does. Send us the destination and we will tell you straight away.",
    category: "Shipments",
    featured: true,
  },
  {
    question: "How does pickup work?",
    answer:
      "Once a booking is confirmed, we agree a collection slot with you and arrange for the consignment to be collected from your address. For customers whose stock we already hold, no pickup is needed — the order is picked and dispatched from our warehouse directly.",
    category: "Shipments",
    featured: true,
  },
  {
    question: "Can I track my shipment?",
    answer:
      "We record status against each shipment as it passes through the network and pass those updates on to you. You can ask for the current position at any time using the shipment status form on our Track a Shipment page, and the team will come back to you. We do not currently offer a self-serve tracking portal you can log into, and we are not going to show you one that does not exist. Self-serve tracking is on our roadmap and we will announce it here when it is genuinely available.",
    category: "Shipments",
    featured: true,
  },
  {
    question: "What happens if a shipment is delayed or goes wrong?",
    answer:
      "We raise it with you rather than waiting for you to notice. You will be told what has happened, what we are doing about it and what we need from you, if anything. The shipment stays open with us until it is resolved. You should not be finding out about a problem from your own customer.",
    category: "Shipments",
  },
  {
    question: "Do you support cash on delivery?",
    answer:
      "COD availability depends on the destination and the service, and it is confirmed at the time of booking rather than offered as a blanket capability. Tell us where the shipment is going and we will confirm whether COD can be supported on that route.",
    category: "Shipments",
  },

  // ---------------------------------------------------------------- Billing
  {
    question: "How is pricing worked out?",
    answer:
      "Pricing depends on the service, the route, the weight and dimensions, the handling requirements and how regularly you ship. We do not publish a rate card, because a published rate that does not apply to your shipment is not useful to either of us. Send us your requirement and you will get a real quote for your actual volumes.",
    category: "Billing",
    featured: true,
  },
  {
    question: "Is there a contract or a minimum commitment?",
    answer:
      "The commercial terms are agreed as part of the quote and depend on the service. Ad-hoc shipping does not require an ongoing commitment. Warehousing and fulfilment involve holding your stock, so those arrangements are set out in writing before anything arrives. We will tell you what is involved before you commit to it.",
    category: "Billing",
  },

  // ---------------------------------------------------------------- Support
  {
    question: "How do I reach the team?",
    answer:
      "Email contact@yourdartexpress.com or call +1 (978) 830-3897. You can also use the contact form and we will come back to you. Customers deal with the same people throughout, so you should not have to re-explain a shipment you have already explained once.",
    category: "Support",
    featured: true,
  },
  {
    question: "Is Your Dart Express related to Globe Dart Gateway Inc.?",
    answer:
      "Yes. Your Dart Express is part of the same company family as Globe Dart Gateway Inc. and shares its business address. The two operate under separate contact identities — for anything relating to Your Dart Express, use contact@yourdartexpress.com.",
    category: "Support",
  },
  {
    question: "Do you have an online account or dashboard?",
    answer:
      "Account access is in development. The log-in and sign-up pages on this site are a preview of that experience and are not connected to a live system yet — they are clearly marked as such. Today, bookings and updates are handled directly with our team by email or phone. We will announce account access here when it is real.",
    category: "Support",
  },
];

export const faqCategories: FaqCategory[] = [
  "Getting started",
  "Services",
  "Shipments",
  "Billing",
  "Support",
];

export const featuredFaqs = faqs.filter((f) => f.featured);

export function faqsByCategory(category: FaqCategory): FaqItem[] {
  return faqs.filter((f) => f.category === category);
}
