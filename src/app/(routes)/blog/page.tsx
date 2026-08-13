import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { BlogGrid } from "@/features/content/components/BlogGrid";
import { blogCategories, blogPosts } from "@/features/content/data/blog-posts";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Travel guides, deal breakdowns and practical tips from the ST Trip team.",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Read Before You Fly"
        title="The ST Trip Blog"
        description="Guides, deals and tips to help you travel smarter and spend less."
      />
      <section className="py-12 sm:py-16">
        <div className="container-app">
          <BlogGrid categories={blogCategories} posts={blogPosts} />
        </div>
      </section>
    </>
  );
}