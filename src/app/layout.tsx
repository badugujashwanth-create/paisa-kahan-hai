import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: "Paisa Kahan Hai",
  description:
    "Find out why your government payment never arrived — and exactly what to do about it.",
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
        <main className="flex flex-1 flex-col" id="main-content">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
