import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { HeroImage } from "@/content/media";

/**
 * The image that sits beside interior page headings.
 *
 * The photograph is shown as it is. Two treatments used to sit on top and
 * were both removed at the owner's request: a hairline inset ring, and a
 * purple wash entering from the top-left.
 *
 * Worth knowing what the wash was doing, if the heroes ever start to look
 * mismatched: it tinted every photograph toward the same purple, which pulled
 * images shot by different people, in different light and graded differently
 * into one family. Without it, each hero carries its own colour — fine while
 * the images are chosen to suit, but nothing is unifying them any more.
 *
 * LOADING STRATEGY — eager and high priority, measured rather than assumed.
 *
 * Next.js 16 deprecated `priority` in favour of `preload`; its docs then say to
 * prefer `loading="eager"` / `fetchPriority="high"` over `preload` when an
 * image's LCP status depends on viewport. That describes this image, so the
 * question was which side of the trade it falls on.
 *
 * Measured on a 412x823 mobile viewport: the image's top edge lands at y=600,
 * i.e. IN the initial viewport, and the LCP observer names it as the LCP
 * element. Leaving it lazy was the worst case — the browser discovered it late
 * and mobile LCP sat at 3.1s. Loading it eagerly is correct here.
 */
export function HeroMedia({
  image,
  className,
}: {
  image: HeroImage;
  className?: string;
}) {
  return (
    <div
      className={cn(
        /*
         * `lg:aspect-auto` hands height back to the grid row, so the card
         * matches the copy column's full height rather than a fixed ratio.
         * It relies on PageHero's `lg:min-h-*` to establish that height.
         */
        "relative aspect-[4/3] overflow-hidden rounded-[1.25rem] sm:aspect-[16/10] lg:aspect-auto",
        className,
      )}
    >
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
  );
}
