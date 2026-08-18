import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Heading, Lead } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";

/**
 * Closing call to action. Appears once at the foot of every page — never twice
 * on the same page, so it keeps its weight.
 */
export function CtaBand({
  heading = "Let's get your next shipment moving",
  body = "Tell us what you need to move, store or fulfil. We will confirm what we can support and quote it against your actual volumes.",
  primary = { label: "Talk to our team", href: "/talk-to-an-expert" },
  secondary = { label: "Contact us", href: "/contact" },
}: {
  heading?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <Section tone="dark" spacing="lg" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grid-dark pointer-events-none absolute inset-0 opacity-70"
      />

      <Reveal className="relative mx-auto flex max-w-[44rem] flex-col items-center text-center">
        <Heading as="h2" size="h1" className="text-white">
          {heading}
        </Heading>
        <Lead className="mt-5 text-white/64">{body}</Lead>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href={primary.href} size="lg" variant="inverse">
            {primary.label}
            <ArrowRight aria-hidden="true" />
          </Button>
          {secondary ? (
            <Button href={secondary.href} size="lg" variant="inverse-outline">
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
