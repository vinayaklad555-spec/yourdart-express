import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RouteTransition } from "@/components/layout/route-transition";
import { JsonLd } from "@/components/shared/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/jsonld";
import { site } from "@/content/site";

/**
 * Nunito Sans, trialled on the shipping hero and approved for the whole site.
 * Loaded via next/font as a variable font, self-hosted at build time — no
 * request to a font CDN, no layout shift.
 *
 * Only the sans family is downloaded. The handful of monospaced numerals on
 * the site use the system mono stack instead — a second webfont family was
 * measurably hurting mobile LCP for a few decorative digits.
 *
 * To change family again, swap this import and point --font-sans in
 * globals.css at the new variable. Nothing else references the family.
 */
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-sans",
});

const fontVariables = nunitoSans.variable;

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
  /*
   * Only the SVG is declared by hand. favicon.ico and the Apple touch icon
   * come from the file conventions (app/favicon.ico, app/apple-icon.tsx),
   * and Next emits those with a CONTENT HASH in the URL — which is what makes
   * a browser pick up a changed icon instead of serving its cached one.
   *
   * Declaring them here as well produced two bugs: a second, un-hashed
   * /favicon.ico link that defeated that cache-busting, and an
   * apple-touch-icon pointing at /apple-icon.png, which 404s — the route
   * generated from apple-icon.tsx is /apple-icon, with no extension.
   */
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    /*
     * Must be declared: setting `icons.icon` at all suppresses the
     * apple-touch-icon that app/apple-icon.tsx would otherwise emit (verified,
     * not assumed). The route it generates is /apple-icon — with NO .png
     * extension. Pointing at /apple-icon.png here shipped a 404.
     */
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
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
