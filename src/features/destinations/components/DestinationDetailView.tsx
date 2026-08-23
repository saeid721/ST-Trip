"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Calendar, Landmark, Globe, Building2, Luggage, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn, formatCurrency } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContentCard } from "@/components/ui/ContentCard";
import type { DestinationDetail } from "../types";
import { allHotels } from "@/features/hotels/data/hotels";
import { holidayPackages } from "@/features/holiday-packages/data/holiday-packages";

interface DestinationDetailViewProps {
  detail: DestinationDetail;
  backHref: string;
  backLabel: string;
}

// Twemoji Flag renderer for Windows compatibility
function getTwemojiUrl(flagEmoji: string): string {
  const codepoints = Array.from(flagEmoji)
    .map((char) => char.codePointAt(0)!.toString(16))
    .join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoints}.svg`;
}

// Local mock hotels for non-Cox's Bazar destinations (for rich content)
const localMockHotels: Record<string, Array<{
  id: string;
  name: string;
  location: string;
  image: string;
  priceFrom: number;
  rating: number;
  reviewCount: number;
}>> = {
  dhaka: [
    {
      id: "mock-dhaka-1",
      name: "Pan Pacific Sonargaon Dhaka",
      location: "Dhaka",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      priceFrom: 12500,
      rating: 4.6,
      reviewCount: 389,
    },
    {
      id: "mock-dhaka-2",
      name: "The Westin Dhaka",
      location: "Dhaka",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      priceFrom: 15000,
      rating: 4.7,
      reviewCount: 512,
    },
  ],
  sreemangal: [
    {
      id: "mock-sreemangal-1",
      name: "Grand Sultan Tea Resort & Golf",
      location: "Sreemangal",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      priceFrom: 14000,
      rating: 4.8,
      reviewCount: 290,
    },
    {
      id: "mock-sreemangal-2",
      name: "Sreemangal Resort & Spa",
      location: "Sreemangal",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
      priceFrom: 4500,
      rating: 4.3,
      reviewCount: 95,
    },
  ],
  gazipur: [
    {
      id: "mock-gazipur-1",
      name: "Sarah Resort Gazipur",
      location: "Gazipur",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
      priceFrom: 10500,
      rating: 4.6,
      reviewCount: 220,
    },
    {
      id: "mock-gazipur-2",
      name: "Chuti Resort",
      location: "Gazipur",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      priceFrom: 6000,
      rating: 4.3,
      reviewCount: 145,
    },
  ],
  sylhet: [
    {
      id: "mock-sylhet-1",
      name: "Rose View Hotel",
      location: "Sylhet",
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
      priceFrom: 6500,
      rating: 4.4,
      reviewCount: 178,
    },
    {
      id: "mock-sylhet-2",
      name: "Grand Palace Hotel Sylhet",
      location: "Sylhet",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      priceFrom: 7200,
      rating: 4.5,
      reviewCount: 234,
    },
  ],
  bandarban: [
    {
      id: "mock-bandarban-1",
      name: "Sairu Hill Resort",
      location: "Bandarban",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
      priceFrom: 12000,
      rating: 4.7,
      reviewCount: 198,
    },
    {
      id: "mock-bandarban-2",
      name: "Nilgiri Resort Hilltop",
      location: "Bandarban",
      image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
      priceFrom: 8000,
      rating: 4.5,
      reviewCount: 88,
    },
  ],
  "kuala-lumpur": [
    {
      id: "mock-kl-1",
      name: "Grand Hyatt Kuala Lumpur",
      location: "Kuala Lumpur",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      priceFrom: 15000,
      rating: 4.7,
      reviewCount: 650,
    },
    {
      id: "mock-kl-2",
      name: "Shangri-La Kuala Lumpur",
      location: "Kuala Lumpur",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      priceFrom: 13500,
      rating: 4.6,
      reviewCount: 420,
    },
  ],
  dubai: [
    {
      id: "mock-dubai-1",
      name: "Burj Al Arab Jumeirah",
      location: "Dubai",
      image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
      priceFrom: 95000,
      rating: 4.9,
      reviewCount: 1200,
    },
    {
      id: "mock-dubai-2",
      name: "Atlantis The Palm",
      location: "Dubai",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      priceFrom: 45000,
      rating: 4.8,
      reviewCount: 2310,
    },
  ],
  bangkok: [
    {
      id: "mock-bangkok-1",
      name: "Amari Bangkok",
      location: "Bangkok",
      image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
      priceFrom: 7500,
      rating: 4.5,
      reviewCount: 480,
    },
    {
      id: "mock-bangkok-2",
      name: "The Berkeley Hotel Pratunam",
      location: "Bangkok",
      image: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80",
      priceFrom: 6000,
      rating: 4.4,
      reviewCount: 652,
    },
  ],
  male: [
    {
      id: "mock-male-1",
      name: "Kurumba Maldives",
      location: "Male",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      priceFrom: 35000,
      rating: 4.7,
      reviewCount: 540,
    },
    {
      id: "mock-male-2",
      name: "Villa Nautica (Paradise Island Resort)",
      location: "Male",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
      priceFrom: 42000,
      rating: 4.6,
      reviewCount: 890,
    },
  ],
  maldives: [
    {
      id: "mock-male-1",
      name: "Kurumba Maldives",
      location: "Male",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      priceFrom: 35000,
      rating: 4.7,
      reviewCount: 540,
    },
    {
      id: "mock-male-2",
      name: "Villa Nautica (Paradise Island Resort)",
      location: "Male",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
      priceFrom: 42000,
      rating: 4.6,
      reviewCount: 890,
    },
  ],
  kathmandu: [
    {
      id: "mock-kathmandu-1",
      name: "Hyatt Regency Kathmandu",
      location: "Kathmandu",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
      priceFrom: 9500,
      rating: 4.6,
      reviewCount: 312,
    },
    {
      id: "mock-kathmandu-2",
      name: "Hotel Shanker Kathmandu",
      location: "Kathmandu",
      image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
      priceFrom: 5000,
      rating: 4.3,
      reviewCount: 164,
    },
  ],
};

export function DestinationDetailView({ detail, backHref, backLabel }: DestinationDetailViewProps) {
  // 1. Get hotels for this destination
  const matchedHotels = allHotels.filter(
    (h) => h.location.toLowerCase() === detail.city.toLowerCase()
  );
  const displayHotels = matchedHotels.length > 0 
    ? matchedHotels 
    : (localMockHotels[detail.slug] || []);

  // 2. Get packages for this destination
  const displayPackages = holidayPackages.filter((pkg) => {
    const pkgCity = pkg.city.toLowerCase();
    const destCity = detail.city.toLowerCase();
    return pkgCity.includes(destCity) || destCity.includes(pkgCity);
  });

  const gallery = detail.gallery && detail.gallery.length > 0 ? detail.gallery : [detail.image];

  return (
    <>
      {/* Hero Header */}
      <section className="relative">
        <div className="relative h-[260px] w-full overflow-hidden sm:h-[360px] md:h-[480px]">
          <Image
            src={detail.image}
            alt={detail.city}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-neutral-900/60" />
        </div>

        {/* Back navigation & Title bar */}
        <div className="container-app relative -mt-20 sm:-mt-28 md:-mt-32">
          <div className="rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-md sm:p-6 md:p-8 border border-neutral-100">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              {backLabel}
            </Link>

            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-heading text-2xl font-bold text-neutral-900 sm:text-3xl md:text-4xl tracking-tight">
                    {detail.city}
                  </h1>
                  <Image
                    src={getTwemojiUrl(detail.countryFlag)}
                    alt={detail.country}
                    width={28}
                    height={20}
                    className="h-5 w-7 rounded-[3px] object-cover shadow-sm"
                  />
                </div>
                <p className="mt-1 text-sm font-medium text-neutral-500">
                  {detail.country}
                </p>
                <p className="mt-2 text-base font-medium text-primary-700 font-heading">
                  "{detail.tagline}"
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={`tel:${siteConfig.contact.supportPhone}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 shadow-sm"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  Book Flights & Hotels
                </a>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}?text=Hi,%20I%20am%20interested%20in%20traveling%20to%20${encodeURIComponent(detail.city)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary-300 hover:text-primary-700 shadow-sm"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-500" aria-hidden />
                  Customized Query
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts Section */}
      <section className="pt-8 sm:pt-10">
        <div className="container-app">
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-neutral-50 p-5 md:grid-cols-4 border border-neutral-200/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Best Time</p>
                <p className="text-sm font-semibold text-neutral-850">{detail.bestTimeToVisit}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Currency</p>
                <p className="text-sm font-semibold text-neutral-850">{detail.currency}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Languages</p>
                <p className="text-sm font-semibold text-neutral-850">{detail.languages}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Accommodations</p>
                <p className="text-sm font-semibold text-neutral-850">{displayHotels.length}+ Hotels Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details content */}
      <section className="py-12 sm:py-16">
        <div className="container-app grid gap-8 lg:grid-cols-[1fr_300px] lg:gap-12">
          {/* Left Column: Overview, Why Visit, Attractions */}
          <div className="space-y-10 sm:space-y-12">
            <div>
              <h2 className="font-heading text-xl font-bold text-neutral-900 sm:text-2xl">Overview</h2>
              <p className="mt-3.5 text-base leading-relaxed text-neutral-600">{detail.longOverview}</p>
            </div>

            {/* Gallery Grid */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {gallery.slice(0, 3).map((src, i) => (
                  <Reveal key={i} delay={i * 0.05} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-neutral-100 shadow-sm">
                    <Image
                      src={src}
                      alt={`${detail.city} photo ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 33vw, 250px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </Reveal>
                ))}
              </div>
            )}

            {/* Why Visit */}
            <div>
              <h2 className="font-heading text-xl font-bold text-neutral-900 sm:text-2xl">Why Visit {detail.city}?</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {detail.whyVisit.map((reason) => (
                  <li key={reason} className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-700">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="h-3 w-3" />
                    </div>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            {/* Attractions */}
            <div>
              <h2 className="font-heading text-xl font-bold text-neutral-900 sm:text-2xl">Key Attractions</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                {detail.attractions.map((attraction, i) => (
                  <Reveal key={attraction.name} delay={i * 0.05} className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={attraction.image}
                        alt={attraction.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 250px"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="font-heading text-base font-semibold text-neutral-900">{attraction.name}</h3>
                      <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed">{attraction.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar CTA */}
          <aside className="sticky top-24 h-fit space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-neutral-900">Custom Trip Planner</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                Want to book a flight, plan a family vacation, or get custom hotel rates for {detail.city}? Our experts are ready to assist you.
              </p>

              <div className="mt-5 space-y-2.5">
                <a
                  href={`tel:${siteConfig.contact.supportPhone}`}
                  className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-primary-600 text-sm font-semibold text-white transition-colors hover:bg-primary-700 shadow-sm"
                >
                  <Phone className="h-4.5 w-4.5" />
                  Call Support (24/7)
                </a>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/20 shadow-sm"
                >
                  <MessageCircle className="h-4.5 w-4.5 text-emerald-500" />
                  WhatsApp Inquiry
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Available Holiday Packages in this Destination */}
      {displayPackages.length > 0 && (
        <section className="bg-neutral-50 py-14 sm:py-16 border-t border-neutral-250/30">
          <div className="container-app">
            <SectionHeading
              title="Featured Holiday Packages"
              description={`Unbeatable tour package deals to ${detail.city} from Dhaka.`}
            />
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {displayPackages.map((pkg, i) => (
                <Reveal key={pkg.id} delay={i * 0.05}>
                  <Link
                    href={pkg.href}
                    className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-neutral-200 shadow-sm hover:shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1"
                  >
                    <Image
                      src={pkg.image}
                      alt={pkg.city}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="font-heading text-lg font-bold text-white leading-tight">{pkg.city}</p>
                      <p className="mt-0.5 text-xs text-white/85">
                        Starts from {formatCurrency(pkg.priceFrom)}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommended Hotels */}
      {displayHotels.length > 0 && (
        <section className="py-14 sm:py-16 border-t border-neutral-250/30">
          <div className="container-app">
            <SectionHeading
              title={`Top Rated Hotels in ${detail.city}`}
              description="Handpicked luxury stays and budget-friendly accommodations."
            />
            <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {displayHotels.map((hotel, i) => (
                <Reveal key={hotel.id} delay={i * 0.05}>
                  <ContentCard
                    href={`/hotels/${hotel.id.replace("mock-", "").replace("hotel-", "")}`}
                    image={hotel.image}
                    imageAlt={`${hotel.name}, ${hotel.location}`}
                    title={hotel.name}
                    subtitle={`From ${formatCurrency(hotel.priceFrom)}/night`}
                    rating={hotel.rating}
                    reviewCount={hotel.reviewCount}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
