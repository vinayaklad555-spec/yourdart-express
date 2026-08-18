"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * ROUTE ENTER ANIMATION.
 *
 * Keying on the pathname remounts the subtree on every navigation, which
 * replays the CSS animation in globals.css. That is the whole mechanism —
 * there is no observer, no timer and no animation library.
 *
 * WHY NOT the View Transitions API: React's <ViewTransition> is a canary-only
 * export and is not present in the React version this app builds against
 * (checked, not assumed). Driving `document.startViewTransition` by hand means
 * snapshotting around an async router push, which is fragile enough that a
 * mistimed snapshot shows a blank frame. A keyed CSS animation cannot fail
 * that way.
 *
 * SAFETY: the animation starts at opacity 0, so it MUST be pure CSS — the
 * moment it depends on JavaScript, a hydration failure leaves a blank page.
 * See the note in components/shared/reveal.tsx, which is the same trap. The
 * children here stay server components; this wrapper only supplies the key.
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="ydx-route">
      {children}
    </div>
  );
}
