import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PackageDetailView } from "@/features/packages/components/PackageDetailView";
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
  return buildMetadata({ title: detail.title, description: detail.overview, alternates: { canonical: `${siteConfig.url}/tour-packages/${slug}` } });
}

export default async function TourPackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = getTourPackageDetail(slug);
  if (!detail) notFound();

  return <PackageDetailView detail={detail} backHref="/tour-packages" backLabel="All Tour Packages" />;
}