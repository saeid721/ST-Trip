import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { formatCurrency } from "@/lib/utils";
import { holidayPackages } from "@/features/holiday-packages/data/holiday-packages";

export const metadata: Metadata = {
  title: "All Holiday Packages",
  description: "Browse all holiday packages available for booking.",
};

export default function AllHolidayPackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Holiday Packages"
        title="All Holiday Packages"
        description="Browse every holiday destination and package we offer, from short breaks to premium getaways."
      />
      <section className="py-14 sm:py-20">
        <div className="container-app">
          <SectionHeading
            id="all-holiday-packages-heading"
            title={`${holidayPackages.length} Packages Available`}
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {holidayPackages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={(i % 8) * 0.05}>
                <Link
                  href={pkg.href}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-xl border border-neutral-200 shadow-sm transition-[transform,box-shadow] duration-300 [transition-timing-function:var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-lg"
                >
                  <Image
                    src={pkg.image}
                    alt={pkg.city}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 23vw"
                    priority={i < 4}
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}