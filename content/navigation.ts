import {
  ShoppingCart,
  Building,
  Store,
  Building2,
  Compass,
  Cpu,
  Leaf,
  BarChart3,
  Users,
  Handshake,
  Briefcase,
  FileText,
  HelpCircle,
  Plug,
} from "lucide-react";
import { publishedServices } from "./services";
import { publishedIndustries } from "./industries";
import type { NavGroup, NavLink } from "@/types/content";

/**
 * Navigation is derived from the content layer, not hand-maintained. An
 * unpublished service or industry disappears from the menu automatically —
 * there is no second list to forget to update.
 *
 * Three grouped menus rather than six top-level items: the menu should read as
 * focus, not as a sitemap.
 */

export const primaryNav: NavGroup[] = [
  {
    label: "Services",
    href: "/services",
    columns: [
      {
        heading: "Move and deliver",
        links: publishedServices
          .filter((s) => ["shipping", "freight-forwarding", "shop-and-ship"].includes(s.slug))
          .map((s) => ({
            label: s.name,
            href: `/services/${s.slug}`,
            description: s.tagline,
            icon: s.icon,
          })),
      },
      {
        heading: "Store and handle",
        links: publishedServices
          .filter((s) => ["fulfillment", "warehousing", "reverse-logistics"].includes(s.slug))
          .map((s) => ({
            label: s.name,
            href: `/services/${s.slug}`,
            description: s.tagline,
            icon: s.icon,
          })),
      },
    ],
  },
  {
    label: "Solutions",
    columns: [
      {
        heading: "By industry",
        links: publishedIndustries.map((i) => ({
          label: i.name,
          href: `/industries/${i.slug}`,
          description: i.tagline,
          icon: i.icon,
        })),
      },
      {
        heading: "By business size",
        links: [
          {
            label: "Small Businesses",
            href: "/small-business",
            description: "Support before you have a logistics team",
            icon: Store,
          },
          {
            label: "Enterprise",
            href: "/enterprise",
            description: "Documented procedures and named accountability",
            icon: Building2,
          },
        ],
      },
    ],
  },
  {
    label: "Company",
    columns: [
      {
        heading: "How we work",
        links: [
          {
            label: "Our Approach",
            href: "/approach",
            description: "Fewer promises, kept properly",
            icon: Compass,
          },
          {
            label: "Our Technology",
            href: "/technology",
            description: "One record per shipment",
            icon: Cpu,
          },
          {
            label: "Analytics",
            href: "/analytics",
            description: "Reporting from your own records",
            icon: BarChart3,
          },
          {
            label: "Sustainability",
            href: "/sustainability",
            description: "Practical choices, honestly described",
            icon: Leaf,
          },
        ],
      },
      {
        heading: "About us",
        links: [
          {
            label: "About Your Dart Express",
            href: "/about",
            description: "Who we are and what we are building",
            icon: Users,
          },
          {
            label: "Integrations",
            href: "/integrations",
            description: "Connect where you already sell",
            icon: Plug,
          },
          {
            label: "Partners",
            href: "/partners",
            description: "How we work with other operators",
            icon: Handshake,
          },
          {
            label: "Careers",
            href: "/careers",
            description: "Join an early team",
            icon: Briefcase,
          },
        ],
      },
    ],
  },
  {
    /*
     * FAQ deliberately lives in the footer only — it is a reference page, not
     * a primary journey, and the header should read as focus.
     */
    /* Header and footer both use the short form. The page's own title and
       breadcrumb keep the fuller "Track a Shipment". */
    label: "Track Shipment",
    href: "/track",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

/** Flat list used by the mobile drawer, which does not render columns. */
export const mobileNav = primaryNav;

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Services",
    links: publishedServices.map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    })),
  },
  {
    heading: "Solutions",
    links: [
      ...publishedIndustries.map((i) => ({
        label: i.name,
        href: `/industries/${i.slug}`,
      })),
      { label: "Small Businesses", href: "/small-business" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Integrations", href: "/integrations" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Approach", href: "/approach" },
      { label: "Our Technology", href: "/technology" },
      { label: "Analytics", href: "/analytics" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Partners", href: "/partners" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Get in touch",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Track Shipment", href: "/track" },
      { label: "Talk to an Expert", href: "/talk-to-an-expert" },
      { label: "FAQ", href: "/faq" },
      { label: "Log in", href: "/login" },
      { label: "Create an account", href: "/signup" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Use", href: "/legal/terms-of-use" },
  { label: "Cookie Policy", href: "/legal/cookie-policy" },
  { label: "Data Security", href: "/legal/data-security" },
];

export const utilityIcons = { FileText, HelpCircle, ShoppingCart, Building };
