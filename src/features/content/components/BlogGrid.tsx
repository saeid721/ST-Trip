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
      <div role="tablist" aria-label="Blog categories" className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            role="tab"
            aria-selected={active === cat.value}
            onClick={() => setActive(cat.value)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
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
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <Reveal key={post.id} delay={(i % 9) * 0.05}>
              <ContentCard
                href={post.href}
                image={post.coverImage}
                imageAlt={post.title}
                title={post.title}
                subtitle={`${formatDate(post.publishedAt)} · ${post.author}`}
                priority={i < 3}
              />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}