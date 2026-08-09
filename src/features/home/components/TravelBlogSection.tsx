import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContentCard } from "@/components/ui/ContentCard";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/features/home/types";

export function TravelBlogSection({ posts }: { posts: BlogPost[] }) {
  return (
    <section aria-labelledby="travel-blog-heading" className="py-14 sm:py-20">
      <div className="container-app">
        <SectionHeading
          id="travel-blog-heading"
          eyebrow="Read before you fly"
          title="Travel Blog"
          viewAllHref="/blog"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <ContentCard
              key={post.id}
              href={post.href}
              image={post.coverImage}
              imageAlt={post.title}
              title={post.title}
              subtitle={`${formatDate(post.publishedAt)} · ${post.author}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
