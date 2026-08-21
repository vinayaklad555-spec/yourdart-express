import * as React from "react";
import Image from "next/image";
import { Eyebrow, Heading, Lead } from "@/components/ui/typography";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";
import type { HeroImage } from "@/content/media";

/**
 * An editorial half-and-half: copy on one side, a photograph on the other,
 * with optional detail blocks under the copy.
 *
 * Two sections on the shipping page have the same job — explain one half of
 * the offering against a picture of it — and repeating the markup twice would
 * mean two places to keep in step. `reverse` flips the image to the other
 * side so consecutive splits alternate rather than marching down one edge.
 *
 * The image keeps an explicit aspect ratio at every breakpoint so the row
 * reserves its height before the file loads and nothing shifts.
 */
export function FeatureSplit({
  eyebrow,
  heading,
  headingId,
  body,
  points,
  image,
  secondImage,
  reverse = false,
  children,
}: {
  eyebrow: string;
  heading: string;
  headingId: string;
  body: string;
  points?: { title: string; body: string }[];
  image: HeroImage;
  /** Renders a stacked pair — used where one picture cannot carry the point. */
  secondImage?: HeroImage;
  reverse?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={cn(reverse && "lg:order-2")}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading as="h2" size="h2" id={headingId} className="mt-4">
          {heading}
        </Heading>
        <Lead className="mt-5 max-w-[36rem]">{body}</Lead>

        {points ? (
          <ul className="mt-9 grid gap-px overflow-hidden rounded-xl border border-line bg-line">
            {points.map((point) => (
              <li key={point.title} className="bg-canvas p-5">
                <h3 className="text-[0.9375rem] font-medium tracking-[-0.015em] text-ink-950">
                  {point.title}
                </h3>
                <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-400">
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        {children}
      </Reveal>

      <Reveal className={cn("relative", reverse && "lg:order-1")}>
        <div className={cn("grid gap-4", secondImage && "sm:grid-cols-2 lg:grid-cols-1")}>
          {[image, secondImage].filter(Boolean).map((img) => (
            <div
              key={img!.src}
              className={cn(
                "relative overflow-hidden rounded-2xl",
                secondImage
                  ? "aspect-[16/10] lg:aspect-[16/7]"
                  : "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/4]",
              )}
            >
              <Image
                src={img!.src}
                alt={img!.alt}
                fill
                sizes="(min-width: 1024px) 44rem, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
