import type { Metadata } from "next";
import { Shield, Heart, Compass, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { companyValues, milestones } from "@/features/about/data/about";

import { PageHero } from "@/components/ui/PageHero";
import { ServicesSection } from "@/features/about/components/ServicesSection";
import { WhyChooseSection } from "@/features/about/components/WhyChooseSection";
import { StatsBand } from "@/features/about/components/StatsBand";
import { JourneyTimeline } from "@/features/about/components/JourneyTimeline";
import { MissionVision } from "@/features/about/components/MissionVision";
import { TrustSection } from "@/features/about/components/TrustSection";
import { AboutCTA } from "@/features/about/components/AboutCTA";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: `Learn about ${siteConfig.name}'s mission, values, and journey since ${siteConfig.founded}.`,
});

const icons = { shield: Shield, heart: Heart, compass: Compass, sparkles: Sparkles } as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ST Trip"
        title={`Travel planned around you, not the other way around.`}
        description="ST Trip brings flights, hotels, tours and visa support into one place — with transparent pricing and a real team behind every booking."
      />


      {/* Who We Are */}
      <section className="py-8 md:py-14">
        <div className="container-app grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
              Who We Are
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
              {siteConfig.description} Since {siteConfig.founded}, {siteConfig.name} has helped
              travellers across Bangladesh book flights, hotels, tours and visas — always with
              transparent pricing and a real person on the other end when things get
              complicated.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
              Whether it&apos;s a weekend escape or a once-in-a-lifetime trip abroad, the goal
              stays the same: combine local expertise with modern technology so every journey
              starts smoothly.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
              {companyValues.map((value) => {
                const Icon = icons[value.icon as keyof typeof icons] ?? Sparkles;
                return (
                  <div key={value.id} className="rounded-md bg-primary-50 p-5 md:p-6">
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-5 w-5 shrink-0 text-primary-700" aria-hidden />
                      <p className="font-heading text-sm font-semibold text-neutral-900">
                        {value.title}
                      </p>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <ServicesSection />
      <WhyChooseSection />
      <StatsBand />
      <JourneyTimeline />
      <MissionVision />

      {/* Our Journey */}
      <section className="py-8 md:py-14">
        <div className="container-app">
          <h2 className="text-center font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
            Our Journey
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-6 border-l border-neutral-200 pl-6">
            {milestones.map((milestone, i) => (
              <Reveal key={milestone.title} delay={i * 0.08}>
                <div className="relative">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-white bg-primary-600 shadow" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                    {milestone.year}
                  </p>
                  <h3 className="mt-1 font-heading text-base font-semibold text-neutral-900">
                    {milestone.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">{milestone.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TrustSection />

      {/* Visit Us */}
      <section className="bg-neutral-50 py-8 md:py-14">
        <div className="container-app">
          <h2 className="text-center font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
            Visit Us
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {siteConfig.offices.map((office, i) => (
              <Reveal key={office.name} delay={i * 0.06}>
                <div className="h-full rounded-md border border-neutral-200 bg-white p-5">
                  <h3 className="font-heading text-sm font-semibold text-neutral-900">
                    {office.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">{office.address}</p>
                  <p className="mt-1.5 text-xs font-medium text-primary-700">{office.phone}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AboutCTA />
    </>
  );
}