import type { EsimCountry, EsimPlan, EsimRegion } from "@/features/esim/types";

export const esimCountries: EsimCountry[] = [
  { code: "AF", name: "Afghanistan", flag: "🇦🇫", region: "Asia" },
  { code: "AU", name: "Australia", flag: "🇦🇺", region: "Oceania" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", region: "Asia" },
  { code: "CA", name: "Canada", flag: "🇨🇦", region: "North America" },
  { code: "CN", name: "China", flag: "🇨🇳", region: "Asia" },
  { code: "EG", name: "Egypt", flag: "🇪🇬", region: "Africa" },
  { code: "FR", name: "France", flag: "🇫🇷", region: "Europe" },
  { code: "DE", name: "Germany", flag: "🇩🇪", region: "Europe" },
  { code: "IN", name: "India", flag: "🇮🇳", region: "Asia" },
  { code: "IT", name: "Italy", flag: "🇮🇹", region: "Europe" },
  { code: "JP", name: "Japan", flag: "🇯🇵", region: "Asia" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", region: "Asia" },
  { code: "MV", name: "Maldives", flag: "🇲🇻", region: "Asia" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", region: "Oceania" },
  { code: "QA", name: "Qatar", flag: "🇶🇦", region: "Middle East" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", region: "Asia" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", region: "Asia" },
  { code: "ES", name: "Spain", flag: "🇪🇸", region: "Europe" },
  { code: "TH", name: "Thailand", flag: "🇹🇭", region: "Asia" },
  { code: "TR", name: "Türkiye", flag: "🇹🇷", region: "Middle East" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", region: "Middle East" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", region: "Europe" },
  { code: "US", name: "United States", flag: "🇺🇸", region: "North America" },
];

export const esimRegions: EsimRegion[] = [
  { id: "eu-uk", name: "European Union and United Kingdom", description: "Stay connected across Europe", countryCodes: ["FR", "DE", "IT", "ES", "GB"] },
  { id: "europe", name: "Europe", description: "One plan for European travel", countryCodes: ["FR", "DE", "IT", "ES", "GB"] },
  { id: "asia", name: "Asia", description: "Stay connected across Asia", countryCodes: ["AF", "BD", "CN", "IN", "JP", "MY", "MV", "SG", "KR", "TH"] },
  { id: "africa", name: "Africa", description: "Reliable data for your African journey", countryCodes: ["EG"] },
  { id: "caribbean", name: "Caribbean Islands", description: "Travel connected across the Caribbean", countryCodes: [] },
  { id: "discover-global", name: "Discover Global", description: "Flexible connectivity across destinations", countryCodes: esimCountries.map((country) => country.code) },
  { id: "latin-america", name: "Latin America", description: "Stay connected across Latin America", countryCodes: [] },
  { id: "mena", name: "Middle East and North Africa", description: "Explore the Middle East and North Africa", countryCodes: ["QA", "TR", "AE", "EG"] },
  { id: "north-america", name: "North America", description: "Coverage for the United States and Canada", countryCodes: ["CA", "US"] },
  { id: "oceania", name: "Oceania", description: "Travel connected across the Pacific", countryCodes: ["AU", "NZ"] },
  { id: "africa-safari", name: "Africa Safari", description: "Reliable data for your safari journey", countryCodes: ["EG"] },
];

const planTemplates = [
  { data: "1 GB", duration: "7 days", price: 829 },
  { data: "3 GB", duration: "15 days", price: 1289 },
  { data: "10 GB", duration: "30 days", price: 2062 },
];

const europePlanTemplates = [
  { data: "500 MB", duration: "3 days", price: 203 },
  { data: "1 GB", duration: "7 days", price: 332 },
  { data: "2 GB", duration: "15 days", price: 461 },
];

export const esimPlans: EsimPlan[] = esimCountries.flatMap((country) =>
  (country.region === "Europe" ? europePlanTemplates : planTemplates).map((template, index) => ({
    id: `${country.code.toLowerCase()}-${index + 1}`,
    countryCode: country.code,
    provider: country.region === "Europe" ? "Eurolink" : country.code === "AF" ? "Sohbat Mobile" : "ST Connect",
    ...template,
    coverage: country.name,
    network: "4G LTE",
  })),
);

export function getCountry(code: string) {
  return esimCountries.find((country) => country.code === code);
}

export function getRegion(id: string) {
  return esimRegions.find((region) => region.id === id);
}

export function getPlansForCountries(countryCodes: string[]) {
  return esimPlans.filter((plan) => countryCodes.includes(plan.countryCode));
}