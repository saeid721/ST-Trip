"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { services } from "@/features/about/data/about";

interface StatDef {
  id: string;
  label: string;
  /** Numeric target for count-up. Omit for a static label like "24/7". */
  value?: number;
  suffix?: string;
  staticValue?: string;
}

function useCountUp(target: number, active: boolean, durationMs = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || target === 0) {
      setValue(target);
      return;
    }

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, durationMs]);

  return value;
}

function StatValue({ stat, active }: { stat: StatDef; active: boolean }) {
  const count = useCountUp(stat.value ?? 0, active);

  if (stat.staticValue) {
    return <p className="font-heading text-3xl font-bold sm:text-4xl">{stat.staticValue}</p>;
  }

  return (
    <p className="font-heading text-3xl font-bold sm:text-4xl">
      {count}
      {stat.suffix}
    </p>
  );
}

export function StatsBand() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const yearsActive = Math.max(
    1,
    new Date().getFullYear() - (siteConfig.founded ?? new Date().getFullYear()),
  );

  const stats: StatDef[] = [
    { id: "years", label: "Years of Experience", value: yearsActive, suffix: "+" },
    { id: "services", label: "Core Travel Services", value: services.length },
    { id: "offices", label: "Offices Nationwide", value: siteConfig.offices?.length ?? 0 },
    { id: "support", label: "Customer Support", staticValue: "24/7" },
  ];

  return (
    <section className="py-14 sm:py-20">
      <div className="container-app">
        <div
          ref={sectionRef}
          className="rounded-md bg-gradient-to-r from-primary-700 to-primary-600 px-6 py-10 text-white sm:px-10 sm:py-12"
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center sm:text-left">
                <StatValue stat={stat} active={active} />
                <p className="mt-1 text-xs text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}