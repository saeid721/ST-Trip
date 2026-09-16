import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { OfferDetailView } from "@/features/content/components/OfferDetailView";
import { hotDeals } from "@/features/home/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getDeal(slug: string) {
  return hotDeals.find((deal) => deal.href.endsWith(`/${slug}`));
}

export function generateStaticParams() {
  return hotDeals.map((deal) => ({ slug: deal.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const deal = getDeal(slug);
  if (!deal) return buildMetadata({ title: "Travel Offers" });
  return buildMetadata({ title: deal.title, description: deal.description, alternates: { canonical: `${siteConfig.url}${deal.href}` } });
}

export default async function OfferDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const deal = getDeal(slug);
  if (!deal) notFound();
  return <OfferDetailView deal={deal} />;
}
