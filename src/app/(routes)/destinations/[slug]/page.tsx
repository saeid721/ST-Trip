import { DestinationDetailView } from '@/features/destinations/components/DestinationDetailView';
import { destinationDetails } from '@/features/destinations/data/destinations';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export default function DestinationPage({ params }: Props) {
  const detail = destinationDetails[params.slug];
  if (!detail) {
    notFound();
  }

  return <DestinationDetailView detail={detail} />;
}
