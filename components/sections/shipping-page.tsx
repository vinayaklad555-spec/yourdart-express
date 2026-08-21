import * as React from "react";
import { ArrowRight, Check } from "lucide-react";
import { PageHero, heroCtaSize } from "@/components/shared/page-hero";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Heading, Lead, Eyebrow } from "@/components/ui/typography";
import { ProcessSteps } from "@/components/shared/process-steps";
import { CtaBand } from "@/components/shared/cta-band";
import { FeatureSplit } from "@/components/shared/feature-split";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { heroImages, serviceHeroImages } from "@/content/media";
import {
  shippingHero,
  shipmentTypes,
  shippingServices,
  domesticShipping,
  internationalShipping,
  shippingProcess,
  shippingCost,
  shippingTracking,
  shippingSupport,
  shippingValue,
  shippingCta,
} from "@/content/shipping";

/**
 * /services/shipping.
 *
 * Shipping is the only service with several distinct offerings to explain —
 * road and air, domestic and international, plus cost, tracking and support —
 * so it has its own page rather than the shared /services/[slug] template.
 * The other five services still use that template unchanged.
 *
 * Section order is a journey, not a feature list: what we ship -> how -> the
 * domestic half -> the international half -> the process -> cost -> tracking
 * -> support -> why us -> convert. Alternating section tones (canvas / warm /
 * dark) do the work of separating them, so no section needs a decorative
 * device to announce itself.
 *
 * HEADINGS: one h1 in the hero, every section an h2, cards and detail blocks
 * h3. Nothing skips a level.
 */
