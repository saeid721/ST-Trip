import { Headset, ShieldCheck, BadgeDollarSign, Award } from "lucide-react";
import type { TrustBadgeItem } from "@/features/home/types";

const icons = {
  support: Headset,
  secure: ShieldCheck,
  price: BadgeDollarSign,
  award: Award,
} as const;

export function TrustBadgesBar({ items }: { items: TrustBadgeItem[] }) {
  return (
    <section aria-label="Why book with us" className="border-b border-neutral-100 bg-white">
      <div className="container-app grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
        {items.map((item) => {
          const Icon = icons[item.id as keyof typeof icons] ?? ShieldCheck;
          return (
            <div key={item.id} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-900">{item.label}</p>
                <p className="text-xs text-neutral-500">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
