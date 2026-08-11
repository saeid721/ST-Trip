import Link from "next/link";
import { Plane } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Airline } from "@/features/home/types";

export function TopAirlinesGrid({ airlines }: { airlines: Airline[] }) {
  return (
    <section aria-labelledby="top-airlines-heading" className="bg-neutral-50 py-14 sm:py-20">
      <div className="container-app">
        <SectionHeading
          id="top-airlines-heading"
          eyebrow="Fly with confidence"
          title="Search Top Airlines"
          description="Book instantly across all major domestic and international carriers."
        />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {airlines.map((airline) => (
            <li key={airline.id}>
              <Link
                href={airline.href}
                className="flex h-24 flex-col items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-center shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <Plane className="h-5 w-5 text-primary-600" aria-hidden />
                <span className="text-xs font-medium text-neutral-700">{airline.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
