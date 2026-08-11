import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flights",
};

/**
 * Placeholder route — reuses the same feature-based structure the homepage
 * follows. Build out features/flights/ (mirroring features/home/) when this
 * page's real search-results UI is scoped.
 */
export default function FlightsPage() {
  return (
    <div className="container-app py-24 pt-[calc(var(--header-height)+3rem)] text-center">
      <h1 className="font-heading text-3xl font-bold text-neutral-900">
        Flights — coming soon
      </h1>
      <p className="mt-3 text-neutral-500">
        This page will host the flight search results experience.
      </p>
    </div>
  );
}
