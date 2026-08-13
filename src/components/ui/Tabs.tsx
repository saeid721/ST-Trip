"use client";

import * as RadixTabs from "@radix-ui/react-tabs";
import { useEffect, useRef, useState, createContext, useContext } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Thin wrapper around Radix Tabs so every tabbed section (search widget,
 * Hot Deals filter, Popular Routes) gets correct role="tablist"/"tab" ARIA
 * wiring, roving tabindex keyboard nav, and aria-selected for free — plus a
 * shared "glide" indicator instead of an instant background snap.
 *
 * Motion psychology: a pill that visibly travels from the old tab to the
 * new one reads as continuity ("the same surface moved"), which the brain
 * parses as smoother/more premium than an instant color swap, even though
 * the total animation time is under 300ms. Spring physics (not a linear
 * tween) is what sells the "glide" — it decelerates the way a physical
 * object would, not a mechanical fade.
 */
const ActiveTabContext = createContext<string | undefined>(undefined);

type TabsRootProps = React.ComponentProps<typeof RadixTabs.Root>;

export function Tabs({ value, defaultValue, onValueChange, ...props }: TabsRootProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeValue = value ?? internalValue;

  return (
    <ActiveTabContext.Provider value={activeValue}>
      <RadixTabs.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={(v) => {
          setInternalValue(v);
          onValueChange?.(v);
        }}
        {...props}
      />
    </ActiveTabContext.Provider>
  );
}

export function TabsContent({ className, ...props }: RadixTabs.TabsContentProps) {
  return <RadixTabs.Content className={cn("animate-fade-in-up", className)} {...props} />;
}

export function TabsList({ className, children, ...props }: RadixTabs.TabsListProps) {
  const activeValue = useContext(ActiveTabContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const activeEl = container.querySelector<HTMLElement>('[data-state="active"]');
      if (activeEl) {
        setIndicator({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeValue]);

  return (
    <RadixTabs.List
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center gap-1 rounded-2xl bg-primary-50 p-1 md:rounded-full",
        className,
      )}
      {...props}
    >
      {indicator && (
        <motion.div
          aria-hidden
          className="absolute inset-y-1 left-0 rounded-full bg-white shadow-sm"
          initial={false}
          animate={{ x: indicator.left, width: indicator.width }}
          transition={{ type: "spring", stiffness: 420, damping: 38, mass: 0.7 }}
        />
      )}
      {children}
    </RadixTabs.List>
  );
}

export function TabsTrigger({ className, ...props }: RadixTabs.TabsTriggerProps) {
  return (
    <RadixTabs.Trigger
      className={cn(
        "relative z-10 flex h-14 w-16 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-medium text-neutral-600 md:h-11 md:w-auto md:flex-row md:gap-1.5 md:rounded-full md:px-4 md:text-sm",
        "transition-colors duration-150 hover:text-primary-700",
        "data-[state=active]:text-primary-700",
        className,
      )}
      {...props}
    />
  );
}
