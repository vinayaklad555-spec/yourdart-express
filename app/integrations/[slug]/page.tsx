import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeader } from "@/components/layout/section";
import { Notice } from "@/components/shared/notice";
import { ProcessSteps } from "@/components/shared/process-steps";
import { CtaBand } from "@/components/shared/cta-band";
import { Reveal } from "@/components/shared/reveal";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { publishedIntegrations, getIntegration } from "@/content/integrations";
import { pageHeroImages } from "@/content/media";

export function generateStaticParams() {
  return publishedIntegrations.map((integration) => ({ slug: integration.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const integration = getIntegration(slug);
  if (!integration?.seo) return {};

  return buildMetadata({
    title: integration.seo.title,
    description: integration.seo.description,
    path: integration.seo.path,
  });
}

const capabilities = [
  "Orders passed through for fulfilment and dispatch",
  "Order references preserved so returns match back to the original sale",
  "Delivery outcome returned to you against the order",
];

const notCapabilities = [
  "A self-serve tracking portal — not available yet",
  "Automatic rate quoting at your checkout — not available yet",
];

export default async function IntegrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const integration = getIntegration(slug);
  if (!integration) notFound();

  const crumbs = buildCrumbs(
    { name: "Integrations", path: "/integrations" },
    { name: integration.name, path: `/integrations/${integration.slug}` },
  );

  return (
    <>
      <JsonLd schema={breadcrumbSchema(crumbs)} />

      <PageHero
        image={pageHeroImages.shopify}
        eyebrow={integration.name}
        heading={`${integration.name} and Your Dart Express`}
        body={integration.capability}
      />

      {/* --------------------------------------------- what it does / does not */}
      <Section tone="canvas" spacing="md" aria-labelledby="scope-heading">
        <SectionHeader
          eyebrow="Scope"
          heading="What the connection does — and what it does not"
          lead="Stated in both directions, so there is no gap between what you expect and what you get."
          headingId="scope-heading"
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl border border-line bg-canvas p-7">
              <h3 className="text-[1rem] font-medium text-ink-950">What it does</h3>
              <ul className="mt-5 space-y-3">
                {capabilities.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-ink-950"
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-xl border border-line bg-canvas-sunk p-7">
              <h3 className="text-[1rem] font-medium text-ink-950">
                What it does not do yet
              </h3>
              <ul className="mt-5 space-y-3">
                {notCapabilities.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-3.5 shrink-0 bg-ink-300"
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-ink-400">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Notice tone="info" className="mt-6">
                These are on our roadmap. They will be described here as available
                only once they genuinely are.
              </Notice>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* -------------------------------------------------------------- setup */}
      {integration.steps ? (
        <Section
          tone="dark"
          spacing="lg"
          className="overflow-hidden"
          aria-labelledby="setup-heading"
        >
          <div
            aria-hidden="true"
            className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60"
          />
          <div className="relative">
            <SectionHeader
              eyebrow="Getting set up"
              heading="How we connect it"
              lead="Set up together on a call rather than left to a self-serve flow — because the packing standard matters more than the plumbing."
              headingId="setup-heading"
              tone="dark"
            />
            <ProcessSteps steps={integration.steps} tone="dark" className="mt-16" />
          </div>
        </Section>
      ) : null}

      <CtaBand
        heading={`Connect your ${integration.name} store`}
        body="Tell us what you sell and roughly how many orders you process. We will confirm what we would hold and how it would be packed before anything is connected."
      />
    </>
  );
}
