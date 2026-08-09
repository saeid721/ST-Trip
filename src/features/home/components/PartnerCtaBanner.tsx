import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function PartnerCtaBanner() {
  return (
    <section aria-labelledby="partner-cta-heading" className="py-14 sm:py-16">
      <div className="container-app">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-primary-700 to-primary-600 px-6 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <h2 id="partner-cta-heading" className="font-heading text-2xl font-bold text-white">
              Grow Your Business With Us
            </h2>
            <p className="mt-2 max-w-md text-sm text-primary-100">
              Partner with {siteConfig.name} to reach more travellers and boost your bookings.
            </p>
          </div>
          <Link
            href="/partner"
            className="inline-flex h-[52px] items-center gap-2 whitespace-nowrap rounded-lg bg-accent-500 px-7 text-base font-medium text-white shadow-md transition-colors hover:bg-accent-600"
          >
            Become a Partner
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
