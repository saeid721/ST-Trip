"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Database, Search, Wifi } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { esimCountries, esimRegions } from "@/features/esim/data/dummy";

type EsimSearchMode = "country" | "region";
type DataType = "Package Data" | "Unlimited Data";

const dataTypes: DataType[] = ["Package Data", "Unlimited Data"];

export function EsimSearchTab() {
  const router = useRouter();
  const [mode, setMode] = useState<EsimSearchMode>("country");
  const [query, setQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [dataType, setDataType] = useState<DataType>("Unlimited Data");

  const [destOpen, setDestOpen] = useState(false);
  const [dataTypeOpen, setDataTypeOpen] = useState(false);

  const destRef = useRef<HTMLDivElement>(null);
  const dataTypeRef = useRef<HTMLDivElement>(null);

  const destOptions = useMemo(
    () =>
      mode === "country"
        ? esimCountries.map((c) => ({ code: c.code, label: c.name, icon: c.flag }))
        : esimRegions.map((r) => ({ code: r.id, label: r.name, icon: "🌐" })),
    [mode],
  );

  const filteredOptions = useMemo(
    () => destOptions.filter((opt) => opt.label.toLowerCase().includes(query.toLowerCase())),
    [destOptions, query],
  );

  const selectedOption = destOptions.find((opt) => opt.code === selectedCode);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setDestOpen(false);
      }
      if (dataTypeRef.current && !dataTypeRef.current.contains(e.target as Node)) {
        setDataTypeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchMode(next: EsimSearchMode) {
    setMode(next);
    setQuery("");
    setSelectedCode(null);
    setDestOpen(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ dataType });
    if (mode === "country" && selectedCode) {
      params.set("country", selectedCode);
      router.push(`/esim?${params.toString()}`);
    } else if (mode === "region" && selectedCode) {
      const region = esimRegions.find((r) => r.id === selectedCode);
      params.set("region", selectedCode);
      if (region) params.set("countries", region.countryCodes.join(","));
      router.push(`/esim?${params.toString()}`);
    } else {
      router.push(`/esim?${params.toString()}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Country Wise / Region Wise toggle */}
      <div className="inline-flex rounded-lg border border-neutral-200 bg-neutral-50 p-1">
        <button
          type="button"
          onClick={() => switchMode("country")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm",
            mode === "country" ? "bg-white text-primary-700 shadow-sm" : "text-neutral-500 hover:text-neutral-700",
          )}
        >
          <span
            className={cn(
              "flex h-3.5 w-3.5 items-center justify-center rounded-full border",
              mode === "country" ? "border-primary-600" : "border-neutral-300",
            )}
          >
            {mode === "country" && <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />}
          </span>
          Country Wise <span className="hidden font-normal text-neutral-400 sm:inline">(Single Country)</span>
        </button>
        <button
          type="button"
          onClick={() => switchMode("region")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm",
            mode === "region" ? "bg-white text-primary-700 shadow-sm" : "text-neutral-500 hover:text-neutral-700",
          )}
        >
          <span
            className={cn(
              "flex h-3.5 w-3.5 items-center justify-center rounded-full border",
              mode === "region" ? "border-primary-600" : "border-neutral-300",
            )}
          >
            {mode === "region" && <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />}
          </span>
          Region Wise <span className="hidden font-normal text-neutral-400 sm:inline">(Multiple Countries)</span>
        </button>
      </div>

      {/* Destination + Data Type + Button — same line on desktop, stacked on mobile */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div ref={destRef} className="relative flex-[1.4]">
          <label className="mb-1 block text-xs font-medium text-neutral-500">
            {mode === "country" ? "Which country are you visiting?" : "Which region are you visiting?"}
          </label>
          <button
            type="button"
            onClick={() => {
              setDestOpen((v) => !v);
              setDataTypeOpen(false);
            }}
            aria-expanded={destOpen}
            className="flex h-11 w-full items-center gap-2 rounded-lg border border-neutral-200 px-3 text-left transition-colors hover:border-primary-300 focus-within:border-primary-400"
          >
            <Wifi className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <span className={cn("flex-1 truncate text-sm", selectedOption ? "text-neutral-900" : "text-neutral-400")}>
              {selectedOption ? (
                <>
                  <span aria-hidden>{selectedOption.icon}</span> {selectedOption.label}
                </>
              ) : mode === "country" ? (
                "Search a destination for eSIM plans"
              ) : (
                "Search a region for eSIM plans"
              )}
            </span>
            <ChevronDown className={cn("h-4 w-4 shrink-0 text-neutral-400 transition-transform", destOpen && "rotate-180")} aria-hidden />
          </button>

          {destOpen && (
            <div className="absolute left-0 top-full z-40 mt-1 w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
              <div className="border-b border-neutral-100 p-2">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={mode === "country" ? "Search country..." : "Search region..."}
                  className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-primary-400"
                />
              </div>
              <div className="max-h-60 overflow-y-auto p-1">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        setSelectedCode(opt.code);
                        setQuery("");
                        setDestOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-700",
                        opt.code === selectedCode ? "bg-primary-50 text-primary-700" : "text-neutral-700",
                      )}
                    >
                      <span aria-hidden>{opt.icon}</span> {opt.label}
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-2 text-sm text-neutral-400">No matches found</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div ref={dataTypeRef} className="relative flex-1">
          <label className="mb-1 block text-xs font-medium text-neutral-500">Data Type</label>
          <button
            type="button"
            onClick={() => {
              setDataTypeOpen((v) => !v);
              setDestOpen(false);
            }}
            aria-expanded={dataTypeOpen}
            className="flex h-11 w-full items-center gap-2 rounded-lg border border-neutral-200 px-3 text-left transition-colors hover:border-primary-300 focus-within:border-primary-400"
          >
            <Database className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <span className="flex-1 truncate text-sm text-neutral-900">{dataType}</span>
            <ChevronDown className={cn("h-4 w-4 shrink-0 text-neutral-400 transition-transform", dataTypeOpen && "rotate-180")} aria-hidden />
          </button>

          {dataTypeOpen && (
            <div className="absolute left-0 top-full z-40 mt-1 w-full overflow-hidden rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
              {dataTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setDataType(type);
                    setDataTypeOpen(false);
                  }}
                  className={cn(
                    "block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-700",
                    type === dataType ? "bg-primary-50 text-primary-700" : "text-neutral-700",
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
          Find Plans
        </Button>
      </div>
    </form>
  );
}