"use client";

import { useId, useMemo, useState } from "react";
import { PlaneTakeoff, PlaneLanding } from "lucide-react";
import { airports } from "@/features/search/data/airports";
import { cn } from "@/lib/utils";

interface AirportAutocompleteProps {
  label: string;
  value: string;
  onChange: (code: string) => void;
  variant: "origin" | "destination";
  error?: string;
}

/**
 * Lightweight combobox (no heavy dependency) — accessible via a native
 * <label>, aria-expanded listbox pattern, and full keyboard support through
 * native input + click selection. Filters the mock airport dataset client-side.
 */
export function AirportAutocomplete({
  label,
  value,
  onChange,
  variant,
  error,
}: AirportAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const listId = useId();
  const inputId = useId();

  const selected = airports.find((a) => a.code === value);

  const results = useMemo(() => {
    if (!query) return airports;
    const q = query.toLowerCase();
    return airports.filter(
      (a) =>
        a.city.toLowerCase().includes(q) ||
        a.code.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q),
    );
  }, [query]);

  const Icon = variant === "origin" ? PlaneTakeoff : PlaneLanding;

  return (
    <div className="relative flex-1">
      <label htmlFor={inputId} className="mb-1 block text-xs font-medium text-neutral-500">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-primary-400">
        <Icon className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
        <input
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder={selected ? `${selected.city} (${selected.code})` : "Search city or airport"}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
        />
      </div>

      {open && results.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-64 w-full min-w-[260px] overflow-auto rounded-lg border border-neutral-200 bg-white py-1 shadow-lg"
        >
          {results.map((airport) => (
            <li key={airport.code} role="option" aria-selected={airport.code === value}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(airport.code);
                  setQuery("");
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-neutral-50",
                  airport.code === value && "bg-primary-50",
                )}
              >
                <span>
                  <span className="font-medium text-neutral-900">{airport.city}</span>
                  <span className="ml-1.5 text-neutral-500">{airport.name}</span>
                </span>
                <span className="text-xs font-semibold text-primary-600">{airport.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p role="alert" aria-live="polite" className="mt-1 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
