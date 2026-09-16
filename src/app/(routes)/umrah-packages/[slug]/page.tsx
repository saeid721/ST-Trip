import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PackageDetailView } from "@/features/packages/components/PackageDetailView";
import { getUmrahPackageDetail } from "@/features/packages/data/umrah-package-details";
import { umrahPackages } from "@/features/packages/data/umrah-packages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return umrahPackages.map((pkg) => ({ slug: pkg.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getUmrahPackageDetail(slug);
  if (!detail) return buildMetadata({ title: "Umrah Package" });
  return buildMetadata({ title: detail.title, description: detail.overview, alternates: { canonical: `${siteConfig.url}/umrah-packages/${slug}` } });
}

export default async function UmrahPackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = getUmrahPackageDetail(slug);
  if (!detail) notFound();

  return <PackageDetailView detail={detail} backHref="/umrah-packages" backLabel="All Umrah Packages" />;
}