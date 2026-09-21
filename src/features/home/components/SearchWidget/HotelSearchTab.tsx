"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, CalendarDays, Users, Search, BedDouble, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { domesticLocations, internationalLocations } from "@/features/hotels/data/locations";

const today = new Date().toISOString().slice(0, 10);

export function HotelSearchTab() {
  const router = useRouter();
  const [searchType, setSearchType] = useState<"domestic" | "international">("domestic");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const guests = adults + children;

  const [locationOpen, setLocationOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

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
      if (roomsRef.current && !roomsRef.current.contains(e.target as Node)) {
        setRoomsOpen(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(e.target as Node)) {
        setGuestsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      searchType,
      location: destination,
      checkIn,
      checkOut,
      rooms: String(rooms),
      guests: String(guests),
    });
    router.push(`/hotels?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      {/* Row 1: Domestic/International + Room + Guests */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-5 text-sm font-medium text-neutral-700">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="homeHotelSearchType"
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
              name="homeHotelSearchType"
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

        <div className="flex flex-wrap items-center gap-3 sm:ml-auto sm:flex-nowrap sm:gap-5">
          {/* Rooms dropdown */}
          <div ref={roomsRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setRoomsOpen((v) => !v);
                setGuestsOpen(false);
              }}
              aria-expanded={roomsOpen}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 transition-colors hover:text-primary-700"
            >
              <BedDouble className="h-4 w-4 text-primary-600" aria-hidden />
              Room - {rooms}
            </button>

            {roomsOpen && (
              <div className="absolute left-0 top-full z-40 mt-2 w-40 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
                {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setRooms(n);
                      setRoomsOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-primary-50 hover:text-primary-700 ${
                      n === rooms ? "bg-primary-50 font-semibold text-primary-700" : "text-neutral-700"
                    }`}
                  >
                    {n} Room{n > 1 ? "s" : ""}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Guests dropdown */}
          <div ref={guestsRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setGuestsOpen((v) => !v);
                setRoomsOpen(false);
              }}
              aria-expanded={guestsOpen}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 transition-colors hover:text-primary-700"
            >
              <Users className="h-4 w-4 text-primary-600" aria-hidden />
              Guests - {guests}
            </button>

            {guestsOpen && (
              <div className="absolute left-0 right-auto top-full z-40 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-lg border border-neutral-200 bg-white p-4 shadow-lg sm:left-auto sm:right-0 sm:w-72">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">Adult</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdults((v) => Math.max(1, v - 1))}
                      disabled={adults <= 1}
                      aria-label="Decrease adults"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-primary-300 hover:text-primary-700 disabled:pointer-events-none disabled:opacity-40"
                    >
                      <Minus className="h-3.5 w-3.5" aria-hidden />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold text-neutral-900">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults((v) => Math.min(16, v + 1))}
                      disabled={adults >= 16}
                      aria-label="Increase adults"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-primary-300 hover:text-primary-700 disabled:pointer-events-none disabled:opacity-40"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-700">Children</p>
                    <p className="text-xs text-neutral-400">Age 2-10</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChildren((v) => Math.max(0, v - 1))}
                      disabled={children <= 0}
                      aria-label="Decrease children"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-primary-300 hover:text-primary-700 disabled:pointer-events-none disabled:opacity-40"
                    >
                      <Minus className="h-3.5 w-3.5" aria-hidden />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold text-neutral-900">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren((v) => Math.min(10, v + 1))}
                      disabled={children >= 10}
                      aria-label="Increase children"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-primary-300 hover:text-primary-700 disabled:pointer-events-none disabled:opacity-40"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex justify-end border-t border-neutral-100 pt-3">
                  <button
                    type="button"
                    onClick={() => setGuestsOpen(false)}
                    className="text-sm font-semibold text-primary-700 hover:text-primary-800"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Location + Check-In + Check-Out + Search */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
        <div ref={locationRef} className="relative">
          <label htmlFor="hotelDestination" className="block text-xs font-medium text-neutral-500">
            Location
            <div className="mt-1 flex h-11 items-center gap-2 rounded-lg border border-neutral-200 px-3 transition-colors focus-within:border-primary-400">
              <MapPin className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
              <input
                id="hotelDestination"
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
          Check-In
          <div className="mt-1 flex h-11 items-center gap-2 rounded-lg border border-neutral-200 px-3 transition-colors focus-within:border-primary-400">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm text-neutral-900 outline-none"
            />
          </div>
        </label>

        <label className="block text-xs font-medium text-neutral-500">
          Check-Out
          <div className="mt-1 flex h-11 items-center gap-2 rounded-lg border border-neutral-200 px-3 transition-colors focus-within:border-primary-400">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-sm text-neutral-900 outline-none"
            />
          </div>
        </label>

        <Button type="submit" variant="primary" size="lg" className="h-11 gap-2">
          <Search className="h-4 w-4" aria-hidden />
          Search Hotels
        </Button>
      </div>
    </form>
  );
}