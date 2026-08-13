import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { TravelGuideGrid } from "@/features/content/components/TravelGuideGrid";
import { travelGuides } from "@/features/content/data/travel-guides";

export const metadata: Metadata = buildMetadata({
  title: "Travel Guide",
  description: "Destination guides, packing checklists and local tips to help you plan smarter trips.",
});

export default function TravelGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Plan Smarter"
        title="Travel Guides"
        description="Destination breakdowns, packing lists and insider tips from our travel specialists."
      />
      <section className="py-12 sm:py-16">
        <div className="container-app">
          <TravelGuideGrid guides={travelGuides} />
        </div>
      </section>
    </>
  );
}