import type { Metadata } from "next";
import { TravelSearchHero } from "@/features/home/components/TravelSearchHero";

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
      <section className="py-12 sm:py-16">
    <div className="container-app py-24 pt-[calc(var(--header-height)+3rem)] text-center">
      <h1 className="font-heading text-3xl font-bold text-neutral-900">
        Flights — coming soon
      </h1>
      <p className="mt-3 text-neutral-500">
        This page will host the flight search results experience.
      </p>
    </div>
      </section>
    </>
  );
}
