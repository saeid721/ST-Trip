"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plane, Hotel, ShoppingBag, Gift, Globe2, Heart } from "lucide-react";

const items = [
  { label: "Flight", href: "/flights", icon: Plane },
  { label: "Hotel", href: "/hotels", icon: Hotel },
  { label: "Shop", href: "/shop", icon: ShoppingBag },
  { label: "Holiday", href: "/tour-packages", icon: Gift },
  { label: "Visa", href: "/visa", icon: Globe2 },
  { label: "More", href: "/others", icon: Heart },
];

export function MobileTabBar() {
  const pathname = usePathname() || "/";

  return (
    <div className="lg:hidden fixed bottom-4 left-1/2 z-50 w-[min(96%,720px)] -translate-x-1/2 rounded-3xl bg-white px-3 py-2 shadow-xl">
      <nav aria-label="Mobile tabs" className="flex items-center gap-2 overflow-x-auto">
        {items.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`inline-flex min-w-[72px] flex-col items-center gap-1 rounded-2xl px-3 py-2 text-center text-xs transition-colors ${
                active ? "text-primary-600" : "text-neutral-600"
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden />
              <span className="mt-1 leading-4">{label}</span>
              {active && <span className="mt-1 h-1 w-6 rounded-full bg-primary-600" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default MobileTabBar;
