import type { Metadata } from "next";
import { HotelsPageClient } from "@/features/hotels/components/Hotelspageclient";
import { TravelSearchHero } from "@/features/home/components/TravelSearchHero";
import { allHotels, hotelDetails } from "@/features/hotels/data/hotels";

export const metadata: Metadata = {
  title: "All Hotels",
  description: "Browse all hotels available for booking.",
};

interface AllHotelsPageProps {
  searchParams: Promise<{
    searchType?: string;
    location?: string;
    checkIn?: string;
    checkOut?: string;
    rooms?: string;
    guests?: string;
  }>;
}

export default async function AllHotelsPage({ searchParams }: AllHotelsPageProps) {
  const search = await searchParams;
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 86_400_000);
  const toISODate = (d: Date) => d.toISOString().slice(0, 10);

  return (
    <>
      <TravelSearchHero
        eyebrow="Stay your way"
        title="Hotels for every journey"
        description="Search trusted stays, compare options, and book with confidence."
      />
      <HotelsPageClient
        hotels={allHotels}
        hotelDetails={hotelDetails}
        initial={{
          searchType: search.searchType === "international" ? "international" : "domestic",
          location: search.location ?? "",
          checkIn: search.checkIn ?? toISODate(today),
          checkOut: search.checkOut ?? toISODate(tomorrow),
          rooms: Number(search.rooms) || 1,
          guests: Number(search.guests) || 2,
        }}
      />
    </>
  );
}