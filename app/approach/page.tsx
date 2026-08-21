import type { Metadata } from "next";
import { FeaturePage } from "@/components/sections/feature-page";
import { buildMetadata } from "@/lib/seo";
import { getFeature } from "@/content/features";

const feature = getFeature("approach")!;

export const metadata: Metadata = buildMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: feature.seo.path,
});

export default function ApproachPage() {
  return (
    <FeaturePage
      feature={feature}
      crumbLabel="Company"
      crumbPath="/about"
      cta={{
        heading: "Hold us to it",
        body: "Tell us what you need moved. The way we take on work is the same whether it is one parcel or an ongoing arrangement.",
      }}
    />
  );
}
