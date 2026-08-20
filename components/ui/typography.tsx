import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The type system as components. Sizes live here and nowhere else, so the whole
 * site rescales from one file.
 *
 * Headings sit at weight 500 — Nunito Sans draws lighter than the previous
 * Geist, and 400 read too thin at heading sizes. Line height runs close to
 * 1.0 on display sizes, and tracking is near zero rather than tightly
 * negative. Hierarchy is otherwise carried by size, colour and whitespace.
 */

export function Eyebrow({
  className,
  tone = "brand",
  children,
}: {
  className?: string;
  tone?: "brand" | "muted" | "inverse";
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-[0.6875rem] leading-[1.4] tracking-[0.09em] uppercase",
        tone === "inverse" ? "text-white/55" : "text-ink-400",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Display({
  className,
  as: Tag = "h1",
  children,
}: {
  className?: string;
  as?: "h1" | "h2";
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "text-[clamp(2.125rem,1.35rem+3.9vw,4rem)] leading-[1.02] font-medium tracking-[-0.012em] text-ink-950",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Heading({
  className,
  as: Tag = "h2",
  size = "h2",
  children,
  id,
}: {
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
  id?: string;
}) {
  const sizes = {
    h1: "text-[clamp(2rem,1.45rem+2.7vw,3rem)] leading-[1.04] tracking-[-0.011em]",
    h2: "text-[clamp(1.75rem,1.3rem+2.2vw,2.5rem)] leading-[1.06] tracking-[-0.008em]",
    h3: "text-[clamp(1.375rem,1.2rem+0.85vw,1.75rem)] leading-[1.16] tracking-[-0.004em]",
    h4: "text-[1.125rem] leading-[1.3] tracking-[0] sm:text-[1.25rem]",
  };

  return (
    <Tag id={id} className={cn("font-medium text-ink-950", sizes[size], className)}>
      {children}
    </Tag>
  );
}

export function Lead({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-[clamp(1rem,0.94rem+0.32vw,1.25rem)] leading-[1.5] tracking-[0] text-ink-400",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Prose({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "space-y-4 text-[0.9375rem] leading-[1.65] text-ink-400 sm:text-base",
        className,
      )}
    >
      {children}
    </div>
  );
}
