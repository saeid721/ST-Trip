"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  FileUp,
  Laptop,
  LayoutGrid,
  MessageCircle,
  PackageCheck,
  Phone,
  PlaneLanding,
  Search,
  SearchX,
  Stamp,
  UserCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { VisaFlag } from "@/features/visa/components/VisaFlag";
import {
  VISA_CATEGORY_LABELS,
  getDestinationDocs,
  getPopularDestinations,
  searchVisaDestinations,
} from "@/features/visa/data/visa-destinations";
import { visaPhoneHref, visaWhatsAppHref } from "@/features/visa/lib/links";
import type { VisaCategory, VisaDestination } from "@/features/visa/types";

const INITIAL_VISIBLE = 6;

type Filter = "all" | VisaCategory;

const FILTERS: { id: Filter; label: string; short: string; icon: LucideIcon }[] = [
  { id: "all", label: "All", short: "All", icon: LayoutGrid },
  { id: "evisa", label: "e-Visa", short: "e-Visa", icon: Laptop },
  { id: "sticker", label: "Sticker visa", short: "Sticker", icon: Stamp },
  { id: "arrival", label: "Visa on arrival", short: "On arrival", icon: PlaneLanding },
];

const isFilter = (value: string): value is Filter => FILTERS.some((f) => f.id === value);

const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Search, title: "Check requirements", text: "Pick your destination and profession to get the exact document checklist." },
  { icon: FileUp, title: "Apply online", text: "Fill in the application, upload documents and pay securely." },
  { icon: UserCheck, title: "Expert review", text: "Our visa team reviews everything before it is submitted." },
  { icon: PackageCheck, title: "Visa delivered", text: "We collect your passport or e-Visa and deliver it to you." },
];

/* ========================================================================== */
/* Pieces                                                                     */
/* ========================================================================== */

function SectionHead({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="font-heading text-lg font-bold text-neutral-900 sm:text-2xl">{title}</h2>
      <p className="mt-1 text-xs text-neutral-500 sm:text-sm">{text}</p>
    </div>
  );
}

