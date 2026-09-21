import { siteConfig } from "@/config/site";
import { TravelSearchHero } from "@/features/home/components/TravelSearchHero";

export function HeroSection() {
  return (
    <TravelSearchHero
      eyebrow={siteConfig.tagline}
      title={siteConfig.taglineEn}
      description="One platform, transparent pricing, 24/7 support — book in minutes."
      imageAlt="Aerial view of a tropical coastline, representing destinations bookable on ST Trip"
    />
  );
}
