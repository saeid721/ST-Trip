import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Headphones, ShieldCheck } from "lucide-react";
import type { PromoBanner } from "@/features/home/types";

type PromoDetail = { eyebrow: string; intro: string; points: string[]; ctaHref: string; ctaLabel: string };

const defaultPromoDetail: PromoDetail = {
  eyebrow: "Travel offer",
  intro: "Plan your next journey with practical support and a better way to book.",
  points: ["Check availability for your preferred travel dates", "Review the applicable terms before payment", "Contact our team if you need help"],
  ctaHref: "/flights",
  ctaLabel: "Start planning",
};

const promoDetails: Record<string, PromoDetail> = {
  "promo-1": {
    eyebrow: "Hotels & resorts",
    intro: "Book domestic hotels and resorts across Bangladesh and pay with bKash to get the offer rate.",
    points: ["Choose from hotels and resorts in popular destinations", "Pay with bKash at checkout to claim the offer rate", "Check availability, dates and offer terms before you pay"],
    ctaHref: "/hotels",
    ctaLabel: "Browse hotels",
  },
  "promo-2": {
    eyebrow: "Flight fares",
    intro: "Book your flight at the best rate, with great fares for the whole family.",
    points: ["Compare fares and schedules for every traveller", "Pick dates that suit the whole family", "Review fare rules and baggage allowance before payment"],
    ctaHref: "/flights",
    ctaLabel: "Search flights",
  },
  "promo-3": {
    eyebrow: "Student fare",
    intro: "Affordable flights for students, with extra baggage allowance included.",
    points: ["Special student fares with extra baggage", "Eligibility and required documents may apply", "Fare and baggage details vary by airline and route"],
    ctaHref: "/flights",
    ctaLabel: "Find student fares",
  },
  "promo-4": {
    eyebrow: "Domestic flights",
    intro: "Fly within Bangladesh and save more when you pay with Nagad.",
    points: ["Attractive savings on eligible domestic flights", "Pay with Nagad at checkout to claim the offer", "Review offer terms and fare conditions before payment"],
    ctaHref: "/flights",
    ctaLabel: "Search domestic flights",
  },
  "promo-5": {
    eyebrow: "Curated packages",
    intro: "Explore Bangladesh with tour packages planned around real destinations.",
    points: ["Hand-picked packages for popular destinations", "Flexible options to match your dates and budget", "Talk to our team to customise your trip"],
    ctaHref: "/tours",
    ctaLabel: "Explore tours",
  },
  "promo-6": {
    eyebrow: "Domestic flights",
    intro: "Book domestic flights at the best rate and pay with bKash for exclusive savings.",
    points: ["Competitive fares on domestic routes", "Pay with bKash at checkout for extra savings", "Check offer terms and fare rules before you pay"],
    ctaHref: "/flights",
    ctaLabel: "Search domestic flights",
  },
  "promo-7": {
    eyebrow: "Hotels & resorts",
    intro: "Book domestic hotels and resorts with best rates guaranteed.",
    points: ["Verified stays across Bangladesh", "Compare rooms, prices and locations in one place", "Review cancellation and offer terms before you pay"],
    ctaHref: "/hotels",
    ctaLabel: "Browse hotels",
  },
};

export function PromoDetailView({ banner }: { banner: PromoBanner }) {
  const detail = promoDetails[banner.id] ?? defaultPromoDetail;

  return (
    <article>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-700 to-primary-600 pt-[calc(var(--header-height)+1.5rem)] pb-8 sm:pt-[calc(var(--header-height)+2.5rem)] sm:pb-14">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="container-app relative">
          <Link
            href="/promotions"
            className="mb-5 inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Promotions
          </Link>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-100 sm:text-xs">{detail.eyebrow}</p>
          <h1 className="mt-2 max-w-4xl font-heading text-2xl font-bold leading-tight text-white sm:mt-3 sm:text-4xl lg:text-5xl">{banner.title}</h1>
          {banner.subtitle && (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:mt-4 sm:text-base sm:leading-7">{banner.subtitle}</p>
          )}
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="container-app grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-12">
          <div>
            <div className="relative aspect-[5/2] overflow-hidden rounded-2xl bg-neutral-100 shadow-md ring-1 ring-black/5 sm:rounded-lg">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover"
              />
            </div>
            <p className="mt-6 text-base leading-7 text-neutral-700 sm:mt-8 sm:text-xl sm:leading-8">{detail.intro}</p>
            <div className="mt-8 border-t border-neutral-200 pt-8">
              <h2 className="font-heading text-2xl font-bold text-neutral-900">What you need to know</h2>
              <ul className="mt-5 space-y-4">
                {detail.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-7 text-neutral-600 sm:text-base">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary-600" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
            <h2 className="font-heading text-xl font-bold text-neutral-900">Ready to get started?</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">Our team is here to help you choose the right option and complete your booking with confidence.</p>
            <Link href={detail.ctaHref} className="mt-6 flex h-12 items-center justify-center gap-2 rounded-md bg-primary-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
              {detail.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <div className="mt-6 space-y-3 border-t border-neutral-100 pt-5 text-xs text-neutral-500">
              <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary-600" aria-hidden /> Secure booking support</p>
              <p className="flex items-center gap-2"><Headphones className="h-4 w-4 text-primary-600" aria-hidden /> 24/7 travel assistance</p>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}