export function ShippingPage() {
  return (
    <>
      {/* ------------------------------------------------------------- 1. hero */}
      <PageHero
        image={serviceHeroImages.shipping}
        eyebrow={shippingHero.eyebrow}
        heading={shippingHero.heading}
        body={shippingHero.body}
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href={shippingHero.primaryCta.href} className={heroCtaSize}>
            {shippingHero.primaryCta.label}
          </Button>
          <Button
            href={shippingHero.secondaryCta.href}
            variant="outline"
            className={heroCtaSize}
          >
            {shippingHero.secondaryCta.label}
          </Button>
        </div>
      </PageHero>

      {/* -------------------------------------------------------- 2. what we ship */}
      <Section tone="canvas" spacing="lg" aria-labelledby="ships-heading">
        <SectionHeader
          eyebrow={shipmentTypes.eyebrow}
          heading={shipmentTypes.heading}
          lead={shipmentTypes.lead}
          headingId="ships-heading"
        />
        <RevealGroup
          as="ul"
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3"
        >
          {shipmentTypes.items.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem as="li" key={item.title} className="bg-canvas">
                <div className="h-full p-7 lg:p-8">
                  <Icon
                    aria-hidden="true"
                    className="size-6 text-ink-950"
                    strokeWidth={1.75}
                  />
                  <h3 className="mt-6 text-[1.0625rem] font-medium tracking-[-0.015em] text-ink-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* ------------------------------------------------------ 3. the services */}
      <Section tone="warm" spacing="lg" divider aria-labelledby="services-heading">
        <SectionHeader
          eyebrow={shippingServices.eyebrow}
          heading={shippingServices.heading}
          lead={shippingServices.lead}
          headingId="services-heading"
        />
        <RevealGroup as="ul" className="mt-12 grid gap-4 sm:grid-cols-2">
          {shippingServices.items.map((service) => {
            const Icon = service.icon;
            return (
              <RevealItem as="li" key={service.title}>
                <div className="h-full rounded-2xl border border-line bg-canvas p-7 lg:p-8">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-100/45 text-accent"
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 text-[1.125rem] font-medium tracking-[-0.015em] text-ink-950">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-[34rem] text-[0.9375rem] leading-relaxed text-ink-400">
                    {service.body}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* -------------------------------------------------------- 4. domestic */}
      <Section tone="canvas" spacing="lg" aria-labelledby="domestic-heading">
        <FeatureSplit
          eyebrow={domesticShipping.eyebrow}
          heading={domesticShipping.heading}
          headingId="domestic-heading"
          body={domesticShipping.body}
          points={domesticShipping.points}
          image={heroImages.returnsVan}
        />
      </Section>

      {/* --------------------------------------------------- 5. international */}
      <Section tone="warm" spacing="lg" divider aria-labelledby="international-heading">
        <FeatureSplit
          reverse
          eyebrow={internationalShipping.eyebrow}
          heading={internationalShipping.heading}
          headingId="international-heading"
          body={internationalShipping.body}
          points={internationalShipping.points}
          image={heroImages.airFreightHero}
        />
      </Section>

      {/* --------------------------------------------------------- 6. process */}
      <Section
        tone="dark"
        spacing="lg"
        className="overflow-hidden"
        aria-labelledby="process-heading"
      >
        <div
          aria-hidden="true"
          className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60"
        />
        <div className="relative">
          <SectionHeader
            eyebrow={shippingProcess.eyebrow}
            heading={shippingProcess.heading}
            lead={shippingProcess.lead}
            headingId="process-heading"
            tone="dark"
          />
          <ProcessSteps
            steps={shippingProcess.steps}
            tone="dark"
            className="mt-16"
          />
        </div>
      </Section>

      {/* ------------------------------------------------------------ 7. cost */}
      <Section tone="canvas" spacing="lg" aria-labelledby="cost-heading">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{shippingCost.eyebrow}</Eyebrow>
            <Heading as="h2" size="h2" id="cost-heading" className="mt-4">
              {shippingCost.heading}
            </Heading>
            <Lead className="mt-5 max-w-[36rem]">{shippingCost.body}</Lead>
            <Button
              href={shippingCost.cta.href}
              className={`mt-8 ${heroCtaSize}`}
            >
              {shippingCost.cta.label}
              <ArrowRight aria-hidden="true" />
            </Button>
          </Reveal>

          {/*
            * A quote SUMMARY, deliberately not a calculator. It shows what a
            * quote is priced against; it does not compute or imply a live
            * figure, because no such system exists to back that up.
            */}
          <Reveal>
            <div className="rounded-2xl border border-line bg-canvas-sunk p-2.5">
              <div className="rounded-xl border border-line bg-canvas p-6 sm:p-7">
                <h3 className="text-[0.9375rem] font-medium text-ink-950">
                  {shippingCost.quote.title}
                </h3>
                <dl className="mt-5 divide-y divide-line">
                  {shippingCost.quote.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-6 py-3.5"
                    >
                      <dt className="text-[0.875rem] text-ink-700">{row.label}</dt>
                      <dd className="shrink-0 text-[0.8125rem] text-ink-400">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-400">
                  {shippingCost.quote.footnote}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* -------------------------------------------------------- 8. tracking */}
      <Section tone="warm" spacing="lg" divider aria-labelledby="tracking-heading">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-2">
            <Eyebrow>{shippingTracking.eyebrow}</Eyebrow>
            <Heading as="h2" size="h2" id="tracking-heading" className="mt-4">
              {shippingTracking.heading}
            </Heading>
            <Lead className="mt-5 max-w-[36rem]">{shippingTracking.body}</Lead>
            <Button
              href={shippingTracking.cta.href}
              variant="outline"
              className={`mt-8 ${heroCtaSize}`}
            >
              {shippingTracking.cta.label}
              <ArrowRight aria-hidden="true" />
            </Button>
          </Reveal>

          {/* The stages a shipment passes, not a live feed of one. */}
          <Reveal className="lg:order-1">
            <ol className="rounded-2xl border border-line bg-canvas p-6 sm:p-8">
              {shippingTracking.stages.map((stage, i) => {
                const done = i < 3;
                const last = i === shippingTracking.stages.length - 1;
                return (
                  <li key={stage} className="relative flex gap-4 pb-6 last:pb-0">
                    {!last ? (
                      <span
                        aria-hidden="true"
                        className="absolute top-7 bottom-0 left-[0.6875rem] w-px bg-line"
                      />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className={
                        done
                          ? "relative inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-white"
                          : "relative inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-line bg-canvas"
                      }
                    >
                      {done ? <Check className="size-3.5" strokeWidth={3} /> : null}
                    </span>
                    <span className="text-[0.9375rem] text-ink-700">{stage}</span>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* --------------------------------------------------------- 9. support */}
      <Section tone="canvas" spacing="md" aria-labelledby="support-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow={shippingSupport.eyebrow}
              heading={shippingSupport.heading}
              lead={shippingSupport.body}
              headingId="support-heading"
            />
          </div>
          <RevealGroup as="ul" className="grid gap-3 lg:col-span-7">
            {shippingSupport.points.map((point) => (
              <RevealItem as="li" key={point}>
                <div className="flex items-start gap-3 rounded-xl border border-line bg-canvas-sunk px-5 py-4">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-4.5 shrink-0 text-ink-950"
                  />
                  <p className="text-[0.9375rem] text-ink-700">{point}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* -------------------------------------------------------- 10. why us */}
      <Section tone="warm" spacing="lg" divider aria-labelledby="value-heading">
        <SectionHeader
          eyebrow={shippingValue.eyebrow}
          heading={shippingValue.heading}
          headingId="value-heading"
        />
        <RevealGroup
          as="ul"
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {shippingValue.items.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem as="li" key={item.title} className="bg-canvas">
                <div className="h-full p-7">
                  <Icon
                    aria-hidden="true"
                    className="size-5 text-ink-950"
                    strokeWidth={1.75}
                  />
                  <h3 className="mt-5 text-[1rem] font-medium tracking-[-0.015em] text-ink-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-[1.6] text-ink-400">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* ------------------------------------------------------- 11. final cta */}
      <CtaBand
        heading={shippingCta.heading}
        body={shippingCta.body}
        primary={shippingCta.primary}
        secondary={shippingCta.secondary}
      />
    </>
  );
}
