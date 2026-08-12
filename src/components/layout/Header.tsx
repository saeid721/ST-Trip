"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, User, Menu, ChevronDown } from "lucide-react";
import { primaryNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { LoginModal } from "@/components/layout/LoginModal";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils";

import Image from "next/image";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-250",
        scrolled ? "bg-white shadow-sm" : "bg-transparent",
      )}
      style={{ height: "var(--header-height)" }}
    >
      <div className="container-app flex h-full items-center justify-between">
        <Link href="/" className="flex items-center py-1" aria-label={`${siteConfig.name} home`}>
          <Image
            src="/images/logo.png"
            alt={siteConfig.name}
            width={200}
            height={60}
            className="h-12 sm:h-14 w-auto max-h-[58px] object-contain drop-shadow-sm"
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {primaryNav.map((item) => (
            item.children ? (
              <div key={item.href} className="relative group">
                <button
                  type="button"
                  aria-haspopup="menu"
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors",
                    scrolled
                      ? "text-neutral-700 hover:text-primary-700"
                      : "text-white/90 hover:text-white",
                  )}
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </button>
                <div className="invisible absolute left-0 top-full z-10 w-52 rounded-3xl border border-neutral-200 bg-white p-2 opacity-0 shadow-lg transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-2xl px-4 py-2 text-sm text-neutral-700 transition hover:bg-neutral-50"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  scrolled
                    ? "text-neutral-700 hover:text-primary-700"
                    : "text-white/90 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${siteConfig.contact.supportPhone}`}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors",
              scrolled ? "text-neutral-700" : "text-white/90",
            )}
          >
            <Phone className="h-4 w-4" aria-hidden />
            {siteConfig.contact.supportPhoneDisplay}
          </a>
          <Button
            variant={scrolled ? "primary" : "inverse"}
            size="sm"
            className="gap-1.5"
            onClick={() => setLoginModalOpen(true)}
          >
            <User className="h-4 w-4" aria-hidden />
            Login / Sign Up
          </Button>
        </div>
        <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen(true)}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-lg lg:hidden",
            scrolled ? "text-neutral-800" : "text-white",
          )}
        >
          <Menu className="h-6 w-6" aria-hidden />
        </button>
      </div>

      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </header>
  );
}
