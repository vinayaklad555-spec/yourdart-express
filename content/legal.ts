import type { LegalDocument } from "@/types/content";
import { site, formatAddress } from "./site";

/**
 * ⚠️  INTERNAL NOTICE — READ BEFORE PRODUCTION LAUNCH
 * ---------------------------------------------------------------------------
 * Every document in this file is TEMPLATE SCAFFOLDING. It reflects the site's
 * actual technical behaviour (no analytics, no third-party trackers, a single
 * contact form that sends email) and is deliberately conservative. It has NOT
 * been reviewed by a qualified lawyer.
 *
 * It does not account for jurisdiction-specific obligations, the company's
 * carriage terms, liability limits, insurance position, claims procedure,
 * prohibited-goods list, or the customs and international-trade obligations
 * that a freight forwarder in particular is subject to.
 *
 * `requiresLegalReview: true` renders a visible review banner on each page.
 * Set it to false only once counsel has approved the final text.
 * See docs/LEGAL-REVIEW.md for the full handover checklist.
 */

const contactLine = `${site.contact.email} or by post at ${formatAddress()}`;
const effectiveDate = "17 August 2026";

export const legalDocuments: LegalDocument[] = [
  // ======================================================== PRIVACY POLICY
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary:
      "What personal information we collect, why we collect it, how long we keep it and what rights you have over it.",
    lastUpdated: effectiveDate,
    published: true,
    requiresLegalReview: true,
    sections: [
      {
        heading: "1. Who we are",
        paragraphs: [
          `${site.legalName} ("we", "us", "our") operates the website at ${site.domain} and provides logistics services including shipping, fulfillment, warehousing, reverse logistics, air freight forwarding and package forwarding.`,
          `We are the controller of the personal information described in this policy. You can reach us at ${contactLine}.`,
          `${site.name} is part of the same company family as ${site.family.name} and shares its business address. The two companies maintain separate contact identities.`,
        ],
      },
      {
        heading: "2. Information we collect",
        paragraphs: [
          "We collect only the information we need in order to respond to you and to provide the services you ask for. In practice this falls into three groups.",
        ],
        list: [
          "Information you give us directly. When you submit our contact or enquiry forms, we collect your name, email address, phone number, company name, the service you are enquiring about and the content of your message.",
          "Information required to carry out a service. If you become a customer, we process the details necessary to move, store or fulfil goods — including collection and delivery addresses, recipient contact details, consignment contents, weights and dimensions, and any handling instructions you provide.",
          "Technical information. Our hosting provider records standard server log data, such as IP address, browser type and the pages requested, for the purposes of operating and securing the site.",
        ],
      },
      {
        heading: "3. Information we do not collect",
        paragraphs: [
          "We do not run third-party advertising or analytics scripts on this website. We do not build advertising profiles, and we do not sell or rent personal information to anybody.",
          "The log-in and sign-up pages on this website are an interface preview and are not connected to a live authentication system. They do not create accounts, and no password submitted through them is stored, transmitted to a server or otherwise retained.",
        ],
      },
      {
        heading: "4. Why we process your information",
        paragraphs: [
          "We process personal information on the following bases:",
        ],
        list: [
          "To respond to enquiries you send us — because you have asked us to, and because we have a legitimate interest in answering people who contact us.",
          "To provide services you have engaged us for — because it is necessary to perform our contract with you.",
          "To comply with legal obligations — including customs, trade, tax and record-keeping requirements that apply to logistics and air freight forwarding.",
          "To keep our site and systems secure and to prevent misuse — because we have a legitimate interest in doing so.",
        ],
      },
      {
        heading: "5. Sharing your information",
        paragraphs: [
          "Delivering a shipment necessarily involves other parties. Where a service requires it, we share the minimum information needed with carriers and last-mile delivery providers, warehouse and fulfilment operators, customs brokers and freight agents, and the relevant customs or border authorities.",
          "We also use service providers that support our own operations, including our website host and our email provider. These providers process information on our instructions and are not permitted to use it for their own purposes.",
          "We may disclose information where we are legally required to do so, or where it is necessary to establish, exercise or defend legal claims.",
        ],
      },
      {
        heading: "6. International transfers",
        paragraphs: [
          "Where a shipment crosses a border, information about that shipment will be transferred to parties in the destination country, including customs authorities, because the movement of goods cannot happen otherwise.",
          "Where personal information is transferred outside the jurisdiction in which it was collected, we take steps to ensure an appropriate level of protection applies to that transfer.",
        ],
      },
      {
        heading: "7. How long we keep information",
        paragraphs: [
          "Enquiry correspondence is kept for as long as needed to deal with your enquiry and for a reasonable period afterwards in case you come back to us.",
          "Records relating to shipments and services performed are kept for as long as required to meet our legal, tax, customs and accounting obligations, and to handle any claim arising from the service.",
          "We review what we hold periodically and delete information that no longer serves a purpose.",
        ],
      },
      {
        heading: "8. Your rights",
        paragraphs: [
          "Depending on where you are located, you may have rights to access the personal information we hold about you, to have inaccurate information corrected, to request erasure, to restrict or object to certain processing, and to receive your information in a portable format.",
          `To exercise any of these rights, contact us at ${site.contact.email}. We will respond within the period required by applicable law. If you are not satisfied with our response, you may have the right to complain to your local data protection authority.`,
        ],
      },
      {
        heading: "9. Security",
        paragraphs: [
          "We take reasonable technical and organisational measures to protect personal information against unauthorised access, loss and misuse. Our website is served over HTTPS and credentials for our systems are held in server-side environment configuration, never in code delivered to your browser.",
          "No method of transmission or storage is completely secure, and we do not claim otherwise. Our Data Security page describes our approach in more detail.",
        ],
      },
      {
        heading: "10. Children",
        paragraphs: [
          "Our services are directed at businesses. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, contact us and we will delete it.",
        ],
      },
      {
        heading: "11. Changes to this policy",
        paragraphs: [
          "We may update this policy as our services and obligations develop. The date at the top of this page shows when it was last revised. Material changes will be highlighted on this page.",
        ],
      },
      {
        heading: "12. Contact",
        paragraphs: [
          `For any question about this policy or about how we handle personal information, contact us at ${contactLine}, or by phone on ${site.contact.phoneDisplay}.`,
        ],
      },
    ],
    seo: {
      title: "Privacy Policy",
      description:
        "How Your Dart Express collects, uses, shares and retains personal information, and the rights you have over it.",
      path: "/legal/privacy-policy",
    },
  },

  // ========================================================== TERMS OF USE
  {
    slug: "terms-of-use",
    title: "Terms of Use",
    summary:
      "The terms that apply to your use of this website. Logistics services are governed by a separate service agreement.",
    lastUpdated: effectiveDate,
    published: true,
    requiresLegalReview: true,
    sections: [
      {
        heading: "1. About these terms",
        paragraphs: [
          `These terms govern your use of the website at ${site.domain}, operated by ${site.legalName}. By using this website, you agree to them. If you do not agree, please do not use the site.`,
          "These terms cover the website only. They are not the terms on which we provide logistics services. Shipping, fulfillment, warehousing, reverse logistics, air freight forwarding and package forwarding are provided under a separate written agreement, which governs matters including carriage, liability, insurance, claims, prohibited goods and payment.",
        ],
      },
      {
        heading: "2. Using this website",
        paragraphs: ["You agree that you will not:"],
        list: [
          "Use the site for any unlawful purpose, or in any way that breaches applicable law.",
          "Attempt to gain unauthorised access to the site, its server, or any system or network connected to it.",
          "Interfere with the proper operation of the site, including by introducing malicious code or placing unreasonable load on it.",
          "Scrape, copy or systematically extract content from the site for commercial purposes without our written permission.",
          "Submit information through our forms that is false, misleading, or that you are not entitled to provide.",
        ],
      },
      {
        heading: "3. Information on this site",
        paragraphs: [
          "The content of this site is provided for general information about our services. We take care to keep it accurate, but it does not constitute a quotation, an offer, or a commitment to provide a particular service on particular terms.",
          "Whether we can carry out a specific shipment or service is confirmed with you directly before we accept a booking. Serviceability, timelines, handling requirements and pricing are agreed on a case-by-case basis and are not represented by anything published on this site.",
        ],
      },
      {
        heading: "4. Account preview pages",
        paragraphs: [
          "This website includes log-in and sign-up pages that demonstrate a future account experience. They are clearly labelled as a preview. They are not connected to any authentication system, they do not create accounts, and they do not store or transmit credentials. Do not submit a password you use elsewhere.",
        ],
      },
      {
        heading: "5. Intellectual property",
        paragraphs: [
          `The content, design, layout, graphics and branding of this website are owned by ${site.legalName} or licensed to us, and are protected by intellectual property law.`,
          "You may view and print pages for your own reference. Any other use — including reproduction, redistribution or commercial exploitation — requires our written permission. The Your Dart Express name and logo may not be used without our consent.",
        ],
      },
      {
        heading: "6. Third-party links",
        paragraphs: [
          "This site may link to third-party websites, including the website of Globe Dart Gateway Inc. We provide those links for convenience. We do not control third-party sites and we are not responsible for their content, their availability or their privacy practices.",
        ],
      },
      {
        heading: "7. Availability and disclaimers",
        paragraphs: [
          "We aim to keep this website available, but we do not guarantee uninterrupted access. We may suspend, withdraw or change any part of the site without notice.",
          "To the fullest extent permitted by law, this website is provided on an 'as is' basis and we exclude all warranties, express or implied, relating to it.",
        ],
      },
      {
        heading: "8. Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, we are not liable for any loss or damage arising from your use of, or inability to use, this website, or from reliance on any content published on it.",
          "Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limited. Liability arising in connection with logistics services we perform is dealt with in the applicable service agreement, not here.",
        ],
      },
      {
        heading: "9. Changes to these terms",
        paragraphs: [
          "We may revise these terms from time to time. The revised version applies from the date it is published on this page. Please check back periodically.",
        ],
      },
      {
        heading: "10. Governing law and contact",
        paragraphs: [
          "The governing law and jurisdiction applicable to these terms will be stated here following legal review.",
          `Questions about these terms can be sent to ${contactLine}.`,
        ],
      },
    ],
    seo: {
      title: "Terms of Use",
      description:
        "The terms governing use of the Your Dart Express website. Logistics services are provided under a separate service agreement.",
      path: "/legal/terms-of-use",
    },
  },

  // ========================================================== COOKIE POLICY
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    summary:
      "This website does not use tracking or advertising cookies. Here is exactly what that means.",
    lastUpdated: effectiveDate,
    published: true,
    requiresLegalReview: true,
    sections: [
      {
        heading: "1. The short version",
        paragraphs: [
          "This website does not use advertising cookies, analytics cookies, or any third-party tracking technology in its own pages. We do not run Google Analytics, advertising pixels, social media trackers, session recording or heat-mapping tools.",
          "The one third-party element on this site is the map on our contact page, which is provided by Google Maps inside an embedded frame. Google may set cookies from within that frame; those cookies are set by Google, governed by Google's own privacy policy, and are not readable by us. If you do not want them, do not interact with the map — the rest of the site works without it.",
          "Because we set no non-essential cookies, this site does not display a cookie consent banner. That is not an oversight — there is nothing to consent to.",
        ],
      },
      {
        heading: "2. What cookies are",
        paragraphs: [
          "Cookies are small text files a website can store on your device. They are commonly used to keep you signed in, to remember preferences, or to track behaviour across sites for advertising purposes.",
        ],
      },
      {
        heading: "3. What this site uses",
        paragraphs: [
          "At present, this website sets no cookies of its own for tracking, analytics or advertising.",
          "Strictly necessary technology may be used to keep the site secure and functioning — for example, protecting our contact form against automated abuse. Anything of this kind is essential to delivering the site you requested and is not used to build a profile of you.",
          "Our hosting provider records standard server logs, including IP address and requested pages, for operational and security purposes. Server logs are not cookies and are not used for tracking or advertising.",
        ],
      },
      {
        heading: "4. If this changes",
        paragraphs: [
          "If we introduce analytics or any other non-essential cookie in future, we will update this page to describe it, and we will implement an appropriate consent mechanism before those cookies are set. We will not add tracking quietly.",
        ],
      },
      {
        heading: "5. Managing cookies",
        paragraphs: [
          "You can control and delete cookies through your browser settings, including blocking them entirely. Because this site does not depend on non-essential cookies, blocking them will not affect how it works for you.",
        ],
      },
      {
        heading: "6. Contact",
        paragraphs: [
          `If you have a question about this policy, contact us at ${contactLine}.`,
        ],
      },
    ],
    seo: {
      title: "Cookie Policy",
      description:
        "The Your Dart Express website uses no advertising, analytics or third-party tracking cookies. This policy explains exactly what is and is not used.",
      path: "/legal/cookie-policy",
    },
  },

  // ========================================================== DATA SECURITY
  {
    slug: "data-security",
    title: "Data Security",
    summary:
      "The technical and organisational measures we take to protect information — described without claiming certifications we do not hold.",
    lastUpdated: effectiveDate,
    published: true,
    requiresLegalReview: true,
    sections: [
      {
        heading: "1. Our approach",
        paragraphs: [
          "We treat customer information — shipment details, addresses, stock records and commercial terms — as confidential, and we apply proportionate measures to protect it.",
          "This page describes what we actually do. We are not going to list security certifications we have not obtained or standards we have not been audited against.",
        ],
      },
      {
        heading: "2. Website and transmission security",
        paragraphs: [
          "This website is served exclusively over HTTPS, so information you submit through it is encrypted in transit.",
          "Form submissions are processed server-side. Mail credentials and other secrets are held in server-side environment configuration and are never included in code delivered to your browser.",
          "The site loads no third-party advertising or analytics scripts, which materially reduces the number of parties that could be exposed to information about your visit. The single third-party embed — Google Maps on the contact page — runs inside its own frame and has no access to anything you type on this site.",
        ],
      },
      {
        heading: "3. Account preview pages",
        paragraphs: [
          "The log-in and sign-up pages on this site are an interface preview of a future account system. They are not connected to an authentication backend. No credential submitted through them is stored, transmitted to a server or retained in any form.",
          "When real account access is introduced, it will be built with proper credential handling — hashing with a modern algorithm, no plaintext storage, and secure session management — and this page will be updated to describe it.",
        ],
      },
      {
        heading: "4. Access control",
        paragraphs: [
          "Access to customer information is limited to the people who need it to carry out the service. Administrative access to our systems is restricted to authorised personnel.",
          "Where we share information with carriers, warehouse operators, customs brokers or authorities, we share only what that party needs in order to perform its part of the movement.",
        ],
      },
      {
        heading: "5. Retention and disposal",
        paragraphs: [
          "We keep information for as long as it is needed for the service and for as long as our legal, tax and customs obligations require. Information that no longer serves a purpose is deleted. Our Privacy Policy sets out retention in more detail.",
        ],
      },
      {
        heading: "6. Incidents",
        paragraphs: [
          "If we become aware of a security incident affecting personal information, we will investigate, take steps to contain it, and notify affected parties and the relevant authorities where the law requires us to do so.",
        ],
      },
      {
        heading: "7. Reporting a vulnerability",
        paragraphs: [
          `If you believe you have found a security issue affecting this website or our systems, please tell us at ${site.contact.email} with enough detail for us to reproduce it. Please give us a reasonable opportunity to address the issue before disclosing it publicly. We will acknowledge reports we receive.`,
        ],
      },
      {
        heading: "8. What we do not claim",
        paragraphs: [
          "We hold no security certifications at this time and we make no compliance claims under any specific security standard. If that changes, this page will state the certification, the certifying body and the date it was awarded.",
        ],
      },
    ],
    seo: {
      title: "Data Security",
      description:
        "How Your Dart Express protects information — HTTPS throughout, server-side secret handling, no third-party trackers, restricted access, and no unclaimed certifications.",
      path: "/legal/data-security",
    },
  },
];

export const publishedLegal = legalDocuments.filter((d) => d.published);

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return publishedLegal.find((d) => d.slug === slug);
}
