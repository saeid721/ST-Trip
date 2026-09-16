import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostDetailView } from "@/features/content/components/BlogPostDetailView";
import { blogPosts } from "@/features/content/data/blog-posts";
import { blogPostDetails } from "@/features/content/data/blog-post-details";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(blogPostDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostDetails[slug];
  if (!post) return buildMetadata({ title: "Blog" });

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${siteConfig.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: [{ url: post.coverImage, width: 1600, height: 900, alt: post.title }],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  });
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPostDetails[slug];
  if (!post) notFound();

  const relatedPosts = blogPosts
    .filter((item) => item.href !== `/blog/${slug}`)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImage],
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostDetailView post={post} relatedPosts={relatedPosts} />
    </>
  );
}
