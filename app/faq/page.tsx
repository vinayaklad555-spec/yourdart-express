import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/typography";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { CtaBand } from "@/components/shared/cta-band";
import { Reveal } from "@/components/shared/reveal";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { faqs, faqCategories, faqsByCategory } from "@/content/faq";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about getting started with Your Dart Express, which services are available, how pickup works, coverage, pricing and how to reach the team.",
  path: "/faq",
});

const crumbs = buildCrumbs({ name: "FAQ", path: "/faq" });

export default function FaqPage() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />

      <PageHero
        eyebrow="FAQ"
        heading="Questions, answered straight"
        body="Including the ones where the honest answer is that something is not available yet."
        size="sm"
      />

      <Section tone="canvas" spacing="md">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Category jump list, sticky on desktop */}
          <div className="lg:col-span-3">
            <nav aria-label="FAQ categories" className="lg:sticky lg:top-28">
              <p className="text-[0.6875rem] font-medium tracking-[0.09em] text-ink-400 uppercase">
                Categories
              </p>
              <ul className="mt-4 space-y-2.5 border-l border-line pl-5">
                {faqCategories.map((category) => (
                  <li key={category}>
                    <a
                      href={`#${slugify(category)}`}
                      className="text-[0.875rem] text-ink-400 transition-colors hover:text-ink-950"
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-9">
            <div className="space-y-16">
              {faqCategories.map((category) => {
                const items = faqsByCategory(category);
                if (items.length === 0) return null;

                return (
                  <Reveal key={category}>
                    <section
                      id={slugify(category)}
                      aria-labelledby={`${slugify(category)}-heading`}
                      className="scroll-mt-28"
                    >
                      <Heading
                        as="h2"
                        size="h3"
                        id={`${slugify(category)}-heading`}
                        className="mb-5"
                      >
                        {category}
                      </Heading>
                      <FaqAccordion items={items} />
                    </section>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        heading="Still have a question?"
        body="If it is not answered above, ask us directly. We will give you a straight answer, including when the answer is no."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "Talk to our team", href: "/talk-to-an-expert" }}
      />
    </>
  );
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
