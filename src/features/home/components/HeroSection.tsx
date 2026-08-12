import Image from "next/image";
import { Plane, Hotel, Compass, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SearchWidget } from "@/features/home/components/SearchWidget/SearchWidget";

/**
 * "3-second rule" chips — tell the user what the platform does before they
 * even read the search widget. Icon + single word, not sentences: this is
 * scanned, not read.
 */
const valueProps = [
  { icon: Plane, label: "Flights" },
  { icon: Hotel, label: "Hotels" },
  { icon: Compass, label: "Tours" },
  { icon: ShieldCheck, label: "Verified Visa Help" },
];

/**
 * Server-rendered hero shell. The only client-side piece is <SearchWidget/>,
 * kept as an isolated island so the LCP image + heading ship with zero JS.
 */
export function HeroSection() {
  return (
    <section className="relative" aria-labelledby="hero-heading">
      <div className="relative h-[390px] w-full overflow-hidden sm:h-[390px]">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80"
          alt="Aerial view of a tropical coastline, representing destinations bookable on ST Trip"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Scrim ensures 4.5:1 contrast for the heading/tagline text */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/45 to-neutral-900/80" />

        <div className="container-app relative flex h-full flex-col items-center justify-center text-center">
          <p className="font-heading text-lg font-medium text-white sm:text-xl">
            {siteConfig.tagline}
          </p>
          <h1
            id="hero-heading"
            className="mt-2 max-w-3xl font-heading text-3xl font-bold text-white sm:text-5xl"
          >
            {siteConfig.taglineEn}
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/85 sm:text-base">
            One platform, transparent pricing, 24/7 support — book in minutes.
          </p>
        </div>
      </div>

      {/* Floating search card overlapping the hero's bottom edge */}
      <div className="container-app relative -mt-20 sm:-mt-24">
        <SearchWidget />
      </div>
    </section>
  );
}
