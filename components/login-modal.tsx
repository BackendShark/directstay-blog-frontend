"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Eye } from "lucide-react";
import Image from "next/image";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onSwitchToSignup,
}: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-6">
          <Image
            src="/assets/logo-login.svg"
            alt="Top Merchant"
            width={90}
            height={90}
            className="rounded-full"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Welcome Back!
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          First time here?{" "}
          <button
            onClick={onSwitchToSignup}
            className="text-secondary font-medium hover:text-secondary"
          >
            Sign up for free.
          </button>
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="h-11 border-gray-300"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="h-11 border-gray-300 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Forgot Password?
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mb-4">
          By signing up you agree with our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>

        <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">
          Sign in
        </Button>
      </div>
    </div>
  );
}
