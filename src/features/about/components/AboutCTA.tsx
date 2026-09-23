import Link from "next/link";
import { MapPinned, PlaneTakeoff } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function AboutCTA() {
  return (
    <section className="pb-16 sm:pb-24">
      <div className="container-app">
        <Reveal>
          <div className="about-cta">
            <h2 className="about-cta__title font-heading font-bold">
              Your next journey starts here.
            </h2>
            <p className="about-cta__description">
              Search flights, browse tours, or start a hotel stay — all in one place.
            </p>
            <div className="about-cta__actions">
              <Link href="/tour" className="about-cta__btn about-cta__btn--primary">
                <MapPinned className="h-4 w-4" aria-hidden />
                Explore Tours
              </Link>
              <Link href="/flight" className="about-cta__btn about-cta__btn--ghost">
                <PlaneTakeoff className="h-4 w-4" aria-hidden />
                Book a Trip
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}