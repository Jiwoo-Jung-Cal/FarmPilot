import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FarmPilot | Producer workspace",
  description: "Offline feedback analysis, approved visitor requests, and practical improvements for small tourism operators.",
  manifest: '/manifest.webmanifest',
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
