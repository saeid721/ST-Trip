"use client";

import { useState } from "react";
import { HotelsSearchHero, type HotelSearchValues } from "@/features/hotels/components/Hotelssearchhero";
import { HotelsBrowser } from "@/features/hotels/components/HotelsBrowser";
import type { HotelDetail, HotelListing } from "@/features/hotels/types";

interface HotelsPageClientProps {
  hotels: HotelListing[];
  hotelDetails: Record<string, HotelDetail>;
  initial: HotelSearchValues;
}

export function HotelsPageClient({ hotels, hotelDetails, initial }: HotelsPageClientProps) {
  const [values, setValues] = useState<HotelSearchValues>(initial);

  return (
    <>
      <HotelsSearchHero initial={initial} onSearch={setValues} />
      <HotelsBrowser
        hotels={hotels}
        hotelDetails={hotelDetails}
        locationQuery={values.location}
        searchContext={{
          checkIn: values.checkIn,
          checkOut: values.checkOut,
          rooms: values.rooms,
          guests: values.guests,
        }}
      />
    </>
  );
}