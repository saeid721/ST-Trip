"use client";

import { Plane, Hotel, Compass, Globe2, Wifi } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { FlightSearchTab } from "./FlightSearchTab";
import { HotelSearchTab } from "./HotelSearchTab";
import { TourSearchTab } from "./TourSearchTab";
import { VisaSearchTab } from "./VisaSearchTab";
import { EsimSearchTab } from "./EsimSearchTab";

const tabs = [
  { value: "flights", label: "Flights", icon: Plane },
  { value: "hotels", label: "Hotels", icon: Hotel },
  { value: "tours", label: "Tours", icon: Compass },
  { value: "visa", label: "Visa", icon: Globe2 },
  { value: "esim", label: "eSIM", icon: Wifi },
];

/**
 * The homepage centerpiece. Isolated as the only heavy client island above
 * the fold — everything else in HeroSection stays a Server Component.
 */
export function SearchWidget() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-floating sm:p-6">
      <Tabs defaultValue="flights">
        <TabsList className="mb-5 flex-wrap">
          {tabs.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value}>
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="flights">
          <FlightSearchTab />
        </TabsContent>
        <TabsContent value="hotels">
          <HotelSearchTab />
        </TabsContent>
        <TabsContent value="tours">
          <TourSearchTab />
        </TabsContent>
        <TabsContent value="visa">
          <VisaSearchTab />
        </TabsContent>
        <TabsContent value="esim">
          <EsimSearchTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
