import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContentCard } from "@/components/ui/ContentCard";
import { Reveal } from "@/components/ui/Reveal";
import { formatCurrency } from "@/lib/utils";
import { allHotels } from "@/features/hotels/data/hotels";

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
      <section className="py-14 sm:py-20">
        <div className="container-app">
          <SectionHeading id="all-hotels-heading" title={`${allHotels.length} Hotels Available`} />
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {allHotels.map((hotel, i) => (
              <Reveal key={hotel.id} delay={i * 0.06}>
                <ContentCard
                  href={hotel.href}
                  image={hotel.image}
                  imageAlt={`${hotel.name}, ${hotel.location}`}
                  title={hotel.name}
                  subtitle={`From ${formatCurrency(hotel.priceFrom)}/night`}
                  rating={hotel.rating}
                  reviewCount={hotel.reviewCount}
                  priority={i < 4}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}