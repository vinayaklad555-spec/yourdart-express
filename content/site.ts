/**
 * Single source of truth for company identity, contact details and URLs.
 *
 * CONFIGURABLE-BY-DESIGN: every field below that could change is read from an
 * environment variable first and falls back to the confirmed value. Nothing
 * here is invented — each detail was supplied by the business.
 */

export const site = {
  name: "Your Dart Express",
  legalName: "Your Dart Express",
  shortName: "YourDart",
  domain: "yourdartexpress.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdartexpress.com",

  tagline: "Logistics for businesses that are growing",
  description:
    "Your Dart Express is a logistics partner for growing businesses — shipping, fulfillment, warehousing, returns, air freight forwarding and shop-and-ship, coordinated by a team that answers when you call.",

  founded: "2025",
  locale: "en_US",

  contact: {
    email: "contact@yourdartexpress.com",
    /** Confirmed by the business. Rendered as a tel: link. */
    phone: "+1 978 830 3897",
    phoneDisplay: "+1 (978) 830-3897",
    address: {
      street: "200 Vesey Street",
      unit: "24th Floor",
      city: "New York",
      region: "NY",
      postalCode: "10281",
      country: "US",
      countryName: "United States",
    },
    /**
     * Not yet confirmed by the business. Left null on purpose — the UI hides
     * the hours block entirely rather than displaying a guess.
     */
    hours: null as string | null,
  },

  /**
   * Corporate relationship. Stated as a plain fact, with no claims made about
   * what the relationship provides operationally.
   */
  family: {
    name: "Globe Dart Gateway Inc.",
    url: "https://globedartgatewayinc.com",
    email: "info@globedartgatewayinc.com",
    relationship:
      "Your Dart Express is part of the same company family as Globe Dart Gateway Inc. and shares its business address.",
  },

  /**
   * Social profiles are omitted until accounts exist. An empty array means the
   * footer renders no social row and no sameAs entries appear in JSON-LD.
   */
  social: [] as { label: string; href: string }[],

  ogImage: "/opengraph-image",
} as const;

export function formatAddress(separator = ", "): string {
  const a = site.contact.address;
  return [a.street, a.unit, `${a.city}, ${a.region} ${a.postalCode}`, a.countryName].join(
    separator,
  );
}

export const addressLines = [
  site.contact.address.street,
  site.contact.address.unit,
  `${site.contact.address.city}, ${site.contact.address.region} ${site.contact.address.postalCode}`,
  site.contact.address.countryName,
];
