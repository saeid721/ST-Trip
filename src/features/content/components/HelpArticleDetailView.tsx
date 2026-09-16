import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import type { HelpTile } from "@/features/home/types";

export function HelpArticleDetailView({ article }: { article: HelpTile }) {
  return (
    <article>
      <section className="relative">
        <div className="relative h-[280px] w-full overflow-hidden sm:h-[400px]">
          <Image src={article.thumbnail} alt={article.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/35 to-neutral-950/10" />
        </div>
        <div className="container-app relative -mt-20 pb-8 sm:-mt-28 sm:pb-12">
          <div className="max-w-3xl rounded-2xl bg-white p-6 shadow-lg sm:p-8">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Back to Home
            </Link>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-primary-600">Getting started</p>
            <h1 className="mt-2 font-heading text-2xl font-bold text-neutral-900 sm:text-4xl">{article.title}</h1>
            <p className="mt-3 text-sm leading-7 text-neutral-600 sm:text-base">
              A straightforward guide from the ST Trip team to help you complete this step with confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="container-app grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 space-y-8">
            <div>
              <h2 className="font-heading text-xl font-bold text-neutral-900 sm:text-2xl">What you need to know</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-600 sm:text-base">
                Start by choosing the service and travel dates that match your plans. Review the fare, room, or package conditions carefully, then keep your confirmation and contact details available after booking.
              </p>
            </div>
            <div className="rounded-2xl border border-primary-100 bg-primary-50 p-5 sm:p-6">
              <h2 className="font-heading text-lg font-bold text-neutral-900">A simple checklist</h2>
              <ul className="mt-4 space-y-3">
                {["Confirm your dates and traveller details", "Compare the available options and total price", "Review the conditions before payment", "Save your confirmation and contact support if anything changes"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-6 text-neutral-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="font-heading text-base font-bold text-neutral-900">Need help?</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">Our support team can walk you through the next step and answer questions before you pay.</p>
            <Link href="/help/faq" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800">
              Visit Help Centre
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </aside>
        </div>
      </section>
    </article>
  );
}
