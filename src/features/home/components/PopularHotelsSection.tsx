import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContentCard } from "@/components/ui/ContentCard";
import { Reveal } from "@/components/ui/Reveal";
import { formatCurrency } from "@/lib/utils";
import type { HotelListing } from "@/features/home/types";

export function PopularHotelsSection({ hotels }: { hotels: HotelListing[] }) {
  return (
    <section aria-labelledby="popular-hotels-heading" className="bg-neutral-50 py-14 sm:py-20">
      <div className="container-app">
        <SectionHeading
          id="popular-hotels-heading"
          eyebrow="Cox's Bazar"
          title="Best Hotels in Cox's Bazar"
          description="Discover the vibrant culture of Bangladesh and the breathtaking beauty of Cox's Bazar."
          viewAllHref="/hotels"
        />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {hotels.map((hotel, i) => (
            <Reveal key={hotel.id} delay={i * 0.06}>
              <ContentCard
                href={hotel.href}
                image={hotel.image}
                imageAlt={`${hotel.name}, ${hotel.location}`}
                title={hotel.name}
                subtitle={`From ${formatCurrency(hotel.priceFrom)}/night`}
                rating={hotel.rating}
                reviewCount={hotel.reviewCount}
                priority={i === 0}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}