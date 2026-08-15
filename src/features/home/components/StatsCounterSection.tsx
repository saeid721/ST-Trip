"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import type { StatItem } from "@/features/home/types";
import { prefersReducedMotion } from "@/lib/utils";

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(prefersReducedMotion() ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export function StatsCounterSection({ stats }: { stats: StatItem[] }) {
  return (
    <section
      aria-labelledby="stats-heading"
      className="relative overflow-hidden bg-neutral-900 py-16 text-white sm:py-20"
    >
      {/* Decorative world-map pattern, purely presentational */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="container-app relative text-center">
        <h2 id="stats-heading" className="font-heading text-2xl font-bold sm:text-3xl">
          Your Journey, Our Expertise
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-neutral-300">
          Discover the difference — trusted by travellers across Bangladesh.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-heading text-4xl font-bold text-accent-300">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-neutral-200">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
