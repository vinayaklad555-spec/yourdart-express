/**
 * HERO IMAGERY
 *
 * Every image is self-hosted in /public/images. Nothing is hot-linked — the
 * Content-Security-Policy sets `img-src 'self'`, so an external URL would be
 * blocked, and self-hosting is better for performance regardless.
 *
 * HONESTY NOTE — this matters as much here as it does in the copy.
 * These are licensed stock photographs. They are NOT photographs of Your Dart
 * Express facilities, vehicles, staff or stock. The alt text is written
 * descriptively for that reason — "a storage warehouse", never "our
 * warehouse" — so nothing on the page asserts ownership of what is pictured.
 *
 * When real photography of the operation exists, replace the files in
 * /public/images keeping the same names and the site picks them up with no
 * code change. At that point the alt text should be rewritten to say whose
 * facility it actually is.
 *
 * Source and licence: see docs/IMAGE-CREDITS.md.
 */

export interface HeroImage {
  src: string;
  /** Descriptive, never possessive. See the note above. */
  alt: string;
}

export const heroImages = {
  portTerminal: {
    src: "/images/port-terminal.jpg",
    alt: "Aerial view of shipping containers stacked at a port terminal",
  },
  roadFreight: {
    src: "/images/road-freight.jpg",
    alt: "A curtain-side truck on an open highway through mountains",
  },
  containerShip: {
    src: "/images/container-ship.jpg",
    alt: "A container ship berthed beneath gantry cranes at a port",
  },
  parcelsStacked: {
    src: "/images/parcels-stacked.jpg",
    alt: "Cardboard parcels of mixed sizes stacked ready for dispatch",
  },
  fulfilmentFloor: {
    src: "/images/fulfilment-floor.jpg",
    alt: "Rows of picking totes across a wide distribution floor",
  },
  warehouseRacking: {
    src: "/images/warehouse-racking.jpg",
    alt: "Pallet racking stacked with goods in a storage warehouse",
  },
  parcelPair: {
    src: "/images/parcel-pair.jpg",
    alt: "Two plain kraft parcels on a neutral surface",
  },
  highwayHaulage: {
    src: "/images/highway-haulage.jpg",
    alt: "An articulated lorry travelling on an open road",
  },
  /**
   * The homepage hero backdrop. A rendered scene supplied by the business —
   * an unbranded box truck at dusk, so it depicts the category rather than
   * claiming a vehicle the company owns. Decorative: the hero heading carries
   * the meaning, so it is rendered with an empty alt.
   */
  heroTruck: {
    src: "/images/hero-truck.jpg",
    alt: "",
  },
  /**
   * The portrait companion to `heroTruck`, used below 640px. A wide backdrop in
   * a phone-shaped frame crops to its centre third, which left the truck as a
   * pair of wheels; this square crop keeps the whole vehicle with sky above it
   * for the copy. Same scene, composed for the frame.
   */
  heroTruckMobile: {
    src: "/images/hero-truck-mobile.jpg",
    alt: "",
  },
  /*
   * Owner-supplied brand artwork, not licensed stock — see
   * docs/IMAGE-CREDITS.md. Purple ground, so it needs no tint treatment.
   */
  airFreightHero: {
    src: "/images/air-freight-hero.png",
    alt: "An airliner cruising above a cloud layer at sunset",
  },
  shippingHero: {
    src: "/images/shipping-hero.png",
    alt: "A labelled Your Dart Express parcel among stacked boxes, with a location pin and a dotted world map behind",
  },
} as const satisfies Record<string, HeroImage>;

/** Which image heads each service page, keyed by slug. */
export const serviceHeroImages: Record<string, HeroImage> = {
  shipping: heroImages.shippingHero,
  fulfillment: heroImages.fulfilmentFloor,
  warehousing: heroImages.warehouseRacking,
  "reverse-logistics": heroImages.parcelsStacked,
  "freight-forwarding": heroImages.airFreightHero,
  "shop-and-ship": heroImages.parcelPair,
};

/** Which image heads each industry page, keyed by slug. */
export const industryHeroImages: Record<string, HeroImage> = {
  dtc: heroImages.parcelsStacked,
  b2b: heroImages.portTerminal,
  omnichannel: heroImages.fulfilmentFloor,
};

/** Standalone routes. Company pages use the quietest, least literal images. */
export const pageHeroImages = {
  services: heroImages.portTerminal,
  industries: heroImages.highwayHaulage,
  integrations: heroImages.parcelPair,
  shopify: heroImages.parcelsStacked,
  caseStudies: heroImages.parcelPair,
  about: heroImages.highwayHaulage,
  partners: heroImages.portTerminal,
  careers: heroImages.fulfilmentFloor,
  contact: heroImages.parcelPair,
  talkToAnExpert: heroImages.roadFreight,
  faq: heroImages.parcelPair,
  track: heroImages.roadFreight,
  technology: heroImages.fulfilmentFloor,
  approach: heroImages.roadFreight,
  sustainability: heroImages.highwayHaulage,
  analytics: heroImages.warehouseRacking,
  smallBusiness: heroImages.parcelPair,
  enterprise: heroImages.portTerminal,
} as const satisfies Record<string, HeroImage>;
