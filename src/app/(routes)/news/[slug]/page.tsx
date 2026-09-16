import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { NewsDetailView } from "@/features/content/components/NewsDetailView";
import { newsItems } from "@/features/content/data/news-items";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getNewsItem(slug: string) {
  return newsItems.find((item) => item.href.endsWith(`/${slug}`));
}

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) return buildMetadata({ title: "News" });
  return buildMetadata({ title: item.title, description: item.summary, alternates: { canonical: `${siteConfig.url}${item.href}` } });
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) notFound();
  return <NewsDetailView item={item} />;
}
