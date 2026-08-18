import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { HeroImage } from "@/content/media";

/**
 * The image that sits beside interior page headings.
 *
 * Two layers sit over the photograph:
 *
 *  1. A purple wash entering from the top-left corner at low opacity. It is
 *     what pulls a set of stock photographs — shot by different people, in
 *     different light, graded differently — into one family. Without it they
 *     read as a pile of unrelated pictures.
 *
 *  2. A hairline inset ring, so the image reads as a deliberate plate rather
 *     than a bleed.
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
        "relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-[16/11]",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 1024px) 44vw, 100vw"
        className="object-cover"
      />

      {/* Purple wash from the top-left corner — the unifying layer. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(135deg,rgb(123_44_191/0.42)_0%,rgb(90_24_154/0.18)_42%,transparent_74%)]"
      />

      {/* Hairline plate edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-xl ring-1 ring-ink-950/8 ring-inset"
      />
    </div>
  );
}
