"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Heart, MapPin, Star } from "lucide-react";
import { getAmenityIcon } from "@/features/hotels/amenity-icons";
import { cn, formatCurrency } from "@/lib/utils";

interface HotelCardProps {
  href: string;
  image: string;
  name: string;
  location: string;
  priceFrom: number;
  rating: number;
  reviewCount?: number;
  badge?: string;
  amenities: string[];
  priority?: boolean;
  className?: string;
}

export function HotelCard({
  href,
  image,
  name,
  location,
  priceFrom,
  rating,
  reviewCount,
  badge,
  amenities,
  priority = false,
  className,
}: HotelCardProps) {
  const [imgError, setImgError] = useState(false);
  const [saved, setSaved] = useState(false);
  const visibleAmenities = amenities.slice(0, 3);
  const extraAmenityCount = amenities.length - visibleAmenities.length;

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm",
        "transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:var(--ease-out-soft)]",
        "hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl focus-visible:-translate-y-1 focus-visible:shadow-xl",
        className,
      )}
    >
      <div className="relative aspect-[5/2] overflow-hidden bg-neutral-100">
        {!imgError ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            onError={() => setImgError(true)}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-primary-50 to-neutral-100 text-primary-300">
            <Building2 className="h-8 w-8" aria-hidden />
            <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">Photo unavailable</span>
          </div>
        )}

        {/* Top row: badge ribbon + wishlist toggle */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {badge ? (
            <span className="rounded-full bg-accent-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
              {badge}
            </span>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSaved((v) => !v);
            }}
            aria-pressed={saved}
            aria-label={saved ? "Remove from saved hotels" : "Save hotel"}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-500 shadow-sm backdrop-blur-sm transition-colors hover:text-danger"
          >
            <Heart className={cn("h-4 w-4", saved && "fill-danger text-danger")} aria-hidden />
          </button>
        </div>

        {/* Bottom-left: rating chip overlaid on the photo */}
        {rating > 0 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold text-neutral-900 shadow-sm backdrop-blur-sm">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" aria-hidden />
            {rating.toFixed(1)}
            {typeof reviewCount === "number" && reviewCount > 0 && (
              <span className="font-medium text-neutral-400">({reviewCount})</span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-neutral-900">{name}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs uppercase tracking-wide text-neutral-500">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-neutral-400" aria-hidden />
          {location}
        </p>

        {visibleAmenities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {visibleAmenities.map((amenity) => {
              const Icon = getAmenityIcon(amenity);
              return (
                <span
                  key={amenity}
                  className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-600"
                >
                  <Icon className="h-3 w-3" aria-hidden />
                  {amenity}
                </span>
              );
            })}
            {extraAmenityCount > 0 && (
              <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-500">
                +{extraAmenityCount} more
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between border-t border-neutral-100 pt-3">
          <div>
            <p className="font-heading text-lg font-bold text-primary-700">{formatCurrency(priceFrom)}</p>
            <p className="text-[11px] text-neutral-400">per night</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-800 px-4 py-2 text-xs font-semibold text-white transition-colors group-hover:bg-primary-900">
            View
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}