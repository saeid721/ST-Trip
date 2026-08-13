import { Reveal } from "@/components/ui/Reveal";
import { ContentCard } from "@/components/ui/ContentCard";
import type { TravelGuideItem } from "@/features/content/types";

export function TravelGuideGrid({ guides }: { guides: TravelGuideItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide, i) => (
        <Reveal key={guide.id} delay={(i % 9) * 0.05}>
          <ContentCard
            href={guide.href}
            image={guide.coverImage}
            imageAlt={guide.title}
            title={guide.title}
            subtitle={`${guide.region} · ${guide.readTime}`}
            priority={i < 3}
          />
        </Reveal>
      ))}
    </div>
  );
}