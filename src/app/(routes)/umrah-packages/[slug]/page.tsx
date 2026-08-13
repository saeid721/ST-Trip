import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { PackageDetailView } from "@/features/packages/components/PackageDetailView";
import { umrahPackageDetails } from "@/features/packages/data/umrah-package-details";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(umrahPackageDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = umrahPackageDetails[slug];
  if (!detail) return buildMetadata({ title: "Umrah Package" });
  return buildMetadata({ title: detail.title, description: detail.overview });
}

export default async function UmrahPackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = umrahPackageDetails[slug];
  if (!detail) notFound();

  return <PackageDetailView detail={detail} backHref="/umrah-packages" backLabel="All Umrah Packages" />;
}