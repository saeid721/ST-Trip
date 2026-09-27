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
        <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {airlines.map((airline, i) => (
            <li key={airline.id}>
              <Reveal delay={i * 0.03}>
                <Link
                  href={airline.href}
                  className="group relative flex items-center gap-1.5 overflow-hidden rounded-md border border-neutral-200/80 bg-white px-1.5 py-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 [transition-timing-function:var(--ease-out-soft)] hover:-translate-y-1 hover:border-primary-300 hover:shadow-[0_14px_28px_-10px_rgba(37,99,235,0.22)] sm:gap-3 sm:px-4 sm:py-3.5"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-8 h-20 w-20 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-80"
                  />
                  <span className="relative flex w-[72px] shrink-0 items-center transition-transform duration-300 group-hover:scale-105 sm:w-[72px]">
                    <Image
                      src={airline.logo}
                      alt={`${airline.name} logo`}
                      width={120}
                      height={60}
                      className="h-auto w-full object-contain"
                    />
                  </span>
                  <span className="relative min-w-0 flex-1 truncate text-[11px] font-semibold text-neutral-800 sm:text-sm">
                    {airline.name}
                  </span>
                  <span className="relative hidden h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-50 text-neutral-300 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white sm:flex">
                    <ChevronRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-full"
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
