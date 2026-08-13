import type { Metadata } from "next";
import { Shield, Heart, Compass, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { companyValues, milestones } from "@/features/content/data/about";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: `Learn about ${siteConfig.name}'s mission, values, and journey since ${siteConfig.founded}.`,
});

const icons = { shield: Shield, heart: Heart, compass: Compass, sparkles: Sparkles } as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={`The Story Behind ${siteConfig.name}`}
        description="We started with a simple belief — booking travel should be honest, fast, and stress-free."
      />

      <section className="py-14 sm:py-20">
        <div className="container-app grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
              Our Mission
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
              {siteConfig.description} Since {siteConfig.founded}, we've helped hundreds of
              thousands of travellers across Bangladesh book flights, hotels, tours and visas —
              always with transparent pricing and a real person on the other end of the line when
              things get complicated.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
              Whether it's a domestic weekend escape, an international holiday, or a once-in-a-
              lifetime Hajj journey, our team combines local expertise with modern technology to
              make sure every trip starts smoothly.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-primary-50 p-6 text-center">
                <p className="font-heading text-3xl font-bold text-primary-700">
                  {new Date().getFullYear() - siteConfig.founded}+
                </p>
                <p className="mt-1 text-xs font-medium text-neutral-600">Years of Excellence</p>
              </div>
              <div className="rounded-2xl bg-primary-50 p-6 text-center">
                <p className="font-heading text-3xl font-bold text-primary-700">300K+</p>
                <p className="mt-1 text-xs font-medium text-neutral-600">Happy Travellers</p>
              </div>
              <div className="rounded-2xl bg-primary-50 p-6 text-center">
                <p className="font-heading text-3xl font-bold text-primary-700">
                  {siteConfig.offices.length}
                </p>
                <p className="mt-1 text-xs font-medium text-neutral-600">Offices Nationwide</p>
              </div>
              <div className="rounded-2xl bg-primary-50 p-6 text-center">
                <p className="font-heading text-3xl font-bold text-primary-700">24/7</p>
                <p className="mt-1 text-xs font-medium text-neutral-600">Support Availability</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-neutral-50 py-14 sm:py-20">
        <div className="container-app">
          <h2 className="text-center font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
            What We Stand For
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {companyValues.map((value, i) => {
              const Icon = icons[value.icon];
              return (
                <Reveal key={value.id} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-neutral-200 bg-white p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-heading text-base font-semibold text-neutral-900">
                      {value.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-app">
          <h2 className="text-center font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
            Our Journey
          </h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-8 border-l border-neutral-200 pl-6">
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

      <section className="bg-neutral-50 py-14 sm:py-20">
        <div className="container-app">
          <h2 className="text-center font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
            Visit Us
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.offices.map((office, i) => (
              <Reveal key={office.name} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-neutral-200 bg-white p-5">
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
    </>
  );
}