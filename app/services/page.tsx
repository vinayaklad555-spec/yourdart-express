import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { pageHeroImages } from "@/content/media";
import { Section, SectionHeader } from "@/components/layout/section";
import { Card, CardIcon } from "@/components/ui/card";
import { CtaBand } from "@/components/shared/cta-band";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonld";
import { publishedServices } from "@/content/services";
import { publishedIndustries } from "@/content/industries";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Shipping, fulfillment, warehousing, reverse logistics, air freight forwarding and shop and ship — the six services Your Dart Express provides, and exactly what each one covers.",
  path: "/services",
});

const crumbs = buildCrumbs({ name: "Services", path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbs),
          itemListSchema(
            "Your Dart Express services",
            publishedServices.map((s) => ({
              name: s.name,
              url: `/services/${s.slug}`,
            })),
          ),
        ]}
      />

      <PageHero
        image={pageHeroImages.services}
        eyebrow="Services"
        heading="Six services, one accountable team"
        body="Storage, fulfilment, delivery and returns handled by the same people — so when you ask where something is, there is one place the answer comes from."
      />

      {/* ------------------------------------------------------- service list */}
      <Section tone="canvas" spacing="md">
        <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2">
          {publishedServices.map((service) => {
            const Icon = service.icon;
            return (
              <RevealItem as="li" key={service.slug}>
                <Card variant="outline" padding="none" interactive className="group h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex h-full flex-col rounded-xl p-7 sm:p-8"
                  >
                    <CardIcon>
                      <Icon />
                    </CardIcon>

                    <h2 className="mt-5 flex items-start gap-1.5 text-[1.25rem] font-medium tracking-[-0.02em] text-ink-950">
                      {service.name}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-ink-300 transition-colors group-hover:text-ink-950"
                      />
                    </h2>

                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-400">
                      {service.summary}
                    </p>

                    <ul className="mt-6 flex-1 space-y-2 border-t border-line pt-5">
                      {service.whatItIs.slice(0, 3).map((item) => (
                        <li key={item} className="flex gap-2.5 text-[0.875rem] text-ink-400">
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1 shrink-0 rounded-full bg-ink-950"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-ink-950">
                      About {service.shortName ?? service.name}
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </span>
                  </Link>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* ---------------------------------------------------------- industries */}
      <Section tone="warm" spacing="lg" divider aria-labelledby="industries-heading">
        <SectionHeader
          eyebrow="Industries"
          heading="Built around how you actually sell"
          lead="The services are the same. What changes is which parts matter most and how they are set up."
          headingId="industries-heading"
        />

        <RevealGroup as="ul" className="mt-12 grid gap-4 sm:grid-cols-2">
          {publishedIndustries.map((industry) => {
            const Icon = industry.icon;
            return (
              <RevealItem as="li" key={industry.slug}>
                <Card variant="raised" padding="none" interactive className="h-full">
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="flex h-full flex-col rounded-xl p-7"
                  >
                    <CardIcon>
                      <Icon />
                    </CardIcon>
                    <h3 className="mt-5 text-[1.125rem] font-medium tracking-[-0.016em] text-ink-950">
                      {industry.name}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">
                      {industry.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-ink-950">
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

      <CtaBand
        heading="Not sure which service you need?"
        body="Describe what you are trying to do and we will tell you which of these fits — or tell you honestly if none of them do."
      />
    </>
  );
}
