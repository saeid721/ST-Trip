"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqCategory, FaqEntry } from "@/features/content/types";

export function FaqSection({
  categories,
  faqs,
}: {
  categories: FaqCategory[];
  faqs: FaqEntry[];
}) {
  const [active, setActive] = useState(categories[0]?.value ?? "all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = useMemo(
    () => (active === "all" ? faqs : faqs.filter((f) => f.category === active)),
    [active, faqs],
  );

  return (
    <div>
      <div role="tablist" aria-label="FAQ categories" className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            role="tab"
            aria-selected={active === cat.value}
            onClick={() => {
              setActive(cat.value);
              setOpenIndex(0);
            }}
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

      <div className="mt-6 space-y-2.5">
        {filtered.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
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
                <p className="px-5 pb-4 text-sm leading-relaxed text-neutral-600">{faq.answer}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}