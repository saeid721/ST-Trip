import {
  Headset,
  LayoutGrid,
  MousePointerClick,
  ShieldCheck,
  SlidersHorizontal,
  HeartHandshake,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { whyChooseItems, type IconKey } from "@/features/about/data/about";

const whyIcons: Partial<Record<IconKey, typeof ShieldCheck>> = {
  click: MousePointerClick,
  shield: ShieldCheck,
  support: Headset,
  flex: SlidersHorizontal,
  grid: LayoutGrid,
  handshake: HeartHandshake,
};

export function WhyChooseSection() {
  return (
    <section className="bg-neutral-50 py-8 md:py-14" aria-labelledby="about-why-title">
      <div className="container-app">
        <Reveal>
          <h2
            id="about-why-title"
            className="text-center font-heading text-2xl font-bold text-neutral-900 sm:text-3xl"
          >
            Why Choose ST Trip
          </h2>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-2 md:mt-8 md:grid-cols-2 md:gap-3 lg:grid-cols-3">
          {whyChooseItems.map((item, i) => {
            const Icon = whyIcons[item.icon] ?? ShieldCheck;
            return (
              <Reveal key={item.id} delay={i * 0.05}>
                <div className="flex gap-3 rounded-sm p-4 transition-colors duration-300 hover:bg-white md:gap-4 md:p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                      {item.description}
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