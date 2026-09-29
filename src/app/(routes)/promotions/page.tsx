import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CopyCodeButton } from "@/features/content/components/CopyCodeButton";
import { hotDeals, promoBanners } from "@/features/home/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Travel Offers",
  description: "Explore the latest flight, hotel and travel offers from ST Trip.",
};

export const revalidate = 3600; // re-check expiry dates hourly

function getDaysLeft(expiresAt: string) {
  const end = new Date(`${expiresAt}T23:59:59`).getTime();
  return Math.ceil((end - Date.now()) / 86_400_000);
}

export default function OffersPage() {
  return (
    <>
      <PageHero
        eyebrow="Save more on every journey"
        title="Travel Offers"
        description="Discover current bank discounts, promo codes and limited-time savings for your next trip."
      />

      {/* Featured promotions */}
      <section className="pt-10 sm:pt-14" aria-labelledby="promo-title">
        <div className="container-app">
          <div className="mb-5 sm:mb-8">
            <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-primary-600 sm:text-sm">
              Featured promotions
            </p>
            <h2
              id="promo-title"
              className="font-heading text-base font-bold text-neutral-900 sm:text-xl lg:text-2xl"
            >
              Book more, pay less
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {promoBanners.map((banner, i) => (
              <Link
                key={banner.id}
                href={banner.href}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] sm:rounded-lg"
              >
                <div className="relative aspect-[5/2] overflow-hidden bg-neutral-100">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    priority={i < 2}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <h3 className="line-clamp-1 font-heading text-sm font-semibold text-neutral-900 sm:text-base">
                      {banner.title}
                    </h3>
                    {banner.subtitle && (
                      <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-neutral-500 sm:text-sm">
                        {banner.subtitle}
                      </p>
                    )}
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container-app">
          <div className="mb-5 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-primary-600 sm:text-sm">Handpicked for you</p>
              <h2 className="font-heading text-base font-bold text-neutral-900 sm:text-xl lg:text-2xl">Latest deals and promo codes</h2>
            </div>
            <p className="max-w-sm text-xs leading-5 text-neutral-500 sm:text-sm sm:leading-6">Use the code at checkout and review the offer terms before you pay.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {hotDeals.map((deal) => {
              const daysLeft = getDaysLeft(deal.expiresAt);
              const expired = daysLeft < 0;
              const endingSoon = !expired && daysLeft <= 7;

              return (
                <Card
                  key={deal.id}
                  className={`flex h-full flex-col p-5 transition-[transform,box-shadow,border-color] duration-300 sm:p-6 ${expired ? "opacity-60" : "hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg"
                    }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <Badge variant="primary">{deal.bankName}</Badge>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold text-white ${expired ? "bg-neutral-400" : "bg-accent-500"
                        }`}
                    >
                      {deal.discountLabel}
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-base font-bold leading-snug text-neutral-900 sm:mt-5 sm:text-lg">
                    {deal.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-neutral-600">{deal.description}</p>

                  <div className="mt-5 space-y-4 border-t border-neutral-100 pt-4 sm:mt-6">
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                      <CopyCodeButton code={deal.promoCode} disabled={expired} />
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs ${expired
                          ? "font-semibold text-red-600"
                          : endingSoon
                            ? "font-semibold text-amber-600"
                            : "text-neutral-500"
                          }`}
                      >
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                        {expired
                          ? "Expired"
                          : endingSoon
                            ? `Ends in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`
                            : `Until ${formatDate(deal.expiresAt)}`}
                      </span>
                    </div>

                    {expired ? (
                      <span className="inline-block text-sm font-medium text-neutral-400">
                        This offer has ended
                      </span>
                    ) : (
                      <Link
                        href={deal.href}
                        className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
                      >
                        View offer details
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}