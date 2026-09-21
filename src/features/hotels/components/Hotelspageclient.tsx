"use client";

import { HotelsBrowser } from "@/features/hotels/components/HotelsBrowser";
import type { HotelDetail, HotelListing } from "@/features/hotels/types";

interface HotelSearchValues {
  searchType: "domestic" | "international";
  location: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: number;
}

interface HotelsPageClientProps {
  hotels: HotelListing[];
  hotelDetails: Record<string, HotelDetail>;
  initial: HotelSearchValues;
}

export function HotelsPageClient({ hotels, hotelDetails, initial }: HotelsPageClientProps) {
  return (
    <HotelsBrowser
      hotels={hotels}
      hotelDetails={hotelDetails}
      locationQuery={initial.location}
      searchContext={{
        checkIn: initial.checkIn,
        checkOut: initial.checkOut,
        rooms: initial.rooms,
        guests: initial.guests,
      }}
    />
  );
}
