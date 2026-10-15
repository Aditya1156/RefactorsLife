import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* Branded social share images (WhatsApp, LinkedIn, X link previews), rendered on request. */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Paths are scoped to fixed folders so the build only bundles these files.
const font = (file: string) => readFile(join(process.cwd(), "src/assets/fonts", file));
const image = (file: string) => readFile(join(process.cwd(), "public/images", file));

export async function renderOg({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const [semibold, medium, mono, photo] = await Promise.all([
    font("Geist-SemiBold.ttf"),
    font("Geist-Medium.ttf"),
    font("GeistMono-Medium.ttf"),
    image("aditya.jpg"),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const titleSize = title.length > 70 ? 54 : title.length > 45 ? 62 : 72;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 64,
        fontFamily: "Geist",
        color: "#0b1324",
        backgroundColor: "#f5f7fb",
        backgroundImage:
          "radial-gradient(circle at 8% 0%, rgba(147,197,253,0.75), transparent 45%), radial-gradient(circle at 100% 30%, rgba(199,210,254,0.8), transparent 45%), radial-gradient(circle at 50% 120%, rgba(186,230,253,0.7), transparent 50%)",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 48,
          alignItems: "center",
          padding: "48px 56px",
          borderRadius: 40,
          backgroundColor: "rgba(255,255,255,0.72)",
          border: "2px solid rgba(255,255,255,0.95)",
          boxShadow: "0 30px 70px -24px rgba(30,58,138,0.28)",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 600 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 13,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "linear-gradient(140deg, #2563eb, #4f46e5)",
                color: "#fff",
                fontFamily: "Geist Mono",
                fontSize: 18,
              }}
            >
              R/
            </div>
            <div style={{ display: "flex" }}>
              <span>Refactors</span>
              <span style={{ color: "#2563eb", fontWeight: 500 }}>Life</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 18px",
              borderRadius: 999,
              backgroundColor: "rgba(37,99,235,0.1)",
              color: "#1d4ed8",
              fontSize: 22,
              fontWeight: 500,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ fontSize: titleSize, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.06 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 26, fontWeight: 500, color: "#64748b", lineHeight: 1.4 }}>{subtitle}</div>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain <img> */}
          <img
            src={photoSrc}
            alt=""
            width={230}
            height={230}
            style={{
              borderRadius: 999,
              border: "8px solid #fff",
              boxShadow: "0 24px 50px -18px rgba(30,58,138,0.45)",
              objectFit: "cover",
            }}
          />
          <div style={{ fontFamily: "Geist Mono", fontSize: 20, color: "#64748b" }}>refactorslife.in</div>
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
