import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Ticket } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { hotDeals } from "@/features/home/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Travel Offers",
  description: "Explore the latest flight, hotel and travel offers from ST Trip.",
};

export default function OffersPage() {
  return (
    <>
      <PageHero
        eyebrow="Save more on every journey"
        title="Travel Offers"
        description="Discover current bank discounts, promo codes and limited-time savings for your next trip."
      />

      <section className="py-12 sm:py-16">
        <div className="container-app">
          <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-600">Handpicked for you</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">Latest deals and promo codes</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-neutral-500">Use the code at checkout and review the offer terms before you pay.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hotDeals.map((deal) => (
              <Card key={deal.id} className="flex h-full flex-col p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <Badge variant="primary">{deal.bankName}</Badge>
                  <span className="rounded-full bg-accent-500 px-2.5 py-1 text-xs font-bold text-white">{deal.discountLabel}</span>
                </div>
                <h2 className="mt-5 font-heading text-lg font-bold leading-snug text-neutral-900">{deal.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-neutral-600">{deal.description}</p>

                <div className="mt-6 space-y-3 border-t border-neutral-100 pt-4">
                  <div className="flex items-center justify-between gap-3 text-xs text-neutral-500">
                    <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-neutral-700">
                      <Ticket className="h-4 w-4 text-primary-600" aria-hidden />
                      {deal.promoCode}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                      Until {formatDate(deal.expiresAt)}
                    </span>
                  </div>
                  <Link href={deal.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800">
                    View offer details
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}