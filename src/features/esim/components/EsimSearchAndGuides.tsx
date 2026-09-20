import Link from "next/link";
import { Apple, HelpCircle, Play, Smartphone } from "lucide-react";
import { EsimSearchTab } from "@/features/home/components/SearchWidget/EsimSearchTab";

const deviceGuides = [
  { icon: Apple, label: "Install eSIM on iOS", href: "/help" },
  { icon: Smartphone, label: "Check Android eSIM support", href: "/help" },
  { icon: HelpCircle, label: "What devices support eSIM?", href: "/help" },
];

export function EsimSearchAndGuides() {
  return (
    <section className="rounded-md border border-neutral-200 bg-white p-5 shadow-floating sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Where are you travelling?</h2>
          <div className="mt-3">
            <EsimSearchTab />
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            <HelpCircle className="h-3.5 w-3.5 text-primary-600" aria-hidden /> Device guides
          </h2>
          <ul className="mt-3 space-y-1">
            {deviceGuides.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Link href={href} className="flex min-h-10 items-center gap-2.5 rounded-lg px-2 text-sm text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-700">
                  <Icon className="h-4 w-4 shrink-0 text-primary-600" aria-hidden /> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-neutral-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Setup guide</h2>
          <Link href="/help" className="group mt-3 block overflow-hidden rounded-md">
            <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-primary-800 via-primary-900 to-neutral-900">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary-700 shadow-md transition-transform group-hover:scale-105">
                <Play className="h-4 w-4 fill-current" aria-hidden />
              </span>
            </div>
          </Link>
          <p className="mt-2 text-sm font-medium text-neutral-800">How to install &amp; activate an eSIM</p>
          <p className="mt-1 text-xs text-neutral-500">Scan the QR code and get connected in under 2 minutes on iOS and Android.</p>
        </div>
      </div>
    </section>
  );
}