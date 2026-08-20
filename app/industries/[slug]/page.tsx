import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeader } from "@/components/layout/section";
import { Card, CardIcon } from "@/components/ui/card";
import { CtaBand } from "@/components/shared/cta-band";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { publishedIndustries, getIndustry } from "@/content/industries";
import { industryHeroImages } from "@/content/media";
import { getService } from "@/content/services";

export function generateStaticParams() {
  return publishedIndustries.map((industry) => ({ slug: industry.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return buildMetadata({
    title: industry.seo.title,
    description: industry.seo.description,
    path: industry.seo.path,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const crumbs = buildCrumbs(
    { name: "Services", path: "/services" },
    { name: industry.name, path: `/industries/${industry.slug}` },
  );

  const related = industry.relatedServices
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <JsonLd schema={breadcrumbSchema(crumbs)} />

      <PageHero
        image={industryHeroImages[industry.slug]}
        eyebrow={industry.name}
        heading={industry.hero.heading}
        body={industry.hero.body}
      />

      {/* ---------------------------------------------------------- challenges */}
      <Section tone="canvas" spacing="md" aria-labelledby="challenges-heading">
        <SectionHeader
          eyebrow="The problem"
          heading="What usually goes wrong"
          lead="Not a list of pain points invented for a website — these are the things that break first."
          headingId="challenges-heading"
        />

        <RevealGroup as="ul" className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {industry.challenges.map((challenge, i) => (
            <RevealItem as="li" key={challenge.title} className="border-t border-line pt-5">
              <span
                aria-hidden="true"
                className="font-mono text-[0.75rem] tracking-tight text-ink-400"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-[1.0625rem] font-medium tracking-[-0.015em] text-ink-950">
                {challenge.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">
                {challenge.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------------------------------------------------------- how we help */}
      <Section tone="warm" spacing="lg" divider aria-labelledby="help-heading">
        <SectionHeader
          eyebrow="What we do about it"
          heading="How we help"
          headingId="help-heading"
        />

        <RevealGroup as="ul" className="mt-12 grid gap-4 sm:grid-cols-2">
          {industry.howWeHelp.map((item) => (
            <RevealItem as="li" key={item.title}>
              <Card variant="raised" padding="md" className="h-full">
                <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-ink-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">
                  {item.body}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ------------------------------------------------------ related services */}
      <Section tone="canvas" spacing="lg" aria-labelledby="related-heading">
        <SectionHeader
          eyebrow="Services"
          heading="The services that usually apply"
          headingId="related-heading"
        />

        <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((service) => {
            const Icon = service.icon;
            return (
              <RevealItem as="li" key={service.slug}>
                <Card variant="outline" padding="none" interactive className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex h-full flex-col rounded-xl p-6"
                  >
                    <CardIcon>
                      <Icon />
                    </CardIcon>
                    <h3 className="mt-4 text-[1rem] font-medium text-ink-950">
                      {service.name}
                    </h3>
                    <p className="mt-1.5 flex-1 text-[0.875rem] leading-relaxed text-ink-400">
                      {service.tagline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-950">
                      Read more
                      <ArrowRight aria-hidden="true" className="size-3" />
                    </span>
                  </Link>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <CtaBand
        heading={`Let's talk about your ${industry.name} operation`}
        body="Tell us how you sell, what you ship and where it goes wrong today. We will tell you what we can take off your plate."
      />
    </>
  );
}
