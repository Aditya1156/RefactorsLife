import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "linear-gradient(140deg, #2563eb, #4f46e5)",
        color: "#fff",
        fontSize: 76,
        fontWeight: 700,
        letterSpacing: -2,
      }}
    >
      R/
    </div>,
    size,
  );
}
