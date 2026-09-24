import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContentCard } from "@/components/ui/ContentCard";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/features/home/types";

export function TravelBlogSection({ posts }: { posts: BlogPost[] }) {
  const visiblePosts = posts.slice(0, 4);

  return (
    <section aria-labelledby="travel-blog-heading" className="py-14 sm:py-20">
      <div className="container-app">
        <SectionHeading
          id="travel-blog-heading"
          eyebrow="Read before you fly"
          title="Travel Blog"
          description="Travel tips, destination guides and booking advice from our team."
          viewAllHref="/blog"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visiblePosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.06}>
              <ContentCard
                href={post.href}
                image={post.coverImage}
                imageAlt={post.title}
                title={post.title}
                subtitle={`${formatDate(post.publishedAt)} · ${post.author}`}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
