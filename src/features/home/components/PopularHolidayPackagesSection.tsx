"use client";

import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/ui/Carousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatCurrency } from "@/lib/utils";
import type { HolidayPackage } from "@/features/home/types";

export function PopularHolidayPackagesSection({ packages }: { packages: HolidayPackage[] }) {
  return (
    <section aria-labelledby="holiday-packages-heading" className="bg-neutral-50 py-14 sm:py-20">
      <div className="container-app">
        <SectionHeading id="holiday-packages-heading" title="Popular Holiday Packages" />

        <Carousel
          ariaLabel="Popular holiday packages"
          slideClassName="basis-[70%] sm:basis-1/2 lg:basis-1/4"
        >
          {packages.map((pkg, i) => (
            <Link
              key={pkg.id}
              href={pkg.href}
              className="group relative block aspect-[3/4] overflow-hidden rounded-xl transition-[transform,box-shadow] duration-300 [transition-timing-function:var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-lg"
            >
              <Image
                src={pkg.image}
                alt={pkg.city}
                fill
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 25vw"
                priority={i === 0}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-heading text-lg font-bold text-white">{pkg.city}</p>
                <p className="mt-0.5 text-sm text-white/85">
                  Starts from {formatCurrency(pkg.priceFrom)}
                </p>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
}