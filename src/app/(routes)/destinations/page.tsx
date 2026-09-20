import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, MapPin, Plane } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { topDestinations, trendingDestinations } from "@/features/home/data";
import { getDestinationDetail } from "@/features/destinations/data/destinations";
import { cn, slugify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All Destinations",
  description: "Browse trending international getaways and top Bangladesh destinations.",
};

type DestinationIndexItem = {
  id: string;
  city: string;
  country: string;
  image: string;
  href: string;
  hotelsAvailable: number;
  badge: "Trending" | "Popular";
  tagline: string;
};

function getSlugFromHref(href: string) {
  return href.split("/").filter(Boolean).at(-1) ?? slugify(href);
}

function buildDestinationItems(): DestinationIndexItem[] {
  const items = new Map<string, DestinationIndexItem>();

  for (const destination of trendingDestinations) {
    const slug = getSlugFromHref(destination.href);
    const detail = getDestinationDetail(slug);

    items.set(destination.href, {
      id: destination.id,
      city: destination.city,
      country: detail.country,
      image: destination.image,
      href: destination.href,
      hotelsAvailable: 0,
      badge: "Trending",
      tagline: detail.tagline,
    });
  }

  for (const destination of topDestinations) {
    const slug = getSlugFromHref(destination.href);
    const detail = getDestinationDetail(slug);
    const existing = items.get(destination.href);

    items.set(destination.href, {
      id: existing?.id ?? destination.id,
      city: existing?.city ?? destination.city,
      country: existing?.country ?? destination.country,
      image: existing?.image ?? destination.image,
      href: destination.href,
      hotelsAvailable: destination.hotelsAvailable,
      badge: existing?.badge ?? "Popular",
      tagline: existing?.tagline ?? detail.tagline,
    });
  }

  return Array.from(items.values());
}

export default function DestinationsPage() {
  const destinations = buildDestinationItems();
  const trendingCount = destinations.filter((item) => item.badge === "Trending").length;
  const localCount = destinations.filter((item) => item.country === "Bangladesh").length;

  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Explore Every Destination"
        description="Find trending international escapes and local getaways with hotels, travel tips and planning support in one place."
      />

      <section className="border-b border-neutral-200 bg-white py-6">
        <div className="container-app grid gap-3 sm:grid-cols-3">
          <SummaryStat icon={MapPin} label="Destinations" value={destinations.length} />
          <SummaryStat icon={Plane} label="Trending Trips" value={trendingCount} />
          <SummaryStat icon={Building2} label="Bangladesh Spots" value={localCount} />
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-app">
          <SectionHeading
            id="all-destinations-heading"
            title={`${destinations.length} Destinations Available`}
            description="Choose a destination to view highlights, hotels, packages and booking support."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {destinations.map((destination, index) => (
              <Reveal key={destination.href} delay={(index % 8) * 0.04}>
                <DestinationCard destination={destination} priority={index < 4} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SummaryStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div>
        <p className="font-heading text-xl font-bold leading-none text-neutral-900">{value}</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          {label}
        </p>
      </div>
    </div>
  );
}

function DestinationCard({
  destination,
  priority,
}: {
  destination: DestinationIndexItem;
  priority: boolean;
}) {
  const hasHotels = destination.hotelsAvailable > 0;

  return (
    <Link
      href={destination.href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm",
        "transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:var(--ease-out-soft)]",
        "hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:border-primary-300 focus-visible:shadow-lg",
      )}
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-neutral-100">
        <Image
          src={destination.image}
          alt={`${destination.city}, ${destination.country}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-sm",
            destination.badge === "Trending" ? "bg-accent-500" : "bg-primary-600",
          )}
        >
          {destination.badge}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h2 className="font-heading text-xl font-bold leading-tight text-white">
            {destination.city}
          </h2>
          <p className="mt-0.5 text-sm font-medium text-white/85">{destination.country}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="line-clamp-2 min-h-10 text-sm leading-relaxed text-neutral-600">
          {destination.tagline}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-neutral-100 pt-4">
          <span className="text-xs font-semibold text-neutral-500">
            {hasHotels ? `${destination.hotelsAvailable}+ hotels` : "Travel guide ready"}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
            View details
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
