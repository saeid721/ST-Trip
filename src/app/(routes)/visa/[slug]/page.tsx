import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { TravelSearchHero } from "@/features/home/components/TravelSearchHero";
import { VisaCountryView } from "@/features/visa/components/VisaCountryView";
import { getVisaDestination, visaDestinations } from "@/features/visa/data/visa-destinations";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return visaDestinations.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getVisaDestination(slug);
  if (!destination) return buildMetadata({ title: "Visa requirements" });

  return buildMetadata({
    title: `${destination.name} visa from Bangladesh: requirements & application`,
    description:
      destination.guide?.overview.intro ??
      `Documents, process and application support for a ${destination.name} visa from Bangladesh with ${siteConfig.name}.`,
    alternates: { canonical: `${siteConfig.url}/visa/${destination.slug}` },
  });
}

export default async function VisaCountryPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = getVisaDestination(slug);
  if (!destination) notFound();

  return (
    <div className="bg-neutral-50">
      <TravelSearchHero
        eyebrow="Visa assistance, made simple"
        title={`${destination.name} visa guide`}
        description={`Check entry requirements, understand your documents, and get ${destination.name} visa application support from a team that knows the journey.`}
      />

      <VisaCountryView destination={destination} />
    </div>
  );
}
