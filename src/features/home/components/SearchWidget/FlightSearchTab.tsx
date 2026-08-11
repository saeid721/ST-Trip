"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftRight, Search, Users, CalendarDays } from "lucide-react";
import { useSearchForm } from "@/features/search/hooks/useSearchForm";
import type { TripType } from "@/features/search/types";
import { AirportAutocomplete } from "./AirportAutocomplete";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const tripTypes: { value: TripType; label: string }[] = [
  { value: "one-way", label: "One Way" },
  { value: "round-trip", label: "Round Trip" },
  { value: "multi-city", label: "Multi City" },
];

export function FlightSearchTab() {
  const router = useRouter();
  const { values, errors, setTripType, swapOriginDestination, updateField, submit } =
    useSearchForm();

  const totalTravelers =
    values.travelers.adults + values.travelers.children + values.travelers.infants;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit((valid) => {
      const params = new URLSearchParams({
        tripType: valid.tripType,
        from: valid.origin,
        to: valid.destination,
        depart: valid.departureDate,
        ...(valid.returnDate ? { return: valid.returnDate } : {}),
        adults: String(valid.travelers.adults),
        children: String(valid.travelers.children),
        infants: String(valid.travelers.infants),
        cabin: valid.cabinClass,
      });
      router.push(`/flights?${params.toString()}`);
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Trip type radio group */}
      <div role="radiogroup" aria-label="Trip type" className="flex flex-wrap gap-4">
        {tripTypes.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 text-sm font-medium text-neutral-700"
          >
            <input
              type="radio"
              name="tripType"
              value={option.value}
              checked={values.tripType === option.value}
              onChange={() => setTripType(option.value)}
              className="h-4 w-4 accent-primary-600"
            />
            {option.label}
          </label>
        ))}
      </div>

      {/* Origin / Destination with swap */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <AirportAutocomplete
          label="From"
          variant="origin"
          value={values.origin}
          onChange={(code) => updateField("origin", code)}
          error={errors.origin}
        />

        <button
          type="button"
          aria-label="Swap origin and destination"
          onClick={swapOriginDestination}
          className="mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-primary-700 shadow-sm transition-transform hover:rotate-180 hover:bg-primary-50 sm:mx-0 sm:mb-0.5"
        >
          <ArrowLeftRight className="h-4 w-4" aria-hidden />
        </button>

        <AirportAutocomplete
          label="To"
          variant="destination"
          value={values.destination}
          onChange={(code) => updateField("destination", code)}
          error={errors.destination}
        />
      </div>

      {/* Dates + travelers */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor="departureDate" className="mb-1 block text-xs font-medium text-neutral-500">
            Departing
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-primary-400">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <input
              id="departureDate"
              type="date"
              value={values.departureDate}
              onChange={(e) => updateField("departureDate", e.target.value)}
              className="w-full bg-transparent text-sm text-neutral-900 outline-none"
            />
          </div>
        </div>

        <div className={cn(values.tripType !== "round-trip" && "opacity-50")}>
          <label htmlFor="returnDate" className="mb-1 block text-xs font-medium text-neutral-500">
            Returning
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-primary-400">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <input
              id="returnDate"
              type="date"
              disabled={values.tripType !== "round-trip"}
              value={values.returnDate ?? ""}
              onChange={(e) => updateField("returnDate", e.target.value)}
              className="w-full bg-transparent text-sm text-neutral-900 outline-none disabled:cursor-not-allowed"
            />
          </div>
          {errors.returnDate && (
            <p role="alert" className="mt-1 text-xs text-danger">
              {errors.returnDate}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="travelers" className="mb-1 block text-xs font-medium text-neutral-500">
            Travelers & Class
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-primary-400">
            <Users className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <select
              id="travelers"
              value={values.cabinClass}
              onChange={(e) =>
                updateField("cabinClass", e.target.value as typeof values.cabinClass)
              }
              className="w-full bg-transparent text-sm text-neutral-900 outline-none"
              aria-describedby="traveler-count"
            >
              <option value="economy">Economy</option>
              <option value="premium-economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </select>
            <span id="traveler-count" className="shrink-0 text-xs text-neutral-500">
              {totalTravelers} pax
            </span>
          </div>
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full gap-2 sm:w-auto">
        <Search className="h-4 w-4" aria-hidden />
        Search Flights
      </Button>
    </form>
  );
}
