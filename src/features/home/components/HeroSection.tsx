import Image from "next/image";
import { Plane, Hotel, Compass, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SearchWidget } from "@/features/home/components/SearchWidget/SearchWidget";

const valueProps = [
  { icon: Plane, label: "Flights" },
  { icon: Hotel, label: "Hotels" },
  { icon: Compass, label: "Tours" },
  { icon: ShieldCheck, label: "Verified Visa Help" },
];

export function HeroSection() {
  return (
    <section className="relative" aria-labelledby="hero-heading">
      <div className="relative h-[320px] w-full overflow-hidden md:h-[390px]">
        <Image
          src="/images/hero-banner.jpg"
          alt="Aerial view of a tropical coastline, representing destinations bookable on ST Trip"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/45 to-neutral-900/80" />

        <div className="container-app relative flex h-full flex-col items-center justify-center px-4 text-center">
          <p className="font-heading text-sm font-medium text-white md:text-xl">
            {siteConfig.tagline}
          </p>
          <h1
            id="hero-heading"
            className="mt-2 max-w-3xl font-heading text-2xl leading-tight font-bold text-white md:text-5xl"
          >
            {siteConfig.taglineEn}
          </h1>
          <p className="mt-3 max-w-xl text-xs text-white/85 md:mt-4 md:text-base">
            One platform, transparent pricing, 24/7 support — book in minutes.
          </p>
        </div>
      </div>

      <div className="container-app relative -mt-16 md:-mt-24">
        <SearchWidget />
      </div>
    </section>
  );
}