import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Headphones, ShieldCheck } from "lucide-react";
import type { NewsItem } from "@/features/content/types";
import { formatDate } from "@/lib/utils";

export function NewsDetailView({ item }: { item: NewsItem }) {
  return (
    <article>
      <section className="relative">
        <div className="relative h-[220px] w-full overflow-hidden md:h-[380px] lg:h-[460px]">
          <Image src={item.coverImage} alt={item.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/35 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-neutral-950/70 to-transparent" />
        </div>
        <div className="container-app relative -mt-12 pb-6 md:-mt-24 md:pb-10">
          <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-neutral-100 md:p-8">
            <Link href="/news" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Back to News
            </Link>
            <h1 className="mt-3 max-w-4xl font-heading text-xl font-bold leading-snug text-neutral-900 md:mt-4 md:text-3xl lg:text-4xl">{item.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-500 md:mt-4 md:gap-3 md:text-sm">
              <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-[10px] font-bold text-primary-700 md:px-3 md:py-1 md:text-xs">{item.tag}</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-primary-600 md:h-4 md:w-4" aria-hidden />
                {formatDate(item.publishedAt)}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-6 md:py-14">
        <div className="container-app grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-12">
          <div>
            <p className="max-w-3xl border-l-4 border-primary-500 pl-3 text-sm font-medium leading-6 text-neutral-800 md:pl-4 md:text-lg md:leading-8">{item.summary}</p>
            <div className="mt-5 max-w-3xl space-y-3 text-[13px] leading-6 text-neutral-600 md:mt-8 md:space-y-5 md:text-base md:leading-7">
              <p>ST Trip continues to expand its travel services with a focus on simpler planning, dependable support and useful tools for travellers from Bangladesh.</p>
              <p>For the latest details, availability or support related to this update, contact our team through the Help Centre before making a booking.</p>
            </div>
          </div>
          <aside className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm md:p-6 lg:sticky lg:top-24">
            <h2 className="font-heading text-base font-bold text-neutral-900 md:text-lg">Have questions about this update?</h2>
            <p className="mt-1.5 text-xs leading-5 text-neutral-600 md:text-sm md:leading-6">Our team is happy to help you before you book.</p>
            <Link href="/help/faq" className="mt-4 flex h-11 items-center justify-center gap-2 rounded-md bg-primary-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-700 md:mt-5 md:h-12">
              Contact Support
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <div className="mt-4 space-y-2.5 border-t border-neutral-100 pt-4 text-xs text-neutral-500 md:mt-5 md:pt-5">
              <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary-600" aria-hidden /> Secure booking support</p>
              <p className="flex items-center gap-2"><Headphones className="h-4 w-4 text-primary-600" aria-hidden /> 24/7 travel assistance</p>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}
