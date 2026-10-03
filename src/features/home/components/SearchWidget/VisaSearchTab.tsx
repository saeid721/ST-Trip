"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, FileCheck2, Globe2, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { VisaFlag } from "@/features/visa/components/VisaFlag";
import {
  VISA_CATEGORY_LABELS,
  findExactDestination,
  getPopularDestinations,
  getVisaDestination,
  searchVisaDestinations,
} from "@/features/visa/data/visa-destinations";
import { VISA_PURPOSES } from "@/features/visa/lib/purposes";
import type { VisaDestination, VisaPurpose } from "@/features/visa/types";

export function VisaSearchTab() {
  const router = useRouter();
  const pathname = usePathname();
  const listId = useId();
  const errorId = useId();

  // On /visa/[slug] pages, prefill the widget with the current destination.
  const currentSlug = pathname.startsWith("/visa/") ? pathname.split("/")[2] : undefined;
  const current = currentSlug ? getVisaDestination(currentSlug) : undefined;

  const [country, setCountry] = useState(current?.name ?? "");
  const [selected, setSelected] = useState<VisaDestination | null>(current ?? null);
  const [purpose, setPurpose] = useState<VisaPurpose | "">("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [purposeOpen, setPurposeOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [error, setError] = useState("");

  const countryRef = useRef<HTMLDivElement>(null);
  const purposeRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const popular = useMemo(() => getPopularDestinations(), []);
  const typed = country.trim();
  const isTyping = typed.length > 0 && selected?.name !== country;
  const suggestions = useMemo(
    () => (isTyping ? searchVisaDestinations(typed).slice(0, 8) : popular.slice(0, 8)),
    [isTyping, typed, popular],
  );

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setCountryOpen(false);
      if (purposeRef.current && !purposeRef.current.contains(e.target as Node)) setPurposeOpen(false);
    }
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        setCountryOpen(false);
        setPurposeOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function choose(item: VisaDestination) {
    setSelected(item);
    setCountry(item.name);
    setCountryOpen(false);
    setError("");
  }

  function onInput(value: string) {
    setCountry(value);
    setSelected(null);
    setCountryOpen(true);
    setHighlight(0);
    setError("");
  }

  function submit(override?: VisaDestination) {
    const target = override ?? selected ?? findExactDestination(country);
    if (!target && !typed) {
      setError("Choose a destination to see its visa requirements.");
      inputRef.current?.focus();
      return;
    }
    setCountryOpen(false);
    setPurposeOpen(false);
    if (target) {
      router.push(`/visa/${target.slug}${purpose ? `?purpose=${purpose}` : ""}`);
    } else {
      router.push(`/visa?q=${encodeURIComponent(typed)}`);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!countryOpen) setCountryOpen(true);
      else setHighlight((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && countryOpen && !selected) {
      const item = suggestions[highlight];
      if (item) {
        e.preventDefault();
        choose(item);
        submit(item);
      }
    }
  }

  const purposeLabel = VISA_PURPOSES.find((p) => p.value === purpose)?.label;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="space-y-3"
    >
      <div className="grid grid-cols-1 gap-3 md:flex md:flex-row md:items-end">
        {/* Destination combobox */}
        <div ref={countryRef} className="relative flex-1">
          <label htmlFor="visaCountry" className="mb-1 block text-xs font-medium text-neutral-500">
            Which country are you visiting?
          </label>
          <div
            className={cn(
              "flex h-11 items-center gap-2 rounded-sm border px-3 transition-colors focus-within:border-primary-400",
              error ? "border-danger" : "border-neutral-200",
            )}
          >
            <Globe2 className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <input
              ref={inputRef}
              id="visaCountry"
              type="text"
              role="combobox"
              aria-expanded={countryOpen}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={countryOpen && suggestions[highlight] ? `${listId}-${highlight}` : undefined}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              value={country}
              onChange={(e) => onInput(e.target.value)}
              onFocus={() => setCountryOpen(true)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              placeholder="e.g. Thailand, UAE, Schengen"
              className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </div>
          {error && (
            <p id={errorId} role="alert" className="mt-1 text-xs font-medium text-danger">
              {error}
            </p>
          )}

          {countryOpen && (
            <ul
              id={listId}
              role="listbox"
              className="absolute left-0 top-full z-40 mt-1 max-h-64 w-full overflow-y-auto rounded-sm border border-neutral-200 bg-white p-1 shadow-lg"
            >
              <li role="presentation" className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {isTyping ? "Matching destinations" : "Popular destinations"}
              </li>
              {suggestions.length > 0 ? (
                suggestions.map((item, i) => (
                  <li
                    key={item.slug}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={i === highlight}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => choose(item)}
                    onMouseEnter={() => setHighlight(i)}
                    className={cn(
                      "flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      i === highlight ? "bg-primary-50 text-primary-700" : "text-neutral-700",
                    )}
                  >
                    <VisaFlag code={item.code} name={item.name} className="h-4 w-6" />
                    <span className="flex-1 truncate">{item.name}</span>
                    <span className="shrink-0 text-[10px] font-semibold text-neutral-400">
                      {VISA_CATEGORY_LABELS[item.category]}
                    </span>
                  </li>
                ))
              ) : (
                <li role="presentation" className="px-3 py-2 text-sm text-neutral-400">
                  No exact match. Press Check Requirements to search all visas.
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Visa purpose dropdown */}
        <div ref={purposeRef} className="relative flex-1">
          <label className="mb-1 block text-xs font-medium text-neutral-500">Visa Type</label>
          <button
            type="button"
            onClick={() => {
              setPurposeOpen((v) => !v);
              setCountryOpen(false);
            }}
            aria-haspopup="listbox"
            aria-expanded={purposeOpen}
            className="flex h-11 w-full items-center gap-2 rounded-sm border border-neutral-200 px-3 text-left transition-colors hover:border-primary-300 focus-visible:border-primary-400"
          >
            <FileCheck2 className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <span className={cn("flex-1 truncate text-sm", purposeLabel ? "text-neutral-900" : "text-neutral-400")}>
              {purposeLabel ?? "Select visa type"}
            </span>
            <ChevronDown
              className={cn("h-4 w-4 shrink-0 text-neutral-400 transition-transform", purposeOpen && "rotate-180")}
              aria-hidden
            />
          </button>

          {purposeOpen && (
            <div
              role="listbox"
              className="absolute left-0 top-full z-40 mt-1 w-full overflow-hidden rounded-sm border border-neutral-200 bg-white p-1 shadow-lg"
            >
              {[{ value: "" as const, label: "Any visa type" }, ...VISA_PURPOSES].map((option) => (
                <button
                  key={option.value || "any"}
                  type="button"
                  role="option"
                  aria-selected={option.value === purpose}
                  onClick={() => {
                    setPurpose(option.value);
                    setPurposeOpen(false);
                  }}
                  className={cn(
                    "block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-700",
                    option.value === purpose ? "bg-primary-50 text-primary-700" : "text-neutral-700",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button type="submit" variant="primary" size="lg" className="h-11 w-full gap-2 md:w-auto">
          <Search className="h-4 w-4" aria-hidden />
          Check Requirements
        </Button>
      </div>
    </form>
  );
}