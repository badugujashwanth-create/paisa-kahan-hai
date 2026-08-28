import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { OfflineReady } from "@/components/offline-ready";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const APP_THEME_COLOR = "#1E3A5F";

export const metadata: Metadata = {
  title: "Paisa Kahan Hai",
  description:
    "Find out why your government payment never arrived — and exactly what to do about it.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: APP_THEME_COLOR,
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

/** Render the shared document shell and persistent demo notice. */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="flex min-h-svh flex-col bg-paper font-sans text-base text-ink">
        <SiteHeader />
        <OfflineReady />
        <main className="flex flex-1 flex-col" id="main-content">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
