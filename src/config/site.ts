/**
 * Centralized site config. Every place that needs the brand name, a phone
 * number, a social link, or an office address should import from here —
 * never hardcode these inline in components.
 */

export const siteConfig = {
  name: "ST Trip",
  nameLocal: "এসটি ট্রিপ",
  tagline: "আপনার পরবর্তী যাত্রা শুরু হোক এখান থেকে",
  taglineEn: "Your next journey starts here",
  description:
    "Book flights, hotels, tours, and visas across Bangladesh and beyond — transparent pricing, 24/7 support, and secure payments.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sttrip.com.bd",
  ogImage: "/images/og-cover.jpg",
  locale: "en-BD",
  themeColor: "#0b4f6c",
  founded: 2016,
  contact: {
    supportPhone: "+880 1757-769498",
    supportPhoneDisplay: "+880 1834-163689",
    whatsapp: "+880 1757-769498",
    email: "support@sttrip.com.bd",
    messenger: "m.me/sttrip.bd",
  },
  social: {
    facebook: "https://facebook.com/sttrip",
    instagram: "https://instagram.com/sttrip",
    twitter: "https://twitter.com/sttrip",
    youtube: "https://youtube.com/@sttrip",
    linkedin: "https://linkedin.com/company/sttrip",
  },
  apps: {
    ios: "https://apps.apple.com/bd/app/sttrip",
    android: "https://play.google.com/store/apps/details?id=com.sttrip",
    iosRating: 4.7,
    androidRating: 4.7,
  },
  offices: [
    {
      name: "Head Office — Dhaka",
      address: "Level-2, 25/2 Lake Circus Road, Kalabagan, Dhanmondi, Dhaka 1205, Bangladesh",
      phone: "+880 1757-769498",
    },
    {
      name: "Chattogram Office",
      address: "GEC Circle, 2nd Floor, Chattogram, Bangladesh",
      phone: "+880 1757-769498",
    },
    {
      name: "Sylhet Office",
      address: "Jail Road, Sylhet Sadar, Sylhet, Bangladesh",
      phone: "+880 1757-769498",
    },
    {
      name: "Cox's Bazar Office",
      address: "Main Road, Cox's Bazar Sadar, Cox's Bazar, Bangladesh",
      phone: "+880 1757-769498",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
