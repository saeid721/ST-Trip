
export type IconKey =
  | "shield"
  | "heart"
  | "compass"
  | "sparkles"
  | "plane"
  | "hotel"
  | "tour"
  | "visa"
  | "click"
  | "support"
  | "flex"
  | "grid"
  | "handshake"
  | "target"
  | "eye";

export interface CompanyValue {
  id: string;
  icon: IconKey;
  title: string;
  description: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  icon: IconKey;
  title: string;
  description: string;
  href: string;
}

export interface WhyChooseItem {
  id: string;
  icon: IconKey;
  title: string;
  description: string;
}

export interface JourneyStep {
  id: string;
  label: string;
  icon: IconKey;
  title: string;
  description: string;
}