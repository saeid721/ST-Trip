import type { Metadata } from "next";
import { TravelSearchHero } from "@/features/home/components/TravelSearchHero";
import { FlightsResults } from "@/features/flights/components/FlightsResults";

export const metadata: Metadata = {
  title: "Flights",
};

export default function FlightsPage() {
  return (
    <>
      <TravelSearchHero
        eyebrow="Domestic & International Flights"
        title="Find Your Perfect Flight"
        description="Compare fares across leading airlines and book with transparent pricing and dependable support."
      />
      <section className="pb-12 sm:pb-16">
        <div className="container-app pt-[calc(var(--header-height)+1rem)]">
          <FlightsResults />
        </div>
      </section>
    </>
  );
}
