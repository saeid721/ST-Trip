import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { TravelGuideDetailView } from "@/features/content/components/TravelGuideDetailView";
import { travelGuideDetails } from "@/features/content/data/travel-guide-details";
import { travelGuides } from "@/features/content/data/travel-guides";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(travelGuideDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = travelGuideDetails[slug];
  if (!guide) return buildMetadata({ title: "Travel Guide" });
  return buildMetadata({ title: guide.title, description: guide.intro });
}

export default async function TravelGuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = travelGuideDetails[slug];
  if (!guide) notFound();

  const relatedGuides = travelGuides.filter((g) => g.id !== `guide-${slug}`).slice(0, 3);

  return <TravelGuideDetailView guide={guide} relatedGuides={relatedGuides} />;
}