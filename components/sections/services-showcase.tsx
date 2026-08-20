import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem, Reveal } from "@/components/shared/reveal";
import { publishedServices } from "@/content/services";

/**
 * Services as a single inset panel: the statement on the left, the six
 * services as a hairline-ruled index on the right.
 *
 * The panel does the work a card grid could not. Its ground is the deepest
 * step of the accent ramp lit by three offset radial blooms, which gives the
 * soft atmospheric depth the reference has without needing a photograph. The
 * list itself is deliberately spare — a rule, a name, an arrow, two lines of
 * description — so the eye runs down it quickly.
 *
 * No icons and no thumbnails here on purpose: against a dark ground they
 * fragment the column. Restraint is what makes the panel read as considered.
 */
export function ServicesShowcase() {
  return (
    <Section id="services" tone="canvas" spacing="lg" aria-labelledby="services-heading">
      <Reveal>
        <div className="relative overflow-hidden rounded-xl bg-accent-950">
          {/* Atmospheric ground: three offset blooms rather than a flat fill. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(62%_78%_at_12%_18%,rgb(123_44_191/0.55),transparent_62%),radial-gradient(52%_68%_at_88%_72%,rgb(157_78_221/0.38),transparent_66%),radial-gradient(74%_58%_at_46%_112%,rgb(224_170_255/0.18),transparent_70%)]"
          />

          <div className="relative grid gap-12 p-7 sm:p-11 lg:grid-cols-2 lg:gap-16 lg:p-16">
            {/* ------------------------------------------------- statement */}
            <div className="flex flex-col lg:max-w-[30rem]">
              <p className="text-[0.6875rem] leading-[1.4] tracking-[0.09em] text-white/60 uppercase">
                Services
              </p>

              <h2
                id="services-heading"
                className="mt-6 text-[clamp(1.75rem,1.3rem+1.9vw,2.5rem)] leading-[1.16] font-medium tracking-[-0.012em] text-white"
              >
                Six services that cover the journey from your supplier to your
                customer — and back again when it needs to come back.
              </h2>

              <div className="mt-9">
                <Button href="/services" variant="inverse-outline" size="md">
                  All services
                </Button>
              </div>
            </div>

            {/* ------------------------------------------------------ index */}
            <RevealGroup
              as="ul"
              className="divide-y divide-white/15 border-y border-white/15 lg:mt-1"
            >
              {publishedServices.map((service) => (
                <RevealItem as="li" key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block py-5 transition-opacity duration-200"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <h3 className="text-[1.125rem] font-medium tracking-[-0.014em] text-white lg:text-[1.25rem]">
                        {service.name}
                      </h3>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-white/45 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                      />
                    </div>
                    <p className="mt-2 max-w-[34rem] text-[0.875rem] leading-relaxed text-white/60 transition-colors duration-200 group-hover:text-white/80">
                      {service.summary}
                    </p>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
