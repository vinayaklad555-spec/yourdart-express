import type { NextConfig } from "next";

/**
 * Security headers applied to every response.
 *
 * The CSP is deliberately tight because this site loads nothing from anywhere
 * else: no analytics, no ad pixels, no CDN fonts (next/font self-hosts Geist),
 * no external images. If a third-party script is ever added, it must be added
 * here explicitly — which is the point.
 */
/**
 * React's DEVELOPMENT build uses eval() for debugging features — reconstructing
 * callstacks across environments, chiefly. It never does so in production. With
 * a strict script-src that call throws and the dev overlay reports an error on
 * every page load.
 *
 * So 'unsafe-eval' is granted in development only. The production policy is
 * unchanged and stays strict.
 */
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  // Next.js injects small inline bootstrap scripts; 'unsafe-inline' is required
  // for those. No external script origins are permitted.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  // The contact page embeds Google Maps and Street View iframes — the one
  // third-party surface on the site, added at the owner's request. Only the
  // frame itself is permitted: no Google scripts run in OUR pages, so
  // script-src stays untouched.
  "frame-src https://www.google.com/maps https://www.google.com/maps/",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Trailing-slash-free canonical URLs, matching what lib/seo.ts emits.
  trailingSlash: false,

  images: {
    // Modern formats first; Next falls back automatically for older browsers.
    formats: ["image/avif", "image/webp"],

    /*
     * Next 16 restricts optimisation to an explicit quality allowlist, and the
     * default is [75] alone. At 75 the full-bleed hero was being encoded down
     * to ~8KB, which is where its softness came from — the source was never the
     * problem.
     *
     * 90 is added for the hero only. Everything else stays at 75, where it is
     * indistinguishable and cheaper. The allowlist is deliberately short: it is
     * a guard against someone forcing expensive re-encodes via the URL.
     */
    qualities: [75, 90],
    /*
     * The top of this list is the largest image that can ever be served. It
     * previously stopped at 1920, which meant a 1440px viewport on a 2x display
     * — any modern laptop — asked for 2880 and got 1920 upscaled. That is what
     * a full-bleed hero looks soft on Retina.
     *
     * 2048 and 2560 are added for that case. The hero master is 3200px wide, so
     * these are real pixels rather than an upscale of an upscale.
     */
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1440, 1920, 2048, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  experimental: {
    // Tree-shakes icon imports so only the icons actually used are bundled.
    optimizePackageImports: ["lucide-react", "motion"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Build-generated icons and social cards are immutable per deploy.
        source: "/(icon-.*\\.png|apple-icon|opengraph-image)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
