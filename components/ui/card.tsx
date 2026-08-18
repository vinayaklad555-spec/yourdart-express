import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Flat surfaces, matching the benchmark: a 12px radius, one hairline border
 * weight, and no drop shadow anywhere. Separation comes from the border and
 * the surface tone, never from elevation. Hover shifts the surface, not the
 * shadow.
 */
const cardVariants = cva(
  "relative rounded-xl transition-[border-color,background-color,transform] duration-[var(--duration-base)] [transition-timing-function:var(--ease-out-soft)]",
  {
    variants: {
      variant: {
        outline: "border border-line bg-canvas",
        raised: "border border-line bg-canvas",
        sunk: "border border-line bg-canvas-sunk",
        dark: "border border-white/12 bg-white/[0.04]",
        ghost: "border border-transparent",
      },
      interactive: {
        /* A 2px lift on hover — transform only, so it cannot reflow. Note this
           is MOTION, not elevation: the no-shadow rule above still holds. */
        true: "hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
        false: "",
      },
      padding: {
        none: "",
        sm: "p-5",
        md: "p-6 sm:p-7",
        lg: "p-7 sm:p-9",
      },
    },
    compoundVariants: [
      { interactive: true, variant: "outline", class: "hover:bg-canvas-sunk" },
      { interactive: true, variant: "raised", class: "hover:bg-canvas-sunk" },
      {
        interactive: true,
        variant: "sunk",
        class: "hover:border-line-strong hover:bg-ink-100",
      },
      {
        interactive: true,
        variant: "dark",
        class: "hover:border-white/22 hover:bg-white/[0.07]",
      },
    ],
    defaultVariants: { variant: "outline", padding: "md", interactive: false },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof cardVariants> {
  as?: "div" | "article" | "li" | "section";
}

export function Card({
  className,
  variant,
  padding,
  interactive,
  as = "div",
  ...props
}: CardProps) {
  // Widened to ElementType so one component can render div/article/li/section
  // without TypeScript trying to intersect their incompatible event handlers.
  const Tag = as as React.ElementType;

  return (
    <Tag
      className={cn(cardVariants({ variant, padding, interactive }), className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  as: Tag = "h3",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: "h2" | "h3" | "h4" }) {
  return (
    <Tag className={cn("text-h4 font-normal text-ink-950", className)} {...props} />
  );
}

export function CardBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-[0.9375rem] leading-relaxed text-ink-400", className)}
      {...props}
    />
  );
}

/**
 * Icon chip. Ink on a neutral tile by default — the accent is reserved for
 * actions, so it does not get spent on decoration.
 */
export function CardIcon({
  className,
  tone = "light",
  children,
}: {
  className?: string;
  tone?: "light" | "dark" | "solid";
  children: React.ReactNode;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md [&_svg]:size-[1.0625rem]",
        tone === "light" && "bg-canvas-sunk text-ink-950 ring-1 ring-line",
        tone === "dark" && "bg-white/8 text-accent-bright ring-1 ring-white/12",
        tone === "solid" && "bg-accent text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}

export { cardVariants };
