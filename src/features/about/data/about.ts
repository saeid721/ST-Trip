// features/content/data/about.ts

import type { IconKey, CompanyValue, Milestone, ServiceItem, WhyChooseItem, JourneyStep } from "@/features/about/types";
export type { IconKey };
export const companyValues: CompanyValue[] = [
  {
    id: "trust",
    icon: "shield",
    title: "Trust First",
    description:
      "Transparent pricing and clear policies on every booking — no hidden fees, no surprises.",
  },
  {
    id: "care",
    icon: "heart",
    title: "Genuine Care",
    description:
      "A real person is always reachable when plans change or questions come up.",
  },
  {
    id: "guidance",
    icon: "compass",
    title: "Local Guidance",
    description:
      "Deep local knowledge paired with global inventory, so every itinerary actually fits.",
  },
  {
    id: "craft",
    icon: "sparkles",
    title: "Thoughtful Craft",
    description:
      "Every screen and every step is designed to make booking feel simple, not stressful.",
  },
];

/** Existing "Our Journey" timeline — unchanged shape. */
export const milestones: Milestone[] = [
  {
    year: "Founded",
    title: "Where it started",
    description: "ST Trip set out to make travel booking simple and transparent.",
  },
  {
    year: "Growth",
    title: "Expanding services",
    description: "Flights, hotels, tours and visa support brought together in one place.",
  },
  {
    year: "Today",
    title: "Trusted by travellers",
    description: "A growing community of travellers relies on ST Trip for every trip.",
  },
];

/** Core services — used by ServicesSection. */
export const services: ServiceItem[] = [
  {
    id: "flights",
    icon: "plane",
    title: "Flights",
    description:
      "Compare and book domestic and international flights with transparent fares and real-time availability.",
    href: "/flight",
  },
  {
    id: "hotels",
    icon: "hotel",
    title: "Hotels",
    description:
      "From city stays to resorts, find verified accommodation that fits your budget and itinerary.",
    href: "/hotel",
  },
  {
    id: "tours",
    icon: "tour",
    title: "Tours",
    description:
      "Curated tour packages designed around real destinations, not generic templates.",
    href: "/tour",
  },
  {
    id: "visa",
    icon: "visa",
    title: "Visa",
    description:
      "Guided visa assistance that keeps documentation and timelines clear from start to finish.",
    href: "/visa",
  },
];

/** "Why Choose ST Trip" — concise, believable benefits. */
export const whyChooseItems: WhyChooseItem[] = [
  {
    id: "easy-booking",
    icon: "click",
    title: "Easy Booking",
    description: "A streamlined flow that gets you from search to confirmation in minutes.",
  },
  {
    id: "trusted-service",
    icon: "shield",
    title: "Trusted Service",
    description: "Clear pricing and policies you can check before you commit.",
  },
  {
    id: "support",
    icon: "support",
    title: "Professional Support",
    description: "A real team ready to help before, during and after your trip.",
  },
  {
    id: "flexible",
    icon: "flex",
    title: "Flexible Solutions",
    description: "Mix flights, hotels, tours and visas the way your trip actually needs.",
  },
  {
    id: "all-in-one",
    icon: "grid",
    title: "All Travel Needs, One Place",
    description: "Fewer tabs, fewer accounts — everything for your trip lives in one platform.",
  },
  {
    id: "customer-focused",
    icon: "handshake",
    title: "Customer-Focused",
    description: "Every decision on the platform is measured against one question: does this help the traveller?",
  },
];

/** Plan → Book → Travel → Experience storytelling steps. */
export const journeySteps: JourneyStep[] = [
  {
    id: "plan",
    label: "01",
    icon: "compass",
    title: "Plan",
    description: "Explore destinations, compare options and shape an itinerary that fits.",
  },
  {
    id: "book",
    label: "02",
    icon: "click",
    title: "Book",
    description: "Secure flights, stays, tours or visas in a few guided steps.",
  },
  {
    id: "travel",
    label: "03",
    icon: "plane",
    title: "Travel",
    description: "Head off with confirmations, support and updates always within reach.",
  },
  {
    id: "experience",
    label: "04",
    icon: "sparkles",
    title: "Experience",
    description: "Arrive, explore and make the trip the whole reason for the plan.",
  },
];

export const missionVision = {
  mission: {
    icon: "target" as IconKey,
    title: "Our Mission",
    description:
      "To make booking a trip feel as simple as taking one — clear pricing, honest guidance and support that shows up when it matters.",
  },
  vision: {
    icon: "eye" as IconKey,
    title: "Our Vision",
    description:
      "A travel platform travellers reach for by habit, not necessity — because every part of the journey was considered.",
  },
};

/** Trust section copy — real commitments, not invented reviews or awards. */
export const trustPoints = [
  "Transparent pricing shown before you pay",
  "24/7 support for booking changes and questions",
  "Secure payment on every transaction",
];