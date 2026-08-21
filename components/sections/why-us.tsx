import * as React from "react";
import { Section, SectionHeader } from "@/components/layout/section";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { whyUs } from "@/content/home";

export function WhyUs() {
  return (
    <Section tone="canvas" spacing="lg" divider aria-labelledby="why-us-heading">
      <SectionHeader
        eyebrow={whyUs.eyebrow}
        heading={whyUs.heading}
        lead={whyUs.body}
        headingId="why-us-heading"
        align="center"
      />

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {whyUs.reasons.map((reason) => {
          const Icon = reason.icon;
          return (
            <RevealItem key={reason.title} className="bg-canvas">
              <div className="h-full p-6 lg:p-7">
                {/*
                  * Bare glyph, no plate — the reference sets these straight on
                  * the card. They are solid rather than stroked (see
                  * shared/solid-icons) and take ink rather than the accent, so
                  * the colour on this row comes from the copy, not the icons.
                  */}
                <Icon className="size-6 text-ink-950" />
                <h3 className="mt-5 text-[1rem] font-medium tracking-[-0.015em] text-ink-950">
                  {reason.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-400">
                  {reason.body}
                </p>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
