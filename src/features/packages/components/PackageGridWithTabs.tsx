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
      <div role="tablist" aria-label="Package categories" className="flex flex-wrap gap-2">
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
          No packages found in this category yet — check back soon.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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