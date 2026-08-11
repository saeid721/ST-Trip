import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ContentCardProps {
  href: string;
  image: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  eyebrow?: string;
  priority?: boolean;
  aspect?: "square" | "portrait" | "landscape";
  className?: string;
}

const aspectClasses = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
};

/**
 * One generic card used by PopularHotels, TopDestinations, TravelBlog and
 * TopAirlines sections — avoids reimplementing image + overlay + hover-zoom
 * logic four times.
 */
export function ContentCard({
  href,
  image,
  imageAlt,
  title,
  subtitle,
  badge,
  rating,
  reviewCount,
  eyebrow,
  priority = false,
  aspect = "landscape",
  className,
}: ContentCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm",
        "transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:var(--ease-out-soft)]",
        "hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:shadow-lg",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden bg-neutral-100", aspectClasses[aspect])}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-accent-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            {badge}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-250 group-hover:opacity-100" />
      </div>
      <div className="p-4">
        {eyebrow && (
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-primary-600">
            {eyebrow}
          </p>
        )}
        <h3 className="font-heading text-base font-semibold text-neutral-900">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>}
        {typeof rating === "number" && (
          <div className="mt-2 flex items-center gap-1 text-sm text-neutral-600">
            <Star className="h-4 w-4 fill-warning text-warning" aria-hidden />
            <span className="font-medium text-neutral-800">{rating.toFixed(1)}</span>
            {reviewCount !== undefined && (
              <span className="text-neutral-400">({reviewCount} reviews)</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
