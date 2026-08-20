import * as React from "react";
import { Section, SectionHeader } from "@/components/layout/section";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { whatWeDo } from "@/content/home";

export function WhatWeDo() {
  return (
    <Section id="what-we-do" tone="canvas" spacing="lg" aria-labelledby="what-we-do-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow={whatWeDo.eyebrow}
            heading={whatWeDo.heading}
            lead={whatWeDo.body}
            headingId="what-we-do-heading"
          />
        </div>

        {/* A 2×2 of plain statements — no cards, no icons, just type and rules */}
        <RevealGroup as="ul" className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-7">
          {whatWeDo.points.map((point) => (
            <RevealItem as="li" key={point.title} className="border-t border-line pt-5">
              <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-ink-950">
                {point.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">
                {point.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
