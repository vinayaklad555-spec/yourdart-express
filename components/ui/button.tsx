import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button language matched to the benchmark: compact heights, a 6px radius,
 * 14px text at weight 400, no shadow, and colour doing all the work.
 *
 * The primary action is the deep purple fill with white text (7.11:1). Only
 * the deep steps of the ramp are ever used this way — see globals.css.
 */
/*
 * A soft highlight bleeding down from the top edge, so filled buttons read as
 * lit from above rather than as flat rectangles.
 *
 * Kept at 0.14 white deliberately: the highlight LIGHTENS the fill, which
 * costs contrast for the white label. The primary measures 7.11:1 flat; every
 * step of alpha here spends some of that headroom. Do not raise it without
 * re-measuring the label against the brightest point of the gradient.
 *
 * Filled variants only — on a transparent button this paints a white haze.
 */
const topSheen =
  "bg-[radial-gradient(90%_130%_at_50%_0%,rgb(255_255_255/0.14),transparent_72%)]";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-normal",
    /* `transform` is in the list so the press below actually eases. */
    "transition-[background-color,color,border-color,opacity,transform] duration-150",
    "[transition-timing-function:var(--ease-out-soft)]",
    /* Press feedback. 0.98 rather than the 0.95 mobile guideline — on a
       pointer device a deeper squash reads as a glitch, not a press. */
    "active:scale-[0.98] motion-reduce:active:scale-100",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-950",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        /*
         * The accent purple. It was briefly near-black, matched to a Figma
         * hero; that left the brand colour marking only decoration and never
         * the action it most wants marked. The lit-from-above sheen from that
         * pass is kept — but as topSheen at 0.14, NOT the 0.17 the black used.
         * Black had ~17:1 of headroom to spend on a highlight; purple has
         * 7.11:1. See the topSheen note above before raising it.
         */
        primary: `bg-accent text-white hover:bg-accent-hover ${topSheen}`,
        secondary: `bg-ink-950 text-white hover:bg-ink-800 ${topSheen}`,
        outline:
          "border border-line-strong bg-canvas text-ink-950 hover:bg-ink-50",
        ghost: "text-ink-950 hover:bg-ink-50",
        /* Dark sections: accent-600 sits well clear of the accent-950 ground. */
        inverse: `bg-accent text-white hover:bg-accent-hover ${topSheen}`,
        "inverse-outline":
          "border border-white/25 text-white hover:border-white/45 hover:bg-white/8",
        /*
         * For controls sitting over photography, where what is behind them is
         * not knowable. A translucent ink plate guarantees the label's own
         * backdrop: measured at 8:1 against white text even where the image
         * underneath is pure white.
         */
        glass:
          "bg-ink-950/70 text-white backdrop-blur-sm hover:bg-ink-950/80",
        link: "text-ink-950 underline underline-offset-4 decoration-line-strong hover:decoration-ink-950 p-0 h-auto",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-[0.8125rem] [&_svg]:size-3.5",
        md: "h-10 rounded-md px-4 text-[0.875rem] [&_svg]:size-4",
        /* Measured off the benchmark CTA: 42px tall, 16px text, 20px sides. */
        lg: "h-[2.625rem] rounded-md px-5 text-[1rem] [&_svg]:size-4",
        icon: "size-9 rounded-md [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children?: React.ReactNode;
};

export type ButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonLinkProps = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> & { href: string };

/**
 * Renders a <button> or a next/link <a> from one API, so a call site never has
 * to duplicate the variant classes to change the element.
 */
export function Button(props: ButtonProps | ButtonLinkProps) {
  const { className, variant, size, ...rest } = props;
  const classes = cn(buttonVariants({ variant, size }), className);

  if (typeof rest.href === "string") {
    const { href, ...linkProps } = rest as ButtonLinkProps;
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      const { children, ...anchorProps } =
        linkProps as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }

    return <Link href={href} className={classes} {...linkProps} />;
  }

  const { type = "button", ...buttonProps } = rest as ButtonProps;
  return <button type={type} className={classes} {...buttonProps} />;
}

export { buttonVariants };
