import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PackageDetailView } from "@/features/packages/components/PackageDetailView";
import { getHajjPackageDetail } from "@/features/packages/data/hajj-package-details";
import { hajjPackages } from "@/features/packages/data/hajj-packages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return hajjPackages.map((pkg) => ({ slug: pkg.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getHajjPackageDetail(slug);
  if (!detail) return buildMetadata({ title: "Hajj Package" });
  return buildMetadata({ title: detail.title, description: detail.overview, alternates: { canonical: `${siteConfig.url}/hajj-packages/${slug}` } });
}

export default async function HajjPackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = getHajjPackageDetail(slug);
  if (!detail) notFound();

  return <PackageDetailView detail={detail} backHref="/hajj-packages" backLabel="All Hajj Packages" />;
}