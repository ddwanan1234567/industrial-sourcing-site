import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "YCJG Metal Additive Manufacturing | LPBF / SLM Precision Parts Inquiry",
  description:
    "YCJG Metal Additive Manufacturing supports international inquiries for LPBF / SLM metal 3D printed precision parts, DFM review, quotation coordination, prototypes, and small-batch industrial applications.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "YCJG Metal AM",
    statusBarStyle: "black-translucent"
  }
};

export const viewport: Viewport = {
  themeColor: "#05080d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
