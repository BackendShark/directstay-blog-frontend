"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";

interface RootNavProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export const RootNav = ({ onLoginClick, onSignupClick }: RootNavProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo.svg"
            alt="DirectStay"
            width={100}
            height={24}
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-blue-600">
            HOME
          </Link>
          <Link
            href="/merchants"
            className="text-sm font-medium text-foreground hover:text-blue-600"
          >
            MERCHANTS
          </Link>
          <Link
            href="/hosts"
            className="text-sm font-medium text-foreground hover:text-blue-600"
          >
            HOSTS
          </Link>
          <Link
            href="/support"
            className="text-sm font-medium text-foreground hover:text-blue-600"
          >
            SUPPORT
          </Link>
        </nav>
        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {theme === "light" ? (
              <Sun className="w-5 h-5 text-gray-600" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </Button>
          <Button
            variant="ghost"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
            onClick={onSignupClick}
          >
            Register
          </Button>
          <Button
            variant="ghost"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
            onClick={onLoginClick}
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};
