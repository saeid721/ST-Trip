"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { domesticLocations, internationalLocations } from "@/features/hotels/data/locations";

export function TourSearchTab() {
  const router = useRouter();
  const [searchType, setSearchType] = useState<"domestic" | "international">("domestic");
  const [destination, setDestination] = useState("");
  const [month, setMonth] = useState("");

  const [locationOpen, setLocationOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  const locationOptions = searchType === "domestic" ? domesticLocations : internationalLocations;
  const filteredLocations = useMemo(
    () => locationOptions.filter((loc) => loc.toLowerCase().includes(destination.toLowerCase())),
    [locationOptions, destination],
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ searchType, destination, month });
    router.push(`/tour-packages?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      {/* Row 1: Domestic / International */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-5 text-sm font-medium text-neutral-700">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="tourSearchType"
              checked={searchType === "domestic"}
              onChange={() => {
                setSearchType("domestic");
                setDestination("");
                setLocationOpen(false);
              }}
              className="h-4 w-4 accent-primary-600"
            />
            Domestic
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="tourSearchType"
              checked={searchType === "international"}
              onChange={() => {
                setSearchType("international");
                setDestination("");
                setLocationOpen(false);
              }}
              className="h-4 w-4 accent-primary-600"
            />
            International
          </label>
        </div>
      </div>

      {/* Row 2: Location + Travel month + Search */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:items-end">
        <div ref={locationRef} className="relative">
          <label htmlFor="tourDestination" className="block text-xs font-medium text-neutral-500">
            Where do you want to go?
            <div className="mt-1 flex h-11 items-center gap-2 rounded-lg border border-neutral-200 px-3 transition-colors focus-within:border-primary-400">
              <MapPin className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
              <input
                id="tourDestination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setLocationOpen(true)}
                autoComplete="off"
                placeholder={searchType === "domestic" ? "Search city or district" : "Search city or country"}
                className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
              />
            </div>
          </label>

          {locationOpen && (
            <div className="absolute left-0 top-full z-40 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setDestination(loc);
                      setLocationOpen(false);
                    }}
                    className={`block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-700 ${
                      loc === destination ? "bg-primary-50 text-primary-700" : "text-neutral-700"
                    }`}
                  >
                    {loc}
                  </button>
                ))
              ) : (
                <p className="px-3 py-2 text-sm text-neutral-400">No matches found</p>
              )}
            </div>
          )}
        </div>

        <label className="block text-xs font-medium text-neutral-500">
          Travel month
          <div className="mt-1 flex h-11 items-center gap-2 rounded-lg border border-neutral-200 px-3 transition-colors focus-within:border-primary-400">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <input
              id="tourMonth"
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full bg-transparent text-sm text-neutral-900 outline-none"
            />
          </div>
        </label>

        <Button type="submit" variant="primary" size="lg" className="h-11 gap-2">
          <Search className="h-4 w-4" aria-hidden />
          Find Tours
        </Button>
      </div>
    </form>
  );
}