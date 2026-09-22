import Link from "next/link";
import { ArrowLeft, CheckCircle2, Copy, Ticket } from "lucide-react";
import type { HotDeal } from "@/features/home/types";
import { formatDate } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";

export function OfferDetailView({ deal }: { deal: HotDeal }) {
  return (
    <>
      <PageHero
        eyebrow="Limited-time offer"
        title={deal.title}
        description={`${deal.bankName} · ${deal.discountLabel} savings on your next booking.`}
      />
      <article className="py-10 sm:py-16">
      <div className="container-app">
        <Link href="/offers" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Back to Offers
        </Link>
        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">{deal.bankName}</span>
              <span className="rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-white">{deal.discountLabel}</span>
            </div>
            <h1 className="mt-5 max-w-3xl font-heading text-2xl font-bold text-neutral-900 sm:text-4xl">{deal.title}</h1>
            <p className="mt-4 text-base leading-7 text-neutral-600">{deal.description}</p>
            <div className="mt-8 border-t border-neutral-100 pt-6">
              <h2 className="font-heading text-xl font-bold text-neutral-900">How to use this offer</h2>
              <ul className="mt-4 space-y-3">
                {["Check that your card or payment method is eligible", "Apply the promotion code at the required booking step", "Review the final payable amount and fare conditions", "Keep the confirmation and payment receipt until travel is complete"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-6 text-neutral-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="rounded-md border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Promotion code</p>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-md bg-neutral-100 px-4 py-3">
              <span className="inline-flex items-center gap-2 font-mono text-sm font-bold text-neutral-800"><Ticket className="h-4 w-4" aria-hidden />{deal.promoCode}</span>
              <Copy className="h-4 w-4 text-neutral-500" aria-hidden />
            </div>
            <p className="mt-4 text-sm text-neutral-600">Offer valid until {formatDate(deal.expiresAt)}. Terms, route restrictions and eligibility may apply.</p>
            <Link href="/flights" className="mt-6 flex h-12 items-center justify-center rounded-sm bg-primary-600 text-sm font-semibold text-white transition-colors hover:bg-primary-700">Search Flights</Link>
          </aside>
        </div>
      </div>
      </article>
    </>
  );
}
