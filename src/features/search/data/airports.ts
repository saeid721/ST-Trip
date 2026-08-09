import type { AirportOption } from "@/features/search/types";

/** Mock airport dataset — swap for a real /api/airports?q= endpoint later. */
export const airports: AirportOption[] = [
  { code: "DAC", city: "Dhaka", name: "Hazrat Shahjalal International", country: "Bangladesh" },
  { code: "CXB", city: "Cox's Bazar", name: "Cox's Bazar Airport", country: "Bangladesh" },
  { code: "ZYL", city: "Sylhet", name: "Osmani International", country: "Bangladesh" },
  { code: "CGP", city: "Chattogram", name: "Shah Amanat International", country: "Bangladesh" },
  { code: "JSR", city: "Jashore", name: "Jashore Airport", country: "Bangladesh" },
  { code: "BZL", city: "Barisal", name: "Barisal Airport", country: "Bangladesh" },
  { code: "SPD", city: "Saidpur", name: "Saidpur Airport", country: "Bangladesh" },
  { code: "DXB", city: "Dubai", name: "Dubai International", country: "UAE" },
  { code: "SIN", city: "Singapore", name: "Changi Airport", country: "Singapore" },
  { code: "KUL", city: "Kuala Lumpur", name: "Kuala Lumpur International", country: "Malaysia" },
  { code: "BKK", city: "Bangkok", name: "Suvarnabhumi Airport", country: "Thailand" },
  { code: "DOH", city: "Doha", name: "Hamad International", country: "Qatar" },
  { code: "LHR", city: "London", name: "Heathrow Airport", country: "United Kingdom" },
  { code: "DEL", city: "Delhi", name: "Indira Gandhi International", country: "India" },
];
