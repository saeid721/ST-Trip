import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { hotelDetails } from "@/features/hotels/data/hotels";
import { HotelDetailView } from "@/features/hotels/components/HotelDetailView";

interface HotelPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ checkIn?: string; checkOut?: string; rooms?: string; guests?: string }>;
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
    alternates: { canonical: `${siteConfig.url}/hotels/${slug}` },
  };
}

export default async function HotelDetailPage({ params, searchParams }: HotelPageProps) {
  const { slug } = await params;
  const detail = hotelDetails[slug];
  if (!detail) notFound();

  const search = await searchParams;
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 86_400_000);
  const toISODate = (d: Date) => d.toISOString().slice(0, 10);

  return (
    <HotelDetailView
      detail={detail}
      backHref="/hotels"
      backLabel="Back to All Hotels"
      searchContext={{
        checkIn: search.checkIn ?? toISODate(today),
        checkOut: search.checkOut ?? toISODate(tomorrow),
        rooms: Number(search.rooms) || 1,
        guests: Number(search.guests) || 2,
      }}
    />
  );
}