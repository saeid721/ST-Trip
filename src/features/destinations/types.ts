export interface Attraction {
  name: string;
  description: string;
  image: string;
}

export interface DestinationDetail {
  slug: string;
  city: string;
  country: string;
  countryFlag: string;
  tagline: string;
  image: string;
  gallery: string[];
  longOverview: string;
  whyVisit: string[];
  attractions: Attraction[];
  bestTimeToVisit: string;
  currency: string;
  languages: string;
}
