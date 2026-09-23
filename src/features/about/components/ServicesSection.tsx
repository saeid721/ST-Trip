import Link from "next/link";
import { BedDouble, MapPinned, Plane, Stamp } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { services, type IconKey } from "@/features/about/data/about";

const serviceIcons: Partial<Record<IconKey, typeof Plane>> = {
  plane: Plane,
  hotel: BedDouble,
  tour: MapPinned,
  visa: Stamp,
};

export function ServicesSection() {
  return (
    <section className="py-14 sm:py-20" aria-labelledby="about-services-title">
      <div className="container-app">
        <Reveal>
          <h2
            id="about-services-title"
            className="text-center font-heading text-2xl font-bold text-neutral-900 sm:text-3xl"
          >
            Our Services
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-neutral-500 sm:text-base">
            Everything you need for a trip, handled with the same standard of care.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon] ?? Plane;
            return (
              <Reveal key={service.id} delay={i * 0.06}>
                <Link
                  href={service.href}
                  className="about-service-card group block focus-visible:outline-none"
                >
                  <span className="about-service-card__icon">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-neutral-900">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-primary-700 transition-transform group-hover:translate-x-1">
                    Explore {service.title.toLowerCase()} &rarr;
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}