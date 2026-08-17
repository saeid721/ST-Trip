export interface HotelListing {
  id: string;
  name: string;
  location: string;
  image: string;
  priceFrom: number;
  rating: number;
  reviewCount: number;
  href: string;
}

export interface HotelAmenity {
  label: string;
}

export interface HotelDetail {
  slug: string;
  name: string;
  location: string;
  heroImage: string;
  gallery?: string[];
  priceFrom: number;
  priceNote?: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  overview: string;
  amenities: string[];
  roomTypes?: { name: string; priceFrom: number; description: string }[];
  faqs?: { question: string; answer: string }[];
}