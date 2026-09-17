import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { HotelsBrowser } from "@/features/hotels/components/HotelsBrowser";
import { allHotels, hotelDetails } from "@/features/hotels/data/hotels";

export const metadata: Metadata = {
  title: "All Hotels",
  description: "Browse all hotels available for booking.",
};

export default function AllHotelsPage() {
  return (
    <>
      <PageHero
        eyebrow="Hotels"
        title="All Hotels"
        description="Browse every hotel available for booking across our destinations."
      />
      <HotelsBrowser hotels={allHotels} hotelDetails={hotelDetails} />
    </>
  );
}