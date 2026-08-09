"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Compass, CalendarDays, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function TourSearchTab() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [month, setMonth] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ destination, month });
    router.push(`/tours?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="tourDestination" className="mb-1 block text-xs font-medium text-neutral-500">
          Where do you want to go?
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-primary-400">
          <Compass className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
          <input
            id="tourDestination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Nepal, Bandarban, Sajek Valley"
            className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
          />
        </div>
      </div>

      <div className="flex-1">
        <label htmlFor="tourMonth" className="mb-1 block text-xs font-medium text-neutral-500">
          Travel month
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-primary-400">
          <CalendarDays className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
          <input
            id="tourMonth"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <Button type="submit" variant="accent" size="lg" className="gap-2">
        <Search className="h-4 w-4" aria-hidden />
        Find Tours
      </Button>
    </form>
  );
}
