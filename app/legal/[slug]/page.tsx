import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Notice } from "@/components/shared/notice";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { publishedLegal, getLegalDocument } from "@/content/legal";
import { site } from "@/content/site";

export function generateStaticParams() {
  return publishedLegal.map((doc) => ({ slug: doc.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDocument(slug);
  if (!doc) return {};

  return buildMetadata({
    title: doc.seo.title,
    description: doc.seo.description,
    path: doc.seo.path,
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getLegalDocument(slug);
  if (!doc) notFound();

  const crumbs = buildCrumbs(
    { name: "Legal", path: `/legal/${doc.slug}` },
    { name: doc.title, path: `/legal/${doc.slug}` },
  );

  return (
    <>
      <JsonLd schema={breadcrumbSchema(crumbs)} />

      <div className="border-b border-line bg-canvas-warm">
        <Container width="default" className="pt-28 pb-14 lg:pt-32">
          <p className="text-[0.6875rem] leading-[1.4] tracking-[0.09em] text-ink-400 uppercase">
            Legal
          </p>
          <h1 className="mt-5 text-[clamp(1.75rem,1.35rem+1.9vw,3rem)] leading-[1.08] font-medium tracking-[-0.032em] text-ink-950">
            {doc.title}
          </h1>
          <p className="mt-4 max-w-[42rem] text-[1.0625rem] leading-[1.6] text-ink-400">
            {doc.summary}
          </p>
          <p className="mt-6 text-[0.8125rem] text-ink-400">
            Last updated{" "}
            <time dateTime={toIsoDate(doc.lastUpdated)}>{doc.lastUpdated}</time>
          </p>
        </Container>
      </div>

      <Container width="default" className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ------------------------------------------------- contents rail */}
          <div className="lg:col-span-4">
            <nav aria-label="Contents" className="lg:sticky lg:top-28">
              <p className="text-[0.6875rem] font-medium tracking-[0.09em] text-ink-400 uppercase">
                Contents
              </p>
              <ul className="mt-4 space-y-2 border-l border-line pl-5">
                {doc.sections.map((section) => (
                  <li key={section.heading}>
                    <a
                      href={`#${slugify(section.heading)}`}
                      className="text-[0.8125rem] leading-snug text-ink-400 transition-colors hover:text-ink-950"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>

              <ul className="mt-8 space-y-2 border-t border-line pt-6">
                {publishedLegal
                  .filter((d) => d.slug !== doc.slug)
                  .map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/legal/${d.slug}`}
                        className="text-[0.8125rem] text-ink-400 transition-colors hover:text-ink-950"
                      >
                        {d.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>

          {/* ------------------------------------------------------- document */}
          <div className="lg:col-span-8">
            {/*
              Visible on purpose. Publishing template legal text without saying
              so would itself be a misrepresentation. Remove by setting
              requiresLegalReview to false once counsel has approved the text.
            */}
            {doc.requiresLegalReview ? (
              <Notice tone="legal" title="Pending legal review" className="mb-10">
                This document is a template prepared for {site.name} and has not
                yet been reviewed by a qualified lawyer. It is published for
                transparency about how the site operates. It does not constitute
                legal advice and should be reviewed and approved by counsel before
                being relied upon.
              </Notice>
            ) : null}

            <div className="space-y-11">
              {doc.sections.map((section) => (
                <section
                  key={section.heading}
                  id={slugify(section.heading)}
                  className="scroll-mt-28"
                >
                  <h2 className="text-[1.1875rem] font-medium tracking-[-0.018em] text-ink-950">
                    {section.heading}
                  </h2>

                  <div className="mt-4 space-y-4 text-[0.9375rem] leading-[1.75] text-ink-400">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.list ? (
                    <ul className="mt-5 space-y-3">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 size-1 shrink-0 rounded-full bg-ink-950"
                          />
                          <span className="text-[0.9375rem] leading-[1.72] text-ink-400">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="mt-14 rounded-xl border border-line bg-canvas-sunk p-6">
              <p className="text-[0.875rem] leading-relaxed text-ink-400">
                Questions about this document? Email{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="font-medium text-ink-800 underline underline-offset-2 hover:text-ink-950"
                >
                  {site.contact.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** "17 August 2026" → "2026-08-17" for the <time> element. */
function toIsoDate(value: string): string {
  const parsed = new Date(`${value} UTC`);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toISOString().slice(0, 10);
}
