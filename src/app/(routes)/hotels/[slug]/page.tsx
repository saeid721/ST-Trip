import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hotelDetails } from "@/features/hotels/data/hotels";
import { HotelDetailView } from "@/features/hotels/components/HotelDetailView";

interface HotelPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(hotelDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: HotelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = hotelDetails[slug];
  if (!detail) return {};
  return {
    title: detail.name,
    description: detail.overview,
  };
}

export default async function HotelDetailPage({ params }: HotelPageProps) {
  const { slug } = await params;
  const detail = hotelDetails[slug];
  if (!detail) notFound();

  return <HotelDetailView detail={detail} backHref="/hotels" backLabel="Back to All Hotels" />;
}