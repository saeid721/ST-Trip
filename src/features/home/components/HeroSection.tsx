import { siteConfig } from "@/config/site";
import { TravelSearchHero } from "@/features/home/components/TravelSearchHero";

export function HeroSection() {
  return (
    <TravelSearchHero
      eyebrow={siteConfig.tagline}
      title={siteConfig.taglineEn}
      description="Flights, hotels, tours, visa assistance and more — planned in one place."
      imageAlt="Aerial view of a tropical coastline, representing destinations bookable on ST Trip"
    />
  );
}
