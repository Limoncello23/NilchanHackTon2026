import type { Metadata } from "next";

import { Source_Serif_4, Unbounded } from "next/font/google";

import { PreloaderProvider } from "@/components/layout/preloader-context";
import { SiteHeader } from "@/components/layout/site-header";
import { SitePreloader } from "@/components/layout/site-preloader";

import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Routine Dungeon",
  description: "A web face for your routine dungeon",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <PreloaderProvider>
          <SitePreloader />
          <SiteHeader />
          {children}
        </PreloaderProvider>
      </body>
    </html>
  );
}
