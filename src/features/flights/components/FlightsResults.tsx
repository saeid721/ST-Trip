"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, FileText, Luggage, Plane, PlaneTakeoff, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { flightDates, flightOffers, type FlightOffer, type FlightSegment } from "@/features/flights/data/flights";

type Sort = "earliest" | "fastest" | "cheapest";

const bdt = (n: number) => `${n.toLocaleString("en-US")} BDT`;
const dur = (m: number) => `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`;

const prices = flightOffers.map((f) => f.price);
const MIN_PRICE = Math.min(...prices);
const MAX_PRICE = Math.max(...prices);
const airlines = Array.from(new Set(flightOffers.map((f) => f.airline)));

const airlineLogos: Record<string, string> = {
  IndiGo: "/images/airlines/indigo.png",
  "Qatar Airways": "/images/airlines/qatar.png",
  Emirates: "/images/airlines/emirates.png",
  Saudia: "/images/airlines/saudi.png",
  "Biman Bangladesh Airlines": "/images/airlines/biman.png",
  "US-Bangla Airlines": "/images/airlines/us-bangla.png",
  "Turkish Airlines": "/images/airlines/turkish.png",
};

export function FlightsResults() {
  const [date, setDate] = useState("2026-10-01");
  const [sort, setSort] = useState<Sort>("cheapest");
  const [selAirlines, setSelAirlines] = useState<string[]>([]);
  const [selStops, setSelStops] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [refundableOnly, setRefundableOnly] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [detail, setDetail] = useState<FlightOffer | null>(null);

  const toggle = <T,>(list: T[], v: T, set: (x: T[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const reset = () => {
    setSelAirlines([]);
    setSelStops([]);
    setMaxPrice(MAX_PRICE);
    setRefundableOnly(false);
  };

  const results = useMemo(() => {
    const list = flightOffers.filter(
      (f) =>
        (!selAirlines.length || selAirlines.includes(f.airline)) &&
        (!selStops.length || selStops.includes(Math.min(f.stops, 2))) &&
        f.price <= maxPrice &&
        (!refundableOnly || f.refundable),
    );
    return [...list].sort((a, b) =>
      sort === "earliest" ? a.departTime.localeCompare(b.departTime) : sort === "fastest" ? a.durationMin - b.durationMin : a.price - b.price,
    );
  }, [selAirlines, selStops, maxPrice, refundableOnly, sort]);

  const cheapestByAirline = airlines.map((name) => {
    const list = flightOffers.filter((f) => f.airline === name);
    return { name, code: list[0].airlineCode, logo: airlineLogos[name], price: Math.min(...list.map((f) => f.price)) };
  });

  const filters = (
    <div className="space-y-5">
      <FilterGroup title="Airlines">
        {airlines.map((a) => (
          <Check key={a} label={a} checked={selAirlines.includes(a)} onChange={() => toggle(selAirlines, a, setSelAirlines)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Stops">
        {[
          { v: 0, l: "Direct" },
          { v: 1, l: "1 Stop" },
          { v: 2, l: "2+ Stops" },
        ].map((s) => (
          <Check key={s.v} label={s.l} checked={selStops.includes(s.v)} onChange={() => toggle(selStops, s.v, setSelStops)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Price Range">
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary-600"
          aria-label="Maximum price"
        />
        <div className="flex justify-between text-xs font-medium text-primary-700">
          <span>{bdt(MIN_PRICE)}</span>
          <span>{bdt(maxPrice)}</span>
        </div>
      </FilterGroup>
      <FilterGroup title="Fare Type">
        <Check label="Refundable only" checked={refundableOnly} onChange={() => setRefundableOnly((v) => !v)} />
      </FilterGroup>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Date strip */}
      <div className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0 [scrollbar-width:none]">
        <div className="flex min-w-max gap-2 rounded-xl border border-primary-200 bg-white p-2 lg:min-w-0 lg:grid lg:grid-cols-6">
          {flightDates.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDate(d.id)}
              aria-pressed={date === d.id}
              className={`min-w-[92px] rounded-lg border px-3 py-2 text-center text-xs transition lg:min-w-0 ${
                date === d.id ? "border-primary-600 bg-primary-600 text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-primary-300"
              }`}
            >
              <span className="block font-semibold">{d.day}</span>
              <span className="block">{d.label}</span>
              <span className={`mt-1 block font-semibold ${date === d.id ? "text-white" : "text-primary-700"}`}>{d.price.toLocaleString("en-US")}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[280px_1fr] lg:items-start">
        {/* Desktop filters */}
        <aside className="hidden rounded-xl border border-neutral-200 bg-white p-4 shadow-sm lg:sticky lg:top-24 lg:block">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-base font-semibold text-neutral-900">Filter Search</h2>
            <button type="button" onClick={reset} className="flex items-center gap-1 text-xs font-medium text-primary-700">
              <RotateCcw className="size-3.5" /> Reset
            </button>
          </div>
          {filters}
        </aside>

        <section className="min-w-0 space-y-4">
          {/* Summary + airline chips */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-heading text-base font-semibold text-neutral-900">{results.length} Available Flights</h2>
              <p className="text-[11px] text-neutral-500">*Price includes VAT &amp; Tax</p>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
              {cheapestByAirline.map((a) => (
                <button
                  key={a.name}
                  type="button"
                  onClick={() => setSelAirlines([a.name])}
                  className="flex w-[116px] shrink-0 flex-col gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-2 text-left transition hover:border-primary-300 hover:shadow-sm"
                >
                  {a.logo ? (
                    <Image src={a.logo} alt={a.name} width={96} height={28} className="h-7 w-auto max-w-full object-contain object-left" />
                  ) : (
                    <span className="text-xs font-semibold text-neutral-900">{a.name}</span>
                  )}
                  <span className="block text-[11px] font-semibold text-neutral-800">{a.code}</span>
                  <span className="block text-xs font-semibold text-primary-700">{bdt(a.price)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort + mobile filter button */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="flex shrink-0 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-800 lg:hidden"
            >
              <SlidersHorizontal className="size-4" /> Filter
            </button>
            <div className="grid flex-1 grid-cols-3 gap-1 rounded-lg bg-neutral-100 p-1">
              {(["earliest", "fastest", "cheapest"] as Sort[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSort(s)}
                  className={`rounded-md py-2 text-xs font-semibold capitalize transition sm:text-sm ${sort === s ? "bg-primary-600 text-white shadow-sm" : "text-neutral-700"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {results.length ? (
            results.map((f) => <FlightCard key={f.id} f={f} onDetails={() => setDetail(f)} />)
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-10 text-center">
              <p className="font-heading font-semibold text-neutral-900">No flights match your filters</p>
              <button type="button" onClick={reset} className="mt-3 text-sm font-medium text-primary-700">
                Reset filters
              </button>
            </div>
          )}
        </section>
      </div>

      <FlightDetailsDrawer key={detail?.id ?? "none"} f={detail} onClose={() => setDetail(null)} />

      {/* Mobile filter drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-neutral-950/50" onClick={() => setDrawer(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-2xl bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-base font-semibold">Filter Search</h2>
              <button type="button" onClick={() => setDrawer(false)} aria-label="Close filters">
                <X className="size-5" />
              </button>
            </div>
            {filters}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button type="button" onClick={reset} className="rounded-lg border border-neutral-300 py-3 text-sm font-semibold">
                Reset
              </button>
              <button type="button" onClick={() => setDrawer(false)} className="rounded-lg bg-primary-600 py-3 text-sm font-semibold text-white">
                Show {results.length} flights
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 border-t border-neutral-100 pt-4 first:border-t-0 first:pt-0">
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      {children}
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex min-h-9 cursor-pointer items-center gap-2 text-sm text-neutral-700">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 accent-primary-600" />
      {label}
    </label>
  );
}

function FlightCard({ f, onDetails }: { f: FlightOffer; onDetails: () => void }) {
  return (
    <article className="rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="grid gap-4 p-4 lg:grid-cols-[170px_1fr_170px] lg:items-center">
        {/* Airline */}
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-16 shrink-0 place-items-center">
            {airlineLogos[f.airline] ? (
              <Image src={airlineLogos[f.airline]} alt={f.airline} width={64} height={32} className="h-8 w-auto max-w-full object-contain" />
            ) : (
              <span className="grid size-10 place-items-center rounded-lg bg-primary-50 text-sm font-bold text-primary-700">{f.airlineCode}</span>
            )}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-neutral-900">{f.airline}</p>
            <p className="text-xs text-neutral-500">{f.flightNo}</p>
          </div>
          <p className="ml-auto text-lg font-bold text-primary-700 lg:hidden">{bdt(f.price)}</p>
        </div>

        {/* Route */}
        <div className="flex items-center gap-3">
          <div>
            <p className="text-lg font-bold text-neutral-900">{f.departTime}</p>
            <p className="text-xs text-neutral-500">{f.from} · {f.departDate}</p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-center gap-1 text-[11px] text-neutral-500">
            <span>{dur(f.durationMin)}</span>
            <div className="relative h-px w-full bg-neutral-300">
              <PlaneTakeoff className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 bg-white px-0.5 text-primary-600" />
            </div>
            <span className="truncate">{f.stops === 0 ? "Non-stop" : `${f.layoverLabel} layover at ${f.layoverAt}`}</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-neutral-900">{f.arriveTime}</p>
            <p className="text-xs text-neutral-500">{f.to} · {f.arriveDate}</p>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex flex-col gap-2 lg:items-end">
          <p className="hidden text-lg font-bold text-neutral-900 lg:block">{bdt(f.price)}</p>
          <button type="button" className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 lg:w-auto">
            Select Fare
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-neutral-100 px-4 py-3 text-xs">
        <p className="text-neutral-700">
          {f.baggageKg} Kg ·{" "}
          <span className={f.refundable ? "font-semibold text-success" : "font-semibold text-danger"}>{f.refundable ? "Refundable" : "Non Refundable"}</span>
          {" · "}
          <span className={f.seats <= 3 ? "font-semibold text-danger" : "text-success"}>Seats: {f.seats}</span>
        </p>
        <button type="button" onClick={onDetails} className="flex items-center gap-1 font-semibold text-primary-700 hover:underline">
          Flight Details <ArrowRight className="size-3.5" />
        </button>
      </div>
    </article>
  );
}


function FlightDetailsDrawer({ f, onClose }: { f: FlightOffer | null; onClose: () => void }) {
  const [tab, setTab] = useState<"trips" | "rules">("trips");

  useEffect(() => {
    if (!f) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [f, onClose]);

  if (!f) return null;

  const segments: FlightSegment[] = f.segments ?? [
    {
      from: f.from,
      to: f.to,
      departTime: f.departTime,
      departDate: f.departDate,
      arriveTime: f.arriveTime,
      arriveDate: f.arriveDate,
      durationLabel: dur(f.durationMin),
      flightNo: f.flightNo,
      seats: f.seats,
    },
  ];

  const stopsLabel = f.stops === 0 ? "Non-stop" : `${f.stops} stop${f.stops > 1 ? "s" : ""}`;
  const tabs = [
    { id: "trips", label: "Trips", Icon: Plane },
    { id: "rules", label: "Rules & Policies", Icon: FileText },
  ] as const;

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Flight details">
      <div className="absolute inset-0 animate-fade-in bg-neutral-950/50" onClick={onClose} />

      <aside className="absolute inset-y-0 right-0 flex h-dvh w-full max-w-[440px] animate-[slide-in-right_260ms_var(--ease-out-soft)_both] flex-col bg-white shadow-xl">
        {/* Header */}
        <header className="flex items-start gap-3 border-b border-neutral-200 p-4">
          <span className="grid h-10 w-16 shrink-0 place-items-center">
            {airlineLogos[f.airline] ? (
              <Image src={airlineLogos[f.airline]} alt={f.airline} width={64} height={32} className="h-8 w-auto max-w-full object-contain" />
            ) : (
              <span className="grid size-10 place-items-center rounded-lg bg-primary-50 text-sm font-bold text-primary-700">{f.airlineCode}</span>
            )}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-heading text-lg font-semibold text-neutral-900">{f.from}-{f.to}</h2>
            <p className="text-xs text-neutral-500">
              {f.airline} • 1 trip(s) • Total {dur(f.durationMin)} • {stopsLabel}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close details" className="grid size-8 shrink-0 place-items-center rounded-md bg-danger text-white">
            <X className="size-4" />
          </button>
        </header>

        {/* Tabs */}
        <div role="tablist" className="flex gap-2 border-b border-neutral-200 px-4">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 border-b-2 px-2 py-3 text-sm font-semibold transition ${
                tab === id ? "border-primary-600 text-primary-700" : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Icon className="size-4" /> {label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {tab === "trips" ? (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-x-4 gap-y-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-primary-700">
                <span>• Trip 1</span>
                <span>• {f.airline}</span>
                <span>• Total {dur(f.durationMin)}</span>
                <span>• {stopsLabel}</span>
              </div>

              {segments.map((s, i) => (
                <div key={i} className="space-y-4">
                  <div className="grid grid-cols-[92px_1fr] gap-x-4">
                    <div className="space-y-0.5 text-xs text-neutral-600">
                      <p className="flex items-center gap-1.5 text-base font-bold text-neutral-900">
                        <Plane className="size-4 text-primary-600" /> {s.departTime}
                      </p>
                      <p>{s.departDate}</p>
                      <p className="pt-1 font-semibold uppercase text-neutral-900">{f.airline}</p>
                      <p>{s.flightNo}</p>
                      <p>Economy</p>
                      <p className="pt-3 font-semibold text-neutral-900">Arrives {s.arriveTime}</p>
                      <p>{s.arriveDate}</p>
                    </div>

                    <div className="min-w-0 space-y-1.5 text-sm text-neutral-700">
                      <p className="font-semibold text-neutral-900">
                        {s.from}
                        {s.fromCity && <span className="font-normal text-neutral-500"> ({s.fromCity})</span>} → {s.to}
                        {s.toCity && <span className="font-normal text-neutral-500"> ({s.toCity})</span>}
                      </p>
                      <ul className="space-y-1 text-[13px] text-neutral-600">
                        <li>• {s.durationLabel}</li>
                        {s.aircraft && <li>• {s.aircraft}</li>}
                        {s.seats !== undefined && <li>• Seats Left: {s.seats}</li>}
                        {s.fromAirport && (
                          <li>
                            • Departure → Airport:
                            <span className="block pl-3 text-neutral-700">{s.fromAirport}</span>
                          </li>
                        )}
                        {s.toAirport && (
                          <li>
                            • Arrival → Airport:
                            <span className="block pl-3 text-neutral-700">{s.toAirport}</span>
                          </li>
                        )}
                      </ul>
                      <p className="flex items-center gap-2 pt-1 text-[13px] text-neutral-700">
                        <Luggage className="size-4 shrink-0 text-primary-600" />
                        Baggage Checked: {f.baggageKg} Kg | Hand: 7 Kg
                      </p>
                    </div>
                  </div>

                  {s.layoverAfter && (
                    <div className="flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-2.5 text-sm font-semibold text-primary-800">
                      <PlaneTakeoff className="size-4 shrink-0" /> {s.layoverAfter}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-3 text-sm">
              {[
                { t: "Refund", d: f.refundable ? "Refundable. Cancellation fees may apply as per airline policy." : "Non-refundable. This fare cannot be cancelled for a refund." },
                { t: "Date change", d: "Changes are allowed subject to airline fare rules, fare difference and change fee." },
                { t: "Baggage", d: `Checked: ${f.baggageKg} Kg per passenger. Hand baggage: 7 Kg.` },
                { t: "Taxes & fees", d: "Displayed price includes VAT and airport taxes." },
                { t: "Check-in", d: "Please carry a valid passport and visa. Airport check-in closes 60 minutes before departure." },
              ].map((r) => (
                <li key={r.t} className="rounded-lg border border-neutral-200 p-3">
                  <p className="font-semibold text-neutral-900">{r.t}</p>
                  <p className="mt-1 text-[13px] text-neutral-600">{r.d}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between gap-3 border-t border-neutral-200 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div>
            <p className="text-[11px] text-neutral-500">Total fare</p>
            <p className="text-lg font-bold text-primary-700">{bdt(f.price)}</p>
          </div>
          <button type="button" className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700">
            Select Fare
          </button>
        </footer>
      </aside>
    </div>
  );
}