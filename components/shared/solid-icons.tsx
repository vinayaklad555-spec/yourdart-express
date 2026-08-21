import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Three solid glyphs, drawn here rather than imported.
 *
 * lucide is an OUTLINE set — every icon is a stroked path over `fill="none"`,
 * and there is no solid variant in it (checked: one "Solid" export in 6,000+,
 * and it is unrelated). Forcing `fill` onto a lucide icon collapses it: the
 * outer silhouette goes solid and the inner detail, which is drawn as separate
 * open paths, disappears. A filled badge-check loses its check.
 *
 * So the fill lives in the geometry. Each glyph is ONE path using
 * `fillRule="evenodd"`, which is how solid icon sets knock the detail back
 * out — the inner shape becomes a true hole and whatever sits behind the icon
 * shows through it, so these work on any plate colour.
 *
 * They take `currentColor`, size from a class, and are aria-hidden, so they
 * drop into the same slots the lucide icons occupied.
 */

type GlyphProps = { className?: string };

function Glyph({
  className,
  children,
}: GlyphProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5 shrink-0", className)}
    >
      {children}
    </svg>
  );
}

/** Speech bubble with the exclamation knocked out — saying the hard thing. */
export function SolidSpeechAlert({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 3h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-7l-5 4v-4H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm6 3.4h2v5.2h-2V6.4zm1 6.4a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3z"
      />
    </Glyph>
  );
}

/** Disc with a check knocked out — the claim that is actually verified. */
export function SolidVerified({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.3 14.4-4.1-4.1 1.7-1.7 2.4 2.4 5.1-5.1 1.7 1.7-6.8 6.8z"
      />
    </Glyph>
  );
}

/** Rising bars — solid throughout, so it needs no knockout. */
export function SolidGrowth({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path d="M4.6 13.5h2.2a.9.9 0 0 1 .9.9v4.7a.9.9 0 0 1-.9.9H4.6a.9.9 0 0 1-.9-.9v-4.7a.9.9 0 0 1 .9-.9z" />
      <path d="M10.9 9.2h2.2a.9.9 0 0 1 .9.9v9a.9.9 0 0 1-.9.9h-2.2a.9.9 0 0 1-.9-.9v-9a.9.9 0 0 1 .9-.9z" />
      <path d="M17.2 4.1h2.2a.9.9 0 0 1 .9.9v14.1a.9.9 0 0 1-.9.9h-2.2a.9.9 0 0 1-.9-.9V5a.9.9 0 0 1 .9-.9z" />
    </Glyph>
  );
}
