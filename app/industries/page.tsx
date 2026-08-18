import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { pageHeroImages } from "@/content/media";
import { Section } from "@/components/layout/section";
import { Card, CardIcon } from "@/components/ui/card";
import { CtaBand } from "@/components/shared/cta-band";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonld";
import { publishedIndustries } from "@/content/industries";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description:
    "How Your Dart Express works with direct-to-consumer brands and B2B businesses — what breaks first in each, and which services address it.",
  path: "/industries",
});

const crumbs = buildCrumbs({ name: "Industries", path: "/industries" });

const sizeSegments = [
  {
    name: "Small Businesses",
    href: "/small-business",
    body: "Logistics support before you have a logistics team — start with whatever is costing you the most time.",
  },
  {
    name: "Enterprise",
    href: "/enterprise",
    body: "Scoped requirements, documented procedures, named accountability and reporting you can take into a review.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbs),
          itemListSchema(
            "Industries served",
            publishedIndustries.map((i) => ({
              name: i.name,
              url: `/industries/${i.slug}`,
            })),
          ),
        ]}
      />

      <PageHero
        image={pageHeroImages.industries}
        eyebrow="Industries"
        heading="Same services, set up around how you sell"
        body="What changes between a DTC brand and a B2B supplier is not the list of services. It is which parts matter most, and how they need to be configured."
      />

      <Section tone="canvas" spacing="md">
        <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2">
          {publishedIndustries.map((industry) => {
            const Icon = industry.icon;
            return (
              <RevealItem as="li" key={industry.slug}>
                <Card variant="outline" padding="none" interactive className="h-full">
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="flex h-full flex-col rounded-xl p-7 sm:p-8"
                  >
                    <CardIcon>
                      <Icon />
                    </CardIcon>
                    <h2 className="mt-5 text-[1.25rem] font-medium tracking-[-0.02em] text-ink-950">
                      {industry.name}
                    </h2>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-400">
                      {industry.summary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-ink-950">
                      Read more
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </span>
                  </Link>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <Section tone="warm" spacing="md" divider aria-labelledby="size-heading">
        <h2
          id="size-heading"
          className="text-[clamp(1.625rem,1.3rem+1.5vw,2.375rem)] leading-[1.14] font-medium tracking-[-0.028em] text-ink-950"
        >
          Or by the size of your business
        </h2>

        <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2">
          {sizeSegments.map((segment) => (
            <RevealItem as="li" key={segment.href}>
              <Card variant="raised" padding="none" interactive className="h-full">
                <Link href={segment.href} className="flex h-full flex-col rounded-xl p-7">
                  <h3 className="text-[1.125rem] font-medium tracking-[-0.016em] text-ink-950">
                    {segment.name}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-400">
                    {segment.body}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-ink-950">
                    Read more
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </span>
                </Link>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand />
    </>
  );
}
