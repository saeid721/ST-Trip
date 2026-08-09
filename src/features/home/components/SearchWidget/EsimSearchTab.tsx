"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wifi, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EsimSearchTab() {
  const router = useRouter();
  const [country, setCountry] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/esim?country=${encodeURIComponent(country)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="esimCountry" className="mb-1 block text-xs font-medium text-neutral-500">
          Traveling to
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-primary-400">
          <Wifi className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
          <input
            id="esimCountry"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Search a destination for eSIM plans"
            className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
          />
        </div>
      </div>
      <Button type="submit" variant="accent" size="lg" className="gap-2">
        <Search className="h-4 w-4" aria-hidden />
        Find Plans
      </Button>
    </form>
  );
}
