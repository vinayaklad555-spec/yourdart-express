import type { Metadata } from "next";
import { FeaturePage } from "@/components/sections/feature-page";
import { buildMetadata } from "@/lib/seo";
import { getFeature } from "@/content/features";
import { pageHeroImages } from "@/content/media";

const feature = getFeature("enterprise")!;

export const metadata: Metadata = buildMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: feature.seo.path,
});

export default function EnterprisePage() {
  return (
    <FeaturePage
      feature={feature}
      image={pageHeroImages.enterprise}
      crumbLabel="Solutions"
      crumbPath="/services"
      cta={{
        heading: "Start with a proper scoping conversation",
        body: "Send us your volumes, destinations, handling requirements and escalation expectations. We will tell you plainly whether we are the right fit.",
      }}
    />
  );
}
