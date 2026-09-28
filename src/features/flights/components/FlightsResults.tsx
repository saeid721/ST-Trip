"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, FileText, Luggage, Plane, PlaneTakeoff, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import {
  addDays,
  airlineLogos,
  airports,
  dateChip,
  getFlightOffers,
  type FlightOffer,
  type FlightSegment,
} from "@/features/flights/data/flights";

type Sort = "earliest" | "fastest" | "cheapest";

const bdt = (n: number) => `${n.toLocaleString("en-US")} BDT`;
const dur = (m: number) => `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`;

const TIME_SLOTS = [
  { id: "night", label: "Night", hint: "00:00–05:59", to: 6 },
  { id: "morning", label: "Morning", hint: "06:00–11:59", to: 12 },
  { id: "afternoon", label: "Afternoon", hint: "12:00–17:59", to: 18 },
  { id: "evening", label: "Evening", hint: "18:00–23:59", to: 24 },
] as const;

const slotOf = (f: FlightOffer) => TIME_SLOTS.find((s) => Number(f.departTime.slice(0, 2)) < s.to)!.id;

interface FlightsResultsProps {
  from: string;
  to: string;
  initialDate: string;
  minDate: string;
}

export function FlightsResults({ from, to, initialDate, minDate }: FlightsResultsProps) {
  const [date, setDate] = useState(initialDate);
  const [sort, setSort] = useState<Sort>("cheapest");
  const [selAirlines, setSelAirlines] = useState<string[]>([]);
  const [selStops, setSelStops] = useState<number[]>([]);
  const [selBaggage, setSelBaggage] = useState<number[]>([]);
  const [selTimes, setSelTimes] = useState<string[]>([]);
  const [selLayovers, setSelLayovers] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [refundableOnly, setRefundableOnly] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [detail, setDetail] = useState<FlightOffer | null>(null);

  const offers = useMemo(() => getFlightOffers(from, to, date), [from, to, date]);
  const fromCity = airports[from]?.city ?? from;
  const toCity = airports[to]?.city ?? to;

  const strip = useMemo(() => {
    const earliest = addDays(initialDate, -2);
    const start = earliest < minDate ? minDate : earliest;
    return Array.from({ length: 6 }, (_, i) => {
      const id = addDays(start, i);
      const prices = getFlightOffers(from, to, id).map((f) => f.price);
      return { id, ...dateChip(id), price: prices.length ? Math.min(...prices) : 0 };
    });
  }, [initialDate, minDate, from, to]);

  const toggle = <T,>(list: T[], v: T, set: (x: T[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const facets = useMemo(() => {
    const airlineMap = new Map<string, { name: string; code: string; logo?: string; price: number; count: number }>();
    const stops = new Map<number, number>();
    const baggage = new Map<number, number>();
    const layovers = new Map<string, number>();
    const times = new Map<string, number>();
    for (const f of offers) {
      const a = airlineMap.get(f.airline);
      if (a) {
        a.price = Math.min(a.price, f.price);
        a.count += 1;
      } else {
        airlineMap.set(f.airline, { name: f.airline, code: f.airlineCode, logo: airlineLogos[f.airline], price: f.price, count: 1 });
      }
      const s = Math.min(f.stops, 2);
      stops.set(s, (stops.get(s) ?? 0) + 1);
      baggage.set(f.baggageKg, (baggage.get(f.baggageKg) ?? 0) + 1);
      if (f.layoverAt) layovers.set(f.layoverAt, (layovers.get(f.layoverAt) ?? 0) + 1);
      const t = slotOf(f);
      times.set(t, (times.get(t) ?? 0) + 1);
    }
    const prices = offers.map((f) => f.price);
    return {
      airlines: [...airlineMap.values()].sort((x, y) => x.price - y.price),
      stops: [...stops.entries()].sort((x, y) => x[0] - y[0]),
      baggage: [...baggage.entries()].sort((x, y) => x[0] - y[0]),
      layovers: [...layovers.entries()].sort((x, y) => y[1] - x[1]),
      times,
      refundable: offers.filter((f) => f.refundable).length,
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    };
  }, [offers]);

  const activeCount =
    selAirlines.length +
    selStops.length +
    selBaggage.length +
    selTimes.length +
    selLayovers.length +
    (refundableOnly ? 1 : 0) +
    (maxPrice !== null && maxPrice < facets.max ? 1 : 0);

  const reset = () => {
    setSelAirlines([]);
    setSelStops([]);
    setSelBaggage([]);
    setSelTimes([]);
    setSelLayovers([]);
    setMaxPrice(null);
    setRefundableOnly(false);
  };

  const changeDate = (id: string) => {
    setDate(id);
    setDetail(null);
    const url = new URL(window.location.href);
    url.searchParams.set("date", id);
    window.history.replaceState(null, "", url);
  };

  const results = useMemo(() => {
    const cap = maxPrice ?? Infinity;
    const list = offers.filter(
      (f) =>
        (!selAirlines.length || selAirlines.includes(f.airline)) &&
        (!selStops.length || selStops.includes(Math.min(f.stops, 2))) &&
        (!selBaggage.length || selBaggage.includes(f.baggageKg)) &&
        (!selTimes.length || selTimes.includes(slotOf(f))) &&
        (!selLayovers.length || (f.layoverAt !== undefined && selLayovers.includes(f.layoverAt))) &&
        f.price <= cap &&
        (!refundableOnly || f.refundable),
    );
    return list.sort((a, b) =>
      sort === "earliest"
        ? a.departTime.localeCompare(b.departTime) || a.price - b.price
        : sort === "fastest"
          ? a.durationMin - b.durationMin || a.price - b.price
          : a.price - b.price || a.durationMin - b.durationMin,
    );
  }, [offers, selAirlines, selStops, selBaggage, selTimes, selLayovers, maxPrice, refundableOnly, sort]);

  const hints = useMemo<Record<Sort, string>>(() => {
    if (!results.length) return { earliest: "—", fastest: "—", cheapest: "—" };
    return {
      earliest: results.reduce((m, f) => (f.departTime < m ? f.departTime : m), "99:99"),
      fastest: dur(Math.min(...results.map((f) => f.durationMin))),
      cheapest: bdt(Math.min(...results.map((f) => f.price))),
    };
  }, [results]);

  const filters = (
    <div className="space-y-5">
      <FilterGroup title="Airlines" scroll>
        {facets.airlines.map((a) => (
          <Check
            key={a.name}
            label={a.name}
            hint={bdt(a.price)}
            checked={selAirlines.includes(a.name)}
            onChange={() => toggle(selAirlines, a.name, setSelAirlines)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Stops">
        {facets.stops.map(([v, n]) => (
          <Check
            key={v}
            label={v === 0 ? "Direct" : v === 1 ? "1 Stop" : "2+ Stops"}
            hint={String(n)}
            checked={selStops.includes(v)}
            onChange={() => toggle(selStops, v, setSelStops)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Price Range">
        <input
          type="range"
          min={facets.min}
          max={facets.max}
          step={1}
          value={maxPrice ?? facets.max}
          disabled={facets.min === facets.max}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary-600"
          aria-label="Maximum price"
        />
        <div className="flex justify-between text-xs font-medium text-primary-700">
          <span>{bdt(facets.min)}</span>
          <span>{bdt(maxPrice ?? facets.max)}</span>
        </div>
      </FilterGroup>
      <FilterGroup title="Departure Time">
        {TIME_SLOTS.map((s) => (
          <Check
            key={s.id}
            label={`${s.label} (${s.hint})`}
            hint={String(facets.times.get(s.id) ?? 0)}
            checked={selTimes.includes(s.id)}
            onChange={() => toggle(selTimes, s.id, setSelTimes)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Baggage Allowance">
        {facets.baggage.map(([kg, n]) => (
          <Check
            key={kg}
            label={`${kg} Kg`}
            hint={String(n)}
            checked={selBaggage.includes(kg)}
            onChange={() => toggle(selBaggage, kg, setSelBaggage)}
          />
        ))}
      </FilterGroup>
      {facets.layovers.length > 0 && (
        <FilterGroup title="Transit / Layover" scroll>
          {facets.layovers.map(([code, n]) => (
            <Check
              key={code}
              label={`${code} · ${airports[code]?.city ?? code}`}
              hint={String(n)}
              checked={selLayovers.includes(code)}
              onChange={() => toggle(selLayovers, code, setSelLayovers)}
            />
          ))}
        </FilterGroup>
      )}
      <FilterGroup title="Fare Type">
        <Check label="Refundable only" hint={String(facets.refundable)} checked={refundableOnly} onChange={() => setRefundableOnly((v) => !v)} />
      </FilterGroup>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Route summary */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="font-heading text-lg font-semibold text-neutral-900">
          {from} → {to}
        </h2>
        <p className="text-sm text-neutral-600">
          {fromCity} to {toCity}
        </p>
      </div>

      {/* Date strip */}
      <div className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0 [scrollbar-width:none]">
        <div className="flex min-w-max gap-2 rounded-xl border border-primary-200 bg-white p-2 lg:min-w-0 lg:grid lg:grid-cols-6">
          {strip.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => changeDate(d.id)}
              aria-pressed={date === d.id}
              className={`min-w-[92px] rounded-lg border px-3 py-2 text-center text-xs transition lg:min-w-0 ${
                date === d.id ? "border-primary-600 bg-primary-600 text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-primary-300"
              }`}
            >
              <span className="block font-semibold">{d.day}</span>
              <span className="block">{d.label}</span>
              <span className={`mt-1 block font-semibold ${date === d.id ? "text-white" : "text-primary-700"}`}>{d.price ? d.price.toLocaleString("en-US") : "—"}</span>
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
              {facets.airlines.map((a) => (
                <button
                  key={a.name}
                  type="button"
                  onClick={() => toggle(selAirlines, a.name, setSelAirlines)}
                  aria-pressed={selAirlines.includes(a.name)}
                  className={`flex w-[116px] shrink-0 flex-col gap-1 rounded-lg border bg-white px-2.5 py-2 text-left transition hover:shadow-sm ${
                    selAirlines.includes(a.name) ? "border-primary-600 ring-1 ring-primary-600" : "border-neutral-200 hover:border-primary-300"
                  }`}
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
              {activeCount > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-primary-600 text-[11px] text-white">{activeCount}</span>
              )}
            </button>
            <div className="grid flex-1 grid-cols-3 gap-1 rounded-lg bg-neutral-100 p-1">
              {(["earliest", "fastest", "cheapest"] as Sort[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSort(s)}
                  className={`rounded-md py-1.5 text-xs font-semibold transition sm:text-sm ${sort === s ? "bg-primary-600 text-white shadow-sm" : "text-neutral-700"}`}
                >
                  <span className="block capitalize">{s}</span>
                  <span className="block text-[10px] font-medium opacity-80 sm:text-[11px]">{hints[s]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {results.length ? (
            results.map((f) => <FlightCard key={f.id} f={f} onDetails={() => setDetail(f)} />)
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-10 text-center">
              {offers.length === 0 ? (
                <>
                  <p className="font-heading font-semibold text-neutral-900">
                    No flights found for {from} → {to}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">Try another route or date.</p>
                </>
              ) : (
                <>
                  <p className="font-heading font-semibold text-neutral-900">No flights match your filters</p>
                  <button type="button" onClick={reset} className="mt-3 text-sm font-medium text-primary-700">
                    Reset filters
                  </button>
                </>
              )}
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

function FilterGroup({ title, scroll, children }: { title: string; scroll?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-2 border-t border-neutral-100 pt-4 first:border-t-0 first:pt-0">
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <div className={scroll ? "max-h-56 space-y-0.5 overflow-y-auto pr-1" : "space-y-0.5"}>{children}</div>
    </div>
  );
}

function Check({ label, hint, checked, onChange }: { label: string; hint?: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex min-h-9 cursor-pointer items-center gap-2 text-sm text-neutral-700">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 shrink-0 accent-primary-600" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {hint && <span className="shrink-0 text-xs text-neutral-500">{hint}</span>}
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