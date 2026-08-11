"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Destination } from "@/features/home/types";

export function TopDestinationsSection({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide functionality every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % destinations.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, destinations.length]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : destinations.length - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev < destinations.length - 1 ? prev + 1 : 0));
  };

  return (
    <section aria-labelledby="top-destinations-heading" className="py-14 sm:py-20 overflow-hidden">
      <div className="container-app">
        {/* Section Heading aligned cleanly with Logo & App Grid */}
        <SectionHeading
          id="top-destinations-heading"
          eyebrow="Where to next"
          title="Top Destinations"
          description="Explore Bangladesh's most popular getaway destinations."
        />

        {/* 3D Coverflow Carousel Container with Auto-play Pause on Hover */}
        <div
          className="relative mt-8 flex flex-col items-center select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative flex h-[380px] sm:h-[450px] w-full items-center justify-center [perspective:1200px]">
            {destinations.map((dest, i) => {
              const length = destinations.length;
              let offset = i - activeIndex;
              // Wrap the offset around the array so cards near the start/end
              // of the list still get a symmetric left/right neighbor set.
              // Without this, activeIndex values near 0 or length-1 show one
              // card on one side and two on the other — exactly the
              // left/right imbalance visible in the screenshot.
              if (offset > length / 2) offset -= length;
              if (offset < -length / 2) offset += length;
              const absOffset = Math.abs(offset);

              // 3D Perspective calculations
              let transform = "";
              let zIndex = 0;
              let opacity = 0;
              let filter = "brightness(100%)";

              if (offset === 0) {
                // Active Center Card
                transform = "translateX(0%) scale(1.05) rotateY(0deg)";
                zIndex = 30;
                opacity = 1;
                filter = "brightness(100%)";
              } else if (offset === -1) {
                // Immediate Left
                transform = "translateX(-78%) scale(0.9) rotateY(22deg)";
                zIndex = 20;
                opacity = 0.9;
                filter = "brightness(85%)";
              } else if (offset === -2) {
                // Far Left
                transform = "translateX(-148%) scale(0.76) rotateY(40deg)";
                zIndex = 10;
                opacity = 0.65;
                filter = "brightness(70%)";
              } else if (offset === 1) {
                // Immediate Right
                transform = "translateX(78%) scale(0.9) rotateY(-22deg)";
                zIndex = 20;
                opacity = 0.9;
                filter = "brightness(85%)";
              } else if (offset === 2) {
                // Far Right
                transform = "translateX(148%) scale(0.76) rotateY(-40deg)";
                zIndex = 10;
                opacity = 0.65;
                filter = "brightness(70%)";
              } else {
                // Hidden outer cards
                transform = offset < 0 ? "translateX(-160%) scale(0.6) rotateY(50deg)" : "translateX(160%) scale(0.6) rotateY(-50deg)";
                zIndex = 0;
                opacity = 0;
                filter = "brightness(50%)";
              }

              return (
                <div
                  key={dest.id}
                  onClick={() => setActiveIndex(i)}
                  className="absolute cursor-pointer transition-all duration-500 ease-out will-change-transform"
                  style={{
                    transform,
                    zIndex,
                    opacity,
                    filter,
                    pointerEvents: absOffset > 2 ? "none" : "auto",
                  }}
                >
                  <div className="group relative h-[320px] w-[220px] sm:h-[400px] sm:w-[270px] overflow-hidden rounded-3xl border border-slate-200/50 bg-slate-900 shadow-2xl transition-all duration-300 group-hover:shadow-3xl">
                    <Image
                      src={dest.image}
                      alt={dest.city}
                      fill
                      sizes="(max-width: 640px) 220px, 270px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={i === 2}
                    />

                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                    {/* Destination Name & Hotel Count overlay */}
                    <div className="absolute bottom-6 left-6 right-6 text-left">
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-md">
                        {dest.city}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm font-medium text-slate-200/90 drop-shadow">
                        {dest.hotelsAvailable} Hotels Available
                      </p>
                    </div>

                    {/* Hover Link Overlay */}
                    <Link
                      href={dest.href}
                      className="absolute inset-0 z-10"
                      aria-label={`View ${dest.city} hotels`}
                    />
                  </div>
                </div>
              );
            })}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous destination"
              className="absolute left-0 sm:left-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow-md backdrop-blur transition-all hover:bg-white hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next destination"
              className="absolute right-0 sm:right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow-md backdrop-blur transition-all hover:bg-white hover:scale-110 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots Pagination - shows only a 3-dot sliding window centered on active */}
          <div className="mt-6 flex items-center justify-center gap-2.5">
            {destinations.map((_, idx) => {
              const length = destinations.length;
              let diff = idx - activeIndex;
              if (diff > length / 2) diff -= length;
              if (diff < -length / 2) diff += length;
              const visible = Math.abs(diff) <= 1;

              if (!visible) return null;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 ${idx === activeIndex
                      ? "h-3 w-3 rounded-full bg-blue-600 ring-4 ring-blue-500/20 scale-110"
                      : "h-2.5 w-2.5 rounded-full bg-blue-200 hover:bg-blue-300"
                    }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}