export type VisaCategory = "evisa" | "sticker" | "arrival";

export type VisaPurpose =
  | "tourist"
  | "business"
  | "student"
  | "work"
  | "transit"
  | "medical"
  | "family";

export interface VisaDoc {
  title: string;
  text?: string;
  points?: string[];
}

export interface VisaProfession {
  id: string;
  label: string;
  hint: string;
  docs: VisaDoc[];
}

export interface VisaFeeGroup {
  title: string;
  rows: { label: string; amount: number }[];
}

export interface VisaEmbassy {
  name: string;
  address: string;
  phone: string;
  hours?: string;
  email?: string;
}

export interface VisaSample {
  src: string;
  caption: string;
}

export interface VisaInfoRow {
  label: string;
  value: string;
}

export interface VisaGuide {
  purposes: VisaPurpose[];
  overview: { intro: string; highlight: string; restrictions: string };
  facts: VisaInfoRow[];
  eligibility: string[];
  professions: VisaProfession[];
  fees: { groups: VisaFeeGroup[]; note: string };
  processing: { summary: string; steps: string[] };
  samples: VisaSample[];
  about: {
    description: string;
    cities: string[];
    weather: string;
    map: { bbox: string; lat: number; lng: number };
  };
  travelRules: { beforeDeparture: string[]; afterArrival: string[] };
  embassies: VisaEmbassy[];
  countryInfo: VisaInfoRow[];
  disclaimer: string;
}

export interface VisaDestination {
  slug: string;
  name: string;
  /** ISO 3166-1 alpha-2, used for the flag image */
  code: string;
  category: VisaCategory;
  aliases?: string[];
  /** Short document list shown on cards / summary page */
  docs?: string[];
  /** Full guide (only destinations with a guide get the "Full guide" badge) */
  guide?: VisaGuide;
}