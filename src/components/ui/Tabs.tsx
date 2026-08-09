"use client";

import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/**
 * Thin wrapper around Radix Tabs so every tabbed section (search widget,
 * Hot Deals filter, Popular Routes) gets correct role="tablist"/"tab" ARIA
 * wiring, roving tabindex keyboard nav, and aria-selected for free.
 */
export const Tabs = RadixTabs.Root;
export const TabsContent = RadixTabs.Content;

export function TabsList({ className, ...props }: RadixTabs.TabsListProps) {
  return (
    <RadixTabs.List
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-neutral-100 p-1",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: RadixTabs.TabsTriggerProps) {
  return (
    <RadixTabs.Trigger
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-neutral-600",
        "transition-colors duration-150 hover:text-primary-700",
        "data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm",
        className,
      )}
      {...props}
    />
  );
}
