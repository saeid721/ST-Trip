import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { holidayPackageDetails } from "@/features/holiday-packages/data/holiday-packages";
import { HolidayPackageDetailView } from "@/features/holiday-packages/components/HolidayPackageDetailView";

interface HolidayPackagePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(holidayPackageDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: HolidayPackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = holidayPackageDetails[slug];
  if (!detail) return {};
  return {
    title: detail.title,
    description: detail.overview,
  };
}

export default async function HolidayPackageDetailPage({ params }: HolidayPackagePageProps) {
  const { slug } = await params;
  const detail = holidayPackageDetails[slug];
  if (!detail) notFound();

  return <HolidayPackageDetailView detail={detail} backHref="/" backLabel="Back to Home" />;
}