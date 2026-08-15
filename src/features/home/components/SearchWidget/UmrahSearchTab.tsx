"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, CalendarDays, Users, Search, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

const umrahDestinations = ["Mecca", "Medina", "Mecca & Medina"];
const today = new Date().toISOString().slice(0, 10);

interface TravelerCounts {
  adults: number;
  children: number;
  infants: number;
}

/**
 * Traveler stepper — same open/blur pattern as AirportAutocomplete for
 * consistency, but with +/- steppers instead of a filtered list.
 */
function TravelerStepper({
  value,
  onChange,
}: {
  value: TravelerCounts;
  onChange: (next: TravelerCounts) => void;
}) {
  const [open, setOpen] = useState(false);
  const total = value.adults + value.children + value.infants;

  function update(key: keyof TravelerCounts, delta: number, min: number) {
    onChange({ ...value, [key]: Math.max(min, value[key] + delta) });
  }

  const rows: { key: keyof TravelerCounts; label: string; hint: string; min: number }[] = [
    { key: "adults", label: "Adults", hint: "Above 12 years", min: 1 },
    { key: "children", label: "Children", hint: "2-12 years", min: 0 },
    { key: "infants", label: "Infants", hint: "Under 2 years", min: 0 },
  ];

  return (
    <div className="relative">
      <label className="mb-1 block text-xs font-medium text-neutral-500">Travellers</label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex w-full items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 text-left focus-within:border-primary-400"
      >
        <Users className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
        <span className="text-sm text-neutral-900">
          {total} Traveller{total !== 1 ? "s" : ""}
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Select travellers"
          className="absolute z-20 mt-1 w-72 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg"
        >
          {rows.map((row) => (
            <div key={row.key} className="flex items-center justify-between py-2.5">
              <div>
                <p className="text-sm font-medium text-neutral-900">{row.label}</p>
                <p className="text-xs text-neutral-500">{row.hint}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label={`Decrease ${row.label}`}
                  onClick={() => update(row.key, -1, row.min)}
                  disabled={value[row.key] <= row.min}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 hover:border-primary-400 hover:text-primary-700 disabled:pointer-events-none disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" aria-hidden />
                </button>
                <span className="w-4 text-center text-sm font-medium text-neutral-900">
                  {value[row.key]}
                </span>
                <button
                  type="button"
                  aria-label={`Increase ${row.label}`}
                  onClick={() => update(row.key, 1, row.min)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 hover:border-primary-400 hover:text-primary-700"
                >
                  <Plus className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          ))}
          <Button variant="primary" size="sm" className="mt-2 w-full" onClick={() => setOpen(false)}>
            Done
          </Button>
        </div>
      )}
    </div>
  );
}

export function UmrahSearchTab() {
  const router = useRouter();
  const [destination, setDestination] = useState<string>("Mecca");
  const [departureDate, setDepartureDate] = useState(today);
  const [travelers, setTravelers] = useState<TravelerCounts>({ adults: 1, children: 0, infants: 0 });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      to: destination,
      depart: departureDate,
      adults: String(travelers.adults),
      children: String(travelers.children),
      infants: String(travelers.infants),
    });
    router.push(`/umrah?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-[2fr_1.4fr_1.6fr_auto] md:items-end">
      <div>
        <label htmlFor="umrahDestination" className="mb-1 block text-xs font-medium text-neutral-500">
          To
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-primary-400">
          <MapPin className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
          <select
            id="umrahDestination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-transparent text-sm text-neutral-900 outline-none"
          >
            {umrahDestinations.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="umrahDepartureDate" className="mb-1 block text-xs font-medium text-neutral-500">
          Departure Date
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-primary-400">
          <CalendarDays className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
          <input
            id="umrahDepartureDate"
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="w-full bg-transparent text-sm text-neutral-900 outline-none"
          />
        </div>
      </div>

      <TravelerStepper value={travelers} onChange={setTravelers} />

      <Button type="submit" variant="primary" size="lg" className="gap-2">
        <Search className="h-4 w-4" aria-hidden />
        Search
      </Button>
    </form>
  );
}