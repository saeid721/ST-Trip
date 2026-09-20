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
  address?: string;
  coordinates?: { lat: number; lng: number };
  heroImage: string;
  gallery?: string[];
  priceFrom: number;
  priceNote?: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  overview: string;
  amenities: string[];
  roomTypes?: {
    name: string;
    priceFrom: number;
    description: string;
    originalPriceFrom?: number;
    discountPercent?: number;
    bedType?: string;
    sizeSqft?: number;
    maxGuests?: number;
    mealOption?: string;
    amenities?: string[];
    images?: string[];
    roomsLeft?: number;
    refundable?: boolean;
  }[];
  policies?: {
    cancellation: string;
    checkInTime: string;
    checkOutTime: string;
    rules: string[];
  };
  faqs?: { question: string; answer: string }[];
}