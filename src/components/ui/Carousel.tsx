"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselProps {
  children: ReactNode[];
  /** Tailwind basis classes per breakpoint, e.g. "basis-full sm:basis-1/2 lg:basis-1/4" */
  slideClassName?: string;
  autoplay?: boolean;
  autoplayDelayMs?: number;
  showDots?: boolean;
  showArrows?: boolean;
  ariaLabel: string;
  className?: string;
}

/**
 * One generic carousel used by PromoBannerCarousel, HotDealsSection,
 * TopDestinationsSection and TravelBlogSection instead of four bespoke
 * slider implementations.
 *
 * Accessibility: arrow buttons are real <button>s with aria-labels, dot
 * navigation exposes aria-current, and autoplay is skipped entirely when
 * prefers-reduced-motion is set. Autoplay also pauses on pointer hover/focus.
 */
export function Carousel({
  children,
  slideClassName = "basis-full sm:basis-1/2 lg:basis-1/3",
  autoplay = false,
  autoplayDelayMs = 5000,
  showDots = true,
  showArrows = true,
  ariaLabel,
  className,
}: CarouselProps) {
  const reducedMotionRef = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const autoplayPlugin = useRef(
    Autoplay({ delay: autoplayDelayMs, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    autoplay && !reducedMotionRef.current ? [autoplayPlugin.current] : [],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={cn("relative", className)} aria-label={ariaLabel} role="region">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex">
          {children.map((child, i) => (
            <div key={i} className={cn("min-w-0 shrink-0 grow-0 pl-4", slideClassName)}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute -left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md hover:bg-neutral-50 sm:flex"
          >
            <ChevronLeft className="h-5 w-5 text-neutral-700" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md hover:bg-neutral-50 sm:flex"
          >
            <ChevronRight className="h-5 w-5 text-neutral-700" aria-hidden />
          </button>
        </>
      )}

      {showDots && scrollSnaps.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === selectedIndex}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-200",
                i === selectedIndex ? "w-6 bg-primary-700" : "w-2 bg-neutral-300",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
