import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/layout/section";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { featuredFaqs } from "@/content/faq";

export function HomeFaq() {
  return (
    <Section id="faq" tone="canvas" spacing="lg" divider aria-labelledby="faq-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeader
            eyebrow="FAQ"
            heading="Questions we get asked"
            lead="Straight answers, including where the answer is that something is not available yet."
            headingId="faq-heading"
          />
          <Reveal>
            <Button href="/faq" variant="outline" className="mt-7">
              All questions
              <ArrowRight aria-hidden="true" />
            </Button>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal>
            <FaqAccordion items={featuredFaqs} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
