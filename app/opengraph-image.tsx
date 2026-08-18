import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time from the brand tokens, so the social card can never
 * drift from the site's identity and there is no binary asset to maintain.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #10002b 0%, #3c096c 55%, #7b2cbf 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Brand glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 999,
            background: "rgba(199,125,255,0.34)",
            filter: "blur(120px)",
            display: "flex",
          }}
        />

        {/* ------------------------------------------------------ wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#7b2cbf",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                border: "5px solid #ffffff",
                display: "flex",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            YourDartExpress
          </div>
        </div>

        {/* -------------------------------------------------------- message */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.06,
              fontWeight: 500,
              letterSpacing: "-0.035em",
              color: "#ffffff",
              maxWidth: 900,
            }}
          >
            Move your orders without managing the movement
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.62)",
              maxWidth: 820,
            }}
          >
            Shipping, fulfillment, warehousing and returns — coordinated end to
            end by one team.
          </div>
        </div>

        {/* --------------------------------------------------------- footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <div style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,0.55)" }}>
            {site.domain}
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {["Shipping", "Fulfillment", "Warehousing", "Freight"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.16)",
                  fontSize: 18,
                  color: "rgba(255,255,255,0.72)",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
