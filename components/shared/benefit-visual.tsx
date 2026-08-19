import * as React from "react";
import Image from "next/image";
import {
  Check,
  X,
  AlertCircle,
  Package,
  Plane,
  Ship,
  Train,
  Search,
  RotateCw,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Boxes,
} from "lucide-react";
import type { BenefitVisualSpec } from "@/types/content";

/**
 * The diagram that heads a benefit card.
 *
 * ONE COMPOSITION PER CARD. An earlier version shared five patterns across
 * all six services and every service page ended up looking identical; each
 * card now gets a diagram that only makes sense for its own copy. Labels all
 * come from content/services.ts.
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

/*
 * Two shadow values for the whole file. They were duplicated per pattern and
 * drifted — the orbit's discs ended up at 0.45 against the chips' 0.22, which
 * is what made that card read heavier than the rest of the set.
 */
const PLATE_SHADOW =
  "shadow-[0_1px_2px_rgb(16_24_40/0.06),0_8px_18px_-8px_rgb(76_29_149/0.22)]";
const FOCAL_SHADOW =
  "shadow-[0_2px_4px_rgb(76_29_149/0.25),0_10px_22px_-8px_rgb(76_29_149/0.55)]";

const CHIP = `inline-flex items-center gap-2 rounded-[0.625rem] bg-canvas px-3.5 py-2.5 text-[0.8125rem] leading-none font-medium text-ink-800 ${PLATE_SHADOW}`;

const FOCAL = `inline-flex items-center gap-2 rounded-[0.625rem] bg-[linear-gradient(180deg,#9d4edd,#6d28d9)] px-3.5 py-2.5 text-[0.8125rem] leading-none font-medium text-white ${FOCAL_SHADOW}`;

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
       * wash composited into it already.
       */}
      <Image
        src={spec?.kind === "image" ? spec.src : "/images/card-bg.png"}
        alt=""
        fill
        sizes="(min-width: 640px) 44vw, 92vw"
        className="object-cover"
      />

      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_94%_96%_at_50%_50%,#000_70%,transparent_100%)]">
        <Composition spec={spec} />
      </div>
    </div>
  );
}

