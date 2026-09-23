import { Compass, PlaneTakeoff, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

export function AboutHero() {
  return (
    <section className="about-hero container-app" aria-labelledby="about-hero-title">
      <div className="about-hero__grid">
        <Reveal>
          <span className="about-hero__eyebrow">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            About {siteConfig.name}
          </span>

          <h1 id="about-hero-title" className="about-hero__title font-heading font-bold">
            Travel planned around <em>you</em>, not the other way around.
          </h1>

          <p className="about-hero__description">
            {siteConfig.name} brings flights, hotels, tours and visa support into one
            place — with transparent pricing and a real team behind every booking, so
            planning a trip feels as easy as taking one.
          </p>

          <div className="about-hero__chips">
            <span className="about-hero__chip">
              <ShieldCheck className="h-4 w-4" aria-hidden /> Transparent pricing
            </span>
            <span className="about-hero__chip">
              <PlaneTakeoff className="h-4 w-4" aria-hidden /> 24/7 support
            </span>
            <span className="about-hero__chip">
              <Compass className="h-4 w-4" aria-hidden /> Flights · Hotels · Tours · Visa
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="about-hero__art" aria-hidden>
            <div className="about-hero__blob" />

            <svg
              className="about-hero__path"
              viewBox="0 0 400 300"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
            >
              <path
                d="M20 220 C 100 140, 180 260, 260 160 S 380 60, 380 60"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="2 10"
                strokeLinecap="round"
              />
            </svg>

            <PlaneTakeoff className="about-hero__plane h-10 w-10" />

            <div className="about-hero__card about-hero__card--one">
              <span className="about-hero__card-icon">
                <Compass className="h-4 w-4" />
              </span>
              Plan in minutes
            </div>

            <div className="about-hero__card about-hero__card--two">
              <span className="about-hero__card-icon">
                <ShieldCheck className="h-4 w-4" />
              </span>
              Secure checkout
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}