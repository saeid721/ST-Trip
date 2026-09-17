"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Globe2, Search, Wifi, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { esimCountries, esimRegions } from "@/features/esim/data/dummy";
import type { EsimCountry, EsimMode, EsimRegion } from "@/features/esim/types";

export function EsimSearchTab() {
  const router = useRouter();
  const [mode, setMode] = useState<EsimMode>("country");
  const [country, setCountry] = useState<EsimCountry | null>(null);
  const [region, setRegion] = useState<EsimRegion | null>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!selectorRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const filteredCountries = useMemo(
    () => esimCountries.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  );

  function chooseMode(nextMode: EsimMode) {
    setMode(nextMode);
    setCountry(null);
    setRegion(null);
    setQuery("");
    setOpen(false);
  }

  function chooseCountry(item: EsimCountry) {
    setCountry(item);
    setQuery("");
    setOpen(false);
    router.push(`/esim?country=${encodeURIComponent(item.code)}`);
  }

  function chooseRegion(item: EsimRegion) {
    setRegion(item);
    setQuery("");
    setOpen(false);
    const params = new URLSearchParams({ region: item.id, countries: item.countryCodes.join(",") });
    router.push(`/esim?${params.toString()}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "country" && country) {
      router.push(`/esim?country=${encodeURIComponent(country.code)}`);
    } else if (mode === "region" && region) {
      const params = new URLSearchParams({ region: region.id, countries: region.countryCodes.join(",") });
      router.push(`/esim?${params.toString()}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <fieldset className="flex flex-wrap gap-2" aria-label="eSIM search type">
        <legend className="sr-only">Choose eSIM search type</legend>
        <ModeButton active={mode === "country"} onClick={() => chooseMode("country")}>
          <Globe2 className="h-4 w-4" aria-hidden /> Country Wise <span>(Single Country)</span>
        </ModeButton>
        <ModeButton active={mode === "region"} onClick={() => chooseMode("region")}>
          <Globe2 className="h-4 w-4" aria-hidden /> Region Wise <span>(Multiple Countries)</span>
        </ModeButton>
      </fieldset>

      <div ref={selectorRef} className="relative">
        <label htmlFor="esimCountry" className="mb-1 block text-xs font-medium text-neutral-500">
          {mode === "country" ? "Which country are you visiting?" : "Which region?"}
        </label>
        <button type="button" onClick={() => setOpen((current) => !current)} className="flex min-h-12 w-full items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-left text-sm text-neutral-900 shadow-sm transition-colors hover:border-primary-300 focus-visible:border-primary-500" aria-expanded={open} aria-controls="esim-selection-menu">
          {mode === "country" ? <Wifi className="h-4 w-4 shrink-0 text-primary-600" aria-hidden /> : <Globe2 className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />}
          <span className={cn("flex flex-1 items-center gap-2 truncate", !country && !region && "text-neutral-400")}>
            {country ? <FlagBadge country={country} /> : null}
            <span className="truncate">{country?.name || region?.name || (mode === "country" ? "Search a destination for eSIM plans" : "Select a travel region")}</span>
          </span>
          <ChevronDown className={cn("h-4 w-4 shrink-0 text-neutral-400 transition-transform", open && "rotate-180")} aria-hidden />
        </button>

        {open && (
          <div id="esim-selection-menu" role="dialog" aria-label={mode === "country" ? "Country selection" : "Region selection"} className="animate-scale-in absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-neutral-200 bg-white p-2 shadow-xl">
            <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 focus-within:border-primary-400">
              <Search className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
              <input id="esimCountry" autoFocus type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={mode === "country" ? "Type a country name..." : "Type a region name..."} className="h-10 w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400" />
              {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="text-neutral-400 hover:text-neutral-700"><X className="h-4 w-4" /></button>}
            </div>
            {mode === "country" ? <CountryList countries={filteredCountries} selectedCode={country?.code} onSelect={chooseCountry} /> : <RegionList regions={esimRegions.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))} onSelect={chooseRegion} />}
          </div>
        )}
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full gap-2 sm:w-auto" disabled={mode === "country" ? !country : !region}>
        <Search className="h-4 w-4" aria-hidden />
        {mode === "country" ? "Find Plans" : "Search Region Plans"}
      </Button>
    </form>
  );
}

function ModeButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} aria-pressed={active} className={cn("inline-flex min-h-10 items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors", active ? "border-primary-200 bg-primary-50 text-primary-700" : "border-neutral-200 text-neutral-600 hover:border-primary-200 hover:text-primary-700")}>{children}</button>;
}

function FlagBadge({ country }: { country: EsimCountry }) {
  return <span className="inline-flex h-7 w-9 shrink-0 items-center justify-center rounded-md border border-primary-100 bg-primary-50 text-base leading-none shadow-sm" aria-label={`${country.name} flag`}>{country.flag}</span>;
}

function CountryList({ countries, selectedCode, selectedCodes = [], multiple = false, onSelect }: { countries: EsimCountry[]; selectedCode?: string; selectedCodes?: string[]; multiple?: boolean; onSelect: (country: EsimCountry) => void }) {
  if (countries.length === 0) return <p className="px-3 py-8 text-center text-sm text-neutral-500">No countries found</p>;
  return <ul className="mt-2 max-h-64 overflow-y-auto" role="listbox" aria-multiselectable={multiple}>{countries.map((item) => { const selected = multiple ? selectedCodes.includes(item.code) : selectedCode === item.code; return <li key={item.code}><button type="button" role="option" aria-selected={selected} onClick={() => onSelect(item)} className={cn("flex min-h-12 w-full items-center gap-3 rounded-lg px-3 text-left text-sm transition-colors hover:bg-primary-50", selected && "bg-primary-50 font-medium text-primary-700")}><FlagBadge country={item} /><span className="flex-1 truncate">{item.name}</span>{selected && <Check className="h-4 w-4 shrink-0" aria-hidden />}</button></li>; })}</ul>;
}

function RegionList({ regions, onSelect }: { regions: EsimRegion[]; onSelect: (region: EsimRegion) => void }) {
  if (regions.length === 0) return <p className="px-3 py-8 text-center text-sm text-neutral-500">No regions found</p>;
  return <ul className="mt-2 max-h-64 overflow-y-auto">{regions.map((item) => <li key={item.id}><button type="button" onClick={() => onSelect(item)} className="flex min-h-14 w-full items-center gap-3 rounded-lg px-3 text-left transition-colors hover:bg-primary-50"><Globe2 className="h-4 w-4 text-primary-600" aria-hidden /><span className="flex-1"><span className="block text-sm font-medium text-neutral-800">{item.name}</span><span className="block text-xs text-neutral-500">{item.description}</span></span><ChevronDown className="h-4 w-4 -rotate-90 text-neutral-400" aria-hidden /></button></li>)}</ul>;
}
