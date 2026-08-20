"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { site } from "@/content/site";

/*
 * Same story as lib/validation.ts: Zod v4 probes for `new Function` support,
 * which our CSP (no 'unsafe-eval') logs as a violation. That file's config
 * call never runs in THIS bundle — the auth pages don't import it — so the
 * opt-out is repeated here. It is idempotent; duplication is harmless.
 */
z.config({ jitless: true });

/*
 * CREDENTIAL HANDLING — read before changing anything here.
 *
 * There is no authentication backend yet: no user store, nothing to check a
 * password against, nowhere safe to keep one. The forms are fully live in the
 * browser — validation, visibility toggle, submit states — but nothing typed
 * here EVER leaves the page. There is deliberately no fetch() in this file
 * and no action on either form. Submitting runs a local check and reports
 * the truthful result: no account exists, because accounts have not been
 * opened yet.
 *
 * When real authentication ships, replace `submit()` with the API call and
 * everything else stays.
 *
 * LAYOUT is the benchmark's application screen: heading and a lean form on
 * the left, a warm panel with photography on the right, the legal line at
 * the foot of the column. Sign-up asks for the work email only, exactly as
 * the benchmark does — everything else is a conversation with the team.
 */

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your work email.")
    .email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter your password."),
});

const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your work email.")
    .email("Please enter a valid email address."),
  password: z.string().optional(),
});

type AuthValues = { email: string; password?: string };

export function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";
  const [showPassword, setShowPassword] = React.useState(false);
  const [checking, setChecking] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthValues>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    defaultValues: { email: "", password: "" },
  });

  const submit = async (values: AuthValues) => {
    setResult(null);
    setChecking(true);
    // Local only — see the header comment. Nothing is transmitted.
    await new Promise((r) => setTimeout(r, 450));
    setChecking(false);
    setResult(
      isLogin
        ? `We could not find an account for ${values.email}. Customer accounts are being set up with our first clients directly — talk to our team and we will get yours ready.`
        : `Thanks — self-serve sign-up is not open yet. Talk to our team and we will set up the account for ${values.email} with your first shipment.`,
    );
  };

  return (
    <div className="bg-canvas">
      {/*
       * The site header is `fixed`, so every page supplies its own top
       * padding to clear it. The header eats 4rem (4.5rem at lg), so the
       * VISUAL padding is that much less than the number here reads.
       */}
      <Container className="pt-30 pb-20 lg:pt-36 lg:pb-28">
        <div className="grid gap-12 lg:min-h-[44rem] lg:grid-cols-12 lg:gap-14">
          {/* -------------------------------------------------- form column */}
          <div className="w-full max-w-[31.25rem] lg:col-span-5 lg:grid lg:grid-rows-[1fr_auto]">
            <div className="flex flex-col lg:justify-center">
            {/*
             * Type scale measured off the benchmark's signup page:
             * h1 48px / 50px line / weight 400 (NOT medium — the restraint is
             * the point), subhead 18px / 24px, and a 24px gap between them.
             */}
            <h1 className="text-[clamp(2.25rem,1.9rem+1.5vw,3rem)] leading-[1.042] font-medium tracking-[-0.015em] text-ink-950">
              {isLogin ? (
                "Pick up where you left off."
              ) : (
                <>Get started with {site.name}.</>
              )}
            </h1>
            <p className="mt-2 text-[1rem] leading-[1.6] text-ink-700">
              {isLogin
                ? "Sign in and we will take it from there."
                : "Shipping, fulfillment, warehousing and returns — coordinated by one team."}
            </p>

            {/* 32px from the subhead, 8px between field and CTA — theirs. */}
            <form onSubmit={handleSubmit(submit)} className="mt-8 flex flex-col gap-2" noValidate>
              <Field id="auth-email" label="Work email" labelHidden error={errors.email?.message} required>
                {(props) => (
                  <Input
                    {...props}
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="What's your work email?"
                  />
                )}
              </Field>

              {isLogin ? (
                <Field id="auth-password" label="Password" labelHidden error={errors.password?.message} required>
                  {(props) => (
                    <div className="relative">
                      <Input
                        {...props}
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Your password"
                        className="pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-lg text-ink-400 hover:text-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-950"
                      >
                        {showPassword ? (
                          <EyeOff aria-hidden="true" className="size-4" />
                        ) : (
                          <Eye aria-hidden="true" className="size-4" />
                        )}
                      </button>
                    </div>
                  )}
                </Field>
              ) : null}

              <Button type="submit" size="lg" className="w-full" disabled={checking}>
                {checking ? "One moment…" : isLogin ? "Log in" : "Continue"}
              </Button>
            </form>

            {/* Truthful outcome, announced politely to screen readers too. */}
            <div role="status" aria-live="polite">
              {result ? (
                <div className="mt-5 rounded-lg border border-accent-200 bg-accent-100/30 p-4">
                  <p className="text-[0.875rem] leading-relaxed text-ink-800">{result}</p>
                  <Button href="/talk-to-an-expert" size="sm" className="mt-3">
                    Talk to our team
                    <ArrowRight aria-hidden="true" />
                  </Button>
                </div>
              ) : null}
            </div>

            <p className="mt-[1.125rem] text-center text-[0.8125rem] text-ink-400">
              {isLogin ? (
                <>
                  Don&rsquo;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-ink-950 underline underline-offset-2 hover:text-ink-400"
                  >
                    Create one
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-ink-950 underline underline-offset-2 hover:text-ink-400"
                  >
                    Log in
                  </Link>
                </>
              )}
            </p>

            </div>

            <p className="mt-12 text-center text-[0.8125rem] leading-relaxed text-ink-400 lg:mt-0 lg:pt-12">
              By continuing, you agree to our{" "}
              <Link
                href="/legal/terms-of-use"
                className="underline underline-offset-2 hover:text-ink-950"
              >
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link
                href="/legal/privacy-policy"
                className="underline underline-offset-2 hover:text-ink-950"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* -------------------------------------------------- visual panel */}
          <div className="hidden lg:col-span-7 lg:block">
            {/*
             * Owner-supplied artwork (Images/purple aura flower wallpaper
             * version 2 1.png). Decorative, so alt is empty — nothing here
             * carries meaning the form does not already state.
             */}
            {/* Both auth pages share one treatment: the elliptical dissolve. */}
              <div className="mask-edges relative h-full min-h-[44rem] overflow-hidden">
              <Image
                src="/images/auth-aura.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 58vw, 0px"
                className="object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
