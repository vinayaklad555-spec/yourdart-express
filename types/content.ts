import type { LucideIcon } from "lucide-react";

/**
 * Every content entity carries a `published` flag. The routing and navigation
 * layers read this flag, so a capability can exist in content — fully written,
 * fully typed — while staying invisible to the public site until it is real.
 * Flip one boolean to launch it. No component changes required.
 */
export interface Publishable {
  published: boolean;
}

export interface SeoMeta {
  title: string;
  description: string;
  /** Route path without a trailing slash, e.g. "/services/shipping" */
  path: string;
}

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  published?: boolean;
}

export interface NavGroup {
  label: string;
  href?: string;
  /** Rendered as a grouped panel in the desktop nav */
  columns?: NavColumn[];
  links?: NavLink[];
}

export interface NavColumn {
  heading?: string;
  links: NavLink[];
}

/**
 * The diagram that heads a benefit card.
 *
 * ONE PER CARD. An earlier version shared five patterns across all six
 * services, which made every service page look identical — the diagrams have
 * to earn their place by saying something specific about the card they head.
 * Every label is drawn from that benefit's own copy.
 *
 * Shipping keeps `image` / `checks` / `steps` / `record`; the rest are unique
 * to a single card.
 */
export type BenefitVisualSpec =
  /* --- shipping ------------------------------------------------------- */
  | { kind: "image"; src: string }
  | { kind: "checks"; items: { label: string; ok?: boolean }[]; result?: string }
  | { kind: "steps"; steps: string[]; flagged?: number }
  | { kind: "record"; title: string; lines: string[] }
  /* --- fulfilment ----------------------------------------------------- */
  /** A packed carton with its spec called out around it. */
  | { kind: "annotated"; subject: string; notes: string[] }
  /** Two lanes joining, with the handoff between them struck out. */
  | { kind: "merge"; lanes: [string, string]; into: string; without: string }
  /** Expected against received, with the discrepancy flagged. */
  | { kind: "compare"; left: string; right: string; rows: string[]; flagged: number }
  /** Volume across named periods. */
  | { kind: "levels"; bars: { label: string; height: number }[] }
  /* --- reverse logistics ---------------------------------------------- */
  /** Confirmations going out to the person waiting. */
  | { kind: "notify"; to: string; pings: string[] }
  /** An item held under inspection against named criteria. */
  | { kind: "inspect"; subject: string; criteria: string[] }
  /** A loop returning goods to sellable stock. */
  | { kind: "cycle"; nodes: [string, string, string] }
  /** One input splitting into named outcomes. */
  | { kind: "branch"; from: string; outcomes: string[] }
  /* --- warehousing ----------------------------------------------------- */
  /** A running list of movements, in and out. */
  | { kind: "ledger"; rows: { label: string; out?: boolean }[] }
  /** Storage bays of differing kinds. */
  | { kind: "bays"; bays: string[] }
  /** One building, named zones inside it. */
  | { kind: "zones"; site: string; zones: string[] }
  /** A container filling and emptying against an agreed line. */
  | { kind: "capacity"; label: string; marks: [string, string] }
  /* --- air freight forwarding ------------------------------------------ */
  /** Documents cleared before departure. */
  | { kind: "stamp"; docs: string[]; mark: string }
  /** The modes run, and the modes not run. */
  | { kind: "modes"; modes: { label: string; ok: boolean }[] }
  /** Parties either side of a border, coordinating. */
  | { kind: "parties"; left: string[]; right: string[]; border: string }
  /** A route whose final leg is the point. */
  | { kind: "lastleg"; legs: string[] }
  /* --- shop and ship ---------------------------------------------------- */
  /** Our address standing in at someone else's checkout. */
  | { kind: "checkout"; field: string; value: string; note: string }
  /** Several parcels becoming one. */
  | { kind: "consolidate"; from: number; into: string }
  /** What turned up, confirmed against what was expected. */
  | { kind: "arrival"; subject: string; checks: string[] }
  /** Paperwork raised for the onward leg. */
  | { kind: "exportdocs"; title: string; docs: string[] };

export interface Benefit {
  title: string;
  body: string;
  icon: LucideIcon;
  /** Optional; cards without one fall back to a plain tinted panel. */
  visual?: BenefitVisualSpec;
}

export interface ProcessStep {
  step: string;
  title: string;
  body: string;
}

export interface Service extends Publishable {
  slug: string;
  name: string;
  /** Short nav/card label when `name` is long */
  shortName?: string;
  tagline: string;
  summary: string;
  icon: LucideIcon;
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  whatItIs: string[];
  benefits: Benefit[];
  process: ProcessStep[];
  bestFor: string[];
  seo: SeoMeta;
}

export interface Feature extends Publishable {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  icon: LucideIcon;
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  sections: {
    heading: string;
    body: string;
    points?: string[];
  }[];
  seo: SeoMeta;
}

export interface Industry extends Publishable {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  icon: LucideIcon;
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  challenges: { title: string; body: string }[];
  howWeHelp: { title: string; body: string }[];
  relatedServices: string[];
  seo: SeoMeta;
}

export interface Integration extends Publishable {
  slug: string;
  name: string;
  category: string;
  summary: string;
  /** Sentence describing exactly what the connection does. No overclaiming. */
  capability: string;
  steps?: ProcessStep[];
  seo?: SeoMeta;
}

export interface FaqItem {
  question: string;
  answer: string;
  /** Groups questions on the FAQ page and scopes the FAQPage JSON-LD */
  category: FaqCategory;
  /** Included in the homepage FAQ block */
  featured?: boolean;
}

export type FaqCategory =
  | "Getting started"
  | "Services"
  | "Shipments"
  | "Billing"
  | "Support";

export interface LegalDocument extends Publishable {
  slug: string;
  title: string;
  summary: string;
  lastUpdated: string;
  /**
   * INTERNAL: template legal scaffolding. Must be reviewed and approved by
   * qualified counsel before production launch. See docs/LEGAL-REVIEW.md.
   */
  requiresLegalReview: boolean;
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
  seo: SeoMeta;
}

export interface CaseStudy extends Publishable {
  slug: string;
  client: string;
  industry: string;
  summary: string;
}
