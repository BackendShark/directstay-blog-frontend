"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface RootNavProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export const RootNav = ({ onLoginClick, onSignupClick }: RootNavProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/merchants", label: "MERCHANTS" },
    { href: "/hosts", label: "HOSTS" },
    { href: "/support", label: "SUPPORT" },
  ];

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo.svg"
            alt="DirectStay"
            width={80}
            height={20}
            className="sm:w-[100px] sm:h-[24px]"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`text-sm font-medium transition-colors ${
                pathname === link.href 
                  ? "text-blue-600" 
                  : "text-foreground hover:text-blue-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Theme Toggle */}
          <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {theme === "light" ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            )}
          </Button>

          {/* Desktop Auth Buttons */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs lg:text-sm font-medium text-blue-600 hover:text-blue-700 px-3 lg:px-4"
              onClick={onSignupClick}
            >
              Register
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs lg:text-sm font-medium text-blue-600 hover:text-blue-700 px-3 lg:px-4"
              onClick={onLoginClick}
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            variant="ghost"
            size="sm"
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="max-w-[1400px] mx-auto px-3 sm:px-4 py-4">
            <nav className="flex flex-col space-y-3 mb-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`text-sm font-medium py-2 transition-colors ${
                    pathname === link.href 
                      ? "text-blue-600" 
                      : "text-foreground hover:text-blue-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-2 sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 justify-start px-0 py-2"
                onClick={() => {
                  onSignupClick?.();
                  setMobileMenuOpen(false);
                }}
              >
                Register
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 justify-start px-0 py-2"
                onClick={() => {
                  onLoginClick?.();
                  setMobileMenuOpen(false);
                }}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
