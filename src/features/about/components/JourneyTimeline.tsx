import { Compass, MousePointerClick, PlaneTakeoff, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { journeySteps, type IconKey } from "@/features/about/data/about";

const journeyIcons: Partial<Record<IconKey, typeof Compass>> = {
  compass: Compass,
  click: MousePointerClick,
  plane: PlaneTakeoff,
  sparkles: Sparkles,
};

export function JourneyTimeline() {
  return (
    <section className="py-8 md:py-14" aria-labelledby="about-journey-title">
      <div className="container-app">
        <Reveal>
          <h2
            id="about-journey-title"
            className="text-center font-heading text-2xl font-bold text-neutral-900 sm:text-3xl"
          >
            From Idea to Experience
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-neutral-500 sm:text-base">
            The same four steps, every time — however many services a trip needs.
          </p>
        </Reveal>

        <div className="relative mt-6 grid gap-0 md:mt-9 md:grid-cols-4 md:gap-6 md:before:absolute md:before:left-[12.5%] md:before:right-[12.5%] md:before:top-6 md:before:h-px md:before:border-t md:before:border-dashed md:before:border-primary-200 md:before:content-['']">
          {journeySteps.map((step, i) => {
            const Icon = journeyIcons[step.icon] ?? Compass;
            const isLast = i === journeySteps.length - 1;
            return (
              <Reveal key={step.id} delay={i * 0.08}>
                <div className="relative z-10 flex gap-4 text-left md:block md:gap-0">
                  <div className="flex flex-col items-center md:hidden">
                    <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-primary-500 bg-white text-primary-600 shadow-sm">
                      <Icon className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    {!isLast && (
                      <span className="mt-1 w-px flex-1 border-l border-dashed border-primary-200" />
                    )}
                  </div>

                  <span className="relative hidden h-12 w-12 items-center justify-center rounded-full border-2 border-primary-500 bg-white text-primary-600 shadow-sm md:inline-flex">
                    <Icon className="h-5 w-5" aria-hidden />
                    <span className="absolute -right-1 -top-2 font-heading text-[11px] font-bold text-neutral-300">
                      {step.label}
                    </span>
                  </span>

                  <div className={isLast ? "pb-0" : "pb-6 md:pb-0"}>
                    <div className="flex items-center gap-2 md:mt-4 md:block">
                      <span className="font-heading text-xs font-bold text-primary-300 md:hidden">
                        {step.label}
                      </span>
                      <h3 className="font-heading text-base font-semibold text-neutral-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}