import type { HotelDetail, HotelListing } from "@/features/hotels/types";

// href points to /hotels/[slug] now, not a query param
export const coxsBazarHotels: HotelListing[] = [
  {
    id: "hotel-sayeman",
    name: "Sayeman Beach Resort",
    location: "Cox's Bazar",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    priceFrom: 6500,
    rating: 4.3,
    reviewCount: 218,
    href: "/hotels/sayeman-beach-resort",
  },
  {
    id: "hotel-long-beach",
    name: "Long Beach Hotel",
    location: "Cox's Bazar",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
    priceFrom: 8200,
    rating: 4.5,
    reviewCount: 341,
    href: "/hotels/long-beach-hotel",
  },
  {
    id: "hotel-ocean-paradise",
    name: "Ocean Paradise Hotel",
    location: "Cox's Bazar",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    priceFrom: 5900,
    rating: 4.1,
    reviewCount: 156,
    href: "/hotels/ocean-paradise-hotel",
  },
  {
    id: "hotel-royal-tulip",
    name: "Royal Tulip Sea Pearl",
    location: "Cox's Bazar",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    priceFrom: 12500,
    rating: 4.6,
    reviewCount: 289,
    href: "/hotels/royal-tulip-sea-pearl",
  },
];

// Add more locations here later, e.g. dhakaHotels, sylhetHotels, then
// spread them all into `allHotels` below.
export const allHotels: HotelListing[] = [...coxsBazarHotels];

// Keyed by slug — the last segment of each hotel's `href` above.
export const hotelDetails: Record<string, HotelDetail> = {
  "sayeman-beach-resort": {
    slug: "sayeman-beach-resort",
    name: "Sayeman Beach Resort",
    location: "Cox's Bazar",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    ],
    priceFrom: 6500,
    priceNote: "Per night",
    rating: 4.3,
    reviewCount: 218,
    badge: "Beachfront",
    overview:
      "A beachfront resort in Cox's Bazar offering direct sea views, spacious rooms, and easy access to the main beach point. Popular with families and groups looking for a comfortable stay close to the water.",
    amenities: [
      "Direct beach access",
      "Free WiFi",
      "Swimming pool",
      "Airport/bus station pickup",
      "24/7 room service",
      "In-house restaurant",
    ],
    roomTypes: [
      { name: "Standard Sea View", priceFrom: 6500, description: "1 double bed, sea-facing balcony" },
      { name: "Deluxe Suite", priceFrom: 11000, description: "Living area + sea-facing balcony" },
    ],
    faqs: [
      {
        question: "Is breakfast included?",
        answer: "Yes, complimentary breakfast is included with every room booking.",
      },
    ],
  },
  // ...repeat this shape for long-beach-hotel, ocean-paradise-hotel, royal-tulip-sea-pearl
};