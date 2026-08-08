import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #8ec5ff 0%, #5ba8f5 100%)",
          color: "#0a0f18",
          fontSize: 72,
          fontWeight: 900,
        }}
      >
        HW
      </div>
    ),
    { ...size },
  );
}
