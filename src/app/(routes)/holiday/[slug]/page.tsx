import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import {
  getHolidayPackageDetail,
  holidayPackages,
} from "@/features/holiday-packages/data/holiday-packages";
import { HolidayPackageDetailView } from "@/features/holiday-packages/components/HolidayPackageDetailView";

interface HolidayPackagePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return holidayPackages.map((pkg) => ({ slug: pkg.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: HolidayPackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getHolidayPackageDetail(slug);
  if (!detail) return {};
  return {
    title: detail.title,
    description: detail.overview,
    alternates: { canonical: `${siteConfig.url}/holiday-packages/${slug}` },
  };
}

export default async function HolidayPackageDetailPage({ params }: HolidayPackagePageProps) {
  const { slug } = await params;
  const detail = getHolidayPackageDetail(slug);
  if (!detail) notFound();

  return <HolidayPackageDetailView detail={detail} backHref="/" backLabel="Back to Home" />;
}