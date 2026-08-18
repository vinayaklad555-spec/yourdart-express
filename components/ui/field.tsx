import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accessible form primitives. Each field wires label → control via `htmlFor`,
 * exposes errors through `aria-describedby` + `aria-invalid`, and announces
 * them in a live region so screen reader users hear validation results without
 * having to hunt for them.
 */

export function Field({
  id,
  label,
  labelHidden = false,
  error,
  hint,
  required,
  className,
  children,
}: {
  id: string;
  label: string;
  /**
   * Hides the label visually but keeps it in the accessibility tree, for the
   * benchmark's placeholder-carries-the-field pattern. Never drop the label
   * element itself: a placeholder is not an accessible name, and it vanishes
   * the moment someone types.
   */
  labelHidden?: boolean;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => React.ReactNode;
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className={cn(
          "text-[0.8125rem] font-medium text-ink-950",
          labelHidden && "sr-only",
        )}
      >
        {label}
        {labelHidden ? null : required ? (
          <span className="ml-0.5 text-ink-950" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-ink-400">optional</span>
        )}
      </label>

      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })}

      {hint && !error ? (
        <p id={hintId} className="text-[0.75rem] text-ink-400">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-[0.75rem] text-red-600"
        >
          <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/*
 * Control language measured off the benchmark's own signup page rather than
 * eyeballed — its computed styles are:
 *   height 43px · font 15px/22.5px · radius 6px
 *   fill   rgba(33,33,33,0.024)   border 1px rgba(33,33,33,0.1)
 * Those two near-invisible washes are the whole trick: the field reads as a
 * recess in the page rather than a box drawn on top of it.
 *
 * The focus treatment is ours, kept because it is measured accessible: the
 * fill lifts to white, the border goes to ink, and a quiet ring appears.
 */
const controlClasses = [
  "w-full rounded-md border border-[rgb(33_33_33/0.1)] bg-[rgb(33_33_33/0.024)] px-4 text-[0.9375rem] text-ink-950",
  "placeholder:text-ink-400",
  "transition-[border-color,box-shadow,background-color] duration-200",
  "hover:border-[rgb(33_33_33/0.2)] hover:bg-[rgb(33_33_33/0.04)]",
  "focus:outline-none focus-visible:border-ink-950 focus-visible:bg-canvas focus-visible:ring-2 focus-visible:ring-ink-950/10",
  "disabled:cursor-not-allowed disabled:bg-canvas-sunk disabled:text-ink-400",
  "aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-canvas aria-[invalid=true]:focus-visible:ring-red-500/18",
].join(" ");

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(controlClasses, "h-[2.6875rem]", className)}
      {...props}
    />
  );
});

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        controlClasses,
        "min-h-32 resize-y py-3.5 leading-relaxed",
        className,
      )}
      {...props}
    />
  );
});

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          controlClasses,
          "h-[2.6875rem] appearance-none pr-10",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-400"
      >
        <path
          d="M6 8l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
});

/**
 * Off-screen honeypot. Hidden from sighted users, removed from the a11y tree
 * and skipped in the tab order — so only automated submitters fill it in.
 */
export function Honeypot(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input
        id="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...props}
      />
    </div>
  );
}
