import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { pageHeroImages } from "@/content/media";
import { Section, SectionHeader } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/shared/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { careers } from "@/content/company";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Your Dart Express is an early-stage logistics company. No roles are advertised right now, but open applications are read — tell us what you would want to build here.",
  path: "/careers",
});

const crumbs = buildCrumbs({ name: "Careers", path: "/careers" });

export default function CareersPage() {
  const hasRoles = careers.openRoles.length > 0;

  return (
    <>
      <JsonLd schema={breadcrumbSchema(crumbs)} />

      <PageHero
        image={pageHeroImages.careers}
        eyebrow={careers.hero.eyebrow}
        heading={careers.hero.heading}
        body={careers.hero.body}
      />

      <Section tone="canvas" spacing="md" aria-labelledby="life-heading">
        <SectionHeader
          eyebrow="What it is like"
          heading="Small team, real ownership"
          headingId="life-heading"
        />

        <RevealGroup as="ul" className="mt-12 grid gap-4 sm:grid-cols-3">
          {careers.whatItsLike.map((item) => (
            <RevealItem as="li" key={item.title}>
              <Card variant="outline" padding="md" className="h-full">
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
      </Section>

      {/* -------------------------------------------------------- open roles */}
      <Section tone="warm" spacing="lg" divider aria-labelledby="roles-heading">
        <SectionHeader
          eyebrow="Open roles"
          heading={hasRoles ? "Current openings" : careers.openApplication.heading}
          headingId="roles-heading"
        />

        {hasRoles ? (
          <RevealGroup as="ul" className="mt-10 divide-y divide-line border-y border-line">
            {careers.openRoles.map((role) => (
              <RevealItem as="li" key={role.title}>
                <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-[1.0625rem] font-medium text-ink-950">
                      {role.title}
                    </h3>
                    <p className="mt-1 text-[0.875rem] text-ink-400">
                      {role.location} · {role.type}
                    </p>
                    <p className="mt-2 max-w-[42rem] text-[0.9375rem] text-ink-400">
                      {role.summary}
                    </p>
                  </div>
                  <Button href={`mailto:${site.contact.email}?subject=${encodeURIComponent(role.title)}`} variant="outline" className="shrink-0">
                    Apply
                  </Button>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <Reveal>
            <div className="mt-10 rounded-xl border border-line bg-canvas px-6 py-12 sm:px-12 sm:py-14">
              <span
                aria-hidden="true"
                className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-canvas-sunk text-ink-400"
              >
                <Briefcase className="size-5" />
              </span>
              <Heading as="h3" size="h3" className="mt-6">
                Open applications welcome
              </Heading>
              <p className="mt-4 max-w-[40rem] text-[0.9375rem] leading-[1.72] text-ink-400">
                {careers.openApplication.body}
              </p>
              <Button
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Open application")}`}
                size="lg"
                className="mt-8"
              >
                Email us your details
              </Button>
              <p className="mt-4 text-[0.8125rem] text-ink-400">
                Send to {site.contact.email}
              </p>
            </div>
          </Reveal>
        )}
      </Section>

      <CtaBand
        heading="Rather talk about shipping?"
        body="If you landed here looking for logistics support instead, tell us what you need moved."
        primary={{ label: "Talk to our team", href: "/talk-to-an-expert" }}
        secondary={{ label: "See our services", href: "/services" }}
      />
    </>
  );
}
