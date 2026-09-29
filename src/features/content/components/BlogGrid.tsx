"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ContentCard } from "@/components/ui/ContentCard";
import { formatDate, cn } from "@/lib/utils";
import type { BlogCategory, BlogPostItem } from "@/features/content/types";

export function BlogGrid({
  categories,
  posts,
}: {
  categories: BlogCategory[];
  posts: BlogPostItem[];
}) {
  const [active, setActive] = useState(categories[0]?.value ?? "all");
  const filtered = active === "all" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      <div role="tablist" aria-label="Blog categories" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap md:overflow-visible md:pb-0">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            role="tab"
            aria-selected={active === cat.value}
            onClick={() => setActive(cat.value)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors md:px-4 md:py-2 md:text-sm",
              active === cat.value
                ? "bg-primary-600 text-white shadow-sm"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-neutral-500">
          No posts in this category yet — check back soon.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 md:mt-6 md:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4 [&>*]:h-full">
          {filtered.map((post, i) => (
            <Reveal key={post.id} delay={(i % 9) * 0.05}>
              <ContentCard
                href={post.href}
                image={post.coverImage}
                imageAlt={post.title}
                title={post.title}
                subtitle={`${formatDate(post.publishedAt)} · ${post.author}`}
                priority={i < 4}
                aspect="video"
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}