import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { DestinationDetailView } from '@/features/destinations/components/DestinationDetailView';
import { destinationDetails, getDestinationDetail } from '@/features/destinations/data/destinations';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(destinationDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const detail = getDestinationDetail(slug);
  return {
    title: `${detail.city}, ${detail.country} — Travel Guide & Hotels`,
    description: detail.tagline,
    alternates: { canonical: `${siteConfig.url}/destinations/${slug}` },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const detail = getDestinationDetail(slug);

  return (
    <DestinationDetailView
      detail={detail}
      backHref="/destinations"
      backLabel="Back to Destinations"
    />
  );
}

