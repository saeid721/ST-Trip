"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, Star, Globe, LogIn } from "lucide-react";
import { useCallback, useState } from "react";
import { LoginModal } from "@/components/layout/LoginModal";

const navItems = [
  { label: "Hotels", href: "/hotels", icon: Heart },
  { label: "Tours", href: "/tour", icon: Globe },
  { label: "Visa", href: "/visa", icon: Globe },
  { label: "Home", href: "/", icon: Home },
  { label: "Umrah", href: "/umrah", icon: Heart },
  { label: "Hajj", href: "/hajj", icon: Star },
];

const loginItem = { label: "Login", href: "#login", icon: LogIn };

export function MobileTabBar() {
  const pathname = usePathname() || "/";
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoginModalOpen(true);
  }, []);

  return (
    <>
      {/* Bottom spacing for fixed navbar */}
      <div className="h-[calc(4rem+env(safe-area-inset-bottom,0px))] md:hidden" />

      {/* Mobile Bottom Navigation */}
      <nav
        aria-label="Mobile bottom navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] pt-4"
      >
        <div className="relative grid h-14 grid-cols-7 items-center rounded-full border border-neutral-200 bg-white px-1 shadow-[0_8px_24px_rgba(15,23,42,0.1)]">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
            return (
              <Link
                key={href}
                href={href}
                className="relative flex flex-col items-center justify-center"
              >
                <span
                  className={`flex items-center justify-center rounded-full transition-all duration-200 ease-out ${
                    isActive
                      ? "-mt-8 h-12 w-12 border-4 border-white bg-primary-600 text-white shadow-[0_6px_14px_rgba(0,114,188,0.35)]"
                      : "h-8 w-8 text-neutral-400"
                  }`}
                >
                  <Icon className={isActive ? "h-5 w-5" : "h-[18px] w-[18px]"} aria-hidden="true" strokeWidth={isActive ? 2.4 : 2} />
                </span>
                <span
                  className={`line-clamp-1 px-0.5 text-center text-[9px] leading-tight ${
                    isActive ? "mt-0.5 font-bold text-neutral-900" : "font-medium text-neutral-400"
                  }`}
                >
                  {label}
                </span>
                {isActive && <span className="mt-0.5 h-0.5 w-5 rounded-full bg-neutral-900" />}
              </Link>
            );
          })}

          {/* Login Button */}
          <button
            type="button"
            onClick={handleLoginClick}
            className="relative flex flex-col items-center justify-center"
            aria-label="Open login modal"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400">
              <loginItem.icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            </span>
            <span className="px-0.5 text-center text-[9px] font-medium leading-tight text-neutral-400">
              {loginItem.label}
            </span>
          </button>
        </div>
      </nav>

      <LoginModal open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
    </>
  );
}

export default MobileTabBar;
