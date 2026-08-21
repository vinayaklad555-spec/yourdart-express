import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeader } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Notice } from "@/components/shared/notice";
import { CtaBand } from "@/components/shared/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { partners } from "@/content/company";

export const metadata: Metadata = buildMetadata({
  title: "Partners",
  description:
    "Your Dart Express is building its partner network across carriers, warehouse operators, customs brokers and platforms. No partnership is listed here until it is real and agreed.",
  path: "/partners",
});

const crumbs = buildCrumbs({ name: "Partners", path: "/partners" });

export default function PartnersPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow={partners.hero.eyebrow}
        heading={partners.hero.heading}
        body={partners.hero.body}
      />

      <Section tone="canvas" spacing="md" aria-labelledby="looking-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Partner network"
              heading="Who we are looking to work with"
              lead={partners.intro}
              headingId="looking-heading"
            />
            <Reveal>
              <Notice tone="info" className="mt-8">
                {partners.disclosure}
              </Notice>
            </Reveal>
          </div>

          <RevealGroup as="ul" className="grid gap-4 lg:col-span-7">
            {partners.lookingFor.map((item) => (
              <RevealItem as="li" key={item.title}>
                <Card variant="outline" padding="md">
                  <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-ink-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">
                    {item.body}
                  </p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CtaBand
        heading={partners.cta.heading}
        body={partners.cta.body}
        primary={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "About us", href: "/about" }}
      />
    </>
  );
}
