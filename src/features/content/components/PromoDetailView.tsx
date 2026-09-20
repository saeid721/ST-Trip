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
    eyebrow: "Flight savings",
    intro: "Make your next international journey more affordable with an exclusive City Bank American Express offer.",
    points: ["Save up to 18% on eligible international flight bookings", "Available for City Bank American Express Platinum and Gold cards", "Review fare rules and eligibility before completing payment"],
    ctaHref: "/flights",
    ctaLabel: "Search international flights",
  },
  "promo-2": {
    eyebrow: "Bank partner offer",
    intro: "Get BDT 4,000 off your next international booking when you pay with an eligible Eastern Bank card.",
    points: ["Save up to BDT 4,000 on qualifying bookings", "Minimum purchase value of BDT 40,000 applies", "Offer availability and fare conditions may vary by route"],
    ctaHref: "/flights",
    ctaLabel: "Find your flight",
  },
  "promo-3": {
    eyebrow: "Bangladesh getaway",
    intro: "Swap the busy week for a refreshing Sylhet escape with fares starting from BDT 2,499.",
    points: ["Explore tea gardens, waterfalls and peaceful hill views", "Starting fare is subject to availability and travel dates", "Reserve early for the best choice of seats and schedules"],
    ctaHref: "/flights",
    ctaLabel: "Search Sylhet flights",
  },
  "promo-4": {
    eyebrow: "Visa assistance",
    intro: "Planning to study abroad? Speak with a visa specialist and get practical guidance for your next step.",
    points: ["Discuss your destination, course and application timeline", "Get help understanding the required documents", "Receive clear guidance from an experienced travel team"],
    ctaHref: "/visa",
    ctaLabel: "Explore visa assistance",
  },
};

export function PromoDetailView({ banner }: { banner: PromoBanner }) {
  const detail = promoDetails[banner.id] ?? defaultPromoDetail;

  return (
    <article>
      <section className="relative overflow-hidden bg-neutral-950">
        <div className="relative h-[320px] sm:h-[440px] lg:h-[520px]">
          <Image src={banner.image} alt={banner.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/45 to-neutral-950/10" />
          <div className="container-app absolute inset-x-0 bottom-0 pb-10 sm:pb-14">
            <Link href="/" className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/20 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/15">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to Home
            </Link>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-200">{detail.eyebrow}</p>
            <h1 className="mt-3 max-w-4xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{banner.title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">{banner.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="container-app grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-12">
          <div>
            <p className="text-lg leading-8 text-neutral-700 sm:text-xl">{detail.intro}</p>
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

          <aside className="rounded-md border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
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