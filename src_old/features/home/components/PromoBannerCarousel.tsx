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
          slideClassName="basis-[85%] sm:basis-1/2 lg:basis-1/3"
        >
          {banners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.href}
              className="group relative block aspect-[16/9] overflow-hidden rounded-xl"
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-heading text-base font-semibold text-white">{banner.title}</p>
                {banner.subtitle && (
                  <p className="mt-1 text-xs text-white/80">{banner.subtitle}</p>
                )}
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
