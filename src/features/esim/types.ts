export type EsimMode = "country" | "region";

export interface EsimCountry {
  code: string;
  name: string;
  flag: string;
  region: string;
}

export interface EsimRegion {
  id: string;
  name: string;
  description: string;
  countryCodes: string[];
}

export interface EsimPlan {
  id: string;
  countryCode: string;
  provider: string;
  data: string;
  duration: string;
  price: number;
  coverage: string;
  network: string;
}