"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Kaaba, BookOpen, Globe, LogIn } from "lucide-react";
import { useCallback, useState } from "react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Umrah", href: "/umrah-packages", icon: Kaaba },
  { label: "Hajj", href: "/hajj-packages", icon: BookOpen },
  { label: "Tours", href: "/tour-packages", icon: Globe },
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
        <div className="flex items-center justify-around h-20 px-2 max-w-full">
          {/* Navigation Links */}
          <div className="flex items-center justify-around flex-1">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex flex-col items-center justify-center min-h-16 flex-1 rounded-lg transition-all duration-200 ease-out ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  <Icon className="h-6 w-6 mb-1" aria-hidden="true" />
                  <span className="text-xs font-medium leading-tight text-center px-1">
                    {label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 h-1 w-8 bg-blue-600 rounded-t-lg" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Login Button */}
          <button
            onClick={handleLoginClick}
            className="flex flex-col items-center justify-center min-h-16 flex-1 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-all duration-200 ease-out ml-1"
            aria-label="Open login modal"
          >
            <loginItem.icon className="h-6 w-6 mb-1" aria-hidden="true" />
            <span className="text-xs font-medium leading-tight text-center px-1">
              {loginItem.label}
            </span>
          </button>
        </div>
      </nav>

      {/* Login Modal Placeholder - You can trigger your existing LoginModal here */}
      {isLoginModalOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black bg-opacity-50 flex items-center justify-center md:hidden"
          onClick={() => setIsLoginModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 m-4 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <p className="text-neutral-600 mb-6">
              Login functionality will be integrated here with your existing LoginModal component.
            </p>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileTabBar;
