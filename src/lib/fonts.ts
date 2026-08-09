import { Sora, Inter, Noto_Sans_Bengali } from "next/font/google";

/**
 * next/font self-hosts + subsets these at build time — zero layout shift,
 * zero third-party network requests at runtime.
 *
 * Sora   -> headings (geometric sans, distinct from the four references' defaults)
 * Inter  -> body copy (highly legible at small sizes)
 * Noto Sans Bengali -> fallback for Bangla taglines/labels ("উড়াল দিন" style copy)
 */
export const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-bengali",
  display: "swap",
});

export const fontVariables = `${sora.variable} ${inter.variable} ${notoSansBengali.variable}`;
