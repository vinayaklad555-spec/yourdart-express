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

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-md bg-line sm:grid-cols-2 lg:grid-cols-4">
        {whyUs.reasons.map((reason) => {
          const Icon = reason.icon;
          return (
            <RevealItem key={reason.title} className="bg-canvas">
              <div className="h-full p-6 lg:p-7">
                <span
                  aria-hidden="true"
                  className="inline-flex size-9 items-center justify-center rounded-lg bg-canvas-sunk text-ink-950 ring-1 ring-line"
                >
                  <Icon className="size-4" />
                </span>
                <h3 className="mt-5 text-[1rem] font-medium tracking-[-0.015em] text-ink-950">
                  {reason.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">
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
