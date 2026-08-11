"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-[var(--header-height)] text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-50 text-accent-600">
        <AlertTriangle className="h-8 w-8" aria-hidden />
      </span>
      <h1 className="mt-6 font-heading text-2xl font-bold text-neutral-900">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-sm text-sm text-neutral-500">
        We hit a snag loading this page. Please try again — if the problem
        continues, our support team is available 24/7.
      </p>
      <Button variant="primary" className="mt-6" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
