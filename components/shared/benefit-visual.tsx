import * as React from "react";
import Image from "next/image";
import { Check, X, AlertCircle } from "lucide-react";
import type { BenefitVisualSpec } from "@/types/content";

/**
 * The diagram that heads a benefit card.
 *
 * These EXPLAIN the card: every label comes from the benefit's own copy in
 * content/services.ts, so "Serviceability confirmed upfront" draws the three
 * things actually checked, and the air-freight card strikes ocean and rail
 * through because that is what the copy says.
 *
 * Drawing notes, taken from the layout references:
 *  - connectors are DOTTED and ORTHOGONAL, turning through rounded corners.
 *    A straight diagonal reads as a chart line; a routed one reads as a
 *    system diagram, which is what these are.
 *  - faint concentric arcs sit behind the focal node, so the composition has
 *    a background layer rather than floating on flat colour.
 *  - the focal node is a gradient pill with a real shadow; everything else is
 *    a white plate. One thing is emphatic, the rest recede.
 *
 * No invented figures. The references fill this space with metrics ("2,383
 * visitors, +40%", "$15,000, 22% from last month"); we have none of that and
 * the brief rules out inventing it, so the diagrams carry named things.
 */

const CHIP =
  "inline-flex items-center gap-2 rounded-[0.625rem] bg-canvas px-3.5 py-2.5 text-[0.8125rem] leading-none font-medium text-ink-800 shadow-[0_1px_2px_rgb(16_24_40/0.06),0_8px_18px_-8px_rgb(76_29_149/0.22)]";

const FOCAL =
  "inline-flex items-center gap-2 rounded-[0.625rem] bg-[linear-gradient(180deg,#9d4edd,#6d28d9)] px-3.5 py-2.5 text-[0.8125rem] leading-none font-medium text-white shadow-[0_2px_4px_rgb(76_29_149/0.25),0_10px_22px_-8px_rgb(76_29_149/0.55)]";

/** The faint arcs that sit behind every composition. */
function Arcs() {
  return (
    <svg viewBox="0 0 320 180" fill="none" className="absolute inset-0 size-full">
      <g stroke="#7b2cbf" fill="none">
        <circle cx="160" cy="90" r="60" strokeWidth="1" opacity="0.13" />
        <circle cx="160" cy="90" r="88" strokeWidth="1" opacity="0.09" />
        <circle cx="160" cy="90" r="118" strokeWidth="1" opacity="0.06" />
      </g>
    </svg>
  );
}

