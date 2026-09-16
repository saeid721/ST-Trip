import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { OfferDetailView } from "@/features/content/components/OfferDetailView";
import { PromoDetailView } from "@/features/content/components/PromoDetailView";
import { hotDeals } from "@/features/home/data";
import { promoBanners } from "@/features/home/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getDeal(slug: string) {
  return hotDeals.find((deal) => deal.href.endsWith(`/${slug}`));
}

function getPromo(slug: string) {
  return promoBanners.find((banner) => banner.href.endsWith(`/${slug}`));
}

export function generateStaticParams() {
  return [...hotDeals, ...promoBanners].map((item) => ({ slug: item.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const deal = getDeal(slug);
  const promo = getPromo(slug);
  if (!deal && !promo) return buildMetadata({ title: "Travel Offers" });
  if (promo) return buildMetadata({ title: promo.title, description: promo.subtitle, alternates: { canonical: `${siteConfig.url}${promo.href}` } });
  if (!deal) return buildMetadata({ title: "Travel Offers" });
  return buildMetadata({ title: deal.title, description: deal.description, alternates: { canonical: `${siteConfig.url}${deal.href}` } });
}

export default async function OfferDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const deal = getDeal(slug);
  const promo = getPromo(slug);
  if (!deal && !promo) notFound();
  if (promo) return <PromoDetailView banner={promo} />;
  if (!deal) notFound();
  return <OfferDetailView deal={deal} />;
}
