import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import type { NewsItem } from "@/features/content/types";
import { formatDate } from "@/lib/utils";

export function NewsDetailView({ item }: { item: NewsItem }) {
  return (
    <article>
      <section className="relative">
        <div className="relative h-[300px] w-full overflow-hidden sm:h-[460px]">
          <Image src={item.coverImage} alt={item.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/35 to-transparent" />
        </div>
        <div className="container-app relative -mt-24 pb-10 sm:-mt-32 sm:pb-14">
          <div className="max-w-4xl rounded-md bg-white p-6 shadow-lg sm:p-8">
            <Link href="/news" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Back to News
            </Link>
            <span className="mt-4 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">{item.tag}</span>
            <h1 className="mt-3 font-heading text-2xl font-bold text-neutral-900 sm:text-4xl">{item.title}</h1>
            <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500"><CalendarDays className="h-4 w-4 text-primary-600" aria-hidden />{formatDate(item.publishedAt)}</div>
          </div>
        </div>
      </section>
      <section className="py-8 sm:py-14">
        <div className="container-app max-w-3xl">
          <p className="text-base leading-8 text-neutral-700 sm:text-lg">{item.summary}</p>
          <div className="mt-8 space-y-5 text-sm leading-7 text-neutral-600 sm:text-base">
            <p>ST Trip continues to expand its travel services with a focus on simpler planning, dependable support and useful tools for travellers from Bangladesh.</p>
            <p>For the latest details, availability or support related to this update, contact our team through the Help Centre before making a booking.</p>
          </div>
          <Link href="/help/faq" className="mt-8 inline-flex items-center rounded-sm bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700">Contact Support</Link>
        </div>
      </section>
    </article>
  );
}
