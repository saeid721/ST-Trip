"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BedDouble, Check, ChevronDown, Clock3, Coffee, MapPin, MessageCircle, Phone, ShieldCheck, Star, Users, Wifi } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn, formatCurrency } from "@/lib/utils";
import type { HotelDetail } from "@/features/hotels/types";

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

export function HotelDetailView({ detail, backHref, backLabel, searchContext }: HotelDetailViewProps) {
  const gallery = detail.gallery && detail.gallery.length > 0 ? detail.gallery : [detail.heroImage];
  const heroGallery = [detail.heroImage, ...gallery.filter((src) => src !== detail.heroImage)].slice(0, 5);
  const primaryImage = heroGallery[0] ?? detail.heroImage;
  const galleryTiles = [...heroGallery, heroGallery[1] ?? primaryImage].slice(0, 5);

  return (
    <>
      <section className="bg-primary-800 text-white">
        <div className="container-app py-7 sm:py-9">
          <Link href={backHref} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-100 transition-colors hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            {backLabel}
          </Link>
          <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-1 text-accent-300" aria-label={`${detail.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-3.5 w-3.5 fill-current" aria-hidden />)}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-2xl font-bold sm:text-3xl">{detail.name}</h1>
                {detail.badge && <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide">{detail.badge}</span>}
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-primary-100"><MapPin className="h-4 w-4" aria-hidden />{detail.location}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-primary-100"><Star className="h-4 w-4 fill-accent-300 text-accent-300" aria-hidden /><span className="font-semibold text-white">{detail.rating.toFixed(1)}</span><span>Excellent · {detail.reviewCount} reviews</span></div>
            </div>
            <div className="md:text-right">
              <p className="text-xs text-primary-100">{detail.priceNote ?? "Starts from"}</p>
              <p className="font-heading text-2xl font-bold sm:text-3xl">{formatCurrency(detail.priceFrom)}</p>
              <p className="text-[11px] text-primary-100">per night, before taxes</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-28 pt-5 sm:pb-16 sm:pt-8">
        <div className="container-app">
          <div className="grid h-[260px] grid-cols-2 gap-1.5 overflow-hidden rounded-xl sm:h-[390px] sm:grid-cols-4">
            <div className="relative col-span-2 row-span-2"><Image src={primaryImage} alt={`${detail.name} exterior`} fill priority sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" /></div>
            {galleryTiles.slice(1).map((src, index) => <div key={`${src}-${index}`} className="relative hidden sm:block"><Image src={src} alt={`${detail.name} photo ${index + 2}`} fill sizes="25vw" className="object-cover" /></div>)}
            {heroGallery.length > 1 && <div className="absolute" aria-hidden />}
          </div>

          <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
            <div className="space-y-6">
              {searchContext && <SearchSummary searchContext={searchContext} />}
              <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="font-heading text-lg font-bold text-neutral-900">About this hotel</h2>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{detail.overview}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {detail.amenities.slice(0, 4).map((item, index) => <div key={item} className="flex items-center gap-2 rounded-lg bg-neutral-50 px-3 py-2.5 text-xs font-medium text-neutral-700"><AmenityIcon index={index} />{item}</div>)}
                </div>
              </section>

              {detail.roomTypes && detail.roomTypes.length > 0 && <section>
                <div className="mb-3 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary-700">Available rooms</p><h2 className="mt-1 font-heading text-xl font-bold text-neutral-900">Choose your room</h2></div><span className="text-xs text-neutral-500">{detail.roomTypes.length} room types</span></div>
                <div className="space-y-3">{detail.roomTypes.map((room) => <RoomCard key={room.name} room={room} />)}</div>
              </section>}

              {detail.policies && <PolicyPanel policies={detail.policies} />}
              {detail.faqs && detail.faqs.length > 0 && <section><h2 className="font-heading text-lg font-bold text-neutral-900">Frequently asked questions</h2><FaqAccordion faqs={detail.faqs} /></section>}
            </div>

            <aside className="hidden lg:block"><div className="sticky top-[calc(var(--header-height)+1.5rem)] space-y-4">
              {searchContext && <SearchSummary searchContext={searchContext} compact />}
              <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"><p className="text-xs text-neutral-500">{detail.priceNote ?? "Starts from"}</p><p className="font-heading text-3xl font-bold text-primary-700">{formatCurrency(detail.priceFrom)}</p><p className="text-xs text-neutral-500">per night, before taxes</p><a href={`tel:${siteConfig.contact.supportPhone}`} className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary-700 text-sm font-semibold text-white transition-colors hover:bg-primary-800"><Phone className="h-4 w-4" aria-hidden />Call to Book</a><a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="mt-2.5 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary-300 hover:text-primary-700"><MessageCircle className="h-4 w-4" aria-hidden />WhatsApp Inquiry</a></div>
              <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm shadow-sm"><p className="font-semibold text-neutral-900">Why book with us?</p><div className="mt-3 space-y-3 text-xs text-neutral-600"><p className="flex gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-success" />Trusted local support</p><p className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-success" />Easy phone booking</p><p className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-success" />Best available rates</p></div></div>
            </div></aside>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur-sm [padding-bottom:calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[10px] uppercase tracking-wide text-neutral-400">
              {detail.priceNote ?? "Starts from"}
            </p>
            <p className="font-heading text-lg font-bold text-primary-700">
              {formatCurrency(detail.priceFrom)}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" aria-label="WhatsApp Inquiry" className="flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition-colors hover:border-primary-300 hover:text-primary-700">
              <MessageCircle className="h-5 w-5" aria-hidden />
            </a>
            <a href={`tel:${siteConfig.contact.supportPhone}`} className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
              <Phone className="h-4 w-4" aria-hidden />
              Call
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function FaqAccordion({ faqs }: { faqs: NonNullable<HotelDetail["faqs"]> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="mt-3 space-y-2">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question} className="overflow-hidden rounded-xl border border-neutral-200">
            <button type="button" onClick={() => setOpenIndex(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left">
              <span className="text-sm font-semibold text-neutral-900">{faq.question}</span>
              <ChevronDown className={cn("h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200", isOpen && "rotate-180")} aria-hidden />
            </button>
            {isOpen && <p className="px-4 pb-3.5 text-sm leading-relaxed text-neutral-600">{faq.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}

function SearchSummary({ searchContext, compact = false }: { searchContext: NonNullable<HotelDetailViewProps["searchContext"]>; compact?: boolean }) {
  return <div className={cn("rounded-xl border border-neutral-200 bg-white p-4 shadow-sm", compact && "p-5")}><p className="text-xs font-semibold text-neutral-900">Your search</p><div className="mt-3 grid grid-cols-2 gap-3 text-xs text-neutral-600"><p><span className="block text-[10px] uppercase text-neutral-400">Check-in</span>{searchContext.checkIn}</p><p><span className="block text-[10px] uppercase text-neutral-400">Check-out</span>{searchContext.checkOut}</p><p><span className="block text-[10px] uppercase text-neutral-400">Rooms</span>{searchContext.rooms}</p><p><span className="block text-[10px] uppercase text-neutral-400">Guests</span>{searchContext.guests}</p></div></div>;
}

function AmenityIcon({ index }: { index: number }) {
  const icons = [Wifi, Coffee, BedDouble, ShieldCheck] as const;
  const Icon = icons[index % icons.length] ?? Wifi;
  return <Icon className="h-4 w-4 shrink-0 text-primary-700" aria-hidden />;
}

function RoomCard({ room }: { room: NonNullable<HotelDetail["roomTypes"]>[number] }) {
  return <article className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"><div className="grid sm:grid-cols-[150px_minmax(0,1fr)_155px]">
    <div className="relative hidden min-h-[150px] bg-primary-50 sm:block">{room.images?.[0] ? <Image src={room.images[0]} alt={room.name} fill sizes="150px" className="object-cover" /> : <div className="flex h-full items-center justify-center"><BedDouble className="h-8 w-8 text-primary-200" aria-hidden /></div>}</div>
    <div className="p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-heading text-sm font-bold text-neutral-900">{room.name}</h3><p className="mt-1 text-xs text-neutral-500">{room.description}</p></div>{room.roomsLeft && <span className="shrink-0 rounded-full bg-danger/10 px-2 py-1 text-[10px] font-semibold text-danger">{room.roomsLeft} left</span>}</div><div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-[11px] text-neutral-600"><span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" />{room.bedType ?? "Comfortable bed"}</span>{room.maxGuests && <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{room.maxGuests} guests</span>}{room.sizeSqft && <span>{room.sizeSqft} sq ft</span>}</div>{room.amenities && <div className="mt-3 flex flex-wrap gap-1.5">{room.amenities.slice(0, 5).map((item) => <span key={item} className="rounded bg-neutral-100 px-1.5 py-1 text-[10px] text-neutral-600">{item}</span>)}</div>}</div>
    <div className="border-t border-neutral-200 bg-neutral-50 p-4 sm:border-l sm:border-t-0"><p className="text-[10px] uppercase tracking-wide text-neutral-500">From</p>{room.originalPriceFrom && <p className="text-xs text-neutral-400 line-through">{formatCurrency(room.originalPriceFrom)}</p>}<p className="font-heading text-xl font-bold text-primary-700">{formatCurrency(room.priceFrom)}</p>{room.mealOption && <p className="mt-1 text-[11px] font-medium text-success">{room.mealOption}</p>}<a href={`tel:${siteConfig.contact.supportPhone}`} className="mt-3 flex h-9 items-center justify-center rounded-lg bg-primary-700 text-xs font-semibold text-white hover:bg-primary-800">Select room</a><p className="mt-2 text-center text-[10px] text-neutral-500">{room.refundable ? "Free cancellation" : "Non-refundable"}</p></div>
  </div></article>;
}

function PolicyPanel({ policies }: { policies: NonNullable<HotelDetail["policies"]> }) {
  return <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"><h2 className="font-heading text-lg font-bold text-neutral-900">Policies</h2><div className="mt-4 grid gap-4 sm:grid-cols-2"><div><p className="flex items-center gap-2 text-xs font-semibold text-neutral-800"><Clock3 className="h-4 w-4 text-primary-700" />Check-in / Check-out</p><p className="mt-2 text-xs text-neutral-600">Check-in: {policies.checkInTime}</p><p className="mt-1 text-xs text-neutral-600">Check-out: {policies.checkOutTime}</p></div><div><p className="flex items-center gap-2 text-xs font-semibold text-neutral-800"><ShieldCheck className="h-4 w-4 text-primary-700" />Cancellation policy</p><p className="mt-2 text-xs leading-6 text-neutral-600">{policies.cancellation}</p></div></div><div className="mt-5 border-t border-neutral-100 pt-4"><p className="text-xs font-semibold text-neutral-800">Hotel rules</p><ul className="mt-2 space-y-2">{policies.rules.map((rule) => <li key={rule} className="flex gap-2 text-xs leading-5 text-neutral-600"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />{rule}</li>)}</ul></div></section>;
}