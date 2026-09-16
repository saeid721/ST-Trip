import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { HelpArticleDetailView } from "@/features/content/components/HelpArticleDetailView";
import { helpTiles } from "@/features/home/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getArticle(slug: string) {
  return helpTiles.find((tile) => tile.href.endsWith(`/${slug}`));
}

export function generateStaticParams() {
  return helpTiles.map((tile) => ({ slug: tile.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return buildMetadata({ title: "Help Centre" });
  return buildMetadata({ title: article.title, description: `Learn ${article.title.toLowerCase()} with ST Trip.`, alternates: { canonical: `${siteConfig.url}${article.href}` } });
}

export default async function HelpArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <HelpArticleDetailView article={article} />;
}
