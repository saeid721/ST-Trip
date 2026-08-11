import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "inverse";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-700 text-white hover:bg-primary-800 focus-visible:bg-primary-800 shadow-sm",
  accent:
    "bg-accent-500 text-white hover:bg-accent-600 focus-visible:bg-accent-600 shadow-md",
  outline:
    "border border-neutral-300 bg-white text-neutral-800 hover:border-primary-400 hover:text-primary-700",
  ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100",
  inverse: "bg-white text-primary-700 hover:bg-neutral-100 shadow-sm",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-[52px] px-7 text-base gap-2.5",
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
          "transition-colors duration-150 ease-out disabled:pointer-events-none disabled:opacity-50",
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
