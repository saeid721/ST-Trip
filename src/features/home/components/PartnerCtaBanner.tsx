import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
import { siteConfig } from "@/config/site";

export function PartnerCtaBanner() {
  return (
    <section aria-labelledby="partner-cta-heading" className="py-14 sm:py-16">
      <div className="container-app">
        <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-neutral-950 px-6 py-10 text-center sm:flex-row sm:text-left sm:px-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(135deg,white_0px,white_1px,transparent_1px,transparent_14px)]"
          />
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary-500/25 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 left-1/4 h-56 w-56 rounded-full bg-accent-500/15 blur-3xl" />

          <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-600/20 sm:flex">
              <Handshake className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-300">Partnership</p>
              <h2 id="partner-cta-heading" className="mt-1 font-heading text-2xl font-bold text-white">
                Grow Your Business With Us
              </h2>
              <p className="mt-2 max-w-md text-sm text-neutral-300">
                Partner with {siteConfig.name} to reach more travellers and boost your bookings.
              </p>
            </div>
          </div>

          <Link
            href="/partner"
            className="group relative inline-flex h-[52px] shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white px-7 text-base font-semibold text-neutral-950 shadow-md transition-colors hover:bg-primary-50"
          >
            Become a Partner
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}