"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { primaryNav } from "@/content/navigation";
import type { NavGroup } from "@/types/content";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const reduced = useReducedMotion();
  const navRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Solidify the bar once the page has moved, so the hero reads edge to edge.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any navigation closes everything. Adjusted during render rather than in an
  // effect, so the menu never paints open for a frame on the new route.
  const [lastPath, setLastPath] = React.useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  // Escape closes, and focus returns to the page rather than being trapped.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Clicking or tabbing outside the nav dismisses an open panel.
  React.useEffect(() => {
    if (!openMenu) return;
    const onOutside = (e: Event) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onOutside);
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onOutside);
    };
  }, [openMenu]);

  // Prevent the page scrolling behind the mobile drawer.
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const isActive = (href?: string) =>
    href ? pathname === href || pathname.startsWith(`${href}/`) : false;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-ink-950 focus:px-4 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>

      {/*
       * Backdrop scrim behind an open dropdown. Measured off the benchmark:
       * a vertical wash that is CLEAR at the top and darkest at the bottom,
       * so the panel stays crisp against the page while everything below it
       * recedes. Sits under the header (z-50) and under the panel, but over
       * the page. Desktop only — the mobile menu is full-screen already.
       */}
      <AnimatePresence>
        {openMenu ? (
          <motion.div
            key="nav-scrim"
            aria-hidden="true"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-x-0 bottom-0 top-16 z-40 hidden bg-[linear-gradient(to_bottom,rgb(0_0_0/0)_0%,rgb(33_33_33/0.7)_100%)] lg:block lg:top-[4.5rem]"
          />
        ) : null}
      </AnimatePresence>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          "border-b border-line",
          scrolled || openMenu || mobileOpen
            ? "bg-canvas/92 backdrop-blur-xl"
            : "bg-canvas",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
            <Logo />

            {/* ---------------------------------------------- desktop nav */}
            <nav
              ref={navRef}
              aria-label="Main"
              className="hidden items-center lg:flex"
              onMouseLeave={scheduleClose}
            >
              <ul className="flex items-center gap-0.5">
                {primaryNav.map((group) => (
                  <NavItem
                    key={group.label}
                    group={group}
                    open={openMenu === group.label}
                    active={isActive(group.href)}
                    onOpen={() => {
                      cancelClose();
                      setOpenMenu(group.label);
                    }}
                    onToggle={() =>
                      setOpenMenu((cur) => (cur === group.label ? null : group.label))
                    }
                    reduced={!!reduced}
                  />
                ))}
              </ul>
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <Button href="/login" variant="ghost" size="sm">
                Log in
              </Button>
              <Button href="/talk-to-an-expert" size="sm">
                Talk to our team
              </Button>
            </div>

            {/* ------------------------------------------- mobile trigger */}
            <button
              type="button"
              className="-mr-2 inline-flex size-10 items-center justify-center rounded-md text-ink-950 transition-colors hover:bg-ink-50 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </Container>

        {/* -------------------------------------------------- mobile menu */}
        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              id="mobile-menu"
              key="mobile"
              initial={reduced ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-line bg-canvas lg:hidden"
            >
              <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain px-5 pt-2 pb-8 sm:px-7">
                <MobileNav />
                <div className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
                  <Button href="/talk-to-an-expert" size="lg" className="w-full">
                    Talk to our team
                  </Button>
                  <Button href="/login" variant="outline" size="lg" className="w-full">
                    Log in
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}

/* ------------------------------------------------------------------ desktop */

