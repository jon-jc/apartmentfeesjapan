import { ImageResponse } from "next/og";

export const alt =
  "Tokyo Apartment Move-in Cost Calculator — key money, deposit and guarantor fees explained";
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
          background: "linear-gradient(135deg, #312e81 0%, #4f46e5 60%, #7c3aed 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, opacity: 0.8 }}>
          TOKYO MOVE-IN COST CALCULATOR
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.15,
            marginTop: 24,
            maxWidth: 950,
          }}
        >
          What does it really cost to rent in Tokyo?
        </div>
        <div style={{ fontSize: 30, marginTop: 28, opacity: 0.85 }}>
          Deposit · Key money · Guarantor & agency fees — ward-by-ward, updated
          daily
        </div>
      </div>
    ),
    size
  );
}
