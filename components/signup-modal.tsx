"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, ChevronRight } from "lucide-react";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export function SignupModal({ isOpen, onClose, onContinue }: SignupModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-6">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 rounded-xl"></div>
            <svg
              viewBox="0 0 32 32"
              fill="white"
              className="absolute inset-0 w-full h-full p-2"
            >
              <path d="M12 3L4 9v12h16V9L12 3z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Create Your Merchant Account
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your basic business details to start your onboarding.
        </p>

        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
        </div>
        <p className="text-xs text-gray-500 mb-6">1/3</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <Label
              htmlFor="businessName"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Business Name
            </Label>
            <Input
              id="businessName"
              placeholder="Enter Name"
              className="h-11 border-gray-300"
            />
          </div>

          <div>
            <Label
              htmlFor="contactEmail"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Contact Email
            </Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="Enter your email address"
              className="h-11 border-gray-300"
            />
          </div>

          <div>
            <Label
              htmlFor="contactPhone"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Contact Phone Number (Optional)
            </Label>
            <Input
              id="contactPhone"
              type="tel"
              placeholder="Enter Name"
              className="h-11 border-gray-300"
            />
          </div>

          <div>
            <Label
              htmlFor="businessCategory"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Business Category
            </Label>
            <Select>
              <SelectTrigger className="h-11 border-gray-300">
                <SelectValue placeholder="Restaurant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <Label
              htmlFor="website"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Website link (Optional)
            </Label>
            <Input
              id="website"
              type="url"
              placeholder="https://"
              className="h-11 border-gray-300"
            />
          </div>
        </div>

        <div className="flex items-start gap-2 mb-6">
          <Checkbox id="terms" className="mt-0.5" />
          <label
            htmlFor="terms"
            className="text-xs text-gray-600 cursor-pointer"
          >
            By creating an account, you agree with our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>

        <Button
          onClick={onContinue}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2"
        >
          Continue
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}