function CountryCard({ destination, showCategory }: { destination: VisaDestination; showCategory: boolean }) {
  return (
    <Link
      href={`/visa/${destination.slug}`}
      className="group flex h-full flex-col rounded-md border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
    >
      <div className="flex items-center gap-2.5">
        <VisaFlag code={destination.code} name={destination.name} />
        <h3 className="min-w-0 flex-1 text-sm font-bold leading-snug text-neutral-900 group-hover:text-primary-700">
          {destination.name}
        </h3>
        {destination.guide && (
          <span className="shrink-0 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
            Full guide
          </span>
        )}
      </div>
      {showCategory && (
        <span className="mt-2 w-fit rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold text-primary-700">
          {VISA_CATEGORY_LABELS[destination.category]}
        </span>
      )}
      <ul className="mt-3 space-y-1.5">
        {getDestinationDocs(destination).map((doc) => (
          <li key={doc} className="flex gap-2 text-xs leading-5 text-neutral-500">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-300" aria-hidden />
            <span>{doc}</span>
          </li>
        ))}
      </ul>
      <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-primary-700">
        View requirements
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

function PopularDestinations() {
  const popular = useMemo(() => getPopularDestinations(), []);
  return (
    <section className="rounded-md border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
      <SectionHead title="Popular destinations" text="Most-requested visas from Bangladesh" />
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-6">
        {popular.map((item) => (
          <Link
            key={item.slug}
            href={`/visa/${item.slug}`}
            className="group flex flex-col rounded-md border border-neutral-200 bg-neutral-50/50 p-3.5 transition hover:-translate-y-0.5 hover:border-primary-300 hover:bg-white hover:shadow-md sm:p-4"
          >
            <VisaFlag code={item.code} name={item.name} className="h-6 w-9" />
            <span className="mt-3 text-sm font-bold leading-snug text-neutral-900">{item.name}</span>
            <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs font-semibold text-primary-700">
              View guide
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function VisaTypes({ initialQuery, initialFilter }: { initialQuery: string; initialFilter: Filter }) {
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [expanded, setExpanded] = useState(false);

  const matches = useMemo(() => searchVisaDestinations(query), [query]);
  const counts: Record<Filter, number> = useMemo(
    () => ({
      all: matches.length,
      evisa: matches.filter((m) => m.category === "evisa").length,
      sticker: matches.filter((m) => m.category === "sticker").length,
      arrival: matches.filter((m) => m.category === "arrival").length,
    }),
    [matches],
  );

  const results = filter === "all" ? matches : matches.filter((m) => m.category === filter);
  const isSearching = query.trim().length > 0;
  const visible = isSearching || expanded ? results : results.slice(0, INITIAL_VISIBLE);
  const trimmed = query.trim();

  return (
    <section>
      <SectionHead title="Visa type at a glance" text="Which destinations issue e-Visas, stamp on arrival, or need a sticker visa" />

      <div className="relative mt-4 sm:mt-5">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden />
        <input
          type="text"
          inputMode="search"
          enterKeyHint="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destination, e.g. UAE, Thailand, Schengen"
          aria-label="Search visa destinations"
          className="h-12 w-full rounded-md border border-neutral-200 bg-white pl-10 pr-10 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>

      <div role="tablist" aria-label="Visa types" className="mt-3 grid grid-cols-4 gap-1 rounded-lg bg-primary-50/80 p-1">
        {FILTERS.map((f) => {
          const Icon = f.icon;
          const isActive = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setFilter(f.id);
                setExpanded(false);
              }}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-md px-1 py-2 text-center text-[11px] font-semibold leading-tight transition sm:flex-row sm:gap-2 sm:px-3 sm:text-sm",
                isActive ? "bg-white text-primary-700 shadow-sm" : "text-neutral-500 hover:text-neutral-800",
              )}
            >
              <span className="flex items-center gap-1.5">
                <Icon className="hidden h-4 w-4 shrink-0 sm:block" aria-hidden />
                <span className="sm:hidden">{f.short}</span>
                <span className="hidden sm:inline">{f.label}</span>
              </span>
              <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-bold text-primary-700 sm:text-xs">
                {counts[f.id]}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-3 text-xs text-neutral-500">
        Showing {visible.length} of {results.length} destinations
        {isSearching && <> for &ldquo;{trimmed}&rdquo;</>}
      </p>

      {results.length > 0 ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((item) => (
            <CountryCard key={`${filter}-${item.slug}`} destination={item} showCategory={filter === "all"} />
          ))}
        </div>
      ) : (
        <div className="mt-3 flex flex-col items-center rounded-md border border-dashed border-neutral-300 bg-white px-4 py-10 text-center">
          <SearchX className="h-8 w-8 text-neutral-300" aria-hidden />
          {matches.length > 0 ? (
            <>
              <p className="mt-3 text-sm font-semibold text-neutral-800">
                No {filter === "all" ? "" : `${VISA_CATEGORY_LABELS[filter as VisaCategory]} `}destinations match &ldquo;{trimmed}&rdquo;
              </p>
              <p className="mt-1 text-xs text-neutral-500">{matches.length} found in other visa types.</p>
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="mt-4 min-h-10 rounded-md bg-primary-700 px-4 text-xs font-semibold text-white hover:bg-primary-800"
              >
                Show all types
              </button>
            </>
          ) : (
            <>
              <p className="mt-3 text-sm font-semibold text-neutral-800">No destination found for &ldquo;{trimmed}&rdquo;</p>
              <p className="mt-1 max-w-sm text-xs leading-5 text-neutral-500">
                We may still be able to help. Ask our visa team about this destination.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <a
                  href={visaWhatsAppHref(`Hello ${siteConfig.name}, I need visa information for ${trimmed}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-primary-700 px-4 text-xs font-semibold text-white hover:bg-primary-800"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden /> Ask on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="min-h-10 rounded-md border border-neutral-200 bg-white px-4 text-xs font-semibold text-neutral-700 hover:border-primary-300"
                >
                  Clear search
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {!isSearching && results.length > INITIAL_VISIBLE && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="min-h-11 rounded-md border border-neutral-200 bg-white px-5 text-sm font-semibold text-neutral-800 shadow-sm transition hover:border-primary-300 hover:text-primary-700"
          >
            {expanded ? "Show less" : `Show all ${results.length} destinations`}
          </button>
        </div>
      )}
    </section>
  );
}

function HowItWorks() {
  return (
    <section>
      <SectionHead title="How we handle your visa" text="Apply online; our visa team takes it from there" />

      <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative overflow-hidden rounded-md border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
              <span className="absolute right-3 top-1 font-heading text-4xl font-bold text-primary-100/80" aria-hidden>
                {i + 1}
              </span>
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="relative mt-3 text-sm font-bold text-neutral-900">{step.title}</h3>
              <p className="relative mt-1 text-xs leading-5 text-neutral-500 sm:text-[13px]">{step.text}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <a
          href={visaWhatsAppHref(`Hello ${siteConfig.name}, I would like to start a visa application.`)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-700 px-6 text-sm font-semibold text-white shadow-md shadow-primary-700/20 transition hover:bg-primary-800"
        >
          <MessageCircle className="h-4 w-4" aria-hidden /> Start your application
        </a>
        <a
          href={visaPhoneHref}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-800 transition hover:border-primary-300 hover:text-primary-700"
        >
          <Phone className="h-4 w-4" aria-hidden /> Call the visa team
        </a>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Public component                                                           */
/* ========================================================================== */

export function VisaLanding({
  initialQuery = "",
  initialCategory = "",
}: {
  initialQuery?: string;
  initialCategory?: string;
}) {
  const initialFilter: Filter = isFilter(initialCategory) ? initialCategory : initialQuery ? "all" : "evisa";

  return (
    <div className="space-y-8 sm:space-y-10">
      <PopularDestinations />
      <VisaTypes initialQuery={initialQuery} initialFilter={initialFilter} />
      <HowItWorks />
    </div>
  );
}