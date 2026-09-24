import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { CustomYouTubePlayer } from "@/components/ui/CustomYouTubePlayer";
import { helpTiles } from "@/features/home/data";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Short video guides to help you book faster and save more.",
};

export default function HowItWorksPage() {
  return (
      <>
        <PageHero
          eyebrow="Getting started"
          title={`How It Works`}
          description="Six reasons travellers across Bangladesh trust us with their journeys, big and small."
        />
  
    <section aria-labelledby="how-it-works-page-heading" className="bg-neutral-50 py-14 sm:py-20">
      <div className="container-app">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {helpTiles.map((tile, index) => (
            <CustomYouTubePlayer
              key={`${tile.id}-${index}`}
              videoId={tile.videoId}
              title={tile.title}
            />
          ))}
        </div>
      </div>
    </section>
    
    </>
  );
}