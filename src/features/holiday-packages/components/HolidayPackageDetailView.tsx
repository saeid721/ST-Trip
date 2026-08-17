"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, ChevronDown, MapPin, MessageCircle, Phone, X as XIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn, formatCurrency } from "@/lib/utils";
import type { HolidayPackageDetail } from "@/features/holiday-packages/types";

interface HolidayPackageDetailViewProps {
  detail: HolidayPackageDetail;
  backHref: string;
  backLabel: string;
}

export function HolidayPackageDetailView({ detail, backHref, backLabel }: HolidayPackageDetailViewProps) {
  const gallery = detail.gallery && detail.gallery.length > 0 ? detail.gallery : [detail.heroImage];

  return (
    <>
      <section className="relative">
        <div className="relative h-[240px] w-full overflow-hidden sm:h-[340px] md:h-[440px]">
          <Image src={detail.heroImage} alt={detail.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/85 via-neutral-900/30 to-neutral-900/60" />
        </div>

        <div className="container-app relative -mt-16 sm:-mt-28 md:-mt-32">
          <div className="rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
            <Link href={backHref} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              {backLabel}
            </Link>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
              <div>
                {detail.badge && (
                  <span className="mb-2 inline-block rounded-full bg-accent-500 px-2.5 py-1 text-xs font-bold text-white">
                    {detail.badge}
                  </span>
                )}
                <h1 className="font-heading text-xl font-bold text-neutral-900 sm:text-2xl md:text-3xl">
                  {detail.title}
                </h1>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-neutral-500">
                  <MapPin className="h-4 w-4" aria-hidden />
                  {detail.city}
                  {detail.country ? `, ${detail.country}` : ""}
                </p>
                {detail.subtitle && <p className="mt-1 text-sm text-neutral-500">{detail.subtitle}</p>}
              </div>

              <div className="sm:text-right">
                <p className="text-[11px] uppercase tracking-wide text-neutral-400">
                  {detail.priceNote ?? "Starts from"}
                </p>
                <p className="font-heading text-xl font-bold text-primary-700 sm:text-2xl md:text-3xl">
                  {formatCurrency(detail.priceFrom)}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 border-t border-neutral-100 pt-4 sm:mt-5 sm:gap-4 sm:pt-5">
              {detail.durationDays > 0 && (
                <span className="inline-flex items-center gap-1.5 text-xs text-neutral-600 sm:text-sm">
                  <CalendarDays className="h-4 w-4 text-primary-600" aria-hidden />
                  {detail.durationDays} Days
                </span>
              )}
              {detail.nightsLabel && (
                <span className="inline-flex items-center gap-1.5 text-xs text-neutral-600 sm:text-sm">
                  <MapPin className="h-4 w-4 text-primary-600" aria-hidden />
                  {detail.nightsLabel}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-28 pt-10 sm:pb-16 sm:pt-12 md:pt-16 lg:pb-16">
        <div className="container-app grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-10">
          <div className="space-y-8 sm:space-y-10">
            {gallery.length > 1 && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {gallery.slice(0, 3).map((src, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={src} alt={`${detail.title} photo ${i + 1}`} fill sizes="(max-width: 640px) 33vw, 220px" className="object-cover" />
                  </div>
                ))}
              </div>
            )}

            <div>
              <h2 className="font-heading text-lg font-bold text-neutral-900 sm:text-xl">Overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{detail.overview}</p>
            </div>

            {detail.highlights.length > 0 && (
              <div>
                <h2 className="font-heading text-lg font-bold text-neutral-900 sm:text-xl">Highlights</h2>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {detail.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="rounded-xl border border-neutral-200 p-4 sm:p-5">
                <h3 className="font-heading text-base font-semibold text-neutral-900">Package Includes</h3>
                <ul className="mt-3 space-y-2">
                  {detail.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-neutral-200 p-4 sm:p-5">
                <h3 className="font-heading text-base font-semibold text-neutral-900">Not Included</h3>
                <ul className="mt-3 space-y-2">
                  {detail.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                      <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {detail.itinerary && detail.itinerary.length > 0 && (
              <div>
                <h2 className="font-heading text-lg font-bold text-neutral-900 sm:text-xl">Day-by-Day Itinerary</h2>
                <ItineraryAccordion days={detail.itinerary} />
              </div>
            )}

            {detail.faqs && detail.faqs.length > 0 && (
              <div>
                <h2 className="font-heading text-lg font-bold text-neutral-900 sm:text-xl">Frequently Asked Questions</h2>
                <FaqAccordion faqs={detail.faqs} />
              </div>
            )}
          </div>

          <aside className="hidden lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:block lg:h-fit">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-[11px] uppercase tracking-wide text-neutral-400">
                {detail.priceNote ?? "Starts from"}
              </p>
              <p className="font-heading text-3xl font-bold text-primary-700">
                {formatCurrency(detail.priceFrom)}
              </p>
              <p className="mt-1 text-xs text-neutral-500">Per person, subject to availability</p>

              <a href={`tel:${siteConfig.contact.supportPhone}`} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-600 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
                <Phone className="h-4 w-4" aria-hidden />
                Call to Book
              </a>
              <a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary-300 hover:text-primary-700">
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp Inquiry
              </a>

              <div className="mt-5 space-y-2 border-t border-neutral-100 pt-5 text-xs text-neutral-500">
                <p>✓ Free consultation before booking</p>
                <p>✓ 100% guaranteed transparent pricing</p>
                <p>✓ Dedicated support throughout your trip</p>
              </div>
            </div>
          </aside>
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

function ItineraryAccordion({ days }: { days: NonNullable<HolidayPackageDetail["itinerary"]> }) {
  const [openDay, setOpenDay] = useState<number | null>(days[0]?.day ?? null);
  return (
    <div className="mt-3 space-y-2">
      {days.map((day) => {
        const isOpen = openDay === day.day;
        return (
          <div key={day.day} className="overflow-hidden rounded-xl border border-neutral-200">
            <button type="button" onClick={() => setOpenDay(isOpen ? null : day.day)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-3 bg-neutral-50 px-4 py-3.5 text-left">
              <span className="text-sm font-semibold text-neutral-900">Day {day.day}: {day.title}</span>
              <ChevronDown className={cn("h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200", isOpen && "rotate-180")} aria-hidden />
            </button>
            {isOpen && <p className="px-4 py-3.5 text-sm leading-relaxed text-neutral-600">{day.description}</p>}
          </div>
        );
      })}
    </div>
  );
}

function FaqAccordion({ faqs }: { faqs: NonNullable<HolidayPackageDetail["faqs"]> }) {
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