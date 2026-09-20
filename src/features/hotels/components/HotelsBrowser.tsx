"use client";

import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, Search as SearchIcon, ChevronDown } from "lucide-react";
import { HotelCard } from "@/features/hotels/components/HotelCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { HotelDetail, HotelListing } from "@/features/hotels/types";

type SortOption = "default" | "price-asc" | "price-desc" | "rating-desc";

interface HotelsBrowserProps {
  hotels: HotelListing[];
  hotelDetails: Record<string, HotelDetail>;
  locationQuery?: string;
  searchType?: "domestic" | "international";
  searchContext?: {
    checkIn: string;
    checkOut: string;
    rooms: number;
    guests: number;
  };
}

export function HotelsBrowser({
  hotels,
  hotelDetails,
  locationQuery = "",
  searchContext,
}: HotelsBrowserProps) {
  const enriched = useMemo(
    () =>
      hotels.map((hotel) => {
        const slug = hotel.href.split("/").pop() ?? "";
        const detail = hotelDetails[slug];
        return {
          ...hotel,
          slug,
          amenities: detail?.amenities ?? [],
          propertyType: /resort/i.test(hotel.name) ? "Resort" : "Hotel",
        };
      }),
    [hotels, hotelDetails],
  );

  const propertyTypes = useMemo(
    () => Array.from(new Set(enriched.map((h) => h.propertyType))).sort(),
    [enriched],
  );
  const amenityOptions = useMemo(() => {
    const counts = new Map<string, number>();
    enriched.forEach((h) => h.amenities.forEach((a) => counts.set(a, (counts.get(a) ?? 0) + 1)));
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).map(([label]) => label);
  }, [enriched]);
  const priceBounds = useMemo(() => {
    const prices = enriched.map((h) => h.priceFrom);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [enriched]);

  const [search, setSearch] = useState(locationQuery);
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [minStars, setMinStars] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState(priceBounds.min);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Keep the sidebar search box in sync whenever the hero search is submitted.
  useEffect(() => {
    setSearch(locationQuery);
  }, [locationQuery]);

  // Query string carried from the hero search into each hotel's detail page,
  // so Check-In/Check-Out/Rooms/Guests show up in that page's "Your Search" card.
  const detailQueryString = useMemo(() => {
    if (!searchContext) return "";
    const params = new URLSearchParams({
      checkIn: searchContext.checkIn,
      checkOut: searchContext.checkOut,
      rooms: String(searchContext.rooms),
      guests: String(searchContext.guests),
    });
    return `?${params.toString()}`;
  }, [searchContext]);

  function toggle(set: Set<string>, value: string, setter: (s: Set<string>) => void) {
    const next = new Set(set);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    setter(next);
  }

  function clearAll() {
    setSearch("");
    setSelectedTypes(new Set());
    setSelectedAmenities(new Set());
    setMinStars(null);
    setMinPrice(priceBounds.min);
    setMaxPrice(priceBounds.max);
    setSortBy("default");
  }

  const filtered = useMemo(() => {
    const list = enriched.filter((hotel) => {
      const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
      const searchCity = search.split(" - ")[0] ?? search;
      const matchesSearch =
        search.trim() === "" ||
        hotel.name.toLowerCase().includes(search.toLowerCase()) ||
        normalize(hotel.location).includes(normalize(searchCity));
      const matchesType = selectedTypes.size === 0 || selectedTypes.has(hotel.propertyType);
      const matchesAmenities =
        selectedAmenities.size === 0 || hotel.amenities.some((a) => selectedAmenities.has(a));
      const matchesStars = minStars === null || Math.round(hotel.rating) >= minStars;
      const matchesPrice = hotel.priceFrom >= minPrice && hotel.priceFrom <= maxPrice;
      return matchesSearch && matchesType && matchesAmenities && matchesStars && matchesPrice;
    });

    return list.slice().sort((a, b) => {
      if (sortBy === "price-asc") return a.priceFrom - b.priceFrom;
      if (sortBy === "price-desc") return b.priceFrom - a.priceFrom;
      if (sortBy === "rating-desc") return b.rating - a.rating;
      return 0;
    });
  }, [enriched, search, selectedTypes, selectedAmenities, minStars, minPrice, maxPrice, sortBy]);

  const visibleAmenities = showAllAmenities ? amenityOptions : amenityOptions.slice(0, 4);

  return (
    <section className="py-8 sm:py-10">
      <div className="container-app">
        <h2 id="all-hotels-heading" className="mb-6 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          {filtered.length} Hotels Available
        </h2>

        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          className="mb-4 flex w-full items-center justify-between rounded-xl bg-primary-700 px-4 py-3 text-sm font-semibold text-white shadow-sm lg:hidden"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filters & Sort
          </span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", filtersOpen && "rotate-180")} aria-hidden />
        </button>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside
            className={cn(
              "h-fit rounded-xl border border-neutral-200 bg-white p-4 shadow-sm max-lg:p-3 lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:block",
              filtersOpen ? "block" : "hidden",
            )}
          >
            <div className="mb-2.5 flex items-center justify-between max-lg:mb-2">
              <p className="flex items-center gap-2 text-sm font-bold text-neutral-900">
                <SlidersHorizontal className="h-4 w-4 text-primary-700" aria-hidden />
                Filters & Sort
              </p>
              <button type="button" onClick={clearAll} className="text-xs font-semibold text-primary-700 hover:text-primary-800">
                Clear All
              </button>
            </div>

            <div className="relative mb-2.5 max-lg:mb-2">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search hotel name, area..."
                className="w-full rounded-lg border border-neutral-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary-400"
              />
            </div>

            <FilterGroup title="Property Type">
              {propertyTypes.map((type) => (
                <Checkbox key={type} label={type} checked={selectedTypes.has(type)} onChange={() => toggle(selectedTypes, type, setSelectedTypes)} />
              ))}
            </FilterGroup>

            <FilterGroup title="Amenities">
              {visibleAmenities.map((amenity) => (
                <Checkbox key={amenity} label={amenity} checked={selectedAmenities.has(amenity)} onChange={() => toggle(selectedAmenities, amenity, setSelectedAmenities)} />
              ))}
              {amenityOptions.length > 4 && (
                <button type="button" onClick={() => setShowAllAmenities((v) => !v)} className="mt-1 text-xs font-semibold text-primary-700 hover:text-primary-800">
                  {showAllAmenities ? "Show less" : "Show more"}
                </button>
              )}
            </FilterGroup>

            <FilterGroup title="Star Rating">
              <div className="flex flex-wrap gap-1 max-lg:gap-1">
                {[5, 4, 3, 2, 1].map((n) => (
                  <StarPill key={n} label={`${n}★`} active={minStars === n} onClick={() => setMinStars(n)} />
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Price / Night">
              <div className="flex items-center gap-2">
                <input type="number" value={minPrice} min={priceBounds.min} max={maxPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full rounded-lg border border-neutral-200 px-2 py-1.5 text-xs outline-none focus:border-primary-400" />
                <span className="text-xs text-neutral-400">—</span>
                <input type="number" value={maxPrice} min={minPrice} max={priceBounds.max}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full rounded-lg border border-neutral-200 px-2 py-1.5 text-xs outline-none focus:border-primary-400" />
              </div>
              <input type="range" min={priceBounds.min} max={priceBounds.max} value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-1.5 w-full accent-primary-600 max-lg:mt-1" />
            </FilterGroup>

            <FilterGroup title="Sort By" last>
              {([
                { value: "default", label: "Default" },
                { value: "price-asc", label: "Price: Low to High" },
                { value: "price-desc", label: "Price: High to Low" },
                { value: "rating-desc", label: "Top Rated" },
              ] as { value: SortOption; label: string }[]).map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 py-0.5 text-sm text-neutral-700 max-lg:py-1">
                  <input type="radio" name="sortBy" checked={sortBy === opt.value} onChange={() => setSortBy(opt.value)} className="h-4 w-4 accent-primary-600" />
                  {opt.label}
                </label>
              ))}
            </FilterGroup>
          </aside>

          <div>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((hotel, i) => (
                  <Reveal key={hotel.id} delay={i * 0.06}>
                    <HotelCard
                      href={`${hotel.href}${detailQueryString}`}
                        image={hotel.image}
                        name={hotel.name}
                        location={hotel.location}
                        priceFrom={hotel.priceFrom}
                        rating={hotel.rating}
                        amenities={hotel.amenities}
                        priority={i < 4}
                        />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-neutral-300 bg-white p-10 text-center">
                <p className="text-sm font-semibold text-neutral-700">No hotels match your filters</p>
                <button type="button" onClick={clearAll} className="mt-3 inline-flex h-9 items-center rounded-lg border border-neutral-300 px-4 text-xs font-semibold text-neutral-700 hover:border-primary-400 hover:text-primary-700">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ title, children, last = false }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={cn("mb-2.5 border-b border-neutral-100 pb-2.5 max-lg:mb-2 max-lg:pb-2", last && "mb-0 border-none pb-0")}>
      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-neutral-500">{title}</p>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-neutral-700">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded accent-primary-600" />
      {label}
    </label>
  );
}

function StarPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
        active ? "border-primary-600 bg-primary-600 text-white" : "border-neutral-200 text-neutral-600 hover:border-primary-300",
      )}
    >
      {label}
    </button>
  );
}