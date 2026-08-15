"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, Star, Globe, LogIn } from "lucide-react";
import { useCallback, useState } from "react";
import { LoginModal } from "@/components/layout/LoginModal";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Umrah Packages", href: "/umrah-packages", icon: Heart },
  { label: "Hajj Packages", href: "/hajj-packages", icon: Star },
  { label: "Tours Packages", href: "/tour-packages", icon: Globe },
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
      <div className="h-20 md:hidden" />
      
      {/* Mobile Bottom Navigation */}
      <nav
        aria-label="Mobile bottom navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-xl"
      >
        <div className="grid grid-cols-5 h-20 px-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex flex-col items-center justify-center gap-1 rounded-lg mx-0.5 transition-all duration-200 ease-out ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="text-[10px] font-medium leading-tight text-center px-0.5 line-clamp-1">
                  {label}
                </span>
                {isActive && (
                  <span className="absolute top-0 h-0.5 w-8 bg-blue-600 rounded-b-lg" />
                )}
              </Link>
            );
          })}

          {/* Login Button */}
          <button
            type="button"
            onClick={handleLoginClick}
            className="relative flex flex-col items-center justify-center gap-1 rounded-lg mx-0.5 text-neutral-600 hover:bg-neutral-50 transition-all duration-200 ease-out"
            aria-label="Open login modal"
          >
            <loginItem.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="text-[10px] font-medium leading-tight text-center px-0.5">
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
