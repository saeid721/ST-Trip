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

// New interfaces for additional tabs
export interface CabinPrice {
  name: string;
  price: number;
}

export interface PackagePrice {
  cabinType1?: CabinPrice;
  cabinType2?: CabinPrice;
}

export interface LocationInfo {
  pickup: string;
  reportingTime: string;
  departureTime: string;
}

export interface PolicyInfo {
  cancellation: string[];
  refund: string[];
  childPolicy: string[];
}

export interface TravelTipsInfo {
  onCruise: string[];
  inJungle: string[];
  packingList: Record<string, string[]>;
}

export interface GroupSize {
  min: number;
  max: number;
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
  description?: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary?: ItineraryDay[];
  location?: LocationInfo;
  address?: string;
  coordinates?: { lat: number; lng: number };
  packagePrice?: PackagePrice;
  bookingSteps?: string[];
  additionalInfo?: string[];
  requirements?: string[];
  travelTips?: TravelTipsInfo;
  options?: string[];
  policy?: PolicyInfo;
  groupSize?: GroupSize;
  faqs?: PackageFaq[];
}