import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Crumb } from "@/lib/seo";

export function Breadcrumbs({
  crumbs,
  tone = "light",
  className,
}: {
  crumbs: Crumb[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-7", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-[0.8125rem]">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1">
              {i > 0 ? (
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    "size-3.5 shrink-0",
                    tone === "dark" ? "text-white/45" : "text-ink-300",
                  )}
                />
              ) : null}
              {last ? (
                <span
                  aria-current="page"
                  className={tone === "dark" ? "text-white/64" : "text-ink-400"}
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className={cn(
                    "transition-colors",
                    tone === "dark"
                      ? "text-white/64 hover:text-white"
                      : "text-ink-400 hover:text-ink-950",
                  )}
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
