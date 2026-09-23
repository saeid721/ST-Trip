"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Phone,
  User,
  Home,
  Building2,
  Compass,
  Globe2,
  Package,
  PackageCheck,
  Wifi,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { primaryNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginClick: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  "/": Home,
  "/hotels": Building2,
  "/tour-packages": Compass,
  "/visa": Globe2,
  "/umrah-packages": Package,
  "/hajj-packages": PackageCheck,
  "/esim": Wifi,
  "/others": MoreHorizontal,
};

export function MobileNav({ open, onOpenChange, onLoginClick }: MobileNavProps) {
  const pathname = usePathname() || "/";
  const [othersOpen, setOthersOpen] = useState(false);

  const handleLoginClick = () => {
    onOpenChange(false);
    onLoginClick();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-neutral-950/50 backdrop-blur-[2px] data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[61] flex w-[88vw] max-w-sm flex-col bg-white shadow-2xl focus:outline-none data-[state=open]:animate-[slide-in-right_260ms_var(--ease-out-soft)_both] data-[state=closed]:animate-[slide-out-right_200ms_var(--ease-out-soft)_both]">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 px-4 pb-4 pt-4">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"
            />
            <div className="relative flex items-center justify-between">
              <Dialog.Title asChild>
                <Link href="/" onClick={() => onOpenChange(false)}>
                  <Image
                    src="/images/logo.png"
                    alt={siteConfig.name}
                    width={160}
                    height={48}
                    className="h-6 w-auto object-contain"
                  />
                </Link>
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => onOpenChange(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </Dialog.Close>
            </div>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2.5 py-2">
            <div className="flex flex-col gap-0.5">
              {primaryNav.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.href} className="overflow-hidden rounded-sm">
                      <button
                        type="button"
                        onClick={() => setOthersOpen((v) => !v)}
                        aria-expanded={othersOpen}
                        className="flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-left transition-colors hover:bg-neutral-50"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                          <MoreHorizontal className="h-3.5 w-3.5" aria-hidden />
                        </span>
                        <span className="flex-1 text-sm font-semibold text-neutral-900">{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 shrink-0 text-neutral-400 transition-transform",
                            othersOpen && "rotate-180",
                          )}
                          aria-hidden
                        />
                      </button>
                      {othersOpen && (
                        <div className="ml-[2.5rem] mr-2 mb-0.5 flex flex-col gap-0 border-l-2 border-primary-100 pl-2.5">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => onOpenChange(false)}
                              className="flex items-center justify-between rounded-sm px-2 py-1.5 text-[13px] font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-primary-700"
                            >
                              {child.label}
                              <ChevronRight className="h-3.5 w-3.5 text-neutral-300" aria-hidden />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
                const Icon = iconMap[item.href] ?? Home;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-sm px-2.5 py-2 transition-colors",
                      isActive ? "bg-primary-50" : "hover:bg-neutral-50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                        isActive ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-500",
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-sm font-semibold",
                        isActive ? "text-primary-700" : "text-neutral-900",
                      )}
                    >
                      {item.label}
                    </span>
                    {isActive && <span className="h-2 w-2 shrink-0 rounded-full bg-primary-600" />}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="flex flex-col gap-2 border-t border-neutral-100 bg-neutral-50 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
            
            <a href={`tel:${siteConfig.contact.supportPhone}`}
              className="flex items-center gap-2 rounded-sm border border-neutral-200 bg-white px-3 py-2 text-[13px] font-semibold text-neutral-700 shadow-sm transition-colors hover:border-primary-300 hover:text-primary-700"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                <Phone className="h-3.5 w-3.5" aria-hidden />
              </span>
              {siteConfig.contact.supportPhoneDisplay}
            </a>
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="w-full gap-1.5 shadow-sm"
              onClick={handleLoginClick}
            >
              <User className="h-3.5 w-3.5" aria-hidden />
              Login / Sign Up
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}