"use client";

import Link from "next/link";
import { ChevronRight, Plane } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Route } from "@/features/home/types";

export function PopularRoutesSection({ routes }: { routes: Route[] }) {
  const domestic = routes.filter((r) => r.type === "domestic");
  const international = routes.filter((r) => r.type === "international");

  return (
    <section
      aria-labelledby="popular-routes-heading"
      className="relative overflow-hidden bg-neutral-50 py-8 sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(37,99,235,0.08)_1px,transparent_0)] [background-size:22px_22px]"
      />
      <div className="container-app relative">
        <SectionHeading
          id="popular-routes-heading"
          eyebrow="Fan favorites"
          title="Popular Routes"
          description="Make your next trip unforgettable — from business class to economy."
        />

        <Tabs defaultValue="domestic">
          <div className="mb-4 flex sm:mb-6 sm:w-fit">
            <TabsList className="flex w-full sm:w-auto">
              <TabsTrigger value="domestic" className="flex-1 justify-center sm:flex-none">Domestic</TabsTrigger>
              <TabsTrigger value="international" className="flex-1 justify-center sm:flex-none">International</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="domestic">
            <RouteGrid routes={domestic} />
          </TabsContent>
          <TabsContent value="international">
            <RouteGrid routes={international} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function RouteGrid({ routes }: { routes: Route[] }) {
  return (
    <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3.5">
      {routes.map((route) => (
        <li key={route.id}>
          <Link
            href={route.href}
            className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-neutral-200/80 bg-white px-3 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-[0_12px_24px_-10px_rgba(37,99,235,0.2)] sm:px-5 sm:py-4"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-primary-500 to-accent-500 transition-transform duration-300 group-hover:scale-y-100"
            />
            <span className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="flex shrink-0 flex-col items-center">
                <span className="text-xs font-bold text-neutral-800 sm:text-sm">{route.originCode}</span>
                <span className="text-[9px] text-neutral-400 sm:text-[10px]">{route.originCity}</span>
              </span>
              <span className="relative flex h-6 w-8 shrink-0 items-center justify-center sm:w-12">
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-neutral-300" />
                <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 ring-1 ring-primary-100 transition-colors duration-300 group-hover:bg-primary-600 group-hover:ring-primary-600">
                  <Plane className="h-3 w-3 rotate-90 text-primary-600 transition-colors duration-300 group-hover:text-white" aria-hidden />
                </span>
              </span>
              <span className="flex min-w-0 shrink-0 flex-col items-center">
                <span className="text-xs font-bold text-neutral-800 sm:text-sm">{route.destinationCode}</span>
                <span className="truncate text-[9px] text-neutral-400 sm:text-[10px]">{route.destinationCity}</span>
              </span>
            </span>
            <span className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-50 text-neutral-400 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white sm:h-8 sm:w-8">
              <ChevronRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
