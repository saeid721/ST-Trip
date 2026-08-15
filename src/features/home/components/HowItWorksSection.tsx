import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HelpTile } from "@/features/home/types";

export function HowItWorksSection({ tiles }: { tiles: HelpTile[] }) {
  return (
    <section aria-labelledby="how-it-works-heading" className="bg-neutral-50 py-14 sm:py-20">
      <div className="container-app">
        <SectionHeading
          id="how-it-works-heading"
          eyebrow="Getting started"
          title="How It Works"
          description="Short guides to help you book faster and save more."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {tiles.map((tile) => (
            <Link
              key={tile.id}
              href={tile.href}
              className="group relative block aspect-video overflow-hidden rounded-xl"
            >
              <Image
                src={tile.thumbnail}
                alt={tile.title}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />
              <PlayCircle
                className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow"
                aria-hidden
              />
              <p className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white">
                {tile.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
