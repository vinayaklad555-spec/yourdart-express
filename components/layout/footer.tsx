import * as React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import { Logo } from "@/components/shared/logo";
import { site, addressLines } from "@/content/site";
import { footerNav, legalNav } from "@/content/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-canvas-warm">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          {/* ------------------------------------------------ brand column */}
          <div className="lg:col-span-4 lg:pr-8">
            <Logo markId="ydx-footer" />
            <p className="mt-5 max-w-[26rem] text-[0.9375rem] leading-relaxed text-ink-400">
              A logistics partner for growing businesses — shipping, fulfillment,
              warehousing, returns, air freight forwarding and shop and ship,
              coordinated by one team.
            </p>

            <address className="mt-7 space-y-3 text-[0.875rem] not-italic">
              <a
                href={`mailto:${site.contact.email}`}
                className="group flex items-start gap-2.5 break-all text-ink-700 transition-colors hover:text-ink-950"
              >
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-400" />
                {site.contact.email}
              </a>
              <a
                href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-2.5 text-ink-700 transition-colors hover:text-ink-950"
              >
                <Phone aria-hidden="true" className="size-4 shrink-0 text-ink-400" />
                {site.contact.phoneDisplay}
              </a>
              <p className="flex items-start gap-2.5 text-ink-400">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-400" />
                <span>
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
            </address>

            {/* Business hours are not published because they were not confirmed. */}
            {site.contact.hours ? (
              <p className="mt-4 text-[0.875rem] text-ink-400">{site.contact.hours}</p>
            ) : null}
          </div>

          {/* ------------------------------------------------- link columns */}
          <nav aria-label="Footer" className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
              {footerNav.map((column) => (
                <div key={column.heading}>
                  <h2 className="text-[0.6875rem] font-medium tracking-[0.09em] text-ink-400 uppercase">
                    {column.heading}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-[0.875rem] text-ink-400 transition-colors hover:text-ink-950"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* -------------------------------------------------- family notice */}
        <div className="border-t border-line py-6">
          <p className="text-[0.8125rem] leading-relaxed text-ink-400">
            {site.name} is part of the same company family as{" "}
            <a
              href={site.family.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-medium text-ink-700 underline decoration-line-strong underline-offset-2 transition-colors hover:text-ink-950"
            >
              {site.family.name}
              <ArrowUpRight aria-hidden="true" className="size-3" />
            </a>{" "}
            and shares its business address. The two companies maintain separate
            contact identities.
          </p>
        </div>

        {/* ---------------------------------------------------- legal strip */}
        <div className="flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-ink-400">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.8125rem] text-ink-400 transition-colors hover:text-ink-950"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
