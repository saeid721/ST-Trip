import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  "Destination-focused visa information",
  "Clear document and process guidance",
  "Support when your application needs attention",
];

export function VisaSpotlightSection() {
  return (
    <section aria-labelledby="visa-spotlight-heading" className="bg-neutral-50 py-16 sm:py-20 lg:py-24">
      <div className="container-app">
        <SectionHeading
          id="visa-spotlight-heading"
          eyebrow="Visa assistance"
          title="Make the visa part of your journey easier"
          description="Explore visa support alongside your flights, hotels and holiday plans."
        />

        <div className="relative overflow-hidden rounded-[28px] bg-neutral-950 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          <div aria-hidden className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl" />
          <div aria-hidden className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-primary-200">
                <Globe2 className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-5 max-w-2xl font-heading text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                From destination research to visa preparation, keep your trip in one flow.
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
                Start with your destination, understand the requirements, then continue planning your flight and stay without leaving ST Trip.
              </p>
              <Link href="/visa" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-neutral-950 transition hover:bg-primary-50">
                Explore visa services
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-200">What you can expect</p>
              <ul className="mt-5 space-y-4">
                {points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-white/80">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
