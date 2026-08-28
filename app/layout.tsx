import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Metal Prototype Lab | SLM / LPBF Metal 3D Printing & Precision Parts",
  description:
    "Metal Prototype Lab supports international inquiries for SLM / LPBF metal 3D printing, complex precision parts, prototypes, DFM review, and low-volume production.",
  manifest: "manifest.webmanifest",
  openGraph: {
    title: "Metal Prototype Lab | SLM / LPBF Metal 3D Printing & Precision Parts",
    description:
      "Metal Prototype Lab supports international inquiries for SLM / LPBF metal 3D printing, complex precision parts, prototypes, DFM review, and low-volume production."
  },
  appleWebApp: {
    capable: true,
    title: "Metal Prototype Lab",
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
