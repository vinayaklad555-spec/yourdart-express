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
 * The diagram that heads a benefit card. Every label is drawn from the
 * benefit's own copy, so the picture explains the claim rather than decorating
 * it — and adding a service means writing labels, not commissioning artwork.
 *
 *   hub    — several inputs arriving at one place
 *   checks — a list verified before something happens (items may be denials)
 *   steps  — an ordered chain; `flagged` marks one as the exception
 *   record — a document travelling with the goods
 *   levels — volume changing across named periods
 */
export type BenefitVisualSpec =
  | { kind: "hub"; spokes: string[]; hub: string }
  | { kind: "checks"; items: { label: string; ok?: boolean }[]; result?: string }
  | { kind: "steps"; steps: string[]; flagged?: number }
  | { kind: "record"; title: string; lines: string[] }
  | { kind: "levels"; bars: { label: string; height: number }[] }
  /** A supplied illustration, used in place of a generated diagram. */
  | { kind: "image"; src: string };

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
