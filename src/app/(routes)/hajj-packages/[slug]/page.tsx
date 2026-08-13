import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { PackageDetailView } from "@/features/packages/components/PackageDetailView";
import { hajjPackageDetails } from "@/features/packages/data/hajj-package-details";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(hajjPackageDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = hajjPackageDetails[slug];
  if (!detail) return buildMetadata({ title: "Hajj Package" });
  return buildMetadata({ title: detail.title, description: detail.overview });
}

export default async function HajjPackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = hajjPackageDetails[slug];
  if (!detail) notFound();

  return <PackageDetailView detail={detail} backHref="/hajj-packages" backLabel="All Hajj Packages" />;
}