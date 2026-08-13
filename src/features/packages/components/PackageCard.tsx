import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PackageCardProps {
  href: string;
  image: string;
  title: string;
  durationDays: number;
  priceFrom: number;
  badge?: string;
  nightsLabel?: string;
  priority?: boolean;
}

export function PackageCard({
  href,
  image,
  title,
  durationDays,
  priceFrom,
  badge,
  nightsLabel,
  priority = false,
}: PackageCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:var(--ease-out-soft)] hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
        {durationDays > 0 && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-primary-700 shadow-sm">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            {durationDays} Days
          </span>
        )}
        {badge && (
          <span className="absolute right-3 top-3 rounded-full bg-accent-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-base font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-primary-700">
          {title}
        </h3>
        {nightsLabel && (
          <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {nightsLabel}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-3 mt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-neutral-400">Starts from</p>
            <p className="font-heading text-lg font-bold text-primary-700">
              {formatCurrency(priceFrom)}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-lg bg-primary-50 px-3 py-2 text-xs font-semibold text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-white">
            View Details
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}