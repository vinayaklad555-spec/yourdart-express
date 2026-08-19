import * as React from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import type { BenefitVisualSpec } from "@/types/content";

/**
 * The diagram that heads a benefit card.
 *
 * These EXPLAIN the card, they do not decorate it: every label comes from the
 * benefit's own copy in content/services.ts, so "Serviceability confirmed
 * upfront" draws the three things actually checked, and the air-freight card
 * shows ocean and rail struck through because that is what the copy says.
 * Adding a service means writing labels, not commissioning artwork.
 *
 * Still no invented figures. The layout reference fills this space with
 * metrics ("2,383 visitors, +40%", "2M+ API requests"); we have no such
 * numbers to show and the brief rules out inventing them, so the diagrams
 * carry named things rather than quantities. The one exception is the
 * `levels` pattern, whose bars are deliberately UNLABELLED on the y-axis —
 * it shows a shape (quiet/normal/peak), not a volume.
 */

const CHIP =
  "inline-flex items-center gap-2 rounded-[0.625rem] bg-canvas px-3.5 py-2.5 text-[0.8125rem] leading-none font-medium text-ink-800 shadow-[0_1px_2px_rgb(16_24_40/0.06),0_8px_18px_-8px_rgb(76_29_149/0.22)]";

function Dot({ ok = true }: { ok?: boolean }) {
  return (
    <span
      className={`inline-flex size-4.5 shrink-0 items-center justify-center rounded-full ${
        ok ? "bg-accent/12 text-accent" : "bg-ink-200 text-ink-400"
      }`}
    >
      {ok ? <Check className="size-3" strokeWidth={3} /> : <X className="size-3" strokeWidth={3} />}
    </span>
  );
}

export function BenefitVisual({ spec }: { spec?: BenefitVisualSpec }) {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[16/9] overflow-hidden rounded-[0.875rem] bg-[#f3eefc]"
    >
      {/*
       * Owner-supplied wash (Images/background for cards.png). It carries its
       * own light, so no CSS gradient or glow sits on top — those only muddied
       * it. The solid bg above is a fallback for the moment before it decodes.
       */}
      <Image
        src="/images/card-bg.png"
        alt=""
        fill
        sizes="(min-width: 640px) 44vw, 92vw"
        className="object-cover"
      />

      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_92%_94%_at_50%_50%,#000_66%,transparent_100%)]">
        {spec?.kind === "hub" ? (
          <div className="flex size-full items-center justify-between gap-0 px-6">
            <div className="flex w-[36%] flex-col gap-3">
              {spec.spokes.map((sp) => (
                <span key={sp} className={`${CHIP} justify-center`}>
                  {sp}
                </span>
              ))}
            </div>
            {/* Three routes collapsing into one. */}
            <svg viewBox="0 0 60 90" fill="none" className="h-[64%] w-[16%] shrink-0">
              <g stroke="currentColor" className="text-accent/45" strokeWidth="1.5" fill="none">
                <path d="M0 14C34 14 26 45 58 45" />
                <path d="M0 45H58" />
                <path d="M0 76C34 76 26 45 58 45" />
              </g>
            </svg>
            <span className={`${CHIP} w-[36%] justify-center !bg-accent !text-white !shadow-[0_4px_14px_rgb(76_29_149/0.38)]`}>
              {spec.hub}
            </span>
          </div>
        ) : spec?.kind === "checks" ? (
          <div className="flex size-full flex-col items-center justify-center gap-3 px-6">
            {spec.items.map((it) => (
              <span key={it.label} className={`${CHIP} w-full justify-start !py-3`}>
                <Dot ok={it.ok !== false} />
                <span className={it.ok === false ? "text-ink-400 line-through" : undefined}>
                  {it.label}
                </span>
              </span>
            ))}
            {spec.result ? (
              <span className="mt-1.5 text-[0.6875rem] font-medium tracking-[0.07em] text-accent uppercase">
                {spec.result}
              </span>
            ) : null}
          </div>
        ) : spec?.kind === "steps" ? (
          <div className="relative flex size-full items-center justify-center gap-0 px-6">
            {/*
             * A rail behind the chain, filled as far as the flagged step —
             * the journey so far, with the exception sitting on top of it.
             */}
            <span className="absolute inset-x-10 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-accent/10" />
            <span
              className="absolute left-10 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-accent/35"
              style={{
                width: `calc((100% - 5rem) * ${
                  spec.steps.length > 1
                    ? (spec.flagged ?? spec.steps.length - 1) / (spec.steps.length - 1)
                    : 1
                })`,
              }}
            />
            {spec.steps.map((st, i) => (
              <React.Fragment key={st}>
                {i > 0 ? (
                  <span className="h-px flex-1 shrink" />
                ) : null}
                <span
                  className={
                    spec.flagged === i
                      ? `${CHIP} relative shrink-0 justify-center !bg-accent !text-white !shadow-[0_4px_16px_rgb(76_29_149/0.42)] -translate-y-2`
                      : `${CHIP} relative shrink-0 justify-center`
                  }
                >
                  {st}
                </span>
              </React.Fragment>
            ))}
          </div>
        ) : spec?.kind === "record" ? (
          <div className="flex size-full items-center justify-center">
            {/* A second sheet behind, so the record reads as one of many. */}
            <div className="absolute top-1/2 left-1/2 h-[62%] w-[74%] -translate-x-1/2 -translate-y-[58%] rounded-xl bg-canvas/70 shadow-[0_1px_2px_rgb(16_24_40/0.04)]" />
            <div className="relative w-[82%] rounded-xl bg-canvas p-5 shadow-[0_1px_2px_rgb(16_24_40/0.06),0_10px_24px_-10px_rgb(76_29_149/0.28)]">
              <p className="text-[0.6875rem] font-medium tracking-[0.07em] text-ink-400 uppercase">
                {spec.title}
              </p>
              <div className="mt-3 space-y-2">
                {spec.lines.map((ln) => (
                  <p
                    key={ln}
                    className="flex items-center gap-2 text-[0.8125rem] leading-none text-ink-800"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                    {ln}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : spec?.kind === "levels" ? (
          <div className="flex size-full items-end justify-center gap-6 px-10 pb-9">
            {spec.bars.map((bar, i) => (
              <div key={bar.label} className="flex w-[26%] flex-col items-center gap-3">
                <div
                  className={`w-full rounded-t-lg ${
                    i === spec.bars.length - 1 ? "bg-accent" : "bg-accent/25"
                  }`}
                  style={{ height: `${bar.height * 1.7}px` }}
                />
                <span className="text-[0.75rem] leading-none font-medium text-ink-400">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
