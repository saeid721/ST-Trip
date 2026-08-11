"use client";

import { Plane } from "lucide-react";

/**
 * CSS-driven infinite marquee (no JS animation loop needed) — the track is
 * duplicated once and translated -50%, looping seamlessly. Pauses on hover
 * and respects prefers-reduced-motion via the global rule in globals.css.
 */
export function PartnersMarquee({ logos }: { logos: string[] }) {
  const track = [...logos, ...logos];

  return (
    <section aria-label="Partner airlines" className="overflow-hidden border-y border-neutral-100 bg-white py-10">
      <div className="group flex w-max animate-[marquee_28s_linear_infinite] gap-12 [animation-play-state:running] group-hover:[animation-play-state:paused] hover:[animation-play-state:paused]">
        {track.map((logo, i) => (
          <div
            key={`${logo}-${i}`}
            className="flex items-center gap-2 whitespace-nowrap text-neutral-400"
            aria-hidden={i >= logos.length}
          >
            <Plane className="h-5 w-5" aria-hidden />
            <span className="text-sm font-semibold">{logo}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
