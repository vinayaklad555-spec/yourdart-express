import { ImageResponse } from "next/og";

/**
 * One renderer for every raster app icon. Sizes are generated at build time
 * from the brand tokens, so there is no binary asset to keep in sync with the
 * logo — and no risk of a stale PNG shipping alongside an updated mark.
 */
export function renderIcon(size: number, options?: { maskable?: boolean }) {
  const padding = options?.maskable ? size * 0.19 : size * 0.11;
  const inner = size - padding * 2;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#7b2cbf",
          borderRadius: options?.maskable ? 0 : size * 0.22,
        }}
      >
        <div
          style={{
            width: inner,
            height: inner,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Target ring */}
          <div
            style={{
              position: "absolute",
              width: inner * 0.72,
              height: inner * 0.72,
              borderRadius: 999,
              border: `${inner * 0.13}px solid #ffffff`,
              display: "flex",
              transform: `translate(${-inner * 0.06}px, ${inner * 0.07}px)`,
            }}
          />
          {/* Middle ring — the mark is a pierced target, not a single ring */}
          <div
            style={{
              position: "absolute",
              width: inner * 0.42,
              height: inner * 0.42,
              borderRadius: 999,
              border: `${inner * 0.09}px solid #ffffff`,
              display: "flex",
              transform: `translate(${-inner * 0.06}px, ${inner * 0.07}px)`,
            }}
          />
          {/* Bullseye */}
          <div
            style={{
              position: "absolute",
              width: inner * 0.2,
              height: inner * 0.2,
              borderRadius: 999,
              background: "#ffffff",
              display: "flex",
              transform: `translate(${-inner * 0.06}px, ${inner * 0.07}px)`,
            }}
          />
          {/* Dart shaft */}
          <div
            style={{
              position: "absolute",
              width: inner * 0.46,
              height: inner * 0.12,
              borderRadius: 999,
              background: "#ffffff",
              display: "flex",
              transform: `translate(${inner * 0.19}px, ${-inner * 0.19}px) rotate(-45deg)`,
            }}
          />
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}
