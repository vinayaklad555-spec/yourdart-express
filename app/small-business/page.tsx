import type { Metadata } from "next";
import { FeaturePage } from "@/components/sections/feature-page";
import { buildMetadata } from "@/lib/seo";
import { getFeature } from "@/content/features";
import { pageHeroImages } from "@/content/media";

const feature = getFeature("small-business")!;

export const metadata: Metadata = buildMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: feature.seo.path,
});

export default function SmallBusinessPage() {
  return (
    <FeaturePage
      feature={feature}
      image={pageHeroImages.smallBusiness}
      crumbLabel="Solutions"
      crumbPath="/services"
      cta={{
        heading: "Get dispatch off your evenings",
        body: "Start with the part that is costing you the most time. Tell us what that is and we will scope it with you.",
      }}
    />
  );
}
