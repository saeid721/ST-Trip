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
    <section className="about-journey py-14 sm:py-20" aria-labelledby="about-journey-title">
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

        <div className="about-journey__track mt-12">
          {journeySteps.map((step, i) => {
            const Icon = journeyIcons[step.icon] ?? Compass;
            return (
              <Reveal key={step.id} delay={i * 0.08}>
                <div className="about-journey__step">
                  <span className="about-journey__marker relative">
                    <Icon className="h-5 w-5" aria-hidden />
                    <span className="about-journey__index">{step.label}</span>
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}