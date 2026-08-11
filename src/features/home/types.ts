/**
 * Types are written as if they come from an API response, so swapping
 * features/home/data/*.ts for real `fetch()` calls later requires no
 * changes to the section components themselves.
 */

export interface PromoBanner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  href: string;
}

export interface HotDeal {
  id: string;
  bankLogo: string;
  bankName: string;
  discountLabel: string;
  title: string;
  description: string;
  promoCode: string;
  expiresAt: string; // ISO date
  href: string;
}

export interface HotelListing {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  href: string;
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  image: string;
  hotelsAvailable: number;
  href: string;
}

export interface TrendingDestination {
  id: string;
  city: string;
  /** Flag emoji, e.g. "🇧🇩" — rendered next to the city name. */
  countryFlag: string;
  image: string;
  href: string;
  /** Marks the two large bento cells (top row); the rest render smaller. */
  featured?: boolean;
}

export interface HolidayPackage {
  id: string;
  city: string;
  priceFrom: number;
  image: string;
  href: string;
}


export interface Airline {
  id: string;
  name: string;
  logo: string;
  href: string;
}

export interface Route {
  id: string;
  originCity: string;
  originCode: string;
  destinationCity: string;
  destinationCode: string;
  type: "domestic" | "international";
  href: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string; // ISO date
  href: string;
}

export interface HelpTile {
  id: string;
  title: string;
  thumbnail: string;
  href: string;
}

export interface TrustBadgeItem {
  id: string;
  label: string;
  description: string;
}