function Composition({ spec }: { spec?: BenefitVisualSpec }) {
  if (!spec) return null;

  switch (spec.kind) {
    /* ---------------------------------------------------------- shipping */
    case "image":
      return null;

    case "checks":
      return (
        <div className="flex size-full items-center justify-center px-6">
          <div className={`w-full rounded-xl bg-canvas p-3.5 ${PLATE_SHADOW}`}>
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
      );

    case "steps":
      return (
        <>
          <Arcs />
          <Routes d={["M56 90H264"]} />
          <div className="absolute inset-0 flex items-center justify-between px-6">
            {spec.steps.map((st, i) => (
              <span
                key={st}
                className={spec.flagged === i ? `${FOCAL} relative` : `${CHIP} relative`}
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
      );

    case "record":
      return (
        <div className="relative flex size-full items-center justify-center px-6">
          <div className="absolute h-[58%] w-[66%] -rotate-6 rounded-xl bg-canvas/60 shadow-[0_1px_2px_rgb(16_24_40/0.05)]" />
          <div className="absolute h-[60%] w-[70%] -rotate-2 rounded-xl bg-canvas/80 shadow-[0_1px_2px_rgb(16_24_40/0.05)]" />
          <Sheet title={spec.title} lines={spec.lines} />
        </div>
      );

    /* -------------------------------------------------------- fulfilment */
    /* A carton with its written spec called out around it. */
    case "annotated":
      return (
        <div className="relative size-full">
          <Routes d={["M104 52H132", "M104 90H128", "M104 128H132"]} />
          {/* Seated on the viewBox percentages the routes are drawn in
              (y 29/50/71%, right edge 32.5%), or the leaders miss. */}
          {spec.notes.map((n, i) => (
            <span
              key={n}
              className={`${CHIP} absolute left-[5%] w-[27.5%] -translate-y-1/2 justify-center`}
              style={{ top: `${29 + i * 21}%` }}
            >
              {n}
            </span>
          ))}
          <div className="absolute top-1/2 left-[58%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2.5">
            <span className={`flex aspect-square h-[4.5rem] items-center justify-center rounded-2xl bg-[linear-gradient(160deg,#a855f7,#6d28d9)] ${FOCAL_SHADOW}`}>
              <Package className="size-8 text-white" strokeWidth={1.7} />
            </span>
            <span className="text-[0.75rem] leading-none font-medium text-ink-600">{spec.subject}</span>
          </div>
        </div>
      );

    /* Two lanes joining, with the handoff that does not happen struck out. */
    case "merge":
      return (
        <div className="relative size-full">
          <Routes d={["M110 56H150Q160 56 160 66V80Q160 90 170 90H208", "M110 124H150Q160 124 160 114V100Q160 90 170 90H208"]} />
          <span className={`${CHIP} absolute top-[31%] left-[7%] w-[30%] -translate-y-1/2 justify-center`}>
            {spec.lanes[0]}
          </span>
          <span className={`${CHIP} absolute top-[69%] left-[7%] w-[30%] -translate-y-1/2 justify-center`}>
            {spec.lanes[1]}
          </span>
          <span className={`${FOCAL} absolute top-1/2 right-[7%] w-[30%] -translate-y-1/2 justify-center`}>
            {spec.into}
          </span>
          <span className="absolute bottom-[8%] left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-[0.6875rem] leading-none font-medium text-ink-400">
            <X className="size-3.5 text-ink-400" strokeWidth={3} />
            <span className="line-through">{spec.without}</span>
          </span>
        </div>
      );

    /* Expected against received, discrepancy flagged. */
    case "compare":
      return (
        <div className="flex size-full items-center justify-center gap-3 px-6">
          {[spec.left, spec.right].map((side, col) => (
            <div key={side} className={`flex-1 rounded-xl bg-canvas p-3 ${PLATE_SHADOW}`}>
              <p className="text-[0.625rem] font-medium tracking-[0.07em] text-ink-400 uppercase">{side}</p>
              <div className="mt-2 space-y-1.5">
                {spec.rows.map((r, i) => {
                  const off = col === 1 && i === spec.flagged;
                  return (
                    <span
                      key={r}
                      className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[0.6875rem] leading-none ${
                        off ? "bg-accent/10 font-medium text-accent" : "bg-[#faf7fe] text-ink-800"
                      }`}
                    >
                      {off ? <AlertCircle className="size-3" strokeWidth={2.6} /> : <Check className="size-3 text-accent/60" strokeWidth={3} />}
                      {r}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      );

    case "levels":
      return (
        <div className="flex size-full items-end justify-center gap-6 px-10 pb-9">
          {spec.bars.map((bar, i) => {
            const peak = i === spec.bars.length - 1;
            return (
              <div key={bar.label} className="relative flex w-[26%] flex-col items-center gap-3">
                {peak ? (
                  <span className={`absolute -top-7 rounded-md bg-canvas px-2 py-1 text-[0.625rem] leading-none font-medium text-accent ${PLATE_SHADOW}`}>
                    {bar.label}
                  </span>
                ) : null}
                <div
                  className={`w-full rounded-t-lg ${peak ? "bg-[linear-gradient(180deg,#9d4edd,#6d28d9)]" : "bg-accent/22"}`}
                  style={{ height: `${bar.height * 1.7}px` }}
                />
                <span className="text-[0.75rem] leading-none font-medium text-ink-400">{bar.label}</span>
              </div>
            );
          })}
        </div>
      );

    /* ------------------------------------------------- reverse logistics */
    /* Confirmations landing with the person who is waiting. */
    case "notify":
      return (
        <div className="relative size-full">
          <Routes d={["M118 44H196", "M118 90H196", "M118 136H196"]} />
          {/* Same rule: seated on the route coordinates (y 24/50/76%). */}
          {spec.pings.map((n, i) => (
            <span
              key={n}
              className={`${CHIP} absolute left-[5%] w-[32%] -translate-y-1/2 justify-center !py-2 !text-[0.75rem]`}
              style={{ top: `${24 + i * 26}%` }}
            >
              <Check className="size-3 shrink-0 text-accent" strokeWidth={3} />
              {n}
            </span>
          ))}
          <div className="absolute top-1/2 right-[8%] flex -translate-y-1/2 flex-col items-center gap-2">
            <span className={`flex aspect-square h-[3.5rem] items-center justify-center rounded-full bg-[linear-gradient(160deg,#a855f7,#6d28d9)] ${FOCAL_SHADOW}`}>
              <Check className="size-7 text-white" strokeWidth={2.4} />
            </span>
            <span className="text-[0.75rem] leading-none font-medium text-ink-600">{spec.to}</span>
          </div>
        </div>
      );

    /* An item held under a lens, checked against named criteria. */
    case "inspect":
      return (
        <div className="relative flex size-full items-center justify-center gap-4 px-7">
          <div className="relative">
            <span className={`flex aspect-square h-[5rem] items-center justify-center rounded-2xl bg-canvas ${PLATE_SHADOW}`}>
              <Package className="size-9 text-accent" strokeWidth={1.6} />
            </span>
            <span className={`absolute -right-3 -bottom-3 flex size-9 items-center justify-center rounded-full bg-[linear-gradient(160deg,#a855f7,#6d28d9)] ${FOCAL_SHADOW}`}>
              <Search className="size-4 text-white" strokeWidth={2.4} />
            </span>
          </div>
          <div className={`flex-1 rounded-xl bg-canvas p-3 ${PLATE_SHADOW}`}>
            <p className="text-[0.625rem] font-medium tracking-[0.07em] text-ink-400 uppercase">{spec.subject}</p>
            <div className="mt-2 space-y-1.5">
              {spec.criteria.map((c) => (
                <p key={c} className="flex items-center gap-2 text-[0.75rem] leading-none text-ink-800">
                  <Dot />
                  {c}
                </p>
              ))}
            </div>
          </div>
        </div>
      );

    /* A loop putting goods back into sellable stock. */
    case "cycle":
      return (
        <div className="relative size-full">
          <svg viewBox="0 0 320 180" fill="none" className="absolute inset-0 size-full">
            <circle cx="160" cy="90" r="58" stroke="#7b2cbf" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.4" fill="none" />
          </svg>
          <span className={`${CHIP} absolute top-[13%] left-1/2 -translate-x-1/2 justify-center`}>{spec.nodes[0]}</span>
          <span className={`${CHIP} absolute bottom-[13%] left-[16%] justify-center`}>{spec.nodes[1]}</span>
          <span className={`${FOCAL} absolute right-[16%] bottom-[13%] justify-center`}>{spec.nodes[2]}</span>
          <span className={`absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-canvas ${PLATE_SHADOW}`}>
            <RotateCw className="size-5 text-accent" strokeWidth={2.2} />
          </span>
        </div>
      );

    /* One outcome splitting into the rules you set. */
    case "branch":
      return (
        <div className="relative size-full">
          <Routes d={["M112 90H136Q146 90 146 80V46Q146 36 156 36H208", "M112 90H208", "M112 90H136Q146 90 146 100V134Q146 144 156 144H208"]} />
          <span className={`${FOCAL} absolute top-1/2 left-[7%] w-[28%] -translate-y-1/2 justify-center`}>{spec.from}</span>
          {/* Routes land at y 36/90/144 == 20/50/80%. */}
          {spec.outcomes.map((o, i) => (
            <span
              key={o}
              className={`${CHIP} absolute right-[6%] w-[32%] -translate-y-1/2 justify-center`}
              style={{ top: `${20 + i * 30}%` }}
            >
              {o}
            </span>
          ))}
        </div>
      );

    /* ----------------------------------------------------- warehousing */
    /* A running movement log, in and out. */
    case "ledger":
      return (
        <div className="flex size-full items-center justify-center px-7">
          <div className={`w-full rounded-xl bg-canvas p-3 ${PLATE_SHADOW}`}>
            {spec.rows.map((r, i) => (
              <span
                key={i}
                className={`flex items-center gap-2.5 border-line px-2 py-2 text-[0.75rem] leading-none text-ink-800 ${
                  i ? "border-t" : ""
                }`}
              >
                <span
                  className={`inline-flex size-4.5 items-center justify-center rounded-full ${
                    r.out ? "bg-accent/12 text-accent" : "bg-accent text-white"
                  }`}
                >
                  {r.out ? <ArrowUp className="size-3" strokeWidth={3} /> : <ArrowDown className="size-3" strokeWidth={3} />}
                </span>
                {r.label}
                <span className="ml-auto h-1.5 w-10 rounded-full bg-accent/15" />
              </span>
            ))}
          </div>
        </div>
      );

    /* Bays of different kinds, because the goods differ. */
    case "bays":
      return (
        <div className="flex size-full items-end justify-center gap-4 px-8 pb-10">
          {spec.bays.map((b, i) => (
            <div key={b} className="flex flex-1 flex-col items-center gap-2.5">
              <div className={`flex w-full flex-col justify-end gap-1.5 rounded-xl bg-canvas p-2 ${PLATE_SHADOW}`} style={{ height: `${64 + i * 22}px` }}>
                {Array.from({ length: i + 1 }).map((_, k) => (
                  <span key={k} className={`w-full rounded ${k === 0 ? "bg-accent/70" : "bg-accent/25"}`} style={{ height: `${18 - k * 4}px` }} />
                ))}
              </div>
              <span className="text-[0.75rem] leading-none font-medium text-ink-600">{b}</span>
            </div>
          ))}
        </div>
      );

    /* One building, three named zones inside it. */
    case "zones":
      return (
        <div className="flex size-full items-center justify-center px-7">
          <div className={`w-full rounded-xl bg-canvas p-3 ${PLATE_SHADOW}`}>
            <p className="text-[0.625rem] font-medium tracking-[0.07em] text-ink-400 uppercase">{spec.site}</p>
            <div className="mt-2.5 flex gap-2">
              {spec.zones.map((z, i) => (
                <span
                  key={z}
                  className={`flex-1 rounded-lg px-2 py-3 text-center text-[0.75rem] leading-none font-medium ${
                    i === 1 ? "bg-[linear-gradient(180deg,#9d4edd,#6d28d9)] text-white" : "bg-[#f4edfd] text-ink-800"
                  }`}
                >
                  {z}
                </span>
              ))}
            </div>
          </div>
        </div>
      );

    /* Space against an agreed line, moved when it needs moving. */
    case "capacity":
      return (
        <div className="flex size-full flex-col items-center justify-center gap-3 px-10">
          <div className={`relative h-[4.5rem] w-full overflow-hidden rounded-xl bg-canvas ${PLATE_SHADOW}`}>
            <span className="absolute inset-y-0 left-0 w-[58%] bg-[linear-gradient(180deg,#a855f7,#6d28d9)] opacity-90" />
            <span className="absolute inset-y-0 left-[58%] w-[18%] bg-accent/20" />
            <span className="absolute inset-y-2 left-[76%] w-px border-l border-dashed border-accent" />
            <span className="absolute top-1/2 left-[80%] -translate-y-1/2 text-[0.6875rem] leading-none font-medium text-accent">
              {spec.label}
            </span>
          </div>
          <div className="flex gap-2">
            {spec.marks.map((m) => (
              <span key={m} className="rounded-md bg-canvas/80 px-2 py-1 text-[0.625rem] leading-none font-medium text-ink-600">
                {m}
              </span>
            ))}
          </div>
        </div>
      );

    /* --------------------------------------------- air freight forwarding */
    /* Paperwork cleared before anything moves. */
    case "stamp":
      return (
        <div className="relative flex size-full items-center justify-center px-7">
          <div className={`w-full rounded-xl bg-canvas p-3.5 ${PLATE_SHADOW}`}>
            {spec.docs.map((d, i) => (
              <p key={d} className={`flex items-center gap-2 py-2 text-[0.75rem] leading-none text-ink-800 ${i ? "border-t border-line" : ""}`}>
                <Dot />
                {d}
              </p>
            ))}
          </div>
          <span className={`absolute -right-1 bottom-4 rotate-[-8deg] rounded-lg border-2 border-accent bg-canvas px-3 py-1.5 text-[0.6875rem] leading-none font-semibold tracking-[0.08em] text-accent uppercase ${PLATE_SHADOW}`}>
            {spec.mark}
          </span>
        </div>
      );

    /* What we run, and what we do not. */
    case "modes": {
      const ICONS = [Plane, Ship, Train];
      return (
        <div className="flex size-full items-center justify-center gap-4 px-8">
          {spec.modes.map((m, i) => {
            const Icon = ICONS[i] ?? Plane;
            return (
              <div key={m.label} className="flex flex-1 flex-col items-center gap-2.5">
                <span
                  className={`relative flex aspect-square w-full max-w-[4.5rem] items-center justify-center rounded-2xl ${
                    m.ok ? `bg-[linear-gradient(160deg,#a855f7,#6d28d9)] ${FOCAL_SHADOW}` : `bg-canvas ${PLATE_SHADOW}`
                  }`}
                >
                  <Icon className={`size-8 ${m.ok ? "text-white" : "text-ink-300"}`} strokeWidth={1.7} />
                  {!m.ok ? (
                    <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-ink-200 text-ink-400">
                      <X className="size-3" strokeWidth={3} />
                    </span>
                  ) : null}
                </span>
                <span className={`text-[0.75rem] leading-none font-medium ${m.ok ? "text-ink-800" : "text-ink-400 line-through"}`}>
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
      );
    }

    /* Parties either side of a border, kept in step. */
    case "parties":
      return (
        <div className="relative size-full">
          <svg viewBox="0 0 320 180" fill="none" className="absolute inset-0 size-full">
            <path d="M160 14V166" stroke="#7b2cbf" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.4" />
          </svg>
          <span className="absolute top-[6%] left-1/2 -translate-x-1/2 rounded-md bg-canvas/85 px-2 py-1 text-[0.625rem] leading-none font-medium tracking-[0.07em] text-accent uppercase">
            {spec.border}
          </span>
          <div className="absolute inset-y-0 left-[7%] flex w-[33%] flex-col justify-center gap-3">
            {spec.left.map((l) => (
              <span key={l} className={`${CHIP} justify-center`}>{l}</span>
            ))}
          </div>
          <div className="absolute inset-y-0 right-[7%] flex w-[33%] flex-col justify-center gap-3">
            {spec.right.map((r) => (
              <span key={r} className={`${CHIP} justify-center`}>{r}</span>
            ))}
          </div>
          <span className={`absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[linear-gradient(160deg,#a855f7,#6d28d9)] ${FOCAL_SHADOW}`}>
            <ArrowRight className="size-4 text-white" strokeWidth={2.6} />
          </span>
        </div>
      );

    /* The leg that people forget is the one that matters. */
    case "lastleg":
      return (
        <div className="relative size-full">
          <svg viewBox="0 0 320 180" fill="none" className="absolute inset-0 size-full">
            <path d="M44 118C96 118 104 74 160 74" stroke="#7b2cbf" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.35" />
            <path d="M160 74c56 0 64 44 116 44" stroke="#7b2cbf" strokeWidth="2" opacity="0.75" />
          </svg>
          {spec.legs.map((leg, i) => (
            <span
              key={leg}
              className={i === spec.legs.length - 1 ? `${FOCAL} absolute` : `${CHIP} absolute`}
              style={
                i === 0
                  ? { left: "5%", top: "66%" }
                  : i === 1
                    ? { left: "50%", top: "41%", transform: "translateX(-50%)" }
                    : { right: "5%", top: "66%" }
              }
            >
              {leg}
            </span>
          ))}
        </div>
      );

    /* ------------------------------------------------------ shop and ship */
    /* Our address standing in at someone else's checkout. */
    case "checkout":
      return (
        <div className="flex size-full items-center justify-center px-7">
          <div className={`w-full rounded-xl bg-canvas p-4 ${PLATE_SHADOW}`}>
            <p className="text-[0.625rem] font-medium tracking-[0.07em] text-ink-400 uppercase">{spec.field}</p>
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-accent/40 bg-[#faf7fe] px-3 py-2.5">
              <span className="size-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-[0.8125rem] leading-none font-medium text-ink-800">{spec.value}</span>
              <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-[0.625rem] leading-none font-medium text-white">
                <Check className="size-3" strokeWidth={3} />
                {spec.note}
              </span>
            </div>
          </div>
        </div>
      );

    /* Several parcels becoming one. */
    case "consolidate":
      return (
        <div className="relative flex size-full items-center justify-center gap-5 px-8">
          <div className="grid flex-1 grid-cols-2 gap-2">
            {Array.from({ length: spec.from }).map((_, i) => (
              <span key={i} className={`flex aspect-square items-center justify-center rounded-lg bg-canvas ${PLATE_SHADOW}`}>
                <Package className="size-4 text-accent/70" strokeWidth={1.8} />
              </span>
            ))}
          </div>
          <ArrowRight className="size-5 shrink-0 text-accent/60" strokeWidth={2.4} />
          <div className="flex flex-1 flex-col items-center gap-2.5">
            <span className={`flex aspect-square w-full max-w-[5.5rem] items-center justify-center rounded-2xl bg-[linear-gradient(160deg,#a855f7,#6d28d9)] ${FOCAL_SHADOW}`}>
              <Boxes className="size-9 text-white" strokeWidth={1.7} />
            </span>
            <span className="text-[0.75rem] leading-none font-medium text-ink-600">{spec.into}</span>
          </div>
        </div>
      );

    /* What turned up, confirmed. */
    case "arrival":
      return (
        <div className="relative flex size-full items-center justify-center gap-4 px-7">
          <span className={`flex aspect-square h-[5.5rem] shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(160deg,#a855f7,#6d28d9)] ${FOCAL_SHADOW}`}>
            <Package className="size-10 text-white" strokeWidth={1.6} />
          </span>
          <div className="flex-1 space-y-1.5">
            <p className="text-[0.625rem] font-medium tracking-[0.07em] text-ink-400 uppercase">{spec.subject}</p>
            {spec.checks.map((c) => (
              <span key={c} className={`flex items-center gap-2 rounded-lg bg-canvas px-2.5 py-2 text-[0.75rem] leading-none font-medium text-ink-800 ${PLATE_SHADOW}`}>
                <Dot />
                {c}
              </span>
            ))}
          </div>
        </div>
      );

    /* Paperwork raised for the onward leg. */
    case "exportdocs":
      return (
        <div className="relative flex size-full items-center justify-center px-6">
          <div className="absolute h-[62%] w-[62%] rotate-3 rounded-xl bg-canvas/70 shadow-[0_1px_2px_rgb(16_24_40/0.05)]" />
          <Sheet title={spec.title} lines={spec.docs} />
        </div>
      );

    default:
      return null;
  }
}

/** The shared document plate used by `record` and `exportdocs`. */
function Sheet({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className={`relative w-[78%] rounded-xl bg-canvas p-4 ${PLATE_SHADOW}`}>
      <div className="flex items-center gap-2">
        <span className="inline-flex size-5 items-center justify-center rounded-md bg-[linear-gradient(180deg,#9d4edd,#6d28d9)]">
          <Check className="size-3 text-white" strokeWidth={3} />
        </span>
        <p className="text-[0.6875rem] font-medium tracking-[0.07em] text-ink-400 uppercase">{title}</p>
      </div>
      <div className="mt-3 space-y-2">
        {lines.map((ln) => (
          <p key={ln} className="flex items-center gap-2 text-[0.8125rem] leading-none text-ink-800">
            <span className="size-1.5 shrink-0 rounded-full bg-accent" />
            {ln}
          </p>
        ))}
      </div>
    </div>
  );
}
