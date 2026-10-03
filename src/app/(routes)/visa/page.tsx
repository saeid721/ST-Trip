import type { Metadata } from "next";
import {
  Clock3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { TravelSearchHero } from "@/features/home/components/TravelSearchHero";
import { VisaLanding } from "@/features/visa/components/VisaLanding";

export const metadata: Metadata = {
  title: "Visa requirements & application support",
};

interface PageProps {
  searchParams: Promise<{ q?: string | string[]; country?: string | string[]; type?: string | string[] }>;
}

const first = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value) ?? "";

export default async function VisaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = first(params.q) || first(params.country);
  const type = first(params.type);

  return (
    <div className="bg-neutral-50">
      <TravelSearchHero
        eyebrow="Visa assistance, made simple"
        title="Travel farther with the right visa guidance."
        description="Check entry requirements, understand your documents, and get application support from a team that knows the journey."
      />

      <main className="container-app py-8 sm:py-12">
        <VisaLanding key={`${query}|${type}`} initialQuery={query} initialCategory={type} />
      </main>
    </div>
  );
}

