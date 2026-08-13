import type { Metadata } from "next";
import Link from "next/link";
import { BadgeDollarSign, Headset, ShieldCheck, GraduationCap, Network, Zap, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { reasons } from "@/features/content/data/why-sttrip";

export const metadata: Metadata = buildMetadata({
  title: "Why STTrip?",
  description: `Discover why hundreds of thousands of travellers choose ${siteConfig.name} for flights, hotels, tours and visas.`,
});

const icons = {
  price: BadgeDollarSign,
  support: Headset,
  secure: ShieldCheck,
  expert: GraduationCap,
  network: Network,
  speed: Zap,
} as const;

export default function WhySTTripPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Choose Us"
        title={`Why Travel With ${siteConfig.name}?`}
        description="Six reasons travellers across Bangladesh trust us with their journeys, big and small."
      />

      <section className="py-14 sm:py-20">
        <div className="container-app grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => {
            const Icon = icons[reason.icon];
            return (
              <Reveal key={reason.id} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-neutral-200 bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:var(--ease-out-soft)] hover:-translate-y-1 hover:border-primary-200 hover:shadow-md">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-neutral-900">
                    {reason.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                    {reason.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-app">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-primary-700 to-primary-600 px-6 py-10 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Ready to plan your next trip?
              </h2>
              <p className="mt-2 max-w-md text-sm text-primary-100">
                Compare flights, hotels and tour packages in one place — booking takes minutes.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex h-[52px] items-center gap-2 whitespace-nowrap rounded-lg bg-white px-7 text-base font-semibold text-primary-600 shadow-md transition-colors hover:bg-neutral-50"
            >
              Start Searching
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}