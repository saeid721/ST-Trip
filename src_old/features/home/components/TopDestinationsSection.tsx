import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContentCard } from "@/components/ui/ContentCard";
import type { Destination } from "@/features/home/types";

export function TopDestinationsSection({ destinations }: { destinations: Destination[] }) {
  return (
    <section aria-labelledby="top-destinations-heading" className="py-14 sm:py-20">
      <div className="container-app">
        <SectionHeading
          id="top-destinations-heading"
          eyebrow="Where to next"
          title="Top Destinations"
          description="From iconic landmarks to hidden gems — explore places that make every journey memorable."
        />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {destinations.map((destination, i) => (
            <div
              key={destination.id}
              className="lg:[&:nth-child(2n)]:translate-y-4"
              style={{ transition: "transform 300ms var(--ease-out-soft)" }}
            >
              <ContentCard
                href={destination.href}
                image={destination.image}
                imageAlt={`${destination.city}, ${destination.country}`}
                title={destination.city}
                subtitle={destination.country}
                badge={`${destination.hotelsAvailable} hotels`}
                aspect="portrait"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
