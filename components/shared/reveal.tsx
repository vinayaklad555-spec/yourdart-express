import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * SCROLL REVEAL — PROGRESSIVE ENHANCEMENT, NOT A DEPENDENCY.
 *
 * These were originally Framer Motion `whileInView` wrappers. The problem with
 * that approach is that the element starts at `opacity: 0` in the server-
 * rendered HTML and only becomes visible once JavaScript has hydrated and an
 * IntersectionObserver has fired. If either step is slow, blocked, or simply
 * does not happen, whole sections of the page are invisible — the content is in
 * the DOM, but nobody can read it.
 *
 * That is an unacceptable failure mode for a marketing site, so the reveal is
 * now driven by CSS scroll-driven animation instead:
 *
 *   - Content is visible by default. Always. No JavaScript involved.
 *   - Browsers that support `animation-timeline: view()` add the reveal.
 *   - Browsers that do not simply render the content, correctly.
 *   - `prefers-reduced-motion` removes it entirely.
 *
 * These are Server Components, so they ship no client JavaScript at all. Motion
 * is still used where it belongs — the header, where the interaction is genuine
 * and the element is not carrying content.
 *
 * The API is unchanged from the client version, so pages did not need editing.
 */

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Retained for API compatibility; a small nudge to the animation range. */
  delay?: number;
  as?: "div" | "li" | "section" | "span";
  /** Retained for API compatibility. */
  distance?: number;
}) {
  return (
    <Tag
      className={cn("ydx-reveal", className)}
      style={delay ? ({ "--reveal-offset": `${delay * 40}px` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * A plain wrapper. Each child animates against its own scroll position, which
 * produces a natural stagger as the group scrolls into view — no coordination,
 * no observer, no JavaScript.
 */
export function RevealGroup({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Retained for API compatibility. */
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  return <Tag className={cn(className)}>{children}</Tag>;
}

export function RevealItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  return <Tag className={cn("ydx-reveal", className)}>{children}</Tag>;
}
