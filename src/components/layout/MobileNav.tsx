"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { X, Phone, User } from "lucide-react";
import { primaryNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

import Image from "next/image";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Radix Dialog gives us focus trapping and Escape-to-close for free, which
 * satisfies the a11y requirement without hand-rolling a focus manager.
 */
export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40 data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[61] flex w-[85vw] max-w-sm flex-col bg-white p-6 shadow-xl focus:outline-none data-[state=open]:animate-[slide-in-right_260ms_var(--ease-out-soft)_both] data-[state=closed]:animate-[slide-out-right_200ms_var(--ease-out-soft)_both]">
          <div className="flex items-center justify-between">
            <Dialog.Title asChild>
              <Link href="/" onClick={() => onOpenChange(false)}>
                <Image
                  src="/images/logo.png"
                  alt={siteConfig.name}
                  width={160}
                  height={48}
                  className="h-11 w-auto object-contain"
                />
              </Link>
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-neutral-800 hover:bg-neutral-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 border-t border-neutral-200 pt-6">
            <a
              href={`tel:${siteConfig.contact.supportPhone}`}
              className="flex items-center gap-2 text-sm font-medium text-neutral-700"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {siteConfig.contact.supportPhoneDisplay}
            </a>
            <Button variant="primary" className="w-full gap-1.5">
              <User className="h-4 w-4" aria-hidden />
              Login / Sign Up
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
