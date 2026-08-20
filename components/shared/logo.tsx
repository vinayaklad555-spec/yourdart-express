"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Inline SVG rather than an <img>: it inherits colour from its container,
 * needs no network request, and stays crisp at every size.
 *
 * The mark is a pierced target — two concentric rings and a bullseye, with a
 * tapered dart driven into the centre from the upper right. Both rings carry a
 * gap on the dart's entry line, which is what makes it read as passing THROUGH
 * the target rather than resting on top of it. Every path uses `currentColor`,
 * so one class on the root recolours the whole mark (see the inverse variant).
 *
 * Geometry is generated, not eyeballed: arcs are struck from centre (20,20)
 * with the gap centred on the dart's 45-degree entry.
 */
export function LogoMark({
  className,
  /**
   * Paints the mark with the same top-lit gradient the filled buttons use.
   * Turn it off to fall back to `currentColor` — that is how the inverse
   * (all-white) lockup works.
   */
  gradient = true,
  /**
   * SVG ids are document-global, so two marks on one page (header + footer)
   * would collide. Callers rendering a second mark pass their own id.
   */
  id = "ydx-mark",
}: {
  className?: string;
  gradient?: boolean;
  id?: string;
}) {
  const gid = `${id}-fill`;
  const paint = gradient ? `url(#${gid})` : "currentColor";

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("size-8 shrink-0 text-accent", className)}
    >
      {gradient ? (
        <defs>
          {/*
            * Mirrors the button sheen in components/ui/button.tsx: accent
            * purple, lifted toward the top centre. Same geometry (50% 0%,
            * fading out by ~72%) so the mark and the buttons look lit by the
            * same light.
            */}
          <radialGradient id={gid} cx="50%" cy="0%" r="98%">
            <stop offset="0%" stopColor="#8f4bcb" />
            <stop offset="72%" stopColor="#7b2cbf" />
            <stop offset="100%" stopColor="#7327b5" />
          </radialGradient>
        </defs>
      ) : null}
      {/* Outer ring, open where the dart enters */}
      <path
        d="M24.76 5.35A15.4 15.4 0 1 0 34.65 15.24"
        stroke={paint}
        strokeWidth="5.2"
        strokeLinecap="round"
      />
      {/* Middle ring */}
      <path
        d="M21.91 11.00A9.2 9.2 0 1 0 29.00 18.09"
        stroke={paint}
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      {/* Bullseye */}
      <circle cx="20" cy="20" r="3.3" fill={paint} />
      {/* Dart: sharp at the centre, rounded head clear of the rings */}
      <path d="M20.60 19.40L31.87 4.67A2.45 2.45 0 0 1 35.33 8.13Z" fill={paint} />
    </svg>
  );
}

export function Logo({
  className,
  variant = "default",
  href = "/",
  markId,
}: {
  className?: string;
  /** Passed through to LogoMark so two lockups on a page keep distinct ids. */
  markId?: string;
  variant?: "default" | "inverse";
  href?: string | null;
}) {
  const content = (
    <>
      <LogoMark
        id={markId}
        gradient={variant !== "inverse"}
        className={variant === "inverse" ? "text-white" : undefined}
      />
      <span
        className={cn(
          /*
           * 700, not the 600 this carried under Geist. Nunito Sans is a
           * rounder face and draws lighter at the same weight, which left the
           * wordmark too faint beside the mark. The weight is set here rather
           * than inherited so it stays put if the body font changes again.
           */
          "font-bold tracking-[-0.03em] whitespace-nowrap",
          "text-[1.0625rem] sm:text-[1.125rem]",
          variant === "inverse" ? "text-white" : "text-ink-950",
        )}
      >
        YourDartExpress
      </span>
    </>
  );

  const classes = cn(
    "inline-flex items-center gap-1.5 rounded-md transition-opacity hover:opacity-80",
    className,
  );

  if (href === null) {
    return (
      <span className={classes} aria-label={site.name}>
        {content}
      </span>
    );
  }

  return (
    <HomeLink href={href} className={classes}>
      {content}
    </HomeLink>
  );
}

/**
 * The lockup always returns you to the top of the landing page.
 *
 * Off the landing page a normal navigation already lands at the top, so the
 * Link does the work and the route-enter animation in globals.css covers the
 * change. ON the landing page a Link to "/" is a no-op — the browser is
 * already there — which makes the logo feel broken to anyone scrolled halfway
 * down. So that case is intercepted and scrolled smoothly instead.
 *
 * `prefers-reduced-motion` is honoured explicitly: `window.scrollTo` ignores
 * the CSS `scroll-behavior: auto` that the media query sets, so the behaviour
 * has to be chosen here or the animation plays for people who asked for none.
 */
function HomeLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle new-tab / download / modified clicks.
    if (
      href !== "/" ||
      pathname !== "/" ||
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <Link
      href={href}
      className={className}
      aria-label={`${site.name} — home`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
