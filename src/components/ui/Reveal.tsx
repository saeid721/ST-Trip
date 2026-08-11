"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger offset in seconds — pass index * 0.06 for a card grid. */
  delay?: number;
  /** Starting vertical offset in px. Small (8–16px) reads as "settling into
   * place", not "flying in" — large offsets feel gimmicky, not premium. */
  y?: number;
  className?: string;
}

/**
 * Scroll-triggered entrance used across card grids (hotels, destinations,
 * airlines, blog). Fires once when ~15% visible, never re-triggers on
 * scroll-back — repeated replay reads as a glitch, not polish.
 *
 * Respects prefers-reduced-motion globally via the <MotionConfig
 * reducedMotion="user"> wrapper in app/layout.tsx — no per-component check
 * needed here.
 */
export function Reveal({ children, delay = 0, y = 14, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
