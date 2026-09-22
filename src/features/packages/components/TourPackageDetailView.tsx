"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  FileCheck2,
  Globe2,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  ZoomIn,
  AlertCircle,
  Compass,
  FileText,
  Layers,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn, formatCurrency } from "@/lib/utils";
import type { PackageDetail } from "@/features/packages/types";

interface TourPackageDetailViewProps {
  detail: PackageDetail;
  backHref: string;
  backLabel: string;
}

const tabItems = [
  { id: "overview", label: "Overview" },
  { id: "description", label: "Description" },
  { id: "location-timing", label: "Location & Timing" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions-exclusions", label: "Inclusions & Exclusions" },
  { id: "additional-info", label: "Additional Info" },
  { id: "travel-tips", label: "Travel Tips" },
  { id: "policy", label: "Policy" },
  { id: "options", label: "Options" },
] as const;

type TabId = (typeof tabItems)[number]["id"];

export function TourPackageDetailView({ detail, backHref, backLabel }: TourPackageDetailViewProps) {
  const gallery = useMemo(
    () => (detail.gallery?.length ? detail.gallery : [detail.heroImage]),
    [detail.gallery, detail.heroImage],
  );
  const [activeTab, setActiveTab] = useState<TabId | null>("overview");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`;
  const supportPhone = `tel:${siteConfig.contact.supportPhone}`;

  const handleTabClick = (id: TabId) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSectionToggle = (id: TabId) => {
    setActiveTab((prev) => (prev === id ? null : id));
  };

  return (
    <main className="bg-white">
      {/* Immersive page hero */}
      <section className="relative">
        <div className="relative h-[230px] overflow-hidden sm:h-[300px] md:h-[370px] lg:h-[410px]">
          <Image
            src={detail.heroImage}
            alt={detail.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/15 to-slate-950/75" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/45 to-transparent" />
        </div>

        <div className="container-app relative -mt-16 sm:-mt-20 md:-mt-24">
          <div className="rounded-sm border border-white/70 bg-white px-4 py-4 shadow-[0_18px_45px_-22px_rgba(15,23,42,0.45)] sm:px-6 sm:py-5 md:px-7">
            <Link
              href={backHref}
              className="inline-flex min-h-9 items-center gap-1.5 text-[11px] font-semibold text-primary-700 transition-colors hover:text-primary-800 sm:text-xs"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              {backLabel}
            </Link>

            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {detail.badge && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent-700">
                      <Sparkles className="h-3 w-3" aria-hidden />
                      {detail.badge}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-700">
                    <Globe2 className="h-3 w-3" aria-hidden />
                    {detail.category.replaceAll("-", " ")}
                  </span>
                </div>

                <h1 className="mt-2 font-heading text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl md:text-3xl">
                  {detail.title}
                </h1>
                {detail.subtitle && <p className="mt-1 text-xs text-neutral-500 sm:text-sm">{detail.subtitle}</p>}

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-neutral-600 sm:text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-primary-600" aria-hidden />
                    {detail.durationDays} Days
                  </span>
                  {detail.nightsLabel && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5 text-primary-600" aria-hidden />
                      {detail.nightsLabel}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-primary-600" aria-hidden />
                    Per person
                  </span>
                </div>
              </div>

              <div className="shrink-0 border-t border-neutral-100 pt-3 md:min-w-[190px] md:border-t-0 md:pt-0 md:text-right">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                  {detail.priceNote ?? "Starts from"}
                </p>
                <p className="mt-0.5 font-heading text-2xl font-bold tracking-tight text-primary-700 sm:text-3xl">
                  {formatCurrency(detail.priceFrom)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-[#f7f9fc] pb-28 pt-6 sm:pb-16 sm:pt-8 md:pt-10 lg:pb-20">
        <div className="container-app">
          <TourGallery images={gallery} title={detail.title} onOpen={setLightboxIndex} />

          {/* Section navigation */}
          <nav
            aria-label="Tour details sections"
            className="sticky top-[var(--header-height-mobile)] z-20 mt-4 overflow-x-auto rounded-sm border border-neutral-200 bg-white shadow-sm md:top-[var(--header-height)]"
          >
            <div className="flex min-w-max">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab.id)}
                  className={cn(
                    "relative min-h-11 px-4 text-[11px] font-semibold transition-colors sm:px-5 sm:text-xs",
                    activeTab === tab.id ? "text-primary-700" : "text-neutral-500 hover:text-neutral-800",
                  )}
                >
                  {tab.label}
                  {activeTab === tab.id && <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-primary-600" />}
                </button>
              ))}
            </div>
          </nav>

          <div className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_310px] xl:gap-7">
            <div ref={panelRef} className="min-w-0 space-y-2 sm:space-y-2.5">

              {/* Overview Section */}
              <section id="overview" className="overflow-hidden rounded-sm border border-neutral-200 bg-white shadow-sm">
                <SectionHeading
                  icon={Info}
                  title="Overview"
                  isOpen={activeTab === "overview"}
                  onClick={() => handleSectionToggle("overview")}
                />
                {activeTab === "overview" && (
                <div className="border-t border-neutral-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                <p className="text-[13px] leading-7 text-neutral-600 sm:text-sm sm:leading-7">{detail.overview}</p>

                {detail.highlights && detail.highlights.length > 0 && (
                  <div className="mt-5 border-t border-neutral-100 pt-5">
                    <h3 className="text-sm font-bold text-neutral-900">Tour Highlights</h3>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {detail.highlights.map((item) => (
                        <div key={item} className="flex items-start gap-2.5 rounded-md bg-neutral-50 px-3 py-2.5 text-xs leading-5 text-neutral-600 sm:text-[13px]">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {detail.packagePrice && (
                  <div className="mt-5 border-t border-neutral-100 pt-5">
                    <h3 className="text-sm font-bold text-neutral-900">Package Price</h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {detail.packagePrice.cabinType1 && (
                        <div className="rounded-md border border-primary-100 bg-primary-50/50 p-4">
                          <p className="text-xs font-semibold text-primary-800">{detail.packagePrice.cabinType1.name}</p>
                          <p className="mt-1 font-heading text-lg font-bold text-primary-700">{formatCurrency(detail.packagePrice.cabinType1.price)}</p>
                          <p className="text-[10px] text-neutral-500">Per Person</p>
                        </div>
                      )}
                      {detail.packagePrice.cabinType2 && (
                        <div className="rounded-md border border-primary-100 bg-primary-50/50 p-4">
                          <p className="text-xs font-semibold text-primary-800">{detail.packagePrice.cabinType2.name}</p>
                          <p className="mt-1 font-heading text-lg font-bold text-primary-700">{formatCurrency(detail.packagePrice.cabinType2.price)}</p>
                          <p className="text-[10px] text-neutral-500">Per Person</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                </div>
                )}
              </section>

              {/* Description Section */}
              {detail.description && (
                <section id="description" className="overflow-hidden rounded-sm border border-neutral-200 bg-white shadow-sm">
                  <SectionHeading
                    icon={FileText}
                    title="Description"
                    isOpen={activeTab === "description"}
                    onClick={() => handleSectionToggle("description")}
                  />
                  {activeTab === "description" && (
                  <div className="border-t border-neutral-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 text-[13px] leading-7 text-neutral-600 sm:text-sm sm:leading-7 whitespace-pre-line">
                    {detail.description}
                  </div>
                  )}
                </section>
              )}

              {/* Location & Timing Section */}
              {detail.location && (
                <section id="location-timing" className="overflow-hidden rounded-sm border border-neutral-200 bg-white shadow-sm">
                  <SectionHeading
                    icon={MapPin}
                    title="Location & Timing"
                    isOpen={activeTab === "location-timing"}
                    onClick={() => handleSectionToggle("location-timing")}
                  />
                  {activeTab === "location-timing" && (
                  <div className="border-t border-neutral-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-md bg-neutral-50 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Pick-up Location</p>
                      <p className="mt-1 text-sm font-medium text-neutral-900">{detail.location.pickup}</p>
                    </div>
                    <div className="rounded-md bg-neutral-50 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Reporting Time</p>
                      <p className="mt-1 text-sm font-medium text-neutral-900">{detail.location.reportingTime}</p>
                    </div>
                    <div className="rounded-md bg-neutral-50 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Departure Time</p>
                      <p className="mt-1 text-sm font-medium text-neutral-900">{detail.location.departureTime}</p>
                    </div>
                    <div className="rounded-md bg-neutral-50 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Duration</p>
                      <p className="mt-1 text-sm font-medium text-neutral-900">{detail.durationDays} Days</p>
                    </div>
                  </div>
                  </div>
                  )}
                </section>
              )}

              {/* Itinerary Section */}
              {detail.itinerary && detail.itinerary.length > 0 && (
                <section id="itinerary" className="overflow-hidden rounded-sm border border-neutral-200 bg-white shadow-sm">
                  <SectionHeading
                    icon={CalendarDays}
                    title="Itinerary"
                    isOpen={activeTab === "itinerary"}
                    onClick={() => handleSectionToggle("itinerary")}
                  />
                  {activeTab === "itinerary" && (
                  <div className="border-t border-neutral-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                  <p className="text-xs text-neutral-500">A day-by-day outline of your tour experience.</p>
                  <ItineraryTimeline days={detail.itinerary} />
                  </div>
                  )}
                </section>
              )}

              {/* Inclusions & Exclusions Section */}
              <section id="inclusions-exclusions" className="overflow-hidden rounded-sm border border-neutral-200 bg-white shadow-sm">
                <SectionHeading
                  icon={Check}
                  title="Inclusions & Exclusions"
                  isOpen={activeTab === "inclusions-exclusions"}
                  onClick={() => handleSectionToggle("inclusions-exclusions")}
                />
                {activeTab === "inclusions-exclusions" && (
                <div className="border-t border-neutral-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-success">
                      <Check className="h-4 w-4" /> Inclusions
                    </h3>
                    <div className="space-y-2.5">
                      {detail.inclusions.map((item) => (
                        <ListItem key={item} text={item} positive />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-danger">
                      <X className="h-4 w-4" /> Exclusions
                    </h3>
                    <div className="space-y-2.5">
                      {detail.exclusions.map((item) => (
                        <ListItem key={item} text={item} positive={false} />
                      ))}
                    </div>
                  </div>
                </div>
                </div>
                )}
              </section>

              {/* Additional Info & Requirements Section */}
              {(detail.additionalInfo?.length || detail.requirements?.length) && (
                <section id="additional-info" className="overflow-hidden rounded-sm border border-neutral-200 bg-white shadow-sm">
                  <SectionHeading
                    icon={AlertCircle}
                    title="Additional Information & Requirements"
                    isOpen={activeTab === "additional-info"}
                    onClick={() => handleSectionToggle("additional-info")}
                  />
                  {activeTab === "additional-info" && (
                  <div className="border-t border-neutral-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                  <div className="space-y-6">
                    {detail.additionalInfo && detail.additionalInfo.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900">Additional Information</h3>
                        <ul className="mt-3 space-y-2">
                          {detail.additionalInfo.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs leading-6 text-neutral-600 sm:text-[13px]">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {detail.requirements && detail.requirements.length > 0 && (
                      <div className="border-t border-neutral-100 pt-5">
                        <h3 className="text-sm font-bold text-neutral-900">Requirements</h3>
                        <ul className="mt-3 space-y-2">
                          {detail.requirements.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs leading-6 text-neutral-600 sm:text-[13px]">
                              <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  </div>
                  )}
                </section>
              )}

              {/* Travel Tips Section */}
              {detail.travelTips && (detail.travelTips.onCruise?.length || detail.travelTips.inJungle?.length || (detail.travelTips.packingList && Object.keys(detail.travelTips.packingList).length > 0)) && (
                <section id="travel-tips" className="overflow-hidden rounded-sm border border-neutral-200 bg-white shadow-sm">
                  <SectionHeading
                    icon={Compass}
                    title="Travel Tips"
                    isOpen={activeTab === "travel-tips"}
                    onClick={() => handleSectionToggle("travel-tips")}
                  />
                  {activeTab === "travel-tips" && (
                  <div className="border-t border-neutral-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                  <div className="space-y-6">
                    {detail.travelTips.onCruise && detail.travelTips.onCruise.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900">Guidelines While on the Cruise</h3>
                        <ul className="mt-3 space-y-2">
                          {detail.travelTips.onCruise.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs leading-6 text-neutral-600 sm:text-[13px]">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {detail.travelTips.inJungle && detail.travelTips.inJungle.length > 0 && (
                      <div className="border-t border-neutral-100 pt-5">
                        <h3 className="text-sm font-bold text-neutral-900">Guidelines While in the Jungle</h3>
                        <ul className="mt-3 space-y-2">
                          {detail.travelTips.inJungle.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs leading-6 text-neutral-600 sm:text-[13px]">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {detail.travelTips.packingList && Object.keys(detail.travelTips.packingList).length > 0 && (
                      <div className="border-t border-neutral-100 pt-5">
                        <h3 className="text-sm font-bold text-neutral-900">Packing List</h3>
                        <div className="mt-3 grid gap-4 sm:grid-cols-2">
                          {Object.entries(detail.travelTips.packingList).map(([category, items]) => (
                            <div key={category} className="rounded-md bg-neutral-50 p-4">
                              <h4 className="text-xs font-bold capitalize text-neutral-800">{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
                              <ul className="mt-2 space-y-1.5">
                                {items.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-xs text-neutral-600">
                                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  </div>
                  )}
                </section>
              )}

              {/* Policy Section */}
              {detail.policy && (detail.policy.cancellation?.length || detail.policy.refund?.length || detail.policy.childPolicy?.length) && (
                <section id="policy" className="overflow-hidden rounded-sm border border-neutral-200 bg-white shadow-sm">
                  <SectionHeading
                    icon={ShieldCheck}
                    title="Policy"
                    isOpen={activeTab === "policy"}
                    onClick={() => handleSectionToggle("policy")}
                  />
                  {activeTab === "policy" && (
                  <div className="border-t border-neutral-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                  <div className="space-y-6">
                    {detail.policy.cancellation && detail.policy.cancellation.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900">Cancellation Policy</h3>
                        <ul className="mt-3 space-y-2">
                          {detail.policy.cancellation.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs leading-6 text-neutral-600 sm:text-[13px]">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {detail.policy.refund && detail.policy.refund.length > 0 && (
                      <div className="border-t border-neutral-100 pt-5">
                        <h3 className="text-sm font-bold text-neutral-900">Refund Policy</h3>
                        <ul className="mt-3 space-y-2">
                          {detail.policy.refund.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs leading-6 text-neutral-600 sm:text-[13px]">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {detail.policy.childPolicy && detail.policy.childPolicy.length > 0 && (
                      <div className="border-t border-neutral-100 pt-5">
                        <h3 className="text-sm font-bold text-neutral-900">Child Policy</h3>
                        <ul className="mt-3 space-y-2">
                          {detail.policy.childPolicy.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs leading-6 text-neutral-600 sm:text-[13px]">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  </div>
                  )}
                </section>
              )}

              {/* Options Section */}
              {detail.options && detail.options.length > 0 && (
                <section id="options" className="overflow-hidden rounded-sm border border-neutral-200 bg-white shadow-sm">
                  <SectionHeading
                    icon={Layers}
                    title="Options"
                    isOpen={activeTab === "options"}
                    onClick={() => handleSectionToggle("options")}
                  />
                  {activeTab === "options" && (
                  <div className="border-t border-neutral-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 space-y-3">
                    {detail.options.map((option, idx) => (
                      <div key={idx} className="rounded-md border border-neutral-200 p-4 text-sm text-neutral-700">
                        {typeof option === 'string' ? option : JSON.stringify(option)}
                      </div>
                    ))}
                  </div>
                  )}
                </section>
              )}

              {detail.faqs && detail.faqs.length > 0 && <FaqSection faqs={detail.faqs} />}
            </div>

            <aside className="lg:sticky lg:top-[calc(var(--header-height)+1.25rem)] lg:h-fit">
              <BookingCard
                detail={detail}
                phone={supportPhone}
                whatsapp={whatsappUrl}
              />
            </aside>
          </div>
        </div>
      </section>

      {/* Mobile booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-4 py-2.5 shadow-[0_-10px_30px_-20px_rgba(15,23,42,0.5)] backdrop-blur-md [padding-bottom:calc(0.625rem+env(safe-area-inset-bottom))] lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-2.5">
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-neutral-400">Starts from</p>
            <p className="truncate font-heading text-base font-bold text-primary-700">{formatCurrency(detail.priceFrom)}</p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp inquiry"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-neutral-200 bg-white text-neutral-700"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
          </a>
          <a href={supportPhone} className="flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-sm bg-primary-600 px-4 text-xs font-bold text-white">
            <Phone className="h-4 w-4" aria-hidden />
            Call
          </a>
        </div>
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={gallery}
          title={detail.title}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </main>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  isOpen,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  isOpen?: boolean;
  onClick?: () => void;
}) {
  if (!onClick) {
    return (
      <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-50 text-primary-700">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <h2 className="font-heading text-base font-bold text-neutral-900 sm:text-lg">{title}</h2>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-neutral-50 sm:px-6"
    >
      <span className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary-700">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <h2 className="font-heading text-sm font-bold text-neutral-900 sm:text-base">{title}</h2>
      </span>
      <ChevronDown
        className={cn("h-4 w-4 shrink-0 text-neutral-400 transition-transform", isOpen && "rotate-180")}
        aria-hidden
      />
    </button>
  );
}

function ListItem({ text, positive }: { text: string; positive: boolean }) {
  return (
    <div className="flex items-start gap-2.5 text-xs leading-5 text-neutral-600 sm:text-[13px]">
      {positive ? (
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
      ) : (
        <X className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden />
      )}
      <span>{text}</span>
    </div>
  );
}

// ============================================================================
// FIXED ITINERARY TIMELINE COMPONENT
// ============================================================================
function ItineraryTimeline({ days }: { days: { day: number; title: string; description: string }[] }) {
  // 1. Initialize activeDay to the first day's number (e.g., 1)
  const [activeDay, setActiveDay] = useState(days[0]?.day || 1);

  // 2. Strictly filter to get ONLY the data for the currently selected day
  const currentDay = days.find((d) => d.day === activeDay);

  // 3. Parse the description string into structured timeline items
  const parseItems = (desc: string) => {
    const lines = desc.split('\n').filter((line) => line.trim());
    const items: { time: string; text: string }[] = [];
    
    lines.forEach((line) => {
      // Check if line starts with a time (e.g., "07:00 AM")
      const timeMatch = line.match(/^(\d{1,2}:\d{2}\s*(?:AM|PM))/i);
      if (timeMatch) {
        const time = timeMatch[1].trim();
        // Remove the time and any leading dashes/spaces from the rest of the text
        const text = line.substring(timeMatch[0].length).replace(/^[\s-–]+/, '').trim();
        items.push({ time, text });
      } else {
        // For lines without explicit time (e.g., general paragraph descriptions for Day 2/3)
        items.push({ time: '', text: line.trim() });
      }
    });
    return items;
  };

  const items = currentDay ? parseItems(currentDay.description) : [];

  return (
    <div className="mt-5">
      {/* Day Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto rounded-sm bg-slate-100 p-1">
        {days.map((day) => (
          <button
            key={day.day}
            type="button"
            onClick={() => setActiveDay(day.day)}
            className={cn(
              "flex-1 min-w-[80px] rounded-md px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm",
              activeDay === day.day
                ? "bg-white text-primary-700 shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            )}
          >
            Day {day.day}
          </button>
        ))}
      </div>

      {/* Timeline Content */}
      <div className="space-y-0">
        {items.length > 0 ? (
          items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <article key={index} className="relative flex gap-4 pb-6 last:pb-0">
                {/* Vertical connecting line */}
                {!isLast && (
                  <div className="absolute left-[19px] top-10 h-[calc(100%-12px)] w-px bg-neutral-200" />
                )}
                
                {/* Time / Icon Circle */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-700 text-white shadow-sm">
                    {item.time ? <Clock3 className="h-4 w-4" /> : <CalendarDays className="h-4 w-4" />}
                  </div>
                  {item.time && (
                    <span className="mt-2 text-[10px] font-semibold text-neutral-600">
                      {item.time}
                    </span>
                  )}
                </div>

                {/* Text Content */}
                <div className="min-w-0 flex-1 border-b border-neutral-100 pb-6 last:border-0 last:pb-0">
                  <p className="text-sm leading-6 text-neutral-700 sm:text-[13px] whitespace-pre-line">
                    {item.text}
                  </p>
                </div>
              </article>
            );
          })
        ) : (
          <p className="py-8 text-center text-sm text-neutral-500">
            No itinerary details available for Day {activeDay}.
          </p>
        )}
      </div>
    </div>
  );
}

function BookingCard({ detail, phone, whatsapp }: { detail: PackageDetail; phone: string; whatsapp: string }) {
  return (
    <div className="overflow-hidden rounded-sm border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-100 bg-neutral-50 px-5 py-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary-700" aria-hidden />
          <p className="text-sm font-bold text-neutral-900">Book This Tour</p>
        </div>
        <p className="mt-1 text-[11px] leading-5 text-neutral-500">Send your preferred travel details and our team will confirm availability.</p>
      </div>

      <div className="p-5">
        <div className="rounded-md border border-primary-100 bg-primary-50/70 p-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-700">{detail.priceNote ?? "Starting price"}</p>
          <p className="mt-0.5 font-heading text-2xl font-bold text-primary-700">{formatCurrency(detail.priceFrom)}</p>
          <p className="mt-0.5 text-[10px] text-neutral-500">Price may vary by date and availability.</p>
        </div>

        <div className="mt-4 space-y-2.5 text-xs text-neutral-600">
          <div className="flex items-start gap-2">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <span><strong className="text-neutral-800">Duration:</strong> {detail.durationDays} days</span>
          </div>
          {detail.nightsLabel && (
            <div className="flex items-start gap-2">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
              <span>{detail.nightsLabel}</span>
            </div>
          )}
          {detail.groupSize && (
            <div className="flex items-start gap-2">
              <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
              <span>Group size: {detail.groupSize.min} - {detail.groupSize.max} people</span>
            </div>
          )}
          <div className="flex items-start gap-2">
            <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
            <span>Suitable for individual, couple or group inquiries.</span>
          </div>
        </div>

        {detail.bookingSteps && detail.bookingSteps.length > 0 && (
          <div className="mt-5 border-t border-neutral-100 pt-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-neutral-700">How to Book:</p>
            <ul className="space-y-2">
              {detail.bookingSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[11px] leading-5 text-neutral-600">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary-100 text-[9px] font-bold text-primary-700">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <a href={phone} className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary-600 text-xs font-bold text-white transition hover:bg-primary-700">
          <Phone className="h-4 w-4" aria-hidden />
          Call to Book
        </a>
        <a href={whatsapp} target="_blank" rel="noreferrer" className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white text-xs font-bold text-neutral-700 transition hover:border-primary-300 hover:text-primary-700">
          <MessageCircle className="h-4 w-4" aria-hidden />
          WhatsApp Inquiry
        </a>

        <div className="mt-5 border-t border-neutral-100 pt-4">
          <p className="flex items-start gap-2 text-[11px] leading-5 text-neutral-500"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />Transparent price confirmation before booking</p>
          <p className="mt-1.5 flex items-start gap-2 text-[11px] leading-5 text-neutral-500"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />Travel support from inquiry to departure</p>
          <p className="mt-1.5 flex items-start gap-2 text-[11px] leading-5 text-neutral-500"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />Availability checked before confirmation</p>
        </div>
      </div>
    </div>
  );
}

function FaqSection({ faqs }: { faqs: { question: string; answer: string }[] | undefined }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!faqs?.length) return null;

  return (
    <section className="rounded-sm border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeading icon={Info} title="Frequently Asked Questions" />
      <div className="mt-3 divide-y divide-neutral-100">
        {faqs.map((faq, index) => {
          const isOpen = open === index;
          return (
            <div key={faq.question}>
              <button type="button" onClick={() => setOpen(isOpen ? null : index)} className="flex min-h-12 w-full items-center justify-between gap-4 py-3 text-left text-xs font-semibold text-neutral-800 sm:text-sm">
                <span>{faq.question}</span>
                <ChevronDown className={cn("h-4 w-4 shrink-0 text-neutral-400 transition-transform", isOpen && "rotate-180")} aria-hidden />
              </button>
              {isOpen && <p className="pb-4 pr-8 text-xs leading-6 text-neutral-600 sm:text-[13px]">{faq.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TourGallery({ images, title, onOpen }: { images: string[]; title: string; onOpen: (index: number) => void }) {
  const shown = images.slice(0, 4);
  if (!shown.length) return null;

  return (
    <div className="overflow-hidden rounded-sm border border-neutral-200 bg-white p-1 shadow-sm sm:p-1.5">
      <div className="grid h-[260px] grid-cols-2 grid-rows-2 gap-1 sm:h-[360px] sm:gap-1.5 md:h-[410px] lg:h-[440px] lg:grid-cols-4">
        <button type="button" onClick={() => onOpen(0)} className="group relative col-span-2 row-span-2 overflow-hidden rounded-md bg-neutral-100 text-left lg:col-span-2">
          <Image src={shown[0]} alt={`${title} main photo`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
          <GalleryOverlay />
        </button>

        {shown.slice(1, 4).map((src, index) => (
          <button key={`${src}-${index}`} type="button" onClick={() => onOpen(index + 1)} className="group relative overflow-hidden rounded-md bg-neutral-100 text-left lg:col-span-1">
            <Image src={src} alt={`${title} photo ${index + 2}`} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
            <GalleryOverlay />
          </button>
        ))}
      </div>
    </div>
  );
}

function GalleryOverlay() {
  return (
    <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/15">
      <span className="flex h-9 w-9 scale-90 items-center justify-center rounded-full bg-black/55 text-white opacity-0 shadow-lg transition-all group-hover:scale-100 group-hover:opacity-100">
        <ZoomIn className="h-4 w-4" aria-hidden />
      </span>
    </span>
  );
}

function GalleryLightbox({ images, title, index, onClose, onChange }: { images: string[]; title: string; index: number; onClose: () => void; onChange: (index: number) => void }) {
  const current = images[index] ?? images[0];
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/90 p-4" role="dialog" aria-modal="true" aria-label={`${title} gallery`}>
      <button type="button" onClick={onClose} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close gallery">
        <X className="h-5 w-5" />
      </button>
      <div className="relative h-[72vh] w-full max-w-5xl">
        <Image src={current} alt={`${title} photo ${index + 1}`} fill sizes="95vw" className="object-contain" />
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/10 p-1.5 backdrop-blur-sm">
          {images.map((_, i) => (
            <button key={i} type="button" onClick={() => onChange(i)} className={cn("h-2 w-2 rounded-full", i === index ? "bg-white" : "bg-white/40")} aria-label={`Show photo ${i + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}