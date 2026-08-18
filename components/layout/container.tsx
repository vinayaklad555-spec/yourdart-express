import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * `default` is THE site width. Header, hero, every section and the footer all
 * use it, which is what makes the left edge of the logo line up with the left
 * edge of the copy all the way down the page.
 *
 * Do not reach for `wide` to give one band more room — it desynchronises that
 * band from everything above and below it, and the mismatch is very visible on
 * a large screen. `narrow` and `prose` are different: they are deliberately
 * centred reading measures for long-form text, not layout gutters.
 */
const widths = {
  /** Long-form reading measure — legal, about narrative. */
  prose: "max-w-[46rem]",
  /** Centred single-column pages: the account previews. */
  narrow: "max-w-[62rem]",
  /** The site width. Default for a reason. */
  default: "max-w-[76rem]",
  /** Reserved for genuinely full-bleed treatments. Not for normal sections. */
  wide: "max-w-[86rem]",
  full: "max-w-none",
} as const;

export function Container({
  className,
  width = "default",
  as: Tag = "div",
  children,
}: {
  className?: string;
  width?: keyof typeof widths;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
  children: React.ReactNode;
}) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-7 lg:px-10", widths[width], className)}>
      {children}
    </Tag>
  );
}
