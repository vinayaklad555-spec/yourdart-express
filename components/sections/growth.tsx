import * as React from "react";
import { Section } from "@/components/layout/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { growth } from "@/content/home";

/**
 * The section that would normally hold statistics. It holds commitments
 * instead — because the company is new, and a number nobody can verify is
 * worth less than a promise you can be held to.
 *
 * Laid out to a supplied reference: one framed panel, the narrative sitting on
 * a sunk card to the left, the commitments listed to the right behind a single
 * vertical rule. The rule is the only divider — the per-item hairlines this
 * had before competed with it and made the right-hand column read as a table.
 */
export function Growth() {
  return (
    <Section tone="warm" spacing="lg" divider aria-labelledby="growth-heading">
      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-line bg-canvas p-3 sm:p-4">
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
            {/* ------------------------------------------------ narrative */}
            <div className="rounded-xl bg-canvas-sunk p-7 sm:p-9 lg:col-span-5">
              <Eyebrow>{growth.eyebrow}</Eyebrow>
              <Heading as="h2" size="h3" id="growth-heading" className="mt-4">
                {growth.heading}
              </Heading>
              <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.72] text-ink-400">
                <p>{growth.body}</p>
                <p>{growth.body2}</p>
              </div>
            </div>

            {/* ---------------------------------------------- commitments */}
            <div className="lg:col-span-7 lg:border-l lg:border-line">
              <RevealGroup
                as="ul"
                className="flex h-full flex-col justify-center gap-8 px-1 py-4 sm:px-6 sm:py-6 lg:px-10"
              >
                {growth.commitments.map((commitment) => {
                  const Icon = commitment.icon;
                  return (
                    <RevealItem as="li" key={commitment.title}>
                      <div className="flex gap-5">
                        <span
                          aria-hidden="true"
                          className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-100/45 text-accent"
                        >
                          <Icon className="size-5" strokeWidth={1.75} />
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-ink-950">
                            {commitment.title}
                          </h3>
                          <p className="mt-1.5 max-w-[38rem] text-[0.9375rem] leading-relaxed text-ink-400">
                            {commitment.body}
                          </p>
                        </div>
                      </div>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