/** Dotted, right-angled routing — the references never use a bare diagonal. */
function Routes({ d }: { d: string[] }) {
  return (
    <svg viewBox="0 0 320 180" fill="none" className="absolute inset-0 size-full">
      {d.map((path) => (
        <path
          key={path}
          d={path}
          stroke="#7b2cbf"
          strokeWidth="1.5"
          strokeDasharray="2.5 5"
          strokeLinecap="round"
          opacity="0.45"
        />
      ))}
    </svg>
  );
}

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
       * An `image` visual replaces the wash outright — that artwork has the
       * wash composited into it already, so layering ours underneath would
       * only ever show at the crop edges.
       */}
      <Image
        src={spec?.kind === "image" ? spec.src : "/images/card-bg.png"}
        alt=""
        fill
        sizes="(min-width: 640px) 44vw, 92vw"
        className="object-cover"
      />

      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_94%_96%_at_50%_50%,#000_70%,transparent_100%)]">
        {spec?.kind === "hub" ? (
          <>
            <Arcs />
            <Routes
              d={[
                "M112 40H150Q160 40 160 50V80Q160 90 170 90H208",
                "M112 90H208",
                "M112 140H150Q160 140 160 130V100Q160 90 170 90H208",
              ]}
            />
            {/*
             * Positioned in PERCENTAGES that match the 320x180 viewBox above,
             * not by flexbox: the routes are drawn in viewBox units, so the
             * chips have to share that coordinate system or the dotted lines
             * miss their endpoints.
             *   spoke right edge 37% == x118    hub left edge 63% == x202
             *   spoke centres 22/50/78%         == y40 / y90 / y140
             */}
            {spec.spokes.map((sp, i) => (
              <span
                key={sp}
                className={`${CHIP} absolute left-[7%] w-[30%] -translate-y-1/2 justify-center`}
                style={{ top: `${22 + i * 28}%` }}
              >
                {sp}
              </span>
            ))}
            <span
              className={`${FOCAL} absolute top-1/2 right-[7%] w-[30%] -translate-y-1/2 justify-center`}
            >
              {spec.hub}
            </span>
          </>
        ) : spec?.kind === "checks" ? (
          /* The list lives on a floating plate, as the references do. */
          <div className="flex size-full items-center justify-center px-6">
            <div className="w-full rounded-xl bg-canvas p-3.5 shadow-[0_1px_2px_rgb(16_24_40/0.06),0_14px_30px_-12px_rgb(76_29_149/0.30)]">
              <div className="space-y-1.5">
                {spec.items.map((it) => (
                  <span
                    key={it.label}
                    className="flex items-center gap-2.5 rounded-lg bg-[#faf7fe] px-3 py-2.5 text-[0.8125rem] leading-none font-medium text-ink-800"
                  >
                    <Dot ok={it.ok !== false} />
                    <span className={it.ok === false ? "text-ink-400 line-through" : undefined}>
                      {it.label}
                    </span>
                  </span>
                ))}
              </div>
              {spec.result ? (
                <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.6875rem] font-medium tracking-[0.07em] text-accent uppercase">
                  <Check className="size-3.5" strokeWidth={3} />
                  {spec.result}
                </p>
              ) : null}
            </div>
          </div>
        ) : spec?.kind === "steps" ? (
          <>
            <Arcs />
            <Routes d={["M56 90H264"]} />
            <div className="absolute inset-0 flex items-center justify-between px-6">
              {spec.steps.map((st, i) => (
                <span
                  key={st}
                  className={
                    spec.flagged === i
                      ? `${FOCAL} relative justify-center`
                      : `${CHIP} relative justify-center`
                  }
                >
                  {spec.flagged === i ? (
                    <AlertCircle
                      className="absolute -top-2 -right-2 size-4 rounded-full bg-canvas text-accent"
                      strokeWidth={2.5}
                    />
                  ) : null}
                  {st}
                </span>
              ))}
            </div>
          </>
        ) : spec?.kind === "record" ? (
          /* The record, with earlier ones stacked behind it at an angle. */
          <div className="relative flex size-full items-center justify-center px-6">
            <div className="absolute h-[58%] w-[66%] -rotate-6 rounded-xl bg-canvas/60 shadow-[0_1px_2px_rgb(16_24_40/0.05)]" />
            <div className="absolute h-[60%] w-[70%] -rotate-2 rounded-xl bg-canvas/80 shadow-[0_1px_2px_rgb(16_24_40/0.05)]" />
            <div className="relative w-[78%] rounded-xl bg-canvas p-4 shadow-[0_1px_2px_rgb(16_24_40/0.06),0_16px_34px_-12px_rgb(76_29_149/0.34)]">
              <div className="flex items-center gap-2">
                <span className="inline-flex size-5 items-center justify-center rounded-md bg-[linear-gradient(180deg,#9d4edd,#6d28d9)]">
                  <Check className="size-3 text-white" strokeWidth={3} />
                </span>
                <p className="text-[0.6875rem] font-medium tracking-[0.07em] text-ink-400 uppercase">
                  {spec.title}
                </p>
              </div>
              <div className="mt-3 space-y-2">
                {spec.lines.map((ln) => (
                  <p key={ln} className="flex items-center gap-2 text-[0.8125rem] leading-none text-ink-800">
                    <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                    {ln}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : spec?.kind === "levels" ? (
          <div className="flex size-full items-end justify-center gap-6 px-10 pb-9">
            {spec.bars.map((bar, i) => {
              const peak = i === spec.bars.length - 1;
              return (
                <div key={bar.label} className="relative flex w-[26%] flex-col items-center gap-3">
                  {peak ? (
                    <span className="absolute -top-7 rounded-md bg-canvas px-2 py-1 text-[0.625rem] leading-none font-medium text-accent shadow-[0_2px_8px_-2px_rgb(76_29_149/0.3)]">
                      {bar.label}
                    </span>
                  ) : null}
                  <div
                    className={`w-full rounded-t-lg ${
                      peak
                        ? "bg-[linear-gradient(180deg,#9d4edd,#6d28d9)] shadow-[0_8px_18px_-8px_rgb(76_29_149/0.6)]"
                        : "bg-accent/22"
                    }`}
                    style={{ height: `${bar.height * 1.7}px` }}
                  />
                  <span className="text-[0.75rem] leading-none font-medium text-ink-400">
                    {bar.label}
                  </span>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
