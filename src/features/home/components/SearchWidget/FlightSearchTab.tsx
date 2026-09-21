"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  Search,
  Users,
  CalendarDays,
  ChevronDown,
  Minus,
  Plus,
  Trash2,
  PlusCircle,
} from "lucide-react";
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

const cabinClasses: { value: "economy" | "premium-economy" | "business" | "first"; label: string }[] = [
  { value: "economy", label: "Economy" },
  { value: "premium-economy", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First" },
];

const AIRLINES = [
  "BIMAN",
  "NOVO AIR",
  "US-BANGLA",
  "AIR CHINA",
  "AIR INDIA",
  "BATIK AIR MALAYSIA",
  "CATHAY PACIFIC",
  "EMIRATES",
  "QATAR AIRWAYS",
  "SINGAPORE AIRLINES",
];

interface MultiCityLeg {
  id: string;
  origin: string;
  destination: string;
  date: string;
}

let nextLegId = 0;

function createLeg(): MultiCityLeg {
  nextLegId += 1;
  return { id: `leg-${nextLegId}`, origin: "", destination: "", date: "" };
}

export function FlightSearchTab() {
  const router = useRouter();
  const { values, errors, setTripType, swapOriginDestination, updateField, submit } =
    useSearchForm();

  const totalTravelers =
    values.travelers.adults + values.travelers.children + values.travelers.infants;

  const [cabinOpen, setCabinOpen] = useState(false);
  const [travelersOpen, setTravelersOpen] = useState(false);
  const [airlinesOpen, setAirlinesOpen] = useState(false);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);

  const cabinRef = useRef<HTMLDivElement>(null);
  const travelersRef = useRef<HTMLDivElement>(null);
  const airlinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cabinRef.current && !cabinRef.current.contains(e.target as Node)) {
        setCabinOpen(false);
      }
      if (travelersRef.current && !travelersRef.current.contains(e.target as Node)) {
        setTravelersOpen(false);
      }
      if (airlinesRef.current && !airlinesRef.current.contains(e.target as Node)) {
        setAirlinesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function updateTravelers(patch: Partial<typeof values.travelers>) {
    updateField("travelers", { ...values.travelers, ...patch });
  }

  function toggleAirline(airline: string) {
    setSelectedAirlines((prev) =>
      prev.includes(airline) ? prev.filter((a) => a !== airline) : [...prev, airline],
    );
  }

  const allAirlinesSelected = selectedAirlines.length === AIRLINES.length;

  function toggleAllAirlines() {
    setSelectedAirlines(allAirlinesSelected ? [] : [...AIRLINES]);
  }

  const cabinLabel = cabinClasses.find((c) => c.value === values.cabinClass)?.label ?? "Economy";
  const [multiCityLegs, setMultiCityLegs] = useState<MultiCityLeg[]>([createLeg(), createLeg()]);

  function swapLeg(id: string) {
    setMultiCityLegs((prev) =>
      prev.map((leg) =>
        leg.id === id ? { ...leg, origin: leg.destination, destination: leg.origin } : leg,
      ),
    );
  }

  function addLeg() {
    setMultiCityLegs((prev) => [...prev, createLeg()]);
  }

  function removeLeg(id: string) {
    setMultiCityLegs((prev) => (prev.length > 2 ? prev.filter((leg) => leg.id !== id) : prev));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit((valid) => {
      const params = new URLSearchParams({
      tripType: valid.tripType,
      ...(valid.tripType !== "multi-city"
        ? { from: valid.origin, to: valid.destination, depart: valid.departureDate }
        : {}),
      ...(valid.returnDate ? { return: valid.returnDate } : {}),
      adults: String(valid.travelers.adults),
      children: String(valid.travelers.children),
      infants: String(valid.travelers.infants),
      cabin: valid.cabinClass,
      ...(selectedAirlines.length > 0 ? { airlines: selectedAirlines.join(",") } : {}),
    });
    if (valid.tripType === "multi-city") {
      params.set("legs", JSON.stringify(multiCityLegs.map(({ origin, destination, date }) => ({ origin, destination, date }))));
    }
      router.push(`/flights?${params.toString()}`);
    });
  }

  function updateLeg(
    id: string,
    patch: Partial<Pick<MultiCityLeg, "origin" | "destination" | "date">>,
  ): void {
    setMultiCityLegs((prev) =>
      prev.map((leg) => (leg.id === id ? { ...leg, ...patch } : leg)),
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-0">
      {/* Row 1: Trip type + Cabin class + Travelers + Preferred Airlines */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 sm:gap-x-6 sm:gap-y-3">
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

        <div className="flex flex-wrap items-center gap-3 sm:ml-auto sm:gap-5">
          {/* Cabin class dropdown */}
          <div ref={cabinRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setCabinOpen((v) => !v);
                setTravelersOpen(false);
                setAirlinesOpen(false);
              }}
              aria-expanded={cabinOpen}
              className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-800 transition-colors hover:text-primary-700"
            >
              {cabinLabel}
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", cabinOpen && "rotate-180")} aria-hidden />
            </button>

            {cabinOpen && (
              <div className="absolute left-0 top-full z-40 mt-2 w-44 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
                {cabinClasses.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      updateField("cabinClass", option.value);
                      setCabinOpen(false);
                    }}
                    className={cn(
                      "block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-primary-50 hover:text-primary-700",
                      option.value === values.cabinClass
                        ? "bg-primary-50 font-semibold text-primary-700"
                        : "text-neutral-700",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Travelers dropdown */}
          <div ref={travelersRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setTravelersOpen((v) => !v);
                setCabinOpen(false);
                setAirlinesOpen(false);
              }}
              aria-expanded={travelersOpen}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 transition-colors hover:text-primary-700"
            >
              <Users className="h-4 w-4 text-primary-600" aria-hidden />
              {totalTravelers}
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", travelersOpen && "rotate-180")} aria-hidden />
            </button>

            {travelersOpen && (
              <div className="absolute left-0 right-auto top-full z-40 mt-2 max-h-64 w-[min(15rem,calc(100vw-2rem))] overflow-y-auto rounded-lg border border-neutral-200 bg-white p-2 shadow-lg sm:left-auto sm:right-0 sm:w-60">
                <TravelerRow
                  label="Adult"
                  sublabel="12 years and above"
                  value={values.travelers.adults}
                  min={1}
                  max={9}
                  onDecrease={() => updateTravelers({ adults: Math.max(1, values.travelers.adults - 1) })}
                  onIncrease={() => updateTravelers({ adults: Math.min(9, values.travelers.adults + 1) })}
                />
                <TravelerRow
                  label="Children"
                  sublabel="2-11 years at time of travel"
                  value={values.travelers.children}
                  min={0}
                  max={9}
                  onDecrease={() => updateTravelers({ children: Math.max(0, values.travelers.children - 1) })}
                  onIncrease={() => updateTravelers({ children: Math.min(9, values.travelers.children + 1) })}
                />
                <TravelerRow
                  label="Infants"
                  sublabel="Below 2 years at time of travel"
                  value={values.travelers.infants}
                  min={0}
                  max={9}
                  onDecrease={() => updateTravelers({ infants: Math.max(0, values.travelers.infants - 1) })}
                  onIncrease={() => updateTravelers({ infants: Math.min(9, values.travelers.infants + 1) })}
                />

                <div className="mt-4 flex justify-end border-t border-neutral-100 pt-3">
                  <button
                    type="button"
                    onClick={() => setTravelersOpen(false)}
                    className="text-sm font-semibold text-primary-700 hover:text-primary-800"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Preferred Airlines dropdown */}
          <div ref={airlinesRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setAirlinesOpen((v) => !v);
                setCabinOpen(false);
                setTravelersOpen(false);
              }}
              aria-expanded={airlinesOpen}
              className="inline-flex items-center gap-1 text-sm font-medium text-neutral-700 transition-colors hover:text-primary-700"
            >
              Preferred Airlines
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", airlinesOpen && "rotate-180")} aria-hidden />
            </button>

            {airlinesOpen && (
              <div className="absolute right-0 top-full z-40 mt-2 max-h-64 w-60 overflow-y-auto rounded-lg border border-neutral-200 bg-white p-2 shadow-lg">
                <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold text-neutral-800 hover:bg-primary-50">
                  <input
                    type="checkbox"
                    checked={allAirlinesSelected}
                    onChange={toggleAllAirlines}
                    className="h-4 w-4 rounded accent-primary-600"
                  />
                  -- ALL AIRLINES --
                </label>
                {AIRLINES.map((airline) => (
                  <label
                    key={airline}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-700 hover:bg-primary-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAirlines.includes(airline)}
                      onChange={() => toggleAirline(airline)}
                      className="h-4 w-4 rounded accent-primary-600"
                    />
                    {airline}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Journey fields (single or multi-city) + Search */}
<div className="mt-4 flex flex-col gap-4">
  {values.tripType !== "multi-city" ? (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end">
        <AirportAutocomplete
          label="Journey From"
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
          label="Journey To"
          variant="destination"
          value={values.destination}
          onChange={(code) => updateField("destination", code)}
          error={errors.destination}
        />
      </div>

      <div className="grid flex-1 grid-cols-2 gap-3 lg:flex lg:flex-1">
        <div className="lg:flex-1">
          <label htmlFor="departureDate" className="mb-1 block text-xs font-medium text-neutral-500">
            Departing
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 transition-colors focus-within:border-primary-400">
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

        <div className={cn("lg:flex-1", values.tripType !== "round-trip" && "opacity-50")}>
          <label htmlFor="returnDate" className="mb-1 block text-xs font-medium text-neutral-500">
            Returning
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 transition-colors focus-within:border-primary-400">
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
      </div>

      <Button type="submit" variant="primary" size="lg" className="h-11 w-full gap-2 lg:w-auto">
        <Search className="h-4 w-4" aria-hidden />
        Search Flights
      </Button>
    </div>
  ) : (
    <>
      <div className="space-y-3">
        {multiCityLegs.map((leg, index) => (
          <div key={leg.id} className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end">
                <AirportAutocomplete
                  label="Journey From"
                  variant="origin"
                  value={leg.origin}
                  onChange={(code) => updateLeg(leg.id, { origin: code })}
                />

                <button
                  type="button"
                  aria-label="Swap journey from and to"
                  onClick={() => swapLeg(leg.id)}
                  className="mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-primary-700 shadow-sm transition-transform hover:rotate-180 hover:bg-primary-50 sm:mx-0 sm:mb-0.5"
                >
                  <ArrowLeftRight className="h-4 w-4" aria-hidden />
                </button>

                <AirportAutocomplete
                  label="Journey To"
                  variant="destination"
                  value={leg.destination}
                  onChange={(code) => updateLeg(leg.id, { destination: code })}
                />
              </div>

              <div className="sm:w-40 sm:shrink-0">
                <label className="mb-1 block text-xs font-medium text-neutral-500">Departing</label>
                <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 transition-colors focus-within:border-primary-400">
                  <CalendarDays className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
                  <input
                    type="date"
                    value={leg.date}
                    onChange={(e) => updateLeg(leg.id, { date: e.target.value })}
                    className="w-full bg-transparent text-sm text-neutral-900 outline-none"
                  />
                </div>
              </div>

            {index >= 2 && (
              <button
                type="button"
                onClick={() => removeLeg(leg.id)}
                aria-label="Remove flight"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-danger/30 bg-danger/5 text-danger transition-colors hover:bg-danger/10 sm:mb-0"
              >
                <Trash2 className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={addLeg}
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
        >
          <PlusCircle className="h-4 w-4" aria-hidden />
          Add Flight
        </button>

        <Button type="submit" variant="primary" size="lg" className="h-11 w-full gap-2 sm:w-auto">
          <Search className="h-4 w-4" aria-hidden />
          Search Flights
        </Button>
      </div>
    </>
  )}
</div>
    </form>
  );
}

function TravelerRow({
  label,
  sublabel,
  value,
  min,
  max,
  onDecrease,
  onIncrease,
}: {
  label: string;
  sublabel: string;
  value: number;
  min: number;
  max: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div>
        <p className="text-sm font-medium text-neutral-700">{label}</p>
        <p className="text-xs text-neutral-400">{sublabel}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrease}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-primary-300 hover:text-primary-700 disabled:pointer-events-none disabled:opacity-40"
        >
          <Minus className="h-3.5 w-3.5" aria-hidden />
        </button>
        <span className="w-5 text-center text-sm font-semibold text-neutral-900">{value}</span>
        <button
          type="button"
          onClick={onIncrease}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-primary-300 hover:text-primary-700 disabled:pointer-events-none disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}