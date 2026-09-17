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
  const [detailsPlan, setDetailsPlan] = useState<EsimPlan | null>(null);
  const [detailsTab, setDetailsTab] = useState<"qr" | "manual" | "apn">("qr");

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

  return (
    <>
      <PageHero eyebrow="Travel connectivity" title="eSIM for Travellers" description="Stay connected worldwide with instant eSIM activation — no physical SIM needed." />

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
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><h2 id="plans-heading" className="font-heading text-lg font-bold uppercase tracking-wide text-neutral-900">{region ? `${region.name} — eSIM Plans` : countries[0] ? `${countries[0].name} — eSIM Plans` : "Available plans"}</h2><div className="flex items-center gap-3"><span className="text-xs font-medium text-neutral-500">{visiblePlans.length} plan{visiblePlans.length === 1 ? "" : "s"} found</span><label className="flex min-h-10 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-500"><Search className="h-4 w-4" aria-hidden /><span className="sr-only">Search plans</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search plans" className="w-32 bg-transparent outline-none placeholder:text-neutral-400" /></label></div></div>
              {visiblePlans.length > 0 ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{visiblePlans.map((plan) => <PlanCard key={plan.id} plan={plan} onDetails={() => { setDetailsPlan(plan); setDetailsTab("qr"); }} />)}</div> : <EmptyPlans />}
            </section>
          </div>
        ) : <EmptyPlans />}
      </div>
      </section>
      {detailsPlan && <PlanDetailsModal plan={detailsPlan} tab={detailsTab} onTabChange={setDetailsTab} onClose={() => setDetailsPlan(null)} />}
    </>
  );
}

function PlanCard({ plan, onDetails }: { plan: EsimPlan; onDetails: () => void }) {
  return <Card className="overflow-hidden transition-shadow hover:shadow-md"><div className="relative h-32 overflow-hidden bg-[#1c0005] px-5 py-5 text-white sm:h-36"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,#ff334d_0%,#8c001c_38%,#210006_78%)]" /><div className="absolute -right-14 -top-16 h-48 w-72 rotate-[-18deg] rounded-[45%] border-[18px] border-red-500/35 shadow-[0_0_30px_rgba(255,0,40,0.5)]" /><div className="absolute -left-20 bottom-[-80px] h-36 w-80 rotate-[16deg] rounded-[50%] border-[12px] border-red-400/20" /><div className="relative flex items-center justify-between"><span className="font-heading text-base font-bold tracking-wide sm:text-lg">◐ SOHBAT<br /><span className="ml-5 text-xs font-medium tracking-normal text-red-100">MOBILE</span></span><span className="rounded-sm bg-cyan-500 px-1.5 py-1 text-[9px] font-black text-white shadow-sm">eSIM</span></div></div><div className="p-5"><div className="flex items-start justify-between gap-3"><h3 className="font-heading text-sm font-semibold text-primary-900">{plan.provider} — {plan.data} · {plan.duration}</h3><span className="shrink-0 text-right text-lg font-bold text-primary-700">{formatCurrency(plan.price)}</span></div><p className="mt-1 text-xs text-neutral-500">{plan.coverage} · {plan.network}</p><div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-neutral-600"><span className="inline-flex items-center gap-1 rounded bg-primary-50 px-2 py-1"><Database className="h-3 w-3 text-primary-600" aria-hidden />{plan.data}</span><span className="inline-flex items-center gap-1 rounded bg-primary-50 px-2 py-1"><CalendarDays className="h-3 w-3 text-primary-600" aria-hidden />{plan.duration}</span><span className="inline-flex items-center gap-1 rounded bg-primary-50 px-2 py-1"><Signal className="h-3 w-3 text-primary-600" aria-hidden />Local</span></div><p className="mt-3 min-h-10 text-[11px] leading-relaxed text-neutral-500">Data-only eSIM. Rechargeable online. Operates on the {plan.network} network in {plan.coverage}.</p><div className="mt-4 flex gap-2"><Button type="button" size="md" className="flex-1 gap-2"><ShoppingCart className="h-4 w-4" aria-hidden /> Buy</Button><Button type="button" variant="outline" size="md" className="flex-1 gap-2" onClick={onDetails}><Check className="h-4 w-4" aria-hidden /> Details</Button></div></div></Card>;
}

