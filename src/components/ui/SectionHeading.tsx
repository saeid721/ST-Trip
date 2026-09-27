import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  viewAllHref?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  viewAllHref,
}: SectionHeadingProps) {
  return (
    <div className="mb-5 sm:mb-8">
      <div
        className={cn(
          "flex flex-nowrap items-start gap-2",
          viewAllHref ? "justify-between" : "flex-col items-center text-center",
        )}
      >
        <div className={cn("min-w-0", viewAllHref ? "flex-1" : "flex-none")}>
          {eyebrow && (
            <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-accent-600 sm:text-sm">
              {eyebrow}
            </p>
          )}
          <h2 id={id} className="font-heading text-base font-bold text-neutral-900 sm:text-xl lg:text-2xl">
            {title}
          </h2>
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-semibold text-primary-700 hover:text-primary-800 sm:text-sm"
          >
            Explore
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
          </Link>
        )}
      </div>
      {description && (
        <p
          className={cn(
            "mt-0.5 text-xs text-neutral-500 sm:text-sm",
            viewAllHref ? "w-full" : "mx-auto w-full max-w-2xl text-center",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
