import { siteConfig } from "@/config/site";
import type { ValueItem, Milestone } from "@/features/content/types";

export const companyValues: ValueItem[] = [
  {
    id: "trust",
    icon: "shield",
    title: "Trust & Transparency",
    description: "No hidden fees, no fine print — the price you see is the price you pay.",
  },
  {
    id: "care",
    icon: "heart",
    title: "Traveller-First Care",
    description: "24/7 human support before, during and after every trip you book with us.",
  },
  {
    id: "expertise",
    icon: "compass",
    title: "Local Expertise",
    description: "Deep knowledge of routes, visas and destinations that matter to Bangladeshi travellers.",
  },
  {
    id: "innovation",
    icon: "sparkles",
    title: "Constant Innovation",
    description: "Investing in tools that make booking faster, safer and more convenient every year.",
  },
];

export const milestones: Milestone[] = [
  {
    year: String(siteConfig.founded),
    title: "ST Trip Founded",
    description: "Launched in Dhaka with a simple goal: make travel booking honest and easy.",
  },
  {
    year: String(siteConfig.founded + 2),
    title: "Regional Expansion",
    description: "Opened offices in Chattogram, Sylhet and Cox's Bazar to serve travellers nationwide.",
  },
  {
    year: String(siteConfig.founded + 5),
    title: "300,000+ Happy Travellers",
    description: "Crossed a major milestone in customers served across flights, hotels and tours.",
  },
  {
    year: String(new Date().getFullYear()),
    title: "All-in-One Travel App",
    description: "Launched our mobile app for real-time flight tracking and one-tap rebooking.",
  },
];