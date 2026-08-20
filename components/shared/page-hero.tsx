import * as React from "react";
import { Container } from "@/components/layout/container";
import { Eyebrow, Lead } from "@/components/ui/typography";
import { HeroMedia } from "./hero-media";
import { cn } from "@/lib/utils";
import type { HeroImage } from "@/content/media";

/**
 * Size classes for a hero CTA, exported so the pages that put buttons in a
 * hero all get the same control: 46px tall, 8px radius, 15px label. Pair it
 * with the Button primitive rather than hand-rolling a link.
 */
export const heroCtaSize =
  "h-[2.875rem] rounded-lg px-5.5 text-[0.9375rem] font-medium";

/**
 * The single hero used by every interior page. One component means every page
 * shares identical heading scale, vertical rhythm and treatment.
 *
 * The shape started as a one-off on /services/shipping and was adopted for the
 * whole site: copy sitting directly on a grey band, beside a carded
 * photograph, with the copy's left edge on the site's content column so it
 * lines up with the header logo and every section below.
 *
 * Passing `image` splits the hero into two columns. Omitting it keeps the copy
 * full width — the band and the type are identical either way, so an
 * image-less hero still reads as part of the same family.
 */
export function PageHero({
  eyebrow,
  heading,
  body,
  children,
  className,
  size = "md",
  image,
}: {
  eyebrow?: string;
  heading: React.ReactNode;
  body?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
  image?: HeroImage;
}) {
  const split = Boolean(image);

  return (
    <div className={cn("bg-canvas-hero", className)}>
      {/* Top padding clears the fixed header (4rem, 4.5rem at lg). */}
      <Container
        className={cn(
          "pt-[6.5rem] lg:pt-[7.25rem]",
          size === "sm" ? "pb-12 lg:pb-14" : "pb-14 lg:pb-16",
        )}
      >
        <div
          className={cn(
            "grid gap-10",
            split && "lg:min-h-[31rem] lg:grid-cols-2 lg:gap-14",
          )}
        >
          <div
            className={cn(
              "flex flex-col justify-center",
              split ? "lg:pr-4" : "max-w-[52rem]",
            )}
          >
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}

            {/*
             * Heroes are semibold; section headings are medium. That is the
             * only weight step in the type system, and it is what separates
             * "this page is about X" from "this part of the page is about X".
             *
             * The lg step drops below the others ONLY when split: 1024–1279px
             * is where two columns leave the copy narrowest, and 42px is the
             * measured ceiling that still holds a two-line heading there.
             */}
            <h1
              className={cn(
                "mt-6 max-w-[24ch] text-[2.5rem] leading-[1.14] font-semibold tracking-[-0.015em] text-ink-950 sm:text-[3rem]",
                split && "lg:text-[2.625rem] xl:text-[3rem]",
              )}
            >
              {heading}
            </h1>

            {body ? <Lead className="mt-6 max-w-[38rem]">{body}</Lead> : null}

            {children ? <div className="mt-11">{children}</div> : null}
          </div>

          {split && image ? <HeroMedia image={image} /> : null}
        </div>
      </Container>
    </div>
  );
}
