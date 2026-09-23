"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, Star, Globe, LogIn } from "lucide-react";
import { useCallback, useState } from "react";
import { LoginModal } from "@/components/layout/LoginModal";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Hotels", href: "/hotels", icon: Heart },
  { label: "Tours", href: "/tour", icon: Globe },
  { label: "Visa", href: "/visa", icon: Globe },
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
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white/95 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur-md"
      >
        <div className="grid h-16 grid-cols-6 px-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`relative mx-0.5 flex flex-col items-center justify-center gap-0.5 rounded-sm transition-colors duration-150 ease-out active:bg-neutral-100 ${
                  isActive ? "text-primary-700" : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 h-0.5 w-8 rounded-b-full bg-primary-700" />
                )}
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" strokeWidth={isActive ? 2.4 : 2} />
                <span className="line-clamp-1 px-0.5 text-center text-[10px] font-medium leading-tight">
                  {label}
                </span>
              </Link>
            );
          })}

          {/* Login Button */}
          <button
            type="button"
            onClick={handleLoginClick}
            className="relative mx-0.5 flex flex-col items-center justify-center gap-0.5 rounded-sm text-neutral-500 transition-colors duration-150 ease-out hover:text-neutral-700 active:bg-neutral-100"
            aria-label="Open login modal"
          >
            <loginItem.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="px-0.5 text-center text-[10px] font-medium leading-tight">
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
