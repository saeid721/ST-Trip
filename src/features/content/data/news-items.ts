import type { NewsItem } from "@/features/content/types";

export const newsItems: NewsItem[] = [
  {
    id: "news-app-launch",
    tag: "Product",
    title: "ST Trip Launches All-in-One Travel App",
    summary:
      "Track flights in real time, get app-only fares, and rebook in one tap — now available on iOS and Android.",
    coverImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    publishedAt: "2026-08-05",
    href: "/news/app-launch",
  },
  {
    id: "news-coxsbazar-office",
    tag: "Company",
    title: "New Cox's Bazar Office Now Open",
    summary: "Walk-in support for bookings, visas, and Hajj/Umrah consultations at our newest branch.",
    coverImage: "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&q=80",
    publishedAt: "2026-07-18",
    href: "/news/coxs-bazar-office-opening",
  },
  {
    id: "news-hajj-2027",
    tag: "Announcement",
    title: "Hajj 2027-2028 Pre-Registration Now Open",
    summary: "Secure your quota early — pre-registration slots are limited and open on a first-come basis.",
    coverImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    publishedAt: "2026-07-02",
    href: "/news/hajj-preregistration-open",
  },
  {
    id: "news-partnership",
    tag: "Partnership",
    title: "ST Trip Partners with Eastern Bank for Exclusive Discounts",
    summary: "Cardholders now get up to BDT 4,000 off international flight bookings.",
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    publishedAt: "2026-06-20",
    href: "/news/eastern-bank-partnership",
  },
];