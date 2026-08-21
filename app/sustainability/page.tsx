import type { Metadata } from "next";
import { FeaturePage } from "@/components/sections/feature-page";
import { buildMetadata } from "@/lib/seo";
import { getFeature } from "@/content/features";

const feature = getFeature("sustainability")!;

export const metadata: Metadata = buildMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: feature.seo.path,
});

export default function SustainabilityPage() {
  return (
    <FeaturePage
      feature={feature}
      crumbLabel="Company"
      crumbPath="/about"
      cta={{
        heading: "Fewer, fuller movements",
        body: "If consolidation or packaging is costing you more than it should, tell us what you are shipping and we will look at it with you.",
      }}
    />
  );
}
