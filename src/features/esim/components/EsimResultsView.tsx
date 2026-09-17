"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, Filter, Search, Wifi } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import type { EsimCountry, EsimPlan, EsimRegion } from "@/features/esim/types";

interface EsimResultsViewProps {
  region?: EsimRegion;
  countries: EsimCountry[];
  plans: EsimPlan[];
}

export function EsimResultsView({ region, countries, plans }: EsimResultsViewProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"price" | "data">("price");
  const [dataFilter, setDataFilter] = useState("All");

  const visiblePlans = useMemo(() => {
    const filtered = plans.filter((plan) => {
      const matchesData = dataFilter === "All" || plan.data === dataFilter;
      const matchesQuery = `${plan.provider} ${plan.coverage}`.toLowerCase().includes(query.toLowerCase());
      return matchesData && matchesQuery;
    });
    return [...filtered].sort((a, b) => sort === "price" ? a.price - b.price : Number.parseInt(b.data) - Number.parseInt(a.data));
  }, [dataFilter, plans, query, sort]);

  const title = region ? `${region.name} eSIM plans` : countries[0] ? `${countries[0].name} eSIM plans` : "eSIM plans";
  const subtitle = region ? `${countries.length} countries selected` : countries[0] ? `Stay connected in ${countries[0].name}` : "Choose a destination to see available plans";

  return (
    <main className="min-h-screen bg-neutral-50 pb-16 pt-[calc(var(--header-height)+2rem)]">
      <div className="container-app">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary-700">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to search
        </Link>

        <section className="rounded-2xl bg-primary-900 px-5 py-8 text-white shadow-floating sm:px-8 sm:py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-primary-100"><Wifi className="h-3.5 w-3.5" aria-hidden /> Travel connectivity</span>
              <h1 className="mt-3 font-heading text-2xl font-bold sm:text-3xl">{title}</h1>
              <p className="mt-2 text-sm text-primary-100">{subtitle} with instant activation and reliable 4G LTE coverage.</p>
            </div>
            <div className="text-left sm:text-right"><p className="text-2xl font-bold">{plans.length}</p><p className="text-xs text-primary-100">plans available</p></div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {countries.map((country) => <span key={country.code} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium">{country.flag} {country.name}</span>)}
          </div>
        </section>

        {plans.length > 0 ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">
            <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between"><h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-800"><Filter className="h-4 w-4 text-primary-600" aria-hidden /> Filter plans</h2><button type="button" onClick={() => setDataFilter("All")} className="text-xs text-primary-700 hover:underline">Clear</button></div>
              <fieldset className="mt-5"><legend className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Data allowance</legend><div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-start">{["All", "1 GB", "3 GB", "10 GB"].map((value) => <label key={value} className="inline-flex cursor-pointer items-center gap-2 text-sm text-neutral-700"><input type="radio" name="data-filter" checked={dataFilter === value} onChange={() => setDataFilter(value)} className="accent-primary-600" />{value}</label>)}</div></fieldset>
              <fieldset className="mt-6"><legend className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Sort by</legend><div className="mt-3 space-y-2">{[["price", "Price: low to high"], ["data", "Most data"]].map(([value, label]) => <label key={value} className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700"><input type="radio" name="sort" checked={sort === value} onChange={() => setSort(value as "price" | "data")} className="accent-primary-600" />{label}</label>)}</div></fieldset>
            </aside>

            <section aria-labelledby="plans-heading">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><h2 id="plans-heading" className="font-heading text-xl font-semibold text-neutral-900">Available plans</h2><label className="flex min-h-10 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-500"><Search className="h-4 w-4" aria-hidden /><span className="sr-only">Search plans</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search plans" className="w-32 bg-transparent outline-none placeholder:text-neutral-400" /></label></div>
              {visiblePlans.length > 0 ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{visiblePlans.map((plan) => <PlanCard key={plan.id} plan={plan} />)}</div> : <EmptyPlans />}
            </section>
          </div>
        ) : <EmptyPlans />}
      </div>
    </main>
  );
}

function PlanCard({ plan }: { plan: EsimPlan }) {
  return <Card className="overflow-hidden transition-shadow hover:shadow-md"><div className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-800 to-accent-600 px-5 py-6 text-white"><div className="absolute -right-5 -top-8 h-28 w-28 rounded-full border-[16px] border-white/10" /><Wifi className="relative h-8 w-8" aria-hidden /><p className="relative mt-5 text-xs font-medium uppercase tracking-widest text-primary-100">{plan.provider}</p><p className="relative mt-1 font-heading text-xl font-bold">{plan.data} eSIM</p></div><div className="p-5"><div className="flex items-center justify-between gap-3"><h3 className="font-heading text-base font-semibold text-neutral-900">{plan.coverage} plan</h3><span className="text-lg font-bold text-primary-700">{formatCurrency(plan.price)}</span></div><p className="mt-2 text-xs text-neutral-500">{plan.coverage} · {plan.network}</p><div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-600"><span className="rounded-full bg-neutral-100 px-2.5 py-1">{plan.data}</span><span className="rounded-full bg-neutral-100 px-2.5 py-1">{plan.duration}</span><span className="rounded-full bg-neutral-100 px-2.5 py-1">Instant activation</span></div><Button type="button" size="md" className="mt-5 w-full gap-2"><Check className="h-4 w-4" aria-hidden /> Select plan</Button></div></Card>;
}

function EmptyPlans() {
  return <div className="rounded-xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center"><Wifi className="mx-auto h-8 w-8 text-neutral-300" aria-hidden /><h2 className="mt-3 font-heading text-lg font-semibold text-neutral-800">No plans found</h2><p className="mt-1 text-sm text-neutral-500">Try another filter or return to search a different destination.</p></div>;
}