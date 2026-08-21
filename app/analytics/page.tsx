import type { Metadata } from "next";
import { FeaturePage } from "@/components/sections/feature-page";
import { buildMetadata } from "@/lib/seo";
import { getFeature } from "@/content/features";

const feature = getFeature("analytics")!;

export const metadata: Metadata = buildMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: feature.seo.path,
});

export default function AnalyticsPage() {
  return (
    <FeaturePage
      feature={feature}
      crumbLabel="Company"
      crumbPath="/about"
      cta={{
        heading: "Reporting on what you actually ship",
        body: "Tell us what you need to be able to see and we will tell you what we can report on today.",
      }}
    />
  );
}
