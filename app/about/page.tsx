import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeader } from "@/components/layout/section";
import { Heading } from "@/components/ui/typography";
import { CtaBand } from "@/components/shared/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { about } from "@/content/company";
import { site, addressLines } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Your Dart Express is a young logistics company handling shipping, fulfillment, warehousing, returns and air freight forwarding — and honest about what it has not built yet.",
  path: "/about",
});

const crumbs = buildCrumbs({ name: "About Us", path: "/about" });

const links = [
  { label: "Our Approach", href: "/approach" },
  { label: "Our Technology", href: "/technology" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Careers", href: "/careers" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow={about.hero.eyebrow}
        heading={about.hero.heading}
        body={about.hero.body}
      />

      {/* -------------------------------------------------------- who we are */}
      <Section tone="canvas" spacing="md" aria-labelledby="who-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Who we are"
              heading={about.whoWeAre.heading}
              headingId="who-heading"
            />
          </div>
          <Reveal className="lg:col-span-7">
            <div className="space-y-4 text-[0.9375rem] leading-[1.72] text-ink-400 sm:text-base">
              {about.whoWeAre.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-line bg-canvas-sunk p-6">
              <p className="text-[0.6875rem] font-medium tracking-[0.09em] text-ink-400 uppercase">
                Registered address
              </p>
              <address className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700 not-italic">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={site.family.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-[0.875rem] font-medium text-ink-950 hover:text-ink-400"
              >
                {site.family.name}
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------ what we are building */}
      <Section tone="warm" spacing="lg" divider aria-labelledby="building-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="What we are building"
              heading={about.whatWereBuilding.heading}
              headingId="building-heading"
            />
          </div>
          <Reveal className="lg:col-span-7">
            <div className="space-y-4 text-[0.9375rem] leading-[1.72] text-ink-400 sm:text-base">
              {about.whatWereBuilding.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* -------------------------------------------------------- principles */}
      <Section tone="canvas" spacing="lg" aria-labelledby="principles-heading">
        <SectionHeader
          eyebrow="How we operate"
          heading="Four things we hold ourselves to"
          headingId="principles-heading"
          align="center"
        />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-md bg-line sm:grid-cols-2 lg:grid-cols-4">
          {about.principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <RevealItem key={principle.title} className="bg-canvas">
                <div className="h-full p-6 lg:p-7">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-9 items-center justify-center rounded-lg bg-canvas-sunk text-ink-950 ring-1 ring-line"
                  >
                    <Icon className="size-4" />
                  </span>
                  <h3 className="mt-5 text-[1rem] font-medium tracking-[-0.015em] text-ink-950">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">
                    {principle.body}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* ------------------------------------------------- vision + honesty */}
      <Section tone="warm" spacing="lg" divider>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl border border-line bg-canvas p-8">
              <Heading as="h2" size="h3">
                {about.vision.heading}
              </Heading>
              <p className="mt-4 text-[0.9375rem] leading-[1.72] text-ink-400">
                {about.vision.body}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-xl border border-line bg-canvas-sunk p-8">
              <Heading as="h2" size="h3">
                {about.honesty.heading}
              </Heading>
              <p className="mt-4 text-[0.9375rem] leading-[1.72] text-ink-400">
                {about.honesty.body}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-8">
            {links.map((link) => (
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
        </Reveal>
      </Section>

      <CtaBand
        heading="Work with us early"
        body="We are looking for businesses to grow alongside. Tell us what you need moved and we will tell you plainly whether we can do it."
      />
    </>
  );
}
