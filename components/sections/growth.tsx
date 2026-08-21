import * as React from "react";
import { Section } from "@/components/layout/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { LogoMark } from "@/components/shared/logo";
import { growth } from "@/content/home";

/**
 * The section that would normally hold statistics. It holds commitments
 * instead — because the company is new, and a number nobody can verify is
 * worth less than a promise you can be held to.
 *
 * Laid out to a supplied reference: one framed panel, the narrative on a sunk
 * card to the left, the commitments listed to the right. There is deliberately
 * NO rule between the two columns — the gap between the sunk card and the
 * white ground already separates them, and a line on top of that read as
 * clutter.
 */
export function Growth() {
  return (
    <Section tone="warm" spacing="lg" divider aria-labelledby="growth-heading">
      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-line bg-canvas p-3 sm:p-4">
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
            {/* ------------------------------------------------ narrative */}
            <div className="relative overflow-hidden rounded-xl bg-canvas-sunk p-7 sm:p-9 lg:col-span-5">
              {/*
                * The brand mark as a watermark, the way the reference uses its
                * own logo: oversized, bled off the corner and dropped to a few
                * percent so it reads as texture rather than as a second logo.
                * `gradient={false}` makes every path take currentColor, which
                * is what lets one opacity class tint the whole mark.
                */}
              <LogoMark
                gradient={false}
                id="growth-watermark"
                className="pointer-events-none absolute -right-14 -bottom-16 size-56 text-accent/[0.045] select-none sm:-right-16 sm:-bottom-20 sm:size-72 sm:text-accent/[0.08]"
              />

              <div className="relative">
                <Eyebrow>{growth.eyebrow}</Eyebrow>
                <Heading as="h2" size="h3" id="growth-heading" className="mt-4">
                  {growth.heading}
                </Heading>
                <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.72] text-ink-400">
                  <p>{growth.body}</p>
                  <p>{growth.body2}</p>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------- commitments */}
            <div className="lg:col-span-7">
              <RevealGroup
                as="ul"
                className="flex h-full flex-col justify-center gap-8 px-1 py-4 sm:px-6 sm:py-6 lg:px-10"
              >
                {growth.commitments.map((commitment) => {
                  const Icon = commitment.icon;
                  return (
                    <RevealItem as="li" key={commitment.title}>
                      <div className="flex gap-4">
                        {/*
                          * Bare glyph, no plate — matching the "why us" row.
                          * Solid rather than stroked (see shared/solid-icons),
                          * in ink rather than the accent, and nudged down half
                          * a step so it sits on the title's cap height rather
                          * than its line box.
                          */}
                        <Icon className="mt-0.5 size-6 shrink-0 text-ink-950" />
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
