import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHero, heroCtaSize } from "@/components/shared/page-hero";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardIcon } from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { ProcessSteps } from "@/components/shared/process-steps";
import { CtaBand } from "@/components/shared/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { BenefitVisual } from "@/components/shared/benefit-visual";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/jsonld";
import { publishedServices, getService } from "@/content/services";
import { serviceHeroImages } from "@/content/media";

/** Every published service is prerendered at build time. */
export function generateStaticParams() {
  return publishedServices.map((service) => ({ slug: service.slug }));
}

/** Unknown slugs 404 rather than rendering on demand. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: service.seo.path,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crumbs = buildCrumbs(
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  );

  const others = publishedServices.filter((s) => s.slug !== service.slug).slice(0, 3);
  const Icon = service.icon;

  return (
    <>
      <JsonLd schema={[breadcrumbSchema(crumbs), serviceSchema(service)]} />

      <PageHero
        image={serviceHeroImages[service.slug]}
        eyebrow={service.name}
        heading={service.hero.heading}
        body={service.hero.body}
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/talk-to-an-expert" className={heroCtaSize}>
            Talk to our team
          </Button>
          <Button
            href="/services"
            variant="outline"
            className={heroCtaSize}
          >
            All services
          </Button>
        </div>
      </PageHero>

      {/* ------------------------------------------------------ what it covers */}
      <Section tone="canvas" spacing="md" aria-labelledby="covers-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="What it covers"
              heading={`${service.name}, in practice`}
              lead={service.summary}
              headingId="covers-heading"
            />
            <Reveal>
              <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-line bg-canvas-sunk px-4 py-3">
                <CardIcon>
                  <Icon />
                </CardIcon>
                <span className="text-[0.875rem] font-medium text-ink-700">
                  {service.tagline}
                </span>
              </div>
            </Reveal>
          </div>

          <RevealGroup as="ul" className="lg:col-span-7">
            {service.whatItIs.map((item) => (
              <RevealItem
                as="li"
                key={item}
                className="flex gap-4 border-t border-line py-5 last:border-b"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 size-4.5 shrink-0 text-ink-950"
                />
                <p className="text-[0.9375rem] leading-relaxed text-ink-700">{item}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ------------------------------------------------------------ benefits */}
      <Section tone="warm" spacing="lg" divider aria-labelledby="benefits-heading">
        <SectionHeader
          eyebrow="Why it helps"
          heading="What you get out of it"
          headingId="benefits-heading"
        />

        <RevealGroup as="ul" className="mt-12 grid gap-5 sm:grid-cols-2">
          {service.benefits.map((benefit) => (
            <RevealItem as="li" key={benefit.title}>
              {/*
                * Card shape from the layout reference: the illustration is
                * INSET (the card pads around it), and the shadow is a minimal
                * NEUTRAL grey — not the purple bloom used on the form cards,
                * which read far too heavy at this size.
                */}
              <div className="h-full rounded-2xl bg-canvas p-2.5 shadow-[0_1px_2px_rgb(16_24_40/0.04),0_2px_6px_rgb(16_24_40/0.03),0_12px_28px_-14px_rgb(16_24_40/0.14)]">
                <BenefitVisual spec={benefit.visual} />
                <div className="px-4 pt-5 pb-4 sm:px-5 sm:pb-5">
                  <h3 className="text-[1rem] font-medium tracking-[-0.015em] text-ink-950">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 text-[0.875rem] leading-[1.6] text-ink-400">
                    {benefit.body}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ------------------------------------------------------------- process */}
      <Section tone="dark" spacing="lg" className="overflow-hidden" aria-labelledby="process-heading">
        <div
          aria-hidden="true"
          className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60"
        />
        <div className="relative">
          <SectionHeader
            eyebrow="How it works"
            heading="From first message to finished job"
            headingId="process-heading"
            tone="dark"
          />
          <ProcessSteps steps={service.process} tone="dark" className="mt-16" />
        </div>
      </Section>

      {/* ------------------------------------------------------------ best for */}
      <Section tone="canvas" spacing="md" aria-labelledby="best-for-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Heading as="h2" size="h3" id="best-for-heading">
              Who this is usually for
            </Heading>
          </div>
          <RevealGroup as="ul" className="grid gap-3 lg:col-span-8">
            {service.bestFor.map((item) => (
              <RevealItem as="li" key={item}>
                <div className="flex items-start gap-3 rounded-xl border border-line bg-canvas-sunk px-5 py-4">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-950"
                  />
                  <p className="text-[0.9375rem] text-ink-700">{item}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* -------------------------------------------------------- other services */}
      <Section tone="warm" spacing="md" divider aria-labelledby="other-heading">
        <SectionHeader
          eyebrow="Also available"
          heading="Other services"
          headingId="other-heading"
        />
        <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-3">
          {others.map((other) => {
            const OtherIcon = other.icon;
            return (
              <RevealItem as="li" key={other.slug}>
                <Card variant="raised" padding="none" interactive className="h-full">
                  <Link
                    href={`/services/${other.slug}`}
                    className="flex h-full flex-col rounded-xl p-6"
                  >
                    <CardIcon>
                      <OtherIcon />
                    </CardIcon>
                    <h3 className="mt-4 text-[1rem] font-medium text-ink-950">
                      {other.name}
                    </h3>
                    <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-400">
                      {other.tagline}
                    </p>
                  </Link>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <CtaBand
        heading={`Talk to us about ${service.name.toLowerCase()}`}
        body="Tell us what you need and we will confirm what we can support before anything is booked."
      />
    </>
  );
}
