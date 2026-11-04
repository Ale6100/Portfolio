import { ImageResponse } from "next/og";

export const alt = "Alejandro Portaluppi | Desarrollador Web Full Stack";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          backgroundColor: "#0e1017",
          color: "#f2f1ed",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            letterSpacing: "-0.02em",
            color: "#9ca3b5",
          }}
        >
          <span>alejandro</span>
          <span style={{ color: "#6889ff" }}>.</span>
          <span>portaluppi</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#f2f1ed",
            }}
          >
            Alejandro Portaluppi
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.35,
              color: "#9ca3b5",
              maxWidth: "900px",
            }}
          >
            Desarrollador Web Full Stack. Construyo aplicaciones web completas, de la interfaz a la base de datos.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "28px",
            fontSize: 22,
            color: "#6889ff",
          }}
        >
          <span>React · Next.js · TypeScript · Node.js · NestJS · SQL</span>
        </div>
      </div>
    ),
    size
  );
}
