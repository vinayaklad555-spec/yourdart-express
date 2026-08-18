import type { Metadata } from "next";
import { Hero, HeroMarkers } from "@/components/sections/hero";
import { HomeTracking } from "@/components/sections/home-tracking";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { WhyUs } from "@/components/sections/why-us";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Growth } from "@/components/sections/growth";
import { HomeFaq } from "@/components/sections/home-faq";
import { CtaBand } from "@/components/shared/cta-band";
import { JsonLd } from "@/components/shared/json-ld";
import { faqSchema } from "@/lib/jsonld";
import { featuredFaqs } from "@/content/faq";
import { finalCta } from "@/content/home";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: site.url },
};

/**
 * Hero, tracking, what we do, services, why us, how it works, where we are,
 * FAQ — then the closing CTA. Nothing added to make the page look larger.
 *
 * Tracking sits second on purpose: a visitor checking on a parcel has the
 * highest intent and the least patience of anyone who lands here.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd schema={faqSchema(featuredFaqs)} />
      <Hero />
      <HeroMarkers />
      <HomeTracking />
      <WhatWeDo />
      <ServicesShowcase />
      <WhyUs />
      <HowItWorks />
      <Growth />
      <HomeFaq />
      <CtaBand
        heading={finalCta.heading}
        body={finalCta.body}
        primary={finalCta.primaryCta}
        secondary={finalCta.secondaryCta}
      />
    </>
  );
}
