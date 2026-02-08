import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "./layout-client";

export const metadata: Metadata = {
  title: "Gait Daily",
  description: "A beautiful launch experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
