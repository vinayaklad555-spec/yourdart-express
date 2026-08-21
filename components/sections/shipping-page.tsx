import * as React from "react";
import { PageHero, heroCtaSize } from "@/components/shared/page-hero";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { CompactSteps } from "@/components/shared/compact-steps";
import { CtaBand } from "@/components/shared/cta-band";
import { FeatureSplit } from "@/components/shared/feature-split";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { heroImages, serviceHeroImages } from "@/content/media";
import {
  shippingHero,
  shippingServices,
  rightShipping,
  shippingSteps,
  shippingValue,
  shippingCta,
} from "@/content/shipping";

/**
 * /services/shipping.
 *
 * Six sections: what we ship -> how to choose -> how it works -> why us ->
 * convert. Shipping has its own page rather than the shared
 * /services/[slug] template because it runs several services; the other five
 * services still use that template unchanged.
 *
 * It previously ran to eleven sections and repeated itself — parcels were
 * introduced, listed, then explained again; tracking had a section of its own
 * plus a service card plus a value block. Each subject is now stated once, in
 * the section that owns it:
 *
 *   services            -> section 2, the page's main answer
 *   choosing between    -> section 3, framed as decisions, not a second list
 *   tracking + support  -> one service card, one value block, the hero CTA
 *
 * Alternating tones (canvas / warm) separate the sections, so none of them
 * needs a decorative device to announce itself.
 *
 * HEADINGS: one h1 in the hero, an h2 per section, h3 on cards and steps.
 * Nothing skips a level.
 */
export function ShippingPage() {
  return (
    <>
      {/* --------------------------------------------------------- 1. hero */}
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

      {/* ----------------------------------------------------- 2. services */}
      <Section tone="canvas" spacing="lg" aria-labelledby="services-heading">
        <SectionHeader
          eyebrow={shippingServices.eyebrow}
          heading={shippingServices.heading}
          lead={shippingServices.lead}
          headingId="services-heading"
        />
        {/*
          * Five cards over a three-column grid: the last two run wide on
          * desktop rather than leaving a hole in the final row.
          */}
        <RevealGroup
          as="ul"
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-6"
        >
          {shippingServices.items.map((service, i) => {
            const Icon = service.icon;
            const wide = i >= 3;
            return (
              <RevealItem
                as="li"
                key={service.title}
                className={wide ? "bg-canvas lg:col-span-3" : "bg-canvas lg:col-span-2"}
              >
                <div className="h-full p-7 lg:p-8">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-100/45 text-accent"
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 text-[1.0625rem] font-medium tracking-[-0.015em] text-ink-950">
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

      {/* ----------------------------------------------------- 3. choosing */}
      <Section tone="warm" spacing="lg" divider aria-labelledby="choosing-heading">
        {/* Two images because the choice itself is road or air. */}
        <FeatureSplit
          reverse
          eyebrow={rightShipping.eyebrow}
          heading={rightShipping.heading}
          headingId="choosing-heading"
          body={rightShipping.body}
          points={rightShipping.points}
          image={heroImages.returnsVan}
          secondImage={heroImages.airFreightHero}
        />
      </Section>

      {/* -------------------------------------------------- 4. how it works */}
      <Section tone="canvas" spacing="lg" aria-labelledby="steps-heading">
        <SectionHeader
          eyebrow={shippingSteps.eyebrow}
          heading={shippingSteps.heading}
          headingId="steps-heading"
        />
        <CompactSteps steps={shippingSteps.steps} className="mt-12" />
      </Section>

      {/* ------------------------------------------------------ 5. why us */}
      <Section tone="warm" spacing="lg" divider aria-labelledby="value-heading">
        <SectionHeader
          eyebrow={shippingValue.eyebrow}
          heading={shippingValue.heading}
          headingId="value-heading"
        />
        <RevealGroup
          as="ul"
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
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

      {/* ------------------------------------------------------ 6. closing */}
      <CtaBand
        heading={shippingCta.heading}
        body={shippingCta.body}
        primary={shippingCta.primary}
        secondary={shippingCta.secondary}
      />
    </>
  );
}
