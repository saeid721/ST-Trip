import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite" className="pt-[var(--header-height)]">
      {/* Hero skeleton */}
      <div className="relative h-[520px] w-full bg-neutral-100 sm:h-[560px]">
        <div className="container-app flex h-full flex-col items-center justify-center gap-4">
          <Skeleton className="h-6 w-72" />
          <Skeleton className="h-10 w-96 max-w-full" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
      </div>
      <div className="container-app relative -mt-20 sm:-mt-24">
        <Skeleton className="h-48 w-full rounded-2xl sm:h-40" />
      </div>

      {/* Trust badges */}
      <div className="container-app grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>

      {/* Generic card-grid sections */}
      {Array.from({ length: 3 }).map((_, section) => (
        <div key={section} className="container-app py-10">
          <Skeleton className="mb-6 h-8 w-56" />
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] w-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
