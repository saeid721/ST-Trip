import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { NewsList } from "@/features/content/components/NewsList";
import { newsItems } from "@/features/content/data/news-items";

export const metadata: Metadata = buildMetadata({
  title: "News",
  description: "The latest announcements, product launches and partnerships from ST Trip.",
});

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Latest Updates"
        title="News & Announcements"
        description="What's new at ST Trip — product launches, partnerships and company updates."
      />
      <section className="py-6 md:py-12 lg:py-16">
        <div className="container-app">
          <NewsList items={newsItems} />
        </div>
      </section>
    </>
  );
}