import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0f18",
          borderRadius: 96,
        }}
      >
        <div
          style={{
            width: 400,
            height: 400,
            borderRadius: 80,
            background: "linear-gradient(135deg, #8ec5ff 0%, #5ba8f5 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0a0f18",
            fontSize: 160,
            fontWeight: 900,
            letterSpacing: -4,
          }}
        >
          HW
        </div>
      </div>
    ),
    { ...size },
  );
}
