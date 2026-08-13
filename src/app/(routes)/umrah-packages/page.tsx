import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PackagePageHero } from "@/features/packages/components/PackagePageHero";
import { PackageGridWithTabs } from "@/features/packages/components/PackageGridWithTabs";
import { umrahCategories, umrahPackages } from "@/features/packages/data/umrah-packages";

export const metadata: Metadata = buildMetadata({
  title: "Umrah Packages",
  description:
    "Affordable Umrah packages from Bangladesh with flexible durations, Makkah & Madinah stays, and 24/7 support.",
});

export default function UmrahPackagesPage() {
  return (
    <>
      <PackagePageHero
        eyebrow="Perform Your Umrah"
        title="Umrah Packages from Bangladesh"
        description="Economy to premium options — pick a duration, see what's included, and book with confidence."
      />
      <section className="py-12 sm:py-16">
        <div className="container-app">
          <PackageGridWithTabs categories={umrahCategories} packages={umrahPackages} />
        </div>
      </section>
    </>
  );
}