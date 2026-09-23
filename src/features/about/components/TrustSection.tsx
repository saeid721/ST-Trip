import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { trustPoints } from "@/features/about/data/about";

export function TrustSection() {
  return (
    <section className="py-14 sm:py-20" aria-labelledby="about-trust-title">
      <div className="container-app">
        <Reveal>
          <div className="about-trust">
            <h2
              id="about-trust-title"
              className="font-heading text-xl font-bold text-neutral-900 sm:text-2xl"
            >
              Built on Trust
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-neutral-500 sm:text-base">
              A few commitments that stay true on every booking, regardless of destination.
            </p>

            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {trustPoints.map((point) => (
                <li key={point} className="about-trust__item">
                  <CheckCircle2 className="h-5 w-5" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/*
              Ready to extend: map real customer reviews / partner logos
              here once available — intentionally left out rather than
              filled with placeholder testimonials or awards.
            */}
          </div>
        </Reveal>
      </div>
    </section>
  );
}