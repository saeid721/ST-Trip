import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { TrendingDestination } from "@/features/home/types";

/**
 * Server-rendered bento grid. Featured cards (row 1) span 3 of 6 columns
 * each on desktop; the rest split 2 columns each — no client JS needed,
 * this is pure layout + Reveal's scroll-entrance.
 */
export function TrendingDestinationsSection({
  destinations,
}: {
  destinations: TrendingDestination[];
}) {
  const featured = destinations.filter((d) => d.featured);
  const rest = destinations.filter((d) => !d.featured);

  return (
    <section aria-labelledby="trending-destinations-heading" className="py-14 sm:py-20">
      <div className="container-app">
        <SectionHeading
          id="trending-destinations-heading"
          title="Trending Destinations"
          description="Most popular choices for travellers from Bangladesh."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {featured.map((destination, i) => (
            <Reveal key={destination.id} delay={i * 0.06} className="lg:col-span-3">
              <TrendingCard destination={destination} aspect="aspect-[16/8]" priority={i === 0} />
            </Reveal>
          ))}

          {rest.map((destination, i) => (
            <Reveal
              key={destination.id}
              delay={(featured.length + i) * 0.06}
              className="lg:col-span-2"
            >
              <TrendingCard destination={destination} aspect="aspect-[4/3]" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingCard({
  destination,
  aspect,
  priority = false,
}: {
  destination: TrendingDestination;
  aspect: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={destination.href}
      className={cn(
        "group relative block overflow-hidden rounded-xl",
        "transition-[transform,box-shadow] duration-300 [transition-timing-function:var(--ease-out-soft)]",
        "hover:-translate-y-1 hover:shadow-lg",
        aspect,
      )}
    >
      <Image
        src={destination.image}
        alt={destination.city}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
        priority={priority}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <span className="font-heading text-xl font-bold text-white drop-shadow-sm">
          {destination.city}
        </span>
        <span className="text-lg" aria-hidden>
          {destination.countryFlag}
        </span>
      </div>
    </Link>
  );
}