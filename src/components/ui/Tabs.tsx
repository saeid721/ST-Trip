"use client";

import * as RadixTabs from "@radix-ui/react-tabs";
import { useEffect, useRef, useState, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

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
        "relative inline-flex items-center gap-1 rounded-md bg-primary-50 p-1",
        className,
      )}
      {...props}
    >
      {indicator && (
        <div
          aria-hidden
          className="absolute inset-y-1 left-0 rounded-md bg-white shadow-sm transition-[transform,width] duration-300 ease-out"
          style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
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
        "relative z-10 flex h-14 w-16 flex-col items-center justify-center gap-1 rounded-md px-1 text-[11px] font-medium text-neutral-600 md:h-11 md:w-auto md:flex-row md:gap-1.5 md:px-5 md:text-sm",
        "transition-colors duration-150 hover:text-primary-700",
        "data-[state=active]:text-primary-700",
        className,
      )}
      {...props}
    />
  );
}
