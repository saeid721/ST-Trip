"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, CalendarDays, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

const today = new Date().toISOString().slice(0, 10);

export function HotelSearchTab() {
  const router = useRouter();
  const [destination, setDestination] = useState("Cox's Bazar");
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      destination,
      checkIn,
      checkOut,
      rooms: String(rooms),
      guests: String(guests),
    });
    router.push(`/hotels?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2">
          <label htmlFor="hotelDestination" className="mb-1 block text-xs font-medium text-neutral-500">
            Destination
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-primary-400">
            <MapPin className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <input
              id="hotelDestination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="City or hotel name"
              className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="checkIn" className="mb-1 block text-xs font-medium text-neutral-500">
            Check-in
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-primary-400">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <input
              id="checkIn"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="checkOut" className="mb-1 block text-xs font-medium text-neutral-500">
            Check-out
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-primary-400">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <input
              id="checkOut"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <label htmlFor="roomsGuests" className="mb-1 block text-xs font-medium text-neutral-500">
            Rooms & Guests
          </label>
          <div className="flex items-center gap-3 rounded-lg border border-neutral-200 px-3 py-2.5">
            <Users className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <label className="flex items-center gap-1.5 text-sm text-neutral-700">
              Rooms
              <input
                type="number"
                min={1}
                max={8}
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="w-12 bg-transparent text-sm outline-none"
              />
            </label>
            <label className="flex items-center gap-1.5 text-sm text-neutral-700">
              Guests
              <input
                type="number"
                min={1}
                max={16}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-12 bg-transparent text-sm outline-none"
              />
            </label>
          </div>
        </div>

        <Button type="submit" variant="primary" size="lg" className="gap-2">
          <Search className="h-4 w-4" aria-hidden />
          Search Hotels
        </Button>
      </div>
    </form>
  );
}
