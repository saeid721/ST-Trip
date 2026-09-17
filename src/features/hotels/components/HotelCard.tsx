import Image from "next/image";
import Link from "next/link";
import { Eye, MapPin, Star } from "lucide-react";
import { getAmenityIcon } from "@/features/hotels/amenity-icons";
import { cn, formatCurrency } from "@/lib/utils";

interface HotelCardProps {
  href: string;
  image: string;
  name: string;
  location: string;
  priceFrom: number;
  rating: number;
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
  amenities,
  priority = false,
  className,
}: HotelCardProps) {
  const starCount = Math.min(5, Math.max(0, Math.round(rating)));

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm",
        "transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:var(--ease-out-soft)]",
        "hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:shadow-lg",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        {starCount > 0 && (
          <div className="mb-1.5 flex items-center gap-0.5" aria-label={`${starCount} out of 5 stars`}>
            {Array.from({ length: starCount }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" aria-hidden />
            ))}
          </div>
        )}

        <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-neutral-900">{name}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs uppercase tracking-wide text-neutral-500">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-neutral-400" aria-hidden />
          {location}
        </p>

        {amenities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {amenities.map((amenity) => {
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
          </div>
        )}

        <div className="mt-auto flex items-end justify-between border-t border-neutral-100 pt-3">
          <div>
            <p className="font-heading text-lg font-bold text-primary-700">{formatCurrency(priceFrom)}</p>
            <p className="text-[11px] text-neutral-400">per night</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-800 px-4 py-2 text-xs font-semibold text-white transition-colors group-hover:bg-primary-900">
            <Eye className="h-3.5 w-3.5" aria-hidden />
            View
          </span>
        </div>
      </div>
    </Link>
  );
}