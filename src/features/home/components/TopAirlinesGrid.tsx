import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { Airline } from "@/features/home/types";

export function TopAirlinesGrid({ airlines }: { airlines: Airline[] }) {
  return (
    <section aria-labelledby="top-airlines-heading" className=" py-14 sm:py-20">
      <div className="container-app">
        <SectionHeading
          id="top-airlines-heading"
          eyebrow="Fly with confidence"
          title="Search Top Airlines"
          description="Book instantly across all major domestic and international carriers."
        />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {airlines.map((airline, i) => (
            <li key={airline.id}>
              <Reveal delay={i * 0.03}>
                <Link
                  href={airline.href}
                  className="group flex h-16 items-center gap-3 rounded-md border border-neutral-200 bg-white px-3 shadow-sm transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md sm:h-[68px] sm:px-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-neutral-50 sm:h-10 sm:w-10">
                    <Image
                      src={airline.logo}
                      alt={`${airline.name} logo`}
                      width={40}
                      height={40}
                      className="h-full w-full object-contain p-1"
                    />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs font-semibold text-neutral-800 sm:text-sm">
                    {airline.name}
                  </span>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-neutral-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary-600"
                    aria-hidden
                  />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
