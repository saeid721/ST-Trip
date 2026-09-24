import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { TourPackageDetailView } from "@/features/packages/components/TourPackageDetailView";
import { getTourPackageDetail } from "@/features/packages/data/tour-package-details";
import { tourPackages } from "@/features/packages/data/tour-packages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return tourPackages.map((pkg) => ({ slug: pkg.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getTourPackageDetail(slug);
  if (!detail) return buildMetadata({ title: "Tour Package" });
  return buildMetadata({ title: detail.title, description: detail.overview, alternates: { canonical: `${siteConfig.url}/tour/${slug}` } });
}

export default async function TourPackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = getTourPackageDetail(slug);
  if (!detail) notFound();

  return <TourPackageDetailView detail={detail} backHref="/tour" backLabel="All Tour Packages" />;
}