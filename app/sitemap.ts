import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { publishedServices } from "@/content/services";
import { publishedIndustries } from "@/content/industries";
import { publishedFeatures } from "@/content/features";
import { publishedIntegrations } from "@/content/integrations";
import { publishedLegal } from "@/content/legal";

/**
 * Generated from the content layer, so an unpublished service can never leak
 * into the sitemap. Preview routes (/login, /signup) are excluded because they
 * are marked noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;

  const core: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: url("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/talk-to-an-expert"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/track"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/industries"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/integrations"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/partners"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: url("/careers"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/case-studies"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const services = publishedServices.map((service) => ({
    url: url(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const industries = publishedIndustries.map((industry) => ({
    url: url(`/industries/${industry.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const featurePages = publishedFeatures.map((feature) => ({
    url: url(`/${feature.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const integrationPages = publishedIntegrations.map((integration) => ({
    url: url(`/integrations/${integration.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const legal = publishedLegal.map((doc) => ({
    url: url(`/legal/${doc.slug}`),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [
    ...core,
    ...services,
    ...industries,
    ...featurePages,
    ...integrationPages,
    ...legal,
  ];
}
