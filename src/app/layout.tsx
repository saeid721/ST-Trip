import type { Metadata, Viewport } from "next";
import { MotionConfig } from "motion/react";
import { fontVariables } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
      {/* suppressHydrationWarning here only ignores attribute mismatches on
          <body> itself (e.g. cz-shortcut-listen="true" injected by browser
          extensions like ColorZilla before React hydrates) — it does NOT
          suppress mismatches in children or content. This is Next.js's
          documented fix for exactly this class of false-positive warning:
          https://nextjs.org/docs/messages/react-hydration-error */}
      <body suppressHydrationWarning>
        {/* WCAG 2.4.1 — first focusable element on every page */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {/* reducedMotion="user" — every motion/react animation in the app
            (Reveal, Tabs indicator, StatsCounter, ChatWidget, carousels)
            automatically disables/shortens itself when the OS-level
            prefers-reduced-motion is set. One audit point, not per-component. */}
        <MotionConfig reducedMotion="user" transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <ChatWidget />
        </MotionConfig>
      </body>
    </html>
  );
}
