import type { PackageDetail } from "@/features/packages/types";

export const tourPackageDetails: Record<string, PackageDetail> = {
  "central-europe-classic": {
    slug: "central-europe-classic",
    category: "multi-country",
    title: "Classic / Central Europe Tour Package",
    subtitle: "10 Days — 8 Nights across the heart of Europe",
    heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    ],
    durationDays: 10,
    nightsLabel: "8 Nights, 5 cities",
    priceFrom: 299000,
    priceNote: "Per person, twin sharing",
    badge: "Best Of",
    overview:
      "A sweeping introduction to Central Europe covering iconic cities and landmarks, with comfortable coach travel between destinations, guided city tours, and free time built in for independent exploration.",
    highlights: [
      "5 cities across 3 countries in one itinerary",
      "4-star hotel accommodation throughout",
      "English-speaking local guides at every stop",
      "Daily breakfast included",
    ],
    inclusions: [
      "Return international airfare",
      "8 nights 4-star hotel accommodation",
      "Daily breakfast",
      "Coach transport between all cities",
      "Guided city tours with entrance fees",
      "Schengen visa assistance",
    ],
    exclusions: [
      "Lunch and dinner (except where noted)",
      "Travel insurance",
      "Optional excursions and personal expenses",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival",
        description: "Arrive and transfer to your hotel. Evening at leisure to settle in.",
      },
      {
        day: 3,
        title: "City Tour & Landmarks",
        description: "Guided walking tour covering major historical landmarks and city centers.",
      },
      {
        day: 6,
        title: "Inter-city Travel",
        description: "Scenic coach transfer to the next destination with a scheduled rest stop.",
      },
      {
        day: 10,
        title: "Departure",
        description: "Free morning for last-minute shopping, then transfer to the airport for your return flight.",
      },
    ],
  },

  "kuala-lumpur": {
    slug: "kuala-lumpur",
    category: "asia",
    title: "Kuala Lumpur Getaway",
    subtitle: "5 Days of skyline views, shopping and street food",
    heroImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
    ],
    durationDays: 5,
    nightsLabel: "4 Nights, Kuala Lumpur City",
    priceFrom: 11999,
    overview:
      "A short, easy getaway to Kuala Lumpur — perfect for a quick break. Explore the Petronas Towers, Batu Caves, and the city's famous night markets, with a comfortable centrally-located hotel as your base.",
    highlights: [
      "Centrally located hotel near Bukit Bintang",
      "Half-day Batu Caves & city tour included",
      "Free time for shopping at Suria KLCC",
      "Direct flights from Dhaka",
    ],
    inclusions: [
      "Return air ticket (Dhaka – Kuala Lumpur – Dhaka)",
      "4 nights hotel accommodation with breakfast",
      "Half-day city tour with guide",
      "Airport transfers",
    ],
    exclusions: [
      "Malaysia visa fee (e-visa assistance provided)",
      "Meals other than breakfast",
      "Personal expenses and optional tours",
    ],
  },
};