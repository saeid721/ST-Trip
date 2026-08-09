import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-[var(--header-height)] text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-700">
        <Compass className="h-8 w-8" aria-hidden />
      </span>
      <h1 className="mt-6 font-heading text-2xl font-bold text-neutral-900">
        Looks like you&apos;ve wandered off the map
      </h1>
      <p className="mt-2 max-w-sm text-sm text-neutral-500">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-primary-700 px-5 text-sm font-medium text-white transition-colors hover:bg-primary-800"
      >
        Back to Home
      </Link>
    </div>
  );
}
