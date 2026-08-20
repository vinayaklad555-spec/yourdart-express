import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { publishedServices } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for does not exist.",
  robots: { index: false, follow: true },
};

const destinations = [
  { label: "Home", href: "/" },
  { label: "All services", href: "/services" },
  { label: "About us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-canvas-warm">
      <div
        aria-hidden="true"
        className="bg-grid mask-fade pointer-events-none absolute inset-0 opacity-60"
      />

      <Container width="default" className="relative py-32 lg:py-40">
        <div className="mx-auto max-w-[38rem] text-center">
          <span
            aria-hidden="true"
            className="inline-flex size-12 items-center justify-center rounded-xl border border-line bg-canvas text-ink-400"
          >
            <Search className="size-5" />
          </span>

          <p className="mt-7 font-mono text-[0.8125rem] tracking-tight text-ink-950">
            404
          </p>

          <h1 className="mt-3 text-[clamp(1.75rem,1.35rem+1.9vw,2.75rem)] leading-[1.1] font-medium tracking-[-0.015em] text-ink-950">
            This page has not arrived
          </h1>

          <p className="mx-auto mt-5 max-w-[30rem] text-[1.0625rem] leading-[1.6] text-ink-400">
            The address you followed does not lead anywhere on this site. It may
            have moved, or the link may be wrong.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/" size="lg">
              Back to home
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Contact us
            </Button>
          </div>

          <nav aria-label="Popular pages" className="mt-14 border-t border-line pt-8">
            <p className="text-[0.6875rem] font-medium tracking-[0.09em] text-ink-400 uppercase">
              Popular pages
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2.5">
              {destinations.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.875rem] text-ink-400 transition-colors hover:text-ink-950"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2.5">
              {publishedServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-[0.875rem] text-ink-400 transition-colors hover:text-ink-950"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-10 text-[0.8125rem] text-ink-400">
            Still stuck? Email{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="font-medium text-ink-700 underline underline-offset-2 hover:text-ink-950"
            >
              {site.contact.email}
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
