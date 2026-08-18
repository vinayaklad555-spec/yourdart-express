import { site } from "@/content/site";
import { publishedServices } from "@/content/services";
import type { Crumb } from "./seo";
import type { FaqItem } from "@/types/content";

/**
 * STRUCTURED DATA RULES
 * ---------------------------------------------------------------------------
 * No AggregateRating. No Review. No LocalBusiness with fabricated opening
 * hours, price range or geo coordinates. No areaServed, because coverage has
 * not been confirmed. Only facts the business supplied appear below.
 */

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.legalName,
    alternateName: site.shortName,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/logo.svg`,
    },
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.contact.address.street}, ${site.contact.address.unit}`,
      addressLocality: site.contact.address.city,
      addressRegion: site.contact.address.region,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: site.contact.email,
        telephone: site.contact.phone,
        availableLanguage: ["English"],
      },
    ],
    parentOrganization: {
      "@type": "Organization",
      name: site.family.name,
      url: site.family.url,
    },
    // Only emitted when real profiles exist.
    ...(site.social.length > 0 ? { sameAs: site.social.map((s) => s.href) } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.path === "/" ? site.url : `${site.url}${crumb.path}`,
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Service schema. Deliberately omits `areaServed` and any `offers` block —
 * coverage is confirmed per shipment and no pricing is published.
 */
export function serviceSchema(service: (typeof publishedServices)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    url: `${site.url}/services/${service.slug}`,
    provider: { "@id": ORG_ID },
  };
}

export function itemListSchema(
  name: string,
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${site.url}${item.url}`,
    })),
  };
}
