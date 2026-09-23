import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Wonka AI — Private Enterprise AI, Deployed on Your Infrastructure";
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
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "#0e1a16",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "white",
              borderRadius: 4,
            }}
          />
          <span style={{ color: "white", fontSize: 28, fontWeight: 600, letterSpacing: -1 }}>
            wonka
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 780,
            marginBottom: 28,
          }}
        >
          Leave no human behind.
        </div>

        {/* Tagline */}
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 24, maxWidth: 560 }}>
          Private enterprise AI deployed on your infrastructure. Full GDPR compliance.
        </div>

        {/* Award badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 40,
            border: "1px solid rgba(251,191,36,0.6)",
            borderRadius: 999,
            padding: "8px 20px",
          }}
        >
          <span style={{ fontSize: 18 }}>🏆</span>
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, letterSpacing: 1, textTransform: "uppercase" }}>
            #1 AI Start-up of the year · Belgium Startup Awards 2026
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
