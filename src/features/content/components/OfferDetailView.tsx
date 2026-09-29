import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2 } from "lucide-react";
import type { HotDeal } from "@/features/home/types";
import { formatDate } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { CopyCodeButton } from "@/features/content/components/CopyCodeButton";

function getDaysLeft(expiresAt: string) {
  const end = new Date(`${expiresAt}T23:59:59`).getTime();
  return Math.ceil((end - Date.now()) / 86_400_000);
}

export function OfferDetailView({ deal }: { deal: HotDeal }) {
  const daysLeft = getDaysLeft(deal.expiresAt);
  const expired = daysLeft < 0;
  const endingSoon = !expired && daysLeft <= 7;

  return (
    <>
      <PageHero
        eyebrow="Limited-time offer"
        title={deal.title}
        description={`${deal.bankName} · ${deal.discountLabel} savings on your next booking.`}
      />
      <article className="py-10 sm:py-16">
        <div className="container-app">
          <Link href="/promotions" className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Back to Promotions
          </Link>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">{deal.bankName}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold text-white ${expired ? "bg-neutral-400" : "bg-accent-500"}`}>{deal.discountLabel}</span>
                {expired && (
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">Expired</span>
                )}
              </div>
              <p className="mt-5 text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">{deal.description}</p>
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
            <aside className="order-first rounded-md border border-neutral-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24 lg:order-none">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Promotion code</p>
              <div className="mt-3 [&>button]:w-full [&>button]:justify-between">
                <CopyCodeButton code={deal.promoCode} disabled={expired} />
              </div>

              <p
                className={`mt-4 flex items-center gap-2 text-sm ${expired
                    ? "font-semibold text-red-600"
                    : endingSoon
                      ? "font-semibold text-amber-600"
                      : "text-neutral-600"
                  }`}
              >
                <CalendarDays className="h-4 w-4 shrink-0" aria-hidden />
                {expired
                  ? "This offer has ended"
                  : endingSoon
                    ? `Ends in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`
                    : `Valid until ${formatDate(deal.expiresAt)}`}
              </p>
              <p className="mt-2 text-xs leading-5 text-neutral-500">
                Terms, route restrictions and eligibility may apply.
              </p>

              {expired ? (
                <Link href="/promotions" className="mt-5 flex h-12 items-center justify-center rounded-md border border-primary-200 bg-primary-50 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-100">
                  Browse other promotions
                </Link>
              ) : (
                <Link href="/flights" className="mt-5 flex h-12 items-center justify-center rounded-md bg-primary-600 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
                  Search Flights
                </Link>
              )}
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
