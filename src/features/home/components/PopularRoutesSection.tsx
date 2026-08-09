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
    <section aria-labelledby="popular-routes-heading" className="py-14 sm:py-20">
      <div className="container-app">
        <SectionHeading
          id="popular-routes-heading"
          eyebrow="Fan favorites"
          title="Popular Routes"
          description="Make your next trip unforgettable — from business class to economy."
        />

        <Tabs defaultValue="domestic">
          <TabsList className="mb-6">
            <TabsTrigger value="domestic">Domestic</TabsTrigger>
            <TabsTrigger value="international">International</TabsTrigger>
          </TabsList>

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
    <ul className="grid gap-3 sm:grid-cols-2">
      {routes.map((route) => (
        <li key={route.id}>
          <Link
            href={route.href}
            className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm shadow-sm transition-colors hover:border-primary-300"
          >
            <span className="flex items-center gap-2 font-medium text-neutral-800">
              {route.originCity}
              <span className="text-xs text-neutral-400">{route.originCode}</span>
              <Plane className="h-3.5 w-3.5 rotate-90 text-primary-500" aria-hidden />
              {route.destinationCity}
              <span className="text-xs text-neutral-400">{route.destinationCode}</span>
            </span>
            <ChevronRight className="h-4 w-4 text-neutral-400" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  );
}
