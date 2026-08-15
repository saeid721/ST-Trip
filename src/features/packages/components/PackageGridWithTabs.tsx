"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { PackageCard } from "@/features/packages/components/PackageCard";
import { cn } from "@/lib/utils";
import type { PackageCategory, PackageItem } from "@/features/packages/types";

export function PackageGridWithTabs({
  categories,
  packages,
}: {
  categories: PackageCategory[];
  packages: PackageItem[];
}) {
  const [active, setActive] = useState(categories[0]?.value ?? "all");
  const filtered = active === "all" ? packages : packages.filter((p) => p.category === active);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Package categories"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            role="tab"
            aria-selected={active === cat.value}
            onClick={() => setActive(cat.value)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors sm:px-4 sm:py-2",
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
          No packages found in this category yet — check back soon.
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((pkg, i) => (
            <Reveal key={pkg.id} delay={(i % 8) * 0.05}>
              <PackageCard
                href={pkg.href}
                image={pkg.image}
                title={pkg.title}
                durationDays={pkg.durationDays}
                priceFrom={pkg.priceFrom}
                badge={pkg.badge}
                nightsLabel={pkg.nightsLabel}
                priority={i < 4}
              />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}