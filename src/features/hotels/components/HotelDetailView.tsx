"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  ArrowLeft,
  ArrowUpDown,
  Ban,
  Bath,
  BedDouble,
  Beer,
  Building2,
  Check,
  ChevronDown,
  Clock3,
  Coffee,
  DoorClosed,
  Dumbbell,
  Filter,
  Info,
  Landmark,
  Lock,
  MapPin,
  Phone,
  PlaneTakeoff,
  Refrigerator,
  Ruler,
  ShieldCheck,
  Shirt,
  Snowflake,
  Sofa,
  Sparkles,
  Star,
  Thermometer,
  Tv,
  Users,
  Waves,
  Wifi,
  Wind,
  X,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import type { HotelDetail } from "@/features/hotels/types";

type RoomType = NonNullable<HotelDetail["roomTypes"]>[number];

interface HotelDetailViewProps {
  detail: HotelDetail;
  backHref: string;
  backLabel: string;
  searchContext?: {
    checkIn: string;
    checkOut: string;
    rooms: number;
    guests: number;
  };
}

/* -------------------------------------------------------------------------- */
/* Shared helpers                                                              */
/* -------------------------------------------------------------------------- */

const AMENITY_ICON_RULES: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ["wifi"], icon: Wifi },
  { keywords: ["a/c", "ac", "air condition"], icon: Snowflake },
  { keywords: ["breakfast", "tea", "coffee"], icon: Coffee },
  { keywords: ["pool"], icon: Waves },
  { keywords: ["gym", "fitness"], icon: Dumbbell },
  { keywords: ["lobby", "sofa"], icon: Sofa },
  { keywords: ["security"], icon: ShieldCheck },
  { keywords: ["airport"], icon: PlaneTakeoff },
  { keywords: ["city center"], icon: Landmark },
  { keywords: ["beach"], icon: Anchor },
  { keywords: ["bar"], icon: Beer },
  { keywords: ["tv"], icon: Tv },
  { keywords: ["fridge", "mini bar"], icon: Refrigerator },
  { keywords: ["almira"], icon: DoorClosed },
  { keywords: ["toilet"], icon: Bath },
  { keywords: ["hot water"], icon: Thermometer },
  { keywords: ["water"], icon: Bath },
  { keywords: ["phone"], icon: Phone },
  { keywords: ["mirror", "housekeeping"], icon: Sparkles },
  { keywords: ["hair dryer"], icon: Wind },
  { keywords: ["safe box"], icon: Lock },
  { keywords: ["iron"], icon: Shirt },
];

function getAmenityIcon(label: string): LucideIcon {
  const normalized = label.toLowerCase();
  const rule = AMENITY_ICON_RULES.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword)),
  );
  return rule?.icon ?? Check;
}

function formatDisplayDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${day}-${month}-${date.getFullYear()}`;
}

function nightsBetween(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn).getTime();
  const end = new Date(checkOut).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return 1;
  return Math.max(1, Math.round((end - start) / 86_400_000));
}

/* -------------------------------------------------------------------------- */
/* Main component                                                             */
/* -------------------------------------------------------------------------- */

export function HotelDetailView({ detail, backHref, backLabel, searchContext }: HotelDetailViewProps) {
  const gallery = detail.gallery && detail.gallery.length > 0 ? detail.gallery : [detail.heroImage];
  const rooms = detail.roomTypes ?? [];
  const starCount = Math.min(5, Math.max(1, Math.round(detail.rating)));

  // --- Modify Search panel state (local only — no navigation, no reload) ---
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchType, setSearchType] = useState<"domestic" | "international">("domestic");
  const [location, setLocation] = useState(detail.location);
  const [checkIn, setCheckIn] = useState(searchContext?.checkIn ?? new Date().toISOString().slice(0, 10));
  const [checkOut, setCheckOut] = useState(
    searchContext?.checkOut ?? new Date(Date.now() + 86_400_000).toISOString().slice(0, 10),
  );
  const [roomCount, setRoomCount] = useState(searchContext?.rooms ?? 1);
  const [guestCount, setGuestCount] = useState(searchContext?.guests ?? 2);
  const nights = nightsBetween(checkIn, checkOut);

  // --- Room filters ---
  const [mealFilter, setMealFilter] = useState("all");
  const [personsFilter, setPersonsFilter] = useState("all");
  const [bedFilter, setBedFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"low-high" | "high-low">("low-high");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const mealOptions = useMemo(
    () => Array.from(new Set(rooms.map((room) => room.mealOption ?? "Room Only"))),
    [rooms],
  );
  const personsOptions = useMemo(
    () => Array.from(new Set(rooms.map((room) => room.maxGuests ?? 2))).sort((a, b) => a - b),
    [rooms],
  );
  const bedOptions = useMemo(
    () => Array.from(new Set(rooms.map((room) => room.bedType ?? "Standard Bed"))),
    [rooms],
  );

  const filteredRooms = useMemo(() => {
    let list = rooms.slice();
    if (mealFilter !== "all") list = list.filter((room) => (room.mealOption ?? "Room Only") === mealFilter);
    if (personsFilter !== "all") list = list.filter((room) => String(room.maxGuests ?? 2) === personsFilter);
    if (bedFilter !== "all") list = list.filter((room) => (room.bedType ?? "Standard Bed") === bedFilter);
    list.sort((a, b) => (sortOrder === "high-low" ? b.priceFrom - a.priceFrom : a.priceFrom - b.priceFrom));
    return list;
  }, [rooms, mealFilter, personsFilter, bedFilter, sortOrder]);

  const resetFilters = () => {
    setMealFilter("all");
    setPersonsFilter("all");
    setBedFilter("all");
  };

  return (
    <>
      {/* Header offset: the global Header is fixed + transparent-until-scroll,
          so the very first block on the page needs top padding to clear it. */}
      <div className="pt-[calc(var(--header-height)+0.75rem)] sm:pt-[calc(var(--header-height)+1rem)]">
        {searchOpen && (
          <section className="border-b border-neutral-200 bg-white">
            <div className="container-app py-5 sm:py-6">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary-700 px-4 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-primary-800"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                  Close
                </button>
              </div>

              <div className="mt-5 flex items-center gap-5 text-sm font-medium text-neutral-700">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="searchType"
                    checked={searchType === "domestic"}
                    onChange={() => setSearchType("domestic")}
                    className="h-4 w-4 accent-primary-600"
                  />
                  Domestic
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="searchType"
                    checked={searchType === "international"}
                    onChange={() => setSearchType("international")}
                    className="h-4 w-4 accent-primary-600"
                  />
                  International
                </label>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:items-end">
                <SearchField label="Location">
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent text-sm text-neutral-900 outline-none"
                  />
                </SearchField>
                <SearchField label="Check In">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-transparent text-sm text-neutral-900 outline-none"
                  />
                </SearchField>
                <SearchField label="Check Out">
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-transparent text-sm text-neutral-900 outline-none"
                  />
                </SearchField>
                <SearchField label="Room">
                  <select
                    value={roomCount}
                    onChange={(e) => setRoomCount(Number(e.target.value))}
                    className="w-full bg-transparent text-sm text-neutral-900 outline-none"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} Room{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </SearchField>
                <SearchField label="Guest">
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-transparent text-sm text-neutral-900 outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} Adult{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </SearchField>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary-600 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  <Filter className="h-4 w-4" aria-hidden />
                  Search Again
                </button>
              </div>
            </div>
          </section>
        )}

        <section className="bg-primary-700 text-white">
          <div className="container-app py-6 sm:py-8">
            <div className="flex items-center justify-between gap-3">
              <Link
                href={backHref}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-100 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                {backLabel}
              </Link>
              {!searchOpen && (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/40 px-4 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Filter className="h-3.5 w-3.5" aria-hidden />
                  Modify Search
                </button>
              )}
              <span className="w-[92px] sm:w-[110px]" aria-hidden />
            </div>

            <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-1 text-accent-300" aria-label={`${starCount} out of 5 stars`}>
                  {Array.from({ length: starCount }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" aria-hidden />
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Building2 className="h-5 w-5 shrink-0 text-primary-100" aria-hidden />
                  <h1 className="font-heading text-xl font-bold uppercase tracking-wide sm:text-2xl">
                    {detail.name}
                  </h1>
                  {detail.badge && (
                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide">
                      {detail.badge}
                    </span>
                  )}
                </div>
                <p className="mt-2 flex items-start gap-1.5 text-sm text-primary-100">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  {detail.address ?? detail.location}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {detail.amenities.map((item) => {
                    const Icon = getAmenityIcon(item);
                    return (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium"
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="shrink-0 md:text-right">
                <p className="text-xs text-primary-100">{detail.priceNote ?? "Starting from"}</p>
                <p className="font-heading text-2xl font-bold sm:text-3xl">{formatCurrency(detail.priceFrom)}</p>
                <p className="text-[11px] text-primary-100">1 night × 1 room</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-neutral-50 pb-16 pt-5 sm:pt-8">
        <div className="container-app">
          <Gallery images={gallery} name={detail.name} />

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-7">
            <div className="space-y-6">
              {rooms.length > 0 && (
                <section>
                  <div className="mb-3 flex items-center gap-2">
                    <BedDouble className="h-5 w-5 text-primary-700" aria-hidden />
                    <h2 className="font-heading text-lg font-bold text-neutral-900">Available Rooms</h2>
                  </div>

                  <div className="mb-4 flex flex-wrap items-center gap-2 overflow-x-auto rounded-xl border border-neutral-200 bg-white p-3">
                    <span className="flex shrink-0 items-center gap-1.5 pl-1 text-xs font-semibold text-neutral-600">
                      <Filter className="h-3.5 w-3.5" aria-hidden />
                      Filter:
                    </span>
                    <FilterSelect
                      value={mealFilter}
                      onChange={setMealFilter}
                      placeholder="Meal Option"
                      options={mealOptions.map((opt) => ({ value: opt, label: opt }))}
                    />
                    <FilterSelect
                      value={personsFilter}
                      onChange={setPersonsFilter}
                      placeholder="No of Person"
                      options={personsOptions.map((opt) => ({ value: String(opt), label: `${opt} Person${opt > 1 ? "s" : ""}` }))}
                    />
                    <FilterSelect
                      value={bedFilter}
                      onChange={setBedFilter}
                      placeholder="Bed Type"
                      options={bedOptions.map((opt) => ({ value: opt, label: opt }))}
                    />
                    <div className="relative shrink-0">
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as "low-high" | "high-low")}
                        className="h-9 appearance-none rounded-lg border border-neutral-200 bg-white pl-8 pr-7 text-xs font-medium text-neutral-700 outline-none focus:border-primary-400"
                      >
                        <option value="low-high">Price: Low to High</option>
                        <option value="high-low">Price: High to Low</option>
                      </select>
                      <ArrowUpDown className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" aria-hidden />
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" aria-hidden />
                    </div>
                  </div>

                  {filteredRooms.length > 0 ? (
                    <div className="space-y-3">
                      {filteredRooms.map((room) => (
                        <RoomCard
                          key={room.name}
                          room={room}
                          isSelected={selectedRoom === room.name}
                          onSelect={() => setSelectedRoom(room.name)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-8 text-center">
                      <p className="text-sm font-semibold text-neutral-700">No rooms match your filters</p>
                      <p className="mt-1 text-xs text-neutral-500">Try adjusting or clearing your filters.</p>
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-3 inline-flex h-9 items-center rounded-lg border border-neutral-300 px-4 text-xs font-semibold text-neutral-700 hover:border-primary-400 hover:text-primary-700"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </section>
              )}

              {detail.policies && <PolicyPanel policies={detail.policies} />}
            </div>

            <aside className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:h-fit lg:space-y-4">
              <div className="space-y-4">
                <AboutCard overview={detail.overview} />
                <MapCard detail={detail} />
                <YourSearchCard
                  checkIn={checkIn}
                  checkOut={checkOut}
                  nights={nights}
                  rooms={roomCount}
                  guests={guestCount}
                  selectedRoom={selectedRoom}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Search panel field wrapper                                                 */
/* -------------------------------------------------------------------------- */

function SearchField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium text-neutral-500">
      {label}
      <div className="mt-1 flex h-11 items-center rounded-lg border border-neutral-200 px-3 focus-within:border-primary-400">
        {children}
      </div>
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* Room filter dropdown                                                       */
/* -------------------------------------------------------------------------- */

function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 appearance-none rounded-lg border border-neutral-200 bg-white pl-3 pr-7 text-xs font-medium text-neutral-700 outline-none focus:border-primary-400"
      >
        <option value="all">-- {placeholder} --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" aria-hidden />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Gallery — 1 large + 4 tiles on desktop, swipeable strip on mobile          */
/* -------------------------------------------------------------------------- */

function Gallery({ images, name }: { images: string[]; name: string }) {
  if (images.length === 0) return null;
  const main = images[0];
  if (!main) return null;
  const thumbs = images.slice(1, 5);
  const extraCount = images.length - 5;

  return (
    <>
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto rounded-xl pb-1 sm:hidden">
        {images.map((src, index) => (
          <div key={`${src}-${index}`} className="relative h-56 w-[85%] shrink-0 snap-center overflow-hidden rounded-xl">
            <Image
              src={src}
              alt={`${name} photo ${index + 1}`}
              fill
              priority={index === 0}
              sizes="85vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="hidden h-[390px] grid-cols-4 grid-rows-2 gap-1.5 overflow-hidden rounded-2xl sm:grid">
        <div className="relative col-span-2 row-span-2">
          <Image src={main} alt={`${name} main photo`} fill priority sizes="50vw" className="object-cover" />
        </div>
        {thumbs.map((src, index) => {
          const isLast = index === thumbs.length - 1;
          return (
            <div key={`${src}-${index}`} className="relative">
              <Image src={src} alt={`${name} photo ${index + 2}`} fill sizes="25vw" className="object-cover" />
              {isLast && extraCount > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-lg font-bold text-white">
                  +{extraCount}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Room card                                                                  */
/* -------------------------------------------------------------------------- */

function RoomCard({ room, isSelected, onSelect }: { room: RoomType; isSelected: boolean; onSelect: () => void }) {
  const images = room.images && room.images.length > 0 ? room.images : [];

  return (
    <article
      className={cn(
        "overflow-hidden rounded-xl border bg-white shadow-sm transition-colors",
        isSelected ? "border-primary-400 ring-1 ring-primary-200" : "border-neutral-200",
      )}
    >
      <div className="grid sm:grid-cols-[190px_minmax(0,1fr)_190px]">
        <div className="grid grid-cols-3 gap-1 p-2 sm:grid-cols-1 sm:gap-1.5 sm:border-r sm:border-neutral-100">
          <div className="relative col-span-3 h-32 overflow-hidden rounded-lg bg-primary-50 sm:col-span-1 sm:h-24">
            {images[0] ? (
              <Image src={images[0]} alt={room.name} fill sizes="190px" className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <BedDouble className="h-8 w-8 text-primary-200" aria-hidden />
              </div>
            )}
          </div>
          {images.slice(1, 3).map((src, index) => (
            <div key={`${src}-${index}`} className="relative hidden h-16 overflow-hidden rounded-lg bg-primary-50 sm:block">
              <Image src={src} alt={`${room.name} view ${index + 2}`} fill sizes="95px" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="p-4">
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-neutral-900">{room.name}</h3>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-neutral-600">
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-3.5 w-3.5 text-neutral-400" aria-hidden />
              {room.bedType ?? "Comfortable bed"}
            </span>
            {room.sizeSqft && (
              <span className="flex items-center gap-1.5">
                <Ruler className="h-3.5 w-3.5 text-neutral-400" aria-hidden />
                {room.sizeSqft} Sqft
              </span>
            )}
            {room.maxGuests && (
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-neutral-400" aria-hidden />
                Max {room.maxGuests} sleeps
              </span>
            )}
          </div>

          {room.amenities && room.amenities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {room.amenities.map((item) => {
                const Icon = getAmenityIcon(item);
                return (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-medium text-neutral-600"
                  >
                    <Icon className="h-3 w-3" aria-hidden />
                    {item}
                  </span>
                );
              })}
            </div>
          )}

          <p className="mt-3 text-xs leading-relaxed text-neutral-500">{room.description}</p>
        </div>

        <div className="flex flex-col justify-between border-t border-neutral-100 bg-neutral-50 p-4 sm:border-l sm:border-t-0">
          <div className="text-right">
            <p className="font-heading text-xl font-bold text-primary-700">{formatCurrency(room.priceFrom)}</p>
            <p className="text-[11px] text-neutral-500">(1 night × 1 room)</p>
            {room.originalPriceFrom && (
              <>
                <p className="mt-1 text-xs text-neutral-400 line-through">{formatCurrency(room.originalPriceFrom)}</p>
                {room.discountPercent && (
                  <p className="text-[11px] font-semibold text-danger">({room.discountPercent}% Discount)</p>
                )}
              </>
            )}
            <p className="mt-1 text-xs text-neutral-500">{formatCurrency(room.priceFrom)} / night</p>
          </div>

          <div className="mt-3 space-y-2">
            <button
              type="button"
              onClick={onSelect}
              className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary-700 text-xs font-semibold text-white transition-colors hover:bg-primary-800"
            >
              <BedDouble className="h-3.5 w-3.5" aria-hidden />
              {isSelected ? "Selected" : "Select Room"}
            </button>
            <div className="flex items-center justify-between text-[10px]">
              {room.roomsLeft ? (
                <span className="flex items-center gap-1 font-medium text-success">
                  <Check className="h-3 w-3" aria-hidden />
                  {room.roomsLeft} room(s) left
                </span>
              ) : (
                <span />
              )}
              <span className={cn("flex items-center gap-1 font-medium", room.refundable ? "text-success" : "text-danger")}>
                <Ban className="h-3 w-3" aria-hidden />
                {room.refundable ? "Free cancellation" : "Non-refundable"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Sidebar cards                                                              */
/* -------------------------------------------------------------------------- */

function AboutCard({ overview }: { overview: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = overview.length > 220;

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="flex items-center gap-2 text-sm font-bold text-neutral-900">
        <Info className="h-4 w-4 text-primary-700" aria-hidden />
        About
      </p>
      <p className={cn("mt-3 text-xs leading-relaxed text-neutral-600", !expanded && isLong && "line-clamp-4")}>
        {overview}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-800"
        >
          {expanded ? "Read less" : "Read more"}
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} aria-hidden />
        </button>
      )}
    </div>
  );
}

const DEFAULT_COORDINATES = { lat: 21.4272, lng: 92.0058 }; // Cox's Bazar

function MapCard({ detail }: { detail: HotelDetail }) {
  const { lat, lng } = detail.coordinates ?? DEFAULT_COORDINATES;
  const delta = 0.012;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="relative h-[170px] w-full bg-neutral-100">
        <iframe
          title={`${detail.name} location map`}
          src={src}
          loading="lazy"
          className="h-full w-full border-0"
        />
      </div>
      <div className="flex items-start gap-2 border-t border-neutral-100 p-4">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" aria-hidden />
        <p className="text-xs leading-relaxed text-neutral-600">{detail.address ?? detail.location}</p>
      </div>
    </div>
  );
}

function YourSearchCard({
  checkIn,
  checkOut,
  nights,
  rooms,
  guests,
  selectedRoom,
}: {
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: number;
  guests: number;
  selectedRoom: string | null;
}) {
  const rows: { label: string; value: string }[] = [
    { label: "Check-In", value: formatDisplayDate(checkIn) },
    { label: "Check-Out", value: formatDisplayDate(checkOut) },
    { label: "Nights", value: `${nights} night(s)` },
    { label: "Rooms", value: String(rooms) },
    { label: "Guests", value: `${guests} adult(s)` },
  ];

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-neutral-900">Your Search</p>
      <div className="mt-3 divide-y divide-neutral-100 text-xs">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-2 text-neutral-600">
            <span>{row.label}</span>
            <span className="font-semibold text-neutral-900">{row.value}</span>
          </div>
        ))}
        <div className="flex items-center justify-between py-2 text-neutral-600">
          <span>Selected</span>
          <span className="font-semibold uppercase text-primary-700">{selectedRoom ?? "—"}</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Policies                                                                   */
/* -------------------------------------------------------------------------- */

function PolicyPanel({ policies }: { policies: NonNullable<HotelDetail["policies"]> }) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="font-heading text-lg font-bold text-neutral-900">Policies</h2>

      <div className="mt-4">
        <p className="flex items-center gap-2 text-xs font-semibold text-danger">
          <Ban className="h-4 w-4" aria-hidden />
          Cancellation Policy
        </p>
        <p className="mt-2 text-xs leading-6 text-neutral-600">{policies.cancellation}</p>
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-lg bg-neutral-50 p-4 text-xs text-neutral-700 sm:flex-row sm:items-center sm:gap-6">
        <span className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-primary-700" aria-hidden />
          <span>
            Check-in from: <strong>{policies.checkInTime}</strong>
          </span>
        </span>
        <span className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-primary-700" aria-hidden />
          <span>
            Check-out until: <strong>{policies.checkOutTime}</strong>
          </span>
        </span>
      </div>

      <div className="mt-5 border-t border-neutral-100 pt-4">
        <p className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
          <Building2 className="h-4 w-4 text-primary-700" aria-hidden />
          Hotel Rules
        </p>
        <ol className="mt-2 space-y-2">
          {policies.rules.map((rule, index) => (
            <li key={rule} className="flex gap-2 text-xs leading-5 text-neutral-600">
              <span className="shrink-0 font-semibold text-neutral-400">{index + 1}.</span>
              {rule}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}