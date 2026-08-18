import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/typography";
import { TrackingForm } from "@/components/tracking/tracking-form";

/**
 * Tracking, surfaced on the homepage directly beneath the hero.
 *
 * Someone arriving to check where a parcel is has the highest intent of any
 * visitor and the least patience for navigation — putting the field in front
 * of them saves a click and a page load.
 *
 * Plain canvas deliberately: no image, no bloom, no tint. The hero above it is
 * already carrying a full-bleed photograph, and stacking a second treatment
 * underneath would compete with it. The form's own elevation is enough to hold
 * the eye.
 */
export function HomeTracking() {
  return (
    <Section
      id="track"
      tone="canvas"
      spacing="lg"
      /*
       * Extra headroom on top of the `lg` rhythm. The hero and marker strip
       * above are dense, and the tracking band needs to read as its own moment
       * rather than as a continuation of them.
       */
      className="pt-24 sm:pt-28 lg:pt-36"
      aria-labelledby="home-track-heading"
    >
      <div className="mx-auto max-w-[46rem] text-center">
        <p className="text-[0.6875rem] leading-[1.4] tracking-[0.09em] text-ink-400 uppercase">
          Shipment tracking
        </p>
        {/* h2 scale, matching every other section heading on this page. */}
        <Heading as="h2" size="h2" id="home-track-heading" className="mt-5">
          Track your shipment
        </Heading>
        <p className="mx-auto mt-4 max-w-[38rem] text-[1rem] leading-relaxed text-ink-400">
          Enter your tracking number, order ID or the mobile number the shipment
          was booked with.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-[52rem]">
        <TrackingForm size="large" />

        <p className="mt-5 text-center text-[0.875rem] text-ink-400">
          Can’t find it?{" "}
          <Link
            href="/track"
            className="inline-flex items-center gap-1 font-medium text-ink-950 underline underline-offset-2"
          >
            More ways to track
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </p>
      </div>
    </Section>
  );
}
