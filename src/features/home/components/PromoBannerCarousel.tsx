"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
          showArrows={false}
          slideClassName="basis-full md:basis-1/2 lg:basis-1/3"
        >
          {banners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.href}
              className="group relative block aspect-[5/2] overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 transition-transform duration-200 active:scale-[0.98] sm:aspect-[5/2] sm:rounded-md sm:shadow-none sm:ring-0 sm:active:scale-100"
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />
              <div className="pointer-events-none absolute bottom-3 right-3 opacity-0 transition-all duration-300 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-4 sm:right-4">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white px-4 py-2 text-xs font-semibold text-primary-700 shadow-lg sm:text-sm">
                  View Details
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
