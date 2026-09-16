import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { TravelGuideDetailView } from "@/features/content/components/TravelGuideDetailView";
import { getTravelGuideDetail } from "@/features/content/data/travel-guide-details";
import { travelGuides } from "@/features/content/data/travel-guides";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return travelGuides.map((guide) => ({ slug: guide.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getTravelGuideDetail(slug);
  if (!guide) return buildMetadata({ title: "Travel Guide" });
  return buildMetadata({ title: guide.title, description: guide.intro, alternates: { canonical: `${siteConfig.url}/travel-guide/${slug}` } });
}

export default async function TravelGuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getTravelGuideDetail(slug);
  if (!guide) notFound();

  const relatedGuides = travelGuides.filter((g) => g.href !== `/travel-guide/${slug}`).slice(0, 3);

  return <TravelGuideDetailView guide={guide} relatedGuides={relatedGuides} />;
}