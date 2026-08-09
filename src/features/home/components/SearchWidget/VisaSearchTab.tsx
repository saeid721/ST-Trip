"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe2, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

const popularCountries = [
  "Thailand",
  "Malaysia",
  "Singapore",
  "UAE",
  "Schengen",
  "United Kingdom",
];

export function VisaSearchTab() {
  const router = useRouter();
  const [country, setCountry] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/visa?country=${encodeURIComponent(country)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="visaCountry" className="mb-1 block text-xs font-medium text-neutral-500">
            Which country are you visiting?
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-primary-400">
            <Globe2 className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <input
              id="visaCountry"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. Thailand, UAE, Schengen"
              className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </div>
        </div>
        <Button type="submit" variant="accent" size="lg" className="gap-2">
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
            className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600 hover:border-primary-400 hover:text-primary-700"
          >
            {c}
          </button>
        ))}
      </div>
    </form>
  );
}
