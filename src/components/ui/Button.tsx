import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "inverse";
type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  // The ONE loud CTA style in the system. 600 = Primary Blue (base),
  // 700 = Primary Hover, 800 = Primary Dark (press/active) — exactly the
  // brand's action/hover/pressed triplet, not an arbitrary shade pick.
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 focus-visible:bg-primary-700 active:bg-primary-800 shadow-sm",
  // Sky accent, deliberately a SOFT OUTLINE — never a solid competing fill.
  // Reserved for secondary/decorative actions (e.g. "View on map") that
  // should read as available but not as important as the primary action.
  accent:
    "border border-accent-200 bg-accent-50 text-accent-700 hover:bg-accent-100 hover:border-accent-300 focus-visible:bg-accent-100",
  outline:
    "border border-neutral-300 bg-white text-neutral-800 hover:border-primary-400 hover:text-primary-700",
  ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100",
  // For use over dark/navy surfaces (hero, chat header) — white surface,
  // true brand blue text so it still reads as "the" action color.
  inverse: "bg-white text-primary-600 hover:bg-neutral-100 shadow-sm",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-[52px] px-7 text-base gap-2.5",
  xl: "h-[56px] w-full px-8 text-base font-semibold gap-2.5 sm:w-auto",
  icon: "h-11 w-11 p-0",
};

/**
 * Shared button primitive — every CTA in the app (search, deals, footer,
 * chat bubble) composes this instead of a one-off styled <button>.
 * Min tap target is 44px (h-11) to satisfy the mobile touch-target requirement.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium",
          "transition-[background-color,transform,box-shadow] duration-150 ease-out",
          "motion-safe:active:scale-[0.97]",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
