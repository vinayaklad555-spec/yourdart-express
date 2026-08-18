import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Eyebrow, Heading, Lead } from "@/components/ui/typography";

const tones = {
  canvas: "bg-canvas text-ink-950",
  warm: "bg-canvas-warm text-ink-950",
  sunk: "bg-canvas-sunk text-ink-950",
  /* The deepest step of the accent ramp, not neutral black: it ties the
     dark bands to the accent instead of leaving purple as a highlight. */
  dark: "bg-accent-950 text-white",
  brand: "bg-accent-900 text-white",
} as const;

const spacings = {
  none: "",
  sm: "py-11 sm:py-14",
  md: "py-14 sm:py-17 lg:py-20",
  lg: "py-16 sm:py-21 lg:py-26",
} as const;

export interface SectionProps {
  id?: string;
  className?: string;
  innerClassName?: string;
  tone?: keyof typeof tones;
  spacing?: keyof typeof spacings;
  width?: React.ComponentProps<typeof Container>["width"];
  /** Adds a hairline rule along the top edge to separate adjacent sections. */
  divider?: boolean;
  "aria-labelledby"?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  className,
  innerClassName,
  tone = "canvas",
  spacing = "lg",
  width = "default",
  divider = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        tones[tone],
        spacings[spacing],
        divider && (tone === "dark" || tone === "brand" ? "border-t border-white/10" : "border-t border-line"),
        className,
      )}
      {...props}
    >
      {/* Ambient bloom on dark bands. Purely decorative, sits under content. */}
      {tone === "dark" || tone === "brand" ? (
        <span
          aria-hidden="true"
          className="bg-bloom-dark pointer-events-none absolute inset-0"
        />
      ) : null}

      <Container width={width} className={cn("relative", innerClassName)}>
        {children}
      </Container>
    </section>
  );
}

/**
 * Eyebrow + heading + lead, arranged consistently. Used by nearly every
 * section so vertical rhythm above content is identical site-wide.
 */
export function SectionHeader({
  eyebrow,
  heading,
  lead,
  align = "left",
  tone = "light",
  headingAs = "h2",
  headingId,
  className,
  children,
}: {
  eyebrow?: string;
  heading: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  headingAs?: "h1" | "h2" | "h3";
  headingId?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "center" ? "max-w-[46rem] mx-auto" : "max-w-[42rem]",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone === "dark" ? "inverse" : "brand"}>{eyebrow}</Eyebrow>
      ) : null}
      <Heading
        as={headingAs}
        size={headingAs === "h1" ? "h1" : "h2"}
        id={headingId}
        className={tone === "dark" ? "text-white" : undefined}
      >
        {heading}
      </Heading>
      {lead ? (
        <Lead className={tone === "dark" ? "text-white/64" : undefined}>{lead}</Lead>
      ) : null}
      {children}
    </div>
  );
}
