"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Plane, Hotel, Compass, Globe2, Wifi, Package, PackageCheck } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { FlightSearchTab } from "./FlightSearchTab";
import { HotelSearchTab } from "./HotelSearchTab";
import { TourSearchTab } from "./TourSearchTab";
import { VisaSearchTab } from "./VisaSearchTab";
import { UmrahSearchTab } from "./UmrahSearchTab";
import { HajjSearchTab } from "./HajjSearchTab";
import { EsimSearchTab } from "./EsimSearchTab";

const tabs = [
  { value: "flights", label: "Flights", icon: Plane },
  { value: "hotels", label: "Hotels", icon: Hotel },
  { value: "tours", label: "Tours", icon: Compass },
  { value: "visa", label: "Visa", icon: Globe2 },
  { value: "umrah", label: "Umrah", icon: Package },
  { value: "hajj", label: "Hajj", icon: PackageCheck },
  { value: "esim", label: "eSIM", icon: Wifi },
];

/**
 * The homepage centerpiece. Isolated as the only heavy client island above
 * the fold — everything else in HeroSection stays a Server Component.
 */
type SearchTab = "flights" | "hotels" | "tours" | "visa" | "umrah" | "hajj" | "esim";

function getTabFromPathname(pathname: string): SearchTab {
  if (pathname === "/hotels" || pathname.startsWith("/hotels/")) return "hotels";
  if (pathname === "/tour-packages" || pathname.startsWith("/tour-packages/")) return "tours";
  if (pathname === "/visa" || pathname.startsWith("/visa/")) return "visa";
  if (pathname === "/umrah-packages" || pathname.startsWith("/umrah-packages/")) return "umrah";
  if (pathname === "/hajj-packages" || pathname.startsWith("/hajj-packages/")) return "hajj";
  if (pathname === "/esim" || pathname.startsWith("/esim/")) return "esim";
  return "flights";
}

export function SearchWidget() {
  const pathname = usePathname();
  const routeTab = getTabFromPathname(pathname);
  const [activeTab, setActiveTab] = useState<SearchTab>(routeTab);

  useEffect(() => {
    setActiveTab(routeTab);
  }, [routeTab]);

  return (
    <div className="rounded-md border border-neutral-100 bg-white p-4 shadow-floating sm:p-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as SearchTab)}>
        <TabsList className="mb-5 w-full justify-start gap-0.5 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:w-fit md:gap-1 md:overflow-visible">
          {tabs.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value} className="shrink-0 snap-start">
              <Icon className="h-5 w-5 md:h-4 md:w-4" aria-hidden />
              <span className="leading-tight">{label}</span>
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
        <TabsContent value="umrah">
          <UmrahSearchTab />
        </TabsContent>
        <TabsContent value="hajj">
          <HajjSearchTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}