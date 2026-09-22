"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAmenityIcon } from "@/features/hotels/amenity-icons";
import {
  ArrowLeft,
  Ban,
  BedDouble,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  Info,
  Maximize2,
  MapPin,
  Ruler,
  Star,
  Users,
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
  const rooms = useMemo(() => detail.roomTypes ?? [], [detail.roomTypes]);
  const starCount = Math.min(5, Math.max(1, Math.round(detail.rating)));

  // --- Search summary (read-only, shown in the "Your Search" sidebar card) ---
  const checkIn = searchContext?.checkIn ?? new Date().toISOString().slice(0, 10);
  const checkOut = searchContext?.checkOut ?? new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
  const roomCount = searchContext?.rooms ?? 1;
  const guestCount = searchContext?.guests ?? 2;
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
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[260px] w-full overflow-hidden sm:h-[340px] md:h-[420px]">
          <Image
            src={detail.heroImage}
            alt={detail.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/85 via-neutral-900/30 to-neutral-900/60" />
        </div>

        <div className="container-app container-search relative z-30 -mt-16 md:-mt-24">
          <div className="rounded-md bg-white p-3.5 shadow-lg sm:p-6 md:p-8">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary-700 transition-colors hover:text-primary-800 sm:gap-1.5 sm:text-xs"
            >
              <ArrowLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
              {backLabel}
            </Link>

            <div className="mt-2 flex flex-col gap-2 sm:mt-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
              <div>
                <div className="flex items-center gap-0.5 text-warning sm:gap-1" aria-label={`${starCount} out of 5 stars`}>
                  {Array.from({ length: starCount }).map((_, index) => (
                    <Star key={index} className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5" aria-hidden />
                  ))}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:mt-1.5 sm:gap-2">
                  <h1 className="font-heading text-[17px] font-bold uppercase tracking-wide text-neutral-900 sm:text-2xl md:text-3xl">
                    {detail.name}
                  </h1>
                  {detail.badge && (
                    <span className="rounded-full bg-accent-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white sm:px-2.5 sm:py-1 sm:text-xs">
                      {detail.badge}
                    </span>
                  )}
                </div>
                <p className="mt-1 flex items-start gap-1 text-[11px] text-neutral-500 sm:mt-1.5 sm:gap-1.5 sm:text-sm">
                  <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-primary-600 sm:h-4 sm:w-4" aria-hidden />
                  {detail.address ?? detail.location}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-[9px] uppercase tracking-wide text-neutral-400 sm:text-[11px]">
                  {detail.priceNote ?? "Starting from"}
                </p>
                <p className="font-heading text-lg font-bold text-primary-700 sm:text-2xl md:text-3xl">
                  {formatCurrency(detail.priceFrom)}
                </p>
                <p className="text-[10px] text-neutral-400 sm:text-[11px]">1 night × 1 room</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-neutral-100 pt-3 sm:mt-5 sm:gap-2 sm:pt-5">
              {detail.amenities.map((item) => {
                const Icon = getAmenityIcon(item);
                return (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-medium text-neutral-600 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                  >
                    <Icon className="h-3 w-3 text-primary-600 sm:h-3.5 sm:w-3.5" aria-hidden />
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 pb-16 pt-8 sm:pt-10">
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

                  <div className="mb-4 flex flex-col gap-2.5 rounded-md border border-neutral-200 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.05)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 sm:overflow-x-auto sm:rounded-md sm:p-3 sm:shadow-none">
                    <span className="mb-0.5 flex w-full items-center gap-1.5 text-[13px] font-medium text-neutral-400 sm:mb-0 sm:w-auto sm:shrink-0 sm:pl-1 sm:text-xs sm:text-neutral-600">
                      <Filter className="h-4 w-4 sm:h-3.5 sm:w-3.5" aria-hidden />
                      Filter :
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
                    <div className="relative w-full sm:w-auto sm:shrink-0">
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as "low-high" | "high-low")}
                        style={{ WebkitAppearance: "none", MozAppearance: "none" }}
                        className="h-[52px] w-full appearance-none rounded-md border border-neutral-200 bg-white bg-none pl-4 pr-10 text-[15px] font-normal text-neutral-700 outline-none focus:border-primary-400 focus:ring-0 sm:h-9 sm:rounded-sm sm:pl-3 sm:pr-7 sm:text-xs sm:font-medium"
                      >
                        <option value="low-high">Price: Low to High</option>
                        <option value="high-low">Price: High to Low</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 sm:right-2 sm:h-3.5 sm:w-3.5" aria-hidden />
                    </div>
                  </div>

                  {filteredRooms.length > 0 ? (
                    <div className="space-y-2">
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
                    <div className="rounded-md border border-dashed border-neutral-300 bg-white p-8 text-center">
                      <p className="text-sm font-semibold text-neutral-700">No rooms match your filters</p>
                      <p className="mt-1 text-xs text-neutral-500">Try adjusting or clearing your filters.</p>
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-3 inline-flex h-9 items-center rounded-sm border border-neutral-300 px-4 text-xs font-semibold text-neutral-700 hover:border-primary-400 hover:text-primary-700"
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
    <div className="relative w-full sm:w-auto sm:shrink-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ WebkitAppearance: "none", MozAppearance: "none" }}
        className="h-[52px] w-full appearance-none rounded-md border border-neutral-200 bg-white bg-none pl-4 pr-10 text-[15px] font-normal text-neutral-700 outline-none focus:border-primary-400 focus:ring-0 sm:h-9 sm:rounded-sm sm:pl-3 sm:pr-7 sm:text-xs sm:font-medium"
      >
        <option value="all">-- {placeholder} --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 sm:right-2 sm:h-3.5 sm:w-3.5" aria-hidden />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Gallery — 1 large + 4 tiles on desktop, swipeable strip on mobile          */
/* -------------------------------------------------------------------------- */

function Gallery({ images, name }: { images: string[]; name: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;
  const main = images[0];
  if (!main) return null;
  const thumbs = images.slice(1, 5);
  const extraCount = images.length - 5;

  return (
    <>
      <div className="overflow-hidden rounded-md md:hidden">
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="relative h-56 w-full cursor-pointer overflow-hidden"
        >
          <Image src={main} alt={`${name} main photo`} fill priority sizes="100vw" className="object-cover" />
        </button>
        <div className="grid grid-cols-4 gap-1 pt-1">
          {thumbs.map((src, index) => {
            const isLast = index === thumbs.length - 1;
            return (
              <button
                type="button"
                key={`${src}-${index}`}
                onClick={() => setLightboxIndex(index + 1)}
                className="relative h-16 cursor-pointer overflow-hidden"
              >
                <Image src={src} alt={`${name} photo ${index + 2}`} fill sizes="25vw" className="object-cover" />
                {isLast && extraCount > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-bold text-white">
                    +{extraCount}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="hidden h-[390px] grid-cols-4 grid-rows-2 gap-1.5 overflow-hidden rounded-md md:grid">
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="group relative col-span-2 row-span-2 cursor-pointer overflow-hidden"
        >
          <Image
            src={main}
            alt={`${name} main photo`}
            fill
            priority
            sizes="50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
            <Maximize2
              className="h-6 w-6 scale-75 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
              aria-hidden
            />
          </div>
        </button>
        {thumbs.map((src, index) => {
          const isLast = index === thumbs.length - 1;
          return (
            <button
              type="button"
              key={`${src}-${index}`}
              onClick={() => setLightboxIndex(index + 1)}
              className="group relative cursor-pointer overflow-hidden"
            >
              <Image
                src={src}
                alt={`${name} photo ${index + 2}`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                <Maximize2
                  className="h-5 w-5 scale-75 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                  aria-hidden
                />
              </div>
              {isLast && extraCount > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-lg font-bold text-white">
                  +{extraCount}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={images}
          name={name}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </>
  );
}

function GalleryLightbox({
  images,
  name,
  index,
  onClose,
  onIndexChange,
}: {
  images: string[];
  name: string;
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const total = images.length;
  const goPrev = () => onIndexChange((index - 1 + total) % total);
  const goNext = () => onIndexChange((index + 1) % total);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label={`${name} photo gallery`}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
        <p className="text-sm font-medium text-white/80">
          Photo {index + 1} of {total}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close gallery"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-2 sm:px-16">
        {total > 1 && (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-4 sm:p-3"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
          </button>
        )}

        <div className="relative h-full max-h-[75vh] w-full max-w-5xl">
          <Image
            src={images[index] ?? images[0] ?? ""}
            alt={`${name} photo ${index + 1}`}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        {total > 1 && (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-4 sm:p-3"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
          </button>
        )}
      </div>

      {total > 1 && (
        <div className="flex gap-1.5 overflow-x-auto px-4 pb-4 pt-2 sm:justify-center sm:px-6">
          {images.map((src, i) => (
            <button
              type="button"
              key={`${src}-${i}`}
              onClick={() => onIndexChange(i)}
              className={cn(
                "relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                i === index ? "border-white" : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <Image src={src} alt={`${name} thumbnail ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Room card                                                                  */
/* -------------------------------------------------------------------------- */

function RoomCard({ room, isSelected, onSelect }: { room: RoomType; isSelected: boolean; onSelect: () => void }) {
  const images = room.images && room.images.length > 0 ? room.images : [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <article
      className={cn(
        "overflow-hidden rounded-md border bg-white shadow-sm transition-colors max-md:shadow-md md:rounded-md",
        isSelected ? "border-primary-400 ring-1 ring-primary-200" : "border-neutral-200",
      )}
    >
      <div className="flex flex-col md:grid md:grid-cols-[190px_minmax(0,1fr)_190px]">
        <div className="flex flex-col gap-1 md:h-full md:pr-1.5 md:border-r md:border-neutral-100">
          <button
            type="button"
            onClick={() => images[0] && setLightboxIndex(0)}
            disabled={!images[0]}
            className="group relative h-56 w-full cursor-pointer overflow-hidden rounded-t-2xl bg-primary-50 md:h-auto md:min-h-[110px] md:flex-1 md:rounded-t-none md:rounded-tl-xl"
          >
            {images[0] ? (
              <>
                <Image
                  src={images[0]}
                  alt={room.name}
                  fill
                  sizes="190px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                  <Maximize2
                    className="h-5 w-5 scale-75 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                    aria-hidden
                  />
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <BedDouble className="h-8 w-8 text-primary-200" aria-hidden />
              </div>
            )}
          </button>
          {images.length > 1 && (
            <div className="grid shrink-0 grid-cols-3 gap-1">
              {images.slice(1, 4).map((src, index) => {
                const extraCount = images.length - 4; // images beyond the 4 shown (1 hero + 3 thumbs)
                const isLastThumb = index === 2;
                return (
                  <button
                    type="button"
                    key={`${src}-${index}`}
                    onClick={() => setLightboxIndex(index + 1)}
                    className={cn(
                      "group relative h-20 md:h-14 cursor-pointer overflow-hidden bg-primary-50 rounded-none",
                      index === 0 && "md:rounded-bl-[10px]",
                    )}
                  >
                    <Image
                      src={src}
                      alt={`${room.name} view ${index + 2}`}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                    {isLastThumb && extraCount > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <span className="text-sm font-bold text-white">+{extraCount}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {lightboxIndex !== null && (
            <GalleryLightbox
              images={images}
              name={room.name}
              index={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
              onIndexChange={setLightboxIndex}
            />
          )}
        </div>

        <div className="p-2 md:p-2">
          <h3 className="font-heading text-base md:text-sm font-bold uppercase tracking-wide text-neutral-900">{room.name}</h3>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-neutral-600">
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-3.5 w-3.5 text-neutral-400 max-md:text-primary-600" aria-hidden />
              {room.bedType ?? "Comfortable bed"}
            </span>
            {room.sizeSqft && (
              <span className="flex items-center gap-1.5">
                <Ruler className="h-3.5 w-3.5 text-neutral-400 max-md:text-primary-600" aria-hidden />
                {room.sizeSqft} Sqft
              </span>
            )}
            {room.maxGuests && (
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-neutral-400 max-md:text-primary-600" aria-hidden />
                Max {room.maxGuests} sleeps
              </span>
            )}
          </div>

          {room.amenities && room.amenities.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {room.amenities.map((item) => {
                const Icon = getAmenityIcon(item);
                return (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 text-[8px] font-medium text-neutral-600 max-md:rounded-sm max-md:border max-md:border-primary-100 max-md:bg-primary-50 max-md:px-2 max-md:py-1 max-md:text-[8px] max-md:font-semibold max-md:text-primary-700"
                  >
                    <Icon className="h-3 w-3" aria-hidden />
                    {item}
                  </span>
                );
              })}
            </div>
          )}

          <p className="mt-2 text-xs leading-snug text-neutral-500 max-md:italic">{room.description}</p>

          <div className="mt-1 flex flex-wrap items-center gap-1 text-[8px]">
            {room.roomsLeft ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-1.5 py-1 font-medium text-success">
                <Check className="h-3 w-3" aria-hidden />
                {room.roomsLeft} room(s) left
              </span>
            ) : null}
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-1.5 py-1 font-medium",
                room.refundable ? "bg-success/10 text-success" : "bg-danger/10 text-danger",
              )}
            >
              <Ban className="h-3 w-3" aria-hidden />
              {room.refundable ? "Free cancellation" : "Non-refundable"}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between border-t border-neutral-100 bg-neutral-50 p-3.5 md:border-l md:border-t-0 md:p-3">
          <div className="text-center md:text-right">
            <p className="font-heading text-2xl md:text-xl font-bold text-primary-700">{formatCurrency(room.priceFrom)}</p>
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

          <div className="mt-2 md:mt-2 space-y-2">
            <button
              type="button"
              onClick={onSelect}
              className="flex h-9 w-full items-center justify-center gap-2 rounded-sm bg-primary-700 text-xs font-semibold text-white transition-colors hover:bg-primary-800 max-md:h-11 max-md:rounded-full max-md:text-sm max-md:font-bold max-md:shadow-md"
            >
              <BedDouble className="h-3.5 w-3.5" aria-hidden />
              {isSelected ? "Selected" : "Select Room"}
            </button>
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
    <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
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
    <div className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm">
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
    <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
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
    <section className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="font-heading text-lg font-bold text-neutral-900">Policies</h2>

      <div className="mt-4">
        <p className="flex items-center gap-2 text-xs font-semibold text-danger">
          <Ban className="h-4 w-4" aria-hidden />
          Cancellation Policy
        </p>
        <p className="mt-2 text-xs leading-6 text-neutral-600">{policies.cancellation}</p>
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-sm bg-neutral-50 p-4 text-xs text-neutral-700 sm:flex-row sm:items-center sm:gap-6">
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