import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeader } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Notice } from "@/components/shared/notice";
import { CtaBand } from "@/components/shared/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import {
  publishedIntegrations,
  requestedIntegrations,
  manualIntake,
} from "@/content/integrations";

export const metadata: Metadata = buildMetadata({
  title: "Integrations",
  description:
    "Shopify is the direct integration Your Dart Express offers today. Other sales channels can send orders in bulk. Here is exactly what is and is not connected.",
  path: "/integrations",
});

const crumbs = buildCrumbs({ name: "Integrations", path: "/integrations" });

export default function IntegrationsPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow="Integrations"
        heading="One connection, and we are honest about the rest"
        body="Orders should reach us the way they reached you. Today that means Shopify — and for everything else, a straightforward bulk route rather than a logo we have not earned."
      />

      {/* --------------------------------------------------------- available */}
      <Section tone="canvas" spacing="md" aria-labelledby="available-heading">
        <SectionHeader
          eyebrow="Available now"
          heading="What is connected today"
          headingId="available-heading"
        />

        <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2">
          {publishedIntegrations.map((integration) => (
            <RevealItem as="li" key={integration.slug}>
              <Card variant="raised" padding="none" interactive className="h-full">
                <Link
                  href={`/integrations/${integration.slug}`}
                  className="flex h-full flex-col rounded-xl p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[0.6875rem] font-medium tracking-[0.09em] text-ink-400 uppercase">
                      {integration.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas-sunk px-2.5 py-1 text-[0.75rem] font-medium text-ink-950">
                      <Check aria-hidden="true" className="size-3" />
                      Live
                    </span>
                  </div>

                  <h2 className="mt-5 text-[1.375rem] font-medium tracking-[-0.015em] text-ink-950">
                    {integration.name}
                  </h2>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-400">
                    {integration.capability}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-ink-950">
                    How the {integration.name} connection works
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </span>
                </Link>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ------------------------------------------------------ not available */}
      <Section tone="warm" spacing="lg" divider aria-labelledby="unavailable-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Not available yet"
              heading={manualIntake.heading}
              lead={manualIntake.body}
              headingId="unavailable-heading"
            />
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[0.875rem] text-ink-400">
                Channels we are regularly asked about and cannot connect directly
                today:
              </p>
              {/* Single column below 360px — "WooCommerce" will not fit a
                  two-up cell at 320px without being clipped. */}
              <ul className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-md bg-line min-[360px]:grid-cols-2 sm:grid-cols-3">
                {requestedIntegrations.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-2.5 bg-canvas px-4 py-3.5 text-[0.875rem] text-ink-400"
                  >
                    <Minus aria-hidden="true" className="size-3.5 shrink-0 text-ink-300" />
                    {name}
                  </li>
                ))}
              </ul>

              <Notice tone="info" className="mt-6">
                None of the channels above are connected to us. If we build one of
                these, it will move to the section above and this list will get
                shorter. We will not add a logo before the connection exists.
              </Notice>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand
        heading="Selling somewhere we do not connect to?"
        body="Tell us which channel and roughly how many orders you process. We will tell you honestly whether a bulk route works at your volume."
      />
    </>
  );
}
