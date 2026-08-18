import * as React from "react";
import { getImageProps } from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { hero } from "@/content/home";
import { heroImages } from "@/content/media";

/**
 * Full-bleed hero: the supplied dusk scene as the backdrop, with the message
 * centred in the sky above the truck.
 *
 * ART DIRECTION — two crops, not one scaled image.
 *
 * The hero box is not one shape. Measured on this layout it runs from 0.54 on
 * a phone to 2.52 on an ultrawide display: a 4.7x spread that no single frame
 * covers. A 1.75 backdrop in a 0.54 box crops to its centre third, which left
 * the truck as a pair of wheels.
 *
 * So there are two masters, switched with <picture> per the framework's
 * documented `getImageProps` pattern:
 *
 *   below 640px  square 1:1 crop  — whole truck, sky above it for the copy
 *   640px and up wide  1.75 crop  — the landscape scene
 *
 * `<picture>` means the browser downloads exactly one of them. Rendering both
 * and hiding one with CSS would fetch both, which is the trap this avoids.
 *
 * MOBILE IS A BAND, NOT AN OVERLAY.
 *
 * The truck sits at a fixed 47-72% of the square crop's height. When the image
 * covers the whole section, it therefore lands at 47-72% of the section — and
 * on a phone the copy is simply taller than that, so it collides no matter how
 * the padding is tuned. Making the hero tall enough to clear it would need
 * ~1230px, half again the viewport.
 *
 * So below 640px the image becomes a band anchored to the bottom, with the copy
 * on the deep ink ground above it and a fade across the seam. The whole vehicle
 * is visible, nothing overlaps, and legibility stops depending on a scrim.
 *
 * CONTRAST — measured, not assumed. The backdrop behind every piece of hero
 * text was sampled with the glyphs made transparent, at four viewports. Worst
 * case is 8.0:1 against white; AA needs 4.5. The scrims below are what hold
 * the lower edge of the block, where the sky warms toward the horizon.
 */
export function Hero() {
  /*
   * Explicit width/height rather than `fill`. `fill` injects inline styles
   * (position/inset/height:100%) straight onto the <img>, and inline styles beat
   * class names — so the mobile band could never take effect. Intrinsic
   * dimensions also give the browser an aspect ratio to reserve, which keeps
   * cumulative layout shift at zero.
   */
  const common = { alt: "", sizes: "100vw", quality: 90 };

  const {
    props: { srcSet: wideSrcSet },
  } = getImageProps({
    ...common,
    src: heroImages.heroTruck.src,
    width: 3200,
    height: 1826,
  });

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    props: { srcSet: mobileSrcSet, style: _fillStyle, ...imgProps },
  } = getImageProps({
    ...common,
    src: heroImages.heroTruckMobile.src,
    width: 1600,
    height: 1600,
  });

  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-accent-950 sm:bg-accent-900">
      <picture>
        <source media="(min-width: 640px)" srcSet={wideSrcSet} />
        <source srcSet={mobileSrcSet} />
        <img
          {...imgProps}
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-x-0 bottom-0 -z-10 h-[86vw] w-full object-cover object-[50%_66%] sm:inset-0 sm:h-full sm:object-bottom"
        />
      </picture>

      {/*
        Mobile: a fade across the top edge of the band, so the image emerges out
        of the ink ground instead of starting at a hard line.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[86vw] bg-[linear-gradient(to_bottom,rgb(16_0_43)_0%,rgb(16_0_43/0.72)_16%,rgb(16_0_43/0.28)_34%,transparent_52%)] sm:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_bottom,rgb(16_0_43/0.30)_0%,rgb(16_0_43/0.16)_46%,rgb(16_0_43/0.04)_68%,transparent_82%)] sm:block"
      />

      <Container className="relative flex min-h-[34rem] flex-col justify-start pt-24 pb-[96vw] sm:min-h-[40rem] sm:pt-28 sm:pb-[42vw] lg:min-h-[48rem] lg:pt-32 lg:pb-[30rem]">
        <div className="mx-auto max-w-[48rem] text-center">
          <Reveal>
            <p className="text-[0.6875rem] leading-[1.4] tracking-[0.09em] text-white/70 uppercase">
              {hero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            {/* The single H1 on the homepage */}
            <h1 className="mt-6 text-[clamp(2rem,1.3rem+3.1vw,3.5rem)] leading-[1.06] font-normal tracking-[-0.014em] text-white">
              {hero.heading}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-[36rem] text-[clamp(1rem,0.95rem+0.26vw,1.125rem)] leading-[1.55] text-white/75">
              {hero.body}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={hero.primaryCta.href} size="lg" variant="inverse">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} size="lg" variant="glass">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/**
 * The practice statements sit in their own band beneath the image, not over
 * it. Inside the hero they landed on the truck's white body, where white text
 * is unreadable — a scrim heavy enough to fix that would have flattened the
 * photograph. On the canvas they are legible unconditionally.
 */
export function HeroMarkers() {
  return (
    <div className="border-b border-line bg-canvas-warm">
      <Container className="py-5">
        <ul className="flex flex-col items-center gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-9 sm:gap-y-3">
          {hero.markers.map((marker) => (
            <li
              key={marker}
              className="flex items-center gap-2 text-[0.875rem] text-ink-400"
            >
              <Check aria-hidden="true" className="size-4 shrink-0 text-accent" />
              {marker}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
