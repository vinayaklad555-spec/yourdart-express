import type { Metadata } from "next";
import { site } from "@/content/site";

interface BuildMetadataArgs {
  title: string;
  description: string;
  /** Route path with a leading slash and no trailing slash. "/" for home. */
  path: string;
  /** Set false for pages that should exist but not be indexed. */
  index?: boolean;
  type?: "website" | "article";
}

/**
 * Single place that produces title, canonical, robots, Open Graph and Twitter
 * metadata. Every page uses it, so no page can accidentally ship without a
 * canonical URL or with a duplicated title.
 */
export function buildMetadata({
  title,
  description,
  path,
  index = true,
  type = "website",
}: BuildMetadataArgs): Metadata {
  const canonical = path === "/" ? site.url : `${site.url}${path}`;
  const fullTitle = path === "/" ? `${site.name} — ${site.tagline}` : `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: true, nocache: true },
    openGraph: {
      type,
      url: canonical,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: site.locale,
      images: [
        {
          url: site.ogImage,
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [site.ogImage],
    },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

/** Builds the trail used by both the visual breadcrumb and BreadcrumbList JSON-LD. */
export function buildCrumbs(...crumbs: Crumb[]): Crumb[] {
  return [{ name: "Home", path: "/" }, ...crumbs];
}
