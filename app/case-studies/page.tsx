import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { pageHeroImages } from "@/content/media";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/shared/cta-band";
import { Reveal } from "@/components/shared/reveal";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { publishedCaseStudies } from "@/content/industries";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Your Dart Express has not published case studies yet. We will publish real customer results, with the customer named and their permission given — not before.",
  path: "/case-studies",
});

const crumbs = buildCrumbs({ name: "Case Studies", path: "/case-studies" });

/**
 * DELIBERATE EMPTY STATE.
 *
 * The route exists because the information architecture calls for it, and the
 * layout is ready for real entries. Until a genuine customer engagement is
 * complete and that customer has approved being named, this page says so.
 * Inventing a case study is not an option, and a page that admits it has none
 * is more persuasive than one that fabricates three.
 */
export default function CaseStudiesPage() {
  const hasStudies = publishedCaseStudies.length > 0;

  return (
    <>
      <JsonLd schema={breadcrumbSchema(crumbs)} />

      <PageHero
        image={pageHeroImages.caseStudies}
        eyebrow="Case studies"
        heading="We would rather have none than invent one"
        body="This is where customer results will go. Right now there are none to show, and we are not going to write three fictional ones to fill the space."
      />

      <Section tone="canvas" spacing="md">
        {hasStudies ? (
          <ul className="grid gap-4 md:grid-cols-2">
            {publishedCaseStudies.map((study) => (
              <li
                key={study.slug}
                className="rounded-xl border border-line bg-canvas p-7"
              >
                <p className="text-[0.6875rem] font-medium tracking-[0.09em] text-ink-400 uppercase">
                  {study.industry}
                </p>
                <h2 className="mt-3 text-[1.25rem] font-medium tracking-[-0.015em] text-ink-950">
                  {study.client}
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-400">
                  {study.summary}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal>
            <div className="mx-auto max-w-[46rem] rounded-xl border border-line bg-canvas-sunk px-6 py-14 text-center sm:px-12 sm:py-16">
              <span
                aria-hidden="true"
                className="inline-flex size-12 items-center justify-center rounded-xl border border-line bg-canvas text-ink-400"
              >
                <FileText className="size-5" />
              </span>

              <Heading as="h2" size="h3" className="mt-6">
                No published case studies yet
              </Heading>

              <div className="mx-auto mt-5 max-w-[38rem] space-y-4 text-[0.9375rem] leading-[1.72] text-ink-400">
                <p>
                  Your Dart Express is a young company. A case study is only worth
                  reading if the customer is real, the numbers came from their
                  operation rather than ours, and they agreed to have their name on
                  it. We do not have one that meets that bar yet.
                </p>
                <p>
                  When we do, it will appear here — with the customer named, the
                  problem described as they described it, and the outcome stated
                  as it actually was.
                </p>
              </div>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="/talk-to-an-expert" size="lg">
                  Talk to our team
                </Button>
                <Button href="/services" size="lg" variant="outline">
                  See what we do
                </Button>
              </div>
            </div>
          </Reveal>
        )}

        {/* Something useful to read instead of an empty page */}
        <Reveal>
          <div className="mx-auto mt-14 max-w-[46rem] border-t border-line pt-10">
            <h2 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-ink-950">
              In the meantime
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-400">
              Judge us on how we describe the work rather than on customers we
              cannot yet point to. These pages set out exactly how each service
              runs and where the limits are.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {[
                { label: "How we work", href: "/approach" },
                { label: "What we do", href: "/services" },
                { label: "For DTC brands", href: "/industries/dtc" },
                { label: "For B2B", href: "/industries/b2b" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-ink-950 hover:text-ink-400"
                  >
                    {link.label}
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        heading="Be one of the first"
        body="We are looking for businesses to grow alongside. If that sounds like you, tell us what you need moved."
      />
    </>
  );
}
