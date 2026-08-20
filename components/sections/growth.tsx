import * as React from "react";
import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { growth } from "@/content/home";

/**
 * The section that would normally hold statistics. It holds commitments
 * instead — because the company is new, and a number nobody can verify is
 * worth less than a promise you can be held to.
 */
export function Growth() {
  return (
    <Section tone="warm" spacing="lg" divider aria-labelledby="growth-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow={growth.eyebrow}
            heading={growth.heading}
            headingId="growth-heading"
          />
          <Reveal>
            <div className="mt-6 space-y-4 text-[0.9375rem] leading-[1.72] text-ink-400 sm:text-base">
              <p>{growth.body}</p>
              <p>{growth.body2}</p>
            </div>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="space-y-px lg:col-span-7">
          {growth.commitments.map((commitment, i) => (
            <RevealItem
              as="li"
              key={commitment.title}
              className="border-t border-line py-6 last:border-b"
            >
              <div className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="mt-0.5 font-mono text-[0.75rem] tracking-tight text-ink-950"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-ink-950">
                    {commitment.title}
                  </h3>
                  <p className="mt-2 max-w-[38rem] text-[0.9375rem] leading-relaxed text-ink-400">
                    {commitment.body}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
