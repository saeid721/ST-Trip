"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { fontVariables } from "@/lib/fonts";

export default function GlobalError({
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
    <html lang="en" className={fontVariables}>
      <body>
        <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 text-center">
          <div className="max-w-md rounded-md border border-neutral-200 bg-white p-8 shadow-sm">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent-600">
              <AlertTriangle className="h-7 w-7" aria-hidden />
            </span>
            <h1 className="mt-5 font-heading text-2xl font-bold text-neutral-900">
              Something went wrong
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              The page could not be loaded. Please try again, or return in a
              moment if the issue continues.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-primary-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
