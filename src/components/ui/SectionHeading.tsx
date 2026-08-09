import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  id: string;
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
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-accent-600">
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
          {title}
        </h2>
        {description && <p className="mt-2 max-w-xl text-sm text-neutral-500">{description}</p>}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800"
        >
          View All
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}
