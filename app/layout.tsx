import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RouteTransition } from "@/components/layout/route-transition";
import { JsonLd } from "@/components/shared/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/jsonld";
import { site } from "@/content/site";

/**
 * Geist stands in for the benchmark's proprietary Lausanne: the same
 * neo-grotesque character, freely licensed, and self-hosted at build time — no
 * request to a font CDN, no layout shift.
 *
 * Only the sans family is downloaded. The handful of monospaced numerals on
 * the site use the system mono stack instead — a second webfont family was
 * measurably hurting mobile LCP for a few decorative digits.
 *
 * To go back to DM Sans, swap this import and point --font-sans in globals.css
 * at the new variable. Nothing else references the family.
 */
const fontVariables = GeistSans.variable;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: true, address: false, email: true },
  alternates: { canonical: site.url },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#10002b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={fontVariables}
      /*
       * Opts the smooth scroll in globals.css out of route transitions. Without
       * it Next warns, and navigating between pages animates the scroll reset —
       * which reads as lag rather than polish.
       */
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-canvas font-sans antialiased">
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main id="main">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
