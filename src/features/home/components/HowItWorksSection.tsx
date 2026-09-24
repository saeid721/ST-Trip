import { SectionHeading } from "@/components/ui/SectionHeading";
import { CustomYouTubePlayer } from "@/components/ui/CustomYouTubePlayer";
import type { HelpTile } from "@/features/home/types";

export function HowItWorksSection({ tiles }: { tiles: HelpTile[] }) {
  return (
    <section aria-labelledby="how-it-works-heading" className="bg-neutral-50 py-14 sm:py-20">
      <div className="container-app">
        <SectionHeading
          id="how-it-works-heading"
          eyebrow="Getting started"
          title="How It Works"
          description="Short guides to help you book faster and save more."
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {tiles.map((tile) => (
            <CustomYouTubePlayer
              key={tile.id}
              videoId={tile.videoId}
              title={tile.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
