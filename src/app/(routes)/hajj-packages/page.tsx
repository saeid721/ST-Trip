import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PackagePageHero } from "@/features/packages/components/PackagePageHero";
import { PackageGridWithTabs } from "@/features/packages/components/PackageGridWithTabs";
import { hajjCategories, hajjPackages } from "@/features/packages/data/hajj-packages";

export const metadata: Metadata = buildMetadata({
  title: "Hajj Packages",
  description:
    "Compare Non-Shifting, Shifting and VIP Hajj packages from Bangladesh with transparent pricing and full guidance.",
});

export default function HajjPackagesPage() {
  return (
    <>
      <PackagePageHero
        eyebrow="Sacred Journey"
        title="Hajj Packages from Bangladesh"
        description="Guaranteed accommodation, verified guides and transparent pricing for every stage of your Hajj journey."
      />
      <section className="py-12 sm:py-16">
        <div className="container-app">
          <PackageGridWithTabs categories={hajjCategories} packages={hajjPackages} />
        </div>
      </section>
    </>
  );
}