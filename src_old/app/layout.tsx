import type { Metadata, Viewport } from "next";
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
      <body>
        {/* WCAG 2.4.1 — first focusable element on every page */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
