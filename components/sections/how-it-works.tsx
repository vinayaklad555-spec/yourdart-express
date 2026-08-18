import * as React from "react";
import { Section, SectionHeader } from "@/components/layout/section";
import { ProcessSteps } from "@/components/shared/process-steps";
import { howItWorks } from "@/content/home";

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      tone="dark"
      spacing="lg"
      className="overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      <div
        aria-hidden="true"
        className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60"
      />

      <div className="relative">
        <SectionHeader
          eyebrow={howItWorks.eyebrow}
          heading={howItWorks.heading}
          lead={howItWorks.body}
          headingId="how-it-works-heading"
          tone="dark"
        />
        <ProcessSteps steps={howItWorks.steps} tone="dark" className="mt-16" />
      </div>
    </Section>
  );
}
