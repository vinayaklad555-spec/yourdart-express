import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, PackageSearch, Clock, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/typography";
import { JsonLd } from "@/components/shared/json-ld";
import { TrackingForm } from "@/components/tracking/tracking-form";
import { buildMetadata, buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Track a Shipment",
  description:
    "Track a Your Dart Express shipment by tracking number, order ID or mobile number to see its current status and full checkpoint history.",
  path: "/track",
});

const crumbs = buildCrumbs({ name: "Track a Shipment", path: "/track" });

const helpers = [
  {
    icon: PackageSearch,
    title: "Where is my tracking number?",
    body: "It is on your booking confirmation and on the despatch email sent when the shipment left. If you bought from a store, it is usually in their shipping notification.",
  },
  {
    icon: Clock,
    title: "Nothing showing yet?",
    body: "A shipment only starts producing scans once it has been collected. If it was booked in the last few hours, that is normal rather than a problem.",
  },
  {
    icon: ShieldCheck,
    title: "Something looks wrong",
    body: "If a shipment is held, delayed or the status does not match what you expect, tell us and we will chase it rather than leaving you to.",
  },
];

export default function TrackPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema(crumbs)} />

      {/* ------------------------------------------------------------ hero */}
      <div className="relative overflow-hidden border-b border-line bg-canvas-warm">
        <div
          aria-hidden="true"
          className="bg-bloom pointer-events-none absolute inset-0"
        />

        <Container className="relative pt-26 pb-16 lg:pt-30 lg:pb-20">

          <div className="mx-auto max-w-[42rem] text-center">
            <p className="text-[0.6875rem] leading-[1.4] tracking-[0.09em] text-ink-400 uppercase">
              Shipment tracking
            </p>
            <h1 className="mt-6 text-[clamp(2rem,1.45rem+2.6vw,3.25rem)] leading-[1.08] font-medium tracking-[-0.015em] text-ink-950">
              Track your shipment
            </h1>
            <p className="mt-5 text-[clamp(1rem,0.96rem+0.22vw,1.125rem)] leading-[1.55] text-ink-400">
              Enter your tracking number, order ID or the mobile number the
              shipment was booked with.
            </p>
          </div>

          <div className="mx-auto mt-9 max-w-[44rem]">
            <TrackingForm />
          </div>
        </Container>
      </div>

      {/* ---------------------------------------------------------- helpers */}
      <Section tone="canvas" spacing="md">
        <Heading as="h2" size="h3">
          Can’t find your shipment?
        </Heading>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {helpers.map((h) => {
            const Icon = h.icon;
            return (
              <li key={h.title} className="rounded-xl border border-line bg-canvas p-6">
                <span
                  aria-hidden="true"
                  className="inline-flex size-9 items-center justify-center rounded-md bg-canvas-sunk text-ink-950"
                >
                  <Icon className="size-4" />
                </span>
                <h3 className="mt-4 text-[1rem] font-medium tracking-[-0.015em] text-ink-950">
                  {h.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">
                  {h.body}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col gap-4 rounded-xl bg-canvas-sunk p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.9375rem] text-ink-700">
            Still stuck? The team can look it up for you.
          </p>
          <div className="flex flex-wrap gap-5">
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink-950 hover:underline"
            >
              <Phone aria-hidden="true" className="size-4 text-ink-400" />
              {site.contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-2 text-[0.9375rem] font-medium break-all text-ink-950 hover:underline"
            >
              <Mail aria-hidden="true" className="size-4 shrink-0 text-ink-400" />
              {site.contact.email}
            </a>
          </div>
        </div>

        <p className="mt-8 text-[0.875rem] leading-relaxed text-ink-400">
          Looking for something else? Read the{" "}
          <Link href="/faq" className="font-medium text-ink-950 underline underline-offset-2">
            frequently asked questions
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="font-medium text-ink-950 underline underline-offset-2">
            contact the team
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
