"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock,
  MapPin,
  Sun,
  User,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ContentCard } from "@/components/ui/ContentCard";
import { cn, formatDate, slugify } from "@/lib/utils";
import type { TravelGuideDetail, TravelGuideItem } from "@/features/content/types";

interface TravelGuideDetailViewProps {
  guide: TravelGuideDetail;
  relatedGuides: TravelGuideItem[];
}

export function TravelGuideDetailView({ guide, relatedGuides }: TravelGuideDetailViewProps) {
  const gallery = guide.gallery && guide.gallery.length > 0 ? guide.gallery : [guide.heroImage];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-[calc(var(--header-height)+1.5rem)]">
        <div className="relative h-[320px] w-full overflow-hidden sm:h-[420px]">
          <Image
            src={guide.heroImage}
            alt={guide.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-neutral-900/10" />
        </div>

        <div className="container-app relative -mt-24 sm:-mt-28">
          <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
            <Link
              href="/travel-guide"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              All Travel Guides
            </Link>

            <span className="mt-3 inline-block rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
              {guide.region}
            </span>
            <h1 className="mt-3 font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
              {guide.title}
            </h1>
            <p className="mt-1.5 text-sm text-neutral-500">{guide.subtitle}</p>

            <div className="mt-5 flex flex-wrap gap-4 border-t border-neutral-100 pt-5 text-sm text-neutral-600">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary-600" aria-hidden />
                {guide.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-primary-600" aria-hidden />
                {formatDate(guide.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary-600" aria-hidden />
                {guide.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 sm:py-16">
        <div className="container-app grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* Main content */}
          <div className="min-w-0 space-y-10">
            {gallery.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {gallery.slice(0, 3).map((src, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image
                      src={src}
                      alt={`${guide.title} photo ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 33vw, 300px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <p className="text-base leading-relaxed text-neutral-700">{guide.intro}</p>

            <div className="space-y-8">
              {guide.sections.map((section) => (
                <div key={section.heading} id={slugify(section.heading)} className="scroll-mt-28">
                  <h2 className="font-heading text-xl font-bold text-neutral-900">
                    {section.heading}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            {guide.tips.length > 0 && (
              <div className="rounded-2xl border border-primary-100 bg-primary-50 p-6">
                <h2 className="font-heading text-lg font-bold text-neutral-900">
                  Quick Tips
                </h2>
                <ul className="mt-3 space-y-2">
                  {guide.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-neutral-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {guide.faqs && guide.faqs.length > 0 && (
              <div>
                <h2 className="font-heading text-xl font-bold text-neutral-900">
                  Frequently Asked Questions
                </h2>
                <GuideFaqAccordion faqs={guide.faqs} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:h-fit lg:space-y-5">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-sm font-semibold text-neutral-900">
                Quick Facts
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-1.5 text-neutral-500">
                    <MapPin className="h-4 w-4 text-primary-600" aria-hidden />
                    Region
                  </dt>
                  <dd className="font-medium text-neutral-900">{guide.region}</dd>
                </div>
                {guide.bestTimeToVisit && (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-1.5 text-neutral-500">
                      <Sun className="h-4 w-4 text-primary-600" aria-hidden />
                      Best Time
                    </dt>
                    <dd className="text-right font-medium text-neutral-900">
                      {guide.bestTimeToVisit}
                    </dd>
                  </div>
                )}
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-1.5 text-neutral-500">
                    <Clock className="h-4 w-4 text-primary-600" aria-hidden />
                    Read Time
                  </dt>
                  <dd className="font-medium text-neutral-900">{guide.readTime}</dd>
                </div>
              </dl>
            </div>

            {guide.sections.length > 1 && (
              <div className="hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:block">
                <h3 className="font-heading text-sm font-semibold text-neutral-900">
                  On This Page
                </h3>
                <ul className="mt-3 space-y-2">
                  {guide.sections.map((section) => (
                    <li key={section.heading}>
                      <a
                        href={`#${slugify(section.heading)}`}
                        className="text-sm text-neutral-500 transition-colors hover:text-primary-700"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href="/"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-600 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Plan This Trip
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </aside>
        </div>
      </section>

      {/* Related guides */}
      {relatedGuides.length > 0 && (
        <section className="border-t border-neutral-100 bg-neutral-50 py-14 sm:py-16">
          <div className="container-app">
            <h2 className="font-heading text-xl font-bold text-neutral-900 sm:text-2xl">
              More Travel Guides
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.map((related, i) => (
                <Reveal key={related.id} delay={i * 0.06}>
                  <ContentCard
                    href={related.href}
                    image={related.coverImage}
                    imageAlt={related.title}
                    title={related.title}
                    subtitle={`${related.region} · ${related.readTime}`}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function GuideFaqAccordion({ faqs }: { faqs: NonNullable<TravelGuideDetail["faqs"]> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-3 space-y-2">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question} className="overflow-hidden rounded-xl border border-neutral-200">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
            >
              <span className="text-sm font-semibold text-neutral-900">{faq.question}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>
            {isOpen && (
              <p className="px-4 pb-3.5 text-sm leading-relaxed text-neutral-600">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}