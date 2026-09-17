"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, Check, Database, Filter, Search, ShoppingCart, Signal, Wifi } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { EsimSearchAndGuides } from "@/features/esim/components/EsimSearchAndGuides";
import { cn, formatCurrency } from "@/lib/utils";
import type { EsimCountry, EsimPlan, EsimRegion } from "@/features/esim/types";

interface EsimResultsViewProps {
  region?: EsimRegion;
  countries: EsimCountry[];
  plans: EsimPlan[];
}

type SortOption = "price" | "price-desc" | "data";

export function EsimResultsView({ region, countries, plans }: EsimResultsViewProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("price");
  const [dataFilter, setDataFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");

  const visiblePlans = useMemo(() => {
    const filtered = plans.filter((plan) => {
      const matchesData = dataFilter === "All" || plan.data === dataFilter;
      const matchesDuration = durationFilter === "All" || plan.duration === durationFilter;
      const matchesQuery = `${plan.provider} ${plan.coverage}`.toLowerCase().includes(query.toLowerCase());
      return matchesData && matchesDuration && matchesQuery;
    });
    return [...filtered].sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return Number.parseInt(b.data) - Number.parseInt(a.data);
    });
  }, [dataFilter, durationFilter, plans, query, sort]);

  const title = region ? `${region.name} eSIM plans` : countries[0] ? `${countries[0].name} eSIM plans` : "eSIM plans";
  const subtitle = region ? `${countries.length} countries selected` : countries[0] ? `Stay connected in ${countries[0].name}` : "Choose a destination to see available plans";

  return (
    <>
      <PageHero eyebrow="Travel connectivity" title={title} description={`${subtitle} with instant eSIM activation and reliable 4G LTE coverage — no physical SIM needed.`} />

      <section className="bg-neutral-50 pb-16 pt-8 sm:pt-10">
      <div className="container-app">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary-700">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to search
        </Link>

        <EsimSearchAndGuides />

        {countries.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-neutral-500">Selected:</span>
            {countries.map((country) => <span key={country.code} className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700">{country.flag} {country.name}</span>)}
          </div>
        )}

        {plans.length > 0 ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
            <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-4 shadow-sm lg:sticky lg:top-[calc(var(--header-height)+1.5rem)]">
              <div className="flex items-center justify-between"><h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-800"><Filter className="h-4 w-4 text-primary-600" aria-hidden /> Filter &amp; Sort</h2><button type="button" onClick={() => { setDataFilter("All"); setDurationFilter("All"); }} className="text-xs text-primary-700 hover:underline">Clear All</button></div>
              <fieldset className="mt-5"><legend className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Data</legend><div className="mt-3 flex flex-wrap gap-2">{["All", "1 GB", "3 GB", "10 GB"].map((value) => <label key={value} className={cn("cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors", dataFilter === value ? "border-primary-200 bg-primary-50 text-primary-700" : "border-neutral-200 text-neutral-600 hover:border-primary-200")}><input type="radio" name="data-filter" checked={dataFilter === value} onChange={() => setDataFilter(value)} className="sr-only" />{value}</label>)}</div></fieldset>
              <fieldset className="mt-6"><legend className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Duration</legend><div className="mt-3 flex flex-wrap gap-2">{["All", "7 days", "15 days", "30 days"].map((value) => <label key={value} className={cn("cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors", durationFilter === value ? "border-primary-200 bg-primary-50 text-primary-700" : "border-neutral-200 text-neutral-600 hover:border-primary-200")}><input type="radio" name="duration-filter" checked={durationFilter === value} onChange={() => setDurationFilter(value)} className="sr-only" />{value}</label>)}</div></fieldset>
              <fieldset className="mt-6"><legend className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Features</legend><ul className="mt-3 space-y-1.5 text-sm text-neutral-600"><li className="flex items-center gap-2"><Signal className="h-3.5 w-3.5 text-primary-600" aria-hidden /> Local 4G/LTE network</li><li className="flex items-center gap-2"><Database className="h-3.5 w-3.5 text-primary-600" aria-hidden /> Data-only, rechargeable</li></ul></fieldset>
              <fieldset className="mt-6"><legend className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Sort by</legend><div className="mt-3 space-y-2">{[["price", "Price: low to high"], ["price-desc", "Price: high to low"], ["data", "Most data"]].map(([value, label]) => <label key={value} className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700"><input type="radio" name="sort" checked={sort === value} onChange={() => setSort(value as SortOption)} className="accent-primary-600" />{label}</label>)}</div></fieldset>
            </aside>

            <section aria-labelledby="plans-heading">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><h2 id="plans-heading" className="font-heading text-lg font-bold uppercase tracking-wide text-neutral-900">{countries[0] ? `${countries[0].name} — eSIM Plans` : "Available plans"}</h2><div className="flex items-center gap-3"><span className="text-xs font-medium text-neutral-500">{visiblePlans.length} plan{visiblePlans.length === 1 ? "" : "s"} found</span><label className="flex min-h-10 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-500"><Search className="h-4 w-4" aria-hidden /><span className="sr-only">Search plans</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search plans" className="w-32 bg-transparent outline-none placeholder:text-neutral-400" /></label></div></div>
              {visiblePlans.length > 0 ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{visiblePlans.map((plan) => <PlanCard key={plan.id} plan={plan} />)}</div> : <EmptyPlans />}
            </section>
          </div>
        ) : <EmptyPlans />}
      </div>
      </section>
    </>
  );
}

function PlanCard({ plan }: { plan: EsimPlan }) {
  return <Card className="overflow-hidden transition-shadow hover:shadow-md"><div className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-800 to-accent-600 px-5 py-6 text-white"><div className="absolute -right-5 -top-8 h-28 w-28 rounded-full border-[16px] border-white/10" /><div className="relative flex items-center justify-between"><Wifi className="h-7 w-7" aria-hidden /><span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide">eSIM</span></div><p className="relative mt-5 text-xs font-medium uppercase tracking-widest text-primary-100">{plan.provider}</p><p className="relative mt-1 font-heading text-lg font-bold">{plan.data} · {plan.duration}</p></div><div className="p-5"><div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-600"><span className="inline-flex items-center gap-1"><Signal className="h-3.5 w-3.5 text-primary-600" aria-hidden /> {plan.network}</span><span className="inline-flex items-center gap-1"><Database className="h-3.5 w-3.5 text-primary-600" aria-hidden /> {plan.data}</span><span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5 text-primary-600" aria-hidden /> {plan.duration}</span></div><p className="mt-3 text-xs leading-relaxed text-neutral-500">Data-only eSIM, rechargeable online. Operates on the {plan.network} network in {plan.coverage}.</p><div className="mt-4"><p className="text-lg font-bold text-primary-700">{formatCurrency(plan.price)}</p><p className="text-xs text-neutral-500">{plan.data} · {plan.duration}</p></div><div className="mt-4 flex gap-2"><Button type="button" size="md" className="flex-1 gap-2"><ShoppingCart className="h-4 w-4" aria-hidden /> Buy</Button><Button type="button" variant="outline" size="md" className="flex-1 gap-2"><Check className="h-4 w-4" aria-hidden /> Details</Button></div></div></Card>;
}

function EmptyPlans() {
  return <div className="rounded-xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center"><Wifi className="mx-auto h-8 w-8 text-neutral-300" aria-hidden /><h2 className="mt-3 font-heading text-lg font-semibold text-neutral-800">No plans found</h2><p className="mt-1 text-sm text-neutral-500">Try another filter or return to search a different destination.</p></div>;
}