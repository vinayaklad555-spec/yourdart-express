import * as React from "react";
import { Check } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/typography";
import { CtaBand } from "@/components/shared/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbSchema } from "@/lib/jsonld";
import { buildCrumbs } from "@/lib/seo";
import type { Feature } from "@/types/content";
import type { HeroImage } from "@/content/media";

/**
 * One template drives all six "how we work" and "who we work with" pages. The
 * content file is the only thing that differs between them, which is what keeps
 * six pages from becoming six divergent layouts.
 */
export function FeaturePage({
  feature,
  crumbLabel = "Company",
  crumbPath = "/about",
  cta,
  image,
}: {
  feature: Feature;
  image?: HeroImage;
  crumbLabel?: string;
  crumbPath?: string;
  cta?: { heading: string; body: string };
}) {
  const crumbs = buildCrumbs(
    { name: crumbLabel, path: crumbPath },
    { name: feature.name, path: `/${feature.slug}` },
  );

  return (
    <>
      <JsonLd schema={breadcrumbSchema(crumbs)} />

      <PageHero
        image={image}
        eyebrow={feature.name}
        heading={feature.hero.heading}
        body={feature.hero.body}
      />

      <Section tone="canvas" spacing="md">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky summary rail on desktop, plain intro on mobile */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="text-eyebrow flex items-center gap-2.5 uppercase text-ink-950">
                  <span aria-hidden="true" className="h-px w-6 bg-ink-300" />
                  {feature.name}
                </p>
                <p className="mt-5 text-[1.0625rem] leading-[1.6] tracking-[-0.011em] text-ink-700">
                  {feature.summary}
                </p>

                <nav aria-label="On this page" className="mt-8 hidden lg:block">
                  <ul className="space-y-2.5 border-l border-line pl-5">
                    {feature.sections.map((section) => (
                      <li key={section.heading}>
                        <a
                          href={`#${slugify(section.heading)}`}
                          className="text-[0.875rem] text-ink-400 transition-colors hover:text-ink-950"
                        >
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Reveal>
            </div>
          </div>

          {/* ------------------------------------------------------- sections */}
          <div className="lg:col-span-8">
            <RevealGroup className="divide-y divide-line">
              {feature.sections.map((section, i) => (
                <RevealItem
                  key={section.heading}
                  className={i === 0 ? "pb-10" : "py-10 last:pb-0"}
                >
                  <article id={slugify(section.heading)} className="scroll-mt-28">
                    <Heading as="h2" size="h3">
                      {section.heading}
                    </Heading>
                    <p className="mt-4 max-w-[42rem] text-[0.9375rem] leading-[1.72] text-ink-400 sm:text-base">
                      {section.body}
                    </p>

                    {section.points ? (
                      <ul className="mt-6 space-y-2.5">
                        {section.points.map((point) => (
                          <li key={point} className="flex gap-3">
                            <Check
                              aria-hidden="true"
                              className="mt-1 size-4 shrink-0 text-ink-950"
                            />
                            <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      <CtaBand heading={cta?.heading} body={cta?.body} />
    </>
  );
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
