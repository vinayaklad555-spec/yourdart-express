import { Target, Eye, Compass, HeartHandshake } from "lucide-react";

/**
 * NOTHING IN THIS FILE IS INVENTED.
 *
 * No founder story, no years of experience, no team size, no milestones, no
 * awards, no certifications, no office network. Those were not supplied and are
 * not guessed. What is here describes intent and method — which is honest for a
 * company at this stage and is what a prospective customer actually needs to
 * judge before making contact.
 */

export const about = {
  hero: {
    eyebrow: "About us",
    heading: "A logistics company being built the way we would want to be dealt with",
    body: "Your Dart Express is a young logistics company. We handle shipping, fulfillment, warehousing, returns, air freight forwarding and package forwarding for businesses that need those things done reliably and want to talk to a person when they are not.",
  },

  whoWeAre: {
    heading: "Who we are",
    paragraphs: [
      "Your Dart Express is a logistics company serving businesses that move physical goods — online stores dispatching customer orders, businesses shipping to trade customers, and importers and exporters moving cargo across borders.",
      "We are part of the same company family as Globe Dart Gateway Inc. and share its business address in New York. The two companies operate under separate contact identities.",
      "We are early in our journey, and we would rather say that plainly than dress it up. What we can tell you is exactly what we do, exactly how we do it, and exactly what we are not able to do yet.",
    ],
  },

  whatWereBuilding: {
    heading: "What we are building",
    paragraphs: [
      "A logistics operation where the answer you get is the answer that is true. Where a shipment has one record that everybody works from. Where an exception reaches you from us, not from your customer. Where the packing standard is written down and followed by whoever happens to be on shift.",
      "Those sound like small things. In practice they are the difference between a supplier you have to chase and one you can stop thinking about.",
    ],
  },

  principles: [
    {
      title: "Confirm before committing",
      body: "We check that we can actually do something before we agree to it. A yes we cannot honour costs you more than a no.",
      icon: Target,
    },
    {
      title: "Raise problems early",
      body: "When a shipment is in trouble, you hear it from us, with what we are doing about it. Silence is not a status.",
      icon: Eye,
    },
    {
      title: "Write the standard down",
      body: "Packing standards, handling instructions and return criteria are documented and agreed, which is what makes them repeatable.",
      icon: Compass,
    },
    {
      title: "Stay reachable",
      body: "You deal with the same people, and they know your account. No ticket number, no re-explaining what you already explained.",
      icon: HeartHandshake,
    },
  ],

  vision: {
    heading: "Where we are going",
    body: "We are building our network, our systems and our service coverage steadily, and adding capability when we can support it properly rather than when it would look good on a website. As that grows, this page will change — and we will say what changed.",
  },

  honesty: {
    heading: "What we are not claiming",
    body: "We have not published customer numbers, shipment volumes, delivery rates or coverage maps, because we are new and we do not have a track record to point at yet. We have no case studies, no testimonials and no partner logos on this site for the same reason. When we have real ones, with the customer's permission, they will appear here. Until then, judge us on what we tell you we will do — and then on whether we do it.",
  },
} as const;

export const partners = {
  hero: {
    eyebrow: "Partners",
    heading: "Working with other operators",
    body: "Logistics does not work as a closed system. Moving goods reliably means working with carriers, warehouse operators, customs brokers and last-mile providers.",
  },
  intro:
    "We are actively building our partner network. Rather than display a wall of logos we have not earned the right to show, this page describes the kinds of partnerships we are looking for and how to start a conversation.",
  lookingFor: [
    {
      title: "Carriers and last-mile providers",
      body: "Operators with genuine coverage in a region, who communicate exceptions rather than absorbing them, and who can support the delivery conditions our customers need.",
    },
    {
      title: "Warehouse and fulfilment operators",
      body: "Sites that can receive against a manifest, store to recorded locations and pick accurately — particularly where that puts stock closer to where it needs to be dispatched.",
    },
    {
      title: "Customs brokers and freight agents",
      body: "Agents who know their trade lanes properly and would rather flag a documentation problem before departure than after arrival.",
    },
    {
      title: "Technology and platform partners",
      body: "Commerce platforms and order management systems where a direct connection would remove manual re-keying for shared customers.",
    },
  ],
  disclosure:
    "We do not currently publish named partnerships. Any partner listed on this page in future will be a real, active commercial relationship that the partner has agreed to have stated publicly.",
  cta: {
    heading: "Interested in partnering?",
    body: "Tell us what you operate, where, and what you are looking for in a partner. We will come back to you.",
  },
} as const;

export const careers = {
  hero: {
    eyebrow: "Careers",
    heading: "Join us early",
    body: "We are a young logistics company. Working here now means shaping how things are done rather than inheriting a process somebody else wrote.",
  },
  whatItsLike: [
    {
      title: "Small team, wide remit",
      body: "Roles are broad. You will not be doing one narrow task, and what you build will still be in use long after you built it.",
    },
    {
      title: "Real accountability",
      body: "Shipments belong to people, not to queues. When something is yours, you see it through — and you have the authority to actually fix it.",
    },
    {
      title: "Straight talk",
      body: "We tell customers the truth about what we can and cannot do. We work the same way internally.",
    },
  ],
  /**
   * No fabricated job listings. When roles genuinely open, they are added here
   * and the page switches from open-application mode automatically.
   */
  openRoles: [] as {
    title: string;
    location: string;
    type: string;
    summary: string;
  }[],
  openApplication: {
    heading: "No listed roles right now",
    body: "We are not advertising specific positions at the moment. If you work in logistics operations, warehousing, freight or customer support and you want to be part of building something early, send us your details and tell us what you would want to do here. We read everything that comes in.",
  },
} as const;

export const talkToAnExpert = {
  hero: {
    eyebrow: "Pricing and demo",
    heading: "Get a real quote, not a rate card",
    body: "Logistics pricing depends on what you are moving, where it is going and how often. Rather than publish numbers that will not apply to you, we would rather look at your actual requirement and quote it properly.",
  },
  whatToExpect: [
    {
      step: "01",
      title: "Tell us what you need",
      body: "Fill in the form with your requirement. The more detail on volumes, destinations and handling, the more useful the first conversation is.",
    },
    {
      step: "02",
      title: "We come back to you",
      body: "We confirm whether we can support what you need, and flag anything we cannot, before we talk about price.",
    },
    {
      step: "03",
      title: "A walkthrough, if useful",
      body: "We will walk you through how the service would actually run for your business — the booking, the handling standard and what happens when something goes wrong.",
    },
    {
      step: "04",
      title: "A quote for your volumes",
      body: "You get pricing based on your real requirement, along with what is included and what is not.",
    },
  ],
  note: "We do not publish a rate card, and we are not going to quote you a headline number that changes once we understand your shipments. Everything is quoted against your actual requirement.",
} as const;
