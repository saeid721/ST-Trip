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
    <section aria-labelledby="visa-spotlight-heading" className="bg-neutral-50 py-8 sm:py-20 lg:py-24">
      <div className="container-app">
        <SectionHeading
          id="visa-spotlight-heading"
          eyebrow="Visa assistance"
          title="Make the visa part of your journey easier"
          description="Explore visa support alongside your flights, hotels and holiday plans."
        />

        <div className="relative overflow-hidden rounded-[28px] border border-neutral-900 bg-neutral-950 text-white shadow-xl">
          <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-500/15 blur-3xl" />
          <div aria-hidden className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:32px_32px]"
          />

          <div className="relative grid gap-0 lg:grid-cols-[1.15fr_.85fr]">
            <div className="px-5 py-6 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-400/30 bg-primary-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-200 sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.14em]">
                <Globe2 className="h-3.5 w-3.5" aria-hidden />
                Visa desk
              </div>
              <h3 className="mt-3 max-w-2xl font-heading text-lg font-bold leading-snug sm:mt-5 sm:text-3xl sm:leading-tight lg:text-4xl">
                From destination research to visa preparation, keep your trip in one flow.
              </h3>
              <p className="mt-2 max-w-xl text-xs leading-5 text-white/70 sm:mt-4 sm:text-base sm:leading-6">
                Start with your destination, understand the requirements, then continue planning your flight and stay without leaving ST Trip.
              </p>
              <Link
                href="/visa"
                className="group mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-xs font-semibold text-neutral-950 transition hover:bg-primary-50 sm:mt-7 sm:min-h-11 sm:px-5 sm:text-sm"
              >
                Explore visa services
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/10 pt-4 sm:mt-10 sm:flex-nowrap sm:gap-x-4 sm:gap-6 sm:pt-6">
                {["Destination", "Requirements", "Application"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary-400/40 text-[11px] font-bold text-primary-300">
                      {i + 1}
                    </span>
                    <span className="text-xs font-medium text-white/60">{step}</span>
                    {i < 2 && <span className="ml-2 hidden h-px w-6 bg-white/15 md:block" aria-hidden />}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex flex-col justify-center border-t border-white/10 px-5 py-6 sm:px-10 sm:py-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-12">
              <span
                aria-hidden
                className="absolute right-5 top-5 rotate-6 rounded-md border-2 border-accent-400/40 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-accent-400/60 sm:right-6 sm:top-6 sm:px-2.5 sm:py-1 sm:text-[10px]"
              >
                Approved
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-200 sm:tracking-[0.18em]">What you can expect</p>
              <ul className="mt-3 space-y-2.5 sm:mt-5 sm:space-y-3">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs leading-5 text-white/80 transition-colors duration-300 hover:border-primary-400/30 hover:bg-white/[0.07] sm:p-3.5 sm:text-sm sm:leading-6"
                  >
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
