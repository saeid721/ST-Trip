import type { Metadata, Viewport } from "next";
import { MotionConfig } from "motion/react";
import { fontVariables } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { ChatWidget } from "@/components/layout/ChatWidget";
import "./globals.css";

export const metadata: Metadata = buildMetadata({
  title: {
    default: `${siteConfig.name} — Flights, Hotels, Tours & Visa`,
    template: `%s · ${siteConfig.name}`,
  },
});

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body suppressHydrationWarning className="overflow-x-hidden">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionConfig reducedMotion="user" transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <MobileTabBar />
          <ChatWidget />
        </MotionConfig>
      </body>
    </html>
  );
}
