import { Eye, Target } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { missionVision } from "@/features/about/data/about";

export function MissionVision() {
  return (
    <section className="bg-neutral-50 py-14 sm:py-20">
      <div className="container-app grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="about-mv-card about-mv-card--accent h-full">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
              <Target className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="about-mv-card__title mt-4 font-heading text-xl font-bold">
              {missionVision.mission.title}
            </h3>
            <p className="about-mv-card__description mt-2 text-sm leading-relaxed sm:text-base">
              {missionVision.mission.description}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="about-mv-card h-full">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-700">
              <Eye className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="about-mv-card__title mt-4 font-heading text-xl font-bold text-neutral-900">
              {missionVision.vision.title}
            </h3>
            <p className="about-mv-card__description mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
              {missionVision.vision.description}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}