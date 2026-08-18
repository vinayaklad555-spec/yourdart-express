import type { Metadata } from "next";
import { FeaturePage } from "@/components/sections/feature-page";
import { buildMetadata } from "@/lib/seo";
import { getFeature } from "@/content/features";
import { pageHeroImages } from "@/content/media";

const feature = getFeature("technology")!;

export const metadata: Metadata = buildMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: feature.seo.path,
});

export default function TechnologyPage() {
  return (
    <FeaturePage
      feature={feature}
      image={pageHeroImages.technology}
      crumbLabel="Company"
      crumbPath="/about"
      cta={{
        heading: "Want to see how this works for your orders?",
        body: "We will walk you through exactly what is in place today and what is still being built — no product demo for something you cannot use yet.",
      }}
    />
  );
}
