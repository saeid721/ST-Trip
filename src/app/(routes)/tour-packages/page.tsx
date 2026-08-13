import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PackagePageHero } from "@/features/packages/components/PackagePageHero";
import { PackageGridWithTabs } from "@/features/packages/components/PackageGridWithTabs";
import { tourCategories, tourPackages } from "@/features/packages/data/tour-packages";

export const metadata: Metadata = buildMetadata({
  title: "Tour Packages",
  description:
    "Curated single and multi-country holiday tour packages from Bangladesh across Asia, Europe and beyond.",
});

export default function TourPackagesPage() {
  return (
    <>
      <PackagePageHero
        eyebrow="Where to next"
        title="Tour Packages"
        description="Handpicked holiday packages across the region and beyond — flights, hotels and sightseeing bundled in."
      />
      <section className="py-12 sm:py-16">
        <div className="container-app">
          <PackageGridWithTabs categories={tourCategories} packages={tourPackages} />
        </div>
      </section>
    </>
  );
}