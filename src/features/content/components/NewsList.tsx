import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";
import type { NewsItem } from "@/features/content/types";

export function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, i) => {
        const isLatest = i === 0;
        return (
          <div key={item.id} className="[&>*]:h-full">
            <Reveal delay={i * 0.06}>
              <Link
                href={item.href}
                className={`group flex h-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md flex-col`}
              >
                <div className="relative aspect-[5/2] w-full shrink-0 overflow-hidden">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {isLatest && (
                    <span className="absolute left-2 top-2 rounded-full bg-neutral-900/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white md:text-[10px]">
                      Latest
                    </span>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-3 md:p-4">
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-neutral-400 md:gap-2 md:text-xs">
                    <span className="rounded-full bg-primary-50 px-2 py-0.5 font-semibold text-primary-700">
                      {item.tag}
                    </span>
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                  <h3 className="mt-2 line-clamp-2 font-heading text-sm font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-primary-700 md:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500 md:text-[13px]">
                    {item.summary}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-2.5 text-xs font-semibold text-primary-700 md:pt-3 md:text-sm">
                    Read More
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 md:h-3.5 md:w-3.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}