import Image from "next/image";
import { Star, Apple, Smartphone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { WorldMapFlights } from "@/features/home/components/WorldMapFlights";

export function AppDownloadSection() {
  return (
    <section
      aria-labelledby="app-download-heading"
      className="relative overflow-hidden bg-neutral-50 py-12 sm:py-16 md:py-20"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-primary-700) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="container-app relative grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="text-center lg:text-left">
          <h2
            id="app-download-heading"
            className="font-heading text-xl font-bold text-neutral-900 sm:text-2xl md:text-3xl"
          >
            Track Flights with Your All-in-One Travel App
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-neutral-600 lg:mx-0">
            Real-time flight updates, exclusive app-only fares, and one-tap rebooking —
            download {siteConfig.name} today.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6 sm:gap-4 lg:justify-start">
            <div className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm sm:px-3">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" aria-hidden />
              {siteConfig.apps.iosRating} App Store
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm sm:px-3">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" aria-hidden />
              {siteConfig.apps.androidRating} Google Play
            </div>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-3 sm:mt-6 lg:justify-start">
            <a
              href={siteConfig.apps.ios}
              className="flex h-11 items-center gap-2 rounded-lg bg-neutral-900 px-3.5 text-white transition-colors hover:bg-neutral-800 sm:h-12 sm:px-4"
            >
              <Apple className="h-5 w-5" aria-hidden />
              <span className="text-left leading-tight">
                <span className="block text-[9px] text-neutral-300 sm:text-[10px]">Download on the</span>
                <span className="block text-xs font-semibold sm:text-sm">App Store</span>
              </span>
            </a>
            <a
              href={siteConfig.apps.android}
              className="flex h-11 items-center gap-2 rounded-lg bg-neutral-900 px-3.5 text-white transition-colors hover:bg-neutral-800 sm:h-12 sm:px-4"
            >
              <Smartphone className="h-5 w-5" aria-hidden />
              <span className="text-left leading-tight">
                <span className="block text-[9px] text-neutral-300 sm:text-[10px]">GET IT ON</span>
                <span className="block text-xs font-semibold sm:text-sm">Google Play</span>
              </span>
            </a>
          </div>

          <p className="mt-4 text-xs text-neutral-400 sm:mt-3">Scan the QR code below to download the app</p>
          <div className="mt-2 flex justify-center gap-3 lg:justify-start">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-neutral-200 bg-white p-1 sm:h-20 sm:w-20">
              <Image
                src="/images/qrcode.png"
                alt="Scan to download on iOS"
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-neutral-200 bg-white p-1 sm:h-20 sm:w-20">
              <Image
                src="/images/qrcode.png"
                alt="Scan to download on Android"
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        <WorldMapFlights />
      </div>
    </section>
  );
}