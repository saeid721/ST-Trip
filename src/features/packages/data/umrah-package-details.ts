import type { PackageDetail } from "@/features/packages/types";

export const umrahPackageDetails: Record<string, PackageDetail> = {
  "exclusive-14-days": {
    slug: "exclusive-14-days",
    category: "exclusive",
    title: "Exclusive Umrah Package — 14 Days",
    subtitle: "7 nights Makkah + 6 nights Madinah, premium hotels",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    ],
    durationDays: 14,
    nightsLabel: "7N Makkah + 6N Madinah",
    priceFrom: 140000,
    badge: "Popular",
    overview:
      "A comfortable, well-paced 14-day Umrah journey with premium hotel stays close to the Haram in both Makkah and Madinah. Ideal for families and first-time pilgrims who want a balanced schedule with enough time for worship, rest and ziyarah, without the pace of a rushed itinerary.",
    highlights: [
      "Hotels within 500m of Masjid al-Haram & Masjid an-Nabawi",
      "Guided ziyarah in both cities",
      "Bengali-speaking Umrah guide throughout",
      "Flexible departure dates year-round",
    ],
    inclusions: [
      "Return air ticket (Dhaka – Jeddah/Madinah – Dhaka)",
      "Hotel accommodation with breakfast",
      "Umrah visa processing",
      "Airport & inter-city transportation",
      "Ziyarah tour in Makkah & Madinah",
      "24/7 support helpline",
    ],
    exclusions: [
      "Lunch & dinner (unless specified)",
      "Personal shopping and expenses",
      "Optional excursions outside the itinerary",
    ],
    faqs: [
      {
        question: "Can I customize the number of nights in Makkah vs Madinah?",
        answer:
          "Yes, our team can adjust the night split to suit your preference — just mention it during booking and we'll requote accordingly.",
      },
      {
        question: "Is a mahram required for solo female travelers?",
        answer:
          "Saudi Umrah visa rules require female pilgrims under 45 to travel with a mahram or as part of an approved female group; our team can guide you through eligible options.",
      },
    ],
  },

  "umrah-jordan-14-days": {
    slug: "umrah-jordan-14-days",
    category: "combo",
    title: "Umrah & Jordan Package — 14 Days",
    subtitle: "Combine your Umrah with a guided tour of Jordan's historic sites",
    heroImage: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
    ],
    durationDays: 14,
    nightsLabel: "Makkah + Madinah + Amman & Petra",
    priceFrom: 250000,
    overview:
      "Perform your Umrah and extend your journey with a guided tour of Jordan, including Petra, Amman and the Dead Sea. A meaningful combination of spiritual devotion and cultural exploration, fully guided from departure to return.",
    highlights: [
      "Full Umrah rites in Makkah & Madinah",
      "Guided tour of Petra, one of the New 7 Wonders",
      "Dead Sea float experience",
      "English & Bengali-speaking tour guides",
    ],
    inclusions: [
      "Return air tickets covering all sectors",
      "Hotel accommodation in Saudi Arabia & Jordan",
      "Umrah visa & Jordan visa processing",
      "All transfers and inter-city transport",
      "Guided Jordan sightseeing tour",
    ],
    exclusions: [
      "Meals not specified in the itinerary",
      "Travel insurance (available on request)",
      "Personal expenses and tips for local guides",
    ],
  },
};