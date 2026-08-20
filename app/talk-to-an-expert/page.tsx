import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/typography";
import { Notice } from "@/components/shared/notice";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/shared/reveal";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { talkToAnExpert } from "@/content/company";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Talk to an Expert — Pricing & Demo",
  description:
    "Get a quote from Your Dart Express based on your actual shipments. No published rate card, no headline number that changes once we understand your volumes.",
  path: "/talk-to-an-expert",
});

const crumbs = buildCrumbs({
  name: "Talk to an Expert",
  path: "/talk-to-an-expert",
});

export default function TalkToAnExpertPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow={talkToAnExpert.hero.eyebrow}
        heading={talkToAnExpert.hero.heading}
        body={talkToAnExpert.hero.body}
        size="sm"
      />

      <Section tone="canvas" spacing="md">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* -------------------------------------------------- what happens */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Heading as="h2" size="h3" id="expect-heading">
                What happens next
              </Heading>

              <ol className="mt-8 space-y-px">
                {talkToAnExpert.whatToExpect.map((step) => (
                  <li key={step.step} className="flex gap-4 border-t border-line py-5 last:border-b">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 font-mono text-[0.75rem] tracking-tight text-ink-950"
                    >
                      {step.step}
                    </span>
                    <div>
                      <h3 className="text-[1rem] font-medium tracking-[-0.015em] text-ink-950">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-400">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <Reveal>
                <Notice tone="info" className="mt-8">
                  {talkToAnExpert.note}
                </Notice>
              </Reveal>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2.5 text-[0.9375rem] text-ink-700 transition-colors hover:text-ink-950"
                >
                  <Phone aria-hidden="true" className="size-4 text-ink-400" />
                  {site.contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2.5 text-[0.9375rem] break-all text-ink-700 transition-colors hover:text-ink-950"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-ink-400" />
                  {site.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------- form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl bg-canvas p-6 shadow-bloom sm:p-9">
              <Heading as="h2" size="h3">
                Request a quote
              </Heading>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-400">
                Tell us what you are moving, where it goes and roughly how often.
              </p>
              <div className="mt-8">
                {/*
                   * `showCountry` matters MORE here than on /contact: this is
                   * the pricing page, and the FAQ states pricing depends on
                   * the route. Origin country is the one structured field
                   * that materially changes a quote.
                   */}
                  <ContactForm showCountry submitLabel="Request a quote" />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
