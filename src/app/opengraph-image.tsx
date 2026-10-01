import { ImageResponse } from "next/og";
import { company } from "@/config/company";

export const alt = `${company.name} — A festa começa nos detalhes.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagem Open Graph tipográfica gerada no build.
 * Quando houver fotografia oficial, pode ser substituída por um arquivo
 * src/app/opengraph-image.jpg (1200×630).
 */
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
          padding: 72,
          background: "#13110f",
          color: "#f1ebe2",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "rgba(241,235,226,.6)" }}>
          [ Celebrações ]
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 0.95 }}>
          <span>A festa começa</span>
          <span style={{ fontStyle: "italic", color: "#c99a83" }}>nos detalhes.</span>
        </div>
        <div style={{ fontSize: 30 }}>{company.name}</div>
      </div>
    ),
    size,
  );
}
