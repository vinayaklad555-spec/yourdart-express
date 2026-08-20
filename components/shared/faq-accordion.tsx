import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types/content";

/**
 * Built on native <details>/<summary>. That gives keyboard operation, screen
 * reader semantics and open/close state for zero kilobytes of JavaScript —
 * which is exactly the right trade for content that is server-rendered anyway.
 */
export function FaqAccordion({
  items,
  className,
  headingLevel: Heading = "h3",
}: {
  items: FaqItem[];
  className?: string;
  headingLevel?: "h3" | "h4";
}) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <details key={item.question} className="ydx-accordion group">
          <summary
            className={cn(
              "flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left",
              "transition-colors hover:text-ink-400",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-950",
              "[&::-webkit-details-marker]:hidden",
            )}
          >
            <Heading className="text-[1rem] font-medium tracking-[-0.015em] text-ink-950 sm:text-[1.0625rem]">
              {item.question}
            </Heading>
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-line text-ink-400 transition-[transform,border-color,color] duration-[var(--duration-slow)] [transition-timing-function:var(--ease-out-soft)] group-open:rotate-45 group-open:border-line-strong group-open:text-ink-950"
            >
              <Plus className="size-3.5" />
            </span>
          </summary>
          <p className="max-w-[54rem] pr-10 pb-6 text-[0.9375rem] leading-[1.72] text-ink-400">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
