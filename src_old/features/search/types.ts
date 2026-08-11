export type TripType = "one-way" | "round-trip" | "multi-city";
export type CabinClass = "economy" | "premium-economy" | "business" | "first";

export interface AirportOption {
  code: string;
  city: string;
  name: string;
  country: string;
}

export interface TravelerCounts {
  adults: number;
  children: number;
  infants: number;
}

export interface FlightSearchValues {
  tripType: TripType;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  travelers: TravelerCounts;
  cabinClass: CabinClass;
}

export interface HotelSearchValues {
  destination: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: number;
}
