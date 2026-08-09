"use client";

import Link from "next/link";
import { ArrowRight, Ticket } from "lucide-react";
import { Carousel } from "@/components/ui/Carousel";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HotDeal } from "@/features/home/types";
import { trackEvent } from "@/lib/analytics";

export function HotDealsSection({ deals }: { deals: HotDeal[] }) {
  return (
    <section aria-labelledby="hot-deals-heading" className="py-14 sm:py-20">
      <div className="container-app">
        <SectionHeading
          id="hot-deals-heading"
          eyebrow="Limited time"
          title="Hot Deals"
          description="Bank offers and promo codes updated daily."
          viewAllHref="/offers"
        />

        <Carousel
          ariaLabel="Hot deals"
          slideClassName="basis-[85%] sm:basis-1/2 lg:basis-1/3"
        >
          {deals.map((deal) => (
            <Card key={deal.id} className="flex h-full flex-col p-5">
              <div className="mb-3 flex items-center justify-between">
                <Badge variant="primary">{deal.bankName}</Badge>
                <span className="rounded-full bg-accent-500 px-2.5 py-1 text-xs font-bold text-white">
                  {deal.discountLabel}
                </span>
              </div>
              <h3 className="font-heading text-sm font-semibold text-neutral-900">
                {deal.title}
              </h3>
              <p className="mt-1.5 flex-1 text-sm text-neutral-500">{deal.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-mono font-semibold text-neutral-700">
                  <Ticket className="h-3.5 w-3.5" aria-hidden />
                  {deal.promoCode}
                </span>
                <Link
                  href={deal.href}
                  onClick={() => trackEvent("hot_deal_clicked", { dealId: deal.id })}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800"
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </Card>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
