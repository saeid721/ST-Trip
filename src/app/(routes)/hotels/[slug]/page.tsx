import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hotelDetails } from "@/features/hotels/data/hotels";
import { HotelDetailView } from "@/features/hotels/components/HotelDetailView";

interface HotelPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return Object.keys(hotelDetails).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: HotelPageProps): Metadata {
  const detail = hotelDetails[params.slug];
  if (!detail) return {};
  return {
    title: detail.name,
    description: detail.overview,
  };
}

export default function HotelDetailPage({ params }: HotelPageProps) {
  const detail = hotelDetails[params.slug];
  if (!detail) notFound();

  return <HotelDetailView detail={detail} backHref="/hotels" backLabel="Back to All Hotels" />;
}