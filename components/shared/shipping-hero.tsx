import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Eyebrow, Lead } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { HeroImage } from "@/content/media";

/*
 * The CTAs are the system Button (the black-gradient primary began here and
 * was later promoted site-wide) — only the Figma-matched size differs from
 * the stock `lg`: 46px tall, 8px radius, 15px label.
 */
const ctaSize = "h-[2.875rem] rounded-lg px-5.5 text-[0.9375rem] font-medium";

/**
 * Figma-matched hero used ONLY by /services/shipping — every other service
 * page keeps the shared PageHero.
 *
 * The copy sits directly on the grey band; only the photograph is carded.
 * That puts the heading's left edge on the site's content column, in line
 * with the header logo and every section below it.
 *
 * The font and button treatment that debuted here have since been promoted
 * site-wide — see app/layout.tsx and ui/button.tsx.
 */
export function ShippingHero({
  eyebrow,
  heading,
  body,
  image,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  image: HeroImage;
}) {
  return (
    <div className="bg-[#f4f4f5]">
      {/* Top padding clears the fixed header (4rem, 4.5rem at lg). */}
      <Container className="pt-[6.5rem] pb-14 lg:pt-[7.25rem] lg:pb-16">
        <div className="grid gap-10 lg:min-h-[31rem] lg:grid-cols-2 lg:gap-14">
          {/* ---------------------------------------------------------- copy */}
          <div className="flex flex-col justify-center lg:pr-4">
            <Eyebrow>{eyebrow}</Eyebrow>

            {/* The lg step sits below the others on purpose: 1024–1279px is
                where the two-column split leaves the text column narrowest.
                42px is the measured ceiling that still holds the heading to
                two lines at 1024px; 43px spills to three. */}
            <h1 className="mt-6 max-w-[24ch] text-[2.5rem] leading-[1.14] font-semibold tracking-[-0.015em] text-ink-950 sm:text-[3rem] lg:text-[2.625rem] xl:text-[3rem]">
              {heading}
            </h1>

            {/* The shared Lead — this hero's body copy is the treatment the
                rest of the site's section intros were matched to. */}
            <Lead className="mt-6 max-w-[38rem]">{body}</Lead>

            <div className="mt-11 flex flex-col gap-4 sm:flex-row">
              <Button href="/talk-to-an-expert" className={ctaSize}>
                Talk to our team
              </Button>
              <Button
                href="/services"
                variant="outline"
                className={cn(
                  ctaSize,
                  "border-[#e4e4e7] bg-white text-[#18181b] hover:bg-[#fafafa]",
                )}
              >
                All Services
              </Button>
            </div>
          </div>

          {/* ---------------------------------------------------- image card */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] sm:aspect-[16/10] lg:aspect-auto">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 37.5rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
