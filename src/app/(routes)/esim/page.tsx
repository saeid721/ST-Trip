import type { Metadata } from "next";
import { EsimResultsView } from "@/features/esim/components/EsimResultsView";
import { esimCountries, getCountry, getPlansForRegion, getRegion } from "@/features/esim/data/dummy";

export const metadata: Metadata = {
  title: "eSIM Plans | ST Trip",
  description: "Compare local eSIM plans for your next journey.",
};

type SearchParams = Promise<{
  country?: string;
  region?: string;
  countries?: string;
}>;

export default async function EsimPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const country = params.country ? getCountry(params.country) ?? esimCountries.find((item) => item.name.toLowerCase() === params.country?.toLowerCase()) : undefined;
  const region = params.region ? getRegion(params.region) : undefined;
  const requestedCodes = params.countries?.split(",").filter(Boolean) ?? [];
  const countryCodes = country ? [country.code] : region ? requestedCodes.filter((code) => region.countryCodes.includes(code)) : [];
  const selectedCountries = esimCountries.filter((item) => countryCodes.includes(item.code));
  const plans = region ? getPlansForRegion(region.id, countryCodes) : getPlansForRegion("", countryCodes);

  return <EsimResultsView region={region} countries={selectedCountries} plans={plans} />;
}