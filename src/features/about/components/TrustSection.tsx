import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { trustPoints } from "@/features/about/data/about";

export function TrustSection() {
  return (
    <section className="py-10 md:py-20" aria-labelledby="about-trust-title">
      <div className="container-app">
        <Reveal>
          <div className="rounded-sm bg-neutral-50 p-6 md:p-8">
            <h2
              id="about-trust-title"
              className="font-heading text-xl font-bold text-neutral-900 sm:text-2xl"
            >
              Built on Trust
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-neutral-500 sm:text-base">
              A few commitments that stay true on every booking, regardless of destination.
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-neutral-600">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}