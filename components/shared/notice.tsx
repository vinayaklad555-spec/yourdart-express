import * as React from "react";
import { Info, ShieldAlert, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  info: {
    wrapper: "border-line bg-canvas-sunk text-ink-700",
    icon: "text-ink-400",
    Icon: Info,
  },
  legal: {
    wrapper: "border-amber-500/25 bg-amber-50 text-amber-950",
    icon: "text-amber-600",
    Icon: ShieldAlert,
  },
  preview: {
    wrapper: "border-line bg-canvas-sunk text-ink-950",
    icon: "text-ink-950",
    Icon: Sparkles,
  },
} as const;

/**
 * Used wherever the site has to be explicit about a limitation: legal text
 * pending review, an interface preview that is not connected to a backend, a
 * capability that is not live yet. These notices are the mechanism that keeps
 * the site honest, so they are a first-class component rather than ad-hoc copy.
 */
export function Notice({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: keyof typeof tones;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { wrapper, icon, Icon } = tones[tone];

  return (
    <div
      role="note"
      className={cn(
        "flex gap-3.5 rounded-xl border px-4 py-3.5 sm:px-5 sm:py-4",
        wrapper,
        className,
      )}
    >
      <Icon aria-hidden="true" className={cn("mt-0.5 size-4.5 shrink-0", icon)} />
      <div className="min-w-0 text-[0.875rem] leading-relaxed">
        {title ? <p className="mb-1 font-medium">{title}</p> : null}
        <div className="[&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      </div>
    </div>
  );
}
