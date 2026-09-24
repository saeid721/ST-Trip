"use client";

import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/ui/Carousel";
import type { PromoBanner } from "@/features/home/types";

export function PromoBannerCarousel({ banners }: { banners: PromoBanner[] }) {
  return (
    <section aria-labelledby="promo-heading" className="py-12 sm:py-16">
      <div className="container-app">
        <h2 id="promo-heading" className="sr-only">
          Current offers and promotions
        </h2>
        <Carousel
          ariaLabel="Promotional offers"
          autoplay
          autoplayDelayMs={3000}
          slideClassName="basis-full md:basis-1/2 lg:basis-1/3"
        >
          {banners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.href}
              className="group relative block aspect-[16/9] overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 transition-transform duration-200 active:scale-[0.98] sm:aspect-[5/2] sm:rounded-md sm:shadow-none sm:ring-0 sm:active:scale-100"
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-700 shadow-sm sm:hidden">
                Offer
              </span>
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <p className="font-heading text-sm font-bold text-white sm:text-base sm:font-semibold">{banner.title}</p>
                {banner.subtitle && (
                  <p className="mt-0.5 text-[11px] text-white/85 sm:mt-1 sm:text-xs sm:text-white/80">{banner.subtitle}</p>
                )}
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
