import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";
import type { NewsItem } from "@/features/content/types";

export function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <div className="space-y-5">
      {items.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.06}>
          <Link
            href={item.href}
            className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md sm:flex-row"
          >
            <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-64">
              <Image
                src={item.coverImage}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, 256px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="rounded-full bg-primary-50 px-2.5 py-1 font-semibold text-primary-700">
                  {item.tag}
                </span>
                <span>{formatDate(item.publishedAt)}</span>
              </div>
              <h3 className="mt-2.5 font-heading text-lg font-semibold text-neutral-900 transition-colors group-hover:text-primary-700">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{item.summary}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
                Read More
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}