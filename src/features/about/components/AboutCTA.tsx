import Link from "next/link";
import { MapPinned, PlaneTakeoff } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function AboutCTA() {
  return (
    <section className="pb-16 sm:pb-24">
      <div className="container-app">
        <Reveal>
          <div className="relative overflow-hidden rounded-md bg-gradient-to-br from-accent-600 via-primary-800 to-primary-900 px-6 py-12 text-center text-white sm:px-10 sm:py-16">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              Your next journey starts here.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/85 sm:text-base">
              Search flights, browse tours, or start a hotel stay — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/tour"
                className="inline-flex h-[52px] items-center gap-2 whitespace-nowrap rounded-sm bg-white px-7 text-base font-semibold text-primary-700 shadow-md transition-colors hover:bg-neutral-50"
              >
                <MapPinned className="h-4 w-4" aria-hidden />
                Explore Tours
              </Link>
              <Link
                href="/flight"
                className="inline-flex h-[52px] items-center gap-2 whitespace-nowrap rounded-sm border border-white/40 bg-white/10 px-7 text-base font-semibold text-white transition-colors hover:bg-white/20"
              >
                <PlaneTakeoff className="h-4 w-4" aria-hidden />
                Book a Trip
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}