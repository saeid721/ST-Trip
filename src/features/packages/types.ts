export interface PackageCategory {
  value: string;
  label: string;
}

export interface PackageItem {
  id: string;
  category: string;
  title: string;
  image: string;
  durationDays: number;
  priceFrom: number;
  href: string;
  badge?: string;
  nightsLabel?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface PackageFaq {
  question: string;
  answer: string;
}

export interface PackageDetail {
  slug: string;
  category: string;
  title: string;
  subtitle?: string;
  heroImage: string;
  gallery?: string[];
  durationDays: number;
  nightsLabel?: string;
  priceFrom: number;
  priceNote?: string;
  badge?: string;
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary?: ItineraryDay[];
  faqs?: PackageFaq[];
}