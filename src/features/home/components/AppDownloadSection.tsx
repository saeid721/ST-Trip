import Image from "next/image";
import { Star, Apple, Smartphone } from "lucide-react";
import { siteConfig } from "@/config/site";

export function AppDownloadSection() {
  return (
    <section
      aria-labelledby="app-download-heading"
      className="relative overflow-hidden bg-neutral-50 py-16 sm:py-20"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-primary-700) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="container-app relative grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 id="app-download-heading" className="font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
            Track Flights with Your All-in-One Travel App
          </h2>
          <p className="mt-3 max-w-md text-sm text-neutral-600">
            Real-time flight updates, exclusive app-only fares, and one-tap rebooking —
            download {siteConfig.name} today.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" aria-hidden />
              {siteConfig.apps.iosRating} App Store
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" aria-hidden />
              {siteConfig.apps.androidRating} Google Play
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={siteConfig.apps.ios}
              className="flex h-12 items-center gap-2 rounded-lg bg-neutral-900 px-4 text-white transition-colors hover:bg-neutral-800"
            >
              <Apple className="h-5 w-5" aria-hidden />
              <span className="text-left leading-tight">
                <span className="block text-[10px] text-neutral-300">Download on the</span>
                <span className="block text-sm font-semibold">App Store</span>
              </span>
            </a>
            <a
              href={siteConfig.apps.android}
              className="flex h-12 items-center gap-2 rounded-lg bg-neutral-900 px-4 text-white transition-colors hover:bg-neutral-800"
            >
              <Smartphone className="h-5 w-5" aria-hidden />
              <span className="text-left leading-tight">
                <span className="block text-[10px] text-neutral-300">GET IT ON</span>
                <span className="block text-sm font-semibold">Google Play</span>
              </span>
            </a>
          </div>

          <p className="mt-3 text-xs text-neutral-400">Scan the QR code below to download the app</p>
          <div className="mt-2 flex gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-neutral-200 bg-white text-[10px] text-neutral-400">
              iOS QR
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-neutral-200 bg-white text-[10px] text-neutral-400">
              Android QR
            </div>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
          <Image
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80"
            alt="ST Trip travel app shown on a smartphone screen"
            fill
            sizes="(max-width: 1024px) 90vw, 480px"
            className="rounded-2xl object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
