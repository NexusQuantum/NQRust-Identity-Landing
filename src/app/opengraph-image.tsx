import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const runtime = "edge";
export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(ellipse at top left, rgba(255,107,26,0.35) 0%, transparent 50%), #0b0b0f",
          color: "#f2f2f2",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "32px",
            fontWeight: 600,
            color: "#ff8a47",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "#ff6b1a",
              color: "#0b0b0f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 800,
            }}
          >
            N
          </div>
          {SITE.shortName}
        </div>

        <div
          style={{
            marginTop: "32px",
            fontSize: "76px",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Identity & Access Management.
        </div>
        <div
          style={{
            fontSize: "76px",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            background: "linear-gradient(90deg, #ff8a47, #ff6b1a)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Self-Hosted. Airgapped Ready.
        </div>

        <div
          style={{
            marginTop: "32px",
            fontSize: "28px",
            color: "#9a9aa8",
            display: "flex",
            gap: "16px",
          }}
        >
          <span>Self-hosted</span>
          <span>·</span>
          <span>Airgapped</span>
          <span>·</span>
          <span>OIDC / OAuth2 / SAML</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