function PlanDetailsModal({ plan, tab, onTabChange, onClose }: { plan: EsimPlan; tab: "qr" | "manual" | "apn"; onTabChange: (tab: "qr" | "manual" | "apn") => void; onClose: () => void }) {
  const tabs = [{ id: "qr", label: "QR Install" }, { id: "manual", label: "Manual Install" }, { id: "apn", label: "APN Settings" }] as const;
  return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-neutral-950/70 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section role="dialog" aria-modal="true" aria-labelledby="plan-details-title" className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"><header className="flex items-center justify-between bg-primary-700 px-5 py-4 text-white"><h2 id="plan-details-title" className="text-sm font-semibold">{plan.provider} — eSIM Plan</h2><button type="button" onClick={onClose} aria-label="Close plan details" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-xl hover:bg-white/20">×</button></header><div className="p-4 sm:p-5"><div className="flex flex-wrap gap-x-3 gap-y-1 rounded-lg bg-primary-50 px-3 py-3 text-xs font-semibold text-primary-900"><span>{plan.provider}</span><span>{plan.coverage}</span><span>{plan.data}</span><span>{plan.duration}</span><span>{formatCurrency(plan.price)}</span></div><p className="mt-5 text-xs font-semibold uppercase tracking-wide text-neutral-500">Operator</p><span className="mt-2 inline-flex rounded border border-primary-200 bg-primary-50 px-2.5 py-1.5 text-xs font-medium text-primary-800">{plan.coverage} · {plan.network}</span><div className="mt-5 grid grid-cols-3 border-b border-neutral-200">{tabs.map((item) => <button key={item.id} type="button" onClick={() => onTabChange(item.id)} className={cn("min-h-11 border-b-2 px-2 text-xs font-medium", tab === item.id ? "border-primary-600 text-primary-700" : "border-transparent text-neutral-500 hover:text-neutral-800")}>{item.label}</button>)}</div>{tab === "qr" && <div className="space-y-2 py-5 text-sm text-neutral-700"><p><strong>eSIM name:</strong> {plan.provider}</p><p><strong>Coverage:</strong> {plan.coverage}</p><p className="font-semibold text-primary-900">To activate this eSIM by scanning the QR code on your eSIM capable device:</p><p>Settings → Cellular/Mobile → Add Cellular/Mobile Plan.</p><p>Scan QR code, confirm the eSIM details, then label the eSIM.</p></div>}{tab === "manual" && <div className="space-y-2 py-5 text-sm text-neutral-700"><p className="font-semibold text-primary-900">To manually activate the eSIM on your eSIM capable device:</p><p>Settings → Cellular/Mobile → Add Cellular/Mobile Plan.</p><p>Manually enter the SM-DP+ Address and activation code supplied after purchase.</p><p>Confirm eSIM details and label the eSIM.</p></div>}{tab === "apn" && <div className="py-5"><table className="w-full border-collapse text-left text-xs"><thead><tr className="bg-neutral-50"><th className="border border-neutral-200 px-3 py-2">Device</th><th className="border border-neutral-200 px-3 py-2">Type</th><th className="border border-neutral-200 px-3 py-2">APN value</th></tr></thead><tbody><tr><td className="border border-neutral-200 px-3 py-2 font-medium">Android</td><td className="border border-neutral-200 px-3 py-2">Automatic</td><td className="border border-neutral-200 px-3 py-2">Automatic</td></tr><tr><td className="border border-neutral-200 px-3 py-2 font-medium">iOS</td><td className="border border-neutral-200 px-3 py-2">Automatic</td><td className="border border-neutral-200 px-3 py-2">Automatic</td></tr></tbody></table><p className="mt-3 text-xs text-neutral-500">APN is set automatically on most devices.</p></div>}</div></section></div>;
}

function EmptyPlans() {
  return <div className="rounded-xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center"><Wifi className="mx-auto h-8 w-8 text-neutral-300" aria-hidden /><h2 className="mt-3 font-heading text-lg font-semibold text-neutral-800">No plans found</h2><p className="mt-1 text-sm text-neutral-500">Try another filter or return to search a different destination.</p></div>;
}