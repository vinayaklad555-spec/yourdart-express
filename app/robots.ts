import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Preview and endpoint routes have no business in an index.
        /*
         * /track itself is public and indexable. Individual results are not:
         * they are per-customer, time-sensitive, and the reference can identify
         * a named person's delivery. The pages also carry a noindex directive —
         * this is the belt to that pair of braces.
         */
        disallow: ["/api/", "/login", "/signup", "/track/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
