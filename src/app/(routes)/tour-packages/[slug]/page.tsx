import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { PackageDetailView } from "@/features/packages/components/PackageDetailView";
import { tourPackageDetails } from "@/features/packages/data/tour-package-details";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(tourPackageDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = tourPackageDetails[slug];
  if (!detail) return buildMetadata({ title: "Tour Package" });
  return buildMetadata({ title: detail.title, description: detail.overview });
}

export default async function TourPackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = tourPackageDetails[slug];
  if (!detail) notFound();

  return <PackageDetailView detail={detail} backHref="/tour-packages" backLabel="All Tour Packages" />;
}