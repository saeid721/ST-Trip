"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, FileCheck2, Globe2, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const countries: string[] = [
  "Thailand",
  "Malaysia",
  "Singapore",
  "UAE",
  "Schengen",
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "China",
  "Japan",
  "South Korea",
  "Saudi Arabia",
  "Qatar",
  "Turkey",
  "India",
  "Nepal",
  "Sri Lanka",
  "Maldives",
  "Indonesia",
];

const popularCountries = ["Thailand", "Malaysia", "Singapore", "UAE", "Schengen", "United Kingdom"];

const visaTypes: string[] = [
  "Tourist Visa",
  "Business Visa",
  "Student Visa",
  "Work Visa",
  "Transit Visa",
  "Medical Visa",
  "Family Visit Visa",
];

export function VisaSearchTab() {
  const router = useRouter();
  const [country, setCountry] = useState("");
  const [visaType, setVisaType] = useState("");

  const [countryOpen, setCountryOpen] = useState(false);
  const [visaTypeOpen, setVisaTypeOpen] = useState(false);

  const countryRef = useRef<HTMLDivElement>(null);
  const visaTypeRef = useRef<HTMLDivElement>(null);

  const filteredCountries = useMemo(
    () => countries.filter((c) => c.toLowerCase().includes(country.toLowerCase())),
    [country],
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
      if (visaTypeRef.current && !visaTypeRef.current.contains(e.target as Node)) {
        setVisaTypeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ country, visaType });
    router.push(`/visa?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        {/* Country field with searchable dropdown */}
        <div ref={countryRef} className="relative flex-1">
          <label htmlFor="visaCountry" className="mb-1 block text-xs font-medium text-neutral-500">
            Which country are you visiting?
          </label>
          <div className="flex h-11 items-center gap-2 rounded-lg border border-neutral-200 px-3 transition-colors focus-within:border-primary-400">
            <Globe2 className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <input
              id="visaCountry"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              onFocus={() => setCountryOpen(true)}
              autoComplete="off"
              placeholder="e.g. Thailand, UAE, Schengen"
              className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </div>

          {countryOpen && (
            <div className="absolute left-0 top-full z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCountry(c);
                      setCountryOpen(false);
                    }}
                    className={cn(
                      "block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-700",
                      c === country ? "bg-primary-50 text-primary-700" : "text-neutral-700",
                    )}
                  >
                    {c}
                  </button>
                ))
              ) : (
                <p className="px-3 py-2 text-sm text-neutral-400">No matches found</p>
              )}
            </div>
          )}
        </div>

        {/* Visa type dropdown */}
        <div ref={visaTypeRef} className="relative flex-1">
          <label className="mb-1 block text-xs font-medium text-neutral-500">Visa Type</label>
          <button
            type="button"
            onClick={() => {
              setVisaTypeOpen((v) => !v);
              setCountryOpen(false);
            }}
            aria-expanded={visaTypeOpen}
            className="flex h-11 w-full items-center gap-2 rounded-lg border border-neutral-200 px-3 text-left transition-colors focus-within:border-primary-400 hover:border-primary-300"
          >
            <FileCheck2 className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <span className={cn("flex-1 truncate text-sm", visaType ? "text-neutral-900" : "text-neutral-400")}>
              {visaType || "Select visa type"}
            </span>
            <ChevronDown className={cn("h-4 w-4 shrink-0 text-neutral-400 transition-transform", visaTypeOpen && "rotate-180")} aria-hidden />
          </button>

          {visaTypeOpen && (
            <div className="absolute left-0 top-full z-30 mt-1 w-full overflow-hidden rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
              {visaTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setVisaType(type);
                    setVisaTypeOpen(false);
                  }}
                  className={cn(
                    "block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-700",
                    type === visaType ? "bg-primary-50 text-primary-700" : "text-neutral-700",
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button type="submit" variant="primary" size="lg" className="h-11 gap-2 sm:w-auto">
          <Search className="h-4 w-4" aria-hidden />
          Check Requirements
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {popularCountries.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCountry(c)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              c === country
                ? "border-primary-600 bg-primary-50 text-primary-700"
                : "border-neutral-200 text-neutral-600 hover:border-primary-400 hover:text-primary-700",
            )}
          >
            {c}
          </button>
        ))}
      </div>
    </form>
  );
}