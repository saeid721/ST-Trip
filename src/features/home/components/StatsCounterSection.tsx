"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import type { StatItem } from "@/features/home/types";
import { prefersReducedMotion } from "@/lib/utils";

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

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
      className="relative overflow-hidden bg-neutral-950 py-10 text-white sm:py-20"
    >
      {/* Decorative dotted grid, purely presentational */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div aria-hidden className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary-500/10 blur-3xl" />
      <div aria-hidden className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="container-app relative text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-300 sm:text-sm sm:tracking-[0.18em]">By the numbers</p>
        <h2 id="stats-heading" className="mt-0.5 font-heading text-base font-bold sm:mt-2 sm:text-xl lg:text-2xl">
          Your Journey, Our Expertise
        </h2>
        <p className="mx-auto mt-0.5 max-w-md text-xs text-neutral-400 sm:mt-2 sm:text-sm">
          Discover the difference — trusted by travellers across Bangladesh.
        </p>

        <div className="mx-auto mt-6 grid grid-cols-1 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm sm:mt-10 md:grid-cols-3 md:divide-y-0 md:divide-x">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative px-5 py-4 transition-colors duration-300 hover:bg-white/[0.03] sm:px-6 sm:py-6 md:py-10"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary-500 to-accent-400 transition-transform duration-300 group-hover:scale-x-100"
              />
              <p className="font-heading text-2xl font-bold text-accent-300 sm:text-2xl md:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-xs font-medium text-neutral-300 sm:mt-2 sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
