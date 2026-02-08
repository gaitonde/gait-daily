import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

function generateSVG(size: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" fill="#ffffff"/>
    <text x="${size / 2}" y="${size * 0.75}" font-size="${size * 0.65}" text-anchor="middle" dominant-baseline="middle" fill="#000000" font-family="system-ui, -apple-system, sans-serif">⚡</text>
  </svg>`;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const size = parseInt(searchParams.get("size") || "192");

  // Validate size to prevent abuse
  if (isNaN(size) || size < 16 || size > 1024) {
    return new NextResponse("Invalid size", { status: 400 });
  }

  const svg = generateSVG(size);

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000",
    },
  });
}
