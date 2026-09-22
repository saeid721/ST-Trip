"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { BedDouble, CalendarDays, Minus, MapPin, Plus, Search, Users } from "lucide-react";
import { domesticLocations, internationalLocations } from "@/features/hotels/data/locations";

export interface HotelSearchValues {
  searchType: "domestic" | "international";
  location: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: number;
}

interface HotelsSearchHeroProps {
  initial: HotelSearchValues;
  onSearch: (values: HotelSearchValues) => void;
}

const HERO_IMAGE = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80";

export function HotelsSearchHero({ initial, onSearch }: HotelsSearchHeroProps) {
  const [searchType, setSearchType] = useState(initial.searchType);
  const [location, setLocation] = useState(initial.location);
  const [checkIn, setCheckIn] = useState(initial.checkIn);
  const [checkOut, setCheckOut] = useState(initial.checkOut);
  const [rooms, setRooms] = useState(initial.rooms);
  const [guests, setGuests] = useState(initial.guests);

  const [locationOpen, setLocationOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);
  const locationOptions = searchType === "domestic" ? domesticLocations : internationalLocations;
  const filteredLocations = useMemo(
    () => locationOptions.filter((loc) => loc.toLowerCase().includes(location.toLowerCase())),
    [locationOptions, location],
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
    onSearch({ searchType, location, checkIn, checkOut, rooms, guests });
  }

  return (
    <section className="relative">
      <div className="relative h-[220px] w-full overflow-hidden sm:h-[280px] md:h-[320px]">
        <Image src={HERO_IMAGE} alt="Hotels" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-neutral-900/55" />
        <div className="absolute inset-0 flex items-center justify-center pt-[var(--header-height)]">
        </div>
      </div>

      <div className="container-app relative -mt-16 sm:-mt-20 md:-mt-24">
        <form onSubmit={handleSubmit} className="rounded-md bg-white p-4 shadow-lg sm:p-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-5 text-sm font-medium text-neutral-700">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="hotelSearchType"
                  checked={searchType === "domestic"}
                  onChange={() => { setSearchType("domestic"); setLocation(""); setLocationOpen(false); }}
                  className="h-4 w-4 accent-primary-600"
                />
                Domestic
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="hotelSearchType"
                  checked={searchType === "international"}
                  onChange={() => { setSearchType("international"); setLocation(""); setLocationOpen(false); }}
                  className="h-4 w-4 accent-primary-600"
                />
                International
              </label>
            </div>

            <div className="flex items-center gap-5 sm:ml-auto">
              <CounterField icon={BedDouble} label="Room" value={rooms} onChange={setRooms} min={1} max={8} />
              <CounterField icon={Users} label="Guests" value={guests} onChange={setGuests} min={1} max={16} />
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
            <div ref={locationRef} className="relative">
              <label htmlFor="hotelLocation" className="block text-xs font-medium text-neutral-500">
                Location
                <div className="mt-1 flex h-11 items-center gap-2 rounded-sm border border-neutral-200 px-3 focus-within:border-primary-400">
                  <MapPin className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
                  <input
                    id="hotelLocation"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setLocationOpen(true)}
                    autoComplete="off"
                    placeholder={searchType === "domestic" ? "Search city or district" : "Search city or country"}
                    className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                  />
                </div>
              </label>

              {locationOpen && (
                <div className="absolute left-0 top-full z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-sm border border-neutral-200 bg-white p-1 shadow-lg">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          setLocation(loc);
                          setLocationOpen(false);
                        }}
                        className={`block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-700 ${
                          loc === location ? "bg-primary-50 text-primary-700" : "text-neutral-700"
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
            <SearchField label="Check-In">
              <CalendarDays className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-sm text-neutral-900 outline-none"
              />
            </SearchField>
            <SearchField label="Check-Out">
              <CalendarDays className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-sm text-neutral-900 outline-none"
              />
            </SearchField>
            <button
              type="submit"
              className="flex h-11 items-center justify-center gap-2 rounded-sm bg-primary-600 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              <Search className="h-4 w-4" aria-hidden />
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function SearchField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium text-neutral-500">
      {label}
      <div className="mt-1 flex h-11 items-center gap-2 rounded-sm border border-neutral-200 px-3 focus-within:border-primary-400">
        {children}
      </div>
    </label>
  );
}

function CounterField({
  icon: Icon,
  label,
  value,
  onChange,
  min = 1,
  max = 10,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 transition-colors hover:text-primary-700"
      >
        <Icon className="h-4 w-4 text-primary-600" aria-hidden />
        {label} - {value}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 flex items-center gap-3 rounded-sm border border-neutral-200 bg-white p-3 shadow-lg">
          <button
            type="button"
            onClick={() => onChange(Math.max(min, value - 1))}
            disabled={value <= min}
            aria-label={`Decrease ${label}`}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-primary-300 hover:text-primary-700 disabled:pointer-events-none disabled:opacity-40"
          >
            <Minus className="h-3.5 w-3.5" aria-hidden />
          </button>
          <span className="w-5 text-center text-sm font-semibold text-neutral-900">{value}</span>
          <button
            type="button"
            onClick={() => onChange(Math.min(max, value + 1))}
            disabled={value >= max}
            aria-label={`Increase ${label}`}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-primary-300 hover:text-primary-700 disabled:pointer-events-none disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
