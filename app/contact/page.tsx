import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  ArrowRight,
  Check,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/shared/reveal";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, buildCrumbs } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { site, addressLines, formatAddress } from "@/content/site";
import { faqs } from "@/content/faq";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Your Dart Express about shipping, fulfillment, warehousing, returns or air freight forwarding. Email contact@yourdartexpress.com or call +1 (978) 830-3897.",
  path: "/contact",
});

const crumbs = buildCrumbs({ name: "Contact Us", path: "/contact" });

/**
 * Everything worth putting in a first message. Lifted straight from what the
 * team actually needs to quote — see the "What information do you need to
 * quote?" answer in content/faq.ts, which this mirrors.
 */
const helpfulToInclude = [
  "What you are moving, and roughly how much of it",
  "Where it is collected from and where it is going",
  "How often — a one-off, or a regular flow",
  "Any handling requirements: fragile, temperature, hazardous",
  "The date it needs to arrive, if that is fixed",
];

/** The questions people actually ask before making contact. */
const contactFaqs = faqs.filter((f) =>
  [
    "How do I get started with Your Dart Express?",
    "What information do you need to quote?",
    "Do I need to be shipping a certain volume before you will work with me?",
    "How is pricing worked out?",
    "How do I reach the team?",
  ].includes(f.question),
);

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  formatAddress(", "),
)}`;

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema(crumbs), faqSchema(contactFaqs)]} />

      <PageHero
        eyebrow="Contact"
        heading="Tell us what you need to move."
        body="Send us a requirement and a member of the team will come back to you — with a straight answer, including when the answer is that we are not the right fit."
      />

      {/* ------------------------------------------------- form + sidebar */}
      <Section tone="canvas" spacing="lg">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* ---------------------------------------------------- form */}
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Enquiry form"
              heading="Start with what you know."
              lead="An incomplete brief is still worth sending. Most enquiries arrive with the detail half-formed, and shaping it is part of the work."
              headingId="enquiry-heading"
            />

            <div className="mt-9 rounded-xl bg-canvas p-6 shadow-bloom sm:p-8">
              <ContactForm showCountry submitLabel="Send enquiry" />
            </div>
          </div>

          {/* ------------------------------------------------- sidebar */}
          <aside className="lg:col-span-5" aria-label="Contact details">
            <div className="flex flex-col gap-4 lg:sticky lg:top-28">
              {/* ------------------------------------------- office */}
              <div className="rounded-xl bg-accent-100/25 p-6">
                <h2 className="text-[0.6875rem] tracking-[0.09em] text-ink-400 uppercase">
                  Head office
                </h2>

                <div className="mt-5 flex gap-3.5">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-ink-400"
                  />
                  <address className="text-[0.9375rem] leading-relaxed text-ink-700 not-italic">
                    {addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>

                <div className="mt-4 flex gap-3.5">
                  <Mail
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-ink-400"
                  />
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-[0.9375rem] break-all text-ink-700 underline-offset-2 hover:text-ink-950 hover:underline"
                  >
                    {site.contact.email}
                  </a>
                </div>

                <div className="mt-4 flex gap-3.5">
                  <Phone
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-ink-400"
                  />
                  <a
                    href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                    className="text-[0.9375rem] text-ink-700 underline-offset-2 hover:text-ink-950 hover:underline"
                  >
                    {site.contact.phoneDisplay}
                  </a>
                </div>

                {/* border-0: the white fill alone separates it from the
                    lavender card, so the outline is redundant. */}
                <Button
                  href={mapsUrl}
                  variant="outline"
                  size="md"
                  className="mt-6 w-full border-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                  <ExternalLink aria-hidden="true" />
                </Button>
              </div>

              {/*
                Business hours render only when the business has confirmed them.
                They have not, so this block does not appear — rather than
                publishing a guess someone might turn up on.
              */}
              {site.contact.hours ? (
                <div className="rounded-xl bg-accent-100/25 p-6">
                  <h2 className="text-[0.6875rem] tracking-[0.09em] text-ink-400 uppercase">
                    Business hours
                  </h2>
                  <p className="mt-4 flex gap-3.5 text-[0.9375rem] text-ink-700">
                    <Clock
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-ink-400"
                    />
                    {site.contact.hours}
                  </p>
                </div>
              ) : null}

              {/* ------------------------------------------ checklist */}
              <div className="rounded-xl bg-canvas-sunk p-6">
                <h2 className="text-[0.6875rem] tracking-[0.09em] text-ink-400 uppercase">
                  Helpful to include
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {helpfulToInclude.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-accent"
                      />
                      <span className="text-[0.875rem] leading-relaxed text-ink-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ---------------------------------------------- other */}
              <div className="rounded-xl bg-accent-100/25 p-6">
                <h2 className="text-[0.6875rem] tracking-[0.09em] text-ink-400 uppercase">
                  Other ways in
                </h2>
                <ul className="mt-4 space-y-3">
                  {[
                    { label: "Track a shipment", href: "/track" },
                    { label: "Request pricing and a walkthrough", href: "/talk-to-an-expert" },
                    { label: "Partner with us", href: "/partners" },
                    { label: "Work with us", href: "/careers" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-ink-700 hover:text-ink-950"
                      >
                        {link.label}
                        <ArrowRight
                          aria-hidden="true"
                          className="size-3.5 text-ink-400 transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* ------------------------------------------------------- find us */}
      <Section tone="warm" spacing="lg" divider aria-labelledby="find-us-heading">
        <SectionHeader
          eyebrow="Find us"
          heading="Where we are"
          lead={`${site.name} is registered at the address below, which it shares with ${site.family.name}. For anything relating to Globe Dart Gateway, use ${site.family.email}.`}
          headingId="find-us-heading"
        />

        {/*
         * Embedded Google Maps + Street View, added at the owner's request.
         * The keyless share-embed endpoints are used, so there is no API key
         * to manage. CSP: next.config.ts allows exactly this frame origin;
         * the Cookie Policy's third-party section documents the embed.
         */}
        <Reveal className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl border border-line bg-canvas">
            <iframe
              title={`Map showing the ${site.name} office at ${formatAddress(", ")}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(formatAddress(", "))}&output=embed`}
              className="h-[26rem] w-full border-0 sm:h-[30rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            {/* Address card overlaid on the map, as in the reference. */}
            <div className="absolute right-4 bottom-4 left-4 rounded-lg border border-line bg-canvas/95 p-5 backdrop-blur-sm sm:right-auto sm:max-w-[21rem]">
              <p className="text-[0.9375rem] font-medium text-ink-950">{site.name}</p>
              <address className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-700 not-italic">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 border-t border-line pt-4 text-[0.875rem] font-medium text-ink-950 underline-offset-2 hover:underline"
              >
                Open in Google Maps
                <ExternalLink aria-hidden="true" className="size-3.5" />
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-line bg-canvas">
            <iframe
              title={`Street View of ${formatAddress(", ")}`}
              /*
               * This exact pano was verified by hand: it stands on the plaza
               * outside 200 Vesey Street with the Brookfield Place signage in
               * frame. Nearby coordinates snap to indoor store panoramas —
               * do not "tidy" the numbers.
               */
              src="https://www.google.com/maps?layer=c&cbll=40.71453,-74.01495&cbp=12,180,0,0,0&output=svembed"
              className="h-[26rem] w-full border-0 sm:h-[30rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </Section>

      {/* ----------------------------------------------------- contact faq */}
      <Section tone="canvas" spacing="lg" aria-labelledby="contact-faq-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Contact FAQ"
              heading="Before you write to us"
              lead="What to include, how quickly we come back, and how pricing works."
              headingId="contact-faq-heading"
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
              <FaqAccordion items={contactFaqs} />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
