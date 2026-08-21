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
  /*
   * SEA FREIGHT IS NOT A SERVICE. Your Dart Express forwards by air only —
   * services.ts says so in as many words ("We do not run ocean or rail
   * freight"). A container port therefore depicts something the company does
   * not sell, and on a page about moving goods a reader takes the picture as
   * the claim.
   *
   * Do not put this on a page about transport. It was removed from
   * /industries/b2b for exactly that reason. See containerShip below.
   */
  portTerminal: {
    src: "/images/port-terminal.jpg",
    alt: "Aerial view of shipping containers stacked at a port terminal",
  },
  roadFreight: {
    src: "/images/road-freight.jpg",
    alt: "A curtain-side truck on an open highway through mountains",
  },
  /*
   * UNUSED, and should stay that way — a berthed ship is the most explicit
   * sea-freight claim in the library and the company does not run ocean
   * freight. Kept only so nobody re-adds it thinking it was an oversight.
   */
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
   * Pexels stock, chosen by the owner — see docs/IMAGE-CREDITS.md. It
   * replaced a purple rendered aircraft, so this is the one hero photograph
   * whose colour does NOT come from the brand palette.
   *
   * The master is square; the hero crops it to each breakpoint's ratio from
   * the centre, which keeps the parked aircraft and the sunset in frame.
   */
  airFreightHero: {
    src: "/images/air-freight-hero.jpg",
    alt: "Ground crew and baggage carts working around a parked airliner on an airport apron at sunset",
  },
  /*
   * Owner-supplied and AI-GENERATED — see docs/IMAGE-CREDITS.md. Both the
   * parcel label and the wall plaque are gibberish under magnification, which
   * is illegible at hero size but is the reason this image must never be
   * enlarged or used as a detail crop.
   *
   * Cropped from a 0.75 portrait to 0.95 around the door and the parcel.
   */
  doorstepParcel: {
    src: "/images/doorstep-parcel.jpg",
    alt: "A cardboard parcel left on the step of a yellow front door with a wreath",
  },
  /*
   * Pexels stock, chosen by the owner — see docs/IMAGE-CREDITS.md, which
   * records that the van carries an unrelated company's livery.
   *
   * The master was a portrait (0.75) and is pre-cropped to 0.95 — deliberately
   * near-square, because the van sits right of centre and the 0.90 card would
   * otherwise cut its front off. See the card-ratio table in the doc.
   */
  returnsVan: {
    src: "/images/returns-van.jpg",
    alt: "A yellow delivery van seen from above, driving along a road between concrete barriers",
  },
  /*
   * Owner-supplied — see docs/IMAGE-CREDITS.md.
   *
   * The lowest-resolution hero on the site: the master is only 1023px wide,
   * so it is served as-is rather than upscaled. Cropped to 0.95 and placed so
   * the worker's face survives the 1.60 card, which shows only the middle
   * 59% of the height.
   */
  fulfilmentPicking: {
    src: "/images/fulfillment-picking.jpg",
    alt: "A warehouse worker in a hi-vis vest lifting a carton from pallet racking",
  },
  /*
   * Owner-supplied — see docs/IMAGE-CREDITS.md.
   *
   * Trimmed from the TOP, unusually — 300px of ceiling. Cutting the bottom
   * instead would have pushed the forklift down the frame until the 1.60 card
   * clipped its wheels; removing ceiling lifts it clear at both ends of the
   * card range.
   */
  warehouseForklift: {
    src: "/images/warehouse-pallet.jpg",
    alt: "A forklift carrying a shrink-wrapped pallet of cartons past warehouse racking",
  },
  /*
   * Owner-supplied — see docs/IMAGE-CREDITS.md.
   *
   * Cut to 1.60, which is exactly the widest card, so that card crops nothing
   * and the rider still clears the narrow 0.90 card with room. The trim comes
   * off the BOTTOM, where the frame is empty road.
   */
  dtcCourier: {
    src: "/images/dtc-courier-hd.jpg",
    alt: "A courier riding a scooter through a city street with insulated delivery boxes",
  },
  /*
   * Owner-supplied — see docs/IMAGE-CREDITS.md.
   *
   * Road haulage, deliberately: B2B must not show a container port, because
   * the company does not run ocean freight. See the note on portTerminal.
   *
   * The trucks sit in a horizontal band, so the crop centres that band in a
   * 1.20 master rather than cutting from either end — both cards then keep
   * the vehicles.
   */
  b2bTrucks: {
    src: "/images/b2b-trucks.jpg",
    alt: "A curtain-side truck and a box truck waiting at a road junction below wooded hills",
  },
  /*
   * Owner-supplied — see docs/IMAGE-CREDITS.md, which records that this file
   * carries a Rawpixel copyright notice and no licence on record.
   *
   * Anchored LEFT rather than centre-cropped: the hands and tape gun are in
   * the top-left and are the half of the frame that reads as "small
   * business". The empty right side is what gets trimmed.
   */
  smallBusinessPacking: {
    src: "/images/small-business-hero.jpg",
    alt: "A small business owner taping a cardboard parcel closed, surrounded by packed boxes",
  },
  /*
   * Owner-supplied and CHOSEN BY THE OWNER FOR THIS PAGE — see
   * docs/IMAGE-CREDITS.md, which records why it sits apart from the rest.
   *
   * The only hero on the site that is not a photograph of logistics: an
   * abstract 3D render. Served uncropped at its native 1.50, which clears
   * both ends of the card range because the subject is centred.
   */
  enterpriseConcept: {
    src: "/images/enterprise-hero.jpg",
    alt: "A yellow light bulb mounted on a metal gear, set into a grid of dark tiles",
  },
  shippingHero: {
    src: "/images/shipping-hero.jpg",
    alt: "Two couriers checking the shipping label on a parcel against a delivery docket",
  },
} as const satisfies Record<string, HeroImage>;

/** Which image heads each service page, keyed by slug. */
export const serviceHeroImages: Record<string, HeroImage> = {
  shipping: heroImages.shippingHero,
  fulfillment: heroImages.fulfilmentPicking,
  warehousing: heroImages.warehouseForklift,
  "reverse-logistics": heroImages.returnsVan,
  "freight-forwarding": heroImages.airFreightHero,
  "shop-and-ship": heroImages.doorstepParcel,
};

/** Which image heads each industry page, keyed by slug. */
export const industryHeroImages: Record<string, HeroImage> = {
  dtc: heroImages.dtcCourier,
  /* Road haulage, NOT the container port this once showed — see b2bTrucks. */
  b2b: heroImages.b2bTrucks,
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
  smallBusiness: heroImages.smallBusinessPacking,
  enterprise: heroImages.enterpriseConcept,
} as const satisfies Record<string, HeroImage>;
