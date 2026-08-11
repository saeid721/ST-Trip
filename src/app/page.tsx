import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { buildMetadata, buildHomeJsonLd } from "@/lib/seo";
import { Skeleton } from "@/components/ui/Skeleton";

import { HeroSection } from "@/features/home/components/HeroSection";
import { TrustBadgesBar } from "@/features/home/components/TrustBadgesBar";
import { PromoBannerCarousel } from "@/features/home/components/PromoBannerCarousel";
import { TrendingDestinationsSection } from "@/features/home/components/TrendingDestinationsSection";
import { HowItWorksSection } from "@/features/home/components/HowItWorksSection";
import { HotDealsSection } from "@/features/home/components/HotDealsSection";
import { PopularHotelsSection } from "@/features/home/components/PopularHotelsSection";
import { PopularHolidayPackagesSection } from "@/features/home/components/PopularHolidayPackagesSection";
import { TopDestinationsSection } from "@/features/home/components/TopDestinationsSection";
import { TopAirlinesGrid } from "@/features/home/components/TopAirlinesGrid";
import { PopularRoutesSection } from "@/features/home/components/PopularRoutesSection";
import { StatsCounterSection } from "@/features/home/components/StatsCounterSection";
import { PartnerCtaBanner } from "@/features/home/components/PartnerCtaBanner";

import {
  trustBadges,
  promoBanners,
  trendingDestinations,
  helpTiles,
  hotDeals,
  popularHotels,
  holidayPackages,
  topDestinations,
  topAirlines,
  popularRoutes,
  stats,
  blogPosts,
  partnerLogos,
} from "@/features/home/data";

export const metadata: Metadata = buildMetadata({
  title: "Book Flights, Hotels, Tours & Visas Online",
  description:
    "Compare and book flights, hotels, tour packages and visa services across Bangladesh and beyond. 24/7 support, secure payment, best price guarantee.",
});

// Below-the-fold, non-LCP-critical sections are code-split so the initial
// bundle stays lean; each renders a skeleton matching its final layout.
const TravelBlogSection = dynamic(
  () => import("@/features/home/components/TravelBlogSection").then((m) => m.TravelBlogSection),
  { loading: () => <SectionSkeleton /> },
);
const AppDownloadSection = dynamic(
  () => import("@/features/home/components/AppDownloadSection").then((m) => m.AppDownloadSection),
  { loading: () => <SectionSkeleton /> },
);
const PartnersMarquee = dynamic(
  () => import("@/features/home/components/PartnersMarquee").then((m) => m.PartnersMarquee),
  { loading: () => <div className="h-24" /> },
);

function SectionSkeleton() {
  return (
    <div className="container-app py-14">
      <Skeleton className="mb-8 h-8 w-64" />
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[4/3] w-full" />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const jsonLd = buildHomeJsonLd();

  return (
    <>
      {jsonLd.map((entry, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}

      <HeroSection />
      <TrustBadgesBar items={trustBadges} />
      <PromoBannerCarousel banners={promoBanners} />
      <TrendingDestinationsSection destinations={trendingDestinations} />
      <HowItWorksSection tiles={helpTiles} />
      <HotDealsSection deals={hotDeals} />
      <PopularHotelsSection hotels={popularHotels} />
      <PopularHolidayPackagesSection packages={holidayPackages} />
      <TopDestinationsSection destinations={topDestinations} />
      <TopAirlinesGrid airlines={topAirlines} />
      <PopularRoutesSection routes={popularRoutes} />
      <StatsCounterSection stats={stats} />
      <AppDownloadSection />
      <TravelBlogSection posts={blogPosts} />
      <PartnersMarquee logos={partnerLogos} />
      <PartnerCtaBanner />
    </>
  );
}