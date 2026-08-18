import * as React from "react";

/**
 * Server-rendered structured data. Emitted as a plain script tag so it costs
 * nothing at runtime. `<>` is escaped to prevent the JSON breaking out of the
 * script element.
 */
export function JsonLd({ schema }: { schema: object | object[] }) {
  const payload = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}
