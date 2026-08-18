import * as React from "react";
import { Container } from "@/components/layout/container";
import { Eyebrow, Display, Lead } from "@/components/ui/typography";
import { HeroMedia } from "./hero-media";
import { cn } from "@/lib/utils";
import type { HeroImage } from "@/content/media";

/**
 * The single hero used by every interior page. One component means every page
 * shares identical breadcrumb placement, heading scale and vertical rhythm.
 *
 * Passing `image` splits the hero into two columns and fills the right-hand
 * space that a heading alone leaves empty. Omitting it keeps the original
 * full-width arrangement, which is still what `align="center"` uses.
 */
export function PageHero({
  eyebrow,
  heading,
  body,
  children,
  className,
  align = "left",
  size = "md",
  image,
}: {
  eyebrow?: string;
  heading: React.ReactNode;
  body?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  size?: "sm" | "md";
  image?: HeroImage;
}) {
  const split = Boolean(image) && align === "left";

  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-line bg-canvas",
        className,
      )}
    >
      {/* Dot field, dissolved by a radial mask so it never ends abruptly. */}
      <div
        aria-hidden="true"
        className="bg-dots mask-fade pointer-events-none absolute inset-0 opacity-70"
      />
      {/* Ambient bloom — large, soft, behind everything. */}
      <div
        aria-hidden="true"
        className="bg-bloom pointer-events-none absolute inset-0"
      />

      <Container
        className={cn(
          "relative",
          size === "sm" ? "pt-26 pb-11 lg:pt-30 lg:pb-13" : "pt-26 pb-14 lg:pt-32 lg:pb-17",
        )}
      >
        <div
          className={cn(
            split && "grid items-center gap-10 lg:grid-cols-12 lg:gap-12",
          )}
        >
          <div
            className={cn(
              "flex flex-col gap-5",
              align === "center"
                ? "mx-auto max-w-[48rem] items-center text-center"
                : split
                  ? "lg:col-span-7"
                  : "max-w-[52rem]",
            )}
          >
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <Display>{heading}</Display>
            {body ? <Lead className="max-w-[42rem]">{body}</Lead> : null}
            {children}
          </div>

          {split && image ? (
            <div className="lg:col-span-5">
              <HeroMedia image={image} />
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
