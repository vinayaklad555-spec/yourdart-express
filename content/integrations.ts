import type { Integration } from "@/types/content";

/**
 * Only integrations that genuinely exist appear here as published. Everything
 * else is listed on the /integrations page as "not available yet" — stated
 * openly rather than shown as a logo wall that implies a connection we do not
 * have.
 */

export const integrations: Integration[] = [
  {
    slug: "shopify",
    name: "Shopify",
    category: "E-commerce platform",
    published: true,
    summary:
      "Connect your Shopify store so orders reach us without being copied out by hand.",
    capability:
      "Orders placed in your Shopify store can be passed to Your Dart Express for fulfilment and dispatch, with the order reference preserved so returns can be matched back to the original sale.",
    steps: [
      {
        step: "01",
        title: "Talk to us first",
        body: "We confirm which of your products we will be holding and agree the packing standard before anything is connected.",
      },
      {
        step: "02",
        title: "Connect the store",
        body: "We set up the connection to your Shopify store together, on a call, so nothing is guessed.",
      },
      {
        step: "03",
        title: "Send your stock",
        body: "Your inventory arrives, is checked in against the manifest and is put away to recorded locations.",
      },
      {
        step: "04",
        title: "Orders flow through",
        body: "New orders reach us directly. We pick, pack and dispatch them, and the delivery outcome comes back to you.",
      },
    ],
    seo: {
      title: "Shopify Integration",
      description:
        "Connect your Shopify store to Your Dart Express so orders flow through for fulfillment and dispatch without manual re-keying, with order references preserved for returns.",
      path: "/integrations/shopify",
    },
  },
];

export const publishedIntegrations = integrations.filter((i) => i.published);

export function getIntegration(slug: string): Integration | undefined {
  return publishedIntegrations.find((i) => i.slug === slug);
}

/**
 * Channels customers ask about that we cannot connect today. Shown explicitly
 * as unavailable — an honest "not yet" is worth more than an implied yes.
 */
export const requestedIntegrations = [
  "WooCommerce",
  "Amazon",
  "eBay",
  "Etsy",
  "BigCommerce",
  "Magento",
  "Squarespace",
  "Wix",
] as const;

/** For channels we cannot connect, orders can still reach us in bulk. */
export const manualIntake = {
  heading: "Not on Shopify?",
  body: "Shopify is the only direct connection we offer today, and we are not going to pretend otherwise. If you sell somewhere else, orders can still reach us as a bulk file or by email, and we will tell you honestly whether that is workable at your volume before you commit to anything.",
};
