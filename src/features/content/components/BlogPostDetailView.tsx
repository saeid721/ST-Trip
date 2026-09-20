"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  Facebook,
  Link2,
  MapPin,
  Share2,
  UserRound,
} from "lucide-react";
import { ContentCard } from "@/components/ui/ContentCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn, formatDate } from "@/lib/utils";
import type { BlogPostDetail, BlogPostItem } from "@/features/content/types";

interface BlogPostDetailViewProps {
  post: BlogPostDetail;
  relatedPosts: BlogPostItem[];
}

export function BlogPostDetailView({ post, relatedPosts }: BlogPostDetailViewProps) {
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be unavailable in some browsers/contexts.
    }
  };

  const shareUrl = encodeURIComponent(`https://www.sttrip.com.bd/blog/${post.slug}`);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <article>
      <section className="relative overflow-hidden bg-neutral-950">
        <div className="relative h-[360px] sm:h-[480px] lg:h-[560px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/10" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-950 to-transparent" />
        </div>

        <div className="container-app relative -mt-36 pb-8 sm:-mt-44 sm:pb-12 lg:-mt-48">
          <Link
            href="/blog"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Blog
          </Link>
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-primary-600 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-lg">
              {post.category}
            </span>
            <h1 className="mt-4 max-w-4xl font-heading text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-white/80 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <UserRound className="h-4 w-4" aria-hidden />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" aria-hidden />
                {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" aria-hidden />
                {post.readTime}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden />
                {post.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14 lg:py-16">
        <div className="container-app">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-14">
            <div className="min-w-0">
              <div className="rounded-md border border-primary-100 bg-primary-50/70 p-5 sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary-700">Quick read</p>
                <p className="mt-2 text-sm leading-7 text-neutral-700 sm:text-[15px]">{post.intro}</p>
              </div>

              <div className="mt-8 space-y-9 sm:mt-10 sm:space-y-11">
                {post.sections.map((section, index) => (
                  <Reveal key={section.heading} delay={(index % 3) * 0.05}>
                    <section id={`section-${index}`} className="scroll-mt-24">
                      <h2 className="font-heading text-xl font-bold text-neutral-900 sm:text-2xl">
                        {index + 1}. {section.heading}
                      </h2>
                      <div className="mt-3 space-y-3">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="text-sm leading-7 text-neutral-600 sm:text-[15px] sm:leading-8">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </section>
                  </Reveal>
                ))}
              </div>

              <div className="mt-10 rounded-md border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
                <h2 className="font-heading text-lg font-bold text-neutral-900 sm:text-xl">Practical tips</h2>
                <ul className="mt-4 space-y-3">
                  {post.tips.map((tip) => (
                    <li key={tip} className="flex gap-3 text-sm leading-6 text-neutral-600">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-100 text-primary-700">
                        <Check className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 border-t border-neutral-200 pt-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">Found this useful?</p>
                    <p className="mt-1 text-xs text-neutral-500">Share it with your travel partner.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      aria-label="Share on Facebook"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 text-neutral-600 transition hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700"
                    >
                      <Facebook className="h-4 w-4" aria-hidden />
                    </a>
                    <a
                      aria-label="Share on X"
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                      target="_blank"
                      rel="noreferrer"
                      className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 text-neutral-600 transition hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700"
                    >
                      <Share2 className="h-4 w-4" aria-hidden />
                    </a>
                    <button
                      type="button"
                      onClick={copyLink}
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-neutral-200 px-4 text-xs font-semibold text-neutral-700 transition hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700"
                    >
                      {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                      {copied ? "Copied" : "Copy link"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-md bg-gradient-to-r from-primary-700 to-primary-600 p-6 text-white sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-100">Plan with ST Trip</p>
                <h2 className="mt-2 font-heading text-xl font-bold sm:text-2xl">Ready to turn the guide into a trip?</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-primary-50/90">Compare flights, hotels and travel services in one place, with support when you need it.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/flights" className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-primary-700 transition hover:-translate-y-0.5">
                    Search Flights <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link href="/hotels" className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15">
                    Find Hotels
                  </Link>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24">
              <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="font-heading text-sm font-bold text-neutral-900">In this article</p>
                  <Link2 className="h-4 w-4 text-primary-600" aria-hidden />
                </div>
                <nav className="mt-4 space-y-1.5" aria-label="Article sections">
                  {post.sections.map((section, index) => (
                    <a
                      key={section.heading}
                      href={`#section-${index}`}
                      className="block rounded-lg px-3 py-2 text-xs font-medium leading-5 text-neutral-600 transition hover:bg-primary-50 hover:text-primary-700"
                    >
                      {index + 1}. {section.heading}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="mt-4 rounded-md border border-neutral-200 bg-neutral-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">Author</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-primary-100 font-heading text-sm font-bold text-primary-700">
                    {post.author.split(" ").map((name) => name.charAt(0)).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{post.author}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">ST Trip Editorial Team</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-100 bg-neutral-50 py-12 sm:py-16">
        <div className="container-app">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-600">Keep reading</p>
              <h2 className="mt-1 font-heading text-2xl font-bold text-neutral-900">More from the ST Trip Blog</h2>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800">
              View all posts <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related, i) => (
              <Reveal key={related.id} delay={(i % 3) * 0.06}>
                <ContentCard
                  href={related.href}
                  image={related.coverImage}
                  imageAlt={related.title}
                  title={related.title}
                  subtitle={`${formatDate(related.publishedAt)} · ${related.author}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-app max-w-4xl">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-100 text-primary-700">
              <ChevronDown className="h-4 w-4" aria-hidden />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary-600">FAQ</p>
              <h2 className="font-heading text-xl font-bold text-neutral-900">Common questions</h2>
            </div>
          </div>
          <div className="mt-5 space-y-2">
            {post.faqs.map((faq, index) => {
              const open = faqOpen === index;
              return (
                <div key={faq.question} className="overflow-hidden rounded-md border border-neutral-200 bg-white">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setFaqOpen(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                  >
                    <span className="text-sm font-semibold text-neutral-900">{faq.question}</span>
                    <ChevronDown className={cn("h-4 w-4 shrink-0 text-neutral-500 transition-transform", open && "rotate-180")} aria-hidden />
                  </button>
                  {open && <p className="px-4 pb-4 text-sm leading-7 text-neutral-600 sm:px-5">{faq.answer}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}
