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
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 focus-visible:bg-primary-700 active:bg-primary-800 shadow-sm",
  accent:
    "border border-accent-200 bg-accent-50 text-accent-700 hover:bg-accent-100 hover:border-accent-300 focus-visible:bg-accent-100",
  outline:
    "border border-neutral-300 bg-white text-neutral-800 hover:border-primary-400 hover:text-primary-700",
  ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100",
  inverse: "bg-white text-primary-600 hover:bg-neutral-100 shadow-sm",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-[52px] px-7 text-base gap-2.5",
  xl: "h-[56px] w-full px-8 text-base font-semibold gap-2.5 sm:w-auto",
  icon: "h-11 w-11 p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm font-medium",
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