function NavItem({
  group,
  open,
  active,
  onOpen,
  onToggle,
  reduced,
}: {
  group: NavGroup;
  open: boolean;
  active: boolean;
  onOpen: () => void;
  onToggle: () => void;
  reduced: boolean;
}) {
  const linkClasses = cn(
    "inline-flex h-8 items-center gap-1 rounded-md px-3 text-[0.875rem] font-normal transition-colors",
    "text-ink-950 hover:bg-ink-50",
    active || open ? "bg-ink-50" : "",
  );

  if (!group.columns) {
    return (
      <li>
        <Link href={group.href!} className={linkClasses} onMouseEnter={onOpen}>
          {group.label}
        </Link>
      </li>
    );
  }

  const panelId = `nav-panel-${group.label.toLowerCase()}`;

  return (
    <li className="relative" onMouseEnter={onOpen}>
      <button
        type="button"
        className={linkClasses}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        {group.label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-3.5 text-ink-400 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduced ? false : { opacity: 0, y: 6, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 4, scale: 0.99 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            /*
             * The panel is anchored to the nav ITEM (2rem tall), not to the
             * header (4.5rem), so `100%` lands mid-header. The offset closes
             * that gap so the panel starts exactly on the header's bottom
             * edge, written as a derivation rather than a magic number:
             *   (header 4.5rem - item 2rem) / 2  = 1.25rem  (space below item)
             *   + 1px                            = header's bottom border
             * If either height changes, update this with it.
             */
            className="absolute top-[calc(100%+1.25rem+1px)] left-1/2 z-50 w-max -translate-x-1/2 origin-top"
          >
            {/*
              * Panel treatment measured off the benchmark's live dropdown
              * rather than eyeballed. Theirs:
              *   radius 0 0 12px 12px · no border · a SIX-layer shadow
              * The layered shadow is the point — one big soft shadow reads as
              * a grey smudge, whereas stacking a tight contact shadow under
              * progressively wider, fainter ones reads as depth. Alphas here
              * are roughly half the benchmark's: with the scrim darkening the
              * page behind, the panel separates on its own and a heavy shadow
              * just looks dirty.
              */}
              <div className="rounded-b-xl bg-canvas p-2 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_9px_20px_0_rgb(0_0_0/0.04),0_37px_37px_0_rgb(0_0_0/0.03),0_20px_50px_0_rgb(0_0_0/0.04),0_35px_59px_0_rgb(0_0_0/0.015)]">
              <div className="flex gap-1">
                {group.columns!.map((column) => (
                  <div key={column.heading} className="w-[20.5rem]">
                    {column.heading ? (
                      <p className="px-3 pt-3 pb-1.5 text-[0.625rem] font-medium tracking-[0.08em] text-ink-400 uppercase">
                        {column.heading}
                      </p>
                    ) : null}
                    <ul>
                      {column.links.map((link) => {
                        const Icon = link.icon;
                        return (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="group flex items-center gap-3.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-ink-50"
                            >
                              {Icon ? (
                                /*
                                 * A soft-cornered tile rather than a bare glyph:
                                 * a filled plate with no border, sized so it
                                 * centres against both lines of the label.
                                 */
                                <span
                                  aria-hidden="true"
                                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-canvas-sunk text-ink-950 transition-colors duration-150 group-hover:bg-ink-200"
                                >
                                  <Icon className="size-[1.125rem]" strokeWidth={1.75} />
                                </span>
                              ) : null}
                              <span className="min-w-0">
                                <span className="block text-[0.875rem] leading-[1.43] text-ink-950">
                                  {link.label}
                                </span>
                                {link.description ? (
                                  <span className="mt-0.5 block text-[0.875rem] leading-[1.29] text-ink-400">
                                    {link.description}
                                  </span>
                                ) : null}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {group.href ? (
                <div className="mt-1 border-t border-line px-3 pt-3 pb-2">
                  <Link
                    href={group.href}
                    className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-950 hover:text-ink-400"
                  >
                    View all {group.label.toLowerCase()}
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

/* ------------------------------------------------------------------- mobile */

function MobileNav() {
  return (
    <nav aria-label="Mobile">
      <ul className="divide-y divide-line">
        {primaryNav.map((group) => (
          <li key={group.label} className="py-1">
            {group.columns ? (
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-[0.9375rem] font-medium text-ink-950 [&::-webkit-details-marker]:hidden">
                  {group.label}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 text-ink-400 transition-transform group-open:rotate-180"
                  />
                </summary>
                <ul className="mb-2 space-y-0.5 pb-1">
                  {group.columns.flatMap((c) => c.links).map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 rounded-lg py-2 pr-3 pl-1 text-[0.9375rem] text-ink-950 active:bg-ink-50"
                        >
                          {Icon ? (
                            <span
                              aria-hidden="true"
                              className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-canvas-sunk text-ink-950"
                            >
                              <Icon className="size-4" strokeWidth={1.75} />
                            </span>
                          ) : null}
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                  {group.href ? (
                    <li>
                      <Link
                        href={group.href}
                        className="inline-flex items-center gap-1.5 py-2.5 pl-1 text-[0.875rem] font-medium text-ink-950"
                      >
                        View all {group.label.toLowerCase()}
                        <ArrowRight aria-hidden="true" className="size-3.5" />
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </details>
            ) : (
              <Link
                href={group.href!}
                className="block py-3 text-[0.9375rem] font-medium text-ink-950"
              >
                {group.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
