import type { Metadata } from "next";
import { TravelSearchHero } from "@/features/home/components/TravelSearchHero";
import { FlightsResults } from "@/features/flights/components/FlightsResults";

export const metadata: Metadata = {
  title: "Flights",
};

interface FlightsPageProps {
  searchParams: Promise<{ from?: string; to?: string; date?: string }>;
}

export default async function FlightsPage({ searchParams }: FlightsPageProps) {
  const sp = await searchParams;
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
  const from = (sp.from ?? "DAC").toUpperCase();
  const to = (sp.to ?? "CXB").toUpperCase();
  const date = sp.date && /^\d{4}-\d{2}-\d{2}$/.test(sp.date) && sp.date >= today ? sp.date : today;

  return (
    <>
      <TravelSearchHero
        eyebrow="Domestic & International Flights"
        title="Find Your Perfect Flight"
        description="Compare fares across leading airlines and book with transparent pricing and dependable support."
      />
      <section className="pb-12 sm:pb-16">
        <div className="container-app pt-[calc(var(--header-height)+1rem)]">
          <FlightsResults key={`${from}-${to}`} from={from} to={to} initialDate={date} minDate={today} />
        </div>
      </section>
    </>
  );
}
