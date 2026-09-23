import { Eye, Target } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { missionVision } from "@/features/about/data/about";

export function MissionVision() {
  return (
    <section className="bg-neutral-50 py-14 sm:py-20">
      <div className="container-app grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-md bg-gradient-to-br from-primary-900 to-primary-700 p-8 text-white">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
              <Target className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-heading text-xl font-bold">
              {missionVision.mission.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
              {missionVision.mission.description}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="h-full rounded-md border border-neutral-200 bg-white p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-700">
              <Eye className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-heading text-xl font-bold text-neutral-900">
              {missionVision.vision.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
              {missionVision.vision.description}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}