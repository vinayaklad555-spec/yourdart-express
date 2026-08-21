import {
  MessagesSquare,
  ClipboardList,
  Layers,
  ShieldCheck,
  MessageSquareWarning,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";

/**
 * Homepage copy. Seven sections, no more. Every claim below describes either a
 * service we offer or a way of working we control — nothing that would need a
 * statistic, a customer or a coverage map to be true.
 */

export const hero = {
  eyebrow: "Logistics for growing businesses",
  heading: "Move your orders without managing the movement",
  /** Word within the heading that carries the brand accent. */
  accentWord: "without",
  body: "Shipping, fulfillment, warehousing and returns, coordinated end to end by one team. You get an answer when you ask where something is — and you hear about problems from us, not from your customer.",
  primaryCta: { label: "Talk to our team", href: "/talk-to-an-expert" },
  secondaryCta: { label: "See what we do", href: "/services" },
  /** Rendered as plain statements of capability, never as metrics. */
  markers: [
    "One point of contact per account",
    "Serviceability confirmed before booking",
    "Exceptions raised, not buried",
  ],
};

export const whatWeDo = {
  eyebrow: "What we do",
  heading: "One logistics partner across the whole journey",
  body: "Most businesses end up with a courier for shipping, somebody else for storage and nobody at all for returns. When something goes wrong, each one points at the other. We handle the chain end to end, which means there is one place the answer comes from.",
  points: [
    {
      title: "Goods moved",
      body: "Parcels, trade consignments and cross-border cargo — collected, documented and delivered.",
    },
    {
      title: "Goods held",
      body: "Your stock stored to recorded locations, with movements logged in and out.",
    },
    {
      title: "Orders fulfilled",
      body: "Picked and packed to a standard you approve, then dispatched straight into shipping.",
    },
    {
      title: "Returns recovered",
      body: "Collected from your customer, inspected against your criteria, restocked where they can be.",
    },
  ],
};

export const whyUs = {
  eyebrow: "Why Your Dart Express",
  heading: "The difference shows up on the bad day",
  body: "Any operator looks fine when everything goes to plan. These are the things that matter when it does not.",
  reasons: [
    {
      title: "You talk to the same people",
      body: "One team owns your account. They know your packing standard and your last three problems, so nothing has to be explained twice.",
      icon: MessagesSquare,
    },
    {
      title: "We confirm before we commit",
      body: "Serviceability, handling and timelines are checked before we take the booking. A yes we cannot honour is worse for you than a no.",
      icon: ClipboardList,
    },
    {
      title: "The whole chain, one supplier",
      body: "Storage, fulfilment, shipping and returns under one roof. No handoffs between vendors where accountability disappears.",
      icon: Layers,
    },
    {
      title: "Written down, so it repeats",
      body: "Packing standards, handling instructions and return criteria are documented and agreed — which is what keeps a service consistent as volume grows.",
      icon: ShieldCheck,
    },
  ],
};

export const howItWorks = {
  eyebrow: "How it works",
  heading: "Four steps, no surprises in between",
  body: "The same shape whether it is a single parcel or a container.",
  steps: [
    {
      step: "01",
      title: "Tell us what needs to move",
      body: "Send us the details — by form, by email, or straight from your Shopify store. We confirm what we can support before anything is booked.",
    },
    {
      step: "02",
      title: "We collect or pick",
      body: "We arrange collection from you at an agreed slot. If we are already holding your stock, we pick and pack the order instead.",
    },
    {
      step: "03",
      title: "It moves, and you know",
      body: "The consignment moves through the network. Status is recorded at each handover and passed on to you. If something stalls, we raise it.",
    },
    {
      step: "04",
      title: "Delivered — and returns handled",
      body: "Delivery is confirmed back to you. If it comes back, we collect it, inspect it against your criteria and tell you what condition it arrived in.",
    },
  ],
};

export const growth = {
  eyebrow: "Where we are",
  heading: "Early, and honest about it",
  body: "Your Dart Express is a young company, still building its network and its coverage. You will not find customer numbers or a coverage map here — we have not earned them yet, and you would have no way to check them.",
  body2: "What we can offer is a supplier small enough to give your account real attention and structured enough to be relied on. When we have results worth publishing, they will carry the customer's name.",
  commitments: [
    {
      title: "We will tell you what we cannot do",
      body: "If a route, a commodity or a timeline is outside what we can support properly, you will hear that before you commit — not after.",
      icon: MessageSquareWarning,
    },
    {
      title: "We will not overstate what is running",
      body: "Capabilities that are in development are described as in development. You will not find a product screenshot here for something you cannot use.",
      icon: BadgeCheck,
    },
    {
      title: "We will grow into what you need",
      body: "The services are already in place. As your volume changes, the arrangement changes with it — without you having to find a new supplier.",
      icon: TrendingUp,
    },
  ],
};

export const finalCta = {
  heading: "Let's get your next shipment moving",
  body: "Tell us what you need to move, store or fulfil. We will confirm what we can support and quote it against your actual volumes — no rate card, no obligation.",
  primaryCta: { label: "Talk to our team", href: "/talk-to-an-expert" },
  secondaryCta: { label: "Contact us", href: "/contact" },
};
