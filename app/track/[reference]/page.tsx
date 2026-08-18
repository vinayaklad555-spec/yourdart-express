import type { Metadata } from "next";
import Link from "next/link";
import { PackageSearch, AlertTriangle, Phone, Mail, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/shared/json-ld";
import { TrackingForm } from "@/components/tracking/tracking-form";
import { ShipmentResult } from "@/components/tracking/shipment-result";
import { buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { lookupShipment } from "@/lib/tracking";
import { site } from "@/content/site";
import type { TrackingMethod } from "@/types/tracking";

/**
 * The tracking result page.
 *
 * A server component that performs the lookup directly rather than round-
 * tripping through /api/track — the API route exists for client callers, but
 * here we are already on the server and can skip a hop.
 *
 * Every outcome the adapter can return is rendered explicitly. There is no
 * branch that invents a shipment: when the lookup cannot resolve a reference
 * the page says so and hands the customer to people who can help, which is
 * what a real tracker does when a number does not match.
 */

export const dynamic = "force-dynamic";

const METHODS: TrackingMethod[] = ["reference", "order", "mobile"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reference: string }>;
}): Promise<Metadata> {
  const { reference } = await params;
  const ref = decodeURIComponent(reference);
  return {
    title: `Tracking ${ref}`,
    description: `Current status and checkpoint history for Your Dart Express shipment ${ref}.`,
    // A live result is per-customer and time-sensitive. It has no business in
    // an index, and the reference may identify an individual's delivery.
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function TrackResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ reference: string }>;
  searchParams: Promise<{ by?: string }>;
}) {
  const { reference } = await params;
  const { by } = await searchParams;

  const query = decodeURIComponent(reference);
  const method: TrackingMethod = METHODS.includes(by as TrackingMethod)
    ? (by as TrackingMethod)
    : "reference";

  const result = await lookupShipment(query, method);

  const crumbs = buildCrumbs(
    { name: "Track a Shipment", path: "/track" },
    { name: query, path: `/track/${encodeURIComponent(query)}` },
  );

  return (
    <>
      <JsonLd schema={breadcrumbSchema(crumbs)} />

      <div className="border-b border-line bg-canvas-warm">
        <Container className="pt-26 pb-10 lg:pt-30 lg:pb-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[0.6875rem] leading-[1.4] tracking-[0.09em] text-ink-400 uppercase">
                {method === "mobile"
                  ? "Shipments for"
                  : method === "order"
                    ? "Order"
                    : "Shipment"}
              </p>
              <h1 className="mt-4 font-mono text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] leading-tight break-all text-ink-950">
                {query}
              </h1>
            </div>
            <Button href="/track" variant="outline">
              Track another
            </Button>
          </div>
        </Container>
      </div>

      <Section tone="canvas" spacing="md">
        {result.state === "found" ? (
          <ShipmentResult shipment={result.shipment} />
        ) : result.state === "multiple" ? (
          <div>
            <p className="mb-6 text-[0.9375rem] text-ink-400">
              {result.shipments.length} shipments match. Choose one to see its
              full history.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {result.shipments.map((s) => (
                <li key={s.reference}>
                  <Link
                    href={`/track/${encodeURIComponent(s.reference)}`}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-canvas p-5 transition-colors hover:bg-canvas-sunk"
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.9375rem] break-all text-ink-950">
                        {s.reference}
                      </span>
                      <span className="mt-1 block text-[0.875rem] text-ink-400">
                        {s.status}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <EmptyState result={result} query={query} method={method} />
        )}
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ empty */

function EmptyState({
  result,
  query,
  method,
}: {
  result: Extract<
    Awaited<ReturnType<typeof lookupShipment>>,
    { state: "not_found" | "invalid" | "unavailable" | "error" }
  >;
  query: string;
  method: TrackingMethod;
}) {
  const invalid = result.state === "invalid";
  const errored = result.state === "error";

  const title = invalid
    ? "That does not look like a valid reference"
    : errored
      ? "We could not complete the lookup"
      : "No shipment found for that reference";

  const body = invalid
    ? result.message
    : errored
      ? result.message
      : "Nothing matched it. References are easy to mistype, and a shipment booked very recently may not have produced its first scan yet.";

  return (
    <div className="mx-auto max-w-[46rem]">
      <div className="rounded-xl border border-line bg-canvas px-6 py-10 text-center sm:px-10 sm:py-12">
        <span
          aria-hidden="true"
          className="inline-flex size-12 items-center justify-center rounded-xl bg-canvas-sunk text-ink-400"
        >
          {errored ? (
            <AlertTriangle className="size-5" />
          ) : (
            <PackageSearch className="size-5" />
          )}
        </span>

        <Heading as="h2" size="h3" className="mt-6">
          {title}
        </Heading>

        <p className="mx-auto mt-4 max-w-[34rem] text-[0.9375rem] leading-[1.7] text-ink-400">
          {body}
        </p>

        <ul className="mx-auto mt-6 max-w-[32rem] space-y-2 text-left text-[0.875rem] text-ink-400">
          <li className="flex gap-2.5">
            <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
            Check it character by character against your confirmation email.
          </li>
          <li className="flex gap-2.5">
            <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
            Try a different method — an order ID or the mobile number the
            booking was made with.
          </li>
          <li className="flex gap-2.5">
            <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
            If it was booked today, give it until after collection.
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <p className="mb-4 text-[0.875rem] font-medium text-ink-950">
          Try again
        </p>
        <TrackingForm initialMethod={method} initialValue={invalid ? query : ""} compact />
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-xl bg-canvas-sunk p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.9375rem] text-ink-700">
          Rather have a person look? Send us the reference.
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
            href={`mailto:${site.contact.email}?subject=${encodeURIComponent(`Shipment status — ${query}`)}`}
            className="inline-flex items-center gap-2 text-[0.9375rem] font-medium break-all text-ink-950 hover:underline"
          >
            <Mail aria-hidden="true" className="size-4 shrink-0 text-ink-400" />
            {site.contact.email}
          </a>
        </div>
      </div>
    </div>
  );
}
