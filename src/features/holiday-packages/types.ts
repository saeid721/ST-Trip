export interface HolidayPackage {
  id: string;
  city: string;
  image: string;
  priceFrom: number;
  href: string;
}

export interface HolidayPackageItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface HolidayPackageFaq {
  question: string;
  answer: string;
}

export interface HolidayPackageDetail {
  slug: string;
  city: string;
  country?: string;
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
  itinerary?: HolidayPackageItineraryDay[];
  faqs?: HolidayPackageFaq[];
}